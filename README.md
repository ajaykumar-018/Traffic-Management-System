# 🚦 AI-Based Traffic Management System

An AI-powered traffic management system designed to optimize traffic flow using **computer vision, machine learning, and real-time analytics**.  
The system dynamically adjusts traffic signals based on vehicle density and congestion patterns, aiming to reduce waiting times and improve road safety.  

---

## 📌 Resume Description (Short Version)
**AI-Based Traffic Management System** – Built an AI-powered system using computer vision and ML to optimize traffic flow, achieving **90% accuracy** in detection and **~25% reduction** in waiting times through adaptive signal control.  

---

## ✨ Features
- Real-time vehicle detection using Computer Vision (YOLO/ML models).
- Predictive congestion analysis for adaptive traffic routing.
- Interactive web-based dashboard for traffic monitoring.
- REST API integration for communication between backend services.
- Simulation and testing using SUMO/Flask-based backend.

---

## 🛠️ Tech Stack
- **Frontend:** React.js, Tailwind CSS  
- **Backend:** Node.js, Express.js, Flask (Python)  
- **Database:** MongoDB  
- **AI/ML:** Python (YOLO/RT-DETR, scikit-learn), OpenCV  
- **Simulation Tools:** SUMO, PyGame  
- **Deployment:** Localhost / Cloud-ready  

---

## 🚀 Getting Started

### Prerequisites
Make sure you have installed:
- [Node.js](https://nodejs.org/) (v16+ recommended)  
- [Python](https://www.python.org/) (3.8+)
- flask
- ultralytics 

### Installation
### 1. Clone this repository:
   ```bash
   git clone https://github.com/yourusername/Traffic-Management.git
   cd Traffic-Management

   ```

### 2.Install dependencies:

```bash
npm install

```


### Start the frontend:

```bash

npm run dev

```


### Start the backend (Python services):

```bash

cd Backend
python app.py
python server.py

```

### 📊 Output

Dashboard displaying live traffic density and congestion status.

Adaptive signal control with reduced average waiting time (~25% in simulations).

Real-time analytics and predictions.

### 📂 Project Structure
Traffic-Management/
│── Frontend/         # React.js + Tailwind CSS
│── Backend/
│   ├── app.py        # Flask backend for AI/ML models
│   ├── server.py     # API server for data flow
│── models/           # Trained YOLO/ML models
│── data/             # Sample datasets & simulation files
│── README.md

### 🏆 Results

Achieved >90% accuracy in vehicle detection.

Reduced congestion waiting times by ~25% in simulation tests.

Supports future scalability for multi-junction traffic systems.
