import { Component, OnInit, Renderer2 } from '@angular/core';
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
  constructor(private personService:PersonService, private renderer: Renderer2) { }

  ngOnInit(): void {
    this.tabla_vacia = <HTMLElement> document.querySelector('fieldset');
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
      if (inp.getAttribute("id")?.includes("name_table")) {
        const range = document.createRange();
        const fragment = range.createContextualFragment(`<input type="text" class="form-control" id="name_table${this.tablas}"
        placeholder="Nombre de la tabla" autocomplete="off" (input)="getSelectOptions()">`);
        inp = fragment.firstChild as HTMLInputElement;
        console.log(inp);
      }
      inp.setAttribute("id", inp.getAttribute("id")!+this.tablas)
      inp.value = ""
    }
    let labels_table = container.querySelectorAll('label');
    for (let lab of Array.from(labels_table)) lab.setAttribute("for", lab.getAttribute("for")!+this.tablas)
    this.tablas++;
  console.log(container.querySelector("fieldset"));

    return <HTMLFieldSetElement> container.querySelector("fieldset")
  }

  addTable(numberTables:number) {
    for(let i = 0 ; i < numberTables; i++)
      document.querySelector('div.row')?.appendChild(this.changeAttr().cloneNode(true))
  }

  getTableNames():string[] {
    let tableNames:string[] = []
    for(let tabla of Array.from(document.querySelectorAll('fieldset'))) {
      let container = document.createElement("div")
      container.appendChild(tabla.cloneNode(true));
      tableNames.push(container.getElementsByTagName('input')[0].value)
    }
    console.log("Chorprecha");
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

