export interface ResponseApi<T> {
    title:  string;
    data:   T[] | T;
    errors: null;
}