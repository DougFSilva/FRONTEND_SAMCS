import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { API_CONFIG } from "src/app/config/api.config";
import { PhotoFORM } from "src/app/models/PhotoFORM";
import { Funcionario } from "src/app/models/Funcionario";


@Injectable({
  providedIn: "root",
})
export class FuncionarioService {
  constructor(private http: HttpClient) {}

  create(funcionario: Funcionario): Observable<Funcionario> {
    return this.http.post<Funcionario>(
      `${API_CONFIG.baseUrl}/funcionario/create`,
      funcionario
    );
  }

  deleteById(id: number): Observable<Funcionario> {
    return this.http.delete<Funcionario>(
      `${API_CONFIG.baseUrl}/funcionario/${id}`
    );
  }

  update(funcionario: Funcionario): Observable<Funcionario> {
    return this.http.put<Funcionario>(
      `${API_CONFIG.baseUrl}/funcionario/${funcionario.id}`,
      funcionario
    );
  }

  findAll(): Observable<Funcionario[]> {
    return this.http.get<Funcionario[]>(`${API_CONFIG.baseUrl}/funcionario`);
  }

  findById(id: number): Observable<Funcionario> {
    return this.http.get<Funcionario>(
      `${API_CONFIG.baseUrl}/funcionario/${id}`
    );
  }

  saveImage(photo: PhotoFORM, id: number) {
    return this.http.post<Funcionario>(
      `${API_CONFIG.baseUrl}/funcionario/saveImage/${id}`,
      photo
    );
  }
}
