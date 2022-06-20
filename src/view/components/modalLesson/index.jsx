import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLesson, deleteTask, updateTask } from '../../../firebase';
import { modalView } from '../../../redux/actions';
import { useNavigate } from 'react-router-dom';

export const ModalLesson = ({ data }) => {
    const dispatch = useDispatch();
    const state = useSelector((s) => s);

    console.log(data);

    const userName = localStorage.getItem('user');

    const [week, setWeek] = useState(data ? data?.weekDay : '');
    const [subjectI, setSubject] = useState(data ? data?.subject : '');
    const [audienceI, setAudience] = useState(data ? data?.audience : '');
    const [professorI, setProfessor] = useState(
        state?.user?.name || (userName && JSON.parse(userName)?.displayName),
    );
    const [exerciseI, setExercise] = useState(data ? data?.exercise : '');
    const [parity, setParity] = useState(data ? data : '');
    const [typeI, setType] = useState(data ? data?.type : '');
    const [time, setTime] = useState(data ? data.time : 0);

    const [group, setGroup] = useState(data ? data?.group_id : '');

    const history = useNavigate();

    const handleCreate = () => {
        if (
            !week &&
            !subjectI &&
            !audienceI &&
            !professorI &&
            !exerciseI &&
            !typeI &&
            !time &&
            !parity &&
            !group
        ) {
            return;
        }
        setLesson(
            week,
            subjectI,
            audienceI,
            professorI,
            exerciseI,
            typeI,
            time,
            parity,
            group,
        ).then(() => {
            dispatch(modalView(false));
            history('/');
        });
    };

    const handleDelete = () => {
        deleteTask(data?.id).then(() => {
            dispatch(modalView(false));
            history('/');
        });
    };

    const handleUpdate = () => {
        updateTask(
            data?.id,
            audienceI,
            exerciseI,
            group,
            parity,
            subjectI,
            time,
            typeI,
            week,
        ).then(() => {
            dispatch(modalView(false));
            history('/');
        });
    };

    const listWeek = [
        { value: 'Выбрать' },
        {
            value: 'Понедельник',
        },
        {
            value: 'Вторник',
        },
        {
            value: 'Среда',
        },
        {
            value: 'Четверг',
        },
        {
            value: 'Пятница',
        },
        {
            value: 'Суббота',
        },
    ];

    const timeList = [
        { time: 'Выбрать', value: null },
        { time: '8:30 - 10:00', value: { value: '1', time: '8:30 - 10:00' } },
        { time: '10:10 - 11:40', value: { value: '2', time: '10:10 - 11:40' } },
        { time: '11:50 - 13:20', value: { value: '3', time: '11:50 - 13:20' } },
        { time: '14:00 - 15:30', value: { value: '4', time: '14:00 - 15:30' } },
        { time: '15:40 - 17:10', value: { value: '5', time: '15:40 - 17:10' } },
        { time: '17:50 - 19:20', value: { value: '6', time: '17:50 - 19:20' } },
        { time: '19:30 - 21:00', value: { value: '7', time: '19:30 - 21:00' } },
    ];

    return (
        <>
            <div className={'modal active-modal'}>
                <div className="flex justify-between flex-wrap mb-5">
                    <div>
                        <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            htmlFor="grid-first-name">
                            День недели
                        </label>
                        <select onChange={(e) => setWeek(e.target.value)}>
                            {data && <option>{data?.weekDay}</option>}
                            {listWeek.map((i) => (
                                <option key={i.value} value={i.value}>
                                    {i.value}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            htmlFor="grid-first-name">
                            Предмет
                        </label>
                        <select onChange={(e) => setSubject(e.target.value)}>
                            {data && <option>{data?.subject}</option>}
                            <option value={null}>Выбрать</option>
                            {JSON?.parse(userName)?.subjectList.map((i) => (
                                <option value={i}>{i}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            htmlFor="grid-first-name">
                            Тип пары
                        </label>

                        <select onChange={(e) => setType(e.target.value)}>
                            {data && <option>{data?.type}</option>}
                            <option value={null}>Выбрать</option>
                            <option value={'Лекция'}>Лекция</option>
                            <option value={'Практика'}>Практика</option>
                        </select>
                    </div>

                    <div>
                        <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            htmlFor="grid-first-name">
                            Неделя
                        </label>

                        <select onChange={(e) => setParity(e.target.value)}>
                            {data && (
                                <option>
                                    {data?.parity === 'odd'
                                        ? 'Нечетная'
                                        : 'Четная'}
                                </option>
                            )}
                            <option value={null}>Выбрать</option>
                            <option value={'even'}>Четная неделя</option>
                            <option value={'odd'}>Нечетная неделя</option>
                        </select>
                    </div>

                    <div>
                        <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            htmlFor="grid-first-name">
                            Номер группы
                        </label>

                        <select onChange={(e) => setGroup(e.target.value)}>
                            {data && <option>{data?.group_id}</option>}
                            <option value={null}>Выбрать</option>
                            {state?.groups?.groupList.map((i) => (
                                <option key={i} value={i}>
                                    {i}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            htmlFor="grid-first-name">
                            Время проведения
                        </label>

                        <select onChange={(e) => setTime(e.target.value)}>
                            {data && (
                                <option>
                                    {data && JSON?.parse(data?.time)?.time}
                                </option>
                            )}
                            {timeList.map((i) => (
                                <option
                                    key={JSON.stringify(i.value)}
                                    value={JSON.stringify(i.value)}>
                                    {i.time}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-first-name">
                    Аудитория
                </label>

                <input
                    type={'text'}
                    value={audienceI}
                    className={
                        'appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-gray-100'
                    }
                    onChange={(e) => setAudience(e.target.value)}
                    placeholder={'аудитория'}
                />

                <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-first-name">
                    Преподаватель
                </label>

                <input
                    type={'text'}
                    className={
                        'appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-gray-100'
                    }
                    placeholder={professorI}
                    disabled
                />

                <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-first-name">
                    Задание на пару
                </label>

                <input
                    type={'text'}
                    value={exerciseI}
                    className={
                        'appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-gray-100'
                    }
                    onChange={(e) => setExercise(e.target.value)}
                    placeholder={'задание на пару'}
                />
                {data ? (
                    <div className={'flex'}>
                        <button
                            onClick={() => handleUpdate()}
                            className={
                                'ml-3 cursor-pointer shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded'
                            }>
                            Изменить
                        </button>
                        <button
                            onClick={() => handleDelete()}
                            className={
                                'ml-3 cursor-pointer shadow bg-red-500 hover:bg-red-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded'
                            }>
                            Удалить
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={handleCreate}
                        className={
                            'ml-3 cursor-pointer shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded'
                        }>
                        Сохранить
                    </button>
                )}
            </div>
        </>
    );
};
