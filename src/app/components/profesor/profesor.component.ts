import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';


@Component({
  selector: 'app-profesor',
  templateUrl: './profesor.component.html',
  styleUrls: ['./profesor.component.css']
})
export class ProfesorComponent {
  profesorArray: any[] = [];
  identificacion: string = "";
  nombre: string = "";
  apellido: string = "";
  cursos: string = "";
  edad: number = 0;
  telefono: number = 0;
  email: string = "";
  currentProfesorID = "";

  constructor(private http: HttpClient) {
    this.getAllProfesores();
  }

  saveProfesor() {
    let bodyData = {
      "identificacion": this.identificacion,
      "nombre": this.nombre,
      "apellido": this.apellido,
      "cursos": this.cursos,
      "edad": this.edad,
      "telefono": this.telefono,
      "email": this.email
    };

    this.http.post("http://127.0.0.1:8000/profesor/", bodyData).subscribe((resultData: any) => {
      alert("Profesor registrado correctamente");
      this.resetForm();
      this.getAllProfesores();
    }, error => {
      alert("Error al guardar profesor: " + error.error.detail);
    });
  }

  getAllProfesores() {
    this.http.get("http://127.0.0.1:8000/profesor/").subscribe((resultData: any) => {
      this.profesorArray = resultData;
    });
  }

  setUpdate(data: any) {
    this.identificacion = data.identificacion;
    this.nombre = data.nombre;
    this.apellido = data.apellido;
    this.cursos = data.cursos;
    this.edad = data.edad;
    this.telefono = data.telefono;
    this.email = data.email;
    this.currentProfesorID = data.id;
  }

  updateProfesor() {
    let bodyData = {
      "identificacion": this.identificacion,
      "nombre": this.nombre,
      "apellido": this.apellido,
      "cursos": this.cursos,
      "edad": this.edad,
      "telefono": this.telefono,
      "email": this.email
    };

    this.http.put("http://127.0.0.1:8000/profesor/" + this.currentProfesorID + "/", bodyData).subscribe((resultData: any) => {
      alert("Profesor actualizado correctamente");
      this.resetForm();
      this.getAllProfesores();
    }, error => {
      alert("Error al actualizar profesor: " + error.error.detail);
    });
  }

  setDelete(data: any) {
    if (confirm("¿Estás seguro que deseas eliminar al profesor?")) {
      this.http.delete("http://127.0.0.1:8000/profesor" + "/" + data.id).subscribe((resultData: any) => {
        alert("Profesor eliminado correctamente");
        this.getAllProfesores();
      }, error => {
        alert("Error al eliminar profesor: " + error.error.detail);
      });
    }
  }

  resetForm() {
    this.identificacion = '';
    this.nombre = '';
    this.apellido = '';
    this.cursos = '';
    this.edad = 0;
    this.telefono = 0;
    this.email = '';
  }
}
