import React, { useState } from 'react';
import { ReactComponent as Edit } from '../../../assets/edit.svg';
import { AuthInput } from '../../components/input/auth';
import { useSelector } from 'react-redux';

export const Profile = () => {
    const state = useSelector((s) => s.user);
    const user = localStorage.getItem('user');
    const stateUser = JSON.parse(user);

    const [subjectI, setSubject] = useState('');

    const userName = localStorage.getItem('user');

    const handleEdit = (e) => {
        if (e.target.value) {
            setNameChange(e.target.value);
        }
    };

    return (
        <div
            className={
                'container relative px-24 flex justify-center align-middle profile-page'
            }>
            <div className={'profile'}>
                <h1>Профиль</h1>
                {stateUser?.role === 'professors' && (
                    <div>
                        <div
                            className={
                                'bg-white border-2 border-black mb-2 pl-2'
                            }>
                            <p>Имя пользователя: {stateUser.displayName}</p>
                        </div>

                        <div
                            className={
                                'bg-white border-2 border-black mb-0.5 pl-2'
                            }>
                            <label>Список предметов:</label>
                            <ol className={'list-decimal pl-4'}>
                                {JSON.parse(userName)?.subjectList.map((i) => (
                                    <li key={i}>{i}</li>
                                ))}
                            </ol>
                        </div>
                    </div>
                )}

                <div>
                    {stateUser?.role === 'students' && (
                        <>
                            <div
                                className={
                                    'bg-white border-2 border-black mb-2 pl-2'
                                }>
                                <p>Имя пользователя: {stateUser.displayName}</p>
                            </div>
                            <div
                                className={
                                    'bg-white border-2 border-black mb-0.5 pl-2'
                                }>
                                <p>Номер группы: {stateUser.group}</p>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};
