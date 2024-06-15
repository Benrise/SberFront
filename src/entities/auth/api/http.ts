import axiosInstance from '@/app/api/axios'
import { AuthRepository } from './repository';

const authUrl = 'auth';

export const http = {
    auth: new AuthRepository(authUrl, axiosInstance),
}