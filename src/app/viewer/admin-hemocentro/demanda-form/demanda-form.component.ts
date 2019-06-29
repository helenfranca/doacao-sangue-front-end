import { Component, OnInit, TemplateRef } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";

@Component({
  selector: "app-demanda-form",
  templateUrl: "./demanda-form.component.html",
  styleUrls: ["./demanda-form.component.css"]
})
export class DemandaFormComponent implements OnInit {
  modalRef: BsModalRef;

  demanda: any = {
    hemocentro: 123,
    tiposanguineo: null
  };

  config = {
    backdrop: true,
    ignoreBackdropClick: true
  };

  hideModal() {
    console.log();
    this.modalRef.hide();
    this.enviar();
    alert("O cadastro da demanda foi concluído.");
  }

  setTipo(tipo) {
    this.demanda.tiposanguineo = tipo;
  }

  enviar() {
    console.log(this.demanda);
    this.httpClient
      .post("https://doacaodesangue.herokuapp.com/demanda", this.demanda)
      // .post("http://localhost:3000/demanda", this.demanda)
      .pipe(map(res => res))
      .subscribe(dados => console.log(dados));
  }

  justHide() {
    this.modalRef.hide();
  }

  constructor(
    private modalService: BsModalService,
    private httpClient: HttpClient
  ) {}

  ngOnInit() {}

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.config);
  }
}
