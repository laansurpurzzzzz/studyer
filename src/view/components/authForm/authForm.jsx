import React, { useState, useEffect } from 'react';
import {
    auth,
    logInWithEmailAndPassword,
    setUserData,
} from '../../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { AuthInput } from '../input/auth';
import { useDispatch } from 'react-redux';
import { appLogin, loadingView } from '../../../redux/actions';

export const AuthForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, loading, error] = useAuthState(auth);
    const dispatch = useDispatch();
    const login = () => {
        logInWithEmailAndPassword(email, password);
    };

    useEffect(() => {
        if (loading) {
            // maybe trigger a loading screen
            return;
        }
        if (user) {
            dispatch(appLogin(user?.accessToken));
            setUserData(user.uid);
        }
    }, [user, loading]);

    return (
        <div>
            <AuthInput
                name={'login'}
                placeholder={'email'}
                title={'E-mail'}
                type={'email'}
                onChange={(e) => setEmail(e.target.value)}
                errText={error?.message}
            />

            <AuthInput
                name={'password'}
                placeholder={'пароль'}
                title={'Пароль'}
                type={'password'}
                onChange={(e) => setPassword(e.target.value)}
                errText={error?.message}
            />
            <button
                className={
                    'ml-3 cursor-pointer shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded'
                }
                onClick={login}>
                Войти
            </button>
        </div>
    );
};
