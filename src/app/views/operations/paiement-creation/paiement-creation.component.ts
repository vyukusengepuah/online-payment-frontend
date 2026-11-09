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

@Component({
  selector: 'app-paiement-creation',
  templateUrl: './paiement-creation.component.html',
  styleUrls: ['./paiement-creation.component.scss']
})
export class PaiementCreationComponent implements OnInit {
  @ViewChild('largeModal') public largeModal: ModalDirective;

  user_form=new FormGroup({
    compte:new FormControl('',Validators.required),
    facture:new FormControl('',Validators.required),
    
   })
   is_confirmation=false

   user_form1=new FormGroup({
    compte_paiement:new FormControl('',Validators.required),
    facture:new FormControl('',Validators.required),
    
   })
   owner
   factures=[]
   facture_trouve=false
  message: string;
  tableau_facture=[];
  comptes_paiement: any;
  compteur: any;
  users: any;
  

   constructor(
    private approot:DefaultLayoutComponent,
    private info_service:InfoService,
    private regidesoService:RegidesoService,
    private http: HttpClient, 
    private router: Router,
    private approot1:DefaultLayoutComponent, 
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
    this.regidesoService.compteur_actif_par_societe(societe_id,1).subscribe
    (res1=>{
        console.log(res1)

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

    // console.log(sessionStorage.getItem("NIVEAU"))
    if(sessionStorage.getItem("NIVEAU")=="1"||sessionStorage.getItem("NIVEAU")=="3"){
      this.facture_trouve=false
      this.is_confirmation=false
      
      var json={
                    "Compte":this.user_form.value.compte
                }

      if(this.user_form.controls.compte.status=='VALID'){
        

            this.approot.progressBar=true;
            this.regidesoService.checkbills(json).subscribe
            (res=>{

              
              this.owner=res.DR_WS_6_FactureNonPayee.rowset.length>0?res.DR_WS_6_FactureNonPayee.rowset[res.DR_WS_6_FactureNonPayee.rowset.length-1].NomClient:""
              this.factures=res.DR_WS_6_FactureNonPayee.rowset
              this.approot.progressBar=false;
              console.log(res.DR_WS_6_FactureNonPayee.rowset.length)
              if(res.DR_WS_6_FactureNonPayee.rowset.length>0)this.facture_trouve=true
              else{
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
    }else{
      this.dialogService.messageDialog({
        title: 'Message',
        message: "ECHEC!VOUS N'AVEZ PAS DROIT D'INTITIATION DE PAIEMENT FACTURE",
        cancelText: 'OK',
      }) 
    }
  
  }

  Consulter(){
    this.tableau_facture=[]
    if(this.user_form.value.facture){
        const result = this.factures.find(({ Facture_Reference }) => Facture_Reference === this.user_form.value.facture);
        // console.log(result)

        Object.keys(result).forEach(key => {
          // console.log(key + ' - ' + res[key]) // key - value
          var key1=""+key.toUpperCase()
          var key2=key1.replace("COMPTE","CODE D'INSTALLATION")
          var key3= key2.replace("NUMEROCLIENT","NUMERO CLIENT")
          var key4=key3.replace("FACTURE_REFERENCE","NUMERO FACTURE")
          var key5= key4.replace("NOMCLIENT","NOM CLIENT")

          // console.log(key5)
          if(key1!='MONTANTPAYEE' && key1!='MONTANT_A_DEDUIRE_ESTIMATION')
          this.tableau_facture.push({KEY:key5,VALUE:result[key]})
            
        })
        // this.largeModal.show()
        this.is_confirmation=true

          this.message="Cette facture n'est pas enregistrée, voulez-vous initier son paiement?"
      }else{
        this.dialogService.messageDialog({
          title: 'Message',
          message: 'ECHEC! VEUILLEZ D\'ABORD SELECTIONNER UNE FACTURE',
          cancelText: 'OK',
        }) 
      }

  }


  enregistrer_facture(){
    if(this.user_form1.value.compte_paiement){

        const result = this.factures.find(({ Facture_Reference }) => Facture_Reference === this.user_form.value.facture);

        // var json={
        //   "FACTUREREFERENCE":result.Facture_Reference,
        //   "NUMERO_DE_CAISSE":"57201",
        //   "MODEFINALFLAG":"N",
        //   "OPERATION_ID":"",
        //   "TRANS_ID":"",
        //   "TELEPHON":"",
        //   "MONTANT":result.Montant,
        //   "DEDUCTION":result.Montant_a_Deduire_estimation,
        //   "CODERECU":"",
        //   "CLIENTNAME":result.NomClient,
        //   "INSTALLATIONCODE":result.Compte,
        //   "COMPTE_ID":this.user_form1.value.compte_paiement,
        //   "SOCIETE_ID":sessionStorage.getItem("SOCIETE_ID"),
        //   "ANNEE":result.Annee,
        //   "MOIS":result.Mois,
        //   "NUMEROCLIENT":result.NumeroClient
        // }
        var json={
          "FACTUREREFERENCE":result.Facture_Reference,
          "NUMERO_DE_CAISSE":this.connexion.Numero_de_Caisse,
          "MODEFINALFLAG":this.connexion.ModeFinalFlag,
          "MONTANT":result.Montant,
          "DEDUCTION":result.Montant_a_Deduire_estimation,
          "CLIENTNAME":result.NomClient,
          "INSTALLATIONCODE":result.Compte,
          "COMPTE_ID":this.user_form1.value.compte_paiement,
          "SOCIETE_ID":sessionStorage.getItem("SOCIETE_ID"),
          "ANNEE":result.Annee,
          "MOIS":result.Mois,
          "NUMEROCLIENT":result.NumeroClient,
          "USER_ID":sessionStorage.getItem("ID")
        }

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
                "subject":"Initiation Paiement",
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

              this.router.navigate(['/facture/paiement']);

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

      
    }else if(!sessionStorage.getItem("SOCIETE_ID")){
      this.dialogService.messageDialog({
        title: 'Message',
        message: 'Vous n\'avez pas droit pour l\'initiation des factures',
        cancelText: 'OK',
      }) 
    }else if(this.comptes_paiement.length==0){
      this.dialogService.messageDialog({
        title: 'Message',
        message: 'Votre entite n\'a pas encore mappe de compte pour paiement regideso, veuiilez consulter une agence bancobu pour le mapping',
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
}
