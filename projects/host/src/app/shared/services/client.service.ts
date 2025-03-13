import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Client, ClientCreate } from '../interfaces/client.interface';
import { HttpStatusCode } from '../enums/httpStatusCode';
import { ERROR_MESSAGES } from '../consts/error-messages';


@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private apiUrl = 'https://boasorte.teddybackoffice.com.br/users';

  constructor(private http: HttpClient) { }

  public getClients(page: number, limit: number): Observable<any> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    return this.http.get<any>(this.apiUrl, { params });
  }

  // Criar um novo cliente
  public createClient(client: ClientCreate): Observable<ClientCreate> {
    return this.http.post<Client>(this.apiUrl, client)
      .pipe(catchError(this.handleError));
  }

  // Atualizar um cliente existente e cuidado com interface
  public updateClient(client: Client): Observable<Client> {
    if (!client.id) {
      return throwError(() => new Error("Cliente precisa ter um ID para ser atualizado"));
    }
    return this.http.put<Client>(`${this.apiUrl}/${client.id}`, client)
      .pipe(catchError(this.handleError));
  }

  // Excluir um cliente
  public deleteClient(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  // Tratamento de erros
  private handleError(excepiton: HttpErrorResponse): Observable<never> {
    let errorMessage = "Ocorreu um erro na operação";
    if (excepiton.error instanceof ErrorEvent) {
      errorMessage = `Erro: ${excepiton.error.message}`
    } else {
      const statusCode = excepiton.status as HttpStatusCode;
      //sera que funciona?
      if (Object.values(HttpStatusCode).includes(statusCode)) {
        errorMessage = ERROR_MESSAGES[statusCode]
      } else {
        errorMessage = `Código: ${excepiton.status}, Mensagem: ${excepiton.message}`
      }
    }
    return throwError(() => new Error(errorMessage));
  }

}
