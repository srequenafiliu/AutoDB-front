import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CreateQueryComponent } from './create-query/create-query.component';

const routes: Routes = [
  { path: 'inicio', component: HomeComponent, title: "AutoDB" },
  { path: 'create-query', component: CreateQueryComponent, title: "AutoDB | Creación de queries" },
  { path: '', redirectTo: '/inicio', pathMatch: 'full' }, // Ruta por defecto (vacía)
  { path: '**', redirectTo: '/inicio', pathMatch: 'full' } // Ruta que no coincide con ninguna de las anteriores
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
