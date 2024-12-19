import React from 'react';
import { Route, createRoutesFromElements, createBrowserRouter, RouterProvider } from 'react-router-dom';
import DashboardPage from '../pages/DashboardPage';
import ProjectsPage from '../pages/ProjectsPage/ProjectsPage';
import ErrorPage from '../pages/ErrorPage';
import NotFound from '../pages/NotFoundPage';
import ProjectPage from '../pages/ProjectPage/ProjectPage';
import Layout from '../components/Layout/Layout';
import TaskPage from '../pages/TaskPage/TaskPage';
import SignUpPage from '../pages/SignUpPage/SignUpPage';
import SignInPage from '../pages/SignInPage/SignInPage';
import Auth from '../hoc/Auth/Auth';
import ProjectDescriptionPage from '../pages/ProjectDescriptionPage/ProjectDescriptionPage';
import ProjectBoardsPage from '../pages/ProjectBoardsPage/ProjectBoardsPage';
import Home from '../pages/Home/Home';

const router = createBrowserRouter(createRoutesFromElements(
    <>
        <Route path='/' element={<Auth><Layout /></Auth>} errorElement={<ErrorPage />}>
            <Route path='home' element={<Home />} />
            <Route path='projects/:id' element={<ProjectPage />}>
                <Route path='projects/:id/boards' element={<ProjectBoardsPage />} />
                <Route path='projects/:id/description' element={<ProjectDescriptionPage />} />
                <Route path='projects/:id/dashboard' element={<DashboardPage />} />
            </Route>
            <Route path='projects/:id/boards/:id/task' element={<TaskPage />} />
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