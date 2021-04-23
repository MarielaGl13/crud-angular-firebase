import { Routes, RouterModule } from '@angular/router';
import { NgModule, Component } from '@angular/core';
//importaciones
import { ProductCreateComponent } from './product/product-create/product-create.component';
import { ProductEditComponent } from './product/product-edit/product-edit.component';
import { ProductListComponent } from './product/product-list/product-list.component';
export const AppRoutes: Routes = [

  {
    path: '',
    component:ProductListComponent
  },
  {
    path: 'agregar-producto',
    component: ProductCreateComponent,
  }
  ,
  {
    path: 'editar-producto/:id',
    component: ProductEditComponent,
  }
];
