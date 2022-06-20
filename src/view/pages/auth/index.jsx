import React, { useState } from 'react';
import KFU from '../../../assets/images/KFU.jpg';
import { AuthForm } from '../../components/authForm/authForm';
import { RegistrationForm } from '../../components/registrationForm/registrationForm';

export const Auth = () => {
    const [isRegistration, setIsRegistration] = useState(false);

    return (
        <main className={'h-full'}>
            <div className="flex h-full">
                <div className="w-1/2 flex justify-center items-center">
                    <div
                        className={
                            'shadow-md rounded-md w-3/4 p-6 flex flex-col'
                        }>
                        <button
                            className={
                                'self-end cursor-pointer focus:shadow-outline focus:outline-none py-2 px-4 rounded'
                            }
                            onClick={() => setIsRegistration(!isRegistration)}>
                            {!isRegistration ? 'Регистрация' : 'Вход'} {'>'}
                        </button>
                        {!isRegistration ? <AuthForm /> : <RegistrationForm />}
                    </div>
                </div>
                <div className="w-3/4 h-full">
                    <img className={'h-full blur-sm'} alt="KFU" src={KFU} />
                </div>
            </div>
        </main>
    );
};
