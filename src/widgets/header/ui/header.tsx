import { Link } from 'react-router-dom'
import './styles.scss'
import { UserBadge } from '@/entities/user/ui/badge'

import IconExit from '~icons/heroicons/arrow-right-end-on-rectangle';
import { Button } from '@/shared/ui/button';
import { observer } from 'mobx-react-lite';
import { AuthModel } from '@/entities/auth';
import { UserModel } from '@/entities/user';

export const Header: React.FunctionComponent = observer(() => {

    const authStore= AuthModel.authStore;
    const userStore = UserModel.userStore;

    const logout = () => {
        authStore.logout();
    }

    return (
        <header className='header'>
            <div className="header__container">
                <div className="header__left">
                    <Link to='/' className='header__logo'>
                    <img src="/images/svg/logo/sber.svg" alt='Логотип сбера' />
                    </Link>
                    <nav>
                        <ul className='header__menu menu'>
                            <li className='menu__item'>
                                <Link to='/' className='menu__link'>
                                    <Button variant={'link'}>Главная</Button>
                                </Link>
                            </li>
                            <li className='menu__item'>
                                <Link to='/preprocessing' className='menu__link'>
                                    <Button variant={'link'}>Предобработка</Button>
                                </Link>
                            </li>
                            <li className='menu__item'>
                                <Link to='/distribution' className='menu__link'>
                                    <Button variant={'link'}>Распределение</Button>
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div className="header__right">
                    <UserBadge user={userStore.user} />
                    <Button variant={'ghost'} size={'icon'} onClick={logout}>
                        <IconExit width={24} height={24} />
                    </Button>
                </div>
            </div>
        </header>
    )
})