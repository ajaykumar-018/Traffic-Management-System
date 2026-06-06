import { Link } from "react-router-dom";
import Navbar from './Navbar.jsx'; 
function Home() {

  return (
    <>
      <div className="bg-[url(./assets/bghome.png)] h-screen w-full bg-no-repeat bg-cover">
        <Navbar/>
        <div className="w-full h-[200px] flex flex-col justify-center pl-3 ">
            <h1 className="text-3xl font-bold text-white">Great traffic management conducts a city's rhythm, turning chaos into synchronized flow.</h1>
            <h1 className="text-xl font-bold text-white">It's about giving people back their most valuable asset—their time.</h1>
            <div className="btn w-44 h-14">
                <Link to='/lanechoose'>
                <button className="w-44 h-14 mt-7 bg-blue-500 hover:bg-blue-800 hover:text-black flex justify-center items-center gap-2 text-white rounded-4xl cursor-pointer">
                        <h2 className="">Get Started</h2>
                        <svg className="w-8 h-8" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 12H5m14 0-4 4m4-4-4-4"/>
                        </svg>  
                </button>
                </Link>
            </div>
        </div>
      </div>
    </>
  )
}

export default Home