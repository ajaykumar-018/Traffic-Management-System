import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";

function Upload({ glist }) {
  const [files, setFiles] = useState({});
  const [isactive, setisactive] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (dir, e) => {
    setFiles((prev) => ({ ...prev, [dir]: e.target.files[0] }));
  };

  const handleUpload = async () => {
    // ✅ Check if directions < 3
    if (glist.length < 3) {
      alert("Please choose at least 3 directions!");
      navigate("/direction");
      return;
    }

    const formData = new FormData();
    Object.entries(files).forEach(([dir, file]) => {
      if (file) formData.append(dir, file);
    });

    try {
      await axios.post("http://127.0.0.1:5000/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      navigate("/result");
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Upload failed. Check console for details.");
    }
  };
  

  return (
    <div className="bg-[url(./assets/bghome.png)] h-screen w-full bg-no-repeat bg-cover">
      <Navbar />
      <div className="mt-4 flex justify-center items-center">
        <div className="bg-white h-[600px] w-[1200px] rounded-2xl shadow-lg p-6">
          <h1 className="text-3xl text-center font-bold">Upload Traffic Images</h1>
          <hr className="border-2 my-3 w-full" />
          <div className="flex flex-col gap-5 mt-4">
            {glist.map((dir) => (
              <div key={dir} className="flex items-center gap-4">
                <span className="font-semibold w-20">{dir.toUpperCase()}</span>
                <input
                  type="file"
                  onChange={(e) => handleFileChange(dir, e)}
                  className="border rounded-lg p-2 w-72"
                />
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-6">
            <button
              onClick={()=>{handleUpload();setisactive(true)}}
              className="px-6 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition"
            >
              Upload & View Results
            </button>
  
            
          </div>
          <div className="flex justify-center mt-10">
          <div class={isactive ?"animate-spin inline-block size-6 border-3 border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500" : "hidden"} role="status" aria-label="loading">
              <span class="sr-only">Loading...</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Upload;
