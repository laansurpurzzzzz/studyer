import { initializeApp } from 'firebase/app';
import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut,
} from 'firebase/auth';
import {
    getFirestore,
    collection,
    addDoc,
    setDoc,
    doc,
    getDocs,
    getDoc,
    deleteDoc,
    updateDoc,
} from 'firebase/firestore';
import { FireTable } from './mock';
import {
    classesSetter,
    filterLessonSetter,
    groupSetter,
    loadingView,
    profsSetter,
    updateProfile,
} from './redux/actions';
import { store } from './redux';
const firebaseConfig = {
    apiKey: 'AIzaSyDEsc8-jxuxfNuQmjLPgMX1spm-GY2eVIY',
    authDomain: 'stud-db-c7adf.firebaseapp.com',
    databaseURL:
        'https://stud-db-c7adf-default-rtdb.europe-west1.firebasedatabase.app',
    projectId: 'stud-db-c7adf',
    storageBucket: 'stud-db-c7adf.appspot.com',
    messagingSenderId: '477222861875',
    appId: '1:477222861875:web:72c5f6e115073dacdd3746',
    measurementId: 'G-YE7DGH1K3N',
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const logInWithEmailAndPassword = async (email, password) => {
    try {
        store.dispatch(loadingView(true));
        await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
        console.error(err.message);
    } finally {
        store.dispatch(loadingView(false));
    }
};

const getLessonsFilter = async () => {
    try {
        store.dispatch(loadingView(true));
        const lessons = await getDocs(collection(db, 'classes'));
        const subjNames = [];
        lessons.forEach((doc) => {
            subjNames.push(doc.data()?.subject);
        });

        store.dispatch(
            filterLessonSetter(
                subjNames?.filter(function (x, i, a) {
                    return a.indexOf(x) === i;
                }),
            ),
        );
    } catch (err) {
        console.error(err);
    } finally {
        store.dispatch(loadingView(false));
    }
};

const setUserData = async (uid) => {
    try {
        store.dispatch(loadingView(true));
        const userRef = doc(db, 'users', uid);
        const userSnap = await getDoc(userRef);

        const collectionRef = doc(db, userSnap.data().role, uid);
        const lastUser = await getDoc(collectionRef);
        store.dispatch(updateProfile({ ...lastUser?.data() }));
    } catch (e) {
        console.error(e);
    } finally {
        store.dispatch(loadingView(false));
    }
};

const registerWithEmailAndPassword = async (
    displayName,
    email,
    password,
    role,
    subjectList,
    group,
) => {
    try {
        store.dispatch(loadingView(true));
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await setDoc(doc(db, 'users', user.uid), {
            uid: user.uid,
            email,
            role: role,
        });
        await setDoc(doc(db, role, user.uid), {
            email: email,
            displayName: displayName,
            role: role,
            subjectList: subjectList,
            group: group,
        }).then((r) => {
            console.log('FUCKING RES', r);
        });
    } catch (err) {
        console.error(err);
    } finally {
        store.dispatch(loadingView(false));
    }
};

const setLesson = async (
    weekDay,
    subject,
    audience,
    professor,
    exercise,
    type,
    time,
    parity,
    group,
) => {
    try {
        store.dispatch(loadingView(true));
        await addDoc(collection(db, 'classes'), {
            weekDay: weekDay,
            subject: subject,
            audience: audience,
            professor: professor,
            exercise: exercise,
            type: type,
            time: time,
            parity: parity,
            group_id: group,
        }).then((res) => {
            console.log('RESULT OF CREATING', res);
        });
    } catch (err) {
        console.error(err);
    } finally {
        store.dispatch(loadingView(false));
    }
};
const sendPasswordReset = async (email) => {
    try {
        await sendPasswordResetEmail(auth, email);
        alert('Password reset link sent!');
    } catch (err) {
        console.error(err);
    }
};
const logout = () => {
    signOut(auth);
};

const getProfs = async () => {
    try {
        store.dispatch(loadingView(true));
        const professors = await getDocs(collection(db, 'professors'));
        const professorsList = [];

        await professors?.forEach((doc) => {
            if (doc.data()?.role === 'professors') {
                professorsList.push(doc.data()?.displayName);
            }
        });
        store.dispatch(
            profsSetter(
                professorsList?.filter(function (x, i, a) {
                    return a.indexOf(x) === i;
                }),
            ),
        );
    } catch (e) {
        console.log(e);
    } finally {
        store.dispatch(loadingView(false));
    }
};

const updateTask = async (
    id,
    audience,
    exercise,
    group_id,
    parity,
    subject,
    time,
    type,
    weekDay,
) => {
    try {
        store.dispatch(loadingView(true));
        const docRef = doc(db, 'classes', id);
        await updateDoc(docRef, {
            audience: audience,
            exercise: exercise,
            group_id: group_id,
            parity: parity,
            subject: subject,
            time: time,
            type: type,
            weekDay: weekDay,
        });
    } catch (e) {
        console.error(e);
    } finally {
        store.dispatch(loadingView(false));
    }
};

const deleteTask = async (id) => {
    try {
        store.dispatch(loadingView(false));
        await deleteDoc(doc(db, 'classes', id));
    } catch (e) {
        console.error(e);
    } finally {
        store.dispatch(loadingView(false));
    }
};

const getGrops = async () => {
    try {
        store.dispatch(loadingView(true));
        const grops = await getDocs(collection(db, 'students'));
        const groupList = [];

        await grops?.forEach((doc) => {
            if (doc.data()?.group && typeof doc.data()?.group === 'string') {
                groupList.push(doc.data()?.group);
            }
        });

        store.dispatch(
            groupSetter(
                groupList?.filter(function (x, i, a) {
                    return a.indexOf(x) === i;
                }),
            ),
        );
    } catch (err) {
        console.error(err);
    } finally {
        store.dispatch(loadingView(false));
    }
};

const getLessons = async () => {
    try {
        store.dispatch(loadingView(true));
        const lessons = await getDocs(collection(db, 'classes'));
        const userGroup = localStorage.getItem('user');
        const classList = [];
        const weekOrder = [
            'Понедельник',
            'Вторник',
            'Среда',
            'Четверг',
            'Пятница',
            'Суббота',
        ];
        const timeOrder = [
            '{"value":"1","time":"8:30 - 10:00"}',
            '{"value":"2","time":"10:10 - 11:40"}',
            '{"value":"3","time":"11:50 - 13:20"}',
            '{"value":"4","time":"14:00 - 15:30"}',
            '{"value":"5","time":"15:40 - 17:10"}',
            '{"value":"6","time":"17:50 - 19:20"}',
            '{"value":"7","time":"19:30 - 21:00"}',
        ];
        const groupId = JSON.parse(userGroup)?.group; // = 851
        const userRole = JSON.parse(userGroup)?.role;

        lessons.forEach((doc) => {
            if (doc.data().group_id === groupId && userRole === 'students') {
                classList.push(doc.data());

                const group = classList?.reduce((acc, value) => {
                    if (!acc[value.weekDay]) {
                        acc[value.weekDay] = [];
                    }

                    acc[value.weekDay].push(value);

                    return acc;
                }, {});

                const result = Object.keys(group).map(
                    (key) =>
                        new FireTable(
                            key,
                            group[key].sort(
                                (a, b) =>
                                    timeOrder.indexOf(a.time) -
                                    timeOrder.indexOf(b.time),
                            ),
                        ),
                );

                const orderedList = result?.sort(
                    (a, b) =>
                        weekOrder.indexOf(a.weekday) -
                        weekOrder.indexOf(b.weekday),
                );

                store.dispatch(classesSetter(orderedList));
            }
            if (userRole === 'professors') {
                classList.push({ ...doc.data(), id: doc.id });

                const group = classList?.reduce((acc, value) => {
                    if (!acc[value.weekDay]) {
                        acc[value.weekDay] = [];
                    }

                    acc[value.weekDay].push(value);

                    return acc;
                }, {});

                const result = Object.keys(group).map(
                    (key) =>
                        new FireTable(
                            key,
                            group[key].sort(
                                (a, b) =>
                                    timeOrder.indexOf(a.time) -
                                    timeOrder.indexOf(b.time),
                            ),
                        ),
                );

                const orderedList = result?.sort(
                    (a, b) =>
                        weekOrder.indexOf(a.weekday) -
                        weekOrder.indexOf(b.weekday),
                );
                store.dispatch(classesSetter(orderedList));
            }
        });
    } catch (err) {
        console.error(err);
    } finally {
        store.dispatch(loadingView(false));
    }
};

export {
    auth,
    db,
    logInWithEmailAndPassword,
    registerWithEmailAndPassword,
    sendPasswordReset,
    logout,
    updateProfile,
    getLessons,
    setLesson,
    setUserData,
    getGrops,
    getProfs,
    deleteTask,
    updateTask,
    getLessonsFilter,
};
