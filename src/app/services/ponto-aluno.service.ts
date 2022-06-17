import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { API_CONFIG } from "src/app/config/api.config";
import { PontoAluno } from "src/app/models/PontoAluno";

@Injectable({
  providedIn: "root",
})
export class PontoAlunoService {
  constructor(private http: HttpClient) {}

  findAllByAlunoId(id: number): Observable<PontoAluno[]> {
    return this.http.get<PontoAluno[]>(
      `${API_CONFIG.baseUrl}/pontoAluno/${id}`
    );
  }
}
