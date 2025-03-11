import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AuthMfeService } from '../../shared/service/auth-mfe.service';


@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  public msgTitle: string = "Olá, seja bem-vindo!";
  public msgError: string = "O nome de usuário é obrigatório.";
  public loginForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthMfeService) { }

  ngOnInit(): void {
    this.formInit();
  }

  public formInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', [
        Validators.required,
        Validators.maxLength(10),
        Validators.minLength(3)
      ]]
    });
  }

  public onLogin() {
    if (this.loginForm.valid) {
      const formInput = this.loginForm.get('username')?.value;
      this.authService.setUser(formInput);
      window.location.href = 'http://localhost:58366/';
    }
  }
}
