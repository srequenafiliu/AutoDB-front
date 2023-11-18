import { ITable } from "./i-table";

export interface IDatabase {
  name_db?:string,
  tables:ITable[]
}
