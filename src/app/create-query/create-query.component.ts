import { Component } from '@angular/core';
import { IPerson } from '../interfaces/i-person';
import { PersonService } from '../services/person.service';

@Component({
  selector: 'create-query',
  templateUrl: './create-query.component.html',
  styleUrls: ['./create-query.component.css']
})
export class CreateQueryComponent {
  persona:IPerson = this.newPerson()

  constructor(private personService:PersonService) { }

  newPerson():IPerson {
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
}
