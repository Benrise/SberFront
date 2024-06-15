import { makeAutoObservable, runInAction } from 'mobx';
import { UserDto } from './types';
import { http } from '../api';

export class UserStore {
  user?: UserDto;
  http: any;
  isLoading: boolean = false;

  constructor() {
    this.user = undefined;
    this.http = http.user;
    this.isLoading = false;
    makeAutoObservable(this);
  }

  async me() {
    this.isLoading = true;
    try {
      const response = await this.http.me();
      runInAction(() => {
        this.user = response.data;
      });
    } catch (error) {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }
}

export const userStore = new UserStore();

