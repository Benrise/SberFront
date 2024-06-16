import { makeAutoObservable, runInAction } from 'mobx';
import { http } from '../api';
import { StatusCodes } from 'http-status-codes';
import { ConfigurationDto, ConfigurationFormValues } from '@/widgets/constructor/model';

export class DistributionStore {

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

  async start(payload?: ConfigurationDto[]) {
    this.setLoading('item', true);
    try {
      const response = await http.distribution.start(payload);
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

  setLoading(operation: keyof typeof this.loading, state: boolean) {
    if (state === this.loading[operation]) return;
    runInAction(() => {
      this.loading[operation] = state;
    });
  }

  async result() {
    this.setLoading('item', true);
    try {
      const response = await http.distribution.result();
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
}

export const distributionStore = new DistributionStore();