import { makeAutoObservable, runInAction } from 'mobx';
import { UserDto } from './types';
import { http } from '../api';

export class UserStore {
  user: UserDto;
  http: any;
  isLoading: boolean = false;

  constructor() {
    this.user = {} as UserDto;
    this.http = http.user;
    this.isLoading = false;
    makeAutoObservable(this);
  }

  async me() {
    this.isLoading = true;
    try {
      const { data } = await this.http.me();
      runInAction(() => {
        this.user = data;
      });
    } catch (error) {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }
}

export const userStore = new UserStore();

