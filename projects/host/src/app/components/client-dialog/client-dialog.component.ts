import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Client, ClientCreate } from '../../shared/interfaces/client.interface';
import { ClientService } from '../../shared/services/client.service';

import { MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SnackbarService } from '../../shared/services/snackbar.service';


@Component({
  selector: 'app-client-dialog',
  imports: [CommonModule, MatIconModule, ReactiveFormsModule, MatSnackBarModule],
  templateUrl: './client-dialog.component.html',
  styleUrl: './client-dialog.component.scss'
})
export class ClientDialogComponent implements OnInit {

  clientForm!: FormGroup;
  isSubmitting = false;
  isEditMode = false;


  constructor(
    private formbuilder: FormBuilder,
    private dialogRef: MatDialogRef<ClientDialogComponent>,
    private clientService: ClientService,
    private SnackbarService: SnackbarService,
  ) { }

  ngOnInit(): void {
    this.clientFormInit();
  }

  public clientFormInit(): void {
    this.clientForm = this.formbuilder.group({
      nome: ['', Validators.required],
      salario: ['', [Validators.required, Validators.min(0)]],
      valorEmpresa: ['', [Validators.required, Validators.min(0)]]
    });
  }

  // Método para carregar dados de um cliente existente (para edição)
  public loadClient(client: Client): void {
    this.isEditMode = true
    this.clientForm.patchValue({
      name: client.name,
      salary: client.salary,
      companyValuation: client.companyValuation,
    });
  }

  public onSubmit(): void {
    if (this.clientForm.valid) {
      this.isSubmitting = true;

      // Criação de um cliente sem o id
      const clientData: ClientCreate = {
        name: this.clientForm.value.nome,
        salary: this.clientForm.value.salario,
        companyValuation: this.clientForm.value.valorEmpresa,
      };

      // Chama o método de criação de cliente
      this.clientService.createClient(clientData).subscribe({
        next: (response) => {
          this.isSubmitting = false;
          this.SnackbarService.showSuccess('Cliente criado com sucesso!');
          this.dialogRef.close(response);
        },
        error: (error) => {
          this.isSubmitting = false;
          this.SnackbarService.showError('Erro ao criar cliente. Tente novamente!');
        },
      });
    } else {
      this.SnackbarService.showWarning('Preencha todos os campos corretamente!');
    }
  }


  public onCancel(): void {
    this.dialogRef.close();
  }

}
