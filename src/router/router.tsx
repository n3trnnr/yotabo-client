import React from 'react';
import { Route, createRoutesFromElements, createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import ErrorPage from '../pages/ErrorPage';
import NotFound from '../pages/NotFoundPage';
import ProjectPage from '../pages/ProjectPage/ProjectPage';
import Layout from '../components/Layout/Layout';
import SignUpPage from '../pages/SignUpPage/SignUpPage';
import SignInPage from '../pages/SignInPage/SignInPage';
import Auth from '../hoc/Auth/Auth';
import Home from '../pages/Home/Home';
import ProjectBoard from '../pages/ProjectBoard/ProjectBoard';
import ProjectOverview from '../pages/ProjectOverview/ProjectOverview';
import Dashboard from '../pages/Dashboard/Dashboard';
import ProjectList from '../pages/ProjectList/ProjectList';

const router = createBrowserRouter(createRoutesFromElements(
    <>
        <Route path='/' element={<Auth><Layout /></Auth>} errorElement={<ErrorPage />}>
            <Route index element={<Navigate to={'home'} replace />} />
            <Route path='home' element={<Home />} />
            <Route path='/:id' element={<ProjectPage />}>
                <Route index element={<Navigate to="board" replace />} />
                <Route path='overview' element={<ProjectOverview />} />
                <Route path='board' element={<ProjectBoard />} />
                <Route path='list' element={<ProjectList />} />
                <Route path='dashboard' element={<Dashboard />} />
            </Route>
            <Route path='*' element={<NotFound />} />
        </Route>
        <Route path='/signup' element={<SignUpPage />} />
        <Route path='/signin' element={<SignInPage />} />
    </>
))

const Router: React.FC = () => {

    return (
        <RouterProvider router={router} />
    );
}

export default Router;