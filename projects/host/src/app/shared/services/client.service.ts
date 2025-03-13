import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ApiResponse, Client, ClientCreate } from '../interfaces/client.interface';


@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private apiUrl = 'https://boasorte.teddybackoffice.com.br/users';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  getClients(page: number = 1, limit: number = 10): Observable<Client[]> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    return this.http.get<ApiResponse>(this.apiUrl, { params })
      .pipe(
        map(response => response.clients)
      );
  }

  getClientsWithPagination(page: number = 1, limit: number = 10): Observable<ApiResponse> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    return this.http.get<ApiResponse>(this.apiUrl, { params });
  }

  getClient(id: string): Observable<Client> {
    const idNumber = parseInt(id);
    return this.http.get<Client>(`${this.apiUrl}/${idNumber}`);
  }

  createClient(client: ClientCreate): Observable<Client> {
    return this.http.post<Client>(this.apiUrl, client, this.httpOptions);
  }

  updateClient(id: string, client: any): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<any>(url, client);
  }

  deleteClient(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { responseType: 'text' });
  }
}
