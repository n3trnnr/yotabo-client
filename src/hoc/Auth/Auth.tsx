import { useAppSelector } from '../../hooks/useStore';
import { Navigate } from 'react-router-dom';
import { IAuth } from './Auth.props';


const Auth = ({ children }: IAuth) => {
    const jwt = useAppSelector((state) => state.user.jwt)
    if (!jwt) {
        return <Navigate to={'/signup'} />
    }
    return (
        <>
            {children}
        </>
    );
}

export default Auth;