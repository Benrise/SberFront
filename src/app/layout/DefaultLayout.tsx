import { Outlet } from 'react-router-dom'
import Header from '@/widgets/header'

import './styles.scss'

const DefaultLayout = () => {
    return (
        <div className='default-layout'>
            <Header />
            <main className="default-layout__main">
                <Outlet/>
            </main>
        </div>
    )
}

export { DefaultLayout }