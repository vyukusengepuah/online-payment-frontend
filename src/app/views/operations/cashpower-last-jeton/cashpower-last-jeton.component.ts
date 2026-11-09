import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DefaultLayoutComponent } from '../../../containers';
import { InfoService } from '../../../services/info.service';
import { RegidesoService } from '../../../services/regideso.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { ConnexionService } from '../../../services/connexion.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogService } from '../../../services/dialog.service';

@Component({
  selector: 'app-cashpower-last-jeton',
  templateUrl: './cashpower-last-jeton.component.html',
  styleUrls: ['./cashpower-last-jeton.component.scss']
})
export class CashpowerLastJetonComponent implements OnInit {

  user_form=new FormGroup({
    compteur:new FormControl('',Validators.required)
   })
  compteur=[];
  tableau_token=[];

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
  ) { }

  ngOnInit(): void {

    this.getSocieteCompteur()
  }

  getSocieteCompteur(){
    // this.approot.progressBar=true;
    var societe_id=sessionStorage.getItem("SOCIETE_ID")?sessionStorage.getItem("SOCIETE_ID"):0
    console.log(societe_id)
    this.regidesoService.compteur_actif_par_societe(societe_id,2).subscribe
    (res1=>{
        console.log(res1.result)

        this.compteur=res1.result
        
        // this.approot.progressBar=false;
    },
    error=>{
      
      console.log(error)
      this.approot.progressBar=false;
    })

  }

  compteur_lastToken(){
    if(this.user_form.value.compteur){
      this.approot.progressBar=true;
      this.regidesoService.compteur_lastToken(this.user_form.value.compteur).subscribe
      (res1=>{
          console.log(res1)

          this.tableau_token=[]
        Object.keys(res1.result[0]).forEach(key => {
            
         
          this.tableau_token.push({KEY:key,VALUE:res1.result[0][key]})
            
        })
          
          
          this.approot.progressBar=false;
      },
      error=>{
        
        console.log(error)
        this.approot.progressBar=false;
      })
    }

  }

}
