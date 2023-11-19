import { IForeignKey } from "./i-foreign-key";

export interface IData {
  name_field:string,
  type: string,
  size:number,
  non_null:boolean,
  pk:boolean,
  unique:boolean,
  autoincrement:boolean,
  fk?:IForeignKey,
  first_field:boolean,
  last_field:boolean
}
