import {Component, OnDestroy, OnInit,ViewChild} from '@angular/core';
import { ConnexionService } from '../../services/connexion.service';
import { navItems } from '../../_nav';
import { AppComponent } from '../../app.component';
import { ActivatedRoute,NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router'; 
import { SettingsService } from '../../services/settings.service';

import { AuthentificationService } from '../../services/authentification.service';
import { NavigationEvent } from '@ng-bootstrap/ng-bootstrap/datepicker/datepicker-view-model';
import { InfoService } from '../../services/info.service';
import { CookieService } from 'ngx-cookie-service';
import { RegidesoService } from '../../services/regideso.service';
// import { navItems } from '../../_nav';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent implements OnInit, OnDestroy {


  notification=0
  notification_array=[]

 

  progressBar=false
  sub: any;
  // public sidebarMinimized = true;
  public sidebarMinimized = false;
  public navItems = navItems;
  public settingColor;
  public bodyColor;
  public menuColor;
  public titleColor;
  public logos;

  session
  nom 
  prenom 
  foto

  test_var="yyy"
   usersession=JSON.parse(sessionStorage.getItem('usersession'))
  //  console.log(usersession)
   permission_url=this.usersession?(this.usersession.hasOwnProperty("data")?this.usersession.data.paths:{}):{}
   ID=this.usersession?(this.usersession.hasOwnProperty('data')?this.usersession.data.ID:0):0

   menu_user
   

  // settingColor.body_style.CODE_COULEUR
  tabIndex = -1;
  NOM: any;
  PRENOM: any;
  adress: string;
  onTabClick(index){
    this.tabIndex = index;
}

  event$
  currentRoute: string;
  constructor(
    private info_service:InfoService,
    private setting:SettingsService,
    private approot:AppComponent, 
    private router: Router, 
    private activatedRoute: ActivatedRoute,
    private connexion:ConnexionService,
    public cookieService:CookieService,
    private auth_service:AuthentificationService,
    private regidesoService:RegidesoService,) {

    
      
  //  this.navItems=[]

console.log(navItems)
    this.currentRoute = "";
    this.router.events.subscribe((event) => {

   
        // if (event instanceof NavigationStart) {
        //     // Show loading indicator
        //     console.log('Route change detected');
        // }

                    if(event instanceof NavigationStart) {
                      var url1=window.location.href
      
                      var path=url1.split("#")
                      let formData = new FormData();
                    
                      console.log(activatedRoute.snapshot.url);
                      
                      var  path_=path[1]
                      var url_split=path_.split("/")
                      let lastElement = url_split[url_split.length - 1];
                      let lastElement1 = url_split[url_split.length - 2];
                      
                      if (!isNaN(parseInt(lastElement))||lastElement=='T'||lastElement=='N'||lastElement=='R') 
                      path_=path_.replace(lastElement,"")
                      if (!isNaN(parseInt(lastElement1))||lastElement=='T'||lastElement=='N'||lastElement=='R') 
                      path_=path_.replace(lastElement1+"/","")
                
                      formData.append("url",path_)
                      console.log(path_)
                        this.info_service.addUrl(formData).subscribe
                        (res=>{
                    
                          if(res.response=="non"){
                            console.log("PROBLEME DE SERVEUR")
                          }else{
                      
                          }
                          
                        },
                        error=>{
                          console.log(error)
                        })

                      // alert()
                      if (sessionStorage.getItem("usersession")) {

                        // console.log(JSON.parse(sessionStorage.getItem("usersession")).data.ID)
                       
                     

                       
                    }

             const LAST= sessionStorage.getItem('debut_session')      
             const CURRENT= new Date().getTime()
             
            //  const TIME=CURRENT-parseInt(LAST)
            //  const PERIODE=TIME/7200000

            
            const diffMs = Math.abs(CURRENT - parseInt(LAST)); // Difference in milliseconds
            var nombre_minute=Math.floor(diffMs / (1000 * 60)); 
            console.log(nombre_minute) 
            if(nombre_minute>this.connexion.SESSION_TIME)this.seDecoonecter()
              else sessionStorage.setItem('debut_session',""+new Date().getTime())
              setTimeout(() => {
                const CURRENT= new Date().getTime()
                const diffMs = Math.abs(CURRENT - parseInt(LAST)); // Difference in milliseconds
                var nombre_minute=Math.floor(diffMs / (1000 * 60)); 

                if(nombre_minute>this.connexion.SESSION_TIME)this.seDecoonecter()
                  else sessionStorage.setItem('debut_session',""+new Date().getTime())
              }, 1000);
            
              var url=window.location.href.split("#")

              var array_url=event.url.split('/')            
              // console.log(event.url) 
              if (this.usersession) {
             
              // console.log(this.usersession)societe/list
              this. permission_url=this.usersession.data?this.usersession.data.paths:[]
              // this. permission_url=this.usersession.data.paths
              // console.log(permission_url)
              // var isnum = /^\d+$/.test(array_url[array_url.length-1]);
              // // console.log(isnum)
              // if(isnum){
                
              //   var path_url=event.url.replace(array_url[array_url.length-1],'')
              // }else{
              //   var path_url=event.url
                
              // }

              var  path_url=event.url
                      var url_split=path_url.split("/")
                      let lastElement = url_split[url_split.length - 1];
                      let lastElement1 = url_split[url_split.length - 2];
                      
                      if (!isNaN(parseInt(lastElement))||lastElement=='T'||lastElement=='N'||lastElement=='R') 
                      path_url=path_url.replace(lastElement,"")
                      if (!isNaN(parseInt(lastElement1))||lastElement=='T'||lastElement=='N'||lastElement=='R') 
                      path_url=path_url.replace(lastElement1+"/","")


              if(path_url!="/login"&&path_url!="/accueil"){

                if(path_url.includes("?")){
                  var path=path_url.split("?")
                  path_url=path[0]
                }
              // console.log(this.permission_url)
              // console.log(this.permission_url.filter(s => s.includes(path_url)).length)
              
                // console.log(path_url,this.permission_url.filter(s => s.includes(path_url)).length)
                // console.log((this.permission_url.filter(s => s.includes(path_url)).length==0,path_url!='/RefreshComponent',path_url!='/profile/'&&path_url=='societe/list'))

                // console.log(sessionStorage.getItem("hwo_change")),
                const NIVEAU= sessionStorage.getItem('NIVEAU')  
              if (!NIVEAU&&this.permission_url.filter(s => s.includes(path_url)).length==0&&path_url!='/RefreshComponent'&&path_url!='/profile/'&&path_url!='/portail'&&path_url!='societe/list') {
                
                this.router.navigate(["/accueil"]);
                alert("VOUS N'AVEZ PAS DROIT A CETTE INTERFACE, VEUILLEZ CONTACTER L'ADMINISTRATEUR DU SYSTEME")
                
              }else{
                sessionStorage.setItem('url',path_url)
                // console.log(path_url)
              }
            }
            }

            sessionStorage.setItem('debut_session',""+new Date().getTime())
          }


        if (event instanceof NavigationError) {
            // Hide loading indicator

            // Present error to user
            console.log(event.error);
        }

    });


 
   }

  
  toggleMinimize(e) {
    this.sidebarMinimized = e;
    
  }

  ngOnInit(): void {

     var url1=window.location.href
      
    var path=url1.split("#")
    // console.log(path)
    this.adress=path[0]
    
    this.hide_navbar_toggler_icone();

    const NIVEAU= sessionStorage.getItem('NIVEAU')  

    // if(this.ID==0)this.navItems.splice(1, 1);

    // console.log(NIVEAU)
    // console.log(navItems)
    // console.log(this.usersession)
    

    if(NIVEAU=="1"){
      
      

      
      
      this.navItems[2].children.splice(1, 1)
      this.navItems[3].children.splice(1, 1)
      this.navItems[4].children.splice(1, 1)
      this.navItems.splice(1, 1);
      this.navItems.splice(4, 1);//remove reporting menu
      console.log(this.navItems)
    }
    if(NIVEAU=="2"){
      // this.navItems=navItems.
      
      
      this.navItems[2].children.splice(0, 1)
      this.navItems[3].children.splice(0, 1)
      this.navItems[4].children.splice(0, 1)
      this.navItems.splice(1, 1);
    }
    if(NIVEAU=="3"){
      this.navItems.splice(1, 1);
    }
    // console.log(NIVEAU)
    // if()
    if(!NIVEAU){
      if(this.usersession.data.VALIDATION_LEVEL=="1"){
        this.navItems.splice(5, 1);
        this.navItems.splice(4, 1);
        this.navItems.splice(3, 1);
        this.navItems.splice(2, 1);
      }
      // if(this.usersession.data.VALIDATION_LEVEL=="2"||this.usersession.data.VALIDATION_LEVEL=="3"){
        if(this.usersession.data.VALIDATION_LEVEL=="2"){
            this.navItems.splice(2, 1);
            this.navItems.splice(1, 1);
            // this.navItems[3].splice(1, 1);
            this.navItems[1].children.splice(0, 1)
            this.navItems[2].children.splice(0, 1)
  
      }
    }
    




    
    
    const LAST= sessionStorage.getItem('debut_session')      
    
    const CURRENT= new Date().getTime()
    
    const TIME=CURRENT-parseInt(LAST)
    // const PERIODE=TIME/7200000

    //  console.log(PERIODE);
    //  const CURRENT= new Date().getTime()
             
     //  const TIME=CURRENT-parseInt(LAST)
     //  const PERIODE=TIME/7200000

     const diffMs = Math.abs(CURRENT - parseInt(LAST)); // Difference in milliseconds
     var nombre_minute=Math.floor(diffMs / (1000 * 60)); 
     console.log(nombre_minute) 
     if(nombre_minute>this.connexion.SESSION_TIME)this.seDecoonecter()
      else sessionStorage.setItem('debut_session',""+new Date().getTime())

 
//DROIT SUE MENU DROITES
    
//FIN DROIT SUE MENU DROITES

    
    // var jsonPerson = '{"first_name":"billy", "age":23}';
    this.session = JSON.parse(sessionStorage.getItem('usersession')); 
    console.log(this.session)
    this.NOM=this.session.hasOwnProperty("data")?this.session.data.NOM:sessionStorage.getItem("NAME")
    this.PRENOM=this.session.hasOwnProperty("data")?this.session.data.PRENOM:sessionStorage.getItem("LASTNAME")
    this.foto=sessionStorage.getItem('foto')


    // console.log(sessionStorage.getItem("bancobu_user"))
    if(sessionStorage.getItem("bancobu_user")=="true")this.menu_user=true
    // this.menu_user=true

    // console.log(this.foto)
    this.sub =this.setting.colorSetting.subscribe
    (res=>{ 
      // console.log(res.data.body_style[0].CODE_COULEUR )
     this.settingColor=res ; 
     this.bodyColor=  res.data.body_style[0].CODE_COULEUR 
     this.menuColor=  res.data.Menu_style[0].CODE_COULEUR 
     this.titleColor=  res.data.Bar_style[0].CODE_COULEUR 
     this.logos=  "../../../assets/img/bancobu_logo.png"
     
    //  console.log(this.logos)
    },
    error=>{
      console.log(error)  
    })
    

    sessionStorage.setItem('debut_session',""+new Date().getTime())
    
    setTimeout(() => {
      const CURRENT= new Date().getTime()
      const diffMs = Math.abs(CURRENT - parseInt(LAST)); // Difference in milliseconds
      var nombre_minute=Math.floor(diffMs / (1000 * 60)); 
console.log(nombre_minute,this.cookieService)
      if(nombre_minute>this.connexion.SESSION_TIME)this.seDecoonecter()
        else sessionStorage.setItem('debut_session',""+new Date().getTime())
    }, 1000);


   
  }

  ngOnDestroy() {
    this.sub.unsubscribe()
  }

  seDecoonecter(){
console.log(this.usersession)
    this.auth_service.deconnecter().subscribe
    (resi=>{
      console.log(resi)
      this.regidesoService.deconnecter(this.ID>0?":::"+this.ID:sessionStorage.getItem("ID")).subscribe
      (resis=>{console.log(resis)},
        error=>{
          console.log(error)
          
        })
    
      if(resi.response=="non"){
      alert("PROBLEME DE CONNEXION SERVEUR")
      }else{
        
      
    sessionStorage.setItem('debut_session',""+new Date().getTime())
    
    this.auth_service.isAuth=false
    sessionStorage.removeItem('usersession');
    sessionStorage.removeItem("ID");
    sessionStorage.removeItem("NAME");
    sessionStorage.removeItem("LASTNAME");
    sessionStorage.removeItem("USERNAME");
    sessionStorage.removeItem("TEL");
    sessionStorage.removeItem("NIVEAU");
    sessionStorage.removeItem("SOCIETE_ID");
    sessionStorage.removeItem("EMAIL");
    sessionStorage.removeItem("PWD");
    this.cookieService.delete("USERNAME")
    this.cookieService.delete("PWD")
 
    this.cookieService.deleteAll()
    // this.router.navigate(['/login']);
    window.location.replace(this.connexion.portal);


}
      
},
error=>{
  console.log(error)
  
})
  }


  hide_navbar_toggler_icone(){
    setTimeout(() => {
      const elements = document.querySelectorAll('.d-lg-block.d-none.navbar-toggler');
      // elements.forEach(el => (el as HTMLElement).style.display = 'none');
      elements.forEach(async function(el ,x){
       
        if(x==0){
        const icone = el.querySelector('.navbar-toggler-icon') as HTMLElement;

        icone.style.display = 'none';
        }
      })
         
    }, 2000);
  }
}
