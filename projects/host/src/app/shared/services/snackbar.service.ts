import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private snackBar: MatSnackBar) { }

  public openSnackbar(
    message: string,
    action: string = 'Fechar',
    duration: number = 3000,
    panelClass: string[] = []
  ): void {
    this.snackBar.open(message, action, {
      duration: duration,
      panelClass: panelClass,
    });
  }

  public showSuccess(message: string): void {
    this.openSnackbar(message, 'Fechar', 3000, ['success-snackbar']);
  }

  public showError(message: string): void {
    this.openSnackbar(message, 'Fechar', 3000, ['error-snackbar']);
  }

  public showWarning(message: string): void {
    this.openSnackbar(message, 'Fechar', 3000, ['warning-snackbar']);
  }
}
