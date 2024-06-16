import { ConfigurationDto, ConfigurationFormValues } from '@/widgets/constructor/model';
import type { AxiosInstance } from 'axios';

export class DistributionRepository {
    constructor(protected endpoint: string, protected axiosInstance: AxiosInstance) {}

    async start(configurations?: ConfigurationDto[]) {
        const payloadObj = {
            configurations: configurations || []
        }
        return this.axiosInstance.post(`${this.endpoint}/start`, payloadObj);
    }

    async result() {
        return this.axiosInstance.get(`${this.endpoint}/result`);
    }

    async get(id: string) {
        return this.axiosInstance.get(`${this.endpoint}/${id}`);
    }
}