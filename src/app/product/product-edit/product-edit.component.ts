import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductModel } from 'src/app/models/producto.model';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css'],
})
export class ProductEditComponent implements OnInit {
  productoId: string;
  url: string;
  producto_form: FormGroup;
  producto: ProductModel;
  imagenUrl: string;
  porcentaje: number;
  loading = true;
  constructor(
    private fb: FormBuilder,
    private productoService: ProductoService,
    private storage: AngularFireStorage,
    private router: Router,
    private activatedRouter: ActivatedRoute
  ) {}

  ngOnInit(): void {
    //obtener id del producto enviada por url
    this.productoId = this.activatedRouter.snapshot.paramMap.get('id');
    this.obtenerProducto();
    this.initForm();
  }
  //obtener producto por id para editarlo
  obtenerProducto() {
    this.productoService.getById(this.productoId).subscribe((data) => {
      this.producto = data;
      this.setValue();
    });
  }
  //iniciamos el formulario y colocamos las validaciones
  initForm() {
    this.producto_form = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      precio:['',Validators.required],
      cantidad:['',Validators.required],
      imagenUrl: ['', Validators.required],
    });
  }
  //agregamos los valores a los campos del form
  setValue() {
    this.producto_form.setValue({
      nombre: this.producto.nombre,
      descripcion: this.producto.descripcion,
      precio:this.producto.precio,
      cantidad:this.producto.cantidad,
      imagenUrl:this.producto.imagenUrl
    });
    this.url = this.producto.imagenUrl;
    this.loading=false;
  }
  //guardamos el producto
  guardar() {
    if (this.producto_form.valid) {
      const producto = this.producto_form.value;
      //verificamos si existe el id , si es asi se actualiza
      const productoId = this.producto.id || null;
      //verificamos si se actualizo la imagen o no
      producto.imagenUrl = this.imagenUrl ? this.imagenUrl : this.url;
      this.productoService.onSaveProducto(this.producto_form.value, productoId);
      this.producto_form.reset();
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

      let ruta = 'productos/' + filename + extencion;
      const ref = this.storage.ref(ruta);
      const task = ref.put(file);
      //aqui obtenemos el porcentaje de carga de la imagen
      task.percentageChanges().subscribe((porcentajesubida) => {
        this.porcentaje = parseInt(porcentajesubida.toString());
                //agregamos el porcentaje de carga al progressbar
                document.getElementsByClassName('progress-bar').item(0).setAttribute('style','width:'+Number(this.porcentaje)+'%');
      });
      task.then((objeto) => {
        ref.getDownloadURL().subscribe((url) => {
          this.imagenUrl = url;
        });
      });
    }
  }
}
