import Head from 'next/head'
import Layout from '../components/layout'
import Navbar from '../components/navbar'
import { useEffect, useState } from 'react'
import useSWR, { mutate } from 'swr'
import axios from 'axios'
import queuesAuth from '../components/queuesAuth'
import config from '../config/config'
import React, { Component } from 'react'
import Footer from '../components/footer'

const URL = `${config.URL}/queues`
const fetcher = url => axios.get(url).then(res => res.data)
const editQueues = ({ token }) => {

    const [queues, setQueues] = useState({
        list:
            [
                { id: 1, name: 'Natthanon', phone: 'xxx-xxx-xxxx', license: "1xx xxxx" },
                { id: 2, name: 'Natthanon', phone: 'xxx-xxx-xxxx', license: "1xx xxxx" },
            ]
    })
    const [idEdit, setidEdit] = useState('')
    const { data } = useSWR(URL, fetcher)
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
            (<div className="flex flex-col mt-2 h-full h-full items-center" key={index}>
                <div className='w-full h-full'>
                    <span className=" text-[#00ADB5]">queue : </span>{index + 1}<br></br>
                    <span className=" text-[#00ADB5] ">Name  </span>
                    <br></br>
                    {(+idEdit !== +queues.id) ? queues.name :
                        (<input className="text-2xl w-full text-[#00ADB5] bg-[#EEEEEE] rounded-lg mx-2 pl-4 font-bold outline-[#00ADB5]"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}>
                        </input >)
                    } <br></br>
                    <span className=" text-[#00ADB5]">Phone : </span>
                    <br></br>
                    {(+idEdit !== +queues.id) ? queues.phone :
                        (<input className="text-2xl w-full text-[#00ADB5] bg-[#EEEEEE] rounded-lg mx-2 pl-4 font-bold outline-[#00ADB5]"
                            type="text"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}>
                        </input >)
                    } <br></br>
                    <span className=" text-[#00ADB5]"> License Plate </span>
                    <br></br>
                    {(+idEdit !== +queues.id) ? queues.license :
                        (<input className="text-2xl w-full text-[#00ADB5] bg-[#EEEEEE] rounded-lg mx-2 pl-4 font-bold outline-[#00ADB5]"
                            type="text"
                            value={license}
                            onChange={(e) => setLicense(e.target.value)}>
                        </input >)
                    } <br></br>
                </div>
                <button className="flex flex-col mr-4 p-2 mt-8 w-3/4 text-2xl items-center bg-red-400 hover:text-[#EEEEEE] rounded-lg font-bold uppercase"
                    onClick={() => deleteQueues(queues.id)} > Delete Queues
                </button>
                <button className="flex flex-col mr-4 p-2 w-3/4 text-2xl items-center mt-4 bg-yellow-500 hover:text-[#EEEEEE] rounded-lg font-bold uppercase"
                    onClick={() => updateQueues(queues.id)} > update Queues
                </button>
                <button className="mr-4 p-2 mt-4 bg-blue-500 w-3/4 hover:text-[#EEEEEE] rounded-lg drop-shadow-lg font-bold transition motion-reduce:transition-none motion-reduce:hover:transform-none uppercase"
                    onClick={() => editQueues(data.list, queues.id, queues.name, queues.phone, queues.license)} > edit Queues
                </button>

            </div >)
            ))
        else {
            return (<span className="flex flex-col items-center text-4xl animate-pulse">No Queues</span>)
        }
    }
    const addQueues = async (name, phone, license) => {
        if (name.trim() === '' || phone.trim() === '' || license.trim() === '') {
            alert('Please complete the information')
        }
        else {
            const result = await axios.post(URL, { name, phone, license })
            console.log(result.data)
            setQueues(result.data)
        }
        mutate(URL)
    }

    const updateQueues = async (id) => {
        if (name.trim() === '' || phone.trim() === '' || license.trim() === '') {
            alert('Please complete the information')
        } else {
            const result = await axios.put(`${URL}/${id}`, {
                name,
                phone,
                license
            })
            console.log('Quesue id update: ', result.data)
        setQueues(result.data)
        }
    }

    const editQueues = async (queues, id) => {
        setidEdit(id)
        let text = queues.find((queue) => +queue.id === +id)
        setName(text.name)
        setPhone(text.phone)
        setLicense(text.license)
        if (+idEdit === +id) { //Press Edit again
            const result = await axios.put(`${URL}/${id}`, {
                name, phone, license
            })
            setidEdit(0)
            setQueues(result.data)
        }
        mutate(URL)
    }
    const deleteQueues = async (id) => {
        const result = await axios.delete(`${URL}/${id}`)
        console.log(result.data)
        setQueues(result.data)
        mutate(URL)
    }

    return (
        <Layout>
            <Head>
                <title>Queues</title>
            </Head>
            <div className="flex flex-col justify-start items-center h-full w-full bg-[#393E46]">
                <div className="flex flex-col text-[#EEEEEE] text-2xl font-bold w3/4 uppercase">
                    <br />
                    <Navbar /><br />
                    <div />
                    {JSON.stringify(queues.queues)}
                    <div>
                        <span className=" text-[#00ADB5] text-6xl font-bold flex flex-col text-center mt-20 mb-8 animate-bounce uppercase">Show Queues</span>
                    </div>
                    <div className=" = flex flex-col justify-start">
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
                            <button className="w-2/4 my-8 text-2xl bg-[#00ADB5] font-bold text-[#222831] hover:text-[#00ADB5] dark:md:hover:bg-[#222831] rounded-lg uppercase" onClick={() => addQueues(name, phone, license)}>Add Queues</button>
                        </div>
                    </div>
                </div>
                <div className='w-screen'>
                    <Footer />
                </div>
            </div>
        </Layout>
    )
}

export default queuesAuth(editQueues)

export function getServerSideProps({ req, res }) {
    return { props: { token: req.cookies.token || "" } };
}