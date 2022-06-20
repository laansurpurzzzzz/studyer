import React from 'react';
import { Auth } from './pages/auth';
import { useSelector } from 'react-redux';
import { PrivateLayout } from './layout/private/privateLayout';
import { Spinner } from './components/spinner';

const App = () => {
    const store = useSelector((s) => s);
    console.log(store);
    return (
        <>
            {store.loader && <Spinner />}
            <>
                {store?.app?.authToken || localStorage.getItem('authToken') ? (
                    <PrivateLayout />
                ) : (
                    <Auth />
                )}
            </>
        </>
    );
};

export default App;
