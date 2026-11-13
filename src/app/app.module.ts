import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
// import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
// import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
// import { IconModule, IconSetModule, IconSetService } from '@coreui/icons-angular';
import { MatDialogModule } from '@angular/material/dialog';
import { ModalModule } from 'ngx-bootstrap/modal';
// import { ImageCropperModule } from 'ngx-image-cropper';
// import { NgxBootstrapMultiselectModule } from 'ngx-bootstrap-multiselect';
import { NgxDatesPickerModule } from 'ngx-dates-picker';
// import { MatDatepickerModule } from '@angular/material/datepicker';
// import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
// import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatSelectModule } from '@angular/material/select';
// import {MatIconModule} from '@angular/material/icon';
// import {MatTableModule} from '@angular/material/table';
// import {NgbPaginationModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap'; 
// import { MatFileUploadModule } from 'angular-material-fileupload';
// import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

import { AppComponent } from './app.component';

// Import containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';

const APP_CONTAINERS = [
  DefaultLayoutComponent
]; 

import {
  AppAsideModule,
  AppBreadcrumbModule,
  AppFooterModule,
  AppHeaderModule,
  AppSidebarModule,
} from '@coreui/angular';

// Import routing module
import { AppRoutingModule } from './app.routing';

// Import 3rd party components
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTablesModule } from "angular-datatables";
import { ChartsModule } from 'ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { AuthService } from './services/auth.service';
import { AuthentificationService } from './services/authentification.service';
import { AuthGuard } from './services/auto-guard.service';
import { ConnexionService } from './services/connexion.service';
import { SettingsService } from './services/settings.service';
import { ParametrageComponent } from './views/parametrage/parametrage.component';
import { ProfileComponent } from './views/profile/profile.component';
// import { NgFlowchartModule } from '@joelwenzel/ng-flowchart';
import { MatCheckboxModule } from '@angular/material/checkbox';
// import { SignaturePadModule } from 'angular2-signaturepad';

import { PdfJsViewerModule } from 'ng2-pdfjs-viewer';

// import {MatExpansionModule} from '@angular/material/expansion';
import { ConfirmComponent } from './dialogs/confirm/confirm.component';
import { MessageComponent } from './dialogs/message/message.component';
import { ChangePwdComponent } from './views/change-pwd/change-pwd.component';
// import { CdkStepperModule } from '@angular/cdk/stepper';
import { MatStepperModule } from '@angular/material/stepper';
// import {MatRadioModule} from '@angular/material/radio';
import { RedirectPortailComponent } from './views/redirect-portail/redirect-portail.component';

import { NgOtpInputModule } from 'ng-otp-input';
import { CookieService } from 'ngx-cookie-service';
import { CodeConfirmationComponent } from './views/code-confirmation/code-confirmation.component';
import { CashpowerCreationComponent } from './views/operations/cashpower-creation/cashpower-creation.component';
import { CashpowerHistoComponent } from './views/operations/cashpower-histo/cashpower-histo.component';
import { CashpowerValidationComponent } from './views/operations/cashpower-validation/cashpower-validation.component';
import { CashpowerComponent } from './views/operations/cashpower/cashpower.component';
import { FactureComponent } from './views/operations/facture/facture.component';
import { PaiementAnnulationComponent } from './views/operations/paiement-annulation/paiement-annulation.component';
import { PaiementCreationComponent } from './views/operations/paiement-creation/paiement-creation.component';
import { PaiementHistoriqueComponent } from './views/operations/paiement-historique/paiement-historique.component';
import { PaiementValidationComponent } from './views/operations/paiement-validation/paiement-validation.component';
import { PaiementComponent } from './views/operations/paiement/paiement.component';
import { SocietesComponent } from './views/societes/societes.component';
import { CashpowerAnnulationComponent } from './views/operations/cashpower-annulation/cashpower-annulation.component';
import { CashpowerLastJetonComponent } from './views/operations/cashpower-last-jeton/cashpower-last-jeton.component';
import { CashpowerReactionComponent } from './views/operations/cashpower-reaction/cashpower-reaction.component';
import { GestionCompteurComponent } from './views/gestion-compteur/gestion-compteur.component';
import { CompteurNonValideComponent } from './views/gestion-compteur/compteur-non-valide/compteur-non-valide.component';
import { CompteurDejaValideComponent } from './views/gestion-compteur/compteur-deja-valide/compteur-deja-valide.component';
import { PieceComponent } from './views/operations/piece/piece.component';
import { HomeComponent } from './views/home/home.component';
import { PaiementGuichetComponent } from './views/paiement-guichet/paiement-guichet.component';
import { GestionClientsComponent } from './gestion-clients/gestion-clients.component';
import { InitierPaiementComponent } from './initier-paiement/initier-paiement.component';
import { ObtenirTokenComponent } from './obtenir-token/obtenir-token.component';
import { EnvironmentUatComponent } from './environment-uat/environment-uat.component';
import { BaseDeDonneesComponent } from './base-de-donnees/base-de-donnees.component';

// import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

// import { AswFormBuilderModule } from '@asoftwareworld/form-builder/form-builder';
// import { AswTextFieldModule } from '@asoftwareworld/form-builder/form-control/textfield';
// import { AswPreviewTemplateModule } from '@asoftwareworld/form-builder/preview-template';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,FormsModule,
    AppRoutingModule,
    AppAsideModule,
    AppBreadcrumbModule.forRoot(),
    AppFooterModule,
    AppHeaderModule,
    AppSidebarModule,
    // PerfectScrollbarModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ChartsModule,
    // IconModule,
    // IconSetModule.forRoot(),
    HttpClientModule,
    MatProgressBarModule,
    MatDialogModule,
    ModalModule,
    DataTablesModule,
    // ImageCropperModule,
    // NgxBootstrapMultiselectModule,
    NgxDatesPickerModule,
    // MatDatepickerModule,
    // MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    // MatTableModule,
    // MatMomentDateModule,
    MatSelectModule,
    // MatIconModule,
    NgbModule,
    // MatFileUploadModule,
    // NgbPaginationModule, NgbAlertModule,
    // NgFlowchartModule,
    // MatAutocompleteModule,
    NgxMatSelectSearchModule,
    MatCheckboxModule,
    // SignaturePadModule,
    PdfJsViewerModule,
    // MatExpansionModule,
    // CdkStepperModule,
    MatStepperModule,
    // MatRadioModule,
    NgOtpInputModule,
    // FontAwesomeModule,
    // AswFormBuilderModule,
    // AswPreviewTemplateModule
    
  ],
  schemas: [ 
    CUSTOM_ELEMENTS_SCHEMA
  ],
  declarations: [
    AppComponent,
    ...APP_CONTAINERS,
    P404Component,
    P500Component,
    LoginComponent,
    ProfileComponent,
    ParametrageComponent,
    
    MessageComponent,
    ConfirmComponent,
    ChangePwdComponent,
    RedirectPortailComponent,
    CodeConfirmationComponent,
    SocietesComponent,
    FactureComponent,
    PaiementComponent,
    CashpowerComponent,
    CashpowerHistoComponent,
    PaiementCreationComponent,
    CashpowerCreationComponent,
    PaiementValidationComponent,
    CashpowerValidationComponent,
    PaiementAnnulationComponent,
    PaiementHistoriqueComponent,
    CashpowerAnnulationComponent,
    CashpowerLastJetonComponent,
    CashpowerReactionComponent,
    GestionCompteurComponent,
    CompteurNonValideComponent,
    CompteurDejaValideComponent,
    PieceComponent,
    HomeComponent,
    PaiementGuichetComponent,
    GestionClientsComponent,
    InitierPaiementComponent,
    ObtenirTokenComponent,
    EnvironmentUatComponent,
    BaseDeDonneesComponent
  ],
  providers: [CookieService,
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
      
    },
    // IconSetService,
    ConnexionService,
    SettingsService,
    AuthService,
    AuthentificationService,
    AuthGuard
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
 