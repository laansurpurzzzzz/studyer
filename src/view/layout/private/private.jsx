import { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Book } from '../../../navigation/book';
import { Home } from '../../pages/home';
import { Profile } from '../../pages/profile';
import { FullVersion } from '../../pages/fullVersion';

export const PrivateRoutes = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Routes>
                <Route path={Book.home} element={<Home />} />
                <Route path={Book.profile} element={<Profile />} />
                <Route path={Book.full} element={<FullVersion />} />
            </Routes>
        </Suspense>
    );
};
