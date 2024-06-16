import { makeAutoObservable, runInAction } from 'mobx';
import { http } from '../api';
import { BaseDto, IBaseListParams, IBaseListResponse } from '@/shared/api/types';
import { StatusCodes } from 'http-status-codes';
import { ConfigurationDto, HistoryDto } from '@/widgets/constructor/model/types';
import { DataframeNamesEnum } from './types';

export class TableStore {

  tableData: IBaseListResponse<Record<string, string>>  = {
    data: [],
    meta: {}
  }
  bills: BaseDto[] = [];
  histories: HistoryDto[] = [];
  configuration: ConfigurationDto = {};
  loading = {
    list: false,
    item: false,
    create: false,
    update: false,
    delete: false,
    filter: false
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

  async getTable(dfName?: DataframeNamesEnum, params: IBaseListParams = {
    pg: 0,
    n: 15
  }) {
    this.setLoading('item', true);
    try {
      let response = await http.table.get_table(dfName, params);
      if (!response.data.data) {
        response = await http.table.get_table(DataframeNamesEnum.BILLS, params);
      }
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

  async history() {
    this.setLoading('list', true);
    try {
      const response = await http.table.history();
      if (response.status === StatusCodes.OK) {
        runInAction(() => {
          this.histories = response.data
        })
      }
    } catch (error: any) {
      console.log(error);
    }
    finally {
      this.setLoading('list', false);
    }
  }

  async filter(dfName?: string, params?: ConfigurationDto[]){
    this.setLoading('filter', true);
    try {
      const response = await http.table.filter(dfName, params);
      if (response.status === StatusCodes.OK) {
        runInAction(() => {
          this.getTable(DataframeNamesEnum.FILTER);
        })
        if (response.data.message) {
          return response.data.message
        }
      }
    }
    catch (error: any) {
      console.log(error);
    }
    finally {
      this.setLoading('filter', false);
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