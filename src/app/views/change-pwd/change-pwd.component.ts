import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppComponent } from '../../app.component';
import { StrongPasswordRegx } from '../../regex';
// import { AppComponent } from 'src/app/app.component';
import { AuthentificationService } from '../../services/authentification.service';
import { ConnexionService } from '../../services/connexion.service';
import { InfoService } from '../../services/info.service';
import { RegidesoService } from '../../services/regideso.service';
import { CustomValidators } from '../must-match.validator';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-change-pwd',
  templateUrl: './change-pwd.component.html',
  styleUrls: ['./change-pwd.component.scss']
})
export class ChangePwdComponent implements OnInit {

  username:String=JSON.parse(sessionStorage.getItem("usersession")).data.USERNAME 
  imageSrc="assets/logo.png"
  showPasswordOnPress1: boolean=false;
  message="";
  probleme=false

  is_threre_users=true
  usersession=JSON.parse(sessionStorage.getItem('usersession'))

 annee=new Date().getFullYear();
 auth_form=new FormGroup({
   pwd:new FormControl('',Validators.required),
   pwd1:new FormControl('', {
    validators: [Validators.required, Validators.pattern(StrongPasswordRegx)],
  }),
   pwd2:new FormControl('',Validators.required),
   
 },
 [CustomValidators.MatchValidator('pwd1', 'pwd2')]
 )


 noConnected:boolean=true
  constructor(
    private info_service:InfoService,
    private auth_service:AuthentificationService,
    private regidesoService:RegidesoService,
    private approot:AppComponent, 
    private router: Router, 
    private connexion:ConnexionService,
    public cookieService:CookieService) { }

  ngOnInit(): void {
    if(this.usersession.hasOwnProperty("data"))
      sessionStorage.setItem("hwo_change","bancobu_user");
    else
      sessionStorage.setItem("hwo_change","societe_user");
  }


  submit(){
    if (this.auth_form.value.pwd!=this.auth_form.value.pwd1) {
      
    this.approot.progressBar=true;
    console.log(sessionStorage.getItem("PWD"),1,this.auth_form.value.pwd,sessionStorage.getItem("hwo_change"))
    if(sessionStorage.getItem("hwo_change")=="societe_user"){
      if(sessionStorage.getItem("PWD")==this.auth_form.value.pwd){
        console.log(sessionStorage.getItem("ID"),sessionStorage.getItem("USERNAME"),this.auth_form.value.pwd1)
        this.regidesoService.change_pwd({"ID":sessionStorage.getItem("ID"),"USERNAME":sessionStorage.getItem("USERNAME"),"PWD":this.auth_form.value.pwd1}).subscribe
        (res3=>{
            console.log(res3)
            this.approot.progressBar=false;
            this.cookieService.set("PWD",this.auth_form.value.pwd1)
            alert("CHANGEMENT AVEC SUCCES")
            this.router.navigate(['login']);
            
            return
  
        },
        error=>{
          this.message="ECHEC ! OTP N'EST PAS ENVOYE"
          console.log(error)
          this.approot.progressBar=false;
        })

      }else{
        this.approot.progressBar=false;
        this.noConnected=false
        this.message="VERIDIER BIEN L'ANCIEN MOT DE PASSE";
      } 

    }else

    this.auth_service.onAuth1({username:this.username,pwd:this.auth_form.value.pwd,APP_ID:this.connexion.APP_ID}).subscribe
    (res=>{
      console.log(res)
      this.probleme=false
      this.approot.progressBar=false;
      sessionStorage.setItem("usersession", JSON.stringify(res));
      sessionStorage.setItem('debut_session',""+new Date().getTime())
 
      if(res.response=="non"){
        this.noConnected=false;  
        this. auth_service.isAuth=false  
        if(res.message== "bloqué"){
         this.message="CETTE IDENTIFICATION A ETE BLOQUEE";
        }else  this.message="ECHEC ! VERIFIER BIEN VOTRE ANCIEN MOT DE PASSE"
      }else{

        console.log(this.auth_form.value.pwd1);

    this.auth_service.change_pwd({username:this.username,pwd:this.auth_form.value.pwd1}).subscribe
    (res1=>{
     
      if(res1.response=="non"){
        this.noConnected=false;  
        this. auth_service.isAuth=false  
        this.message="PROBLEME SERVEUR"
      }else{


                if(res.data.FOTO){
              var foto=this.connexion.base_url+((res.data.FOTO).replace("uploads/",""))
                }else var foto=''
              sessionStorage.setItem("foto",foto);
              sessionStorage.setItem("tokenKey",res.tokenKey);
              
                    // this.info_service.flux_dem_cong().subscribe
                    // (res=>{
                
                    //   if(res.response=="non"){
                    //     alert('Problème de connexion au serveur')  
                    //   }else{
                        
                    //     // console.log(res.array_node)
                    //     // console.log(res.array_link)
                    //     sessionStorage.setItem("flux",JSON.stringify(res.data.state));
                    //     sessionStorage.setItem("array_node",JSON.stringify(res.array_node));
                    //     sessionStorage.setItem("array_link",JSON.stringify(res.array_link));
                        
                    //     var url=sessionStorage.getItem('url_new');
                    //     console.log(url)
                    //     if(url){
                    //       window.location.replace(url)
                    //       sessionStorage.removeItem('url_new');
                    //     }else{
                    //       this.router.navigate(['accueil']);
                    //     }
                        
                    //     // this.router.navigate(['accueil']);
                    //     this. auth_service.isAuth=true
                    
                    //   }
                      
                    // },
                    // error=>{
                    //   console.log(error)
                
                    // })
      
                    this.info_service.service_ou_hierarchie().subscribe
                    (res=>{
                
                      if(res.response=="non"){
                        alert('Problème de connexion au serveur')  
                      }else{
                        
                        console.log(res.data.state)
                        // console.log(res.array_link)
                        sessionStorage.setItem("service_ou_hierarchie",JSON.stringify(res.data.state));
                        // sessionStorage.setItem("array_node",JSON.stringify(res.array_node));
                        // sessionStorage.setItem("array_link",JSON.stringify(res.array_link));
                        
                        var url=sessionStorage.getItem('url_new');
                        console.log(url)
                        if(url){
                          window.location.replace(url)
                          sessionStorage.removeItem('url_new');
                        }else{
                          alert("Changement avec succès, veuillez vous reconnecter avec le nouveau mot de passe")
                          this.cookieService.set("PWD",this.auth_form.value.pwd1)
                          this.router.navigate(['login']);
                        }
                        
                        // this.router.navigate(['accueil']);
                        this. auth_service.isAuth=true
                    
                      }
                      
                    },
                    error=>{
                      console.log(error)
                
                    })
            

            }
        },
        error=>{
          console.log(error)
          this.probleme=true
          this.approot.progressBar=false;
        })
               
      }
      
    },
    error=>{
      console.log(error)
      this.probleme=true
      this.approot.progressBar=false;
    })
    
  }else{
    this.noConnected=false
    this.message="L'ANCIEN MOT DE PASSE DOIT ETRE DIFFERENT DU NOUVEAU"
  }
   
  }
  eyes(){
    alert()
  }

  focus(){
  
    document.getElementById("pwd").focus();
   }
}
