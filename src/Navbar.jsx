import { Link } from "react-router-dom";
function Navbar(){
    return(
    <>
        <nav className="bg-[#124879] h-[100px] w-full rounded-b-3xl flex justify-between items-center px-14">
            <div className="flex justify-center items-center gap-4">
            <img src="src/assets/logo.svg" alt="" className="h-24 w-24"/>
             <Link to="/"><p className="font-bold text-lg">Metropulse</p></Link>
            </div>
           
            <div className="flex gap-3">
                <Link to="/home" ><p className="font-bold hover:text-white transition">Home</p></Link>
                <Link to="/lanechoose" ><p className="font-bold hover:text-white transition">lane Options</p></Link>
                <Link to="/aboutus" ><p className="font-bold hover:text-white transition">About us</p></Link>
            </div>
        </nav>
    </>
    )
}

export default Navbar