import type { AxiosInstance } from 'axios';
import type { UserDto } from '../model';
import { CrudRepository } from '@/shared/api/crud';

export class UserRepository extends CrudRepository<UserDto>{
    constructor(protected endpoint: string, protected axiosInstance: AxiosInstance) {
        super(endpoint, axiosInstance);
    }

    async me(){
        return this.axiosInstance.get<UserDto>(`${this.endpoint}/me`);
    }
}