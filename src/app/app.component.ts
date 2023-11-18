import { Component/*, OnInit*/ } from '@angular/core';
import { PersonService } from './services/person.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent /*implements OnInit */{
  title = 'autodb';

  constructor(private personService:PersonService/*, private route:ActivatedRoute, private router:Router*/) { }
  /*ngOnInit(): void {
    this.getPerson()
  }*/

  getPerson() {
    this.personService.getPerson().subscribe({
      next: r=>console.log(r),
      error: e=>console.log(e),
    });
  }
}
