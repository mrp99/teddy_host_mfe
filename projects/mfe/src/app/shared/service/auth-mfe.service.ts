import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthMfeService {

  private userSignal = signal<string | null>(null);

  constructor() { }

  public setUser(username: string): void {
    localStorage.setItem('username', username);
    this.userSignal.set(username);
  }

  public getUser(): string | null {
    return localStorage.getItem('username') || this.userSignal();
  }

  public clearUser(): void {
    localStorage.removeItem('username');
    this.userSignal.set(null);
  }
}
