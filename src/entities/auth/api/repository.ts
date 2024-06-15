import type { AxiosInstance } from 'axios';
import type { AuthCredentialsDto, AuthResponseDto } from '../model';

export class AuthRepository {
    constructor(protected endpoint: string, protected axiosInstance: AxiosInstance) {}

    async login(credentials: AuthCredentialsDto) {
        return this.axiosInstance.post<AuthResponseDto>(`${this.endpoint}/login`, credentials);
    }

    async register(credentials: AuthCredentialsDto) {
        return this.axiosInstance.post(`${this.endpoint}/signup`, credentials);
    }

    async refresh(refreshToken: string) {
        return this.axiosInstance.post<AuthResponseDto>(`${this.endpoint}/refresh`, {refresh_token: refreshToken});
    }
}