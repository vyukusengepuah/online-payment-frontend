import { HttpClient } from '@angular/common/http';
import { Injectable , OnInit} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { ConnexionService } from './connexion.service';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService implements OnInit {

  session= JSON.parse(sessionStorage.getItem('usersession'));
  
  isAuth = false;

 
  
  
  constructor(private http:HttpClient,private connexion:ConnexionService) {
    console.log(this.session)
    if (this.session) {
      
      if (this.session.response=="ok") {
        console.log(this.session)
        this.isAuth = true;
      }
      
    }
   
  }

   ngOnInit(): void {

  }
 

  onAuth(formInfo):Observable<any>{
   
    return this.http.post(this.connexion.base_url+"/routes/auth",formInfo.value);   

  }
  onAuth1(formInfo):Observable<any>{
   
    return this.http.post(this.connexion.base_url+"routes/auth",formInfo);   

  }
  change_pwd(formInfo):Observable<any>{
   
    return this.http.post(this.connexion.base_url+"routes/change_pwd",formInfo);   

  }
    
  check_users_exist():Observable<any>{
 
    return this.http.get(this.connexion.base_url+"routes/check_users_exist/");   

  }

  insert_first_user(formData):Observable<any>{
 
   
    return this.http.post(this.connexion.base_url+"routes/insert_first_user",formData);   

  }

  deconnecter():Observable<any>{
    // return this.http.get(this.connexion.base_url+"routes/deconnexion?ID="+id);  
    var id=JSON.parse(sessionStorage.getItem("usersession")).data?" "+JSON.parse(sessionStorage.getItem("usersession")).data.ID:" 0"

    return this.http.get(this.connexion.base_url+"routes/deconnexion?ID="+id, {
     
    });  
  }
}
