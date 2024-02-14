import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProfesorComponent } from './components/profesor/profesor.component';
import { CursosComponent } from './components/cursos/cursos.component';
import { AlumnoComponent } from './components/alumno/alumno.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'profesor', component: ProfesorComponent },
  { path: 'alumno', component: AlumnoComponent },
  { path: 'cursos', component: CursosComponent },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
