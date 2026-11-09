import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppComponent } from '../../app.component';
import { AuthentificationService } from '../../services/authentification.service';
import { ConnexionService } from '../../services/connexion.service';
import { InfoService } from '../../services/info.service';
import { CookieService } from 'ngx-cookie-service';
import { RegidesoService } from '../../services/regideso.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [CookieService],
})
export class LoginComponent { 

  showPasswordOnPress: boolean=false;
  message="";
  probleme=false
  is_threre_users=true
  annee=new Date().getFullYear();
  
  auth_form=new FormGroup({
    username:new FormControl('',Validators.required),
    pwd:new FormControl('',Validators.required)
  })

  user_form=new FormGroup({
    user_name:new FormControl('',Validators.required),
    pwd:new FormControl('',Validators.required),
    nom:new FormControl('',Validators.required),
    prenom:new FormControl('',Validators.required),
    tel:new FormControl('',Validators.required),
    email:new FormControl('',[Validators.required,Validators.email]),
    pwd1:new FormControl('',Validators.required)
  })
  
  noConnected:boolean=true
  applications: any;
  bancobu_user: boolean=false;
  societe_user: boolean=false;
  already_auth=false

  constructor(private info_service:InfoService,
    private auth_service:AuthentificationService,
    private regidesoService:RegidesoService,
    private approot:AppComponent, 
    private router: Router, 
    private connexion:ConnexionService,
    public cookieService:CookieService
  ) { 
    if(this.cookieService.get("USERNAME")&&this.cookieService.get("PWD"))this.already_auth=true
  }

  generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0,
            v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
  }

  getDeviceId() {
    let deviceId = localStorage.getItem("device_id");
    if (!deviceId) {
        deviceId = this.generateUUID();
        localStorage.setItem("device_id", deviceId);
    }
    return deviceId;
  }

  ngOnInit(): void {
    if(this.cookieService.get("USERNAME")&&this.cookieService.get("PWD"))this.already_auth=true
    var usersession=this.cookieService.get("usersession")?JSON.parse(this.cookieService.get("usersession")):null

    console.log(this.cookieService.getAll())
    this.cookieService.delete("usersession")
                
    var profils=usersession?usersession.data.PROFIL:[0]
    
    let formData = new FormData();
    formData.append("profils",JSON.stringify(profils))

    this.info_service.get_role_application(formData).subscribe
    (res=>{
      if(res.response=="non"){
        alert("PROBLEME DE SERVEUR")
      }else{
        this.applications=res.applications
        console.log( this.applications)
        console.log(this.find_application('8'),this.applications)
        console.log(this.cookieService.get("societe_user"))
        
        if(this.cookieService.get("AUTO_AUTHENTICATION_REGIDESO")){
          this.submit_session()
        }else{
          this.submit_session()
        }
      }
    },
    error=>{
      console.log(error)
    })      

    this.auth_service.check_users_exist().subscribe
    (res=>{
      if(res.response=="non"){
        this.is_threre_users=false
      }else{
        this.is_threre_users=true
      }
    },
    error=>{
      console.log(error)
    })
  }

  find_application(id: any){
  return this.applications.find(({ ID_APPLICATION }: any) => ID_APPLICATION === id)
}

  // --- FONCTION SUBMIT CORRIGÉE ---
  submit() {
    this.approot.progressBar=true;
    this.message=""
    this.auth_form.value['device']=this.getDeviceId()
    this.auth_form.value['APP_ID']=this.connexion.APP_ID
    
    console.log(this.auth_form.value)
    
    this.auth_service.onAuth(this.auth_form).subscribe
    (res=>{
      this.approot.progressBar=false;
      var data=res.data
      this.probleme=false
      
      sessionStorage.setItem("usersession", JSON.stringify(res));
      sessionStorage.setItem('debut_session',""+new Date().getTime())

      if(res.response=="non"){
        this.bancobu_user=false
        this.noConnected=false;  
        this. auth_service.isAuth=false  
        if(res.message== "bloqué"){
          this.message="CETTE IDENTIFICATION A ETE BLOQUEE";
          return
        }else if(res.message== "session_exist"){
          this.message="Cet utilisateur est connecte sur un autre poste de travail, veuillez le deconnecter ou attendre sa deconnection dans 15min inactif"
          return
        }else{
          this.message="Verifier votre identification"
        }
      }else{
        this.bancobu_user=true
        if(res.data.FOTO){
          var foto=this.connexion.base_url+((res.data.FOTO).replace("uploads/",""))
        }else var foto=''
        
        sessionStorage.setItem("foto",foto);
        sessionStorage.setItem("tokenKey",res.tokenKey);
        sessionStorage.setItem("flux",JSON.stringify(res.data.state));
        sessionStorage.setItem("array_node",JSON.stringify(res.array_node));
        sessionStorage.setItem("array_link",JSON.stringify(res.array_link));
        
        var url=sessionStorage.getItem('url_new');
        console.log(data)
        
        sessionStorage.setItem("username",this.auth_form.value.username);
        
        if(data.RESET_PWD>0){
          this.info_service.service_ou_hierarchie().subscribe
          (res=>{
            if(res.response=="non"){
              alert('Problème de connexion au serveur')  
            }else{
              console.log(res.data.state)
              sessionStorage.setItem("service_ou_hierarchie",JSON.stringify(res.data.state));
              var url=sessionStorage.getItem('url_new');
              console.log(url)
            }
          },
          error=>{
            console.log(error)
          })
        }else{
          sessionStorage.setItem("bancobu_user",""+this.bancobu_user);
          sessionStorage.setItem("hwo_change","bancobu_user");
          this.router.navigate(['change_pwd']);
        }
      }

      //AUTHENTIFICATION GATEWAY
      var password=Math.floor(100000 + Math.random() * 900000)
      this.approot.progressBar=true;
      
      this.regidesoService.authentification({"PWD":this.auth_form.value.pwd,"USERNAME":this.auth_form.value.username,"OTP":password}).subscribe
      (res1=>{
        this.approot.progressBar=false;
        console.log(res1)
        
        if(!res1.success){
          this.societe_user=false
        }else if(res1.ACTIF=="0"){
          this.societe_user=false
          this.message="Cette identification a été désactivée"
          this.approot.progressBar=false;
          return
        }
        else{
          if(parseInt(res1.CHECKED)>0){
            this.societe_user=true
            sessionStorage.setItem("ID",res1.ID);
            sessionStorage.setItem("NAME",res1.NAME);
            sessionStorage.setItem("LASTNAME",res1.LASTNAME);
            sessionStorage.setItem("USERNAME",res1.USERNAME);
            sessionStorage.setItem("TEL",res1.TEL);
            sessionStorage.setItem("NIVEAU",res1.NIVEAU);
            sessionStorage.setItem("SOCIETE_ID",res1.SOCIETE_ID);
            sessionStorage.setItem("EMAIL",res1.EMAIL);
            sessionStorage.setItem("PWD",this.auth_form.value.pwd);
          }else{
            this.already_auth=false
            this.message="Cette identification n'est encore verifiée, veuillez consulter le service concerné"
            this.approot.progressBar=false;
            return
          }
        }
        
        sessionStorage.setItem("societe_user",""+this.societe_user);
        sessionStorage.setItem("bancobu_user",""+this.bancobu_user);

        console.log(res1.RESET_PWD)
        
        if(res1.RESET_PWD=="1"){
          sessionStorage.setItem("hwo_change","societe_user");
          this.router.navigate(['change_pwd']);
          return
        }
        
        console.log(res1.ID,this.getDeviceId(),this.bancobu_user)

        this.regidesoService.verification_session({ID:res1.ID?res1.ID:":::"+res.data.ID,device:this.getDeviceId()}).subscribe
        (resiii=>{
          if(!this.bancobu_user&&resiii.response=="non"){
            if(resiii.message== "session_exist"){
              this.message="Cet utilisateur est connecté sur un autre poste, veuillez vous deconnecter sur tout autre appareil ou attendez 15min toutes vos sessions seront déconnectées"
            }else{
              console.log(resiii)
            }
          }else{
            var json_email={
              "from":"notification-regideso-web-portal-service@bancobu.com",
              "to":res1.EMAIL,
              "cc":"",
              "subject":"OTP",
              "attachments":"",
              "msg":"Votre OTP : <b>"+password+"</b> valable de <b>5min</b>",
            }
            if(this.societe_user){
              this.regidesoService.sendMail(json_email).subscribe
              (res2=>{
                this.approot.progressBar=false;
                console.log(res2)
                this.approot.progressBar=false;
                return
              },
              error=>{
                this.message="ECHEC ! OTP N'EST PAS ENVOYE"
                console.log(error)
                this.approot.progressBar=false;
              })

              console.log(password)
              this.router.navigate(['code_confirmation']);
            }
            this.approot.progressBar=false;

            if(this.bancobu_user){
              console.log("LOG1")
              this. auth_service.isAuth=true
              this.router.navigate(['accueil']);
            }
          }
        },
        error=>{
          console.log(error)
          this.approot.progressBar=false;
        })
        
        if(!this.societe_user&&!this.bancobu_user)
          this.message="ECHEC ! VERIFIER VOTRE IDENTIFICATION"
        
      },
      error=>{
        console.log(error)
        this.probleme=true
        this.approot.progressBar=false;
      })
    },
    error=>{
      console.log(error)
      this.probleme=true
      this.approot.progressBar=false;
    })
  }

focus(){
  document.getElementById("pwd")?.focus();
}

  enter(){ }

  send_otp(){ }

  submit_session(){
    this.message=""
    this.approot.progressBar=true;
    
    var json: any = {};
json['value'] = {username:this.cookieService.get("USERNAME"),pwd:this.cookieService.get("PWD"),device:this.getDeviceId(),APP_ID:this.connexion.APP_ID}
    
    this.auth_service.onAuth(json).subscribe
    (res=>{
      this.approot.progressBar=false;
      var data=res.data
      this.probleme=false
      
      sessionStorage.setItem("usersession", JSON.stringify(res));
      sessionStorage.setItem('debut_session',""+new Date().getTime())
      
      if(res.response=="non"){
        this.noConnected=false;  
        this. auth_service.isAuth=false  
        if(res.message== "bloqué"){
          this.message="CETTE IDENTIFICATION A ETE BLOQUEE";
        }else if(res.message== "session_exist"){
          this.message="Cet utilisateur est connecté sur un autre poste, veuillez vous deconnecter sur tout autre appareil ou attendez 15min toutes vos sessions seront deconnectées"
        }else{
        }
        this.bancobu_user=false
      }else{
        this.bancobu_user=true
        console.log(res)
        if(res.data.FOTO){
          var foto=this.connexion.base_url+((res.data.FOTO).replace("uploads/",""))
        }else var foto=''
        
        sessionStorage.setItem("foto",foto);
        sessionStorage.setItem("tokenKey",res.tokenKey);
        sessionStorage.setItem("flux",JSON.stringify(res.data.state));
        sessionStorage.setItem("array_node",JSON.stringify(res.array_node));
        sessionStorage.setItem("array_link",JSON.stringify(res.array_link));
        
        var url=sessionStorage.getItem('url_new');
        console.log(data)
        
        sessionStorage.setItem("username",this.auth_form.value.username);
        if(data.RESET_PWD>0){
          this.info_service.service_ou_hierarchie().subscribe
          (res=>{
            if(res.response=="non"){
              alert('Problème de connexion au serveur')  
            }else{
              console.log(res.data.state)
              sessionStorage.setItem("service_ou_hierarchie",JSON.stringify(res.data.state));
              var url=sessionStorage.getItem('url_new');
              console.log(url)
            }
          },
          error=>{
            console.log(error)
          })
        }else{
          sessionStorage.setItem("bancobu_user",""+this.bancobu_user);
          sessionStorage.setItem("hwo_change","bancobu_user");
          this.router.navigate(['change_pwd']);
        }
      }
      
      //AUTHENTIFICATION GATEWAY
      var password=Math.floor(100000 + Math.random() * 900000)
      
      console.log(this.cookieService.get("PWD"),this.cookieService.get("USERNAME"),password)

      this.regidesoService.authentification({"PWD":this.cookieService.get("PWD"),"USERNAME":this.cookieService.get("USERNAME"),"OTP":password}).subscribe
      (res1=>{
        console.log(res1)
        if(!res1.success){
          this.societe_user=false
        }else if(res1.ACTIF=="0"){
          this.societe_user=false
          this.message="ECHEC! CETTE IDENTIFICATION A ETE DESACTIVE"
          this.approot.progressBar=false;
          return
        }
        else{
          if(parseInt(res1.CHECKED)>0){
            this.societe_user=true
            sessionStorage.setItem("ID",res1.ID);
            sessionStorage.setItem("NAME",res1.NAME);
            sessionStorage.setItem("LASTNAME",res1.LASTNAME);
            sessionStorage.setItem("USERNAME",res1.USERNAME);
            sessionStorage.setItem("TEL",res1.TEL);
            sessionStorage.setItem("NIVEAU",res1.NIVEAU);
            sessionStorage.setItem("SOCIETE_ID",res1.SOCIETE_ID);
            sessionStorage.setItem("EMAIL",res1.EMAIL);
            sessionStorage.setItem("PWD",this.auth_form.value.pwd?this.auth_form.value.pwd:this.cookieService.get("PWD"));
          }else{
            this.already_auth=false
            this.message="Cette identification n'est encore verifiée, veuillez consulter le service concerné"
            this.approot.progressBar=false;
            return
          }
        }
        sessionStorage.setItem('debut_session',""+new Date().getTime())

        sessionStorage.setItem("societe_user",""+this.societe_user);
        sessionStorage.setItem("bancobu_user",""+this.bancobu_user);
        
        if(res1.RESET_PWD=="1"){
          sessionStorage.setItem("hwo_change","societe_user");
          this.router.navigate(['change_pwd']);
          return
        }
        console.log(res.ID,this.getDeviceId())
        
        this.regidesoService.verification_session({ID:res1.ID?res1.ID:":::"+res.data.ID,device:this.getDeviceId()}).subscribe
        (resiii=>{
          if(resiii.response=="non"){
            if(resiii.message== "session_exist"){
              this.message="Cet utilisateur est connecté sur un autre poste, veuillez vous déconnecter sur tout autre appareil ou attendez 15min toutes vos sessions seront deconnectées"
              this.already_auth=false
            }else{
              console.log(resiii)
            }
          }else{
            var json_email={
              "from":"notification-regideso-web-portal-service@bancobu.com",
              "to":res1.EMAIL,
              "cc":"",
              "subject":"OTP",
              "attachments":"",
              "msg":"Votre OTP : <b>"+password+"</b> valable de <b>5min</b>",
            }
            console.log(json_email,this.societe_user)
            
            if(this.societe_user)
              this.regidesoService.sendMail(json_email).subscribe
              (res2=>{
                console.log(res2)
                this.approot.progressBar=false;
                this.router.navigate(['code_confirmation']);
                this.approot.progressBar=false;
                return
              },
              error=>{
                this.message="ECHEC ! OTP N'EST PAS ENVOYE"
                console.log(error)
                this.approot.progressBar=false;
              })
            
            this.approot.progressBar=false;

            if(this.bancobu_user){
              console.log("LOG2")
              this. auth_service.isAuth=true
              this.router.navigate(['accueil']);
            }
          }
        },
        error=>{
          console.log(error)
          this.approot.progressBar=false;
        })
        
        if(!this.societe_user&&!this.bancobu_user){
          this.message="ECHEC ! VERIFIER VOTRE IDENTIFICATION"
          this.already_auth=false
        }
      },
      error=>{
        console.log(error)
        this.probleme=true
        this.approot.progressBar=false;

        if(this.bancobu_user){
          console.log("LOG3")
          this. auth_service.isAuth=true
          this.router.navigate(['accueil']);
        }
        
        if(!this.societe_user&&!this.bancobu_user){
          this.message="ECHEC ! VERIFIER VOTRE IDENTIFICATION"
          this.already_auth=false
        }
      })
    },
    error=>{
      console.log(error)
      this.probleme=true
      this.approot.progressBar=false;
    })
  }
}