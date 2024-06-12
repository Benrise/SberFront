import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs"
import { Input } from "@/shared/ui/input"
import { Button } from "@/shared/ui/button"
import { Separator } from "@/shared/ui/separator"

import './styles.scss'


export const AuthForm = () => {
    return (
        <div className="auth-form">
            <form className="auth-form__form">
                <div className="auth-form__logo">
                    <img src="/images/svg/logo/sber-full.svg" alt="logo" />
                </div>
                <Tabs className="w-full flex flex-col gap-1" defaultValue="login">
                    <TabsList className="!w-full">
                        <TabsTrigger className="w-full" value="login">Вход</TabsTrigger>
                        <TabsTrigger className="w-full" value="register">Регистрация</TabsTrigger>
                    </TabsList>
                    <TabsContent className="flex flex-col gap-12" value="login">
                        <div className="flex flex-col gap-4">
                            <Input placeholder="Электронная почта" />
                            <Input placeholder="Пароль" />
                        </div>
                        <Button size={"lg"}>Войти</Button>
                    </TabsContent>
                    <TabsContent className="flex flex-col gap-12" value="register">
                        <div className="flex flex-col gap-4">
                            <Input placeholder="Электронная почта" />
                            <Input placeholder="Пароль" />
                        </div>
                        <Button size={"lg"}>Регистрация</Button>
                    </TabsContent>
                </Tabs>
                <div className="auth-form__separators">
                    <Separator />
                    или
                    <Separator />
                </div>
                <Button variant={"outline"} className="w-full" size={"lg"}>Войти по Сбер ID</Button>
            </form>
        </div>
    )
}