import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Curso {
  id: number;
  nombre: string;
  descripcion: string;
  duracion_meses: number;
  imagen: string; // Ruta relativa de la imagen en Django
  costo: number;
}

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent implements OnInit {
  cursosArray: Curso[] = [];
  nombre: string = "";
  descripcion: string = "";
  duracion_meses: number = 0;
  imagen: File | null = null; // Variable para almacenar la imagen seleccionada
  costo: number = 0;
  currentCursoID = "";

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getAllCursos();
  }

  saveCurso() {
    const formData = new FormData();
    formData.append('nombre', this.nombre);
    formData.append('descripcion', this.descripcion);
    formData.append('duracion_meses', this.duracion_meses.toString());
    if (this.imagen) {
      formData.append('imagen', this.imagen, this.imagen.name);
    }
    formData.append('costo', this.costo.toString());

    this.http.post("http://127.0.0.1:8000/curso/", formData).subscribe((resultData: any) => {
      alert("Curso registrado correctamente");
      this.resetForm();
      this.getAllCursos();
    }, error => {
      alert("Error al guardar curso: " + error.error.detail);
    });
  }

  getAllCursos() {
    this.http.get<Curso[]>("http://127.0.0.1:8000/curso/").subscribe((resultData: Curso[]) => {
      this.cursosArray = resultData.map(curso => ({
        ...curso,
        imagen: `http://127.0.0.1:8000${curso.imagen}` // Concatenar la ruta completa
      }));
    });
  }

  setUpdate(curso: Curso) {
    this.nombre = curso.nombre;
    this.descripcion = curso.descripcion;
    this.duracion_meses = curso.duracion_meses;
    // this.imagen = curso.imagen; // No asignamos directamente la imagen
    this.costo = curso.costo;
    this.currentCursoID = curso.id.toString();
  }

  updateCurso() {
    const formData = new FormData();
    formData.append('nombre', this.nombre);
    formData.append('descripcion', this.descripcion);
    formData.append('duracion_meses', this.duracion_meses.toString());
    if (this.imagen) {
      formData.append('imagen', this.imagen, this.imagen.name);
    }
    formData.append('costo', this.costo.toString());

    this.http.put("http://127.0.0.1:8000/curso/" + this.currentCursoID + "/", formData).subscribe((resultData: any) => {
      alert("Curso actualizado correctamente");
      this.resetForm();
      this.getAllCursos();
    }, error => {
      alert("Error al actualizar curso: " + error.error.detail);
    });
  }

  setDelete(curso: Curso) {
    if (confirm("¿Estás seguro que deseas eliminar el curso?")) {
      this.http.delete("http://127.0.0.1:8000/curso" + "/" + curso.id).subscribe((resultData: any) => {
        alert("Curso eliminado correctamente");
        this.getAllCursos();
      }, error => {
        alert("Error al eliminar curso: " + error.error.detail);
      });
    }
  }

  onFileSelected(event: any) {
    // Capturamos la imagen 
    if (event.target.files.length > 0) {
      this.imagen = event.target.files[0];
    }
  }

  resetForm() {
    this.nombre = '';
    this.descripcion = '';
    this.duracion_meses = 0;
    this.imagen = null;
    this.costo = 0;
  }
}
