import { INavData } from '@coreui/angular';
// import { DefaultLayoutComponent } from './containers';

// DefaultLayoutComponent
//  defo:DefaultLayoutComponent
export const navItems: INavData[] = [
  {
    name: "Accueil",
    url: '/accueil',
    icon: 'icon-home',
    // badge: {
    //   variant: 'info',
    //   text: 'NEW'
    // }
  },
  {
    name: "Paiement au guichet",
    url: '/regideso/Paiement_guichet',
    icon: 'fa fa-money',

  },
  // {
  //   title: true,
  //   name: 'General'
  // },
  
  {
    name: 'Nos compteurs',
    url: '/compteur',
    icon: 'fa fa-recycle',
    children: [
      {
        name: ' Ajout',
        url: '/compteur/ajout',
        icon: ' '
      },{
        name: ' A Valider',
        url: '/compteur/non_valide',
        icon: ' '
      }
      // ,{
      //   name: '  Deja Validés',
      //   url: '/compteur/deja_valide',
      //   icon: ' '
      // },{
      //   name: '  Annulés',
      //   url: '/compteur/annules',
      //   icon: ' '
      // }
    ]
  },
  {
    name: 'Paiement facture',
    url: '/facture',
    icon: 'fa fa-file',
    children: [
      {
        name: ' Initier paiment',
        url: '/facture/creation',
        icon: ' '
      },{
        name: ' Paiement à Valider',
        url: '/facture/paiement',
        icon: ' '
      },
      // {
      //   name: '  Factures deja Payées',
      //   url: '/facture/factures',
      //   icon: ' '
      // },{
      //   name: '  Factures Annulées',
      //   url: '/facture/paiement_annule',
      //   icon: ' '
      // }
    ]
  },

  {
    name: 'Cashpower',
    url: '/cashpower',
    icon: 'fa fa-money',
    children: [
      {
        name: 'Initier l\'Achat',
        url: '/cashpower/achat',
        icon: ' '
      },{
        name: 'Achats encours',
        url: '/cashpower/encours',
        icon: ' '
      },
      // {
      //   name: 'Achats validés',
      //   url: '/cashpower/validation',
      //   icon: ' '
      // },{
      //   name: ' Achats annulés',
      //   url: '/cashpower/annulation',
      //   icon: ' '
      // }
      // ,{
      //   name: ' Dernier jeton',
      //   url: '/cashpower/last_jeton',
      //   icon: ' '
      // }
    ]
  },
  {
    name: 'Reporting',
    url: '/reporting',
    icon: 'fa fa-dashboard',
    children: [
      {
        name: 'Tableau de bord',
        url: '/reporting/dashboard',
        icon: ' '
      },
      {
        name: 'Compteurs validés',
        url: '/reporting/deja_valide',
        icon: ' '
      },{
        name: 'Compteurs annulés',
        url: '/reporting/annules',
        icon: ' '
      },
      //  {
      //   name: 'Paiement encours',
      //   url: '/reporting/paiement_encours',
      //   icon: ' '
      // },
      {
        name: 'Paiement validés',
        url: '/reporting/paiement_valide',
        icon: ' '
      },{
        name: 'Paiement annulés',
        url: '/reporting/paiement_annule',
        icon: ' '
      },
      // {
      //   name: 'Cashpower encours',
      //   url: '/reporting/cashpower_encour',
      //   icon: ' '
      // },
      {
        name: 'Cashpower validés',
        url: '/reporting/cashpower_valide',
        icon: ' '
      },{
        name: 'Cashpower annulés',
        url: '/reporting/cashpower_annule',
        icon: ' '
      }
    ]
  },
 

];
