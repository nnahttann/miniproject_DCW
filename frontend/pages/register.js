
import { useState } from 'react'
import Head from 'next/head'
import Layout from '../components/layout'
import Navbar from '../components/navbar'
import axios from 'axios'
import config from '../config/config'

export default function Register({ token }) {

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [status, setStatus] = useState('')

    const profileUser = async () => {
        console.log('token: ', token)
        const users = await axios.get(`${config.URL}/profile`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        console.log('user: ', users.data)
    }

    const register = async (req, res) => {
        try {
            let result = await axios.post(`${config.URL}/register`,
                { username, email, password })
            console.log('result: ', result)
            console.log('result.data:  ', result.data)
            console.log('token:  ', token)
            setStatus(result.data.message)
            router.push('/login')
        }
        catch (e) {
            console.log(e)
        }
    }

    return (
        <Layout>
            <Head>
                <title>Register</title>
            </Head>
            <div className="flex flex-col justify-start items-center h-full w-screen bg-[#393E46]">
                <div className="flex flex-col text-[#EEEEEE] text-2xl font-bold w3/4 uppercase">
                    <br />
                    <Navbar /><br />
                    <div />
                    <div />
                    <div>
                        <span className=" text-[#00ADB5] text-6xl flex flex-col text-center" >Register</span>
                    </div>
                    <div className="text-xs my-6 text-m italic" >Status: {status}</div>
                    <div className="flex flex-col justify-start text-[#EEE]">
                        <div className='flex flex-col justify-center my-4'>
                            <label>Name</label>
                        </div>
                        <div className="flex flex-col">
                            <input className="text-2xl text-[#00ADB5] bg-[#EEEEEE] rounded-lg mx-2 pl-4 font-bold outline-[#00ADB5]"
                                type="text"
                                name="name"
                                placeholder="Name"
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className='flex flex-col justify-center my-4'>
                            <label>Username</label>
                        </div>
                        <div className="flex flex-col">
                            <input className="text-2xl text-[#00ADB5] bg-[#EEEEEE] rounded-lg mx-2 pl-4 font-bold outline-[#00ADB5]"
                                type="text"
                                name="username"
                                placeholder="Username"
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className='flex flex-col justify-center my-4'>
                            <label>Email</label>
                        </div>
                        <div className="flex flex-col font-bold">
                            <input className="text-2xl text-[#00ADB5] bg-[#EEEEEE] rounded-lg mx-2 pl-4 font-bold outline-[#00ADB5]"
                                type="email"
                                name="email"
                                placeholder="Email"
                                onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className='flex flex-col justify-center my-4'>
                            <label>Password</label>
                        </div>
                        <div className="flex flex-col ">
                            <input className="text-2xl text-[#00ADB5] bg-[#EEEEEE] rounded-lg mx-2 pl-4 font-bold outline-[#00ADB5]"
                                type="password"
                                name="password"
                                placeholder="Password"
                                onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div className='flex flex-col justify-center my-4'>
                            <label>Phone</label>
                        </div>
                        <div className="flex flex-col">
                            <input className="text-2xl text-[#00ADB5] bg-[#EEEEEE] rounded-lg mx-2 pl-4 font-bold outline-[#00ADB5]"
                                type="text"
                                name="phone"
                                placeholder="Phone"
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>

                    </div>
                    <div className="flex flex-col items-center mb-12"><br />
                        <button className="flex flex-col items-center w-1/4 text-2xl bg-[#00ADB5] font-bold text-[#222831] hover:text-[#00ADB5] dark:md:hover:bg-[#222831] rounded-lg uppercase" onClick={register}>Register</button>
                    </div>
                </div>
            </div>

        </Layout>
    )
}

export function getServerSideProps({ req, res }) {
    return { props: { token: req.cookies.token || "" } };
}
