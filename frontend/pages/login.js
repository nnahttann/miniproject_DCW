import Head from "next/head";
import Layout from "../components/layout";
import { useState } from "react";
import Navbar from "../components/navbar";
import axios from "axios";
import config from "../config/config";

export default function Login({ token }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [status, setStatus] = useState("");
    const [remember, setRemember] = useState(false);
    const login = async (req, res) => {
        try {
            let result = await axios.post(`${config.URL}/login`, { username, password, remember }, { withCredentials: true });
            console.log("result: ", result);
            console.log("result.data:  ", result.data);
            console.log("token:  ", token);
            setStatus(result.status + ": " + result.data.user.username);
        }
        catch (e) {
            console.log("error: ", JSON.stringify(e.response));
            setStatus(JSON.stringify(e.response).substring(0, 80) + "...");
        }
    };
    const rememberme = async () => {
        setRemember(!remember);
    };

    const copyText = () => {
        navigator.clipboard.writeText(token);
    };

    return (
        <Layout>
            <Head>
                <title>Login Page</title>
            </Head>
            <div className="flex flex-col justify-start items-center h-screen w-screen bg-[#393E46]">
                <div className="flex flex-col text-[#EEEEEE] text-2xl font-bold w3/4 uppercase rounded-t-xl">
                    <br />
                    <Navbar /><br />
                    <div />
                    <div>
                        <span className=" text-[#00ADB5] text-6xl flex flex-col text-center mt-20">Login</span>
                    </div>
                    {/* <div className="text-xl text-[#EEEEEE]">
                    <b>Token:</b> {token.substring(0, 15)}...
                    <button className="flex flex-col items-center w-1/4 text-xl bg-[#00ADB5] font-bold text-[#222831] rounded-lg " onClick={copyText}> Copy token </button>
                </div> */}
                    <div className="text-xs my-6 text-m italic" >Status: {status}</div>

                    <div className="flex flex-col justify-start text-[#EEE]">
                        <div className='flex flex-col justify-center my-4'>
                            <label>Username</label></div>
                        <div className="flex flex-col">
                            <input className="text-2xl text-[#00ADB5] bg-[#EEEEEE] rounded-lg mx-2 pl-4 font-bold outline-[#00ADB5]"
                                type="text"
                                name="username"
                                placeholder="Username"
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className='flex flex-col justify-center my-4'>
                            <label>Password</label></div>
                        <div className="flex flex-col">
                            <input className="text-2xl h-8 text-[#00ADB5] bg-[#EEEEEE] rounded-lg mx-2 pl-4 font-bold outline-[#00ADB5]"
                                type="password"
                                name="password"
                                placeholder="Password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="text-2xl text-[#EEE] my-8">
                            <input
                                id="remember_me"
                                name="remember_me"
                                type="checkbox"
                                onClick={rememberme}
                            />
                            <label className="ml-6">Remember Me</label>
                        </div>
                    </div>
                    <div className="flex flex-col items-center">
                        <button className="flex flex-col items-center w-1/4  text-2xl bg-[#00ADB5] font-bold text-[#222831] hover:text-[#00ADB5] dark:md:hover:bg-[#222831] rounded-lg uppercase" onClick={login}>Login</button>
                    </div>
                </div>
            </div>

        </Layout>
    );
}

export function getServerSideProps({ req, res }) {
    return { props: { token: req.cookies.token || "" } };
}
