import Head from 'next/head'
import Layout from '../components/layout'
import Link from 'next/link'
import Footer from '../components/footer'

export default function Home({ token }) {

  return (
    <Layout>
      <Head>
        <title>First Page</title>
      </Head>
      <div className="flex flex-col justify-start w3/4 items-center h-screen w-screen bg-[#393E46] font-bold">

        <div className='flex flex-col mt-36 uppercase text-8xl text-center'>
          <span className=" text-[#00ADB5] flex flex-col items-center animate-bounce">Car Wash queue</span>
        </div>
        <div>
          <div className='flex flex-col justify-around mt-20 '>
            <span className=" text-[#EEE] text-2xl mb-4 flex flex-col uppercase ">Already a member</span>
            <Link href='/login'>
              <button className="w-96 flex flex-col items-center text-3xl bg-[#00ADB5] font-bold text-[#222831] hover:text-[#00ADB5] dark:md:hover:bg-[#222831] rounded-lg uppercase" >Log in</button>
            </Link>
            <span className=" text-[#EEE] text-2xl mt-8 mb-4 flex flex-col uppercase ">Not a member</span>
            <Link href='/register'>
              <button className="w-96 flex flex-col items-center text-3xl bg-[#00ADB5] font-bold text-[#222831] hover:text-[#00ADB5] dark:md:hover:bg-[#222831] rounded-lg uppercase">Register</button>
            </Link>
            <span className=" text-[#EEE] text-2xl mt-8 mb-4 flex flex-col uppercase ">Show Queues</span>
            <Link href='/showQueues'>
              <button className="w-96 flex flex-col items-center mb-12 text-3xl bg-[#00ADB5] font-bold text-[#222831] hover:text-[#00ADB5] dark:md:hover:bg-[#222831] rounded-lg uppercase">Queue</button>
            </Link>
          </div>
        </div> <div className='w-screen'>
          <Footer />
        </div>
      </div>

    </Layout>
  )
}

export function getServerSideProps({ req, res }) {
  // console.log("token from cookie: ",cookie.get("token")) 
  // console.log('req: ', req.headers)
  return { props: { token: req.cookies.token || "" } };
}
