import React, { FC } from 'react';
import { PrivateRoutes } from './private';
import { Menu } from '../../components/menu';

export const PrivateLayout = () => {
    return (
        <div>
            <main>
                <div>
                    <Menu />
                </div>
                <div className={'flex justify-center'}>
                    <PrivateRoutes />
                </div>
            </main>
        </div>
    );
};
