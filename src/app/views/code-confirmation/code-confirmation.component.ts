import { Component, OnInit,NgZone } from '@angular/core';
// import firebase from 'firebase/compat/app';
// import 'firebase/auth';
// import 'firebase/firestore';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { InfoService } from '../../services/info.service';
import { AuthentificationService } from '../../services/authentification.service';
import { RegidesoService } from '../../services/regideso.service';
import { AppComponent } from '../../app.component';
import { ConnexionService } from '../../services/connexion.service';
import { CookieService } from 'ngx-cookie-service';

// var config={
//   apiKey: "AIzaSyCWTWQI8IhP_U6Qe5TIkuISUUjhfAQAfVY",
//     authDomain: "reflecting-surf-356716.firebaseapp.com",
//     projectId: "reflecting-surf-356716",
//     storageBucket: "reflecting-surf-356716.appspot.com",
//     messagingSenderId: "58474429787",
//     appId: "1:58474429787:web:bd28320a043b37ad006e7e"
// }
@Component({
  selector: 'app-code-confirmation',
  templateUrl: './code-confirmation.component.html',
  styleUrls: ['./code-confirmation.component.scss']
})
export class CodeConfirmationComponent implements OnInit {


  otp!: string;
  verify: any;
  configuration = {
    allowNumbersOnly: true,
    length: 6,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: '',
    inputStyles: {
      width: '50px',
      height: '50px',
    },
  };

  imageSrc="assets/logo.png"
  showPasswordOnPress: boolean=false;
  message="";
  probleme=false

  is_threre_users=true
  noConnected:boolean=true

  user_form=new FormGroup({
    otp:new FormControl('',Validators.required)
    
  })
  usersession=JSON.parse(sessionStorage.getItem('usersession'))

  // constructor(private router: Router, private ngZone: NgZone) {}
  constructor(private info_service:InfoService,
    private auth_service:AuthentificationService,
    private regidesoService:RegidesoService,
    private approot:AppComponent, 
    private router: Router, 
    private connexion:ConnexionService,
    public cookieService:CookieService,
    private ngZone: NgZone
  
    ) { }

  ngOnInit() {
    this.cookieService.delete("AUTO_AUTHENTICATION_REGIDESO")
    
    var is_societe_user =sessionStorage.getItem("societe_user")
    console.log(is_societe_user!="true")
    
    if(is_societe_user!="true")this.seDecoonecter()

    this.verify = JSON.parse(localStorage.getItem('verificationId') || '{}');
    console.log(this.verify);
  }

  onOtpChange(otp: string) {
    this.otp = otp;
  }

   handleClick() {
    if(this.otp){
      this.approot.progressBar=true;

      console.log(this.otp,sessionStorage.getItem("ID"))
      this.regidesoService.check_otp({"USER_ID":parseInt(sessionStorage.getItem("ID")),"OTP":this.otp}).subscribe
    (res=>{
      this.approot.progressBar=false;
      
      
      if(!res.success){
        
        this.noConnected=false; 
        this.message=res.error;
      }else{
        this. auth_service.isAuth=true 
        sessionStorage.setItem('usersession', JSON.stringify({response:'ok'}));
        console.log("CODE")
        this.router.navigate(['accueil']);
        
      }

      this.approot.progressBar=false;
      
    },
    error=>{
      console.log(error)
      this.probleme=true
      this.approot.progressBar=false;
    })

    }else{
      alert("Veuillez saisir le Code!")
      this.approot.progressBar=false;
    }
   }


  // handleClick() {
  //   console.log(this.otp);
  //   var credential = firebase.auth.PhoneAuthProvider.credential(
  //     this.verify,
  //     this.otp
  //   );

  //   console.log(credential);
  //   firebase
  //     .auth()
  //     .signInWithCredential(credential)
  //     .then((response) => {
  //       console.log(response);
  //       localStorage.setItem('user_data', JSON.stringify(response));
  //       this.ngZone.run(() => {
  //         this.router.navigate(['/exploitant']);
  //       });
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       alert(error.message);
  //     });
  // }



  seDecoonecter(){
    console.log(this.usersession)
        sessionStorage.setItem('debut_session',""+new Date().getTime())
        
        this.auth_service.isAuth=false
        sessionStorage.removeItem('usersession');
        sessionStorage.removeItem("ID");
        sessionStorage.removeItem("NAME");
        sessionStorage.removeItem("LASTNAME");
        sessionStorage.removeItem("USERNAME");
        sessionStorage.removeItem("TEL");
        sessionStorage.removeItem("NIVEAU");
        sessionStorage.removeItem("SOCIETE_ID");
        sessionStorage.removeItem("EMAIL");
        sessionStorage.removeItem("PWD");
        this.cookieService.delete("USERNAME")
        this.cookieService.delete("PWD")
    
        this.cookieService.deleteAll()
        // this.router.navigate(['/login']);
        window.location.replace(this.connexion.portal);
    
    
  }

  renvoyer(){
    this.cookieService.set("AUTO_AUTHENTICATION_REGIDESO","true");
    this.router.navigate(['login']);
  }
}
