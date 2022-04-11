import Layout from '../components/layout'
import Head from 'next/head'
import Navbar from '../components/navbar'

const GetConfig = () => {
    return (<Layout>
        <Head>
            <title>About Me</title>
        </Head>
        <div>

        </div>
        <div className="flex flex-col justify-start items-center h-screen w-screen bg-[#393E46] text-[#EEEEEE] text-2xl font-bold uppercase">
            <br />
            <Navbar /><br />
            <div />
            <div />
            <h1 className=" text-[#00ADB5] text-6xl flex flex-col items-center">About Me</h1>
            <br />
            <h1 className=" text-[#00ADB5] text-5xl ">make by</h1>
            <br />
            <p className="text-4xl text-center">
                Natthanon Narit<br/>
                Student Id : 6135512060<br/>
                college of computing<br/>
            </p>
            <br />
            <a href="https://www.apple.com/pro-display-xdr/" >Youtube link</a>
            <a href="https://www.apple.com/pro-display-xdr/" >Medium link</a>
            <p className=" text-[#00ADB5]">
                <br /> part of the course 240-311 Distributed Computing and Web Technologies</p><br />
        </div>

    </Layout>)
}

export default GetConfig