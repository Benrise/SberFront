import { NavLink } from 'react-router-dom'
import './styles.scss'
import { UserBadge } from '@/entities/user/ui/badge'

import IconExit from '~icons/heroicons/arrow-right-end-on-rectangle';
import { Button } from '@/shared/ui/button';
import { observer } from 'mobx-react-lite';
import { AuthModel } from '@/entities/auth';
import { UserModel } from '@/entities/user';

import { Skeleton } from "@/shared/ui/skeleton"

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
                    <NavLink to='/' className='header__logo'>
                    <img src="/images/svg/logo/sber.svg" alt='Логотип сбера' />
                    </NavLink>
                    <nav>
                        <ul className='header__menu menu'>
                            <li className='menu__item'>
                                <NavLink to='/'>
                                    {({ isActive }) => (
                                            <Button
                                                variant={'link'}
                                                className={isActive ? 'opacity-100' : ''}
                                            >
                                                Главная
                                            </Button>
                                    )}
                                </NavLink>
                            </li>
                            <li className='menu__item'>
                                <NavLink to='/preprocessing'>
                                    {({ isActive }) => (
                                            <Button
                                                variant={'link'}
                                                className={isActive ? 'opacity-100' : ''}
                                            >
                                                Предобработка
                                            </Button>
                                    )}
                                </NavLink>
                            </li>
                            <li className='menu__item'>
                                <NavLink to='/distribution'>
                                    {({ isActive }) => (
                                            <Button
                                                variant={'link'}
                                                className={isActive ? 'opacity-100' : ''}
                                            >
                                                Распределение
                                            </Button>
                                    )}
                                </NavLink>
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