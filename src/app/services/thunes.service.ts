import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConnexionService } from './connexion.service';

@Injectable({
  providedIn: 'root'
})
export class ThunesService {

  constructor(private http:HttpClient,private connexion:ConnexionService) { }

  country():Observable<any>{
 
    return this.http.get(this.connexion.thunes_url+"country", {
      headers: {
         
      }
    });    
  }

  payer_by_country_service(country,service):Observable<any>{
 
    return this.http.get(this.connexion.thunes_url+"payer-per-service/"+country+"/"+service, {
      headers: {
          
      }
    });    
  }
}
