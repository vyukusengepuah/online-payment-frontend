// ==========================================
// IMPORTATIONS NÉCESSAIRES
// ==========================================
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// ==========================================
// IMPORT DES LAYOUTS ET SERVICES
// ==========================================
import { DefaultLayoutComponent } from './containers';
import { AuthGuard } from './auth.guard';

// ==========================================
// IMPORT DES COMPOSANTS (pages)
// ==========================================
// Pages publiques (non protégées)
import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './login/login.component';

// Pages protégées (accessibles après login)
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
import { HomeComponent } from './views/home/home.component';
import { PaiementGuichetComponent } from './views/paiement-guichet/paiement-guichet.component';

// Vos nouveaux composants (Environnement, Token, Paiement, Base de données)
import { GestionClientsComponent } from './gestion-clients/gestion-clients.component';
import { InitierPaiementComponent } from './initier-paiement/initier-paiement.component';
import { ObtenirTokenComponent } from './obtenir-token/obtenir-token.component';
import { EnvironmentUatComponent } from './environment-uat/environment-uat.component';
import { BaseDeDonneesComponent } from './base-de-donnees/base-de-donnees.component';

// ==========================================
// DÉFINITION DES ROUTES
// ==========================================
export const routes: Routes = [
  
  // ==========================================
  // 1. ROUTES PUBLIQUES (non protégées)
  // ==========================================
  
  // Page de login : point d'entrée de l'application
  { 
    path: 'login', 
    component: LoginComponent,
    data: { title: 'Login Page' }
  },

  // Page d'erreur 404
  {
    path: '404',
    component: P404Component,
    data: { title: 'Page 404' }
  },

  // Page d'erreur 500
  {
    path: '500',
    component: P500Component,
    data: { title: 'Page 500' }
  },

  // Page de redirection vers le portail
  {
    path: 'portail',
    component: RedirectPortailComponent,
    data: { title: 'Login Page' }
  },

  // Page de changement de mot de passe
  {
    path: 'change_pwd',
    component: ChangePwdComponent,
    data: { title: 'Change password' }
  },

  // Page de confirmation OTP (2 Step)
  {
    path: 'code_confirmation',
    component: CodeConfirmationComponent,
    data: { title: 'Code confirmation' }
  },

  // ==========================================
  // 2. ROUTES PROTÉGÉES (accès après login)
  // ==========================================

  // Page de gestion des clients
  // (redirige automatiquement vers /environment-uat via ngOnInit)
  { 
    path: 'gestion-clients', 
    component: GestionClientsComponent, 
    canActivate: [AuthGuard] 
  },

  // Page de gestion des environnements UAT
  { 
    path: 'environment-uat', 
    component: EnvironmentUatComponent, 
    canActivate: [AuthGuard] 
  },

  // Page d'obtention de token
  { 
    path: 'obtenir-token', 
    component: ObtenirTokenComponent, 
    canActivate: [AuthGuard] 
  },

  // Page d'initiation de paiement
  { 
    path: 'initier-paiement', 
    component: InitierPaiementComponent, 
    canActivate: [AuthGuard] 
  },

  // Page de base de données (table environments)
  { 
    path: 'base-de-donnees', 
    component: BaseDeDonneesComponent, 
    canActivate: [AuthGuard] 
  },

  // ==========================================
  // 3. LAYOUT PRINCIPAL (pour les pages protégées existantes)
  // ==========================================
  {
    path: '',
    canActivate: [AuthGuard],
    component: DefaultLayoutComponent,
    data: { title: 'Home' },
    children: [
      // Page d'accueil
      {
        path: 'accueil',
        component: HomeComponent,
        data: { title: 'DASHBOARD' }
      },
      
      // Pages avec chargement paresseux (lazy loading)
      {
        path: 'profile',
        loadChildren: () => import('./views/profile/profile.module').then(m => m.ProfileModule)
      },
      {
        path: 'parametrage',
        loadChildren: () => import('./views/parametrage/parametrage.module').then(m => m.ParametrageModule)
      },
      
      // Page "Pièce"
      {
        path: 'piece',
        component: PieceComponent,
        data: { title: 'Piece' }
      },
      
      // Section "Sociétés"
      {
        path: 'societe',
        data: { title: 'Societés' },
        children: [
          {
            path: 'list',
            component: SocietesComponent,
            data: { title: 'CHECK UP' }
          },
        ]
      },
      
      // Section "Regideso"
      {
        path: 'regideso',
        data: { title: 'Regideso' },
        children: [
          {
            path: 'Paiement_guichet',
            component: PaiementGuichetComponent,
            data: { title: 'Paiement guichet' }
          },
        ]
      },
      
      // Section "Facture"
      {
        path: 'facture',
        data: { title: 'Paiement' },
        children: [
          {
            path: 'creation',
            component: PaiementCreationComponent,
            data: { title: 'Initiation paiement' }
          },
          {
            path: 'paiement',
            component: PaiementComponent,
            data: { title: 'Paiement' }
          },
          {
            path: 'factures',
            component: FactureComponent,
            data: { title: 'Facture' }
          },
          {
            path: 'paiement_validation',
            component: PaiementValidationComponent,
            data: { title: 'Validation facture' }
          },
          {
            path: 'paiement_annule',
            component: PaiementAnnulationComponent,
            data: { title: 'Facture annulées' }
          },
          {
            path: 'paiement_historique',
            component: PaiementHistoriqueComponent,
            data: { title: 'Historique Factures' }
          },
        ]
      },
      
      // Section "Cashpower"
      {
        path: 'cashpower',
        data: { title: 'Cashpower' },
        children: [
          {
            path: 'achat',
            component: CashpowerCreationComponent,
            data: { title: 'Achat Cashpower' }
          },
          {
            path: 'validation',
            component: CashpowerValidationComponent,
            data: { title: 'validation achat cashpower' }
          },
          {
            path: 'annulation',
            component: CashpowerAnnulationComponent,
            data: { title: 'Annulation achat cashpower' }
          },
          {
            path: 'historique',
            component: CashpowerHistoComponent,
            data: { title: 'Achat cashpower en attente de validation' }
          },
          {
            path: 'last_jeton',
            component: CashpowerLastJetonComponent,
            data: { title: 'Dernier jeton' }
          },
          {
            path: 'reaction',
            component: CashpowerReactionComponent,
            data: { title: 'Décision de validation ou d\'annulation' }
          },
          {
            path: 'encours',
            component: CashpowerComponent,
            data: { title: 'Cashpower consultation' }
          },
        ]
      },
      
      // Section "Compteur"
      {
        path: 'compteur',
        data: { title: 'Compteur' },
        children: [
          {
            path: 'ajout',
            component: GestionCompteurComponent,
            data: { title: 'Ajout compteur' }
          },
          {
            path: 'non_valide',
            component: CompteurNonValideComponent,
            data: { title: 'Compteur en attente de validation' }
          },
          {
            path: 'deja_valide',
            component: CompteurDejaValideComponent,
            data: { title: 'Compteur deja validés' }
          },
          {
            path: 'annules',
            component: CompteurNonValideComponent,
            data: { title: 'Compteurs' }
          },
        ]
      },
      
      // Section "Reporting"
      {
        path: 'reporting',
        data: { title: 'REPORTING' },
        children: [
          {
            path: 'dashboard',
            loadChildren: () => import('./views/dashboard/dashboard.module').then(m => m.DashboardModule),
          },
          {
            path: 'non_valide',
            component: CompteurNonValideComponent,
            data: { title: 'Compteur en attente de validation' }
          },
          {
            path: 'deja_valide',
            component: CompteurNonValideComponent,
            data: { title: 'Compteur deja validés' }
          },
          {
            path: 'annules',
            component: CompteurNonValideComponent,
            data: { title: 'Compteur' }
          },
          {
            path: 'cashpower_encour',
            component: CashpowerComponent,
            data: { title: 'Achat cashpower en attente de validation' }
          },
          {
            path: 'cashpower_valide',
            component: CashpowerValidationComponent,
            data: { title: 'Achats cashpower deja validés' }
          },
          {
            path: 'cashpower_annule',
            component: CashpowerAnnulationComponent,
            data: { title: 'Cashpower' }
          },
          {
            path: 'paiement_encours',
            component: PaiementComponent,
            data: { title: 'Paiment en attente de validation' }
          },
          {
            path: 'paiement_valide',
            component: FactureComponent,
            data: { title: 'Paiements facture deja validés' }
          },
          {
            path: 'paiement_annule',
            component: PaiementAnnulationComponent,
            data: { title: 'Paiement annulés' }
          },
        ]
      }
    ]
  },

  // ==========================================
  // 4. ROUTE PAR DÉFAUT
  // ==========================================
  
  // Redirection vers login si l'URL ne correspond à aucune route
  { path: '', redirectTo: '/login', pathMatch: 'full' },

  // Page 404 pour toutes les autres URLs
  { path: '**', component: P404Component },
];

// ==========================================
// DÉCORATEUR NgModule
// ==========================================
@NgModule({
  // Configuration du routeur avec les routes définies
  imports: [ RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }) ],
  // Exportation du routeur pour qu'il soit disponible dans toute l'application
  exports: [ RouterModule ]
})
export class AppRoutingModule {}