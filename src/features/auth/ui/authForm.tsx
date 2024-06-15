import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, SubmitHandler } from "react-hook-form"
import { observer } from 'mobx-react-lite';

import { AuthModel } from '@/entities/auth';

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs"
import { Input } from "@/shared/ui/input"
import { Button } from "@/shared/ui/button"
import { Separator } from "@/shared/ui/separator"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/shared/ui/form"

import './styles.scss'
import { loginSchema, registerSchema } from '../model';

export const AuthForm: React.FC = observer(() => {

    const authStore = AuthModel.authStore;

    const initialValuesLogin: AuthModel.AuthCredentialsDto = { username: '', password: '' };
    const initialValuesRegister: AuthModel.AuthCredentialsDto = { username: '', password: '' };

    const loginForm = useForm<AuthModel.AuthCredentialsDto>({
        defaultValues: initialValuesLogin,
        resolver: yupResolver(loginSchema),
    });

    const registerForm = useForm<AuthModel.AuthCredentialsDto>({
        defaultValues: initialValuesRegister,
        resolver: yupResolver(registerSchema),
    });

    const handleLoginSubmit: SubmitHandler<AuthModel.AuthCredentialsDto> = async (values) => {
        await authStore.login({ username: values.username, password: values.password });
    };

    const handleRegisterSubmit: SubmitHandler<AuthModel.AuthCredentialsDto> = async (values) => {
        await authStore.register({ username: values.username, password: values.password });
    };

    if (authStore.isAuthorized ) {
        return null
    }

    return (
        <div className="auth-form">
            <div className="auth-form__form">
                <div className="auth-form__logo">
                    <img src="/images/svg/logo/sber-full.svg" alt="logo" />
                </div>
                <Tabs className="w-full flex flex-col gap-1" defaultValue="login">
                    <TabsList className="!w-full">
                        <TabsTrigger className="w-full" value="login">Вход</TabsTrigger>
                        <TabsTrigger className="w-full" value="register">Регистрация</TabsTrigger>
                    </TabsList>
                    <TabsContent value="login">
                        <Form {...loginForm}>
                            <form
                                onSubmit={loginForm.handleSubmit(handleLoginSubmit)}
                                className="flex flex-col gap-8"
                            >
                                <div className="flex flex-col gap-4">
                                    <FormField
                                        control={loginForm.control}
                                        name="username"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Электронная почта</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Введите электронную почту" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={loginForm.control}
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Пароль</FormLabel>
                                                <FormControl>
                                                    <Input type="password" placeholder="Введите пароль" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <Button size={"lg"} loading={authStore.isLoading}>
                                    Войти
                                </Button>
                            </form>
                        </Form>
                    </TabsContent>
                    <TabsContent value="register">
                        <Form {...registerForm}>
                            <form
                                onSubmit={registerForm.handleSubmit(handleRegisterSubmit)}
                                className="flex flex-col gap-8"
                            >
                                <div className="flex flex-col gap-4">
                                    <FormField
                                        control={registerForm.control}
                                        name="username"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Электронная почта</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Введите электронную почту" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={registerForm.control}
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Пароль</FormLabel>
                                                <FormControl>
                                                    <Input type="password" placeholder="Введите пароль" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <Button size={"lg"} loading={authStore.isLoading}>
                                    Зарегистрироваться
                                </Button>
                            </form>
                        </Form>
                    </TabsContent>
                </Tabs>
                <div className="auth-form__separators">
                    <Separator />
                    или
                    <Separator />
                </div>
                <Button variant={"outline"} className="w-full" size={"lg"}>Войти по Сбер ID</Button>
            </div>
        </div>
    );
});

