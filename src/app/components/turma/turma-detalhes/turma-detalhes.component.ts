import { Router, ActivatedRoute } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Component, OnInit } from "@angular/core";

import { Turma } from "src/app/models/Turma";
import { TurmaService } from "src/app/services/turma.service";

@Component({
  selector: "app-turma-detalhes",
  templateUrl: "./turma-detalhes.component.html",
  styleUrls: ["./turma-detalhes.component.css"],
})
export class TurmaDetalhesComponent implements OnInit {
  turma: Turma = {
    id: null,
    codigo: "",
    curso: "",
    entrada: "",
    saida: "",
    almocoEntrada: "",
    almocoSaida: "",
    toleranciaEntrada: null,
    toleranciaSaida: null,
    periodo: "",
    aulas: [],
    imagem: "",
  };

  constructor(
    private service: TurmaService,
    private toast: ToastrService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.turma.id = this.route.snapshot.paramMap.get("id");
    this.findById();
  }

  findById(): void {
    this.service.findById(this.turma.id).subscribe(
      (response) => {
        this.turma = response;
      },
      (ex) => {
        this.toast.error(ex.error.error, "Error");
      }
    );
  }
}
