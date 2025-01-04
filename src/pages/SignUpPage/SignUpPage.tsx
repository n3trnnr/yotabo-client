import React from 'react';
import styles from './SignUpPage.module.scss'
import AuthComponent from '../../components/AuthComponent/AuthComponent';

const SignUpPage: React.FC = () => {
    return (
        <div className={styles["sign-up-container"]}>
            <AuthComponent type={"signup"} />
        </div>
    );
}

export default SignUpPage;