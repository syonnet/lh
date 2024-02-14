import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './components/home/home.component';
import { ProfesorComponent } from './components/profesor/profesor.component';
import { CursosComponent } from './components/cursos/cursos.component';

import {HttpClientModule} from '@angular/common/http';
import { NavbarDComponent } from './mod/navbar-d/navbar-d.component';
import { FormsModule } from '@angular/forms';
import { CellsComponent } from './mod/cells/cells.component';
import { AlumnoComponent } from './components/alumno/alumno.component';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProfesorComponent,
    CursosComponent,
    NavbarDComponent,
    CellsComponent,
    AlumnoComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
