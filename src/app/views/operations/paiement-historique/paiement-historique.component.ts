import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DefaultLayoutComponent } from '../../../containers';
import { DialogService } from '../../../services/dialog.service';
import { RegidesoService } from '../../../services/regideso.service';

@Component({
  selector: 'app-paiement-historique',
  templateUrl: './paiement-historique.component.html',
  styleUrls: ['./paiement-historique.component.scss']
})
export class PaiementHistoriqueComponent implements OnInit {

  reference
  tableau_facture=[];
  infos: any;

  constructor(
    private approot:DefaultLayoutComponent,
    private regidesoService:RegidesoService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog,
    private dialogService: DialogService
  )  { }

  ngOnInit(): void {

    this.approot.progressBar=true;
    this.regidesoService.getFactureHistorique(this.activatedRoute.snapshot.queryParams.id).subscribe
    (res=>{

      console.log(res)
      this.reference=res.result[0]['FACTUREREFERENCE']

      this.infos=res.result

      this.Consulter(res.result[0])

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

  Consulter(object){
    this.tableau_facture=[]
    
        Object.keys(object).forEach(key => {
          // console.log(key + ' - ' + res[key]) // key - value
          var key1=""+key.toUpperCase()
          var key2=key1.replace("INSTALLATIONCODE","CODE D'INSTALLATION")
          var key3= key2.replace("NUMEROCLIENT","NUMERO CLIENT")
          var key4=key3.replace("FACTUREREFERENCE","NUMERO FACTURE")
          var key5= key4.replace("CLIENTNAME","NOM CLIENT")

          // console.log(key5)
          if(
            key1!='MONTANTPAYEE' && 
            key1!='ID_FACTURE' && 
            key1!='MODEFINALFLAG' && 
            key1!='STATUT' && 
            key1!='COMPTE_ID' && 
            key1!='SOCIETE_ID' && 
            key1!='ID_FACTURE_HISTO' && 
            key1!='ID_USER' && 
            key1!='ID' && 
            key1!='NAME' && 
            key1!='LASTNAME' && 
            key1!='PWD' && 
            key1!='SOCIETE_ID_1' && 
            key1!='EMAIL' && 
            key1!='RESET_PWD' && 
            key1!='ACTIF' && 
            key1!='TEL' && 
            key1!='NIVEAU' && 
            key1!='MONTANT_A_DEDUIRE_ESTIMATION')
          this.tableau_facture.push({KEY:key5,VALUE:object[key]})
            
        })


  }

}
