import { Routes } from "@angular/router";
import { AdminComponent } from "./components/admin/admin.component";
import { ClientListComponent } from "./components/client-list/client-list.component";
import { ProductsComponent } from "./components/products/products.component";

export const routes_host: Routes = [
  { path: "", component: AdminComponent },
  {
    path: 'admin', component: AdminComponent,
    children: [
      { path: 'client', component: ClientListComponent },
      { path: 'product', component: ProductsComponent },
    ]
  },

];
