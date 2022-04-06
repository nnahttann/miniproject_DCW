import Layout from '../components/layout'
import Head from 'next/head'
import config from '../config/config'
import styles from '../styles/Home.module.css'
import Navbar from '../components/navbar'

const GetConfig = () => {
    return (<Layout>
        <Head>
            <title>Get Config</title>
        </Head>
        <div>
            
        </div>
        <div className="flex flex-col justify-start w3/4 items-center h-screen w-screen bg-[#393E46] text-[#EEEEEE] text-2xl font-bold w3/4 uppercase">
                <br />
                <Navbar /><br />
                <div/>
                <div/>
            <h2 className=" text-[#00ADB5] text-4xl flex flex-col items-center">Config: Get Configuration from ../config/config.js </h2>
            <br />
            <b >Config: </b> {JSON.stringify(config)}
            <ul>
                <li>npm run dev  (for development mode)</li>
                <li>npm run build; npm run start  (for production mode)</li>
            </ul>
        </div>

    </Layout>)
}

export default GetConfig