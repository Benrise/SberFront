import { useRootStore } from "@/app/store";
import { useNavigate } from 'react-router-dom';
import { AuthForm } from "@/features/auth"
import { FunctionComponent, useEffect } from "react";
import { observer } from "mobx-react-lite";

export const AuthPage: FunctionComponent = observer(() => {
    const { authStore } = useRootStore();
    const navigate = useNavigate();

    useEffect(() => {
        if (authStore.isAuthorized) {
            navigate('/'); 
        }
      }, [authStore.isAuthorized, authStore.isAuthorized]);

    if (authStore.isLoading && authStore.isAuthorized) {
        return null
    }

    return (
        <div>
            <AuthForm/>
        </div>
    )
})