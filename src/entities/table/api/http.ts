import axiosInstance from '@/app/api/axios'
import { TableRepository } from './repository';

const tableUrl = 'tables';

export const http = {
    table: new TableRepository(tableUrl, axiosInstance),
}