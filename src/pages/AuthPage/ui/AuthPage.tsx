import { useNavigate } from 'react-router-dom';
import { AuthForm } from "@/features/auth"
import { FunctionComponent, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { AuthModel } from '@/entities/auth';

export const AuthPage: FunctionComponent = observer(() => {
    const navigate = useNavigate();
    const authStore = AuthModel.authStore;

    useEffect(() => {
        if (authStore.isAuthorized) {
            navigate('/'); 
        }
      }, [authStore.isAuthorized, authStore.isAuthorized]);

    return (
        <div>
            <AuthForm/>
        </div>
    )
})