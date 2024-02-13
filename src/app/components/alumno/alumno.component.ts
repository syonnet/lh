import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.component.html',
  styleUrls: ['./alumno.component.css']
})
export class AlumnoComponent {
  alumnoArray: any[] = [];
  identificacion: string = "";
  nombre: string = "";
  apellido: string = "";
  cursos: string = "";
  edad: number = 0;
  telefono: number = 0;
  email: string = "";
  currentAlumnoID = "";

  constructor(private http: HttpClient) {
    this.getAllAlumnos();
  }

  saveAlumno() {
    let bodyData = {
      "identificacion": this.identificacion,
      "nombre": this.nombre,
      "apellido": this.apellido,
      "cursos": this.cursos,
      "edad": this.edad,
      "telefono": this.telefono,
      "email": this.email
    };

    this.http.post("http://127.0.0.1:8000/student/", bodyData).subscribe((resultData: any) => {
      alert("Alumno registrado correctamente");
      this.resetForm();
      this.getAllAlumnos();
    }, error => {
      alert("Error al guardar alumno: " + error.error.detail);
    });
  }

  getAllAlumnos() {
    this.http.get("http://127.0.0.1:8000/student/").subscribe((resultData: any) => {
      this.alumnoArray = resultData;
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
    this.currentAlumnoID = data.id;
  }

  updateAlumno() {
    let bodyData = {
      "identificacion": this.identificacion,
      "nombre": this.nombre,
      "apellido": this.apellido,
      "cursos": this.cursos,
      "edad": this.edad,
      "telefono": this.telefono,
      "email": this.email
    };

    this.http.put("http://127.0.0.1:8000/student/" + this.currentAlumnoID + "/", bodyData).subscribe((resultData: any) => {
      alert("Alumno actualizado correctamente");
      this.resetForm();
      this.getAllAlumnos();
    }, error => {
      alert("Error al actualizar alumno: " + error.error.detail);
    });
  }

  setDelete(data: any) {
    if (confirm("¿Estás seguro que deseas eliminar al alumno?")) {
      this.http.delete("http://127.0.0.1:8000/student" + "/" + data.id).subscribe((resultData: any) => {
        alert("Alumno eliminado correctamente");
        this.getAllAlumnos();
      }, error => {
        alert("Error al eliminar alumno: " + error.error.detail);
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
