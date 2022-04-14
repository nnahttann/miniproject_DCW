import Head from 'next/head'
import Layout from '../components/layout'
import Navbar from '../components/navbar'
import { useEffect, useState } from 'react'

import axios from 'axios'
import stdAuth from '../components/queuesAuth'
import config from '../config/config'

const URL = `${config.URL}/queues`
const editQueues = ({ token }) => {

    const [queues, setQueues] = useState({
        list:
            [
                { id: 1, name: 'Natthanon', phone: 'xxx-xxx-xxxx', license: "1xx xxxx" },
            ]
    })
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [license, setLicense] = useState('')

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
            (<div className="flex flex-col items-center mt-8" key={index}>
                <div >
                    Name : {queues.name} <br></br>
                    Phone : {queues.phone}  <br></br>
                    License Plate: {queues.license}  <br></br>
                </div>
                <button className="mr-4 p-2 mt-8 bg-red-400 hover:text-[#EEEEEE] rounded-lg drop-shadow-lg font-bold transition motion-reduce:transition-none motion-reduce:hover:transform-none uppercase" onClick={() => deleteQueues(queues.id)} > Delete </button>
            </div >)
            ))
        else {
            return (<span className="flex flex-col items-center text-4xl animate-pulse">No Queues</span>)
        }
    }

    const addQueues = async (name, phone, license) => {
        let result = await axios.post(URL, { name, phone, license })
        console.log(result.data)
        setQueues(result.data)
    }

    const deleteQueues = async (id) => {
        const result = await axios.delete(`${URL}/${id}`)
        console.log(result.data)
        setQueues(result.data)
    }

    return (
        <Layout>
            <Head>
                <title>Queues</title>
            </Head>
            <div className="flex flex-col justify-start items-center h-full w-screen bg-[#393E46]">
                <div className="flex flex-col text-[#EEEEEE] text-2xl font-bold w3/4 uppercase">
                    <br />
                    <Navbar /><br />
                    <div />
                    {JSON.stringify(queues.queues)}
                    <div>
                        <span className=" text-[#00ADB5] text-6xl font-bold flex flex-col text-center mt-20 mb-8 animate-bounce uppercase">Show Queues</span>
                    </div>
                    <div className=" = flex flex-row justify-start">
                        <div className="flex flex-col text-[#EEEEEE] text-2xl font-bold w3/4 uppercase">
                            {printQueues()}
                        </div>
                    </div>
                    <div>
                        <span className=" text-[#00ADB5] text-6xl font-bold flex flex-col text-center mt-20 animate-bounce uppercase">Add Queues</span>
                    </div>
                    <div className="flex flex-col justify-start text-[#EEE]">
                        <div className="flex flex-col text-3xl text-[#EEE] font-bold font-display rounded-lg mt-2 uppercase ">
                            <div className='flex flex-col justify-center my-4'>
                                <label>Name</label>
                            </div>
                            <div className="flex flex-col">
                                <input className="text-2xl text-[#00ADB5] bg-[#EEEEEE] rounded-lg mx-2 pl-4 font-bold outline-[#00ADB5]"
                                    type="text"
                                    name="Name"
                                    placeholder="Name"
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className='flex flex-col justify-center my-4'>
                                <label>Phone</label>
                            </div>
                            <div className="flex flex-col">
                                <input className="text-2xl text-[#00ADB5] bg-[#EEEEEE] rounded-lg mx-2 pl-4 font-bold outline-[#00ADB5]"
                                    type="text"
                                    name="Phone"
                                    placeholder="Phone"
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                            </div> <div className='flex flex-col justify-center my-4'>
                                <label>License plate</label>
                            </div>
                            <div className="flex flex-col">
                                <input className="text-2xl text-[#00ADB5] bg-[#EEEEEE] rounded-lg mx-2 pl-4 font-bold outline-[#00ADB5]"
                                    type="text"
                                    name="License"
                                    placeholder="License Plate"
                                    onChange={(e) => setLicense(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col items-center">
                            <button className="flex flex-col items-center w-1/4 my-8 text-2xl bg-[#00ADB5] font-bold text-[#222831] hover:text-[#00ADB5] dark:md:hover:bg-[#222831] rounded-lg uppercase" onClick={() => addQueues(name, phone, license)}>Add Queues</button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default stdAuth(editQueues)

export function getServerSideProps({ req, res }) {
    return { props: { token: req.cookies.token || "" } };
}