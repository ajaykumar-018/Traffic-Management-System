import Home from './Home.jsx';
import LaneChoose from './LaneChoose.jsx'; 
import {createBrowserRouter,RouterProvider} from 'react-router-dom';
import AboutUs from './AboutUs.jsx';
import Direction from './Direction.jsx';
import Upload from './Upload.jsx';
import './index.css';
import { useState } from 'react';
import Result from './Result.jsx';



function App(){
    const [glist,setGlist]=useState([]);
    const router=createBrowserRouter([
  {
    path:'/',
    element:<Home/>

  },
  {
    path:'/home',
    element:<Home/>
  },
  {
    path:'/lanechoose',
    element:<LaneChoose glist={glist} setGlist={setGlist}/>
  },
  {
    path:'/aboutus',
    element:<AboutUs/>
  },
  {
    path:'/direction',
    element:<Direction glist={glist} setGlist={setGlist}/>
  },
  {
    path:'/upload',
    element:<Upload glist={glist} setGlist={setGlist}/>
  },
  {
    path:'/result',
    element:<Result/>
  }


]);
    return(
        <>
            <RouterProvider router={router}/>    
        </>
    )
}
export default App;