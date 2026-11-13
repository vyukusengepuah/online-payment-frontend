import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { DefaultLayoutComponent } from '../../../containers';
import { ConnexionService } from '../../../services/connexion.service';
import { DialogService } from '../../../services/dialog.service';
import { InfoService } from '../../../services/info.service';
import { RegidesoService } from '../../../services/regideso.service';

@Component({
  selector: 'app-cashpower-validation',
  templateUrl: './cashpower-validation.component.html',
  styleUrls: ['./cashpower-validation.component.scss']
})
export class CashpowerValidationComponent implements OnInit {
  @ViewChild('largeModal') public largeModal: ModalDirective;
  @ViewChild(DataTableDirective, {static: false})
  

  usersession=JSON.parse(sessionStorage.getItem('usersession'))
  //  console.log(usersession)
   permission_url=this.usersession?(this.usersession.hasOwnProperty("data")?this.usersession.data.paths:{}):{}
   ID=this.usersession?(this.usersession.hasOwnProperty('data')?this.usersession.data.ID:0):0

  dtElement: DataTableDirective;
  dtTrigger = new Subject();

  user_form=new FormGroup({
    compte:new FormControl('',Validators.required),
   
    
   })
  
   dtOptions_actif: {};
  facture_trouve: boolean;
  owner: any;
  factures: any;
  tableau_facture: any[];
  message: string;

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
    if(!sessionStorage.getItem("refresh_f")){
      sessionStorage.setItem("refresh_f","yes");
      location.reload()
 
    }else{
      sessionStorage.removeItem('refresh_f');
    }

    var id_societe=sessionStorage.getItem("SOCIETE_ID")?sessionStorage.getItem("SOCIETE_ID"):0
  
    console.log(id_societe)
  
    this.dtOptions_actif = {

      ajax: {
                // url:this.connexion.base_url+"enoti/transaction_par_periode?date1=&&date2=&&Type=",
                url:this.connexion.base_url+"redigeso_web_portal/cashpower_payes?SOCIETE_ID="+id_societe+"&STATUT=1&USER_ID="+this.ID,
                type:"GET",
                headers: {

                }
            },
      columns: [{
        title: '#',
        data: 'NUMERO'
      },{
        title: 'Option',
        data: 'OPTION'
      },{
        title: 'Compteur',
        data: 'COMPTEURCODE'
      },
      {
        title: 'Token1',
        data: 'TOKEN1'
      },
      {
        title: 'Token2',
        data: 'TOKEN2'
      },
      {
        title: 'Token3',
        data: 'TOKEN3'
      },
      {
        title: 'Kwh',
        data: 'CONSOMMATION'
      },
      {
        title: 'Montant saisi',
        data: 'MONTANT'
      },{
        title: 'Mntant payé',
        data: 'MONTANTPAYE'
      },{
        title: 'Compte de paiement',
        data: 'COMPTE'
      },
      {
        title: 'Raison social',
        data: 'ENTITE'
      },
      {
        title: 'Nom client',
        data: 'CLIENTNAME'
      },{
        title: 'Date',
        data: 'DATETIME'
      },
      // {
      //   title: 'Validation restante',
      //   data: 'NOMBRE'
      // },
      // {
      //   title: 'NIVEAU DE VALIDATION',
      //   data: 'NIVEAU'
      // }
    ],
    serverSide: true,
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

    $(document).on( 'click', '.cashpower', function (event) {
     

      var id=$(this).attr('id').split("///")
      // var id=$(this).attr('id')
      
      if (id[0]=="mod") {
        // self.research();
      
        self.router.navigate(['/cashpower/reaction'], { queryParams: {id:id[1] }});
      }
      

      event.stopImmediatePropagation();
     
  } );

  $(document).on( 'click', '.consulter_cashpower', function (event) {
     

    var id=$(this).attr('id').split("///")
    // var id=$(this).attr('id')
    
    if (id[0]=="mod_c") {
      // self.research();
      console.log(id)
    
      self.router.navigate(['/cashpower/historique'], { queryParams: {id:id[1] }});
    }
    if (id[0]=="print_c") {
      self.prepare_pdf(id[1])
    }

    event.stopImmediatePropagation();
   
} );

  }
  

  // research(){
  //   this.facture_trouve=false
  //   var json={
  //                 "Compte":this.user_form.value.compte
  //             }

  //   if(this.user_form.controls.compte.status=='VALID'){
      

  //         this.approot.progressBar=true;
  //         this.regidesoService.checkbills(json).subscribe
  //         (res=>{

  //           console.log(res)
  //           this.owner=res.DR_WS_6_FactureNonPayee.rowset.length>0?res.DR_WS_6_FactureNonPayee.rowset[0].NomClient:""
  //           this.factures=res.DR_WS_6_FactureNonPayee.rowset
  //           this.approot.progressBar=false;
  //           if(res.DR_WS_6_FactureNonPayee.rowset.length>0)this.facture_trouve=true
  //           else{
  //             this.facture_trouve=false
  //             this.dialogService.messageDialog({
  //               title: 'Message',
  //               message: 'ECHEC! AUCUNE FACTURE TROUVE POUR CETTE NUMERO D\'INSTALLATION',
  //               cancelText: 'OK',
  //             }) 
  //           }

  //         },
  //         error=>{
  //           this.dialogService.messageDialog({
  //             title: 'Message',
  //             message: 'ECHEC! PROBLEME SERVEUR',
  //             cancelText: 'OK',
  //           }) 
  //           console.log(error)
  //           this.approot.progressBar=false;
  //         })

  //   }
  
  // }

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
  //       this.largeModal.show()

  //         this.message="Cette facture n'est pas enregistrée, voulez-vous initier son paiement?"
  //     }else{
  //       this.dialogService.messageDialog({
  //         title: 'Message',
  //         message: 'ECHEC! VEUILLEZ D\'ABORD SELECTIONNER UNE FACTURE',
  //         cancelText: 'OK',
  //       }) 
  //     }

  // }


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
  
}
