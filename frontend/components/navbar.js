import Link from 'next/link'

const Navbar = () => (
    <div>
        <Link href="/"><a> Home </a></Link> |
        <Link href="/register"><a> Register </a></Link>  |
        <Link href="/login"><a> Login </a></Link> |
        <Link href="/profile"><a> Profile </a></Link> |  
        <Link href="/showQueues"><a> Queues </a></Link> |
        <Link href="/aboutMe"><a> About Me </a></Link> |  
        <Link href="/logout"><a> Logout </a></Link> 
    </div>
)

export default Navbar