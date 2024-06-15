import { makeAutoObservable, runInAction } from 'mobx';
import { AuthCredentialsDto } from '../model';
import { http } from '../api';

export class AuthStore {
  isAuthorized: boolean = false;
  isLoading: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  async login(credentials: AuthCredentialsDto) {
    this.setLoading(true);
    try {
      const { data } = await http.auth.login(credentials);
      runInAction(() => {
        localStorage.setItem('refreshToken', data.refresh_token);
        localStorage.setItem('accessToken', data.access_token);
        this.isAuthorized = true;
      });
    } catch (error) {
      console.error(error);
    } finally {
      this.setLoading(false);
    }
  }

  async logout() {
    this.setLoading(true);
    try {
      runInAction(() => {
        this.isAuthorized = false;
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
      });
    } catch (error) {
      console.error(error);
    } finally {
      this.setLoading(false);
    }
  }

  async refresh(refreshToken: string) {
    this.setLoading(true);
    try {
      const { data } = await http.auth.refresh(refreshToken);
      runInAction(() => {
        localStorage.setItem('refreshToken', data.refresh_token);
        localStorage.setItem('accessToken', data.access_token);
        this.isAuthorized = true;
      });
    } catch (error) {
      console.error(error);
      await this.logout();
    } finally {
      this.setLoading(false);
    }
  }

  async register(credentials: AuthCredentialsDto) {
    this.setLoading(true);
    try {
      await http.auth.register(credentials);
      await this.login(credentials);
    } catch (error) {
      console.error(error);
    } finally {
      this.setLoading(false);
    }
  }

  private setLoading(state: boolean) {
    runInAction(() => {
      this.isLoading = state;
    });
  }
}

export const authStore = new AuthStore();
