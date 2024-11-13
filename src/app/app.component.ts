import { Component, OnInit } from '@angular/core';
import { NomDuServiceService } from './nom-du-service.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { chambre } from './Chambre';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'tpchambreFront';

  form: boolean = false;
  closeResult!: string;
  listchambres: any;
  chambre!:any;

  constructor(private chambreService: NomDuServiceService, private modalService: NgbModal ) { }

  ngOnInit(): void {
    this.getAllchambre();
    console.log(this.listchambres)
    this.chambre={
      idChambre : null,
      numeroChambre: null,
      typeC:null,
      disponible:null
    }
  }

  getAllchambre(){
    return this.chambreService.getAllchambre().subscribe(res=>{
      this.listchambres = res;
    });
  }
  addchambre(c: any) {
    this.chambreService.addchambre(c).subscribe(() => {
      this.getAllchambre();
      this.form = false;
    });
  }

  editchambre(chambre: chambre) {
    this.chambreService.editchambre(chambre).subscribe();
  }

  open(content: any, action: any) {
    if (action != null)
      this.chambre = action
    else
      this.chambre = new chambre();
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  cancel() {
    this.form = false;
  }
}