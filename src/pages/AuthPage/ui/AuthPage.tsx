import { useNavigate } from 'react-router-dom';
import { AuthForm } from "@/features/auth"
import { FunctionComponent, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { AuthModel } from '@/entities/auth';
import { motion } from 'framer-motion';

export const AuthPage: FunctionComponent = observer(() => {
    const navigate = useNavigate();
    const authStore = AuthModel.authStore;

    useEffect(() => {
        if (authStore.isAuthorized) {
            navigate('/'); 
        }
      }, [authStore.isAuthorized, authStore.isAuthorized]);

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
        >
            <AuthForm/>
        </motion.div>
    )
})