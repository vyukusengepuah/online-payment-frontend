import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { CongeInitModifComponent } from './conge-init/conge-init-modif/conge-init-modif.component';
// import { CongeInitComponent } from './conge-init/conge-init.component';
// import { CongeParamComponent } from './conge-param/conge-param.component';
// import { CongeSoldeUserComponent } from './conge-solde-user/conge-solde-user.component';
// import { CongeToutComponent } from './conge-tout/conge-tout.component';
// import { DetailComponent } from './conge-tout/detail/detail.component';

// import { FluxCongeComponent } from './flux-conge/flux-conge.component';

import { ParametrageComponent } from './parametrage.component';

const routes: Routes = [
    {
        path: '',
        
      children: [
        
           
                 {
                path: 'conge_init',
                
                data: {
                title: ''
                },children: [

                  {
                    path: '',
                    data: {
                    title: 'Les congés restant'
                    },children: [

                      {
                        path: '',
                        redirectTo:'list'
                      
                      },
                      
                    
                      
                    ]
                  }

                  
                    
                  ],
                
               },{
                path: 'conge_tout',
                // component: CongeToutComponent,
                data: {
                title: 'Tous les demandes de congés'
                },children: [

                      {
                        path: '',
                        redirectTo:'list'
                      
                      },
                      
                    
                      
                    ]
               }
               ,
                
                {
                  path: 'gestion_formulaire',
                  // component: CongeToutComponent,
                  data: {
                  title: 'Tous les demandes de congés'
                  },children: [
  
                        {
                          path: '',
                          redirectTo:'list'
                        
                        },
                       
                      
                      ]
                 }
                 ,
              //  {
              //   path: 'conge_init',
              //   component: CongeInitComponent,
              //   data: {
              //   title: 'Les congés restant'
              //   },
              //  }, {
              //   path: 'conge_init_modif/:id',
              //   component: CongeInitModifComponent,
              //   data: {
              //   title: 'Modification des unités d\'organisation'
              //   },
              //   },gestion_formulaire

        ]
    }
  ];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParametrageRoutingModule { }
