import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ClientService } from '../../shared/services/client.service';
import { Client, ClientCreate, DialogData } from '../../shared/interfaces/client.interface';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';


@Component({
  selector: 'app-client-dialog',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatSnackBarModule
  ],
  templateUrl: './client-dialog.component.html',
  styleUrl: './client-dialog.component.scss'
})
export class ClientDialogComponent {
  clientForm!: FormGroup;
  isEditMode: boolean = false;
  isSubmitting: boolean = false;

  constructor(
    private fb: FormBuilder,
    private clientService: ClientService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<ClientDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {

    this.clientForm = this.fb.group({
      name: ['', [Validators.required]],
      salary: [0, [Validators.required, Validators.min(0)]],
      companyValuation: [0, [Validators.required, Validators.min(0)]]
    });

    if (data.isEditMode && data.client) {
      this.isEditMode = true;
      this.clientForm.patchValue(data.client);
    }
  }

  // ngOnInit(): void {
  //   if (this.isEditMode && this.data.client) {
  //     this.clientForm.patchValue({
  //       name: this.data.client.name,
  //       salary: this.data.client.salary,
  //       companyValuation: this.data.client.companyValuation
  //     });
  //   }
  // }

  onSubmit(): void {
    if (this.clientForm.invalid || this.isSubmitting) {
      return;
    }

    this.isSubmitting = true;

    const clientData: ClientCreate = {
      name: this.clientForm.value.name,
      salary: this.clientForm.value.salary,
      companyValuation: this.clientForm.value.companyValuation
    };

    if (this.isEditMode && this.data.client) {
      console.log(this.data.client, clientData);
      const id = this.data.client.id;
      if (!id) {
        this.showSnackBar('ID do cliente inválido', 'Erro');
        this.isSubmitting = false;
        return;
      }
      this.clientService.updateClient(id, clientData)
        .subscribe({
          next: () => {
            this.dialogRef.close(true);
          },
          error: (error) => {
            this.showSnackBar('Erro ao atualizar cliente. Tente novamente mais tarde.', 'Erro');
            this.isSubmitting = false;
          }
        });
    } else {
      this.clientService.createClient(clientData)
        .subscribe({
          next: () => {
            this.dialogRef.close(true);
          },
          error: (error) => {
            console.error('Erro ao criar cliente:', error);
            this.showSnackBar('Erro ao criar cliente. Tente novamente mais tarde.', 'Erro');
            this.isSubmitting = false;
          }
        });
    }
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }

  showSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: action.toLowerCase() === 'erro' ? 'error-snackbar' :
        action.toLowerCase() === 'sucesso' ? 'success-snackbar' :
          'info-snackbar'
    });
  }

}
