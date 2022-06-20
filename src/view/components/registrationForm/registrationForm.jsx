/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { AuthInput } from '../input/auth';
import { auth, registerWithEmailAndPassword } from '../../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useDispatch } from 'react-redux';
import { appLogin, loadingView, updateProfile } from '../../../redux/actions';
import { useNavigate } from 'react-router-dom';

export const RegistrationForm = () => {
    const [email, setEmail] = useState('');
    const [displayName, setName] = useState('');
    const [role, setRole] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [subjectList, setSubjectList] = useState([]);
    const [group, setGroup] = useState('');

    const [counter, setCounter] = useState(1);
    const [user, loading, error] = useAuthState(auth);
    const dispatch = useDispatch();
    const [errorState, setError] = useState('');
    const history = useNavigate();

    const updateList = (idx, e) => {
        const newSubject = [...subjectList];
        newSubject[idx] = e.target.value;
        setSubjectList(newSubject);
    };

    const onSubmit = () => {
        if (password !== repeatPassword) {
            setError('Пароль должен совпадать !');
            return;
        }
        registerWithEmailAndPassword(
            displayName,
            email,
            password,
            role,
            subjectList,
            group,
        ).then(() => {
            dispatch(
                updateProfile({
                    displayName,
                    email,
                    role,
                    subjectList,
                    group,
                }),
            );
        });
    };

    useEffect(() => {
        if (loading) {
            // maybe trigger a loading screen
            return;
        }
        if (user) {
            dispatch(appLogin(user?.accessToken)).then(() => {
                history('/');
            });
        }
    }, [user, loading]);
    return (
        <div className="w-full max-w-lg registrationForm">
            <div className="flex flex-wrap -mx-3 mb-6">
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
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
                <AuthInput
                    name={'repeat-password'}
                    placeholder={'Повторить пароль'}
                    title={'Повторить пароль'}
                    type={'password'}
                    onChange={(e) => setRepeatPassword(e.target.value)}
                    errText={errorState}
                />
            </div>
            <div className="flex flex-wrap -mx-3 mb-2">
                <AuthInput
                    name={'name'}
                    placeholder={'Имя'}
                    title={'ФИО'}
                    type={'text'}
                    onChange={(e) => setName(e.target.value)}
                />
                <div className="w-full px-3 mb-6 md:mb-0">
                    <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="grid-state">
                        Роль
                    </label>
                    <div className="relative">
                        <select
                            className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-state"
                            onChange={(e) => setRole(e.target.value)}>
                            <option value={0}>Выбрать...</option>
                            <option value={'students'}>Студент</option>
                            <option value={'professors'}>Преподаватель</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg
                                className="fill-current h-4 w-4"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20">
                                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                            </svg>
                        </div>
                    </div>
                    {role === 'professors' && (
                        <div className="flex flex-wrap -mx-3 mt-6">
                            {Array.from({ length: counter }).map((i, idx) => (
                                <AuthInput
                                    key={idx}
                                    name={'subjectName'}
                                    placeholder={'Имя предмета'}
                                    title={'Имя одного предмета'}
                                    type={'text'}
                                    onChange={(e) => updateList(idx, e)}
                                />
                            ))}
                            <div className="flex">
                                <button
                                    onClick={() => setCounter(counter + 1)}
                                    className={'text-4xl pl-4'}>
                                    +
                                </button>
                                <button
                                    onClick={() =>
                                        counter > 0 && setCounter(counter - 1)
                                    }
                                    className={'text-4xl pl-4'}>
                                    -
                                </button>
                            </div>
                        </div>
                    )}
                    {role === 'students' && (
                        <div className="flex flex-wrap -mx-3 mt-6">
                            <AuthInput
                                name={'groupName'}
                                placeholder={'Введите группу'}
                                title={'Группа'}
                                type={'text'}
                                onChange={(e) => setGroup(e.target.value)}
                            />
                        </div>
                    )}
                </div>
            </div>
            <button
                className={
                    'ml-3 cursor-pointer shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded'
                }
                onClick={onSubmit}>
                Регистрация
            </button>
        </div>
    );
};
