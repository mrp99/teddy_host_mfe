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
export class ClientDialogComponent implements OnInit {
  clientForm!: FormGroup;
  isEditMode: boolean = false;
  isSubmitting: boolean = false;

  constructor(
    private fb: FormBuilder,
    private clientService: ClientService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<ClientDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  onSubmit(): void {
    if (this.clientForm.invalid || this.isSubmitting) return;
    this.isSubmitting = true;
    const clientData: ClientCreate = this.prepareClientData();


    if (this.isEditMode) {
      const clientDataWithId: Client = {
        id: this.data.client!.id,
        ...clientData
      };
      this.handleEditClient(clientDataWithId);
    } else {
      this.handleCreateClient(clientData);
    }
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }

  private initializeForm(): void {
    this.clientForm = this.fb.group({
      name: ['', [Validators.required]],
      salary: [0, [Validators.required, Validators.min(0)]],
      companyValuation: [0, [Validators.required, Validators.min(0)]]
    });

    if (this.data.isEditMode && this.data.client) {
      this.isEditMode = true;
      this.clientForm.patchValue(this.data.client);
    }
  }

  private prepareClientData(): ClientCreate {
    return {
      name: this.clientForm.value.name,
      salary: this.clientForm.value.salary,
      companyValuation: this.clientForm.value.companyValuation
    };
  }

  private handleCreateClient(clientData: ClientCreate): void {
    this.clientService.createClient(clientData).subscribe({
      next: () => this.closeDialog(true),
      error: () => this.handleError('Erro ao criar cliente. Tente novamente mais tarde.')
    });
  }

  private handleEditClient(client: Client): void {
    const idStr = client.id.toString();

    const clientDataForUpdate: ClientCreate = {
      name: client.name,
      salary: client.salary,
      companyValuation: client.companyValuation
    };

    this.clientService.updateClient(idStr, clientDataForUpdate).subscribe({
      next: () => this.closeDialog(true),
      error: () => this.handleError('Erro ao atualizar cliente. Tente novamente mais tarde.')
    });
  }

  private closeDialog(success: boolean): void {
    this.dialogRef.close(success);
  }

  private handleError(message: string): void {
    this.showSnackBar(message, 'Erro');
    this.isSubmitting = false;
  }

  private showSnackBar(message: string, action: string): void {
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
