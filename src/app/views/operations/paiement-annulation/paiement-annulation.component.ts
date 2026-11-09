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
  selector: 'app-paiement-annulation',
  templateUrl: './paiement-annulation.component.html',
  styleUrls: ['./paiement-annulation.component.scss']
})
export class PaiementAnnulationComponent implements OnInit {

  @ViewChild(DataTableDirective, {static: false})
  
  dtElement: DataTableDirective;
  dtTrigger = new Subject();

  user_form=new FormGroup({
    compte:new FormControl('',Validators.required),
   
    
   })
  
   dtOptions_actif: {};

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

    var id_societe=sessionStorage.getItem("SOCIETE_ID")?sessionStorage.getItem("SOCIETE_ID"):0
  
    this.dtOptions_actif = {

      ajax: {
                // url:this.connexion.base_url+"enoti/transaction_par_periode?date1=&&date2=&&Type=",
                url:this.connexion.base_url+"redigeso_web_portal/facture_payes?SOCIETE_ID="+id_societe+"&STATUT=2",
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
        title: 'Reference',
        data: 'FACTUREREFERENCE'
      },
      // {
      //   title: 'ID OPERATION',
      //   data: 'OPERATION_ID'
      // },{
      //   title: 'ID TRANS',
      //   data: 'TRANS_ID'
      // },
      {
        title: 'Montant',
        data: 'MONTANT'
      },{
        title: 'Compte de paiement',
        data: 'COMPTE'
      },{
        title: 'Raison social',
        data: 'ENTITE'
      },
      // {
      //   title: 'CODE RECU',
      //   data: 'CODERECU'
      // },
      {
        title: 'Nom client',
        data: 'CLIENTNAME'
      },{
        title: 'Code d\'installation',
        data: 'INSTALLATIONCODE'
      },{
        title: 'Date',
        data: 'DATETIME'
      },
      // {
      //   title: 'VALIDATION',
      //   data: 'NOMBRE'
      // },
      // {
      //   title: 'NIVEAU DE VALIDATION',
      //   data: 'NIVEAU'
      // },
      {
        title: 'Année',
        data: 'ANNEE'
      }
      ,{
        title: 'Mois',
        data: 'MOIS'
      }
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
  //   $(document).on( 'click', '.consulte_facture', function (event) {
     

  //     var id=$(this).attr('id').split("///")
  //     // var id=$(this).attr('id')
      
  //     if (id[0]=="mod") { 
  //       // self.research();
      
  //       self.router.navigate(['/facture/paiement_historique'], { queryParams: {id:id[1] }});
  //     }
      
  
  //     event.stopImmediatePropagation();
     
  // } );
  }
  

  
}
