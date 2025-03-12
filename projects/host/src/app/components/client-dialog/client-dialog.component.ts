import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-client-dialog',
  imports: [CommonModule, MatIconModule, ReactiveFormsModule],
  templateUrl: './client-dialog.component.html',
  styleUrl: './client-dialog.component.scss'
})
export class ClientDialogComponent implements OnInit {

  clientForm!: FormGroup;

  constructor(
    private formbuilder: FormBuilder,
    private dialogRef: MatDialogRef<ClientDialogComponent>,
  ) { }

  ngOnInit(): void {
    this.clientFormInit();
  }

  public clientFormInit(): void {
    this.clientForm = this.formbuilder.group({
      nome: ['', Validators.required],
      salario: ['', Validators.required],
      valorEmpresa: ['', Validators.required]
    });
  }


  public onCancel(): void {

  }

  public onSubmit(): void {

  }

}
