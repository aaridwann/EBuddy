export type Error = { code: number, message: string };
export type Data = { [key: string]: string | boolean | number };

export type DataOrError = Data | Error;