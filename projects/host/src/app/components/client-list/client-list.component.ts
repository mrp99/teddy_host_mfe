import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { SelectionModel } from '@angular/cdk/collections';
import { ClientService } from '../../shared/services/client.service';
import { RealPipe } from '../../shared/pipe/real.pipe';
import { Client } from '../../shared/interfaces/client.interface';
import { ClientDialogComponent } from '../client-dialog/client-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';




@Component({
  selector: 'app-client-list',
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCheckboxModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    RealPipe],

  standalone: true,
  providers: [ClientService],
  templateUrl: './client-list.component.html',
  styleUrl: './client-list.component.scss'
})

export class ClientListComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['select', 'name', 'salary', 'companyValuation', 'actions'];
  dataSource = new MatTableDataSource<Client>([]);
  allClients: Client[] = [];
  selection = new SelectionModel<Client>(true, []);
  showingSelectedOnly = false;
  totalPages = 0;
  pageSize = 10;
  currentPage = 0;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Client>;

  constructor(
    private clientService: ClientService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }


  ngOnInit(): void {
    this.loadClients();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadClients(): void {
    const page = this.currentPage + 1;
    this.clientService.getClientsWithPagination(page, this.pageSize).subscribe({
      next: (response) => {
        this.allClients = response.clients;
        this.dataSource.data = this.allClients;
        this.totalPages = response.totalPages;
        this.currentPage = response.currentPage - 1; // Convert to 0-based for Material paginator
      },
      error: (error) => {
        console.error('Erro ao carregar clientes:', error);
        this.showSnackBar('Erro ao carregar clientes. Tente novamente mais tarde.', 'Erro');
      }
    })
  }

  handlePageEvent(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    if (this.showingSelectedOnly) return;
    this.loadClients();
  }

  isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows && numRows > 0;
  }

  toggleAllRows(): void {
    if (this.isAllSelected()) {
      this.selection.clear();
    } else {
      this.selection.select(...this.dataSource.data);
    }
  }

  showSelectedOnly(): void {
    if (this.selection.selected.length === 0) {
      this.showSnackBar('Selecione pelo menos um cliente primeiro', 'Aviso');
      return;
    }
    this.showingSelectedOnly = true;
    this.dataSource.data = this.selection.selected;
    this.showSnackBar(`Exibindo ${this.selection.selected.length} clientes selecionados`, 'Info');
  }

  clearSelection(): void {
    this.selection.clear();
    this.showingSelectedOnly = false;
    this.dataSource.data = this.allClients;
    this.showSnackBar('Seleção limpa', 'Info');
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(ClientDialogComponent, {
      width: '400px',
      data: { isEditMode: false }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadClients();
        this.showSnackBar('Cliente criado com sucesso!', 'Sucesso');
      }
    });
  }

  openEditDialog(client: Client): void {
    const dialogRef = this.dialog.open(ClientDialogComponent, {
      width: '400px',
      data: { isEditMode: true, client }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.loadClients();
        this.showSnackBar('Cliente atualizado com sucesso!', 'Sucesso');
      } else {
        this.showSnackBar('Erro ao atualizar cliente. Tente novamente.', 'Erro');
      }
    });
  }


  deleteClient(id: number): void {
    const stringId = id.toString();
    if (confirm('Tem certeza que deseja excluir este cliente?')) {
      this.clientService.deleteClient(stringId).subscribe({
        next: () => {
          this.allClients = this.allClients.filter(client => client.id.toString() !== stringId);
          this.dataSource.data = this.allClients;
          this.showSnackBar('Cliente excluído com sucesso!', 'Sucesso');
        },
        error: (error: HttpErrorResponse) => {
          console.error('Erro ao deletar cliente:', error.message);
          this.showSnackBar('Erro ao deletar cliente.', 'Erro');
        }
      });
    }
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




