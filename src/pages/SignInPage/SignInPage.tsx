import React from 'react';
import styles from './SignInPage.module.scss'
import AuthComponent from '../../components/AuthComponent/AuthComponent';

const SignInPage: React.FC = () => {
    return (
        <div className={styles["sign-in-container"]}>
            <AuthComponent type={"signin"} />
        </div>
    );
}

export default SignInPage;