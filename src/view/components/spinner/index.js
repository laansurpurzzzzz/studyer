import React from 'react';
import spinnerBlueImg from './spinner-green.svg';

export const Spinner = ({ size = 120, color = 'green', styles, ...props }) => (
    <div className={'absolute z-50 spinner'}>
        <div className={'flex justify-center items-center w-full h-full'}>
            <img
                alt="spinner animation"
                src={spinnerBlueImg}
                style={{ width: size, height: size, ...styles }}
                {...props}
            />
        </div>
    </div>
);
