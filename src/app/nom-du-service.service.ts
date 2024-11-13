import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { chambre } from './Chambre';

@Injectable({
  providedIn: 'root'
})
export class NomDuServiceService {

 
  readonly API_URL = 'http://192.168.50.4:8089/tpfoyer/chambre';

  constructor(private httpClient: HttpClient) { }
  getAllchambre() {
    return this.httpClient.get(`${this.API_URL}/retrieve-all-chambres`)
  }
  addchambre(chambre : any) {
    return this.httpClient.post(`${this.API_URL}/add-chambre`, chambre)
  }
  editchambre(chambre : any){
    return this.httpClient.put(`${this.API_URL}/update-chambre`, chambre)
  }


  
}