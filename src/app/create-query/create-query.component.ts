import { Component, OnInit } from '@angular/core';
import { IPerson } from '../interfaces/i-person';
import { PersonService } from '../services/person.service';
import { IDatabase } from '../interfaces/i-database';

@Component({
  selector: 'create-query',
  templateUrl: './create-query.component.html',
  styleUrls: ['./create-query.component.css']
})
export class CreateQueryComponent implements OnInit {
  persona:IPerson = this.newPerson()
  tabla_vacia!:HTMLElement
  tablas:number = 2
  query:IDatabase = {
    name_db: "",
    tables: []
  }
  constructor(private personService:PersonService) { }

  ngOnInit(): void {
    this.tabla_vacia = <HTMLElement> document.querySelector('fieldset.table');
  }

  newPerson():IPerson { // Borrar
    return {
      id: "13",
      name: "Sandra"
    }
  }

  enviar() {
    this.personService.addPerson(this.newPerson()).subscribe({
      next:()=>console.log("Todo correcto"),
      error:e=>console.log(e)
    });
  }

  changeAttr():HTMLFieldSetElement {
    let container = document.createElement("div")
    container.appendChild(this.tabla_vacia.cloneNode(true));
    let inputs_table = container.querySelectorAll('input');
    for (let inp of Array.from(inputs_table)) {
      inp.setAttribute("id", inp.getAttribute("id")!+this.tablas)
      inp.value = ""
    }
    let labels_table = container.querySelectorAll('label');
    for (let lab of Array.from(labels_table)) lab.setAttribute("for", lab.getAttribute("for")!+this.tablas)
    this.tablas++;
    return <HTMLFieldSetElement> container.querySelector("fieldset.table")
  }

  addTable(numberTables:number) {
    for(let i = 0 ; i < numberTables; i++)
      document.querySelector('div.row')?.appendChild(this.changeAttr().cloneNode(true))
  }

  getTableNames():string[] {
    let tableNames:string[] = []
    for(let tabla of Array.from(document.querySelectorAll('fieldset.table'))) {
      let container = document.createElement("div")
      container.appendChild(tabla.cloneNode(true));
      tableNames.push(container.getElementsByTagName('input')[0].value)
    }
    return tableNames;
  }

  getSelectOptions() {
    this.query.tables = []
    for(let nombre of this.getTableNames()) this.query.tables.push({name_table: nombre})
  }

  createQuery() {
    this.getSelectOptions()
    console.log(this.query);
  }
}

