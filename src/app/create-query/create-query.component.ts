import { Component, OnInit } from '@angular/core';
import { IDatabase } from '../interfaces/i-database';
import { IData } from '../interfaces/i-data';
import { QueryService } from '../services/query.service';

@Component({
  selector: 'create-query',
  templateUrl: './create-query.component.html',
  styleUrls: ['./create-query.component.css']
})
export class CreateQueryComponent implements OnInit {
  tabla_vacia!:HTMLElement
  contador:number = 1
  query:IDatabase = {
    name_db: "",
    tables: []
  }
  schema!:string
  tipo:string = '0';
  status_ok:boolean = false;

  constructor(private queryService:QueryService) { }

  ngOnInit(): void {
    this.tabla_vacia = <HTMLElement> document.querySelector('.tabla_datos');
  }

  checkStatus() {
    this.queryService.checkHealth().subscribe({
      next:()=>this.status_ok = true,
      error:e=>console.log(e)
    })
  }

  changeAttr(clase:string):HTMLDivElement {
    let container = document.createElement("div")
    container.appendChild(this.tabla_vacia.cloneNode(true));
    let inputs_table = container.querySelectorAll('input');
    for (let inp of Array.from(inputs_table)) {
      inp.setAttribute("id", inp.getAttribute("id")!+this.contador)
      inp.value = ""
    }
    let labels_table = container.querySelectorAll('label');
    for (let lab of Array.from(labels_table)) lab.setAttribute("for", lab.getAttribute("for")!+this.contador)
    let radio_table = container.querySelectorAll('input[type="radio"]');
    for (let rad of Array.from(radio_table)) rad.setAttribute("name", rad.getAttribute("name")!+this.contador)
    this.contador++;
    return <HTMLDivElement> container.querySelector(clase)
  }

  addTable(numberTables:number) {
    for(let i = 0 ; i < numberTables; i++)
      document.getElementById('inputs')?.appendChild(this.changeAttr(".tabla_datos").cloneNode(true))
  }

  addColumn(numberCols:number) {
    for(let i = 0 ; i < numberCols; i++)
      document.querySelector('div.tabla_datos')?.appendChild(this.changeAttr(".column").cloneNode(true))
  }

  getLabelText(column:Element, attr_name:string):string {
    let input = (<HTMLInputElement>column.querySelector(`input[name^="${attr_name}"]:checked`))
    let labelText = '';
    if (input) {
      const tipo_label = column.querySelector(`label[for="${input.id}"]`);
      labelText = tipo_label?.textContent || '';
    }
    return labelText;
  }

  createQuery() {
    for(let tabla of Array.from(document.querySelectorAll('.tabla_datos'))) {
      let container = document.createElement("div")
      container.appendChild(tabla.cloneNode(true));
      let data_array:IData[] = []
      for(let [i, column] of Array.from(container.querySelectorAll('div.column')).entries()) {
        let data = {
          name_field:(<HTMLInputElement>column.querySelector('input[name="name_field"]')).value,
          type: this.getLabelText(column, 'types_data'),
          size: +(<HTMLInputElement>column.querySelector('input[name="size"]')).value,
          non_null:(<HTMLInputElement>column.querySelector('input[name="not-null"]')).checked,
          pk:this.getLabelText(column, 'keys') == 'Primaria',
          unique:this.getLabelText(column, 'keys') == 'Única',
          autoincrement:(<HTMLInputElement>column.querySelector('input[name="ai"]')).checked,
          last_field: i==Array.from(container.querySelectorAll('div.column')).length-1
        }
        data_array.push(data)
      }
      this.query.tables.push({name_table: container.getElementsByTagName('input')[0].value, datos:data_array})
    }
    this.queryService.sendQuery(this.query).subscribe({
      next:()=>console.log("Lo he conseguido"),
      error:e=>console.log(e)
    })
    console.log(this.query);
  }
}

