import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ModalLesson } from '../../components/modalLesson';
import { useDispatch, useSelector } from 'react-redux';
import { modalView } from '../../../redux/actions';
import { getGrops, getProfs } from '../../../firebase';
import { CurrentDate } from '../../components/currentDate/currentDate';

export const FullVersion = () => {
    let location = useLocation();
    const state = useSelector((s) => s.modal);
    const user = localStorage.getItem('user');
    const stateUser = JSON.parse(user);
    const dispatch = useDispatch();
    const [editable, setEditable] = useState(null);
    const { data, filter } = location?.state;

    const handleEdit = (data) => {
        setEditable(data);
        dispatch(modalView(true));
    };

    const createLesson = () => {
        setEditable(null);
        dispatch(modalView(true));
    };

    useEffect(() => {
        getGrops();
    }, []);

    return (
        <>
            <div className={'container mt-9'}>
                <CurrentDate />
                <table className={'w-full'}>
                    <thead>
                        <tr>
                            <th className={'filteredTable'}>Время/Дата</th>
                            <th className={'filteredTable'}>Имя предмета</th>
                            <th className={'filteredTable'}>Преподаватель</th>
                            <th className={'filteredTable'}>Задание</th>
                            <th className={'filteredTable'}>Тип пары</th>
                            <th className={'filteredTable'}>Неделя</th>
                            <th className={'filteredTable'}>Номер группы</th>
                            <th className={'filteredTable'}>Аудитория</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.lesson.map((i, idx) => (
                            <tr
                                onClick={() =>
                                    stateUser?.role === 'professors' &&
                                    handleEdit(i)
                                }
                                className={
                                    stateUser?.role === 'professors' &&
                                    'cursor-pointer'
                                }
                                key={idx}>
                                <td>
                                    <div className={'w-full'}>
                                        {JSON.parse(i?.time).time}
                                        <div>
                                            {filter?.length > 0 && i?.week}
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className={'w-full'}>{i?.subject}</div>
                                </td>
                                <td>
                                    <div className={'w-full'}>
                                        {i?.professor}
                                    </div>
                                </td>
                                <td>
                                    <div className={'w-full'}>
                                        {i?.exercise}
                                    </div>
                                </td>
                                <td>
                                    <div className={'w-full'}>{i?.type}</div>
                                </td>
                                <td>
                                    <div className={'w-full'}>
                                        {i?.parity === 'even'
                                            ? 'Четная'
                                            : 'Нечетная'}
                                    </div>
                                </td>
                                <td>
                                    <div className={'w-full'}>
                                        {i?.group_id}
                                    </div>
                                </td>
                                <td>
                                    <div className={'w-full'}>
                                        {i?.audience}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {stateUser?.role === 'professors' && (
                    <button
                        onClick={createLesson}
                        className={
                            'mt-5 cursor-pointer shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded'
                        }>
                        Создать пару
                    </button>
                )}
            </div>
            {state.modal && (
                <>
                    <div
                        onClick={() => dispatch(modalView(false))}
                        className="modal-back"
                    />
                    <ModalLesson data={editable} />
                </>
            )}
        </>
    );
};
