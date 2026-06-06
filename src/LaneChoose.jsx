import { Link } from 'react-router-dom';
import Navbar from './Navbar.jsx';  
import { useEffect, useState } from 'react';


function LaneChoose({glist,setGlist}){
    const alldir=['north','west','south','east'];
    useEffect(()=>{
        setGlist(alldir);
    },[]);
    return(
        <>
            <div className="bg-[url(./assets/bghome.png)] h-screen w-full bg-no-repeat bg-cover">
            <Navbar/>
            
            <div className='flex gap-16 h-[600px] justify-center items-center'>
            <Link to='/direction'>
            <div className='bg-gray-600 h-[500px] w-72 p-10 rounded-4xl '>
                <h2 className='text-3xl font-bold text-center text-white'>3-junction</h2>
                <hr className='h-px my-8 text-white border-1'/>
                <img src="src/assets/3way.png" alt="" className='h-52 w-52 mt-16'/>
            </div>
            </Link>
            <Link to='/upload'>
            <div className='bg-gray-600 h-[500px] w-72 p-10 rounded-4xl'>
                <h2 className='text-3xl font-bold text-center text-white'>4-junction</h2>
                <hr className='h-px my-8 text-white border-1'/>
                <img src="src/assets/4way.png" alt="" className='mt-16 h-52 w-52'/>
            </div>
            </Link>
            </div>
            </div>
        </>
    )

}

export default LaneChoose;