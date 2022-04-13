import Head from 'next/head'
import Layout from '../components/layout'
import Navbar from '../components/navbar'
import { useEffect, useState } from 'react'
import axios from 'axios'
import withAuth from '../components/withAuth'
import config from '../config/config'

const Profile1 = ({ token }) => {

    const [user, setUser] = useState({})

    useEffect(() => {
        profileUser()
    }, [])

    const profileUser = async () => {
        try {
            // console.log('token: ', token)
            const users = await axios.get(`${config.URL}/profile`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            // console.log('user: ', users.data)
            setUser(users.data)
        }
        catch (e) {
            console.log(e)
        }

    }
 
    return (
        <Layout>
            <Head>
                <title>User profile</title>
            </Head>
            <div className="flex flex-col justify-start w3/4 items-center h-screen w-screen bg-[#393E46] text-[#EEEEEE] text-2xl font-bold w3/4 uppercase">
                <br />
                <Navbar /><br />
                <div/>
                <div/>
                <h1 className=" text-[#00ADB5] text-6xl flex flex-col items-center" >User profile</h1>
                <br/><br/>
                <div className="text-3xl text-[#EEEEEE]"><b>Token:</b> {token.substring(0, 15)}...
                <button className="flex flex-col items-center w-3/4 uppercase text-2xl bg-[#00ADB5] font-bold text-[#222831] rounded-lg "
                        onClick={() => { navigator.clipboard.writeText(token) }}>
                        Copy token
                </button>
                </div>
                <div className=" text-[#EEEEEE] text-2xl flex flex-col items-center" >  <br/>
                    This route is protected by token, user is required to login first.
                    <br/>
                    Otherwise, it will be redirect to Login page
                    <br/><br/>
                    {JSON.stringify(user)}
                </div>
            </div>
        </Layout>
    )
}

export default withAuth(Profile1)

export function getServerSideProps({ req, res }) {
    return { props: { token: req.cookies.token || "" } };
}
