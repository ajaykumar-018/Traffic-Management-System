import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";

export default function Result() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showSim, setShowSim] = useState(false);
  const runSimulation = async () => {
    try {
      const res = await axios.get("http://localhost:8000/run-simulation");
      console.log("Output:", res.data.stdout);
      console.log("Errors:", res.data.stderr);
      alert("Simulation ran! Check console for output.");
    } catch (err) {
      alert("Error running simulation: " + err.message);
    }
  };

  const fetchTrafficData = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://127.0.0.1:5000/traffic");
      setData(res.data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch traffic data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrafficData();
    const interval = setInterval(fetchTrafficData, 10000); // every 10s
    return () => clearInterval(interval);
  }, []);

  if (loading) return <p className="text-center text-gray-500 mt-6">Loading...</p>;
  if (error) return <p className="text-center text-red-500 mt-6">{error}</p>;

  return (
    <div className="bg-[url(./assets/bghome.png)] h-screen w-full bg-no-repeat bg-cover">
      <Navbar />
      <h1 className="text-3xl text-white font-bold text-center mb-6">🚦 Traffic Dashboard</h1>

      {data?.phases?.map((phase, idx) => (
        <div key={idx} className="mb-6 p-4 bg-white shadow rounded-2xl">
          <h2 className="text-xl font-semibold mb-2">Phase {idx+1}</h2>
          <p className="mb-2 text-gray-600">
            ⏱ Green for: <span className="font-bold">{phase.time} sec</span>
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(phase.lights).map(([road,color]) => (
              <div key={road} className="flex flex-col items-center justify-center p-3 rounded-lg border">
                <span className="text-lg font-medium">{road.toUpperCase()}</span>
                <span className={`mt-2 w-6 h-6 rounded-full ${
                  color==="GREEN"?"bg-green-500":color==="YELLOW"?"bg-yellow-400":"bg-red-500"
                }`}></span>
                <span className="mt-1 text-sm text-gray-500">{color}</span>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="flex justify-center mt-4 gap-4">
        <button
          onClick={fetchTrafficData}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow"
        >🔄 Refresh Now</button>
        <button onClick={runSimulation} className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow">Run Simulation</button>
      </div>

      {showSim && (
            <div className="flex justify-center mt-6">
              <img src="http://127.0.0.1:5001/sim" alt="Traffic Simulation" className="border-2 border-gray-300 rounded-xl"/>
            </div>
    )}

    </div>
  );
}
