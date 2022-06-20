import React from 'react';

export const CurrentDate = () => {
    const today = new Date();
    const oneJan = new Date(today.getFullYear(), 0, 1);
    const numberOfDays = Math.floor((today - oneJan) / (24 * 60 * 60 * 1000));
    const numberOfWeek = Math.ceil((today.getDay() + 1 + numberOfDays) / 7);
    return (
        <div className={'py-5'}>
            <h1>
                Сегодня:{' '}
                <p className="underline inline-block">
                    {`${today.getDate()}.${
                        today.getMonth() + 1
                    }.${today.getFullYear()} ${today.toLocaleDateString('ru', {
                        weekday: 'long',
                    })}`}
                </p>
            </h1>
            <h1>
                Неделя:{' '}
                <p className="underline inline-block">
                    {numberOfWeek % 2 === 0
                        ? 'Четная неделя'
                        : 'Нечетная неделя'}
                </p>
            </h1>
        </div>
    );
};
