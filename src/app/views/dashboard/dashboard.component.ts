import { AfterViewInit, ChangeDetectorRef, Component, Injectable, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { InfoService } from '../../services/info.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { DefaultLayoutComponent } from '../../containers';
import { ConnexionService } from '../../services/connexion.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NgbDateAdapter, NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';

import { DialogService } from '../../services/dialog.service';
import { RegidesoService } from '../../services/regideso.service';
import { CookieService } from 'ngx-cookie-service';


@Injectable()
export class CustomAdapter extends NgbDateAdapter<string> {

  readonly DELIMITER = '-';

  fromModel(value: string | null): NgbDateStruct | null {
    if (value) {
     //  console.log(value)
      const date = value.split(this.DELIMITER);
      var day = parseInt(date[2], 10)
      var month = parseInt(date[1], 10)
      var year = parseInt(date[0], 10)
      if (day<10) {
        
      }
      return {
        day : parseInt(date[2], 10),
        month : parseInt(date[1], 10),
        year : parseInt(date[0], 10)
      };
    }
    return null;
  }

  toModel(date: NgbDateStruct | null): string | null {
   //  return date ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year : null;
    return date ? (date.year + this.DELIMITER + (date.month<10 ? "0"+date.month:date.month) + this.DELIMITER + (date.day<10 ? "0"+date.day:date.day)) : null;
   // return "222"
  }
}

@Injectable()
export class CustomDateParserFormatter extends NgbDateParserFormatter {

  readonly DELIMITER = '/';

  parse(value: string): NgbDateStruct | null {
    if (value) {
      const date = value.split(this.DELIMITER);
      return {
        day : parseInt(date[0], 10),
        month : parseInt(date[1], 10),
        year : parseInt(date[2], 10)
      };
    }
    return null;
  }

  format(date: NgbDateStruct | null): string {
   var m=null
   var d=null
   if (date!=null) {
     if (date.month<10) {
        m="0"+date.month
     }
     
     if (date.day<10) {
        d="0"+date.day
     }
   }

    return date ? ((date.day<10 ? "0"+date.day:date.day) + this.DELIMITER + (date.month<10 ? "0"+date.month:date.month) + this.DELIMITER + date.year) : '';
   // return "555"
  }
}
@Component({
  templateUrl: 'dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [
    {provide: NgbDateAdapter, useClass: CustomAdapter},
    {provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter}
  ],
  // templateUrl: 'dashboard.component.html',
})
export class DashboardComponent implements OnInit {

  @ViewChild(DataTableDirective, {static: false})
  

  dtElement: DataTableDirective;
  dtTrigger = new Subject();
  title=""
  somme:any="0"
  nombre:any="0"

  today = new Date();
  year = this.today.getFullYear();
  month = this.today.getMonth();
  date = this.today.getDate();
  hour = this.today.getHours();
  min = this.today.getMinutes();
  sec = this.today.getSeconds();

 fullDate=this.year+"-"+("0" + (this.month + 1)).slice(-2)+"-"+("0" + this.date ).slice(-2)+" "+("0" + this.hour ).slice(-2)+":"+("0" + this.min ).slice(-2)+":"+("0" + this.sec ).slice(-2)

 
 user_form_search=new FormGroup({
  date1:new FormControl('',Validators.required),
  date2:new FormControl('',Validators.required),
  date3:new FormControl('',Validators.required),
  entite:new FormControl('',Validators.required),
  compte:new FormControl('',Validators.required),
  filter_entites:new FormControl(''),
 
  
 })
  entites: any;
  entites_filtre: any;
  comptes:any
  id__user=parseInt(sessionStorage.getItem('SOCIETE_ID'))




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
    private dialogService: DialogService,
    public cookieService:CookieService
  ) 
  { 
    var self=this
    // setInterval({self.runClock},100)
    setInterval(function () {

      var today = new Date();
      var year = today.getFullYear();
      var month = today.getMonth();
      var date = today.getDate();
      var hour = today.getHours();
      var min = today.getMinutes();
      var sec = today.getSeconds();

      self.fullDate=year+"-"+("0" + (month + 1)).slice(-2)+"-"+("0" + date ).slice(-2)+" "+("0" + hour ).slice(-2)+":"+("0" + min ).slice(-2)+":"+("0" + sec ).slice(-2)

    }, 1000);
  }

  ngOnInit(): void {

    console.log(this.cookieService.getAll())

    var today = new Date();
    var year = today.getFullYear();
    var month = today.getMonth();
    var date = today.getDate();
    var hour = today.getHours();
    var min = today.getMinutes();
    var sec = today.getSeconds();

    var fullDate=year+"-"+("0" + (month + 1)).slice(-2)+"-"+("0" + date ).slice(-2)

    var id_societe=parseInt(sessionStorage.getItem("SOCIETE_ID"))?parseInt(sessionStorage.getItem("SOCIETE_ID")):0
  //  console.log(id_societe)
    if(id_societe>0){
      this.user_form_search.get("entite").setValue(id_societe+"");
      this.comptes_entites({value:id_societe})
    }

    this.regidesoService.entites(id_societe).subscribe
    (res=>{

      if(res.response=="non"){
        console.log("PROBLEME DE SERVEUR")
      }else{
  //  console.log(res.provinces)

        this.entites=res.entites
        this.entites_filtre=res.entites
        
        this.dashboard_info()
      }
      this.approot.progressBar=false;
    },
    error=>{
      console.log(error)
    })
   
  }


   
  refresh_entites(){
    this.entites_filtre= this.entites
  }

  onKey_entites(value) { 

    // console.log(this.ou_filtre)
    this.entites_filtre= []; 
    this.selectSearch_entites(value);       
  }
  
  selectSearch_entites(value:string){
  let filter = value.toLowerCase();
  for ( let i = 0 ; i < this.entites.length; i ++ ) {
      let option = this.entites[i];
          console.log(option.CUSTOMERNAME.toLowerCase())

      // if (  option.CUSTOMERNAME.toLowerCase().indexOf(filter) >= 0||option.IDNUMBER.toLowerCase().indexOf(filter) >= 0) {
      if (  option.CUSTOMERNAME.toLowerCase().indexOf(filter) >= 0) {
          this.entites_filtre.push( option );
      }
  }
  }

  comptes_entites(id){
    this.regidesoService.comptes_entites(id.value).subscribe
    (res=>{

      if(res.response=="non"){
        console.log("PROBLEME DE SERVEUR")
      }else{
  //  console.log(res.provinces)

        this.comptes=res.comptes


      }
      this.approot.progressBar=false;
    },
    error=>{
      console.log(error)
    })
  }

  dashboard_info(){
    // if(this.user_form_search.value.entite!=0)
    this.approot.progressBar=true;
    let formData = new FormData();
    formData.append("date1",this.user_form_search.value.date1)
    formData.append("date2",this.user_form_search.value.date2)
    formData.append("entite",this.user_form_search.value.entite)
    formData.append("compte",this.user_form_search.value.compte)

    // console.log("entrer")

    this.regidesoService.dashboard_info(formData).subscribe
    (res=>{

      if(res.response=="non"){
        console.log("PROBLEME DE SERVEUR")
      }else{
        
        // console.log("sortie")this.approot.progressBar=true;
        // console.log(res)
        $('#entite_n').html(new Intl.NumberFormat('fr-FR').format(res.result1[0].N));
        $('#entite_m').html(new Intl.NumberFormat('fr-FR').format(res.result2[0].N));
        $('#facture_n').html(new Intl.NumberFormat('fr-FR').format(res.result3[0].N));
        $('#facture_m').html(new Intl.NumberFormat('fr-FR').format(res.result4[0].SOMME));
        $('#cashpower_n').html(new Intl.NumberFormat('fr-FR').format(res.result5[0].N));
        $('#cashpower_m').html(new Intl.NumberFormat('fr-FR').format(res.result6[0].SOMME));
        

      }
      this.approot.progressBar=false;
    },
    error=>{
      console.log(error)
    })
  }

  filtre(){
    this.dashboard_info()
  }

  export(type,excel_Csv){
      
    if (confirm("Voulez-vous exporter?") == true) { 
      this.approot.progressBar=true
      // if(
      //   this.user_form_search.controls.date1.status=='VALID'
      // ){
  
    
        this.regidesoService.export_dashboard_regideso(type,excel_Csv,this.user_form_search.value.date1,this.user_form_search.value.date2,this.user_form_search.value.entite,this.user_form_search.value.compte).subscribe
        (res=>{
        
          if(res.response=="non"){
            alert("ECHEC, PROBLEME DE SERVEURE")
            // console.log("PROBLEME DE SERVEUR")
          }else{
  
            // setTimeout(() => {
        
            this.approot.progressBar=false
  
            var nom2=res.nom

            console.log(nom2)
            const link = document.createElement('a');
            link.setAttribute('target', '_blank');
            link.setAttribute('href', this.connexion.base_url+'export/'+nom2);
            link.setAttribute('download', nom2);
            document.body.appendChild(link);
            link.click();
            link.remove();
  
          // }, 2000);
            
          }
          
        },
        error=>{
          console.log(error)
        })
    
  
    // }else{
    //   alert("ECHEC! VEUILLEZ D'ABORD REMPLIR TOUS LES CHAMP");
    //   this.approot.progressBar=false
    // }
  
    }
    
    }
}
