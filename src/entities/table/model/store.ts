import { makeAutoObservable, runInAction } from 'mobx';
import { http } from '../api';
import { BaseDto } from '@/shared/api/types';
import { StatusCodes } from 'http-status-codes';

export class TableStore {

  bills: BaseDto[] = [];
  loading = {
    list: false,
    item: false,
    create: false,
    update: false,
    delete: false,
  };

  constructor() {
    makeAutoObservable(this);
  }

  async fetchBills() {
    this.setLoading('list', true);
    try {
      const response = await http.table.bills();
      runInAction(() => {
        this.bills = response.data;
      });
    } catch (error: any) {
      console.log(error);
    }
    finally {
      this.setLoading('list', false);
    }
  }

  async loadTable(file: File | null) {
    this.setLoading('create', true);
    try {
      const response = await http.table.load_table(file);
      if (response.status === StatusCodes.OK) {
        runInAction(() => {
          this.fetchBills();
        }); 
      }
      return response.data.message;
    } catch (error: any) {
      console.log(error);
    }
    finally {
      this.setLoading('create', false);
    }
  }

  async deleteTable(fileName: string, dfName?: string) {
    this.setLoading('delete', true);
    try {
      const response = await http.table.delete_table(fileName, dfName);
      if (response.status === StatusCodes.OK) {
        runInAction(() => {
          this.fetchBills();
        });
        return response.data.message;
      }
    } catch (error: any) {
      console.log(error);
    }
    finally {
      this.setLoading('delete', false);
    }
  }

  setLoading(operation: keyof typeof this.loading, state: boolean) {
    this.loading[operation] = state;
  }
}

export const tableStore = new TableStore();