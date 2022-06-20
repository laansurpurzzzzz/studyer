import React from 'react';

export const AuthInput = (data) => {
    /* eslint-disable */
    return (
        <div className="w-full px-3 mb-6 md:mb-0">
            <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-first-name">
                {data?.title}
            </label>
            <input
                className={`${
                    data?.errText && 'border border-red-500'
                } appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-gray-100`}
                placeholder={data?.placeholder}
                type={data?.type?.toLocaleLowerCase() || 'text'}
                {...data}
            />
            {data?.errText && (
                <p className="text-red-500 text-xs italic">
                    {data?.errText || 'Please fill out this field.'}
                </p>
            )}
        </div>
    );
};
