import { makeAutoObservable, runInAction } from 'mobx';
import { AuthCredentialsDto } from '../model';
import { http } from '../api';

export class AuthStore {
  accessToken?: string = undefined;
  isAuthorized: boolean = false;
  isLoading: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  async login(credentials: AuthCredentialsDto) {
    this.isLoading = true;
    try {
      const { data, status } = await http.auth.login(credentials);
      runInAction(() => {
        localStorage.setItem('accessToken', data.access_token);
        this.accessToken = data.access_token;
        this.isAuthorized = true;
        this.isLoading = false;
      });

    } catch (err: any) {
      console.error(err);
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  async logout() {
    this.isLoading = true;
    try {
      runInAction(() => {
        this.accessToken = undefined;
        this.isAuthorized = false;
        this.isLoading = false;
        localStorage.removeItem('accessToken');
      });
    } catch (err) {
      console.error(err);
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  async refresh() {
    this.isLoading = true;
    try {
      const response = await http.auth.refresh();
      runInAction(() => {
        localStorage.setItem('accessToken', response.data.access_token);
        this.accessToken = response.data.access_token;
        this.isAuthorized = true;
        this.isLoading = false;
      });
    } catch (err) {
      console.error(err);
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  async register(credentials: AuthCredentialsDto) {
    this.isLoading = true;
    try {
      await http.auth.register(credentials);
      runInAction(async () => {
        await this.login(credentials);
      });
    } catch (err) {
      console.error(err);
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }
}

export const authStore = new AuthStore();