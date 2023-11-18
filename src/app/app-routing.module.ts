import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CreateQueryComponent } from './create-query/create-query.component';
import { InProgressComponent } from './in-progress/in-progress.component';
import { AboutUsComponent } from './about-us/about-us.component';

const routes: Routes = [
  { path: 'inicio', component: HomeComponent, title: "AutoDB" },
  { path: 'create-query', component: CreateQueryComponent, title: "AutoDB | Creación de queries" },
  { path: 'in-progress', component: InProgressComponent, title: "AutoDB | En desarrollo" },  
  { path: 'about-us', component: AboutUsComponent, title: "AutoDB | Sobre nosotros" },  
  { path: '', redirectTo: '/inicio', pathMatch: 'full' }, // Ruta por defecto (vacía)
  { path: '**', redirectTo: '/inicio', pathMatch: 'full' } // Ruta que no coincide con ninguna de las anteriores
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
