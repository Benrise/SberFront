import type { AxiosResponse } from 'axios';

export function isRequestSuccessful(response: AxiosResponse): boolean {
  return response.status >= 200 && response.status <= 206;
}

export function isRequestUnsuccessful(response: AxiosResponse): boolean {
  return !isRequestSuccessful(response);
}