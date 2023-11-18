import { Component, OnInit } from '@angular/core';
import { IPerson } from '../interfaces/i-person';
import { PersonService } from '../services/person.service';

@Component({
  selector: 'create-query',
  templateUrl: './create-query.component.html',
  styleUrls: ['./create-query.component.css']
})
export class CreateQueryComponent implements OnInit {
  persona:IPerson = this.newPerson()
  tabla_vacia!:HTMLElement
  constructor(private personService:PersonService) { }

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

  addTable(numberTables:number) {
    for(let i = 0 ; i < numberTables; i++)
      document.querySelector('form')?.insertBefore(this.tabla_vacia.cloneNode(true), this.tabla_vacia)
  }

  createQuery() {
    console.log("En desarrollo");

  }
}
