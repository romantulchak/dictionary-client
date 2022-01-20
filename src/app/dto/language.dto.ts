import { PrivilegesDTO } from "./privileges.dto";

export class LanguageDTO{
    public id?: number;
    public name: string;
    public code: string;
    public createAt?: Date;
    public updateAt?: Date;
    public privileges?: PrivilegesDTO;
}