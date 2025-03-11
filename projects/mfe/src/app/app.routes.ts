import { Routes } from "@angular/router";
import { LoginComponent } from "./components/login/login.component";

export const routes_mfe: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent }
];
