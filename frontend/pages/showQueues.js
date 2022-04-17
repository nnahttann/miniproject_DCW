import Head from 'next/head'
import Layout from '../components/layout'
import Navbar from '../components/navbar'
import { useEffect, useState } from 'react'
import axios from 'axios'
import queuesAuth from '../components/queuesAuth'
import config from '../config/config'


const URL = `${config.URL}/queues`

const showQueues = ({ token }) => {

    const [queues, setQueues] = useState({
        list:
            [
                { id: 1, name: 'Natthanon', phone: 'xxx-xxx-xxxx', license: "1xx xxxx" },
                { id: 2, name: 'Natthanon', phone: 'xxx-xxx-xxxx', license: "2xx xxxx" },
            ]
    })
    useEffect(() => {
        getQueues()
    }, [])
    const getQueues = async () => {
        let queue = await axios.get(URL)
        setQueues(queue.data)
    }
    const printQueues = () => {
        console.log('Queues:', queues)
        if (queues.list && queues.list.length)
            return (queues.list.map((queues, index) =>
            (<div className="mt-12" key={index} >
            <span className=" text-[#00ADB5]">queue : </span> {index + 1}<br></br>
            <span className=" text-[#00ADB5]">Name  </span>{queues.name}<br></br>
            <span className=" text-[#00ADB5]">Phone </span>  {queues.phone}<br></br>
            <span className=" text-[#00ADB5]"> License Plate </span> {queues.license}  <br></br>
            </div>)
            ))
        else {
            return (<span className="flex flex-col items-center text-4xl animate-pulse">No Queues</span>)
        }
    }
    return (
        <Layout>
            <Head>
                <title>Queues</title>
            </Head>
            <div className="flex flex-col justify-start items-center h-screen w-screen bg-[#393E46]">
                <div className="flex flex-col text-[#EEEEEE] text-2xl font-bold w3/4 uppercase">
                    <br />
                    <Navbar /><br />
                </div>
                <div />
                <div>
                    <span className=" text-[#00ADB5] text-6xl font-bold flex flex-col text-center mt-20 animate-bounce uppercase">Show Queues</span>
                </div>
                {JSON.stringify(queues.queues)}
                <div className="flex flex-col text-[#EEEEEE] text-2xl font-bold w3/4 uppercase mt-4">
                    {printQueues()}
                </div>

            </div>
        </Layout>
    )
}
export default queuesAuth(showQueues)

export function getServerSideProps({ req, res }) {
    return { props: { token: req.cookies.token || "" } };
}
