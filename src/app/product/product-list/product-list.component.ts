import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductModel } from 'src/app/models/producto.model';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  productos: ProductModel[];
  loading = true;
  constructor(
    private productoService: ProductoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.obtenerProductos();
  }
  //obtener todos los productos de base de datos
  obtenerProductos() {
    this.productoService.getProductos().subscribe((data) => {
      this.productos = data;
      this.loading = false;
    });
  }
  //eliminar productos
  eliminar(productoId: string) {
    this.productoService.eliminarProducto(productoId);
  }
}
