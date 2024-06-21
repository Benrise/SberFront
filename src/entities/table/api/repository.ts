import { IBaseListParams, IBaseListResponse } from '@/shared/api/types';
import { ConfigurationDto, ConfigurationFormValues } from '@/widgets/constructor/model/types';
import type { AxiosInstance, AxiosResponse } from 'axios';
import { EditableCellDto } from '../model';

const fileRequestConfig: AxiosRequestConfig = {
    config: {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  };

export class TableRepository {
    constructor(protected endpoint: string, protected axiosInstance: AxiosInstance) {}

    async bills() {
        return this.axiosInstance.get(`${this.endpoint}/list_files`);
    }

    async load_table(payload: File | null) {
        const formData = new FormData();
        if (payload) formData.append('file', payload);
        return this.axiosInstance.post(`${this.endpoint}/load_table`, formData, fileRequestConfig.config);
    }

    async pre_load_table(df_name?: string) {
      const params = {
        df_name: df_name
      }
      return this.axiosInstance.get(`${this.endpoint}/pre_load_table`, { params: params });
    }

    async get_table(df_name?: string, params?: IBaseListParams) {
        const paramsObj = {
            df_name: df_name,
            ...params,
        }
        return this.axiosInstance.get<IBaseListResponse<Record<string, string>>>(`${this.endpoint}/get_table`, { params: paramsObj });
    }

    async delete_table(file_name: string, df_name?: string) {
        const params = {
            filename: file_name,
            df_name: df_name
        }
        return this.axiosInstance.delete(`${this.endpoint}/delete_table`, { params: params });
    }

    async filter(df_name?:string, payload?: ConfigurationFormValues) {
        const params = {
            df_name: df_name,
        }
        return this.axiosInstance.post(`${this.endpoint}/filter`, payload, { params: params });
    }

    async history() {
        return this.axiosInstance.get(`${this.endpoint}/history`);
    }
    
    async edit_cell(payload: EditableCellDto) {
        return this.axiosInstance.post(`${this.endpoint}/edit_cell`, payload);
    }
}