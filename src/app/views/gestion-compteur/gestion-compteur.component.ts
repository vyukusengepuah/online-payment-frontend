import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { DefaultLayoutComponent } from '../../containers';
import { ConnexionService } from '../../services/connexion.service';
import { DialogService } from '../../services/dialog.service';
import { InfoService } from '../../services/info.service';
import { RegidesoService } from '../../services/regideso.service';

@Component({
  selector: 'app-gestion-compteur',
  templateUrl: './gestion-compteur.component.html',
  styleUrls: ['./gestion-compteur.component.scss']
})
export class GestionCompteurComponent implements OnInit {


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

  }


  research(){
    var new_check=this.json_societe?this.json_societe.TYPE_VALIDATION=='1':false
    // if(sessionStorage.getItem("NIVEAU")=="1"||sessionStorage.getItem("NIVEAU")=="3"||new_check){
      if(sessionStorage.getItem("NIVEAU")=="1"||sessionStorage.getItem("NIVEAU")=="3"){
      this.compteur_research=null
      this.facture_trouve=false
      this.is_confirmation=false
      if(
        this.user_form.controls.compteur.status=='VALID'&&
        this.user_form.controls.type.status=='VALID'
      ){
        if(this.user_form.value.type=='2')this.research_cashpower()
          else this.research_bill()
      }

      
    }else{
      this.dialogService.messageDialog({
        title: 'Message',
        message: "Vous n'avez pas droit d'intitiation des ajouts compteur",
        cancelText: 'OK',
      }) 
    }
  
  }

  research_cashpower(){
    
    this.compteur=null
    this.type=null
    this.proprietaire=null
      // if(this.user_form.value.type=='1')
      var j={"CompteurCode":this.user_form.value.compteur,"Numero_de_Caisse":this.connexion.Numero_de_Caisse,"Type":'1',"Mode":this.connexion.Mode,"Montant":33100,"Type_de_Paiement":"WEB"}
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
                  && key1!='CONSOMMATION'
                  && key1!='MONTANTPAYE'
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

            
            this.owner=res.DR_WS_6_FactureNonPayee.rowset.length>0?res.DR_WS_6_FactureNonPayee.rowset[0].NomClient:""
            this.factures=res.DR_WS_6_FactureNonPayee.rowset
            this.approot.progressBar=false;
            console.log(res)
            if(res.DR_WS_6_FactureNonPayee.rowset.length>0){
              this.compteur=this.user_form.value.compteur
              this.type=this.user_form.value.type
              this.proprietaire=res.DR_WS_6_FactureNonPayee.rowset[res.DR_WS_6_FactureNonPayee.rowset.length-1].NomClient
              console.log(this.json_compteurAll)
              
              const result = this.json_compteurAll.find(({ SOCIETE_ID,CODE,TYPE,STATUT }) => ((CODE === this.compteur)&&(TYPE===this.type)&&(SOCIETE_ID===sessionStorage.getItem("SOCIETE_ID"))&&(STATUT!="2")));

              console.log(this.json_compteurAll,result)
              if(!result)
                this.Consulter()
              else 
              this.dialogService.messageDialog({
                title: 'Message',
                message: "Ce compteur ou code d'installation existe deja",
                cancelText: 'OK',
              }) 

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

  initier_ajout(){
  console.log(this.compteur,this.type)
    if(this.compteur&&this.type){

      var json={
        "SOCIETE_ID":sessionStorage.getItem("SOCIETE_ID"),
        "TYPE":this.type,
        "COMPTEUR":this.compteur,
        "PROPRIETAIRE":this.proprietaire,
      }

      this.approot.progressBar=true;
      this.regidesoService.initier_ajout_compteur(json).subscribe
      (res=>{

        if(res.response=="non"){
          this.dialogService.messageDialog({
            title: 'Message',
            message: res.message,
            cancelText: 'OK',
          }) 

          this.approot.progressBar=false;
          
          return
        }else{

              console.log(res)
              var users_mail=""
              res.users.forEach(element => {
                users_mail+=element.EMAIL+","
              });

              var json_email={
                "from":"notification-regideso-web-portal-service@bancobu.com",
                "to":users_mail,
                "cc":"",
                "subject":"Initiation ajout compteur",
                "attachments":"",
                "msg":"L'utilisateur <b>"+sessionStorage.getItem("NAME")+" "+sessionStorage.getItem("LASTNAME")+"</b> a initié l'enregistrement d'un compteur dans le portail de BANCOBU du service REGIDESO-WEB PORTAL. Veuillez accèder à la page  <a href='"+this.connexion.portal+"'>"+this.connexion.portal+"</a> pour plus de detail",
              }
            
                  this.regidesoService.sendMail(json_email).subscribe
                  (res2=>{
                      console.log(res2)
        
                      return
            
                  },
                  error=>{
                    console.log(error)
                  
                  })
        
        
              
              
                this.facture_trouve=false
                this.dialogService.messageDialog({
                  title: 'Message',
                  message: "Ajout du compteur/code d'installation avec succès",
                  cancelText: 'OK',
                }) 

                setTimeout(() => {
                  this.router.navigate(['/compteur/non_valide']);

                this.approot.progressBar=false;
                }, 3000);
          
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


    }else{
      this.dialogService.messageDialog({
        title: 'Message',
        message: "Le compteur ou code d'installation introuvable",
        cancelText: 'OK',
      }) 
    }
  }
}


