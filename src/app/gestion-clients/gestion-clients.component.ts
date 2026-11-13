import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gestion-clients',
  templateUrl: './gestion-clients.component.html',
  styleUrls: ['./gestion-clients.component.scss']
})
export class GestionClientsComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    // On ne redirige plus automatiquement
  }

  // Méthodes pour naviguer vers les différentes pages
  goToEnvironment() {
    this.router.navigate(['/environment-uat']);
  }

  goToToken() {
    this.router.navigate(['/obtenir-token']);
  }

  goToPaiement() {
    this.router.navigate(['/initier-paiement']);
  }

    // Méthode pour ouvrir phpMyAdmin sur le serveur BANCOBU UAT
  goToDatabase() {
    // Ouvre phpMyAdmin sur le serveur UAT (server=2) dans un nouvel onglet
    window.open('http://localhost/phpmyadmin/index.php?route=/&server=2', '_blank');
  }

  seDeconnecter() {
    // On supprime l'indicateur de session
    sessionStorage.removeItem('isLoggedIn');
    // On redirige vers la page de login
    this.router.navigate(['/login']);
  }
}