import { Component, inject, OnInit, signal } from '@angular/core';
import { Client } from '../../shared/interfaces/client.interface';
import { ClientService } from '../../shared/services/client.service';
import { CommonModule } from '@angular/common';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { RealPipe } from '../../shared/pipe/real.pipe';



@Component({
  selector: 'app-client-list',
  imports: [CommonModule, MatTableModule, MatPaginatorModule, MatIconModule, MatCheckboxModule, RealPipe],
  standalone: true,
  providers: [ClientService],
  templateUrl: './client-list.component.html',
  styleUrl: './client-list.component.scss'
})
export class ClientListComponent implements OnInit {

  clients = signal<Client[]>([]);
  page: number = 1;
  limit: number = 6;
  totalRecords: number = 0;
  displayedColumns: string[] = ['select', 'name', 'salary', 'companyValuation', 'actions'];
  selectedClientsIds: Set<number> = new Set();

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

  // Verifica se pelo menos um cliente foi selecionado
  public isClientSelected(): boolean {
    const condigiton = this.selectedClientsIds.size > 0;
    if (condigiton) {
      return false;
    } else {
      return true;
    }
  }

  //alternar a seleção de todos os clientes
  public toggleSelectAll(event: any): void {
    if (event.checked) {
      this.clients().forEach((client) => this.selectedClientsIds.add(client.id));
    } else {
      this.selectedClientsIds.clear();
    }
  }

  //Limpar a seleção de clientes
  public clearSelection(): void {
    this.selectedClientsIds.clear();
    this.getClients();
  }

  //verificar se todos os clientes estão selecionados
  public isAllSelected(): boolean {
    return this.clients().length === this.selectedClientsIds.size;
  }

  //existe algum selecioando
  public isIndeterminate(): boolean {
    const selectSize = this.selectedClientsIds.size > 0;
    const selectLength = this.selectedClientsIds.size < this.clients().length;
    return selectSize && selectLength;
  }

  //aletera a selec. de um cliente
  public toggleSelection(client: Client): void {
    this.selectedClientsIds.has(client.id) ?
      this.selectedClientsIds.delete(client.id) :
      this.selectedClientsIds.add(client.id);
  }

  //verifica e um cliente está selecionado
  public isSelected(client: Client): boolean {
    return this.selectedClientsIds.has(client.id);
  }

  //filtar os clientes selecionados
  public showSelectedClients(): void {
    const selectedClientsList = this.clients().filter(client =>
      this.selectedClientsIds.has(client.id)
    );
    this.clients.set(selectedClientsList);
  }


  public editClient(client: Client): void {

  }

  public deleteClient(clientId: number): void {

  }

}




