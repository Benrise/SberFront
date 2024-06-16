import { makeAutoObservable, runInAction } from 'mobx';
import { http } from '../api';
import { BaseDto, IBaseListParams, IBaseListResponse } from '@/shared/api/types';
import { StatusCodes } from 'http-status-codes';

export class TableStore {

  tableData: IBaseListResponse<Record<string, string>>  = {
    data: [],
    meta: {}
  }
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

  async preloadTable(dfName?: string) {
    this.setLoading('item', true);
    try {
      const response = await http.table.pre_load_table(dfName);
      if (response.status === StatusCodes.OK) {
        return response.data.message
      }
    } catch (error: any) {
      console.log(error);
    }
    finally {
      this.setLoading('item', false);
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

  async getTable(dfName?: string, params?: IBaseListParams) {
    this.setLoading('item', true);
    try {
      const response = await http.table.get_table(dfName, params);
      runInAction(() => {
        this.tableData = response.data
      })
      if (response.status === StatusCodes.OK) {
        return response.data
      }
    } catch (error: any) {
      console.log(error);
    }
    finally {
      this.setLoading('item', false);
    }
  }

  setLoading(operation: keyof typeof this.loading, state: boolean) {
    if (state === this.loading[operation]) return;
    runInAction(() => {
      this.loading[operation] = state;
    });
  }
}

export const tableStore = new TableStore();