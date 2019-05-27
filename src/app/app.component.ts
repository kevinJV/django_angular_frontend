import { Component } from '@angular/core';
import { FormsModule, FormBuilder, Validator, FormGroup, Validators } from '@angular/forms';
import { JuegosApiService } from './services/juegos-api.service';
import { Juegos } from './models/juegos';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'front-end';

  editando = false;
  id: number;

  Juegos: any = [];
  angForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private restApi: JuegosApiService
  ) {
    this.createForm();
    this.getJuegos();
  }

  createForm() {
    this.angForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      empresa: ['', Validators.required],
    })
  }

  getJuegos() {
    console.log("Obteniendo juegos..........")
    this.restApi.getJuegos().subscribe((data: {}) => {
      this.Juegos = data;
      console.log(data)
    })
  }

  createJuegos() {
    console.log("Creando juego")
    let juego = {
      nombre: this.angForm.value.name,
      descripcion: this.angForm.value.description,
      empresa: this.angForm.value.empresa
    }
    this.restApi.createJuegos(juego).subscribe((data: {}) => {
      console.log(data)
      this.Juegos.push(data)
    })
    this.limpiarData();
  }

  deleteJuegos(id: number) {
    console.log("Deleteando juego: ", id)
    this.restApi.deleteJuegos(id).subscribe((data: {}) => {
      console.log(data)
      const foundIndex = this.Juegos.findIndex(x => x.id == id)
      this.Juegos.splice(foundIndex, 1)
    })
  }

  updateJuegos() {
    console.log("Updateando juego")
    let juego = {
      nombre: this.angForm.value.name,
      descripcion: this.angForm.value.description,
      empresa: this.angForm.value.empresa
    }
    this.restApi.updateJuegos(this.id, juego).subscribe((data: {}) => {
      console.log(data)
      const foundIndex = this.Juegos.findIndex(x => x.id == this.id)
      this.Juegos[foundIndex] = data
    })
    this.limpiarData()
    this.editando = false
  }

  setUpdateJuegos(item: any) {
    console.log(item)
    this.angForm.get('name').setValue(item.nombre)
    this.angForm.get('description').setValue(item.descripcion)
    this.angForm.get('empresa').setValue(item.empresa)
    this.id = item.id
    this.editando = true;
  }

  limpiarData() {
    this.angForm.get('name').setValue("")
    this.angForm.get('description').setValue("")
    this.angForm.get('empresa').setValue("")
    this.angForm.markAsUntouched()
    this.angForm.markAsPristine()
  }

  cancelarUpdate(){
    this.limpiarData()
    this.editando = false
  }
}
