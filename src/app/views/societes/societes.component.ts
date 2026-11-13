import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DefaultLayoutComponent } from '../../containers';
import { ConnexionService } from '../../services/connexion.service';
import { DialogService } from '../../services/dialog.service';
import { InfoService } from '../../services/info.service';
import { RegidesoService } from '../../services/regideso.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';

@Component({
  selector: 'app-societes',
  templateUrl: './societes.component.html',
  styleUrls: ['./societes.component.scss'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {displayDefaultIndicatorType: false}
  }]
  
})
export class SocietesComponent implements OnInit {
  
  @ViewChild('largeModal') public largeModal: ModalDirective;
  
  user_form=new FormGroup({
    branche:new FormControl('',Validators.required),
    compte:new FormControl('',Validators.required),
    filter_branche:new FormControl(''),
  })
  user_form3=new FormGroup({
    type_validation:new FormControl(''),
    nombre:new FormControl('',Validators.required),
    
  });
  is_nombre=false
  user_form1=new FormGroup({
    name:new FormControl('',Validators.required),
    lastname:new FormControl('',Validators.required),
    username:new FormControl('',Validators.required),
    tel:new FormControl('', [
      Validators.required,
      Validators.pattern("^[0-9]*$"),
      Validators.minLength(8),
    ]),
    // email:new FormControl('',Validators.required),
    email: new FormControl('',[
      Validators.required,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      
      niveau:new FormControl('', [
        Validators.required,
        Validators.pattern("^[0-9]*$"),
      ]),
    })
    
    
    usersession=JSON.parse(sessionStorage.getItem('usersession'))
    //  console.log(usersession)
    permission_url=this.usersession?(this.usersession.hasOwnProperty("data")?this.usersession.data.paths:{}):{}
    ID=this.usersession?(this.usersession.hasOwnProperty('data')?this.usersession.data.ID:0):0
    
    is_update=false
    user_form2=new FormGroup({
      id:new FormControl('',Validators.required),
      name:new FormControl('',Validators.required),
      lastname:new FormControl('',Validators.required),
      username:new FormControl('',Validators.required),
      tel:new FormControl('', [
        Validators.required,
        Validators.pattern("^[0-9]*$"),
        Validators.minLength(8),
      ]),
      // email:new FormControl('',Validators.required),
      email: new FormControl('',[
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
        
        niveau:new FormControl('', [
          Validators.required,
          Validators.pattern("^[0-9]*$"),
        ]),
      })
      branche_filtre: any[]
      branche: any[]
      tableau_societe: any[]
      societ_is_found=false
      json_societe: any;
      accounts: any[];
      account_is_found: boolean;
      SOCIETE_ID: any;
      users: any;
      TYPE_VALIDATION: any;
      agence: any;
      usersChecked: any;
      usersNotChecked: any;
      
      constructor(
        private approot:DefaultLayoutComponent,
        private info_service:InfoService,
        private regidesoService:RegidesoService,
        private regideso_service:RegidesoService,
        private http: HttpClient, 
        private router: Router,
        private approot1:DefaultLayoutComponent, 
        private connexion:ConnexionService,
        private activatedRoute: ActivatedRoute,
        public dialog: MatDialog,
        private dialogService: DialogService
      ) { 
        this.approot.progressBar=true;
      }
      
      ngOnInit(): void {
        
        this.regideso_service.getBranche().subscribe
        (res=>{
          
          if(res.response=="non"){
            console.log("PROBLEME DE SERVEUR")
          }else{
            //  console.log(res)
            
            this.branche_filtre=res.result
            this.branche=res.result
            this.approot.progressBar=false;
          }
          
        },
        error=>{
          console.log(error)
        })
      }
      
      onKey_branche(value) { 
        
        // console.log(this.ou_filtre)
        this.branche_filtre= []; 
        this.selectSearch_branche(value);       
      }
      
      selectSearch_branche(value:string){
        let filter = value.toLowerCase();
        for ( let i = 0 ; i < this.branche.length; i ++ ) {
          let option = this.branche[i];
          if (  option.AGE.toLowerCase().indexOf(filter) >= 0||option.LIB.toLowerCase().indexOf(filter) >= 0) {
            this.branche_filtre.push( option );
          }
        }
      }
      
      refresh_branche(){
        this.branche_filtre= this.branche
      }
      
      
      research(){
        
        this.user_form1.get("name").setValue("");
        this.user_form1.get("lastname").setValue("");
        this.user_form1.get("username").setValue("");
        this.user_form1.get("tel").setValue("");
        this.user_form1.get("email").setValue("");
        this.user_form1.get("niveau").setValue("");
        
        this.user_form2.get("id").setValue("");
        this.user_form2.get("name").setValue("");
        this.user_form2.get("lastname").setValue("");
        this.user_form2.get("username").setValue("");
        this.user_form2.get("tel").setValue("");
        this.user_form2.get("email").setValue("");
        this.user_form2.get("niveau").setValue("");
        
        this.societ_is_found=false
        var json={
          "branchCode":this.user_form.value.branche,
          "currency":"BIF",
          "accessType":"Bank Account",
          "requestId":"16",
          "accountNbr":this.user_form.value.compte
        }
        
        console.log(json)
        
        if(this.user_form.controls.branche.status=='VALID'&&
          this.user_form.controls.compte.status=='VALID'){
            
            this.approot.progressBar=true;
            this.regidesoService.lookup(json).subscribe
            (res=>{
              
              
              // console.log(JSON.stringify(res.status))
              if(res.hasOwnProperty("status")&&res.status=="Active"){
                if(res.hasOwnProperty("custType")&&res.custType=="Corporate"){
                  
                  this.tableau_societe=[]
                  this.json_societe={}
                  
                  this.json_societe["FIRSTNAME"]=""
                  this.json_societe["DATEOFBIRTH"]=""
                  this.json_societe["ADDRESS"]=""
                  this.json_societe["CITY"]=""
                  this.json_societe["IDNUMBER"]=""
                  this.json_societe["IDTYPE"]=""
                  this.json_societe["LANGUAGE"]=""
                  this.json_societe["GENDER"]=""
                  this.json_societe["MSISDN"]=""
                  this.json_societe["NATIONALITY"]=""
                  
                  this.agence = this.branche.find(({ AGE }) => AGE === this.user_form.value.branche);
                  console.log(this.agence)
                  this.tableau_societe.push({KEY:"AGENCE",VALUE:this.agence.LIB})
                  
                  Object.keys(res).forEach(key => {
                    // console.log(key + ' - ' + res[key]) // key - value
                    var key1=""+key.toUpperCase()
                    
                    this.tableau_societe.push({KEY:key1,VALUE:res[key]})
                    this.json_societe[key1]=res[key]
                  })
                  
                  
                  
                  var json_societe={
                    "LASTNAME": res.lastName,
                    "CUSTOMERNAME": res.customerName,
                    "CUSTTYPE": res.custType,
                    "CITY": "",
                    "CURRENCY": res.currency,
                    "STATUS": res.status
                  }
                  
                  console.log(json_societe)
                  this.regidesoService.check_societe(json_societe).subscribe
                  (res1=>{
                    console.log(res1)
                    if(!res1.success){
                      this.largeModal.show()
                      
                    }else{
                      this.user_form3.get("type_validation").setValue("");
                      this.user_form3.get("nombre").setValue("");
                      
                      this.societ_is_found=true
                      this.getSocieteAccounts(res1.SOCIETE_ID)
                      this.getSocieteUsers(res1.SOCIETE_ID)
                      // console.log(res1,res1.TYPE_VALIDATION,res1.NOMBRE_VALIDATION)
                      if(parseInt(res1.TYPE_VALIDATION)==1)this.is_nombre=true
                      else this.is_nombre=false
                      this.TYPE_VALIDATION=res1.TYPE_VALIDATION
                      this.user_form3.get("type_validation").setValue(parseInt(res1.TYPE_VALIDATION));
                      this.user_form3.get("nombre").setValue(res1.NOMBRE_VALIDATION);
                      this.SOCIETE_ID=res1.SOCIETE_ID
                    }
                    
                    
                    this.approot.progressBar=false;
                  },
                  error=>{
                    
                    console.log(error)
                    this.approot.progressBar=false;
                  })
                  
                  
                }else {
                  this.approot.progressBar=false;
                  alert("Ce service est reserve aux personnes morales, ce compte n'est type corporate");  
                }     
              }else {
                this.approot.progressBar=false;
                alert("Aucune entité active trouve avec cette branche et ce numero de compte");  
              }     
              
              
              
            },
            error=>{
              alert("ECHEC DE REPONSE SU SERVEUR, VEUILLEZ REESSAYER");   
              console.log(error)
              this.approot.progressBar=false;
            })
            
            
            
          }
          
          
          
        }
        enregistrer_societe(){
          this.approot.progressBar=true;
          
          var json_societe1={
            "COMPTE": this.user_form.value.compte,
            "BRANCH_CODE":this.user_form.value.branche,
            "FIRSTNAME": this.json_societe.FIRSTNAME,
            "LASTNAME": this.json_societe.LASTNAME,
            "CUSTOMERNAME": this.json_societe.CUSTOMERNAME,
            "CUSTTYPE": this.json_societe.CUSTTYPE,
            "DATEOFBIRTH": this.json_societe.DATEOFBIRTH,
            "ADDRESS": this.json_societe.ADDRESS,
            "CITY": this.json_societe.CITY,
            "IDNUMBER": this.json_societe.IDNUMBER,
            "IDTYPE": this.json_societe.IDTYPE,
            "LANGUAGE": this.json_societe.LANGUAGE,
            "GENDER": this.json_societe.GENDER,
            "MSISDN": this.json_societe.MSISDN,
            "NATIONALITY": this.json_societe.NATIONALITY,
            "CURRENCY": this.json_societe.CURRENCY,
            "STATUS": this.json_societe.STATUS
          }
          
          // console.log(json_societe)
          this.regidesoService.creer_societe(json_societe1).subscribe
          (res1=>{
            console.log(res1)
            if(!res1.success){
              // this.largeModal.show()
              alert("ECHEC!ENREGISTREMENT ECHOUE.")
              this.societ_is_found=false
              
            }else{
              this.societ_is_found=true
              this.getSocieteAccounts(res1.SOCIETE_ID)
              this.SOCIETE_ID=res1.SOCIETE_ID
            }
            
            
            this.approot.progressBar=false;
          },
          error=>{
            
            console.log(error)
            this.approot.progressBar=false;
          })
          
        }
        
        getSocieteAccounts(id){
          this.accounts=[]
          this.regidesoService.getSocieteAccounts(id).subscribe
          (res1=>{
            console.log(res1)
            this.accounts=res1
            
            
            
            const result = res1.find(({ COMPTE }) => COMPTE === this.user_form.value.compte);
            if(result){
              this.account_is_found=true
            }else{
              this.account_is_found=false
            }
            
            this.approot.progressBar=false;
          },
          error=>{
            
            console.log(error)
            this.approot.progressBar=false;
          })
        }
        
        getSocieteUsers(id){
          this.users=[]
          this.regidesoService.getSocieteUsers(id).subscribe
          (res1=>{
            console.log(res1)
            this.users=res1
            this.usersChecked=res1.filter(({ CHECKED }) => CHECKED ===1);
            this.usersNotChecked=res1.filter(({ CHECKED }) => CHECKED === 0);
            
            console.log(this.usersChecked,this.usersNotChecked)
            this.approot.progressBar=false;
            
          },
          error=>{
            
            console.log(error)
            this.approot.progressBar=false;
          })
        }
        
        
        
        enregistrer_compte(){
          this.approot.progressBar=true;
          var json_compte={
            "SOCIETE_ID":this.SOCIETE_ID,
            "COMPTE":this.user_form.value.compte,
            "BRANCH_CODE":this.user_form.value.branche,
          }
          
          this.regidesoService.creer_COMPTE(json_compte).subscribe
          (res1=>{
            console.log(res1)
            
            alert("Enregistrement avec success")
            this.research();
            
            this.approot.progressBar=false;
          },
          error=>{
            
            console.log(error)
            this.approot.progressBar=false;
          })
          
        }
        
        saveUser(){
          if(
            this.user_form1.controls.name.status=='VALID'&&
            this.user_form1.controls.lastname.status=='VALID'&&
            this.user_form1.controls.username.status=='VALID'&&
            this.user_form1.controls.tel.status=='VALID'&&
            this.user_form1.controls.niveau.status=='VALID'&&
            this.user_form1.controls.email.status=='VALID'
          ){
            
            if(this.TYPE_VALIDATION>=0){
              
              
              this.approot.progressBar=true;
              var password=Math.floor(100000 + Math.random() * 900000)
              
              console.log(this.usersession.data.ID,this.ID)
              var json_user={
                "NAME": this.user_form1.value.name,
                "LASTNAME": this.user_form1.value.lastname,
                "USERNAME": this.user_form1.value.username,
                "TEL": this.user_form1.value.tel,
                "EMAIL": this.user_form1.value.email,
                "NIVEAU": this.user_form1.value.niveau,
                "PWD": password,
                "SOCIETE_ID":this.SOCIETE_ID,
                "CREATED_BY":this.ID
              }
              // if(this.TYPE_VALIDATION==1) json_user.NIVEAU=0;
              //   else if(!(this.user_form1.controls.niveau.status=='VALID')){
              // return
              // }
              
              // console.log(json_user)
              this.regidesoService.creer_USER(json_user).subscribe
              (res1=>{
                console.log(res1)
                
                if(res1.success){
                  
                  
                  // this.user_form1.get("id").setValue("");
                  
                  this.save_type_validation(1)
                  
                  
                  var json_email={
                    "from":"notification-regideso-web-portal-service@bancobu.com",
                    "to":this.user_form1.value.email,
                    "cc":"",
                    "subject":"CREATION UTILISATEUR",
                    "attachments":"",
                    "msg":" Vous etes créé comme utilisateur du service BANCOBU Regideso Web  Portal<br> avec comme nom d'utilisateur:<b>"+this.user_form1.value.username+"</b> et mot de passe <b>"+password+"</b> qu'il faudra changer. Veuillez accèder à la page <a href='"+this.connexion.portal_public+"'>"+this.connexion.portal_public+"</a> pour plus de detail",
                  }
                  
                  this.regidesoService.sendMail(json_email).subscribe
                  (res2=>{
                    console.log(res2)
                    this.research();
                    setTimeout(() => {
                      document.getElementById("fin").scrollIntoView(true);
                    }, 2000);
                    alert("Enregistrement avec success")
                    this.approot.progressBar=false;
                    this.user_form1.get("name").setValue("");
                    this.user_form1.get("lastname").setValue("");
                    this.user_form1.get("username").setValue("");
                    this.user_form1.get("tel").setValue("");
                    this.user_form1.get("email").setValue("");
                    this.user_form1.get("niveau").setValue("");
                  },
                  error=>{
                    this.research();
                    alert("Enregistrement avec success")
                    
                    console.log(error)
                    this.approot.progressBar=false;
                  })
                  
                  
                  
                  
                }else{
                  alert(res1.error)
                  this.approot.progressBar=false;
                }
                
                // this.approot.progressBar=false;
              },
              error=>{
                
                console.log(error)
                this.approot.progressBar=false;
              })
              
              
            }else{
              alert("ECHECK!VEUILLEZ D'ABORD ENREGISTRER LE TYPE DE VALIDATION")
            }
            
            
          }
          
        }
        
        
        initialiser(id,username,email){
          if (confirm("Voulez-vous intitialiser le mot de passe de "+username)) {
            
            this.approot.progressBar=true;
            
            var password=Math.floor(100000 + Math.random() * 900000)
            console.log(password)
            var json={
              "ID":id,
              "USERNAME":username,
              "PWD":password
            }
            
            this.regidesoService.initiate_user(json).subscribe
            (res1=>{
              
              
              var json_email={
                "from":"notification-regideso-web-portal-service@bancobu.com",
                "to":email,
                "cc":"",
                "subject":"INITIALISATION UTILISATEUR",
                "attachments":"",
                "msg":" Votre identification a été réinitialisé au service BANCOBU Regideso Web  Portal<br> sous le nom d'utilisateur:<b>"+username+"</b> et mot de passe <b>"+password+"</b> qu'il faudra changer. Veuillez accèder à la page <a href='"+this.connexion.portal_public+"'>"+this.connexion.portal_public+"</a> pour plus de detail",
              }
              
              this.regidesoService.sendMail(json_email).subscribe
              (res2=>{
                console.log(res2)
                
                alert("INITIALISATION AVEC SUCCES")
                this.research();
                setTimeout(() => {
                  document.getElementById("fin").scrollIntoView(true);
                }, 2000);
                
              },
              error=>{
                this.research();
                
                console.log(error)
                this.approot.progressBar=false;
              })
            },
            error=>{
              
              
              console.log(error)
              this.approot.progressBar=false;
            })
            
          }else{
            
          }
        }
        
        change(){
          this.is_update=false
          console.log("change expand")
        }
        
        close(){
          this.is_update=false 
        }
        
        update(x){
          this.is_update=true
          console.log(x)
          this.user_form2.get("id").setValue(x.ID);
          this.user_form2.get("name").setValue(x.NAME);
          this.user_form2.get("lastname").setValue(x.LASTNAME);
          this.user_form2.get("username").setValue(x.USERNAME);
          this.user_form2.get("tel").setValue(x.TEL);
          this.user_form2.get("email").setValue(x.EMAIL);
          this.user_form2.get("niveau").setValue(x.NIVEAU);
        }
        
        
        updateUser(){
          if(
            this.user_form2.controls.name.status=='VALID'&&
            this.user_form2.controls.lastname.status=='VALID'&&
            this.user_form2.controls.username.status=='VALID'&&
            this.user_form2.controls.tel.status=='VALID'&&
            this.user_form2.controls.niveau.status=='VALID'&&
            this.user_form2.controls.email.status=='VALID'
          ){
            this.approot.progressBar=true;
            
            var json_user={
              "ID": this.user_form2.value.id,
              "NAME": this.user_form2.value.name,
              "LASTNAME": this.user_form2.value.lastname,
              "USERNAME": this.user_form2.value.username,
              "TEL": this.user_form2.value.tel,
              "EMAIL": this.user_form2.value.email,
              "NIVEAU": this.user_form2.value.niveau
            }
            
            this.regidesoService.update_USER(json_user).subscribe
            (res1=>{
              console.log(res1)
              
              if(res1.success){
                
                alert("MODIFICATION AVEC SUCCESS")
                this.is_update=false 
                
                this.user_form2.get("id").setValue("");
                this.user_form2.get("name").setValue("");
                this.user_form2.get("lastname").setValue("");
                this.user_form2.get("username").setValue("");
                this.user_form2.get("tel").setValue("");
                this.user_form2.get("email").setValue("");
                this.user_form2.get("niveau").setValue("");
                
                
                this.research();
                setTimeout(() => {
                  document.getElementById("fin").scrollIntoView(true);
                }, 2000);
                
              }else{
                alert(res1.error)
              }
              
              this.approot.progressBar=false;
            },
            error=>{
              
              console.log(error)
              this.approot.progressBar=false;
            })
            
            
          }
          
        }
        
        desactive(x){
          var msg=x.ACTIF==1?"désactiver":"réactiver"
          var msg1=x.ACTIF==1?"désactivée":"réactivée"
          if (confirm("Voulez-vous vraiment "+msg+" l'identification de "+x.USERNAME)) {
            
            this.approot.progressBar=true;
            
            var json={
              "ID":x.ID,
              "STATUT":x.ACTIF==1?0:1,
            }
            
            this.regidesoService.desactiver_user(json).subscribe
            (res1=>{
              
              
              var json_email={
                "from":"notification-regideso-web-portal-service@bancobu.com",
                "to":x.EMAIL,
                "cc":"",
                "subject":"REACTIVATION/DESACTIVATION UTILISATEUR",
                "attachments":"",
                "msg":" Votre identification a été "+msg1+" au service BANCOBU Regideso Web  Portal. Veuillez accèder à la page <a href='"+this.connexion.portal_public+"'>"+this.connexion.portal_public+"</a> pour plus de detail",
              }
              
              this.regidesoService.sendMail(json_email).subscribe
              (res2=>{
                console.log(res2)
                
                alert("ENREGISTREMENT AVEC SUCCES")
                this.research();
                this.approot.progressBar=false;
                
                setTimeout(() => {
                  document.getElementById("fin").scrollIntoView(true);
                }, 2000);
                
                // window.location.replace("#users");
                
              },
              error=>{
                this.research();
                
                console.log(error)
                this.approot.progressBar=false;
              })
            },
            error=>{
              
              
              console.log(error)
              this.approot.progressBar=false;
            })
            
          }
        }
        
        verifier(id,username){
          if (confirm("Voulez-vous valider l'utilisateur "+username)) {
            this.approot.progressBar=true;
            this.regidesoService.verifier_user(id).subscribe
            (res=>{
              this.approot.progressBar=false;
              this.research();
              alert("Validation faite avec succès")
            },
            error=>{
              console.log(error)
              this.approot.progressBar=false;
            })
          }
          
        }
        
        checNiveau(niveau){
          var niv=""
          if(niveau==1)var niv="INITIATION"
          if(niveau==2)var niv="VALIDATION"
          if(niveau==3)var niv="INITIATION ET VALIDATION"
          
          return niv
          
        }
        
        select_type_validation(objet){
          if(objet.value==1)this.is_nombre=true
          else this.is_nombre=false
        }
        
        
        save_type_validation(alerter=0){
          if(
            this.user_form3.controls.nombre.status=='VALID'
          ){ 
            // console.log(this.user_form3.value.type_validation==1,this.user_form3.value.nombre)
            if(this.user_form3.value.type_validation==1&&this.user_form3.value.nombre=='null') {
              alert("VEUILLEZ MENTIONNER LE NOMBRE DES VALIDATIONS")
              return
            }else{
              var json_type_validation={
                "SOCIETE_ID":this.SOCIETE_ID,
                // "TYPE_VALIDATION": this.user_form3.value.type_validation,
                "TYPE_VALIDATION": 1,
                "NOMBRE_VALIDATION": this.user_form3.value.nombre=='null'?"":this.user_form3.value.nombre,
              }
              this.approot.progressBar=true;
              this.regidesoService.creer_type_validation(json_type_validation).subscribe
              (res1=>{
                this.TYPE_VALIDATION=this.user_form3.value.type_validation
                if(alerter==0)
                  alert("ENREGISTREMENT AVEC SUCCEES DE TYPE DE VALIDATION")
                this.approot.progressBar=false;
              },
              error=>{
                
                console.log(error)
                this.approot.progressBar=false;
              })
              
            }
            
            
            
            
            
            
            
          }
        }
        
        
        set_username(){
          // alert()
          var name=this.user_form1.value.name
          var lastname=this.user_form1.value.lastname
          
          
          this.user_form1.get("username").setValue((lastname.charAt(0)+name).toLowerCase());
          
        }
        
        
      }
      