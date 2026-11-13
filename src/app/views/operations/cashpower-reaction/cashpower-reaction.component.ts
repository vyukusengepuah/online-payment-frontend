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
  selector: 'app-cashpower-reaction',
  templateUrl: './cashpower-reaction.component.html',
  styleUrls: ['./cashpower-reaction.component.scss']
})
export class CashpowerReactionComponent implements OnInit {
  @ViewChild('largeModal') public largeModal: ModalDirective;
  @ViewChild('largeModalValidation') public largeModalValidation: ModalDirective;
  @ViewChild('largeModalAnullation') public largeModalAnullation: ModalDirective;

  isSubmitting=false

  usersession=JSON.parse(sessionStorage.getItem('usersession'))
  //  console.log(usersession)
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
   user_form2=new FormGroup({
    comentaire:new FormControl('',Validators.required),
    
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
// this.prepare_pdf(243)
   

    this.approot.progressBar=true;
    var id_u=sessionStorage.getItem("ID")?sessionStorage.getItem("ID"):"XXX"
      // this.regidesoService.getCashpowerInfos(this.activatedRoute.snapshot.queryParams.id,id_u).subscribe
    console.log(id_u)
      this.regidesoService.getCashpowerInfos(this.activatedRoute.snapshot.queryParams.id,id_u).subscribe
      (res=>{
        this.approot.progressBar=false;
        console.log(res)
        if(!res.success){
          if(res.message=="exist")this.dialogService.messageDialog({
              title: 'Message',
              message: 'Echec! Vous avez deja fait votre validation',
              cancelText: 'OK',
            }) 
             this.router.navigate(['/cashpower/encours']);
        }else{

          console.log(res.result)
        this.DATETIME= res.result[0].DATETIME
        // var date =new Date(this.DATETIME);
        // console.log(date)
        this.approot.progressBar=false;
        this.user_form.get("compteur").setValue(res.result[0].COMPTEURCODE);
        this.user_form.get("type").setValue(res.result[0].TYPE);
        this.user_form1.get("compte_paiement").setValue(parseInt(res.result[0].COMPTE_ID));
        this.is_montant=false
        this.is_kwh=false
        if(res.result[0].TYPE=="1"){
        this.user_form.get("Montant").setValue(res.result[0].MONTANT);
        this.is_montant=true
        this.select_type({value:1})
        }
        if(res.result[0].TYPE=="2"){
        this.user_form.get("KWH").setValue(res.result[0].CONSOMMATION);
        this. is_kwh=true
        this.select_type({value:2})
        }
        this.result=res.result
        this.research()
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
    this.regidesoService.compteur_actif_par_societe(societe_id,2).subscribe
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
    // console.log(this.result)
    if((this.result[0].ENDROIT_CREATION=="GUICHET"&&this.ID>0)||(sessionStorage.getItem("NIVEAU")=="2"||sessionStorage.getItem("NIVEAU")=="3")){
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
            console.log(json)
            this.regidesoService.prepay(json).subscribe
            (res=>{

              
              this.approot.progressBar=false;
              console.log(res)
              if(res.CodeErreur=="0"){
                this.tableau_facture=[{KEY:"CODE COMPTEUR",VALUE:this.result[0].COMPTEURCODE}]
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
                    && key1!='MONTANTFNE')
                  this.tableau_facture.push({KEY:key9,VALUE:res[key]})
                    
                })
                this.tableau_facture.push({KEY:"MANTANT SAISI",VALUE:this.user_form.value.Montant})
                var compte = this.comptes_paiement.find(({ COMPTE_ID }) => COMPTE_ID === this.user_form1.value.compte_paiement);

                this.tableau_facture.push({KEY:"COMPTE DE PAIEMENT",VALUE:compte.COMPTE})
                this.tableau_facture.push({KEY:"AGENCE",VALUE:compte.BRANCH_CODE})
              }else{
                this.is_confirmation=false
                this.dialogService.messageDialog({
                  title: 'Message',
                  message: 'ECHEC! VOTRE NUMERO COMPTEUR N\'EST PAS TROUVE',
                  cancelText: 'OK',
                }) 
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
    }else{
      this.dialogService.messageDialog({
        title: 'Message',
        message: "ECHEC!VOUS N'AVEZ PAS DROIT DE VALIDATION DES ACHATS CASHPOWER",
        cancelText: 'OK',
      }) 
    }
  }

  keyup(){
    this.user_form1.get("compte_paiement").setValue("");
    this.is_confirmation=false
  }

  enregistrer_cashpower(){
    if(this.user_form1.value.compte_paiement){


      var  date=new Date()
      var dt1=new Date(this.DATETIME)
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
        "SOCIETE_ID":this.result[0].ENDROIT_CREATION=="GUICHET"?this.result[0].SOCIETE_ID:sessionStorage.getItem("SOCIETE_ID"),
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
        "ID_USER":this.result[0].ENDROIT_CREATION=="GUICHET"?this.ID:sessionStorage.getItem("ID"),
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

              this.router.navigate(['/cashpower/encours']);

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
    this.approot.progressBar=true;
    var societe_id=sessionStorage.getItem("SOCIETE_ID")?sessionStorage.getItem("SOCIETE_ID"):this.result[0].SOCIETE_ID
    console.log(societe_id)
    this.regidesoService.getSocieteAccounts(societe_id).subscribe
    (res1=>{
        console.log(res1)

        this.comptes_paiement=res1
        
        this.approot.progressBar=false;
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


  modifiier_cashpower(){
    if(this.user_form1.value.compte_paiement){
 
      var json={
        "ID":this.activatedRoute.snapshot.queryParams.id,
        "COMPTEURCODE":this.user_form.value.compteur,
        "NUMERO_DE_CAISSE":this.connexion.Numero_de_Caisse,
        "TYPE":this.user_form.value.type,
        "MODE":this.connexion.Mode,
        "MONTANT":this.user_form.value.Montant,
        "CONSOMMATION":this.compteur_research.Consommation,
        "TYPE_DE_PAIEMENT":this.user_form.value.type=="1"?"MONTANT":"KWH",
        "TELEPHON":"",
        "COMPTE_ID":this.user_form1.value.compte_paiement,
        // "DATETIME":"",
        "SOCIETE_ID":this.result[0].ENDROIT_CREATION=="GUICHET"?this.result[0].SOCIETE_ID:sessionStorage.getItem("SOCIETE_ID"),
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
        "ID_USER":this.result[0].ENDROIT_CREATION=="GUICHET"?this.ID:sessionStorage.getItem("ID"),
        "FIN":"NON"
        }
        
        this.approot.progressBar=true;
          this.regidesoService.modifier_cashpower(json).subscribe
          (res=>{

            console.log(res)
            
              this.facture_trouve=false
              this.dialogService.messageDialog({
                title: 'Message',
                message: res.message,
                cancelText: 'OK',
              }) 
              this.send_mail(" a modifié l'achat CASHPOWER ")

              this.router.navigate(['/cashpower/encours']);

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
  
    var json={}
    if(type==1){
  
      // console.log(this.result[0],sessionStorage.getItem("NIVEAU"))
  
      // if(sessionStorage.getItem("NIVEAU")==this.result[0].MAX_NIVEAU){
        if((sessionStorage.getItem("NIVEAU")=="2"||sessionStorage.getItem("NIVEAU")=="3")||(this.result[0].ENDROIT_CREATION=="GUICHET")){
  
        
      var  date=new Date()
      var dt1=new Date(this.DATETIME)
      var year1 = dt1.getFullYear();
      var month1 = dt1.getMonth();
      var date1= dt1.getDate();
      var h1= dt1.getHours()
      var m1= dt1.getMinutes();
      var s1= dt1.getSeconds();
      var TRX_DI="TRX"+year1+("0" + (month1 + 1)).slice(-2)+("0" + date1 ).slice(-2)+("0" + h1 ).slice(-2)+("0" + m1 ).slice(-2)+("0" + s1 ).slice(-2)+"_"+this.user_form.value.compteur

      
         json={
          "ID":this.activatedRoute.snapshot.queryParams.id,
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
          "STATUT":type,
          // "DATETIME":"",
          "SOCIETE_ID":this.result[0].ENDROIT_CREATION=="GUICHET"?this.result[0].SOCIETE_ID:sessionStorage.getItem("SOCIETE_ID"),
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
          "ID_USER":this.result[0].ENDROIT_CREATION=="GUICHET"?this.ID:sessionStorage.getItem("ID"),
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
                  "description": "Cashpower@"+compte.COMPTE+"@"+this.result[0].COMPTEURCODE,
                  "destinationCurrency": "BIF",
                  "status": "CREATED",
                  "txn_ref": "",
                  "external_id": TRX_DI,
                  "ft_amount": this.result[0].MONTANTPAYE,
                  "txn_date": date,
                  "updated_at": date,
                  "debit_account":compte.COMPTE,
                  "debit_branch":res.result[0].BRANCH_CODE,
                  "trx_type":"CASHPOWER",
                  "compteur":this.result[0].COMPTEURCODE,
                  "code_installation":"",
                  "consommation":"",
                  "operation_id":TRX_DI,
                  // "response_code": "string",
                  // "response_message": "string"
                }
    
                console.log(json_regideso)
    
                this.approot.progressBar=true;
                this.regidesoService.reserve(json_regideso).subscribe
                  (resus=>{
                    console.log(resus)
                    if(resus.response_code!="200"){
                      this.approot.progressBar=false;
                      this.dialogService.messageDialog({
                        title: 'Message',
                        message: 'ECHEC! PROBLEME DE SERVICE DE TRANSACTION/RESERVE, '+resus.response_message,
                        cancelText: 'OK',
                      })
                      
                      return
                    }
                    
                    this.regidesoService.regideso(resus).subscribe
                    (resus1=>{
                      console.log(resus1)
                      
                                  const result_token1 = resus1.metadata.find(({ key }) => key === "TOKEN1");
                                  const result_token2 = resus1.metadata.find(({ key }) => key === "TOKEN2");
                                  const result_token3 = resus1.metadata.find(({ key }) => key === "TOKEN3");
                                  const result_RECEIPT_NO= resus1.metadata.find(({ key }) => key === "RECEIPT_NO");
                                  const result_AMOUNT_TO_PAY= resus1.metadata.find(({ key }) => key === "AMOUNT_TO_PAY");
                                  console.log(res)
                                  json['TOKEN1']=result_token1.value
                                  json['TOKEN2']=result_token2.value
                                  json['TOKEN3']=result_token3.value
                                  json['RECEIPT_NO']=result_RECEIPT_NO.value
                                  json['COMMENTAIRE']=resus1.response_message
                                  json['MONTANT_REPONSE']=result_AMOUNT_TO_PAY?result_AMOUNT_TO_PAY.value:""
                                  // const match = resus1.response_message.match(/AMOUNT\s*:\s*(\d+)/);

                                  // const amountPart =  resus1.response_message.split("AMOUNT :")[1];
                                  // if (amountPart) {
                                  //     const amount = amountPart.split(",")[0].trim();
                                  //     console.log(amount); // "9828"
                                  //     json['MONTANT_REPONSE']=result_AMOUNT_TO_PAY.value
                                  // }
                                 

                                  console.log(json)
                                  this.validation_cashpower(json,true)
                                  if(result_AMOUNT_TO_PAY)
                                  resus1.amount=result_AMOUNT_TO_PAY.value
                                  // resus1.amount=result_AMOUNT_TO_PAY?result_AMOUNT_TO_PAY.value:""

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
                                "FACTURE_CASHPOWER":2,//1FACTURE-2CASHPOWER
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
                                  // console.log(res.metadata) 
                                  this.redirect(json,true)
                                  
                                },
                                  error=>{
                                    if(res.error=="Gateway Timeout")var message="ECHEC! LE TEMPS D'EXECUTION DU GATEWAY EST DEPASSE, VEUILLEZ REESSAYER SVP!"
                                    else var message="ECHEC! PROBLEME SERVEUR AU SERVICE DE PAIEMENT, VEUILLEZ REESSAYER SVP!"
                                    // this.dialogService.messageDialog({
                                    //   title: 'Message',
                                    //   message: message,
                                    //   cancelText: 'OK',
                                    // }) 
                                    console.log(error)
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
                this.validation_cashpower(json)
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
          "STATUT":type,
          // "DATETIME":"",
          "SOCIETE_ID":this.result[0].ENDROIT_CREATION=="GUICHET"?this.result[0].SOCIETE_ID:sessionStorage.getItem("SOCIETE_ID"),
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
          "ID_USER":this.result[0].ENDROIT_CREATION=="GUICHET"?this.ID:sessionStorage.getItem("ID"),
          "FIN":"NON"
          }
  
        if((sessionStorage.getItem("NIVEAU")>this.result[0].GRAND_NIVEAU)||(this.result[0].ENDROIT_CREATION=="GUICHET")){
          // console.log(sessionStorage.getItem("NIVEAU"),this.result[0].GRAND_NIVEAU)
          this.validation_cashpower(json)
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
            "ID_USER":sessionStorage.getItem("ID"),
            "STATUT":type,
            "COMMENTAIRE":this.user_form2.value.comentaire,
            "FIN":"OUI"
  
          }
  
          this.validation_cashpower(json)
      }else{
        this.dialogService.messageDialog({
          title: 'Message',
          message: 'ECHEC! VEILLEZ ENTRER VOTRE RAISON D\'ANNULATION',
          cancelText: 'OK',
        }) 
      }
    }
  }

  validation_cashpower(json,confrimation=false){
    if(this.user_form1.value.compte_paiement){

      console.log(json)
      // return
        this.approot.progressBar=true;
          this.regidesoService.modifier_cashpower(json).subscribe
          (res=>{

            console.log(res)
            if(confrimation)res.message="Achat cashpower fait avec succes"
            if(json.STATUT==1) var msg=" a validé l'achat CASHPOWER "
            else var msg=" a annulé l'achat CASHPOWER "
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

  redirect(json,confrimation=false){
     if((json.STATUT==1)&&(json.FIN=="OUI")){
                // piece?ID=122&TYPE=1
                // this.router.navigate(['/piece'], { queryParams: {ID:json.ID, TYPE:2}});
                this.prepare_pdf(json.ID)
                // this.router.navigate(['/cashpower/validation']);
              }else if((json.STATUT==1)&&(json.FIN=="NON")){
                this.router.navigate(['/cashpower/encours']);
              }else if(json.STATUT==2){
                this.router.navigate(['cashpower/annulation']);
              }else{
                this.router.navigate(['/cashpower/encours']);
              }

  }

  send_mail(msg1){
    
    var users_mail=""
    this.users.forEach(element => {
      users_mail+=element.EMAIL+","
    });

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
    this.regidesoService.pdf_facture(id,2).subscribe
    (res=>{

      if(res.response=="ok"){
        this.router.navigate(['/piece'], { queryParams: {ID:id,TYPE:2 }});
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

  anable_button(){
    const btn = document.getElementById('valider_cashpower') as HTMLButtonElement;
    btn.disabled = false;
  }
}
