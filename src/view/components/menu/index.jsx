import React from 'react';
import { ReactComponent as Logo } from '../../../assets/logo.svg';
import { ReactComponent as Logout } from '../../../assets/logout.svg';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { appLogout } from '../../../redux/actions';
import { logout } from '../../../firebase';

export const Menu = () => {
    const dispatch = useDispatch();

    const handleOut = () => {
        dispatch(appLogout());
        logout();
    };

    return (
        <div className={'menu px-12 py-3 flex items-center justify-between'}>
            <Link to={'/'}>
                <Logo />
            </Link>
            <div className={'flex items-center'}>
                <ul className={'flex mr-32'}>
                    <li className={'menu_listItem'}>
                        <Link to={'/'}>Главная</Link>
                    </li>
                    <li className={'menu_listItem'}>
                        <Link to={'/profile'}>Профиль</Link>
                    </li>
                </ul>
                <Logout
                    className={'svgIcon cursor-pointer'}
                    onClick={() => handleOut()}
                />
            </div>
        </div>
    );
};
