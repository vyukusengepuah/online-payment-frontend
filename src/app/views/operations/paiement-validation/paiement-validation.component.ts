import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { DefaultLayoutComponent } from '../../../containers';
import { ConnexionService } from '../../../services/connexion.service';
import { DialogService } from '../../../services/dialog.service';
import { InfoService } from '../../../services/info.service'; 
import { RegidesoService } from '../../../services/regideso.service';
import { AppComponent } from '../../../app.component';


@Component({
  selector: 'app-paiement-validation',
  templateUrl: './paiement-validation.component.html',
  styleUrls: ['./paiement-validation.component.scss']
})
export class PaiementValidationComponent implements OnInit {
  @ViewChild('largeModal') public largeModal: ModalDirective;
  @ViewChild('largeModalValidation') public largeModalValidation: ModalDirective;
  @ViewChild('largeModalAnullation') public largeModalAnullation: ModalDirective;

  usersession=JSON.parse(sessionStorage.getItem('usersession'))
  //  console.log(usersession)
   permission_url=this.usersession?(this.usersession.hasOwnProperty("data")?this.usersession.data.paths:{}):{}
   ID=this.usersession?(this.usersession.hasOwnProperty('data')?this.usersession.data.ID:0):0

  user_form=new FormGroup({
    compte:new FormControl('',Validators.required),
    facture:new FormControl('',Validators.required),
    
   })
   is_confirmation=false

   user_form1=new FormGroup({
    compte_paiement:new FormControl('',Validators.required),
    facture:new FormControl('',Validators.required),
    
   })
   user_form2=new FormGroup({
    comentaire:new FormControl('',Validators.required),
    
   })
   
   owner
   factures=[]
   facture_trouve=false
  message: string;
  tableau_facture=[];
  comptes_paiement: any;
  result: any;
  compteur: any;
  users: any;
  societeInfo: any;
  DATETIME: any;
  

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

    
    
      // console.log(this.activatedRoute.snapshot.queryParams.id);
       this.approot.progressBar=true;
    var id_u=sessionStorage.getItem("ID")?sessionStorage.getItem("ID"):"XXX"
    console.log(id_u)
      this.regidesoService.getFactureInfos(this.activatedRoute.snapshot.queryParams.id,id_u).subscribe
      (res=>{

        console.log(res)
if(!res.success){
          if(res.message=="exist")this.dialogService.messageDialog({
              title: 'Message',
              message: 'Echec! Vous avez deja fait votre validation',
              cancelText: 'OK',
            }) 
             this.router.navigate(['/cashpower/encours']);
        }else{
        
          this.approot.progressBar=false;
          this.result=res.result
          this.DATETIME= res.result[0].DATETIME
          this.research1(res.result[0].INSTALLATIONCODE)
          this.user_form.get("compte").setValue(res.result[0].INSTALLATIONCODE);
          this.user_form.get("facture").setValue(res.result[0].FACTUREREFERENCE);
          
          this.getSocieteAccounts()
          this.getSocieteCompteur()
        }
       
        
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

  getSocieteCompteur(){
    this.approot.progressBar=true;
    var societe_id=sessionStorage.getItem("SOCIETE_ID")?sessionStorage.getItem("SOCIETE_ID"):this.result[0].SOCIETE_ID
    console.log(societe_id)
    this.regidesoService.compteur_actif_par_societe(societe_id,1).subscribe
    (res1=>{
        console.log(res1)

        this.compteur=res1.result
        this.users=res1.users
        this.societeInfo=res1.result_societe
        
        this.approot.progressBar=false;
    },
    error=>{
      
      console.log(error)
      this.approot.progressBar=false;
    })

  }


  research(){
    if((this.result[0].ENDROIT_CREATION=="GUICHET"&&this.ID>0)||(sessionStorage.getItem("NIVEAU")=="2"||sessionStorage.getItem("NIVEAU")=="3")){
      this.facture_trouve=false
      this.is_confirmation=false
      
      var json={
                    "Compte":this.user_form.value.compte
                }

      if(this.user_form.controls.compte.status=='VALID'){
        

            this.approot.progressBar=true;
            this.regidesoService.checkbills(json).subscribe
            (res=>{

              
              this.owner=res.DR_WS_6_FactureNonPayee.rowset.length>0?res.DR_WS_6_FactureNonPayee.rowset[0].NomClient:""
              this.factures=res.DR_WS_6_FactureNonPayee.rowset
              this.approot.progressBar=false;
              console.log(res.DR_WS_6_FactureNonPayee.rowset.length)
              if(res.DR_WS_6_FactureNonPayee.rowset.length>0)this.facture_trouve=true
              else{
                this.facture_trouve=false
                this.dialogService.messageDialog({
                  title: 'Message',
                  message: 'Cette facture est deja payée',
                  cancelText: 'OK',
                }) 
                console.log("ECHEC! AUCUNE FACTURE TROUVE POUR CETTE NUMERO D\'INSTALLATION")
                this.router.navigate(['/facture/paiement']);
              }

            },
            error=>{
              if(error.error.error=="Gateway Timeout")var message=" Veuillez réessayer svp!"
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
        message: "ECHEC!VOUS N'AVEZ PAS DROIT DE VALIDATION DE PAIEMENT FACTURE",
        cancelText: 'OK',
      }) 
    }
  
  }

  research1(compte){
    if((this.result[0].ENDROIT_CREATION=="GUICHET"&&this.ID>0)||(sessionStorage.getItem("NIVEAU")=="2"||sessionStorage.getItem("NIVEAU")=="3")){
      this.facture_trouve=false
      this.is_confirmation=false

      console.log(compte)
      
      var json={
                    "Compte":compte
                }


            this.approot.progressBar=true;
            this.regidesoService.checkbills(json).subscribe
            (res=>{

              
              this.owner=res.DR_WS_6_FactureNonPayee.rowset.length>0?res.DR_WS_6_FactureNonPayee.rowset[0].NomClient:""
              this.factures=res.DR_WS_6_FactureNonPayee.rowset
              this.approot.progressBar=false;
              console.log(res.DR_WS_6_FactureNonPayee.rowset.length)
              if(res.DR_WS_6_FactureNonPayee.rowset.length>0)this.facture_trouve=true
              else{
                this.facture_trouve=false
                this.dialogService.messageDialog({
                  title: 'Message',
                  message: 'Cette facture est deja payée',
                  cancelText: 'OK',
                }) 

                console.log('ECHEC! AUCUNE FACTURE TROUVE POUR CETTE NUMERO D\'INSTALLATION')
                this.router.navigate(['/facture/paiement']);
              }

             
              this.user_form1.get("compte_paiement").setValue(parseInt(this.result[0].COMPTE_ID));
              this.Consulter()
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
    }else{
      this.dialogService.messageDialog({
        title: 'Message',
        message: "ECHEC!VOUS N'AVEZ PAS DROIT DE VALIDATION DE PAIEMENT FACTURE",
        cancelText: 'OK',
      }) 
    }
  }

  Consulter(){
    this.tableau_facture=[]
    if(this.user_form.value.facture){
        const result = this.factures.find(({ Facture_Reference }) => Facture_Reference === this.user_form.value.facture);
        console.log(this.user_form.value.facture)

        if(!result){
          this.dialogService.messageDialog({
            title: 'Message',
            message: 'Cette facture est deja payée',
            cancelText: 'OK',
          }) 
          this.router.navigate(['/facture/paiement']);
        }

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
        var compte = this.comptes_paiement.find(({ COMPTE_ID }) => COMPTE_ID === this.user_form1.value.compte_paiement);

        // console.log(this.comptes_paiement,this.user_form1.value.compte_paiement)
        this.tableau_facture.push({KEY:"COMPTE DE PAIEMENT",VALUE:compte.COMPTE})
        this.tableau_facture.push({KEY:"AGENCE",VALUE:compte.BRANCH_CODE})
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


  modifiier_facture(){
    if(this.user_form1.value.compte_paiement){

        const result = this.factures.find(({ Facture_Reference }) => Facture_Reference === this.user_form.value.facture);

        
        var json={
          "ID":this.activatedRoute.snapshot.queryParams.id,
          "FACTUREREFERENCE":result.Facture_Reference,
          "NUMERO_DE_CAISSE":this.connexion.Numero_de_Caisse,
          "MODEFINALFLAG":"N",
          "MONTANT":result.Montant,
          "DEDUCTION":result.Montant_a_Deduire_estimation,
          "CLIENTNAME":result.NomClient,
          "INSTALLATIONCODE":result.Compte,
          "COMPTE_ID":this.user_form1.value.compte_paiement,
          "SOCIETE_ID":this.result[0].ENDROIT_CREATION=="GUICHET"?this.result[0].SOCIETE_ID:sessionStorage.getItem("SOCIETE_ID"),
          "ANNEE":result.Annee,
          "MOIS":result.Mois,
          "NUMEROCLIENT":result.NumeroClient,
          "ID_USER":this.result[0].ENDROIT_CREATION=="GUICHET"?this.ID:sessionStorage.getItem("ID"),
          "USER_ID":this.result[0].ENDROIT_CREATION=="GUICHET"?this.ID:sessionStorage.getItem("ID"),
          "FIN":"NON"
        }

        this.approot.progressBar=true;
          this.regidesoService.modifier_facture(json).subscribe
          (res=>{

            console.log(res)
            
              this.facture_trouve=false
              this.dialogService.messageDialog({
                title: 'Message',
                message: res.message,
                cancelText: 'OK',
              }) 
              this.send_mail(" a modifié le paiement de facture REGIDESO ")

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

      
    }else if(!sessionStorage.getItem("SOCIETE_ID")){
      this.dialogService.messageDialog({
        title: 'Message',
        message: 'ECHEC! VOUS N\'AVEZ PAS DROIT POUR L\'INITIATION DES FACTURES',
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

check_validation(type){
  const result = this.factures.find(({ Facture_Reference }) => Facture_Reference === this.user_form.value.facture);

  var json={}
  if(type==1){

    // console.log(this.result[0],sessionStorage.getItem("NIVEAU"))

    // if(sessionStorage.getItem("NIVEAU")==this.result[0].MAX_NIVEAU){
    if((this.result[0].ENDROIT_CREATION=="GUICHET"&&this.ID>0)||(sessionStorage.getItem("NIVEAU")=="2"||sessionStorage.getItem("NIVEAU")=="3")){

      json={
        "ID":this.activatedRoute.snapshot.queryParams.id,
        "FACTUREREFERENCE":result.Facture_Reference,
        "MONTANT":result.Montant,
        "DEDUCTION":result.Montant_a_Deduire_estimation,
        "CLIENTNAME":result.NomClient,
        "INSTALLATIONCODE":result.Compte,
        "COMPTE_ID":this.user_form1.value.compte_paiement,
        "SOCIETE_ID":this.result[0].ENDROIT_CREATION=="GUICHET"?this.result[0].SOCIETE_ID:sessionStorage.getItem("SOCIETE_ID"),
        "ANNEE":result.Annee,
        "MOIS":result.Mois,
        "NUMEROCLIENT":result.NumeroClient,
        "ID_USER":this.result[0].ENDROIT_CREATION=="GUICHET"?this.ID:sessionStorage.getItem("ID"),
        "USER_ID":this.result[0].ENDROIT_CREATION=="GUICHET"?this.ID:sessionStorage.getItem("ID"),
        "STATUT":type,
        "FIN":"OUI"

      }

      // if(sessionStorage.getItem("NIVEAU")>this.result[0].GRAND_NIVEAU){
        // console.log(sessionStorage.getItem("NIVEAU"),this.result[0].GRAND_NIVEAU)

        //PAIEMENT REGIDESO ICII
        var compte = this.comptes_paiement.find(({ COMPTE_ID }) => COMPTE_ID === this.user_form1.value.compte_paiement);
      //  console.log(compte,this.comptes_paiement,this.user_form1.value.compte_paiement)
        this.regidesoService.compte(compte.COMPTE).subscribe
          (res=>{

            console.log(res)

          if(res.result[0]){
             var valisation_tot=parseInt(this.result[0].VALIDATION_DEJA)+1
              console.log(valisation_tot,this.societeInfo[0].NOMBRE_VALIDATION)
              // console.log()
              // return
              if(valisation_tot>=this.societeInfo[0].NOMBRE_VALIDATION||this.result[0].ENDROIT_CREATION=="GUICHET"){
                  var  date=new Date()
                  // var dt1=new Date(this.DATETIME)
                  var dt1=new Date()
                  var year1 = dt1.getFullYear();
                  var month1 = dt1.getMonth();
                  var date1= dt1.getDate();
                  var h1= dt1.getHours()
                  var m1= dt1.getMinutes();
                  var s1= dt1.getSeconds();
                  var ms1= dt1.getMilliseconds();
                    // var TRX_DI="TRX"+year1+("0" + (month1 + 1)).slice(-2)+("0" + date1 ).slice(-2)+("0" + h1 ).slice(-2)+("0" + m1 ).slice(-2)+("0" + s1 ).slice(-2)+"_"+compte.COMPTE
                    var TRX_DI="TXN"+year1+("0" + (month1 + 1)).slice(-2)+("0" + date1 ).slice(-2)+("0" + h1 ).slice(-2)+("0" + m1 ).slice(-2)+("0" + s1 ).slice(-2)+("0" + ms1 ).slice(-3)

                    
                  var json_regideso={
                    "description": "Paybill@"+compte.COMPTE+"@"+this.result[0].INSTALLATIONCODE,
                    "destinationCurrency": "BIF",
                    "status": "CREATED",
                    "txn_ref": "",
                    "external_id": TRX_DI,
                    "ft_amount": this.result[0].MONTANT,
                    "txn_date": date,
                    "updated_at": date,
                    "debit_account":compte.COMPTE,
                    "debit_branch":res.result[0].BRANCH_CODE,
                    "trx_type":"PAYBILL",
                    "compteur":"",
                    // "code_installation":this.result[0].INSTALLATIONCODE,
                    "code_installation":this.result[0].FACTUREREFERENCE,
                    "consommation":"",
                    "operation_id":TRX_DI,
                    // "reference_number":this.result[0].FACTUREREFERENCE
                    // "response_code": "string",
                    // "response_message": "string"
                  }

                  console.log(json_regideso)
      
                  this.approot.progressBar=true;

                  this.regidesoService.reserve(json_regideso).subscribe
                      (resus=>{
                        console.log(resus)

                        this.regidesoService.regideso(resus).subscribe
                        (resus1=>{
                          console.log(resus1)

                          const result_RECEIPT_NO= resus1.metadata.find(({ key }) => key === "RECEIPT_NO");
                          json['RECEIPT_NO']=result_RECEIPT_NO.value
                          json['COMMENTAIRE']=resus1.response_message
                          console.log(json)
                          this.validation_facture(json,true)

                            this.regidesoService.complete(resus1).subscribe
                            (res=>{ 
                              console.log(res)

                                if(res.response_code=="200"){
                                this.approot.progressBar=false;
                                
                                const result_EVENEMENT_CBS= res.metadata.find(({ key }) => key === "PAYMENT_ID");
                                const result_COMPTE_REGIDESO= res.metadata.find(({ key }) => key === "CREDIT_ACCOUNT");
                                var json_confirm={
                                  "ID_USER":this.result[0].ENDROIT_CREATION=="GUICHET"?this.ID:sessionStorage.getItem("ID"),
                                  "NIVEAU":this.result[0].ENDROIT_CREATION=="GUICHET"?10:sessionStorage.getItem("NIVEAU"),
                                  "FACTURE_CASHPOWER":1,//1FACTURE-2CASHPOWER
                                  "ID_FACTURE_CASHPOWER":this.activatedRoute.snapshot.queryParams.id,
                                  "STATUT":1,
                                  "TRANSACTION_ID":TRX_DI,
                                  "EVENEMENT_CBS":result_EVENEMENT_CBS.value,
                                  "COMPTE_REGIDESO":result_COMPTE_REGIDESO?result_COMPTE_REGIDESO.value:""
                                }

                              this.approot.progressBar=true;
                              this.regidesoService.confirmation(json_confirm).subscribe
                              (res1=>{ 
                                this.approot.progressBar=false;
                                console.log(res)
                                
                                this.redirect(json,true)
                              },
                                error=>{
                                  // if(res.error=="Gateway Timeout")var message="ECHEC! LE TEMPS D'EXECUTION DU GATEWAY EST DEPASSE, VEUILLEZ REESSAYER SVP!"
                                  // else var message=res.message+""
                                  // this.dialogService.messageDialog({
                                  //   title: 'Message',
                                  //   message: message,
                                  //   cancelText: 'OK',
                                  // }) 
                                  console.log(error)
                                  // this.validation_facture(json,true)
                                  this.approot.progressBar=false;
                                  this.redirect(json,true)
                                })
                            }else{
                              this.approot.progressBar=false;
                              // this.dialogService.messageDialog({
                              //   title: 'Message',
                              //   message: res.response_message,
                              //   cancelText: 'OK',
                              // }) 
                              this.redirect(json,true)
                          }
                            },
                              error=>{
                                // this.dialogService.messageDialog({
                                //   title: 'Message',
                                //   message: 'ECHEC! PROBLEME DE SERVICE DE TRANSACTION/COMPLETE',
                                //   cancelText: 'OK',
                                // }) 
                                console.log(error)
                                this.approot.progressBar=false;
                                this.redirect(json,true)
                            })
                          },
                          error=>{
                            this.dialogService.messageDialog({
                              title: 'Message',
                              message: 'ECHEC! PROBLEME DE SERVICE DE TRANSACTION/REGIDESO',
                              cancelText: 'OK',
                            }) 
                            console.log(error)
                            this.approot.progressBar=false;
                        })
                        },
                        error=>{
                          this.dialogService.messageDialog({
                            title: 'Message',
                            message: 'ECHEC! PROBLEME DE SERVICE DE TRANSACTION/RESERVE',
                            cancelText: 'OK',
                          }) 
                          console.log(error)
                          this.approot.progressBar=false;
                      })
            }else{
                console.log(json)
                json['FIN']="NON"
                this.validation_facture(json)
              }
          }

      },
      error=>{
        
        this.dialogService.messageDialog({
          title: 'Message',
          message: 'ECHEC! PROBLEME SERVEUR POUR RECHERCHE DE COMPTE',
          cancelText: 'OK',
        }) 
        console.log(error)
        this.approot.progressBar=false;
      })

      // }else{
      //   this.dialogService.messageDialog({
      //     title: 'Message',
      //     message: 'ECHEC! QUELQU\'UN D\'AUTRE DE VOTRE NIVEAU A DEJA VALIDE CE PAIEMENT',
      //     cancelText: 'OK',
      //   }) 
      // }

      
    }else{
      json={
        "ID":this.activatedRoute.snapshot.queryParams.id,
        "FACTUREREFERENCE":result.Facture_Reference,
        "MONTANT":result.Montant,
        "DEDUCTION":result.Montant_a_Deduire_estimation,
        "CLIENTNAME":result.NomClient,
        "INSTALLATIONCODE":result.Compte,
        "COMPTE_ID":this.user_form1.value.compte_paiement,
        "SOCIETE_ID":this.result[0].ENDROIT_CREATION=="GUICHET"?this.result[0].SOCIETE_ID:sessionStorage.getItem("SOCIETE_ID"),
        "ANNEE":result.Annee,
        "MOIS":result.Mois,
        "NUMEROCLIENT":result.NumeroClient,
        "ID_USER":this.result[0].ENDROIT_CREATION=="GUICHET"?this.ID:sessionStorage.getItem("ID"),
        "USER_ID":this.result[0].ENDROIT_CREATION=="GUICHET"?this.ID:sessionStorage.getItem("ID"),
        "STATUT":type,
        "FIN":"NON"
      }

      if((sessionStorage.getItem("NIVEAU")>this.result[0].GRAND_NIVEAU)||(this.result[0].ENDROIT_CREATION=="GUICHET")){
        // console.log(sessionStorage.getItem("NIVEAU"),this.result[0].GRAND_NIVEAU)
        this.validation_facture(json)
      }else{
        this.dialogService.messageDialog({
          title: 'Message',
          message: 'ECHEC! QUELQU\'UN D\'AUTRE DE VOTRE NIVEAU A DEJA VALIDE CE PAIEMENT',
          cancelText: 'OK',
        }) 
      }
    }


      
      
  }else{
    if(this.user_form2.value.comentaire){

         json={
          "ID":this.activatedRoute.snapshot.queryParams.id,
          "FACTUREREFERENCE":result.Facture_Reference,
          "MONTANT":result.Montant,
          "DEDUCTION":result.Montant_a_Deduire_estimation,
          "CLIENTNAME":result.NomClient,
          "INSTALLATIONCODE":result.Compte,
          "COMPTE_ID":this.user_form1.value.compte_paiement,
          "SOCIETE_ID":this.result[0].ENDROIT_CREATION=="GUICHET"?this.result[0].SOCIETE_ID:sessionStorage.getItem("SOCIETE_ID"),
          "ANNEE":result.Annee,
          "MOIS":result.Mois,
          "NUMEROCLIENT":result.NumeroClient,
          "ID_USER":this.result[0].ENDROIT_CREATION=="GUICHET"?this.ID:sessionStorage.getItem("ID"),
          "USER_ID":this.result[0].ENDROIT_CREATION=="GUICHET"?this.ID:sessionStorage.getItem("ID"),
          "STATUT":type,
          "COMMENTAIRE":this.user_form2.value.comentaire,
          "FIN":"OUI"

        }

        this.validation_facture(json)
    }else{
      this.dialogService.messageDialog({
        title: 'Message',
        message: 'ECHEC! VEILLEZ ENTRER VOTRE RAISON D\'ANNULATION',
        cancelText: 'OK',
      }) 
    }
  }
}

  validation_facture(json,confrimation=false){
    if(this.user_form1.value.compte_paiement){

      console.log(json)
        this.approot.progressBar=true;
          this.regidesoService.modifier_facture(json).subscribe
          (res=>{
            if(confrimation)res.message="PAIEMENT FACTURE FAIT AVEC SUCCES"
            console.log(res)
            if(json.STATUT==1) var msg=" a validé le paiement de facture REGIDESO "
            else var msg=" a annulé le paiement de facture REGIDESO "
            this.send_mail(msg)
            
              this.facture_trouve=false
              this.dialogService.messageDialog({
                title: 'Message',
                message: res.message,
                cancelText: 'OK',
              }) 

              console.log(json.STATUT,json.FIN)

            

              this.approot.progressBar=false;
               if(!confrimation)this.redirect(json,confrimation)

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
        message: 'ECHEC! VOUS N\'AVEZ PAS DROIT POUR L\'INITIATION DES FACTURES',
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
    var societe_id=sessionStorage.getItem("SOCIETE_ID")?sessionStorage.getItem("SOCIETE_ID"):this.result[0].SOCIETE_ID
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

   redirect(json,confrimation=false){

      if((json.STATUT==1)&&(json.FIN=="OUI")){
        // this.router.navigate(['/piece'], { queryParams: {ID:json.ID, TYPE:1}});
        this.prepare_pdf(json.ID)
        // this.router.navigate(['/facture/factures']);
      }else if((json.STATUT==1)&&(json.FIN=="NON")){
        this.router.navigate(['/facture/paiement']);
      }else if(json.STATUT==2){
        this.router.navigate(['/facture/paiement_annule']);
      }else{
        this.router.navigate(['/facture/paiement']);
      }

  }

  send_mail(msg1){
    
    var users_mail=""
    if(this.users)
    this.users.forEach(element => {
      users_mail+=element.EMAIL+","
    });

    // var msg1=" a initié le paiemnt de la facture eau de la REGIDESO "
    if(this.result[0].ENDROIT_CREATION=="GUICHET")
      var msgs="L'utilisateur <b>"+this.usersession.data.NOM+" "+this.usersession.data.PRENOM+"</b> "+msg1+"dans le portail de BANCOBU du service REGIDESO-WEB PORTAL. Veuillez accèder à la page <a href='"+this.connexion.portal+"'>"+this.connexion.portal+"</a>  pour plus de detail "
  else  var msgs="L'utilisateur <b>"+sessionStorage.getItem("NAME")+" "+sessionStorage.getItem("LASTNAME")+"</b> "+msg1+"dans le portail de BANCOBU du service REGIDESO-WEB PORTAL. Veuillez accèder à la page  <a href='"+this.connexion.portal+"'>"+this.connexion.portal+"</a>  pour plus de detail "
  

    var json_email={
      "from":"notification-regideso-web-portal-service@bancobu.com",
      "to":users_mail,
      "cc":"",
      "subject":"Validation Paiement",
      "attachments":"",
      "msg":msgs,
    }
  
        this.regidesoService.sendMail(json_email).subscribe
        (res2=>{
            console.log(res2)

            return
  
        },
        error=>{
          console.log(error)
        
        })
  }

  prepare_pdf(id){

    this.approot.progressBar=true;
    this.regidesoService.pdf_facture(id,1).subscribe
    (res=>{

      if(res.response=="ok"){
        this.router.navigate(['/piece'], { queryParams: {ID:id,TYPE:1 }});
      }else{
        console.log("PRPBLEME SERVEUR")
      }


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
}
