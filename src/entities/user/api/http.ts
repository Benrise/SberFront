import axiosInstance from '@/app/api/axios'
import { UserRepository } from './repository';

const userUrl = 'user';

export const http = {
    user: new UserRepository(userUrl, axiosInstance),
}