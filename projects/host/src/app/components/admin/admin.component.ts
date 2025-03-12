import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ClientDialogComponent } from '../client-dialog/client-dialog.component';


@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatToolbarModule, MatButtonModule, MatSidenavModule, MatListModule, RouterModule, MatDialogModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {

  constructor(private dialog: MatDialog) { }

  public logout() {
    localStorage.removeItem('user');
    window.location.href = 'http://localhost:49327/login';
  }

  public OpenDialogClient(): void {
    const DialogRef = this.dialog.open(ClientDialogComponent, {
      width: "475px",
      panelClass: "criar-cliente-dialog"
    });

    DialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
