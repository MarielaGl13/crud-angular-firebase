import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css'],
})
export class ProductCreateComponent implements OnInit {
  producto_form: FormGroup;
  loading = false;
  url: string;
  isUploah = false;
  imagenUrl: string;
  porcentaje: number=0;
  constructor(
    private fb: FormBuilder,
    private produtService: ProductoService,
    private storage: AngularFireStorage,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
  }
  //inicializamos el formulario y le colocamos las validaciones
  initForm() {
    this.producto_form = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      precio: ['', Validators.required],
      cantidad: ['', Validators.required],
      imagenUrl: ['', Validators.required],
    });
  }
  //guardamos en la base de datos
  guardar() {
    if (this.producto_form.valid) {
      this.loading = true;
      const producto = this.producto_form.value;
      //aqui guardamos la url de la imagen
      producto.imagenUrl = this.imagenUrl;
      //verficamos si existe el id, si no existe se crea un usuario
      const productoId = producto.id || null;
      this.produtService
        .onSaveProducto(this.producto_form.value, productoId)
        .then((data) => {
          this.loading = false;
        });
      this.producto_form.reset();
      //navegamos al la ruta de listar
      this.router.navigateByUrl('/');
    }
  }
  //nos permite subir las imagenes a firebase
  upload(event) {


    if (event.target.files.length > 0) {
      let reader = new FileReader();
      reader.onload = (event: any) => {
        this.url = event.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
      let filename = new Date().getTime().toString();
      let file = event.target.files[0];
      let extencion = file.name
        .toString()
        .substring(file.name.toString().lastIndexOf('.'));
      //obetnemos el porcentaje de subida de la imagen
      let ruta = 'productos/' + filename + extencion;
      const ref = this.storage.ref(ruta);
      const task = ref.put(file);
      task.percentageChanges().subscribe((porcentajesubida) => {
        this.porcentaje = parseInt(porcentajesubida.toString());
        //agregamos el porcentaje de carga al progressbar
        document.getElementsByClassName('progress-bar').item(0).setAttribute('style','width:'+Number(this.porcentaje)+'%');
      });
      task.then((objeto) => {
        ref.getDownloadURL().subscribe((url) => {
          this.imagenUrl = url;
          this.isUploah = true;
        });
      });
    }
  }
}
