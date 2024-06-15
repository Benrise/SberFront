export class BaseDto  {
    id: number = -1;
    name: string = '';
}

export interface IBaseListParams {
    n?: number;
    pg?: number;
    pages?: number;
    rows?: number;
}

export interface IBaseListResponse<T> {
    data: T[],
    meta: IBaseListParams
}