import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { DefaultLayoutComponent } from '../../../containers';
import { ConnexionService } from '../../../services/connexion.service';
import { DialogService } from '../../../services/dialog.service';
import { InfoService } from '../../../services/info.service';
import { RegidesoService } from '../../../services/regideso.service';
@Component({
  selector: 'app-compteur-non-valide',
  templateUrl: './compteur-non-valide.component.html',
  styleUrls: ['./compteur-non-valide.component.scss']
})
export class CompteurNonValideComponent implements OnInit {

  @ViewChild(DataTableDirective, {static: false})
  
  dtElement: DataTableDirective;
  dtTrigger = new Subject();

  user_form=new FormGroup({
    compte:new FormControl('',Validators.required),
   
    
   })
  
   dtOptions_actif: {};
  bg: string;
  title: string;
  json_societe: any;
  json_compteurAll: any;
  json_compteur: any;

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

  
console.log(this.activatedRoute.snapshot.url[0].path)
var statut=null

var les_colones=[{
  title: 'Compteur',
  data: 'CODE'
},

{
  title: 'Type de service',
  data: 'TYPE'
},
{
  title: 'Client',
  data: 'PROPRIETAIRE'
},
// {
//   title: 'VALIDATIONS PREVUS',
//   data: 'PREVUS'
// },
{
  title: 'Validation restantes',
  data: 'REST'
},{
  title: 'option',
  data: 'ACTION'
}]
var NIVEAU= sessionStorage.getItem('NIVEAU')  

if(NIVEAU=="1"){
  // this.navItems=navItems.
  les_colones.splice(4, 1);
}
if(this.activatedRoute.snapshot.url[0].path=='non_valide') {
  statut=0
  this.bg='warning'
  this.title=' en attente de validations'
  
}
if(this.activatedRoute.snapshot.url[0].path=='deja_valide') {
  statut=1
  this.bg='success'
  this.title=' deja validé'

  les_colones=[{
    title: 'Compteur',
    data: 'CODE'
  },
  
  {
    title: 'Type de service',
    data: 'TYPE'
  },
  {
    title: 'Client',
    data: 'PROPRIETAIRE'
  }]
}
if(this.activatedRoute.snapshot.url[0].path=='annules') {
  statut=2
  this.bg='danger'
  this.title=' annulés'

  les_colones=[{
    title: 'Compteur',
    data: 'CODE'
  },
  
  {
    title: 'Type de service',
    data: 'TYPE'
  },
  {
    title: 'Client',
    data: 'PROPRIETAIRE'
  }]
}





    var id_societe=sessionStorage.getItem("SOCIETE_ID")?sessionStorage.getItem("SOCIETE_ID"):0
  
    this.dtOptions_actif = {

      ajax: {
                // url:this.connexion.base_url+"enoti/transaction_par_periode?date1=&&date2=&&Type=",
                url:this.connexion.base_url+"redigeso_web_portal/list_compteur?SOCIETE_ID="+id_societe+"&STATUT="+statut,
                type:"GET",
                headers: {

                }
            },
      columns: les_colones,
    // serverSide: true,
    processing: true,
    deferRender: true,
      blengthChange: false,
      responsive: true,
      "lengthMenu": [ [10, 25, 50, -1], [10, 25, 50, "All"] ],
      "language": {
                "sEmptyTable":     "Aucune donnée disponible dans le tableau",
                "sInfo":           "Affichage de l'élément _START_ à _END_ sur _TOTAL_ éléments",
                "sInfoEmpty":      "Affichage de l'élément 0 à 0 sur 0 élément",
                "sInfoFiltered":   "(filtré à partir de _MAX_ éléments au total)",
                "sInfoPostFix":    "",
                "sInfoThousands":  ",",
                "sLengthMenu":     "Afficher _MENU_ éléments",
                "sLoadingRecords": "Chargement...",
                "sProcessing":     "Traitement...",
                "sSearch":         "Rechercher :",
                "sZeroRecords":    "Aucun élément correspondant trouvé",
                "oPaginate": {
                    "sFirst":    "Premier",
                    "sLast":     "Dernier",
                    "sNext":     "Suivant",
                    "sPrevious": "Précédent"
                },
                "oAria": {
                    "sSortAscending":  ": activer pour trier la colonne par ordre croissant",
                    "sSortDescending": ": activer pour trier la colonne par ordre décroissant"
                },
                "select": {
                    "rows": {
                        "_": "%d lignes sélectionnées",
                        "0": "Aucune ligne sélectionnée",
                        "1": "1 ligne sélectionnée"
                    }
                }
            },
      // Declare the use of the extension in the dom parameter
      dom: 'lBfrtip',
      // Configure the buttons
      buttons: [
        // {extend: 'excel', title: self.title},
      ]
    };


    this.dtTrigger.next();

    var self = this;
    var msg=""
    var msg1=""
    var statut,cmpt,tpe
    $(document).on( 'click', '.compteurs_list', function (event) {
     

      var id=$(this).attr('id').split("-")
      // var id=$(this).attr('id')
      
      if (id[0]=="annule") { 
         statut=2
         msg=" Voulez vous annuler cet enregistrement?"
         msg1="a annulé l'enregistrement d'un compteur "
      }else  if (id[0]=="reactive") { 
        statut=0
        msg="VOULEZ VOUS REACTIVER CE COMPTEUR?"
        msg1="a réactiver l'enregistrement d'un compteur "
     }else{
         statut=1
         msg="Voulez-vous valider cet enregistrement?"
         msg1="a validé l'enregistrement d'un compteur "
      }
      var conf=self.dialogService.confirmDialog({
        title:'Message',
        message:msg,
        confirmText:"OUI",
        cancelText: 'NON',
      }) 

      // console.log(conf)
      // if(confirm(msg)){
      // self.traite(statut,id[1],id[2])
      // }
      cmpt=id[1]
      tpe=id[2]

      
  
      event.stopImmediatePropagation();
     
  } );
  $(document).on( 'click', '.confirm', function (event) {

    // console.log(statut,cmpt,tpe)
    self.traite(statut,cmpt,tpe,msg1)
    event.stopImmediatePropagation();
  })
  
  
  }
  


  traite(statut,compteur,type,msg1){
    // var new_check=this.json_societe?this.json_societe.TYPE_VALIDATION=='1':false
    if(sessionStorage.getItem("NIVEAU")=="2"||sessionStorage.getItem("NIVEAU")=="3"){
      console.log(statut,compteur,type)
      this.approot.progressBar=true;


      

      var json={
        "SOCIETE_ID":sessionStorage.getItem("SOCIETE_ID"),
        "TYPE":type,
        "COMPTEUR":compteur,
        "STATUT":statut
      }

      this.approot.progressBar=true;
      this.regidesoService.reagir_ajout_compteur(json).subscribe
      (res=>{

        console.log(res)
        if(res.response=="non"){

          this.dialogService.messageDialog({
            title:'Message',
            message:res.message,
            cancelText: 'OK',
          }) 

        }else{
          
              var users_mail=""
              res.users.forEach(element => {
                users_mail+=element.EMAIL+","
              });

              var json_email={
                "from":"notification-regideso-web-portal-service@bancobu.com",
                "to":users_mail,
                "cc":"",
                "subject":"Validation compteur",
                "attachments":"",
                "msg":"L'utilisateur <b>"+sessionStorage.getItem("NAME")+" "+sessionStorage.getItem("LASTNAME")+"</b> "+msg1+"dans le portail de BANCOBU du service REGIDESO-WEB PORTAL. Veuillez accèder à la page  <a href='"+this.connexion.portal+"'>"+this.connexion.portal+"</a> pour plus de detail",
              }
            
                  this.regidesoService.sendMail(json_email).subscribe
                  (res2=>{
                      console.log(res2)
        
                      return
            
                  },
                  error=>{
                    console.log(error)
                  
                  })
        
        
              
                this.dialogService.messageDialog({
                  title: 'Message',
                  message: "Enregistrement avec succès",
                  cancelText: 'OK',
                }) 

                location.reload()
                // this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
                //   this.router.navigate(['/compteur/non_valide']);
                // });

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


    
    }else{
      this.dialogService.messageDialog({
        title: 'Message',
        message: "vous n'avez de droit de validation compteur",
        cancelText: 'OK',
      }) 
    }
  }
  
}
