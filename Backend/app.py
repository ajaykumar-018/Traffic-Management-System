# app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from ultralytics import RTDETR
from collections import Counter
import random

# -------------------- Flask Setup --------------------
app = Flask(__name__)
CORS(app)  # Enable CORS

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

last_plan = {}

# -------------------- Vehicle Detection --------------------
try:
    model = RTDETR("rtdetr-l.pt")
    USE_DUMMY = False
except Exception:
    model = None
    USE_DUMMY = True

VEHICLE_CLASSES = ['car', 'truck', 'bus']
WEIGHTS = {'car': 1.0, 'truck': 3.0, 'bus': 2.5}

def detect_vehicles(image_path):
    if USE_DUMMY or model is None:
        return {cls: random.randint(0,3) for cls in VEHICLE_CLASSES}
    results = model(image_path)
    names = results[0].names
    classes = results[0].boxes.cls.cpu().numpy() if len(results[0].boxes) else []
    counts = Counter([names[int(cid)] for cid in classes])
    return {cls: counts.get(cls, 0) for cls in VEHICLE_CLASSES}

def get_vehicle_scores(images):
    counts_by_road, scores_by_road = {}, {}
    for road, img_path in images.items():
        det = detect_vehicles(img_path)
        counts_by_road[road] = det
        scores_by_road[road] = sum(WEIGHTS[k]*det.get(k,0) for k in VEHICLE_CLASSES)
    return counts_by_road, scores_by_road

def group_phases(junction_type):
    if junction_type == 4:
        return [["north", "south"], ["east", "west"]]
    elif junction_type == 3:
        return [["north", "east"], ["east", "south"], ["south", "north"]]
    raise ValueError("junction_type must be 3 or 4")

def allocate_phase_times(scores_by_road, phases, total_cycle_time=60.0, min_green=6.0):
    phase_loads = [sum(scores_by_road.get(r,0.0) for r in phase) for phase in phases]
    total_load = sum(phase_loads)
    n = len(phases)
    if total_load <= 0:
        base = max(min_green, total_cycle_time/n)
        return [round(base,1) for _ in phases]
    raw_times = [(load/total_load)*total_cycle_time for load in phase_loads]
    times = [max(min_green,t) for t in raw_times]
    factor = total_cycle_time / sum(times)
    return [round(t*factor,1) for t in times]

def get_traffic_plan(images, junction_type=4, total_cycle_time=60.0, min_green=6.0):
    counts_by_road, scores_by_road = get_vehicle_scores(images)
    phases = group_phases(junction_type)
    green_times = allocate_phase_times(scores_by_road, phases, total_cycle_time, min_green)
    return phases, green_times, counts_by_road, scores_by_road

def generate_traffic_plan(uploaded_files):
    phases, green_times, _, _ = get_traffic_plan(uploaded_files)
    traffic_plan = {"phases":[]}
    for i, phase in enumerate(phases):
        lights = {}
        for road in uploaded_files.keys():
            lights[road] = "GREEN" if road in phase else "RED"
        traffic_plan["phases"].append({"time": green_times[i], "lights": lights})
    return traffic_plan

# -------------------- Routes --------------------
@app.route("/upload", methods=["POST"])
def upload_files():
    global last_plan
    uploaded_files = {}
    for key in ["north","south","east","west"]:
        file = request.files.get(key)
        if file:
            filepath = os.path.join(UPLOAD_FOLDER,file.filename)
            file.save(filepath)
            uploaded_files[key] = filepath
            print(f"[{key}] saved at: {filepath}")
    last_plan = generate_traffic_plan(uploaded_files) if uploaded_files else {"phases":[]}
    return jsonify({"status":"success","files":list(uploaded_files.keys())})

@app.route("/traffic", methods=["GET"])
def get_traffic():
    return jsonify(last_plan)

if __name__=="__main__":
    app.run(debug=True)
