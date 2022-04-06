
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
        }
        catch (e) {
            console.log(e)
        }

    }

    const registerForm = () => (
        <div className="flex flex-col text-[#EEE]">
            <div>
                Username:
            </div>
            <div className="flex flex-col">
                <input className="text-2xl text-[#00ADB5] bg-[#EEEEEE] rounded-lg mx-2 pl-4 font-bold outline-[#00ADB5]"
                    type="text"
                    name="username"
                    placeholder="username"
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div>
                Email:
            </div>
            <div className="flex flex-col font-bold">
                <input className="text-2xl text-[#00ADB5] bg-[#EEEEEE] rounded-lg mx-2 pl-4 font-bold outline-[#00ADB5]" 
                    type="email"
                    name="email"
                    placeholder="email"
                    onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
                Password:
            </div>
            <div className="flex flex-col ">
                <input className="text-2xl text-[#00ADB5] bg-[#EEEEEE] rounded-lg mx-2 pl-4 font-bold outline-[#00ADB5]"
                    type="password"
                    name="password"
                    placeholder="password"
                    onChange={(e) => setPassword(e.target.value)} />
            </div>

        </div>
    )


    return (
        <Layout>
            <Head>
                <title>Register</title>
            </Head>
            <div className="flex flex-col justify-start w3/4 items-center h-screen w-screen bg-[#393E46]">
                <div className="text-[#EEEEEE] text-2xl font-bold w3/4 uppercase">
                <br />
                <Navbar /><br />
                <div/>
                <div/>
                
                <h1 className=" text-[#00ADB5] text-6xl flex flex-col items-center" >Register</h1>
                <div className="text-xl text-[#EEEEEE]"><b>Token:</b> {token.substring(0, 15)}...
                <button className="flex flex-col items-center w-1/4 text-xl bg-[#00ADB5] font-bold text-[#222831] rounded-lg "
                        onClick={() => { navigator.clipboard.writeText(token) }}>
                        Copy token
                </button>
                </div>
                <br />
                <div className="flex flex-row w-3/4 text-xs" >Status: {status}</div>
                <br />
                <div>
                    {registerForm()}
                </div>
                <div className="flex flex-col items-center"><br/>
                    <button className="flex flex-col items-center w-1/4  text-2xl bg-[#00ADB5] font-bold text-[#222831] hover:text-[#00ADB5] dark:md:hover:bg-[#222831] rounded-lg uppercase" onClick={register}>Register</button>
                </div>
            </div>
            </div>
            
        </Layout>
    )
}

export function getServerSideProps({ req, res }) {
    return { props: { token: req.cookies.token || "" } };
}
