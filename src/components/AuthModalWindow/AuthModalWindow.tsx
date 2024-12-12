import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form'
import styles from './AuthModalWindow.module.scss'
import SvgIcons from '../UI/Svg/SvgIcons';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/useStore';
import { loginUser, registerUser } from '../../store/slices/userSlice';
import { IAuthModalWindow } from './AuthModalWindow.props';

export interface IAuthInputs {
    username: string,
    identifier: string,
    password: string,
    email: string
}

const AuthModalWindow = ({ type }: IAuthModalWindow) => {

    const dispatch = useAppDispatch()
    const { error, loadingStatus, jwt } = useAppSelector((state) => state.user)
    const navigate = useNavigate()

    useEffect(() => {
        if (!error && jwt) {
            navigate('/')
        }
    }, [error, jwt])

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isValid }
    } = useForm<IAuthInputs>({
        mode: 'onChange'
    })

    const submit: SubmitHandler<IAuthInputs> = (data) => {
        if (type === 'signup') {
            registration(data)
        } else {
            login(data)
        }
        reset()
    }

    const registration = async (data: IAuthInputs) => {
        dispatch(registerUser(data))
    }

    const login = (data: IAuthInputs) => {
        dispatch(loginUser(data))
    }


    return (
        <>
            {error && <div>{error}</div>}
            {loadingStatus && <div>Loading...</div>}
            <SvgIcons svgIcon={'logo'} className={styles['logo-icon']} />
            <div className={styles["modal-window-container"]}>
                {type === 'signup' ?
                    <>
                        <form
                            onSubmit={handleSubmit(submit)}
                            className={styles["form-wrapper"]}
                        >
                            <div className={styles.title}>Sign Up</div>
                            <label className={styles.label}>
                                <input
                                    {...register('username', { required: true, pattern: /^[A-Za-z](.+[A-Za-z-_\d])/i })}
                                    className={styles["input-auth"]} type="text" placeholder='Login'
                                />
                                {errors.username && <div className={styles['error-message']}>incorrect login</div>}
                            </label>
                            <label className={styles.label}>
                                <input
                                    {...register('password', { required: true, pattern: /^[A-Za-z](.+[A-Za-z!\d])/i })}
                                    className={styles["input-auth"]} type="password" placeholder='Password'
                                />
                                {errors.password && <div className={styles['error-message']}>incorrect password</div>}
                            </label>
                            <label className={styles.label}>
                                <input
                                    {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
                                    className={styles["input-auth"]} type="email" placeholder='Email'
                                />
                                {errors.email && <div className={styles['error-message']}>incorrect email</div>}
                            </label>
                            <button
                                disabled={!isValid}
                                className={isValid ? styles["button-submit"] : `${styles['button-submit-disabled']} ${styles['button-submit']}`}
                            >
                                Sign Up
                            </button>
                        </form>

                        <div className={styles["redirect-wrapper"]}>
                            <span>
                                Already have an account?
                                <Link className={styles["redirect-link"]} to={"/signin"}> Sign In</Link>
                            </span>
                        </div>
                    </> :
                    <>
                        <form
                            onSubmit={handleSubmit(submit)}
                            className={styles["form-wrapper"]}
                        >
                            <div className={styles.title}>Sign In</div>
                            <label className={styles.label}>
                                <input
                                    {...register('identifier', { required: true, pattern: /^[A-Za-z](.+[A-Za-z-_\d])/i })}
                                    className={styles["input-auth"]} type="text" placeholder='Login'
                                />
                                {errors.username && <div className={styles['error-message']}>incorrect login</div>}
                            </label>
                            <label className={styles.label}>
                                <input
                                    {...register('password', { required: true, pattern: /^[A-Za-z](.+[A-Za-z!\d])/i })}
                                    className={styles["input-auth"]} type="password" placeholder='Password'
                                />
                                {errors.password && <div className={styles['error-message']}>incorrect password</div>}
                            </label>
                            <button className={isValid ? styles["button-submit"] : `${styles['button-submit-disabled']} ${styles['button-submit']}`}
                            >
                                Sign In
                            </button>
                        </form>

                        <div className={styles["redirect-wrapper"]}>
                            <span>
                                Don’t have an account?
                                <Link className={styles["redirect-link"]} to={"/signup"}> Create new one</Link>
                            </span>
                        </div>
                    </>
                }
            </div>
        </>
    );
}

export default AuthModalWindow;