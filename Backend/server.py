from flask import Flask, jsonify
from flask_cors import CORS
import subprocess
import os

app = Flask(__name__)
CORS(app)  # allow React to call this server

# Endpoint to run your simulation
@app.route("/run-simulation", methods=["GET"])
def run_simulation():
    try:
        # Change directory to where your script is
        os.chdir(os.path.dirname(__file__))  # ensures relative path works
        # Run the command
        result = subprocess.run(
            ["py", "pygame_sim.py"],  # your command
            capture_output=True,
            text=True
        )
        # Return stdout/stderr
        return jsonify({
            "stdout": result.stdout,
            "stderr": result.stderr
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(port=8000, debug=True)
