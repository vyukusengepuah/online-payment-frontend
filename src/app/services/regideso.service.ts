import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConnexionService } from './connexion.service';
import { FormGroup } from '@angular/forms'; 

@Injectable({
  providedIn: 'root'
})
export class RegidesoService {

  constructor(private http:HttpClient,private connexion:ConnexionService) { }

  authentification(formData):Observable<any>{
  
    return this.http.post(this.connexion.base_url+"getway/post?service=regideso-web-portal-service&path=users/auth&exception="+this.connexion.IS_PROD,formData,
    {},
  );      

  }

  check_otp(formData):Observable<any>{
  
    return this.http.post(this.connexion.base_url+"getway/post?service=regideso-web-portal-service&path=users/check_otp&exception="+this.connexion.IS_PROD,formData,
    {},
  );      

  }

  getBranche():Observable<any>{
 
    return this.http.get(this.connexion.base_url+"redigeso_web_portal/getBanche", {
      headers: {
          "Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID
      }
    });       

  }

  entites(id_societe):Observable<any>{
 
    return this.http.get(this.connexion.base_url+"redigeso_web_portal/entites?SOCIETE_ID="+id_societe, {
      
    });       

  }
  compteur_societe_new(id_societe):Observable<any>{
 
    return this.http.get(this.connexion.base_url+"redigeso_web_portal/compteur_societe_new?SOCIETE_ID="+id_societe, {
      
    });       

  }

  comptes_entites(SOCIETE_ID):Observable<any>{
    // console.log(SOCIETE_ID)
 
    var id_session=JSON.parse(sessionStorage.getItem("usersession")).data?JSON.parse(sessionStorage.getItem("usersession")).data.ID:0
    return this.http.get(this.connexion.base_url+"redigeso_web_portal/comptes_entites?SOCIETE_ID="+SOCIETE_ID, {
      headers: {
          "Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+id_session
      }
    });       

  }

  lookup(formData):Observable<any>{
  
    return this.http.post(this.connexion.base_url+"getway/post?service=customer-service&path=v1/lookup&exception="+this.connexion.IS_PROD,formData,
    {},
  );      

  }
  checkbills(formData):Observable<any>{
  
    return this.http.post(this.connexion.base_url+"getway/post?service="+this.connexion.service_regideso_p+"&path=checkbills&exception="+this.connexion.IS_PROD,formData,
    {},
  );      

  }

  
  paybill(formData):Observable<any>{
  
    return this.http.post(this.connexion.base_url+"getway/post?service="+this.connexion.service_regideso_p+"&path=paybill&exception="+this.connexion.IS_PROD,formData,
    {},
  );      

  }

  check_societe(formData):Observable<any>{
  
    return this.http.post(this.connexion.base_url+"getway/post?service=regideso-web-portal-service&path=societe/check_societe&exception="+this.connexion.IS_PROD,formData,
    {},
  );      

  }
  creer_facture(formData):Observable<any>{
  
    return this.http.post(this.connexion.base_url+"getway/post?service=regideso-web-portal-service&path=facture/creer_facture&exception="+this.connexion.IS_PROD,formData,
    {},
  );      

  }
  creer_cashpower(formData):Observable<any>{
  
    return this.http.post(this.connexion.base_url+"getway/post?service=regideso-web-portal-service&path=caspower/creer_caspower&exception="+this.connexion.IS_PROD,formData,
    {},
  );      

  }

  modifier_facture(formData):Observable<any>{
  
    return this.http.post(this.connexion.base_url+"getway/post?service=regideso-web-portal-service&path=facture/update_facture&exception="+this.connexion.IS_PROD,formData,
    {},
  );      

  }
  modifier_cashpower(formData):Observable<any>{
  
    return this.http.post(this.connexion.base_url+"getway/post?service=regideso-web-portal-service&path=caspower/update_caspower&exception="+this.connexion.IS_PROD,formData,
    {},
  );      

  }

  creer_societe(formData):Observable<any>{
  
    return this.http.post(this.connexion.base_url+"getway/post?service=regideso-web-portal-service&path=societe/creer_societe&exception="+this.connexion.IS_PROD,formData,
    {},
  );      

  }

  modifier_societe(formData):Observable<any>{
  
    return this.http.post(this.connexion.base_url+"getway/post?service=regideso-web-portal-service&path=societe/modifier_societe&exception="+this.connexion.IS_PROD,formData,
    {},
  );      

  }
  getSocieteAccounts(id):Observable<any>{
 
    return this.http.get(this.connexion.base_url+"getway/get?service=regideso-web-portal-service&path=compte/getAccounts?SOCIETE_ID="+id+"&exception="+this.connexion.IS_PROD, {
    });       

  }
  getSocieteUsers(id):Observable<any>{
 
    return this.http.get(this.connexion.base_url+"getway/get?service=regideso-web-portal-service&path=users/getUsers?SOCIETE_ID="+id+"&exception="+this.connexion.IS_PROD, {
    });       

  }

  creer_COMPTE(formData):Observable<any>{
  
    return this.http.post(this.connexion.base_url+"getway/post?service=regideso-web-portal-service&path=compte/creer_compte&exception="+this.connexion.IS_PROD,formData,
    {},
  );      

  }
  creer_USER(formData):Observable<any>{
  
    return this.http.post(this.connexion.base_url+"getway/post?service=regideso-web-portal-service&path=users/save_user&exception="+this.connexion.IS_PROD,formData,
    {},
  );      

  }
  creer_type_validation(formData):Observable<any>{
  
    return this.http.post(this.connexion.base_url+"getway/post?service=regideso-web-portal-service&path=societe/modifierTypeValidationSociete&exception="+this.connexion.IS_PROD,formData,
    {},
  );      

  }
  update_USER(formData):Observable<any>{
  
    return this.http.post(this.connexion.base_url+"getway/post?service=regideso-web-portal-service&path=users/update_user&exception="+this.connexion.IS_PROD,formData,
    {},
  );      

  }

  sendMail(formData):Observable<any>{
  
  return this.http.post(this.connexion.base_url+"enoti/sendMail",formData);       

  }

  initiate_user(formData):Observable<any>{
  
    return this.http.post(this.connexion.base_url+"getway/post?service=regideso-web-portal-service&path=users/initiate_user&exception="+this.connexion.IS_PROD,formData,
    {},
  );      

  }

  change_pwd(formData):Observable<any>{
  
    return this.http.post(this.connexion.base_url+"getway/post?service=regideso-web-portal-service&path=users/change_pasword&exception="+this.connexion.IS_PROD,formData,
    {},
  );      

  }

  desactiver_user(formData):Observable<any>{
  
    return this.http.post(this.connexion.base_url+"getway/post?service=regideso-web-portal-service&path=users/desactiveUser&exception="+this.connexion.IS_PROD,formData,
    {},
  );      

  }

  getFactureInfos(id,user_id):Observable<any>{
 
    return this.http.get(this.connexion.base_url+"redigeso_web_portal/getFactureInfos?ID_FACTURE="+id+"&USER_ID="+user_id, {
     
    });       

  }
  getCashpowerInfos(id,user_id):Observable<any>{
 
    return this.http.get(this.connexion.base_url+"redigeso_web_portal/getCashpowerInfos?ID_CASHPOWER="+id+"&USER_ID="+user_id, {
     
    });       

  }
  getFactureHistorique(id):Observable<any>{
 
    return this.http.get(this.connexion.base_url+"redigeso_web_portal/getFactureHistorique?ID_FACTURE="+id, {
     
    });       

  }
  getCashpowerHistorique(id):Observable<any>{
 
    return this.http.get(this.connexion.base_url+"redigeso_web_portal/getCashpowerHistorique?ID_CASHPOWER="+id, {
     
    });       

  }

  dashboard_info(formData):Observable<any>{
    var is_societe_user=(sessionStorage.getItem("societe_user")=="true")
    var societe_user=is_societe_user?" "+sessionStorage.getItem("ID"):""
    var societe_id=sessionStorage.getItem("SOCIETE_ID")?" "+sessionStorage.getItem("SOCIETE_ID"):""
    var id=JSON.parse(sessionStorage.getItem("usersession")).data?" "+JSON.parse(sessionStorage.getItem("usersession")).data.ID:" 0"

    // console.log(sessionStorage.getItem("societe_user"),societe_user)

    // console.log( 'Bearer '+sessionStorage.getItem("tokenKey")+societe_user+societe_id+id)
    return this.http.post(this.connexion.base_url+"redigeso_web_portal/dashboard_info",formData,
     {headers: {"Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+societe_user+societe_id+id }},
   );      

  }

  compte(compte):Observable<any>{
 
    return this.http.get(this.connexion.base_url+"redigeso_web_portal/compte?COMPTE="+compte, {
     
    });       

  }
  compteur_actif_par_societe(societe_id,type):Observable<any>{
 
    return this.http.get(this.connexion.base_url+"redigeso_web_portal/compteur_actif_par_societe?SOCIETE_ID="+societe_id+"&TYPE="+type, {
     
    });       

  }
  compteur_lastToken(COMPTEURCODE):Observable<any>{
 
    return this.http.get(this.connexion.base_url+"redigeso_web_portal/compteur_lastToken?COMPTEURCODE="+COMPTEURCODE, {
     
    });       

  }

  transaction(formData):Observable<any>{
  
    return this.http.post(this.connexion.base_url+"getway/post?service="+this.connexion.service_regideso_ft+"&path=v1/transactions&exception="+this.connexion.IS_PROD,formData,
    {},
  );      

  }
  reserve(formData):Observable<any>{
  
    return this.http.post(this.connexion.base_url+"getway/post?serviceDirect=regidesoFt&path=v1/transactions/reserve&exception="+this.connexion.IS_PROD,formData,
    {},
  );      

  }
  regideso(formData):Observable<any>{
  
    return this.http.post(this.connexion.base_url+"getway/post?serviceDirect=regidesoFt&path=v1/transactions/regideso&exception="+this.connexion.IS_PROD,formData,
    {},
  );      

  }
  complete(formData):Observable<any>{
  
    return this.http.post(this.connexion.base_url+"getway/post?serviceDirect=regidesoFt&path=v1/transactions/complete&exception="+this.connexion.IS_PROD,formData,
    {},
  );      

  }

  confirmation(formData):Observable<any>{
  
    return this.http.post(this.connexion.base_url+"getway/post?service=regideso-web-portal-service&path=confirmation/add&exception="+this.connexion.IS_PROD,formData,
    {},
  );      

  }

  prepay(formData):Observable<any>{
  
    return this.http.post(this.connexion.base_url+"getway/post?service="+this.connexion.service_regideso_p+"&path=prepay&exception="+this.connexion.IS_PROD,formData,
    {},
  );      

  }
  initier_ajout_compteur(json):Observable<any>{

    var is_societe_user=(sessionStorage.getItem("societe_user")=="true")
    var societe_user=is_societe_user?" "+sessionStorage.getItem("ID"):""
    var societe_id=sessionStorage.getItem("SOCIETE_ID")?" "+sessionStorage.getItem("SOCIETE_ID"):""
    var id=JSON.parse(sessionStorage.getItem("usersession")).data?" "+JSON.parse(sessionStorage.getItem("usersession")).data.ID:" 0"

      return this.http.post(this.connexion.base_url+"redigeso_web_portal/initier_ajout_compteur",json,
       {headers: {"Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+societe_user+societe_id+id}},
     );      
  
  }    
  
  reagir_ajout_compteur(json):Observable<any>{

    var is_societe_user=(sessionStorage.getItem("societe_user")=="true")
    var societe_user=is_societe_user?" "+sessionStorage.getItem("ID"):""
    var societe_id=sessionStorage.getItem("SOCIETE_ID")?" "+sessionStorage.getItem("SOCIETE_ID"):""
    var id=JSON.parse(sessionStorage.getItem("usersession")).data?" "+JSON.parse(sessionStorage.getItem("usersession")).data.ID:" 0"

      return this.http.post(this.connexion.base_url+"redigeso_web_portal/reagir_ajout_compteur",json,
       {headers: {"Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+societe_user+societe_id+id}},
     );      
  
  }  

  pdf_facture(id,type):Observable<any>{
 
    return this.http.get(this.connexion.base_url+"redigeso_web_portal/pdf_facture?ID="+id+"&TYPE="+type, {
     
    });       

  }

  verification_session(formData):Observable<any>{
    var is_societe_user=(sessionStorage.getItem("societe_user")=="true")
    var societe_user=is_societe_user?" "+sessionStorage.getItem("ID"):""
    var societe_id=sessionStorage.getItem("SOCIETE_ID")?" "+sessionStorage.getItem("SOCIETE_ID"):""
    var id=JSON.parse(sessionStorage.getItem("usersession")).data?" "+JSON.parse(sessionStorage.getItem("usersession")).data.ID:" 0"

    var tkn='Bearer '+sessionStorage.getItem("tokenKey")+societe_user+societe_id+id
    console.log(tkn)

    // console.log( 'Bearer '+sessionStorage.getItem("tokenKey")+societe_user+societe_id+id)
    return this.http.post(this.connexion.base_url+"redigeso_web_portal/verification_session",formData,
     {headers: {"Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+societe_user+societe_id+id }},
   );      

  }

  deconnecter(ID):Observable<any>{
    console.log(ID)
    // return this.http.get(this.connexion.base_url+"routes/deconnexion?ID="+id);  
    // return this.http.get(this.connexion.base_url+"redigeso_web_portal/deconnexion?ID="+sessionStorage.getItem("ID"), {
    return this.http.get(this.connexion.base_url+"redigeso_web_portal/deconnexion?ID="+ID, {
     
    });  
  }

  verifier_user(id):Observable<any>{
 
    return this.http.get(this.connexion.base_url+"redigeso_web_portal/verifier_user?ID="+id+"&USER_ID="+JSON.parse(sessionStorage.getItem("usersession")).data.ID, {
     
    });       

  }

  export_dashboard_regideso(type,excel_Csv,date_debut,date_fin,entite,compte):Observable<any>{
 
    return this.http.get(this.connexion.base_url+"redigeso_web_portal/export_dashboard_regideso?TYPE="+type+"&excel_csv="+excel_Csv+"&DATE_D="+date_debut+"&DATE_F="+date_fin+"&ENTITE="+entite+"&COMPTE="+compte, {
      headers: {
          "Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID
      }
    });      

  }

  
  getNotification():Observable<any>{
 
    return this.http.get(this.connexion.base_url+"redigeso_web_portal/getNotification", {
      headers: {
      }
    });        

  }
}
