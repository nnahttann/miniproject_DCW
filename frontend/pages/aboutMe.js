import Layout from '../components/layout'
import Head from 'next/head'
import Navbar from '../components/navbar'
import Footer from '../components/footer'

const GetConfig = () => {
    return (<Layout>
        <Head>
            <title>About Me</title>
        </Head>
        <div className="flex flex-col justify-start items-center h-screen w-screen bg-[#393E46]">
            <div className="flex flex-col text-[#EEEEEE] text-2xl font-bold w3/4 uppercase">
                <br />
                <Navbar /><br />
                <span className=" text-[#00ADB5] text-5xl flex flex-col text-center mt-8 animate-bounce">About Me</span>
            </div>
            <div className="flex flex-col items-center text-[#EEEEEE] text-2xl font-bold w-full uppercase">
                <span className=" text-[#00ADB5] text-4xl mt-20 font-bold w3/4 uppercase animate-pulse">make by</span>
            <br />
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgHkVbBgGO9K-4NpZ8lSJr1VPHGFQFIpF9-A_mZaMRnk_3swoEqiGxUR4xzN5Cnu8e-ZA&usqp=CAU" width="200" height="150"></img>
            <div className="flex flex-col text-[#EEEEEE] text-xl text-center mt-8 font-bold w3/4 uppercase">
                <span>
                    Natthanon Narit<br />
                    Student Id : 6135512060<br />
                    computer engineering <br />
                </span>
            </div>
            </div>
            
        </div>
        <div className='w-screen'>
            <Footer />
        </div>
    </Layout>)
}

export default GetConfig