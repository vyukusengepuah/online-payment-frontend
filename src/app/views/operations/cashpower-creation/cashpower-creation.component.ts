import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { DefaultLayoutComponent } from '../../../containers';
import { ConnexionService } from '../../../services/connexion.service';
import { DialogService } from '../../../services/dialog.service';
import { InfoService } from '../../../services/info.service';
import { RegidesoService } from '../../../services/regideso.service';
import { AppComponent } from '../../../app.component';

@Component({
  selector: 'app-cashpower-creation',
  templateUrl: './cashpower-creation.component.html',
  styleUrls: ['./cashpower-creation.component.scss']
})
export class CashpowerCreationComponent implements OnInit {
  @ViewChild('largeModal') public largeModal: ModalDirective;

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
  compteur: any;
  users: any;
  

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

    this.getSocieteAccounts()
    this.getSocieteCompteur()

  }

  getSocieteCompteur(){
    // this.approot.progressBar=true;
    var societe_id=sessionStorage.getItem("SOCIETE_ID")?sessionStorage.getItem("SOCIETE_ID"):0
    console.log(societe_id)
    this.regidesoService.compteur_actif_par_societe(societe_id,2).subscribe
    (res1=>{
        // console.log(res1)

        this.compteur=res1.result
        this.users=res1.users
        
        // this.approot.progressBar=false;
    },
    error=>{
      
      console.log(error)
      this.approot.progressBar=false;
    })

  }

  research(){
    if(this.connexion.CASHOWER=="ON"){
      if(sessionStorage.getItem("NIVEAU")=="1"||sessionStorage.getItem("NIVEAU")=="3"){
        this.compteur_research=null
        this.facture_trouve=false
        this.is_confirmation=false
        

        if(
          this.user_form.controls.compteur.status=='VALID'&&
          this.user_form.controls.type.status=='VALID'&&
          this.user_form.controls.Montant.status=='VALID'&&
          this.user_form.controls.KWH.status=='VALID'
        ){
          if(this.user_form.value.type=='1')
          var j={"CompteurCode":this.user_form.value.compteur,"Numero_de_Caisse":this.connexion.Numero_de_Caisse,"Type":this.user_form.value.type,"Mode":this.connexion.Mode,"Montant":this.user_form.value.Montant,"Type_de_Paiement":"WEB"}
          else
          var j1={"CompteurCode":this.user_form.value.compteur,"Numero_de_Caisse":this.connexion.Numero_de_Caisse,"Type":this.user_form.value.type,"Mode":this.connexion.Mode,"Consommation":this.user_form.value.Consommation,"Type_de_Paiement":"WEB"}

          var json=this.user_form.value.type=='1'?j:j1

              this.approot.progressBar=true;
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
                    var key3= key2.replace("MONTANTPAYE","MONTANT")
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
                      && key1!='MONTANTFNE')
                    this.tableau_facture.push({KEY:key9,VALUE:res[key]})
                      
                  })
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
                    "Caisse non valide pour l'utilisateur, contact 161"
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
      }else{
        this.dialogService.messageDialog({
          title: 'Message',
          message: "ECHEC!VOUS N'AVEZ PAS DROIT D'INTITIATION DES ACHATS CASHPOWER",
          cancelText: 'OK',
        }) 
      }
    }else{
      this.dialogService.messageDialog({
        title: 'Message',
        message: "Le service Cashpower n'est pas disponible Pour le moment",
        cancelText: 'OK',
      }) 
    }
  }

  // Consulter(){
  //   this.tableau_facture=[]
  //   if(this.user_form.value.facture){
  //       const result = this.factures.find(({ Facture_Reference }) => Facture_Reference === this.user_form.value.facture);
  //       // console.log(result)

  //       Object.keys(result).forEach(key => {
  //         // console.log(key + ' - ' + res[key]) // key - value
  //         var key1=""+key.toUpperCase()
  //         var key2=key1.replace("COMPTE","CODE D'INSTALLATION")
  //         var key3= key2.replace("NUMEROCLIENT","NUMERO CLIENT")
  //         var key4=key3.replace("FACTURE_REFERENCE","NUMERO FACTURE")
  //         var key5= key4.replace("NOMCLIENT","NOM CLIENT")

  //         // console.log(key5)
  //         if(key1!='MONTANTPAYEE' && key1!='MONTANT_A_DEDUIRE_ESTIMATION')
  //         this.tableau_facture.push({KEY:key5,VALUE:result[key]})
            
  //       })
  //       // this.largeModal.show()
  //       this.is_confirmation=true

  //         this.message="Cette facture n'est pas enregistrée, voulez-vous initier son paiement?"
  //     }else{
  //       this.dialogService.messageDialog({
  //         title: 'Message',
  //         message: 'ECHEC! VEUILLEZ D\'ABORD SELECTIONNER UNE FACTURE',
  //         cancelText: 'OK',
  //       }) 
  //     }

  // }


  enregistrer_cashpower(){
    if(this.user_form1.value.compte_paiement){


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
        "TYPE":this.user_form.value.type,
        "MODE":this.connexion.Mode,
        "MONTANT":this.user_form.value.Montant,
        "CONSOMMATION":this.compteur_research.Consommation,
        "TYPE_DE_PAIEMENT":this.user_form.value.type=="1"?"MONTANT":"KWH",
        "TRANSACTION_ID":TRX_DI,
        "OPERATION_ID":TRX_DI,
        "TELEPHON":"",
        "COMPTE_ID":this.user_form1.value.compte_paiement,
        // "STATUT":"",
        // "DATETIME":"",
        "SOCIETE_ID":sessionStorage.getItem("SOCIETE_ID"),
        "TOKEN1":this.compteur_research.Token1,
        "TOKEN2":this.compteur_research.Token2,
        "TOKEN3":this.compteur_research.Token3,
        // "TOKEN1":"",
        // "TOKEN2":"",
        // "TOKEN3":"",
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
        "ID_USER":sessionStorage.getItem("ID")
        }
        

        this.approot.progressBar=true;
        console.log(json)
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
              this.users.forEach(element => {
                users_mail+=element.EMAIL+","
              });

              var msg1=" a initié l'achat CASHPOWER "

              var json_email={
                "from":"notification-regideso-web-portal-service@bancobu.com",
                "to":users_mail,
                "cc":"",
                "subject":"Initiation Achat cashpower",
                "attachments":"",
                "msg":"L'utilisateur <b>"+sessionStorage.getItem("NAME")+" "+sessionStorage.getItem("LASTNAME")+"</b> "+msg1+"dans le portail de BANCOBU du service REGIDESO-WEB PORTAL. Veuillez accèder à la page  <a href='"+this.connexion.portal+"'>"+this.connexion.portal+"</a> pour plus de detail ",
              }
            
                  this.regidesoService.sendMail(json_email).subscribe
                  (res2=>{
                      console.log(res2)
        
                      return
            
                  },
                  error=>{
                    console.log(error)
                  
                  })

              this.router.navigate(['/cashpower/encours']);

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

      
    }else if(!sessionStorage.getItem("SOCIETE_ID")){
      this.dialogService.messageDialog({
        title: 'Message',
        message: 'ECHEC! VOUS N\'AVEZ PAS DROIT POUR L\'INITIATION DES ACHATS CASHPOWER',
        cancelText: 'OK',
      }) 
    }else if(this.comptes_paiement.length==0){
      this.dialogService.messageDialog({
        title: 'Message',
        message: 'ECHEC! VOTRE ENTITE N\'A PAS ENCORE MAPPE DE COMPTE POUR PAIEMENT REGIDESO, VEUIILEZ CONSULTER UNE AGENCE BANCOBU POUR LE MAPPING',
        cancelText: 'OK',
      }) 
    }

  }

  getSocieteAccounts(){
    // this.approot.progressBar=true;
    var societe_id=sessionStorage.getItem("SOCIETE_ID")?sessionStorage.getItem("SOCIETE_ID"):0
    console.log(societe_id)
    this.regidesoService.getSocieteAccounts(societe_id).subscribe
    (res1=>{
        console.log(res1)

        this.comptes_paiement=res1
        
        // this.approot.progressBar=false;
    },
    error=>{
      
      console.log(error)
      this.approot.progressBar=false;
    })

  }

  select_type(event){
    if(event.value=='1'){
      this.is_montant=true
      this.is_kwh=false
      this.user_form.addControl("Montant",new FormControl('',Validators.required));

      this.user_form.get('Montant').setValidators([Validators.required]);
      this.user_form.get('Montant').updateValueAndValidity();
      this.user_form.get('KWH').setValidators(null);
      this.user_form.get('KWH').updateValueAndValidity();
      
    }else if(event.value=='2'){
      this.is_montant=false
      this.is_kwh=true
      // this.user_form.addControl("KWH",new FormControl('',Validators.required));
      this.user_form.get('KWH').setValidators([Validators.required]);
      this.user_form.get('KWH').updateValueAndValidity();
      this.user_form.get('Montant').setValidators(null);
      this.user_form.get('Montant').updateValueAndValidity();
    }
    else {
      this.is_montant=false
      this.is_kwh=false
    }
  }
}
