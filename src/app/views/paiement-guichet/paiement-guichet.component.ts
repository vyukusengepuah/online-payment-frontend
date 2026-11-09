import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DefaultLayoutComponent } from '../../containers';
import { InfoService } from '../../services/info.service';
import { RegidesoService } from '../../services/regideso.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { ConnexionService } from '../../services/connexion.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogService } from '../../services/dialog.service';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-paiement-guichet',
  templateUrl: './paiement-guichet.component.html',
  styleUrls: ['./paiement-guichet.component.scss']
})
export class PaiementGuichetComponent implements OnInit {

  usersession=JSON.parse(sessionStorage.getItem('usersession'))
  permission_url=this.usersession?(this.usersession.hasOwnProperty("data")?this.usersession.data.paths:{}):{}
  ID=this.usersession?(this.usersession.hasOwnProperty('data')?this.usersession.data.ID:0):0


  user_form=new FormGroup({
    compteur:new FormControl('',Validators.required),
    // facture:new FormControl('',Validators.required),
    type:new FormControl('',Validators.required),
    Montant:new FormControl('',Validators.required),
    KWH:new FormControl('',Validators.required),
    
   })
   is_confirmation=false

   user_form1=new FormGroup({
    compte_paiement:new FormControl('',Validators.required),
    facture:new FormControl('',Validators.required),
    
   })
   owner
   factures=[]
   facture_trouve=false
   is_montant=false
   is_kwh=false
  
  message: string;
  tableau_facture=[];
  comptes_paiement: any;
  compteur_research: any;
  json_societe: any;
  compteur: any;
  type: any;
  json_compteur: any;
  json_compteurAll: any;
  proprietaire: any;
  is_cashpower=false
  

  
  user_forms=new FormGroup({
    compte:new FormControl('',Validators.required),
    facture:new FormControl('',Validators.required),
    compte_paiement:new FormControl('',Validators.required),
    branche:new FormControl('',Validators.required),
    filter_branche:new FormControl('',Validators.required),
   })
 
   branche_filtre: any[]
   branche: any[]
   agence

  //  user_forms1=new FormGroup({
  //   compte_paiement:new FormControl('',Validators.required),
  //   facture:new FormControl('',Validators.required),
    
  //  })
   
  users: any;
  societ_is_found=false;
  tableau_societe=[]
  accounts=[]
  account_is_found=false
  SOCIETE_ID: any;
  TYPE_VALIDATION: any;
  COMPTE_ID: any;

   constructor(
    private approot:AppComponent,
    private info_service:InfoService,
    private regidesoService:RegidesoService,
    private http: HttpClient, 
    private router: Router,
    private approot1:AppComponent, 
    private connexion:ConnexionService,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog,
    private dialogService: DialogService
  ) { 
    
  }

  ngOnInit(): void {
    const NIVEAU= sessionStorage.getItem('NIVEAU')  
    if (NIVEAU) {
                
      this.router.navigate(["/accueil"]);
      alert("VOUS N'AVEZ PAS DROIT A CETTE INTERFACE, VEUILLEZ CONTACTER L'ADMINISTRATEUR DU SYSTEME BANCOBU")
      
    }
     this.approot.progressBar=true;
     var id_so=parseInt(sessionStorage.getItem("SOCIETE_ID"))>0?parseInt(sessionStorage.getItem("SOCIETE_ID")):'100000000'
            this.regidesoService.entites(id_so).subscribe
            (res=>{
              this.approot.progressBar=false;
              console.log(id_so)
              console.log(res)
              this.json_societe=res.entites[0]
            },
              error=>{
                console.log(error)
                this.approot.progressBar=false;
              })

              this.regidesoService.compteur_societe_new(id_so).subscribe
            (res=>{
              this.approot.progressBar=false;
              console.log(res)
              this.json_compteurAll=res.resultAll
              this.json_compteur=res.result
            },
              error=>{
                console.log(error)
                this.approot.progressBar=false;
              })

              this.regidesoService.getBranche().subscribe
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
    var new_check=this.json_societe?this.json_societe.TYPE_VALIDATION=='1':false
    // if(sessionStorage.getItem("NIVEAU")=="1"||sessionStorage.getItem("NIVEAU")=="3"||new_check){
      // if(sessionStorage.getItem("NIVEAU")=="1"||sessionStorage.getItem("NIVEAU")=="3"){
      this.compteur_research=null
      this.facture_trouve=false
      this.is_confirmation=false
      if(
        this.user_form.controls.compteur.status=='VALID'&&
        this.user_form.controls.type.status=='VALID'
      ){
        this.user_forms.get("compte_paiement").setValue("");
        this.user_forms.get("branche").setValue("");
        this.user_forms.get("facture").setValue("");

        this.societ_is_found=false

        if(this.user_form.value.type=='2')
          {
            if(this.connexion.CASHOWER=="ON"){
              this.research_cashpower()
            }else{
              this.dialogService.messageDialog({
                title: 'Message',
                message: "Le service Cashpower n'est pas disponible Pour le moment",
                cancelText: 'OK',
              }) 
            }
          }
          else this.research_bill()
      }

      
    // }else{
    //   this.dialogService.messageDialog({
    //     title: 'Message',
    //     message: "Vous n'avez pas droit d'intitiation des ajouts compteur",
    //     cancelText: 'OK',
    //   }) 
    // }
  
  }

  research_cashpower(){

      if(this.user_form.controls.Montant.status=='VALID'){
      
      this.compteur=null
      this.type=null
      this.proprietaire=null
        // if(this.user_form.value.type=='1')
        var j={"CompteurCode":this.user_form.value.compteur,"Numero_de_Caisse":this.connexion.Numero_de_Caisse,"Type":'1',"Mode":this.connexion.Mode,"Montant":this.user_form.value.Montant,"Type_de_Paiement":"WEB"}
        // else
        // var j1={"CompteurCode":this.user_form.value.compteur,"Numero_de_Caisse":this.connexion.Numero_de_Caisse,"Type":'1',"Mode":this.connexion.Mode,"Consommation":33100,"Type_de_Paiement":"WEB"}

        // var json=this.user_form.value.type=='1'?j:j1
        var json=j

            this.approot.progressBar=true;
            console.log(json)
            this.regidesoService.prepay(json).subscribe
            (res=>{

              
              this.approot.progressBar=false;
              console.log(res)
              if(res.CodeErreur=="0"){
                this.tableau_facture=[]
                this.is_confirmation=true
                this.compteur_research=res
                Object.keys(res).forEach(key => {
                  // console.log(key + ' - ' + res[key]) // key - value
                  var key1=""+key.toUpperCase()
                  var key2=key1.replace("CONSOMMATION","KWH")
                  var key3= key2.replace("MONTANTPAYE","MONTANT A PAYER")
                  var key4=key3.replace("NOMCLIENT","CLIENT")
                  var key5= key4.replace("NOMCLIENT","NOM CLIENT")
                  var key6= key5.replace("CODECLIENT","CODE CLIENT")
                  var key7= key6.replace("LASTREADINGDATE","DATE PRECEDENTE")
                  var key8= key7.replace("PRIMEFIXE","DATE PRIME FIXE")
                  var key9= key8.replace("CREDITAVANCE","CREDIT AVANCE")

                  if(
                    key1!='TOKEN1' 
                    && key1!='TOKEN2'
                    && key1!='TOKEN3'
                    && key1!='CODERECU'
                    && key1!='SITECAISSE'
                    && key1!='CODEERREUR'
                    && key1!='NEWREADINGDATE'
                    // && key1!='CONSOMMATION'
                    // && key1!='MONTANTPAYE'
                    && key1!='TVA'
                    && key1!='TAXE'
                    && key1!='SURTAXE'
                    && key1!='PRIMEFIXE'
                    && key1!='CREDITAVANCE'
                    && key1!='LASTREADINGDATE'
                    && key1!='REDEVANCE'
                    && key1!='MONTANTFNE')
                  this.tableau_facture.push({KEY:key9,VALUE:res[key]})
                    
                })
                this.compteur=this.user_form.value.compteur
                this.type=this.user_form.value.type
                this.proprietaire=res.NomClient
                
              }else{
                var array_error=[
                  "",
                  "Compteur non prepaye, Contacter Regideso",
                  "Compteur inactif, Contacter Regideso",
                  "Compteur non STS, contact Regideso",
                  "Existe impayees, contacter la Regideso",
                  "Problem Type Achat, veuillez reessayer plutard",
                  "Erreur d'emission , veuillez reessayer plutard",
                  "Valeur incorrect du montant",
                  "Quantité négative, veuillez reessayer plutard",
                  "Dépassement du maximum d'achat",
                  "La valeur du montant est null, veuillez réessayer plutard",
                  "Montant insuffisant",
                  "Caisse non valide pour l'utilisateur, contact 161",
                  "Veuillez bien verifier le type de service"
                ]
                this.is_confirmation=false
                this.dialogService.messageDialog({
                  title: 'Message',
                  message: array_error[parseInt(res.CodeErreur)],
                  cancelText: 'OK',
                }) 
              }

            },
            error=>{
              if(error.error.error=="Gateway Timeout")var message="ECHEC! LE TEMPS D'EXECUTION DU GATEWAY EST DEPASSE, VEUILLEZ REESSAYER SVP!"
                      else var message="ECHEC! PROBLEME DE SERVEUR GATWAY"
              this.dialogService.messageDialog({
                title: 'Message',
                message: message,
                cancelText: 'OK',
              }) 
              console.log(error)
              this.approot.progressBar=false;
            })

      
    }
  }

  research_bill(){
    this.compteur=null
    this.type=null
    this.proprietaire=null
    this.facture_trouve=false
    this.is_confirmation=false
    
    var json={
                  "Compte":this.user_form.value.compteur
              }

    // if(this.user_form.controls.compte.status=='VALID'){

    console.log(json)
      

          this.approot.progressBar=true;
          this.regidesoService.checkbills(json).subscribe
          (res=>{

            
            this.owner=res.DR_WS_6_FactureNonPayee.rowset.length>0?res.DR_WS_6_FactureNonPayee.rowset[res.DR_WS_6_FactureNonPayee.rowset.length-1].NomClient:""
            this.factures=res.DR_WS_6_FactureNonPayee.rowset
            this.approot.progressBar=false;
            console.log(res)
            if(res.DR_WS_6_FactureNonPayee.rowset.length>0){
              this.compteur=this.user_form.value.compteur
              this.type=this.user_form.value.type
              this.proprietaire=res.DR_WS_6_FactureNonPayee.rowset[0].NomClient
              console.log(this.json_compteurAll)
              
              
                this.facture_trouve=true
                this.Consulter()
              
                
                // this.research_regideso_facture()
             

            }else  
          this.dialogService.messageDialog({
            title: 'Message',
            message: "Compteur ou code d'installation inexistant",
            cancelText: 'OK',
          }) 

          },
          error=>{
            if(error.error.error=="Gateway Timeout")var message="Veuillez reessayer svp!"
                    else var message="ECHEC! PROBLEME DE CONNEXION"
            this.dialogService.messageDialog({
              title: 'Message',
              message: message,
              cancelText: 'OK',
            }) 
            console.log(error)
            this.approot.progressBar=false;
          })

    }
  // }

  Consulter(){
    console.log(this.factures)
    this.tableau_facture=[]
    
        // const result = this.factures.find(({ Facture_Reference }) => Facture_Reference === this.user_form.value.facture);
        

        // console.log(this.factures[this.factures.length-1])
        Object.keys(this.factures[this.factures.length-1]).forEach(key => {
          // console.log(key + ' - ' + res[key]) // key - value
          var key1=""+key.toUpperCase()
          var key2=key1.replace("COMPTE","Code d'installation")
          var key3= key2.replace("NUMEROCLIENT","Numero client")
          var key4=key3.replace("FACTURE_REFERENCE","Numero facture")
          var key5= key4.replace("NOMCLIENT","Nom client")

          // console.log(key5)
          if(
            key1!='MONTANTPAYEE' && 
            key1!='ANNEE' && 
            key1!='MOIS' && 
            key1!='FACTURE_REFERENCE' && 
            key1!='MONTANT' && 
            key1!='MONTANT_A_DEDUIRE_ESTIMATION'
          )
          this.tableau_facture.push({KEY:key5,VALUE:this.factures[this.factures.length-1][key]})
            
        })
        // this.largeModal.show()
        this.is_confirmation=true

          this.message="Cette facture n'est pas enregistrée, voulez-vous initier son paiement?"
      

  }



  research_regideso_facture(){

    // console.log(sessionStorage.getItem("NIVEAU"))
    // if(sessionStorage.getItem("NIVEAU")=="1"||sessionStorage.getItem("NIVEAU")=="3"){
      this.facture_trouve=false
      this.is_confirmation=false
      
      var json={
                    "Compte":this.user_form.value.compteur
                }

      if(this.user_form.controls.compteur.status=='VALID'){
        

            this.approot.progressBar=true;
            this.regidesoService.checkbills(json).subscribe
            (res=>{

              
              this.owner=res.DR_WS_6_FactureNonPayee.rowset.length>0?res.DR_WS_6_FactureNonPayee.rowset[res.DR_WS_6_FactureNonPayee.rowset.length-1].NomClient:""
              this.factures=res.DR_WS_6_FactureNonPayee.rowset
              this.approot.progressBar=false;
              console.log(res.DR_WS_6_FactureNonPayee.rowset.length)
              if(res.DR_WS_6_FactureNonPayee.rowset.length>0){
                this.facture_trouve=true
                this.Consulter()
              }else{
                this.facture_trouve=false
                this.dialogService.messageDialog({
                  title: 'Message',
                  message: 'ECHEC! AUCUNE FACTURE TROUVE POUR CETTE NUMERO D\'INSTALLATION',
                  cancelText: 'OK',
                }) 
              }

            },
            error=>{
              if(error.error.error=="Gateway Timeout")var message="ECHEC! LE TEMPS D'EXECUTION DU GATEWAY EST DEPASSE, VEUILLEZ REESSAYER SVP!"
                      else var message="ECHEC! PROBLEME DE SERVEUR GATWAY"
              this.dialogService.messageDialog({
                title: 'Message',
                message: message,
                cancelText: 'OK',
              }) 
              console.log(error)
              this.approot.progressBar=false;
            })

      }
    // }else{
    //   this.dialogService.messageDialog({
    //     title: 'Message',
    //     message: "ECHEC!VOUS N'AVEZ PAS DROIT D'INTITIATION DE PAIEMENT FACTURE",
    //     cancelText: 'OK',
    //   }) 
    // }
  
  }

  verifiction_compte(){
    if(((this.user_form.controls.Montant.status=='VALID'&&this.is_cashpower)||
    (this.user_forms.controls.facture.status=='VALID'&&!this.is_cashpower))
      &&this.user_forms.controls.branche.status=='VALID'
      &&this.user_forms.controls.compte_paiement.status=='VALID'){
      

        this.societ_is_found=false
        var json={
                      "branchCode":this.user_forms.value.branche,
                      "currency":"BIF",
                      "accessType":"Bank Account",
                      "requestId":"16",
                      "accountNbr":this.user_forms.value.compte_paiement
                  }
    
      
              this.approot.progressBar=true;
              this.regidesoService.lookup(json).subscribe
              (res=>{
                
    
                // console.log(JSON.stringify(res.status))
                if(res.hasOwnProperty("status")&&res.status=="Active"){
                  // if(res.hasOwnProperty("custType")&&res.custType=="Corporate"){
                    this.societ_is_found=true
    
                  this.tableau_societe=[]
                  this.json_societe={}
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
    
    
                  this.agence = this.branche.find(({ AGE }) => AGE === this.user_forms.value.branche);
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
                    "CITY": res.city,
                    "CURRENCY": res.currency,
                    "STATUS": res.status
                  }

                  this.approot.progressBar=true;
                  this.regidesoService.check_societe(json_societe).subscribe
                  (res1=>{
                      console.log(res1)
                      if(!res1.success){

                        this.enregistrer_societe();

                        // setTimeout(() => {
                        //   this.approot.progressBar=false;
                        // }, 3000);
                        
                      }else{
                    
                        this.societ_is_found=true
                        this.getSocieteAccounts(res1.SOCIETE_ID)
                        this.getSocieteUsers(res1.SOCIETE_ID)
                        // this.getSocieteUsers(res1.SOCIETE_ID)
            // console.log(res1,res1.TYPE_VALIDATION,res1.NOMBRE_VALIDATION)
                        // if(parseInt(res1.TYPE_VALIDATION)==1)this.is_nombre=true
                        // else this.is_nombre=false
                        // this.TYPE_VALIDATION=res1.TYPE_VALIDATION
                        
                        this.SOCIETE_ID=res1.SOCIETE_ID
                        this.approot.progressBar=false;
                      }
                      

                      this.approot.progressBar=false;
                  },
                  error=>{
                    
                    console.log(error)
                    this.approot.progressBar=false;
                  })


                    
                  // }else {
                  //   this.approot.progressBar=false;
                  //   alert("Ce service est reserve aux personnes morales, ce compte n'est type corporate");  
                  // }     
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
    
    
          
        
    }else{
      alert("Echec!veuillez verifier tous les champs obligatoires en rouges")
    }
  }

  getSocieteAccounts(id){
    this.accounts=[]
     this.approot.progressBar=true;
    this.regidesoService.getSocieteAccounts(id).subscribe
    (res1=>{
        console.log(res1)
        this.accounts=res1

       
        
        const result = res1.find(({ COMPTE }) => COMPTE === this.user_forms.value.compte_paiement);
        if(result){
          this.account_is_found=true
          this.COMPTE_ID=result.COMPTE_ID
           this.approot.progressBar=false;
        }else{
          this.account_is_found=false
          this.enregistrer_compte()
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
    this.approot.progressBar=true;
    this.regidesoService.getSocieteUsers(id).subscribe
    (res1=>{
        console.log(res1)
        this.users=res1
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
      "COMPTE":this.user_forms.value.compte_paiement,
      "BRANCH_CODE":this.user_forms.value.branche,
    }

    this.regidesoService.creer_COMPTE(json_compte).subscribe
    (res1=>{
        console.log(res1)

        // alert("Enregistrement avec success")
        // this.research();
        this.getSocieteAccounts(this.SOCIETE_ID)
        this.approot.progressBar=false;
    },
    error=>{
      
      console.log(error)
      this.approot.progressBar=false;
    })

  }


  enregistrer_societe(){
    this.approot.progressBar=true;
  
    var json_societe1={
                    "COMPTE": this.user_forms.value.compte_paiement,
                    "BRANCH_CODE":this.user_forms.value.branche,
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

      console.log(json_societe1)
      // return
       this.approot.progressBar=true;
      this.regidesoService.creer_societe(json_societe1).subscribe
      (res1=>{
          console.log(res1)
          if(!res1.success){
            // this.largeModal.show()
            alert("ECHEC!ENREGISTREMENT ENTITE ECHOUE.")
            this.societ_is_found=false
             this.approot.progressBar=false;
            
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


  select_type(object){
    this.user_forms.get("compte_paiement").setValue("");
    this.user_forms.get("branche").setValue("");
    this.user_forms.get("facture").setValue("");
    this.user_form.get("Montant").setValue("");
    this.societ_is_found=false
    this.compteur_research=null
    this.facture_trouve=false
    this.is_confirmation=false

    if(object.value=='2')this.is_cashpower=true
    else this.is_cashpower=false
  }

  initier_paiement(){

    if(this.user_form.value.type=='1'){
      this.enregistrer_facture()
    }else{
      this.enregistrer_cashpower()
    }

  }


  enregistrer_facture(){

      const result = this.factures.find(({ Facture_Reference }) => Facture_Reference === this.user_forms.value.facture);

      var json={
        "FACTUREREFERENCE":result.Facture_Reference,
        "NUMERO_DE_CAISSE":"57201",
        "MODEFINALFLAG":this.connexion.ModeFinalFlag,
        "MONTANT":result.Montant,
        "DEDUCTION":result.Montant_a_Deduire_estimation,
        "CLIENTNAME":result.NomClient,
        "INSTALLATIONCODE":result.Compte,
        "COMPTE_ID":this.COMPTE_ID,
        "SOCIETE_ID":this.SOCIETE_ID,
        "ANNEE":result.Annee,
        "MOIS":result.Mois,
        "NUMEROCLIENT":result.NumeroClient,
        "USER_ID":this.ID,
        "ENDROIT_CREATION":"GUICHET"
      }

      console.log(json)
      // return

      this.approot.progressBar=true;
        this.regidesoService.creer_facture(json).subscribe
        (res=>{

          console.log(res)
          
            this.facture_trouve=false
            this.dialogService.messageDialog({
              title: 'Message',
              message: res.message,
              cancelText: 'OK',
            }) 


            var users_mail=""
            this.users.forEach(element => {
              users_mail+=element.EMAIL+","
            });

            var msg1=" a initié le paiemnt de la facture eau de la REGIDESO "

            var json_email={
              "from":"notification-regideso-web-portal-service@bancobu.com",
              "to":users_mail,
              "cc":"",
              "subject":"INITIATION PAIEMENT FACTURE REGIDESO",
              "attachments":"",
              "msg":"La <b>BANCOBU</b> "+msg1+"dans le portail de BANCOBU du service REGIDESO-WEB PORTAL. Veuillez accèder à la page  <a href='"+this.connexion.portal_public+"'>"+this.connexion.portal_public+"</a> pour plus de detail ",
            }
          
                this.regidesoService.sendMail(json_email).subscribe
                (res2=>{
                    console.log(res2)
      
                    return
          
                },
                error=>{
                  console.log(error)
                
                })

                let currentUrl = this.router.url;
                this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
                    this.router.navigate([currentUrl]);
                    console.log(currentUrl);
                });

            // this.router.navigate(['/facture/paiement']);

            this.approot.progressBar=false;

        },
        error=>{
          this.dialogService.messageDialog({
            title: 'Message',
            message: 'ECHEC! PROBLEME SERVEUR',
            cancelText: 'OK',
          }) 
          console.log(error)
          this.approot.progressBar=false;
        })

    
  

  }

  enregistrer_cashpower(){

      var  date=new Date()
      var dt1=new Date()
      var year1 = dt1.getFullYear();
      var month1 = dt1.getMonth();
      var date1= dt1.getDate();
      var h1= dt1.getHours()
      var m1= dt1.getMinutes();
      var s1= dt1.getSeconds();
      var TRX_DI="TRX"+year1+("0" + (month1 + 1)).slice(-2)+("0" + date1 ).slice(-2)+("0" + h1 ).slice(-2)+("0" + m1 ).slice(-2)+("0" + s1 ).slice(-2)+"_"+this.user_form.value.compteur
      // var compte = this.comptes_paiement.find(({ COMPTE_ID }) => COMPTE_ID === this.user_form1.value.compte_paiement);

      var json={
        // "ID":
        "COMPTEURCODE":this.user_form.value.compteur,
        "NUMERO_DE_CAISSE":this.connexion.Numero_de_Caisse,
        "TYPE":"1",
        "MODE":this.connexion.Mode,
        "MONTANT":this.user_form.value.Montant,
        "CONSOMMATION":this.compteur_research.Consommation,
        "TYPE_DE_PAIEMENT":"MONTANT",
        "TRANSACTION_ID":TRX_DI,
        "OPERATION_ID":TRX_DI,
        "TELEPHON":"",
        "COMPTE_ID":this.COMPTE_ID,
        // "STATUT":"",
        // "DATETIME":"",
        "SOCIETE_ID":this.SOCIETE_ID,
        "TOKEN1":this.compteur_research.Token1,
        "TOKEN2":this.compteur_research.Token2,
        "TOKEN3":this.compteur_research.Token3,
        "CODERECU":this.compteur_research.CodeRecu,
        "SITECAISSE":this.compteur_research.SiteCaisse,
        "MONTANTPAYE":this.compteur_research.MontantPaye,
        "CREDITAVANCE":this.compteur_research.CreditAvance,
        "REDEVANCE":this.compteur_research.Redevance,
        "PRIMEFIXE":this.compteur_research.PrimeFixe,
        "MONTANTFNE":this.compteur_research.MontantFNE,
        "SURTAXE":this.compteur_research.Surtaxe,
        "TAXE":this.compteur_research.Taxe,
        "TVA":this.compteur_research.TVA,
        "LASTREADINGDATE":this.compteur_research.LastReadingDate,
        "NEWREADINGDATE":this.compteur_research.NewReadingDate,
        "CODECLIENT":this.compteur_research.CodeClient,
        "NOMCLIENT":this.compteur_research.NomClient,
        "ID_USER":this.ID,
        "ENDROIT_CREATION":"GUICHET"
        }
        

        this.approot.progressBar=true;
        console.log(json)

        // return
          this.regidesoService.creer_cashpower(json).subscribe
          (res=>{

            console.log(res)
            
              this.facture_trouve=false
              this.dialogService.messageDialog({
                title: 'Message',
                message: res.message,
                cancelText: 'OK',
              }) 

              var users_mail=""
              if(this.users)
              this.users.forEach(element => {
                users_mail+=element.EMAIL+","
              });

              var msg1=" a initié l'achat CASHPOWER "

              var json_email={
                "from":"notification-regideso-web-portal-service@bancobu.com",
                "to":users_mail,
                "cc":"",
                "subject":"INITIATION D'ACHAT CASHPOWER",
                "attachments":"",
                "msg":"L'utilisateur <b>"+sessionStorage.getItem("NAME")+" "+sessionStorage.getItem("LASTNAME")+"</b> "+msg1+"dans le portail de BANCOBU du service REGIDESO-WEB PORTAL. Veuillez accèder à la page  <a href='"+this.connexion.portal_public+"'>"+this.connexion.portal_public+"</a> pour plus de detail ",
              }
            
                  this.regidesoService.sendMail(json_email).subscribe
                  (res2=>{
                      console.log(res2)
        
                      return
            
                  },
                  error=>{
                    console.log(error)
                  
                  })

                  let currentUrl = this.router.url;
                  this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
                      this.router.navigate([currentUrl]);
                      console.log(currentUrl);
                  });

              this.approot.progressBar=false;

          },
          error=>{
            this.dialogService.messageDialog({
              title: 'Message',
              message: 'ECHEC! PROBLEME SERVEUR VEUILLEZ REESSAYER',
              cancelText: 'OK',
            }) 
            console.log(error)
            this.approot.progressBar=false;
          })

      
   

  }
}


