import Navbar from './Navbar.jsx'; 


function AboutUs(){
    return(
        <>
        <div className="bg-[url(./assets/bghome.png)] h-screen w-full bg-no-repeat bg-cover">
            <Navbar/>
            <div className="mt-4 flex justify-center items-center">
                <div className="bg-white h-[600px] w-[1200px] rounded-2xl shadow-lg p-6 flex justify-center items-center gap-28">
                    <div className='bg-gray-600 h-[500px] w-96 p-5 rounded-4xl '>
                        <h2 className='text-3xl font-bold text-center text-white'>T.Sivamathu</h2>
                        <hr className='h-px my-8 text-white border-1'/>
                        <p className='text-white  text-lg'> CONTACT <br/>
                                +91 9342259122
                                sivamathu2005@gmail.com
                                linkedin.com/in/sivamathu-t71a3442a3<br/>
                                github.com/Sivamathu</p>
                    </div>
                    <div className='bg-gray-600 h-[500px] w-96 p-5 rounded-4xl '>
                        <h2 className='text-3xl font-bold text-center text-white'>Thiru Murugan K</h2>
                        <hr className='h-px my-8 text-white border-1'/>
                        <p className='text-white  text-lg'> CONTACT <br/>
                                +91 9360813620
                        </p>
                    </div>
                </div>
            </div>
        </div>
        </>
    )

}

export default AboutUs;