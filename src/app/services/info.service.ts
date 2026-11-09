import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConnexionService } from './connexion.service';
import { FormGroup } from '@angular/forms'; 

@Injectable({
  providedIn: 'root'
})
export class InfoService {

  constructor(private http:HttpClient,private connexion:ConnexionService) { }

  chager_AD():Observable<any>{
   
    return this.http.get(this.connexion.base_url+"routes/chargeAD", {
      headers: {
          "Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID
      }
    });     

  }

  addUser(formData):Observable<any>{
 
   
    return this.http.post(this.connexion.base_url+"routes/addUser",formData,
     {headers: {"Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID }},
   );      

  }
  
  addOu(formData):Observable<any>{
 
   
    return this.http.post(this.connexion.base_url+"routes/addOu",formData,
     {headers: {"Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID }},
   );      

  }

  addPost(formData):Observable<any>{
 
   
    return this.http.post(this.connexion.base_url+"routes/addPost",formData,
     {headers: {"Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID }},
   );      

  }

  updatePost(formData):Observable<any>{
 
   
    return this.http.post(this.connexion.base_url+"routes/updatePost",formData,
     {headers: {"Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID }},
   );      

  }
  UpdateOu(formData):Observable<any>{
 
    return this.http.post(this.connexion.base_url+"routes/UpdateOu",formData,
     {headers: {"Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID }},
   );      

  }

  updateUser(formData):Observable<any>{
 
   
    return this.http.post(this.connexion.base_url+"routes/updateUser",formData,
     {headers: {"Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID }},
   );      

  }
  

  inputFill():Observable<any>{
 
    return this.http.get(this.connexion.base_url+"routes/userInputFill", {
      headers: {
          "Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID
      }
    });      

  }

  getOne(id):Observable<any>{
 
    return this.http.get(this.connexion.base_url+"routes/getOne/"+id, {
      headers: {
          "Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID
      }
    });      

  }

  bloquer_user(id):Observable<any>{
 
    return this.http.get(this.connexion.base_url+"routes/bloquer_user/"+id, {
      headers: {
          "Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID
      }
    });      

  }

  debloquer_user(id):Observable<any>{
 
    return this.http.get(this.connexion.base_url+"routes/debloquer_user/"+id, {
      headers: {
          "Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID
      }
    });      
  }

  getUtil():Observable<any>{
 
    return this.http.get(this.connexion.base_url+"routes/getUtilisateur/", {
      headers: {
          "Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID
      }
    });        

  }
  getOU():Observable<any>{
 
    return this.http.get(this.connexion.base_url+"routes/getOU/", {
      headers: {
          "Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID
      }
    });         

  }


  delete_ou(id):Observable<any>{
 
    return this.http.get(this.connexion.base_url+"routes/delete_ou/"+id, {
      headers: {
          "Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID
      }
    });       

  }
  delete_poste(id):Observable<any>{
 
    return this.http.get(this.connexion.base_url+"routes/delete_poste/"+id, {
      headers: {
          "Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID
      }
    });         

  }

  getOne_ou(id):Observable<any>{
 
    return this.http.get(this.connexion.base_url+"routes/getOne_ou/"+id, {
      headers: {
          "Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID
      }
    });        

  }

  getOne_poste(id):Observable<any>{
 
    return this.http.get(this.connexion.base_url+"routes/getOne_poste/"+id, {
      headers: {
          "Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID
      }
    });        

  }
  
  select_his_ou(id):Observable<any>{
 
    return this.http.get(this.connexion.base_url+"routes/select_his_ou/"+id, {
      headers: {
          "Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID
      }
    });        

  }
  hierarchie_ou():Observable<any>{
 
    return this.http.get(this.connexion.base_url+"routes/hierarchie_ou/", {
      headers: {
          "Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID
      }
    });        

  }
  update_hierarchie(formData):Observable<any>{
 
   
    return this.http.post(this.connexion.base_url+"routes/update_hierarchie",formData,
     {headers: {"Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID }},
   );      

  }

  flux_dem_cong():Observable<any>{
    // console.log(sessionStorage.getItem("tokenKey"))
 
    return this.http.get(this.connexion.base_url+"routes/flux_dem_cong/", {
      headers: {
          "Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID
      }
    });         

  }
  update_flux(formData):Observable<any>{
 
   
    return this.http.post(this.connexion.base_url+"routes/update_flux",formData,
     {headers: {"Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID }},
   );      

  }
  service_ou_hierarchie():Observable<any>{
    // console.log(sessionStorage.getItem("tokenKey"))
 
    return this.http.get(this.connexion.base_url+"routes/service_ou_hierarchie/", {
      headers: {
          "Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID
      }
    });         

  }

  update_service_ou_hierarchie(formData):Observable<any>{
 
   
    return this.http.post(this.connexion.base_url+"routes/update_service_ou_hierarchie",formData,
     {headers: {"Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID }},
   );      

  }

  flux_dem_cong1(){
 
    return this.http.get(this.connexion.base_url+"routes/flux_dem_cong/", {
      headers: {
          "Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID
      }
    });       

  }

  get_roles():Observable<any>{
 
    return this.http.get(this.connexion.base_url+"routes/get_roles/", {
      headers: {
          "Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID
      }
    });        

  }

  addRole(formData):Observable<any>{
 
   
    return this.http.post(this.connexion.base_url+"routes/addRole",formData,
     {headers: {"Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID }},
   );      

  }

  delete_role(id):Observable<any>{
 
    return this.http.get(this.connexion.base_url+"routes/delete_role/"+id, {
      headers: {
          "Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID
      }
    });         

  }

  updateRole(formData):Observable<any>{
 
    return this.http.post(this.connexion.base_url+"routes/updateRole",formData,
     {headers: {"Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID }},
   );      

  }

  get_url_role(id):Observable<any>{
 
    return this.http.get(this.connexion.base_url+"routes/get_url_role/"+id, {
      headers: {
          "Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID
      }
    });       

  }
  saves_permissions(formData):Observable<any>{
  
    return this.http.post(this.connexion.base_url+"routes/saves_permissions",formData,
     {headers: {"Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID }},
   );      

  }
  addUrl(formData):Observable<any>{
  
    var id=JSON.parse(sessionStorage.getItem("usersession")).data?JSON.parse(sessionStorage.getItem("usersession")).data.ID:0
    return this.http.post(this.connexion.base_url+"routes/addUrl",formData,
     {headers: {"Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+id}},
   );      

  }
  conge_param():Observable<any>{
  
    return this.http.get(this.connexion.base_url+"routes/conge_param/", {
      headers: {
          "Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID
      }
    });        

  }

  change_conge_param(formData):Observable<any>{
  
    return this.http.post(this.connexion.base_url+"routes/change_conge_param",formData,
     {headers: {"Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID }},
   );      

  }

  conge_init(formData):Observable<any>{
  
    return this.http.post(this.connexion.base_url+"routes/conge_init",formData,
     {headers: {"Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID }},
   );      

  }

  getTypeConge():Observable<any>{
 
    return this.http.get(this.connexion.base_url+"routes/getTypeConge/", {
      headers: {
          "Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID
      }
    });      

  }

  getSoldeConge(id):Observable<any>{
 
    return this.http.get(this.connexion.base_url+"routes/getSoldeConge/"+id, {
      headers: {
          "Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID
      }
    });         

  }

  getSoldeConge_annee(id,annee):Observable<any>{
 
    return this.http.get(this.connexion.base_url+"routes/getSoldeConge_annee/"+id+"/"+annee, {
      headers: {
          "Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID
      }
    });         

  }

  demande_conge(formData):Observable<any>{
 
   
    return this.http.post(this.connexion.base_url+"routes/demande_conge",formData,
     {headers: {"Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID }},
   );      

  }
  demande_conge_update(formData):Observable<any>{
 
   
    return this.http.post(this.connexion.base_url+"routes/demande_conge_update",formData,
     {headers: {"Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID }},
   );      

  }
  getConge(id):Observable<any>{
 
    return this.http.get(this.connexion.base_url+"routes/getConge/"+id, {
      headers: {
          "Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID
      }
    });        

  }

  delete_conge_demande(id):Observable<any>{
 
    return this.http.get(this.connexion.base_url+"routes/delete_conge_demande/"+id, {
      headers: {
          "Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID
      }
    });       

  }

  pdf_conge(formData):Observable<any>{
    // demande_conge(formData):Observable<any>{
 
   
      return this.http.post(this.connexion.base_url+"routes/pdf_conge/",formData,
     {headers: {"Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID }},
   );    
    // return this.http.get(this.connexion.base_url+"routes/pdf_conge/"+id);   

  }

  getHistoriqueConge(id_conge,id_user):Observable<any>{
 
    return this.http.get(this.connexion.base_url+"routes/getHistoriqueConge/"+id_conge+"/"+id_user, {
      headers: {
          "Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID
      }
    });       

  }

  getNotification(id):Observable<any>{
 
    return this.http.get(this.connexion.base_url+"routes/getNotification/"+id, {
      headers: {
          "Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID
      }
    });        

  }

  traiter_conge(formData):Observable<any>{

      return this.http.post(this.connexion.base_url+"routes/traiter_conge/",formData,
     {headers: {"Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID }},
   );    
      

  }

  check_validation(id_conge,id_user):Observable<any>{
 
    return this.http.get(this.connexion.base_url+"routes/check_validation/"+id_conge+"/"+id_user, {
      headers: {
          "Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID
      }
    });         

  }

  info_validateur(id):Observable<any>{
 
    return this.http.get(this.connexion.base_url+"routes/info_validateur/"+id, {
      headers: {
          "Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID
      }
    });        

  }

  getPoste_OU(id):Observable<any>{
 
    return this.http.get(this.connexion.base_url+"routes/getPoste_OU/"+id, {
      headers: {
          "Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID
      }
    });        

  }

  getGrade(id):Observable<any>{
 
    return this.http.get(this.connexion.base_url+"routes/getGrade/"+id, {
      headers: {
          "Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID
      }
    });        

  }

  getPresence():Observable<any>{
 
    return this.http.get(this.connexion.base_url+"routes/getPresence/"+JSON.parse(sessionStorage.getItem("usersession")).data.ID, {
      headers: {
          "Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID
      }
    });        

  }

  pointer(formData):Observable<any>{

    return this.http.post(this.connexion.base_url+"routes/pointer/",formData,
   {headers: {"Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID }},
 );    
    

}


getAgence():Observable<any>{
 
  return this.http.get(this.connexion.base_url+"routes/getAgence", {
    headers: {
        "Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID
    }
  });        

}

addJourFerie(formData):Observable<any>{
 
   
  return this.http.post(this.connexion.base_url+"routes/addJourFerie",formData,
   {headers: {"Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID }},
 );      

}

delete_jour_ferie(id):Observable<any>{
 
  return this.http.get(this.connexion.base_url+"routes/delete_jour_ferie/"+id, {
    headers: {
        "Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID
    }
  });       

}

getOne_jour_ferie(id):Observable<any>{
 
  return this.http.get(this.connexion.base_url+"routes/getOne_jour_ferie/"+id, {
    headers: {
        "Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID
    }
  });      

}
updateJourFerie(formData):Observable<any>{
 
   
  return this.http.post(this.connexion.base_url+"routes/updateJourFerie",formData,
   {headers: {"Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID }},
 );      

}

getActivesEmployes():Observable<any>{
 
  return this.http.get(this.connexion.base_url+"routes/getActivesEmployes", {
    headers: {
        "Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID
    }
  });        

}
date_user_presence(date):Observable<any>{
 
  return this.http.get(this.connexion.base_url+"routes/date_user_presence/"+date, {
    headers: {
        "Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID
    }
  });      

}
absence_retard(id_user,annee,mois):Observable<any>{
 
  return this.http.get(this.connexion.base_url+"routes/absence_retard?id_user="+id_user+"&&annee="+annee+"&&mois="+mois, {
    headers: {
        "Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID
    }
  });      

}

  enregistrerJustification(formData):Observable<any>{
  
    return this.http.post(this.connexion.base_url+"routes/enregistrerJustification",formData,
    {headers: {"Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID }},
  );      

  }
  deleteJustification(formData):Observable<any>{
  
    return this.http.post(this.connexion.base_url+"routes/enregistrerJustification",formData,
    {headers: {"Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID }},
  );      

  }

  risque_insert_questionnaire(formData):Observable<any>{
 
   
    return this.http.post(this.connexion.base_url+"risque/risque_insert_questionnaire",formData,
     {headers: {"Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID }},
   );      

  }

  desactiver_q(id):Observable<any>{
 
    return this.http.get(this.connexion.base_url+"risque/desactiver_q/"+id, {
      headers: {
          "Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID
      }
    });       

  }
  activer_q(id):Observable<any>{
 
    return this.http.get(this.connexion.base_url+"risque/activer_q/"+id, {
      headers: {
          "Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID
      }
    });       

  }
 
  getOneQuestionnaire(id):Observable<any>{
 
    return this.http.get(this.connexion.base_url+"risque/getOneQuestionnaire/"+id, {
      headers: {
          "Authorization": 'Bearer '
      }
    });      

  }
  
  
  risque_update_questionnaire(formData):Observable<any>{
 
   
    return this.http.post(this.connexion.base_url+"risque/risque_update_questionnaire",formData,
     {headers: {"Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID }},
   );      

  }

  getFormulaireActifs():Observable<any>{
 
    return this.http.get(this.connexion.base_url+"risque/getFormulaireActifs", {
      headers: {
          "Authorization": 'Bearer '
      }
    });      

  }

  enregistrer_info_formulaire(formData):Observable<any>{
 
   
    return this.http.post(this.connexion.base_url+"risque/enregistrer_info_formulaire",formData,
     {headers: {"Authorization": 'Bearer '}},
   );      

  }

  get_role_application(formData):Observable<any>{
 
   
    return this.http.post(this.connexion.base_url+"routes/get_role_application",formData); 
  }  

  getMarches(id_marcher):Observable<any>{
 
    return this.http.get(this.connexion.base_url+"obr_marche/getMarches?id_marcher="+id_marcher, {
      headers: {
          "Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID
      }
    });      

  }
  getMarchesParProinceCommune(code_prov,code_Comm):Observable<any>{
 
    return this.http.get(this.connexion.base_url+"obr_marche/getMarchesParProinceCommune?CODE_PROVINCE="+code_prov+"&CODE_COMMUNE="+code_Comm, {
      headers: {
          "Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID
      }
    });      

  }

  
  getCommune(id_povince):Observable<any>{
 
    return this.http.get(this.connexion.base_url+"obr_marche/getCommune/"+id_povince, {
      headers: {
          "Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID
      }
    });   
  }

  getreport(type,code_prov,code_Comm,marche,date_debut,date_fin):Observable<any>{
 
    return this.http.get(this.connexion.base_url+"obr_marche/getreport?TYPE="+type+"&CODE_PROVINCE="+code_prov+"&CODE_COMMUNE="+code_Comm+"&MARCHE="+marche+"&DATE_D="+date_debut+"&DATE_F="+date_fin, {
      headers: {
          "Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID
      }
    });      

  }

  export_obr(type,excel_Csv,code_prov,code_Comm,marche,date_debut,date_fin):Observable<any>{
 
    return this.http.get(this.connexion.base_url+"obr_marche/export?TYPE="+type+"&excel_csv="+excel_Csv+"&CODE_PROVINCE="+code_prov+"&CODE_COMMUNE="+code_Comm+"&MARCHE="+marche+"&DATE_D="+date_debut+"&DATE_F="+date_fin, {
      headers: {
          "Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID
      }
    });      

  }

  export_general(code_prov,code_Comm,marche,date_debut,date_fin):Observable<any>{
 
    return this.http.get(this.connexion.base_url+"obr_marche/export_general?CODE_PROVINCE="+code_prov+"&CODE_COMMUNE="+code_Comm+"&MARCHE="+marche+"&DATE_D="+date_debut+"&DATE_F="+date_fin, {
      headers: {
          "Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID
      }
    });      

  }

}
