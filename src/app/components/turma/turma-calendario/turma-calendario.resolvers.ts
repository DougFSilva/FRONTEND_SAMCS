import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from "@angular/router";
import { Aula } from "src/app/models/Aula";

import { AulaService } from "src/app/services/aula.service";

@Injectable({ providedIn: "root" })
export class TurmaCalendarioResolver implements Resolve<Observable<Aula[]>> {
  constructor(private service: AulaService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const id = route.paramMap.get("id");
    return this.service.findAllByTurma(parseInt(id));
  }
}
