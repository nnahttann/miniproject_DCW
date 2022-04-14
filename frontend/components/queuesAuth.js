import { useRouter } from 'next/router'
import { useEffect } from 'react'

const queuesAuth = WrappedComponent => {
    const Wrapper = props => {
        const { token } = props
        const router = useRouter()
        useEffect(() => {
            if (token)
                router.push('/showQueues_edit')
        }, [token])
        return (<WrappedComponent {...props} />)
    }
    return Wrapper
}
export default queuesAuth