
import { MatDialog } from "@angular/material/dialog";
import { ToastrService } from "ngx-toastr";
import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";

import { DialogComponent } from "./../../dialog/dialog.component";
import { Funcionario } from "src/app/models/Funcionario";
import { FuncionarioService } from "src/app/services/funcionario.service";

@Component({
  selector: "app-funcionarios",
  templateUrl: "./funcionarios.component.html",
  styleUrls: ["./funcionarios.component.css"],
})
export class FuncionariosComponent implements OnInit {
  funcionarios: Funcionario[] = [];
  funcionariosFilter: Funcionario[] = [];
  filtrarPor: string = "nome";
  totalFuncionarios: number = null;

  constructor(
    private service: FuncionarioService,
    private toast: ToastrService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.findAll();
  }

  findAll(): void {
    this.service.findAll().subscribe(
      (response) => {
        this.funcionarios = response;
        this.applyFilter();
      },
      (ex) => {
        this.toast.error(ex.error.error, "Error");
      }
    );
  }

  deleteByIdDialog(id: number): void {
    let dialog = this.dialog.open(DialogComponent);
    dialog.afterClosed().subscribe((response) => {
      if (response == "true") {
        this.deleteByid(id);
      }
    });
  }

  deleteByid(id: number): void {
    this.service.deleteById(id).subscribe(
      () => {
        this.toast.success("Funcionario deletado com sucesso", "Delete");
        this.findAll();
      },
      (ex) => {
        this.toast.error(ex.error.error, "Error");
      }
    );
  }

  applyFilter() {
    var filterValue = <HTMLInputElement>document.getElementById("filter");
    if (filterValue.value == "") {
      this.funcionariosFilter = this.funcionarios;
    } else {
      if (this.filtrarPor == "nome") {
        this.funcionariosFilter = this.funcionarios.filter((funcionario) => {
          if (funcionario.nome != null) {
            return funcionario.nome
              .toLowerCase()
              .includes(filterValue.value.toLowerCase());
          }
          return false;
        });
      } else if (this.filtrarPor == "tag") {
        this.funcionariosFilter = this.funcionarios.filter((aluno) => {
          if (aluno.tag != null) {
            return aluno.tag
              .toString()
              .includes(filterValue.value.toLowerCase());
          }
          return false;
        });
      } else if (this.filtrarPor == "matricula") {
        this.funcionariosFilter = this.funcionarios.filter((funcionario) => {
          if (funcionario.matricula != null) {
            return funcionario.matricula
              .toString()
              .includes(filterValue.value.toLowerCase());
          }
          return false;
        });
      }
    }
    this.totalFuncionarios = this.funcionariosFilter.length;
  }
}
