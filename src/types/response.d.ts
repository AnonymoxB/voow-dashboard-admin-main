export interface IResponse {
    success: boolean;
    code: number;
    locale: string;
    message: string;
    data: object;
}