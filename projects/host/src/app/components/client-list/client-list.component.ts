import { Component, inject, OnInit, signal } from '@angular/core';
import { Client } from '../../shared/interfaces/client.interface';
import { ClientService } from '../../shared/service/client.service';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-client-list',
  imports: [CommonModule, MatTableModule, MatPaginatorModule, MatIconModule],
  standalone: true,
  providers: [ClientService],
  templateUrl: './client-list.component.html',
  styleUrl: './client-list.component.scss'
})
export class ClientListComponent implements OnInit {

  clients = signal<Client[]>([]);

  page: number = 1;
  limit: number = 5;
  totalRecords: number = 0;
  displayedColumns: string[] = ['name', 'salary', 'companyValuation', 'actions'];
  private clientService = inject(ClientService);

  ngOnInit(): void {
    this.getClients();
  }

  public getClients(event?: any): void {
    if (event) {
      this.page = event.pageIndex + 1;  // +1 porque o índice começa de 0
      this.limit = event.pageSize;
    }

    this.clientService.getClients(this.page, this.limit).subscribe({
      next: (response) => {
        this.clients.set(response.clients);
        this.totalRecords = response.totalRecords || 0;
      },
      error: (error) => {
        console.error('Erro ao listar clientes', error);
      },
    });
  }


  public editClient(client: Client): void {
    console.log('Editando o cliente:', client);
  }

  public deleteClient(clientId: number): void {
    console.log('excluindo o client', clientId);
  }
}




