import { makeAutoObservable, runInAction } from 'mobx';
import { AuthCredentialsDto } from '../model';
import { http } from '../api';

export class AuthStore {
  isAuthorized: boolean = false;
  isLoading: boolean = false;
  isInitialized: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }
  
  async initialize() {
    const refreshToken = localStorage.getItem('refreshToken');
    try {
      if (refreshToken) {
        await this.refresh(refreshToken);
      }
      runInAction(() => {
        this.isInitialized = true;
      });
    }
    catch (error) {
      console.error(error);
    }
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

  async register(credentials: AuthCredentialsDto, callback?: () => void) {
    this.setLoading(true);
    try {
      await http.auth.register(credentials);
      await this.login(credentials);
      callback?.();
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

  checkAuth() {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    if (accessToken && refreshToken) {
      this.isAuthorized = true;
    } else {
      this.isAuthorized = false;
    }
  }
}

export const authStore = new AuthStore();
