
import { Outlet } from 'react-router-dom'
import './styles.scss'

const AuthLayout = () => {
    return (
        <main className='auth-layout'>
            <Outlet />
        </main>
    )
}

export { AuthLayout }