import { makeAutoObservable, runInAction } from 'mobx';
import { UserDto } from './types';
import { http } from '../api';

export class UserStore {
  user: UserDto;

  isLoading: boolean = false;

  constructor() {
    this.user = {} as UserDto;
    this.isLoading = false;
    makeAutoObservable(this);
  }

  async me() {
    this.isLoading = true;
    try {
      const { data } = await http.user.me();
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

