import { Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { ProductListComponent } from './product-list/product-list.component';

export const routes: Routes = [
  { 
    path: '', 
    redirectTo: '/home', 
    pathMatch: 'full' 
  },
  { 
    path: 'home', 
    component: MainComponent,
    children: [
      {
        path: 'products',
        component: ProductListComponent
      }
    ]
  },
  { 
    path: '**', 
    redirectTo: '/home' 
  }
];
