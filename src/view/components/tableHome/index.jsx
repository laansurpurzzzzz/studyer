import React, { useState, useEffect } from 'react';
import { modalView } from '../../../redux/actions';
import { ModalLesson } from '../modalLesson';
import { useDispatch, useSelector } from 'react-redux';
import { getGrops } from '../../../firebase';

export const TableHome = ({ data, filter }) => {
    const state = useSelector((s) => s.modal);
    const dispatch = useDispatch();
    const [editable, setEditable] = useState(null);

    const handleEdit = (data) => {
        setEditable(data);
        dispatch(modalView(true));
    };

    useEffect(() => {
        getGrops();
    }, []);

    return (
        <>
            <table className={filter?.length > 0 ? 'w-full' : 'homeTableBtn'}>
                <thead>
                    {filter?.length ? (
                        <tr>
                            <th className={'filteredTable'}>Время/Дата</th>
                            <th className={'filteredTable'}>Имя предмета</th>
                            <th className={'filteredTable'}>Преподаватель</th>
                            <th className={'filteredTable'}>Задание</th>
                            <th className={'filteredTable'}>Тип пары</th>
                            <th className={'filteredTable'}>Неделя</th>
                            <th className={'filteredTable'}>Группа</th>
                            <th className={'filteredTable'}>Аудитория</th>
                        </tr>
                    ) : (
                        <tr>
                            <th
                                className={
                                    filter?.length > 0 && 'filteredTable'
                                }>
                                Время
                            </th>
                            <th
                                className={
                                    filter?.length > 0 && 'filteredTable'
                                }>
                                Имя предмета
                            </th>
                            <th
                                className={
                                    filter?.length > 0 && 'filteredTable'
                                }>
                                Аудитория
                            </th>
                        </tr>
                    )}
                </thead>
                <tbody>
                    {filter?.length > 0
                        ? filter?.map((i, idx) => (
                              <tr
                                  className={'cursor-pointer'}
                                  onClick={() => handleEdit(i)}
                                  key={idx}>
                                  <td>
                                      <div className={'w-full'}>
                                          {JSON.parse(i?.time).time}
                                          <div>
                                              {filter?.length > 0 && i?.weekDay}
                                          </div>
                                      </div>
                                  </td>
                                  <td>
                                      <div className={'w-full'}>
                                          {i?.subject}
                                      </div>
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
                          ))
                        : data.map((i, idx) => (
                              <tr key={idx}>
                                  <td>
                                      <div className={'scrollable'}>
                                          {JSON.parse(i?.time).time}
                                          <div>
                                              {filter?.length > 0 && data?.week}
                                          </div>
                                      </div>
                                  </td>
                                  <td>
                                      <div className={'scrollable'}>
                                          {i?.subject}
                                      </div>
                                  </td>
                                  <td>
                                      <div className={'scrollable'}>
                                          {i?.audience}
                                      </div>
                                  </td>
                              </tr>
                          ))}
                </tbody>
            </table>
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
