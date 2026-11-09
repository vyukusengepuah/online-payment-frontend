import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConnexionService } from './connexion.service';

import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class EnotiService {

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

  addAmandeSite(formData):Observable<any>{
 
    return this.http.post(this.connexion.base_url+"routes/update_hierarchie",formData,
     {headers: {"Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID }},
   );      

  }


  transaction_par_periode_export(dat1,dat2,Type):Observable<any>{
    // console.log(sessionStorage.getItem("tokenKey"))
 
    return this.http.get(this.connexion.base_url+"enoti/transaction_par_periode_export?date1="+dat1+"&&date2="+dat2+"&&Type="+Type, {
      headers: {
          "Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID
      }
    });         

  }
  transaction_par_periode_export_cbs(dat1,dat2):Observable<any>{
    // console.log(sessionStorage.getItem("tokenKey"))
 
    return this.http.get(this.connexion.base_url+"enoti/transaction_par_periode_export_cbs?date1="+dat1+"&&date2="+dat2, {
      headers: {
          "Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID
      }
    });         

  }

  transaction_par_periode_export_partenaires(dat1,dat2,Type):Observable<any>{
    // console.log(sessionStorage.getItem("tokenKey"))
 
    return this.http.get(this.connexion.base_url+"enoti/transaction_par_periode_export_partenaires?date1="+dat1+"&&date2="+dat2+"&&Type="+Type, {
      headers: {
          "Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID
      }
    });         

  }

  facture_export(dat1,dat2,Type):Observable<any>{
    // console.log(sessionStorage.getItem("tokenKey"))
 
    return this.http.get(this.connexion.base_url+"brarudi/facture_export?date1="+dat1+"&&date2="+dat2+"&&Type="+Type, {
      headers: {
          "Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID
      }
    });         

  }

  upload_brarudi_file(formInfo:FormGroup):Observable<any>{
   
    return this.http.post(this.connexion.base_url+"brarudi/upload_brarudi_file",formInfo.value);   

  }

  upload_brarudi_file_new(formData):Observable<any>{
 
    return this.http.post(this.connexion.base_url+"brarudi/upload_brarudi_file",formData,
     {headers: {"Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID }},
   );      

  }

  getClient():Observable<any>{
 
    return this.http.get(this.connexion.base_url+"brarudi/getClient/", {
      headers: {
          "Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID
      }
    });        

  }

  addFacture(formData):Observable<any>{
 
    return this.http.post(this.connexion.base_url+"brarudi/addFacture",formData,
     {headers: {"Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID }},
   );      

  }

  suprimer_facture(id):Observable<any>{
 
    return this.http.get(this.connexion.base_url+"brarudi/suprimer_facture/"+id, {
      headers: {
          "Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID
      }
    });      

  }

  getOneFacture(id):Observable<any>{
 
    return this.http.get(this.connexion.base_url+"brarudi/getOneFacture/"+id, {
      headers: {
          "Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID
      }
    });        

  }

  updateFacture(formData):Observable<any>{
 
    return this.http.post(this.connexion.base_url+"brarudi/updateFacture",formData,
     {headers: {"Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID }},
   );      

  }

  addClient(formData):Observable<any>{
 
    return this.http.post(this.connexion.base_url+"brarudi/addClient",formData,
     {headers: {"Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID }},
   );      

  }

  suprimer_client(id):Observable<any>{
 
    return this.http.get(this.connexion.base_url+"brarudi/suprimer_client/"+id, {
      headers: {
          "Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID
      }
    });      

  }

  getOneClient(id):Observable<any>{
 
    return this.http.get(this.connexion.base_url+"brarudi/getOneClient/"+id, {
      headers: {
          "Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID
      }
    });        

  }

  updateClient(formData):Observable<any>{
 
    return this.http.post(this.connexion.base_url+"brarudi/updateClient",formData,
     {headers: {"Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID }},
   );      

  }

}
