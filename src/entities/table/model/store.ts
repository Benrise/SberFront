import { makeAutoObservable, runInAction } from 'mobx';
import { http } from '../api';
import { BaseDto } from '@/shared/api/types';
import { StatusCodes } from 'http-status-codes';

export class TableStore {

  bills: BaseDto[] = [];
  isLoading: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchBills() {
    this.isLoading = true;
    try {
      const response = await http.table.bills();
      runInAction(() => {
        this.bills = response.data;
        this.isLoading = false;
      });
    } catch (error: any) {
      console.log(error);
    }
    finally {
      this.isLoading = false;
    }
  }

  async loadTable(file: File | null) {
    this.isLoading = true;
    try {
      await http.table.load_table(file);
      runInAction(() => {
        this.fetchBills();
        this.isLoading = false;
      });
    } catch (error: any) {
      console.log(error);
    }
    finally {
      this.isLoading = false;
    }
  }

  async deleteTable(fileName: string, dfName?: string) {
    this.isLoading = true;
    try {
      const response = await http.table.delete_table(fileName, dfName);
      if (response.status === StatusCodes.OK) {
        runInAction(() => {
          this.fetchBills();
          this.isLoading = false;
        });
        return response.data.message;
      }
    } catch (error: any) {
      console.log(error);
    }
    finally {
      this.isLoading = false;
    }
  }

  setIsLoading(state: boolean) {
    this.isLoading = state;
  }
}

export const tableStore = new TableStore();