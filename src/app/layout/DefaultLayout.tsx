import { Outlet } from 'react-router-dom'
import Header from '@/widgets/header'

import './styles.scss'

const DefaultLayout = () => {
    return (
        <>
            <Header />
            <main className='default-layout'>
                <Outlet/>
            </main>
        </>
    )
}

export { DefaultLayout }