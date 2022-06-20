import React, { useEffect, useState } from 'react';
import { TableHome } from '../../components/tableHome';
import { Link } from 'react-router-dom';
import {
    getGrops,
    getLessons,
    getLessonsFilter,
    getProfs,
} from '../../../firebase';
import { useDispatch, useSelector } from 'react-redux';
import { loadingView, modalView } from '../../../redux/actions';
import { CurrentDate } from '../../components/currentDate/currentDate';

export const Home = () => {
    const state =
        useSelector((s) => s.classList) || localStorage.getItem('classList');
    const group = localStorage.getItem('groupList');
    const subjectFilter = JSON.parse(localStorage.getItem('lessonsName'));
    const userState = JSON.parse(localStorage.getItem('user'));
    const professors = JSON.parse(localStorage.getItem('professors'));

    const dispatch = useDispatch();

    const [isShow, setIsShow] = useState(false);
    const [isFilter, setIsFilter] = useState('');
    const [filterValue, setFilterValue] = useState('');
    const [filter, setFilter] = useState([]);

    const today = new Date();
    const oneJan = new Date(today.getFullYear(), 0, 1);
    const numberOfDays = Math.floor((today - oneJan) / (24 * 60 * 60 * 1000));
    const numberOfWeek = Math.ceil((today.getDay() + 1 + numberOfDays) / 7);

    const handleShow = () => {
        setIsShow(!isShow);
    };

    const handleSelect = (e) => {
        setIsFilter(e.target.value);
    };

    const handleFilter = (e) => {
        setFilterValue(e.target.value);
        const filteredArr = [];
        state?.subjectsInf?.map((item) => {
            filteredArr.push(...item?.lesson);
        });
        if (isFilter) {
            const group = filteredArr.reduce((acc, value) => {
                if (!acc[value?.[isFilter]]) {
                    acc[value?.[isFilter]] = [];
                }
                acc[value?.[isFilter]]?.push(value);
                return acc;
            }, {});
            setFilter(group);
        }
    };

    const handleResetFilter = () => {
        setIsShow(false);
        setFilter([]);
    };

    useEffect(() => {
        getLessons();
        getProfs();
        getLessonsFilter();
    }, []);

    return (
        <>
            <div className={'container px-24'}>
                <CurrentDate />
                <div className={'relative'}>
                    <div className={'border-b-2 mb-5 relative z-10'}>
                        <button onClick={handleShow}>
                            <p className={isShow ? 'text-white' : 'text-black'}>
                                Фильтрация
                            </p>
                        </button>
                    </div>
                    {isShow && (
                        <>
                            <div
                                onClick={() => setIsShow(false)}
                                className="modal-back"
                            />
                            <div
                                className={
                                    'bg-white filterPop align-middle text-center p-4'
                                }>
                                <label>
                                    Фильтровать по:
                                    <select onChange={handleSelect}>
                                        <option value={null}>выбрать</option>
                                        <option value="type">типу</option>
                                        <option value="professor">
                                            преподавателю
                                        </option>
                                        <option value="subject">
                                            предмету
                                        </option>
                                        {userState?.role === 'professors' && (
                                            <option value="group_id">
                                                группе
                                            </option>
                                        )}
                                    </select>
                                </label>
                                {isFilter === 'subject' && (
                                    <label className={'block mt-2'}>
                                        Предмет:
                                        <select onChange={handleFilter}>
                                            <option>выбрать</option>
                                            {subjectFilter?.map((i) => (
                                                <option key={i} value={i}>
                                                    {i}
                                                </option>
                                            ))}
                                        </select>
                                    </label>
                                )}
                                {isFilter === 'type' && (
                                    <label className={'block mt-2'}>
                                        Тип пары:
                                        <select onChange={handleFilter}>
                                            <option>выбрать</option>
                                            <option value="Лекция">
                                                Лекция
                                            </option>
                                            <option value="Практика">
                                                Практика
                                            </option>
                                        </select>
                                    </label>
                                )}
                                {isFilter === 'professor' && (
                                    <label className={'block mt-2'}>
                                        Преподаватель:
                                        <select onChange={handleFilter}>
                                            <option>выбрать</option>
                                            {professors?.map((i) => (
                                                <option key={i} value={i}>
                                                    {i}
                                                </option>
                                            ))}
                                        </select>
                                    </label>
                                )}
                                {isFilter === 'group_id' && (
                                    <label className={'block mt-2'}>
                                        Группа:
                                        <select onChange={handleFilter}>
                                            <option>выбрать</option>
                                            {group.split(',')?.map((i) => (
                                                <option key={i} value={i}>
                                                    {i}
                                                </option>
                                            ))}
                                        </select>
                                    </label>
                                )}

                                <button
                                    className={
                                        'mt-4 border-2 border-black bg-red'
                                    }
                                    onClick={handleResetFilter}>
                                    Сброс фильтрации
                                </button>
                            </div>
                        </>
                    )}
                </div>
                <div className={'flex justify-between flex-wrap'}>
                    {filter?.[filterValue]?.length > 0 ? (
                        <div className={'w-full'}>
                            <div className={'tableBtn w-full'}>
                                <TableHome filter={filter?.[filterValue]} />
                            </div>
                        </div>
                    ) : (
                        state?.subjectsInf?.map((i, idx) => (
                            <Link
                                to={'/full'}
                                state={{
                                    data: i,
                                    // filter: i?.tableView,
                                }}
                                className={'tableWrapper block'}
                                key={idx}>
                                <h3>{i?.weekday}</h3>
                                <div className={'tableBtn'}>
                                    <TableHome data={i?.lesson} />
                                </div>
                            </Link>
                        ))
                    )}
                </div>
            </div>
        </>
    );
};
