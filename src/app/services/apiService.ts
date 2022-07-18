import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { somaObj } from '../objetos/somaObj';

@Injectable({
  providedIn: 'root',
})
export class apiService {
  public apiBase: String;

  constructor(private http: HttpClient) {
    this.apiBase = 'http://localhost:8081/api';
  }

  getResultado(soma: somaObj): Promise<any> {
    const headers = {
      'Content-Type': 'application/json',
    };
    return new Promise((resolve, reject) => {
      this.http.post(`${this.apiBase}/soma`, soma, { headers }).subscribe({
        next: (response) => {
          {
            console.log(response);

            resolve(response);
          }
          (error: any) => {
            reject(error);
          };
        },
      });
    });
  }

  getHistorico(): Promise<any> {
    const headers = {
      'Content-Type': 'application/json',
    };
    return new Promise((resolve, reject) => {
      this.http.get(`${this.apiBase}/historico`, { headers }).subscribe({
        next: (response) => {
          {
            console.log(response);

            resolve(response);
          }
          (error: any) => {
            reject(error);
          };
        },
      });
    });
  }
}
