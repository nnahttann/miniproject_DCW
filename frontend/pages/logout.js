import Head from 'next/head'
import Layout from '../components/layout'
import Navbar from '../components/navbar'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import axios from 'axios'
import config from '../config/config'

export default function Logout({ token }) {

    const [status, setStatus] = useState('')

    useEffect(() => {
        logout()
    }, [])

    const logout = async () => {
        console.log('remove token: ', token)
        let result = await axios.get(`${config.URL}/logout`, { withCredentials: true })
        setStatus("Logout successful")
    }
 
    return (
        <Layout>
            <Head>
                <title>User profile</title>
            </Head>
            <div className="flex flex-col justify-start w3/4 items-center h-screen w-screen bg-[#393E46]">   
            <div className="text-[#EEEEEE] text-2xl font-bold w3/4 uppercase">
                <br />
                <Navbar /><br />
                <div/>
                <div/>

                <h1 className=" text-[#00ADB5] text-6xl flex flex-col items-center">Logout</h1>
                <div><br />
                    <h2 className="flex flex-col items-center text-5xl"> {status}  </h2>
                </div>
                </div>
            </div>
        </Layout>
    )
}
