import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import { useState,useEffect} from "react";
function Direction({glist,setGlist}){
    const [dirlist,setDirlist]=useState([]);
    const [poplist,setPoplist]=useState("");
    const [nselected,setNselected]=useState(false);
    const [eselected,setEselected]=useState(false);
    const [wselected,setWselected]=useState(false);
    const [sselected,setSselected]=useState(false);
    const [flag,setFlag]=useState(false);
    const navigate = useNavigate();
    useEffect(()=>{
        setGlist(dirlist);
    },[dirlist]);
    function update(dir){
        setDirlist(prev => prev.includes(dir) ? prev : [...prev, dir]);
    }
    function handleSubmit(){
        if(dirlist.length > 3 ){
            console.log(dirlist.length)
            alert("Please choose 3 diretion");
            setFlag(true);
            setPoplist(dirlist[3]);
            dirlist.pop();
            window.location.reload();
        }
        if (glist.length < 3) {
            alert("Please choose at least 3 directions!");
            window.location.reload();
            navigate("/direction");
            return;
        }
        navigate(flag ? "/home" : "/Upload");
        console.log(dirlist);
        console.log(dirlist.length == 3);
    }

    useEffect(() => {
        switch(poplist) {
            case "north":
            setNselected(false);
            break;
            case "east":
            setEselected(false);
            break;
            case "west":
            setWselected(false);
            break;
            case "south":
            setSselected(false);
            break;
        }
    }, [poplist]);
    return(
        <>
            <div className="bg-[url(./assets/bghome.png)] h-screen w-full bg-no-repeat bg-cover">
                <Navbar/>
                <div className="w-full  flex  justify-center items-center p-20">
                    <div className=" w-[1000px] bg-white p-10  flex flex-col justify-center items-center rounded-4xl">
                        <h1 className="text-3xl text-center">Direction</h1>
                        <hr className="border-2 my-3 w-full" />
                        <div className="grid grid-cols-2 grid-rows-2 gap-4 p-10 place-items-center">
                            <button className={`px-6 py-3 rounded-2xl h-14 w-36 font-semibold shadow-md transition focus:outline-2 ${nselected ? "bg-blue-600 text-white focus:outline-2" : "bg-gray-200 text-gray-700 border-2"} `} onClick={() =>{setNselected(true);update("north");}}>North</button>
                            <button className={`px-6 py-3 rounded-2xl h-14 w-36 font-semibold shadow-md transition focus:outline-2 ${eselected ? "bg-blue-600 text-white focus:outline-2" : "bg-gray-200 text-gray-700 border-2"} `} onClick={() =>{setEselected(true);update("east");}}>East</button>
                            <button className={`px-6 py-3 rounded-2xl h-14 w-36 font-semibold shadow-md transition focus:outline-2 ${wselected ? "bg-blue-600 text-white focus:outline-2" : "bg-gray-200 text-gray-700 border-2"}`} onClick={() =>{setWselected(true);update("west");}}>West</button>
                            <button className={`px-6 py-3 rounded-2xl h-14 w-36 font-semibold shadow-md transition focus:outline-2 ${sselected ? "bg-blue-600 text-white focus:outline-2" : "bg-gray-200 text-gray-700 border-2"}   `} onClick={() =>{setSselected(true);update("south");}}>South</button>
                        </div>
                            <button className="px-6 py-3 rounded-2xl h-14 w-36 font-semibold bg-blue-600 text-white hover:bg-blue-900 hover:border-4 hover:border-gray-900" onClick={handleSubmit}>Sumit</button>
                        </div>

                </div>
            </div>
        </>
    )
}
export default Direction;