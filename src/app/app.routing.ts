import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import { DefaultLayoutComponent } from './containers';
import { AuthGuard } from './services/auto-guard.service';


import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';
import { ChangePwdComponent } from './views/change-pwd/change-pwd.component';
import { RedirectPortailComponent } from './views/redirect-portail/redirect-portail.component';
import { CodeConfirmationComponent } from './views/code-confirmation/code-confirmation.component';
import { SocietesComponent } from './views/societes/societes.component';
import { PaiementComponent } from './views/operations/paiement/paiement.component';
import { FactureComponent } from './views/operations/facture/facture.component';
import { CashpowerComponent } from './views/operations/cashpower/cashpower.component';
import { CashpowerHistoComponent } from './views/operations/cashpower-histo/cashpower-histo.component';
import { PaiementCreationComponent } from './views/operations/paiement-creation/paiement-creation.component';
import { CashpowerCreationComponent } from './views/operations/cashpower-creation/cashpower-creation.component';
import { PaiementValidationComponent } from './views/operations/paiement-validation/paiement-validation.component';
import { PaiementAnnulationComponent } from './views/operations/paiement-annulation/paiement-annulation.component';
import { PaiementHistoriqueComponent } from './views/operations/paiement-historique/paiement-historique.component';
import { CashpowerAnnulationComponent } from './views/operations/cashpower-annulation/cashpower-annulation.component';
import { CashpowerValidationComponent } from './views/operations/cashpower-validation/cashpower-validation.component';
import { CashpowerLastJetonComponent } from './views/operations/cashpower-last-jeton/cashpower-last-jeton.component';
import { CashpowerReactionComponent } from './views/operations/cashpower-reaction/cashpower-reaction.component';
import { GestionCompteurComponent } from './views/gestion-compteur/gestion-compteur.component';
import { CompteurNonValideComponent } from './views/gestion-compteur/compteur-non-valide/compteur-non-valide.component';
import { CompteurDejaValideComponent } from './views/gestion-compteur/compteur-deja-valide/compteur-deja-valide.component';
import { PieceComponent } from './views/operations/piece/piece.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { HomeComponent } from './views/home/home.component';
import { PaiementGuichetComponent } from './views/paiement-guichet/paiement-guichet.component';
import { GestionClientsComponent } from './gestion-clients/gestion-clients.component';


export const routes: Routes = [
  {
    path: '',
    redirectTo: 'accueil',
    pathMatch: 'full',
  },
  {
    path: '404',
    component: P404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: P500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  { path: 'gestion-clients', component: GestionClientsComponent },
  {
    path: 'portail',
    component: RedirectPortailComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'change_pwd',
    component: ChangePwdComponent,
    data: {
      title: 'Change password'
    }
  },
  {
    path: 'code_confirmation',
    component: CodeConfirmationComponent,
    data: {
      title: 'Code confirmation'
    }
  },
  
  {
    path: '',canActivate: [AuthGuard],
    // path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [

      {
        path: 'accueil',
        
        component: HomeComponent,
        data: {
        title: 'DASHBOARD'
        }
        // loadChildren: () => import('./views/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      
      
      {
        path: 'profile',
        loadChildren: () => import('./views/profile/profile.module').then(m => m.ProfileModule)
      },
      {
        path: 'parametrage',
        loadChildren: () => import('./views/parametrage/parametrage.module').then(m => m.ParametrageModule)
      },
      {
        path: 'piece',
        component: PieceComponent,
        data: {
          title: 'Piece'
        }
      },
     
      {
        path: 'conge',
        
        data: {
        title: ''
        }
        ,children: [
          
          // {
          //   path: '',
          //   redirectTo:'list'
          
          // },
          
        ]
        },{
          path: 'operation',
          // component: NouveauAutorisationComponent,
          data: {
          title: 'Opérations'
          },children: [
      
           
            
            
            
            
            
          ]
        
        },
        {
          path: 'notifications',
          
          data: {
          title: ''
          }
          ,children: [
            
            // {
            //   path: '',
            //   redirectTo:'list'
            
            // },
            
          ]
          },
          {
            path: 'societe',
            
            data: {
            title: 'Societés'
            }
            ,children: [
              {
                path: 'list',
                component: SocietesComponent,
                data: {
                title: 'CHECK UP'
                }
              
              },
              
            ]
          },
          {
            path: 'regideso',
            
            data: {
            title: 'Regideso'
            }
            ,children: [
              {
                path: 'Paiement_guichet',
                component: PaiementGuichetComponent,
                data: {
                title: 'Paiement guichet'
                }
              
              },
              
            ]
          },
          {
            path: 'facture',
            
            data: {
            title: 'Paiement'
            }
            ,children: [
              {
                path: 'creation',
                component: PaiementCreationComponent,
                data: {
                title: 'Initiation paiement'
                }
              
              },{
                path: 'paiement',
                component: PaiementComponent,
                data: {
                title: 'Paiement'
                }
              
              },
              {
                path: 'factures',
                component: FactureComponent,
                data: {
                title: 'Facture'
                }
              
              },
              {
                path: 'paiement_validation',
                component: PaiementValidationComponent,
                data: {
                title: 'Validation facture'
                }
              
              },
              {
                path: 'paiement_annule',
                component: PaiementAnnulationComponent,
                data: {
                title: 'Facture annulées'
                }
              
              },
              {
                path: 'paiement_historique',
                component: PaiementHistoriqueComponent,
                data: {
                title: 'Historique Factures'
                }
              
              },
              
            ]
          },
          {
            path: 'cashpower',
            
            data: {
            title: 'Cashpower'
            }
            ,children: [
              {
                path: 'achat',
                component: CashpowerCreationComponent,
                data: {
                title: 'Achat Cashpower'
                }
              
              },{
                path: 'validation',
                component: CashpowerValidationComponent,
                data: {
                title: 'validation achat cashpower'
                }
              
              },
              {
                path: 'annulation',
                component: CashpowerAnnulationComponent,
                data: {
                title: 'Annulation achat cashpower'
                }
              
              },
              {
                path: 'historique',
                component: CashpowerHistoComponent,
                data: {
                title: 'Achat cashpower en attente de validation'
                }
              
              },
              {
                path: 'last_jeton',
                component: CashpowerLastJetonComponent,
                data: {
                title: 'Dernier jeton'
                }
              
              },
              {
                path: 'reaction',
                component: CashpowerReactionComponent,
                data: {
                title: 'Décision de validation ou d\'annulation'
                }
              },
              {
                path: 'encours',
                component: CashpowerComponent,
                data: {
                title: 'Cashpower consultation'
                }
              },
            ]
          }
          ,
          {
            path: 'compteur',
            
            data: {
            title: 'Compteur'
            }
            ,children: [
              {
                path: 'ajout',
                component: GestionCompteurComponent,
                data: {
                title: 'Ajout compteur'
                }
              
              },{
                path: 'non_valide',
                component: CompteurNonValideComponent,
                data: {
                title: 'Compteur en attente de validation'
                }
              
              },
              {
                path: 'deja_valide',
                component: CompteurNonValideComponent,
                data: {
                title: 'Compteur deja validés'
                }
              
              },

              {
                path: 'annules',
                component: CompteurNonValideComponent,
                data: {
                title: 'Compteurs'
                }
              
              },
              
            ]
          }
          ,
          {
            path: 'reporting',
            
            data: {
            title: 'REPORTING'
            }
            ,children: [
              {
                path: 'dashboard',
                loadChildren: () => import('./views/dashboard/dashboard.module').then(m => m.DashboardModule),

                // component: DashboardComponent,
                // data: {
                // title: 'DASHBOARD'
                // }
              
              },{
                path: 'non_valide',
                component: CompteurNonValideComponent,
                data: {
                title: 'Compteur en attente de validation'
                }
              
              },
              {
                path: 'deja_valide',
                component: CompteurNonValideComponent,
                data: {
                title: 'Compteur deja validés'
                }
              
              },

              {
                path: 'annules',
                component: CompteurNonValideComponent,
                data: {
                title: 'Compteur'
                }
              
              },

              {
                path: 'cashpower_encour',
                component: CashpowerComponent,
                data: {
                title: 'Achat cashpower en attente de validation'
                }
              
              },
              {
                path: 'cashpower_valide',
                component: CashpowerValidationComponent,
                data: {
                title: 'Achats cashpower deja validés'
                }
              
              },
              {
                path: 'cashpower_annule',
                component: CashpowerAnnulationComponent,
                data: {
                title: 'Cashpower'
                }
              
              },
              {
                path: 'paiement_encours',
                component: PaiementComponent,
                data: {
                title: 'Paiment en attente de validation'
                }
              
              },
              {
                path: 'paiement_valide',
                component: FactureComponent,
                data: {
                title: 'Paiements facture deja validés'
                }
              
              },
              {
                path: 'paiement_annule',
                component: PaiementAnnulationComponent,
                data: {
                title: 'Paiement annulés'
                }
              
              },
            ]
          }
    ]
  },
  { path: '**', component: P404Component },
  { path: 'gestion-clients', component: GestionClientsComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
