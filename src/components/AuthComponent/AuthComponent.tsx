import { useEffect } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import styles from './AuthComponent.module.scss'
import SvgIcons from '../UI/Svg/SvgIcons';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/useStore';
import { loginUser, registerUser } from '../../store/slices/userSlice';
import { IAuthComponent } from './AuthComponent.props';
import Button from '../UI/Button/Button';
import cn from 'classnames'

export interface IAuthInputs {
    username: string,
    identifier: string,
    password: string,
    email: string
}

const AuthComponent = ({ type }: IAuthComponent) => {

    const dispatch = useAppDispatch()
    const { error, jwt } = useAppSelector((state) => state.user)
    const navigate = useNavigate()

    useEffect(() => {
        if (!error && jwt) {
            navigate('/')
        }
    }, [error, jwt])

    const getDefaultValues = () => {
        if (type === 'signup') {
            return {
                username: '',
                password: '',
                email: ''
            }
        } else {
            return {
                identifier: '',
                password: '',
            }
        }
    }

    const {
        handleSubmit,
        reset,
        control,
        formState: { isValid }
    } = useForm<IAuthInputs>({
        mode: 'onChange',
        defaultValues: getDefaultValues()
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
        <div className={styles["auth"]}>
            <SvgIcons svgIcon={'logo'} />
            <form onSubmit={handleSubmit(submit)} className={styles["form"]}>
                <div className={styles['form__inner']}>
                    <h2 className={styles.title}>{type === 'signup' ? 'Sign Up' : 'Sign In'}</h2>

                    <div className={styles['labels-list']}>
                        {type === 'signup' ?
                            <>
                                <Controller
                                    control={control}
                                    name={'username'}
                                    rules={{
                                        required: { value: true, message: 'Login is required' },
                                        pattern: { value: /^[A-Za-z](.+[A-Za-z-_\d])/i, message: 'Invalid login' }
                                    }}
                                    render={({ field, fieldState: { error } }) => (
                                        <label >
                                            <input type="text" {...field} className={styles["input-auth"]} placeholder={'Login'} />
                                            {error && <div className={styles['error-message']}>{error.message}</div>}
                                        </label>
                                    )}
                                />

                                <Controller
                                    control={control}
                                    name={'password'}
                                    rules={{
                                        required: { value: true, message: 'Password is required' },
                                        minLength: { value: 3, message: 'Password must be at least 3 characters' }
                                    }}
                                    render={({ field, fieldState: { error } }) => (
                                        <label>
                                            <input type="text" {...field} className={styles["input-auth"]} placeholder={'Password'} />
                                            {error && <div className={styles['error-message']}>{error.message}</div>}
                                        </label>
                                    )}
                                />

                                <Controller
                                    control={control}
                                    name={'email'}
                                    rules={{
                                        required: { value: true, message: 'Email is required' },
                                        pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' }
                                    }}
                                    render={({ field, fieldState: { error } }) => (
                                        <label>
                                            <input type="text" {...field} className={styles["input-auth"]} placeholder={'Email'} />
                                            {error && <div className={styles['error-message']}>{error.message}</div>}
                                        </label>
                                    )}
                                />
                            </>
                            :
                            <>
                                <Controller
                                    control={control}
                                    name={'identifier'}
                                    rules={{
                                        required: { value: true, message: 'Login is required' },
                                        pattern: { value: /^[A-Za-z](.+[A-Za-z-_\d])/i, message: 'Invalid login' }
                                    }}
                                    render={({ field, fieldState: { error } }) => (
                                        <label >
                                            <input type="text" {...field} className={styles["input-auth"]} placeholder={'Login'} />
                                            {error && <div className={styles['error-message']}>{error.message}</div>}
                                        </label>
                                    )}
                                />

                                <Controller
                                    control={control}
                                    name={'password'}
                                    rules={{
                                        required: { value: true, message: 'Password is required' },
                                        minLength: { value: 3, message: 'Password must be at least 3 characters' }
                                    }}
                                    render={({ field, fieldState: { error } }) => (
                                        <label>
                                            <input type="text" {...field} className={styles["input-auth"]} placeholder={'Password'} />
                                            {error && <div className={styles['error-message']}>{error.message}</div>}
                                        </label>
                                    )}
                                />
                            </>
                        }
                    </div>

                    <Button
                        disabled={!isValid}
                        className={
                            cn(styles['button-submit'], {
                                [styles['button-submit__active']]: isValid,
                                [styles['button-submit__disabled']]: !isValid
                            })
                        }
                    >
                        {type === 'signup' ? 'Sign Up' : 'Sign In'}
                    </Button>

                    <div className={styles["redirect"]}>
                        {type === 'signup' ?
                            <span>
                                Already have an account?
                                <Link className={styles["redirect-link"]} to={"/signin"}>Sign In</Link>
                            </span>
                            :
                            <span>
                                Don’t have an account?
                                <Link className={styles["redirect-link"]} to={"/signup"}>Create new one</Link>
                            </span>
                        }
                    </div>

                </div>
            </form>
        </div>
    );
}

export default AuthComponent;