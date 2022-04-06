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

    const loginForm = () => (
        <div className="flex flex-col text-[#EEE]">
            <div><b>Username:</b></div>
            <div className="flex flex-col">
                <input className="text-2xl text-[#00ADB5] bg-[#EEEEEE] rounded-lg mx-2 pl-4 font-bold outline-[#00ADB5]"
                    type="text"
                    name="username"
                    placeholder="username"
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div ><b>Password:</b></div>
            <div className="flex flex-col">
                <input className="text-2xl text-[#00ADB5] bg-[#EEEEEE] rounded-lg mx-2 pl-4 font-bold outline-[#00ADB5]"
                    type="password"
                    name="password"
                    placeholder="password"
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div><br/>
            <div className="text-2xl text-[#EEE]">
                <input
                    id="remember_me"
                    name="remember_me"
                    type="checkbox"
                    onClick={rememberme}
                />
                    <label>Remember Me</label>
            </div>

        </div>
        
    );

    const copyText = () => {
        navigator.clipboard.writeText(token);
    };

    return (

        <Layout>
            <Head>
                <title>Login Page</title>
            </Head>
            <div className="flex flex-col justify-start items-center h-screen w-screen bg-[#393E46]">
                <div className="text-[#EEEEEE] text-2xl font-bold w3/4 uppercase">
                <br />
                <Navbar /><br />
        
                <h1 className=" text-[#00ADB5] text-6xl flex flex-col items-center">Login</h1>
                <div className="text-xl text-[#EEEEEE]">
                    <b>Token:</b> {token.substring(0, 15)}...
                    <button className="flex flex-col items-center w-1/4 text-xl bg-[#00ADB5] font-bold text-[#222831] rounded-lg " onClick={copyText}> Copy token </button>
                </div>
                <br />
                <div className="flex flex-row w-3/4 text-xs" >Status: {status}</div>
                <br />
                {loginForm()}
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
