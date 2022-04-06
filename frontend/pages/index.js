import Head from 'next/head' 
import Layout from '../components/layout' 
import Navbar from '../components/navbar'

export default function Home({ token }) {
 
  return (
    <Layout>
    <Head>
        <title>First Page</title>
    </Head>
    <div className="flex flex-col justify-start w3/4 items-center h-screen w-screen bg-[#393E46] text-[#EEEEEE] text-2xl font-bold w3/4 uppercase">
                <br />
                <Navbar /><br />
                <div/>
                <div/>
        <h1 className=" text-[#00ADB5] text-6xl flex flex-col items-center">Home page</h1>
        No login required!
    </div>
</Layout>
  )
}

export function getServerSideProps({ req, res }) {
  // console.log("token from cookie: ",cookie.get("token")) 
  // console.log('req: ', req.headers)
  return { props: { token: req.cookies.token || "" } };
}
