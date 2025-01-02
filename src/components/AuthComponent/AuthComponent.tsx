import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form'
import styles from './AuthComponent.module.scss'
import SvgIcons from '../UI/Svg/SvgIcons';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/useStore';
import { loginUser, registerUser } from '../../store/slices/userSlice';
import { IAuthComponent } from './AuthComponent.props';
import Button from '../UI/Button/Button';
import cn from 'classnames'
import CustomInput from '../UI/CustomInput/CustomInput';

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

    const {
        handleSubmit,
        reset,
        control,
        formState: { isValid }
    } = useForm<IAuthInputs>({
        mode: 'onChange',
        defaultValues: {
            username: '',
            password: '',
            email: ''
        }
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
                                <CustomInput
                                    className={styles["input-auth"]} errorClassName={styles['error-message']}
                                    control={control}
                                    name={'username'}
                                    type={'text'}
                                    placeHolder={'Login'}
                                    rules={{
                                        required: { value: true, message: 'Login is required' },
                                        pattern: { value: /^[A-Za-z](.+[A-Za-z-_\d])/i, message: 'Invalid login' }
                                    }}
                                />

                                <CustomInput
                                    className={styles["input-auth"]} errorClassName={styles['error-message']}
                                    control={control} name={'password'}
                                    type={'password'}
                                    placeHolder={'Password'}
                                    rules={{
                                        required: { value: true, message: 'Password is required' },
                                        minLength: { value: 3, message: 'Password must be at least 3 characters' }
                                    }}
                                />

                                <CustomInput
                                    className={styles["input-auth"]} errorClassName={styles['error-message']}
                                    control={control} name={'email'}
                                    type={'email'}
                                    placeHolder={'Email'}
                                    rules={{
                                        required: { value: true, message: 'Email is required' },
                                        pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' }
                                    }}
                                />
                            </>
                            :
                            <>
                                <CustomInput
                                    className={styles["input-auth"]} errorClassName={styles['error-message']}
                                    control={control}
                                    name={'identifier'}
                                    type={'text'}
                                    placeHolder={'Login'}
                                    rules={{
                                        required: { value: true, message: 'Login is required' },
                                        pattern: { value: /^[A-Za-z](.+[A-Za-z-_\d])/i, message: 'Invalid login' }
                                    }}
                                />

                                <CustomInput
                                    className={styles["input-auth"]} errorClassName={styles['error-message']}
                                    control={control} name={'password'}
                                    type={'password'}
                                    placeHolder={'Password'}
                                    rules={{
                                        required: { value: true, message: 'Password is required' },
                                        minLength: { value: 3, message: 'Password must be at least 3 characters' }
                                    }}
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