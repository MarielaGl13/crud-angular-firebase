import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ProductModel } from '../models/producto.model';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  producto:ProductModel;
  private productoColeccion:AngularFirestoreCollection<ProductModel>;
  constructor(private readonly afs:AngularFirestore) {
    //asignamos nombre a nuestra coleccion
    this.productoColeccion= afs.collection<ProductModel>('producto');
    this.getProductos();
  }
  //guardar un producto en firebase

  onSaveProducto(producto: ProductModel, productId: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
       //verficar si existe el id para guardar o editar
        const id = productId || this.afs.createId();
        const data = { id, ...producto };
        const result = await this.productoColeccion.doc(id).set(data);
        resolve(result);
      } catch (err) {
        reject(err.message);
      }
    });
  }
  //obtener todos los productos
  getProductos() {
     return this.productoColeccion.snapshotChanges().pipe(
        map(actions => actions.map(a => a.payload.doc.data() as ProductModel))
      );
  }
  //eliminar productos
  eliminarProducto(productoId: string): Promise<void>{
      return new Promise(async (resolve, reject) => {
        try {
          const result = await this.productoColeccion.doc(productoId).delete();
          resolve(result);
        } catch (err) {
          reject(err.message);
        }
      });
  }
  //obtener produstos por id
  getById(productoId:string){
    return this.productoColeccion.doc(productoId).valueChanges();
  }
}
