import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-environment-uat',
  templateUrl: './environment-uat.component.html',
  styleUrls: ['./environment-uat.component.scss']
})
export class EnvironmentUatComponent implements OnInit {

  private apiUrl = 'http://localhost:5000/routes';
  modeSecret: string = 'recuperer';
  listeEnvironments: any[] = [];
  environmentSelectionne: any = null;
  baseCible: string = 'local';

  nouvelEnvironment = {
    gateway_url: 'https://192.168.53.53:8443',
    client_id: '',
    merchantCode: '',
    merchantPin: '',
    customerAccount: '',
    amount: '',
    description: '',
    type: 'MERCHANT'
  };

  constructor(private http: HttpClient, private router: Router) { }

  retourMenu() {
  this.router.navigate(['/gestion-clients']);
}

  ngOnInit(): void {
    this.chargerEnvironments();
  }

  chargerEnvironments() {
    this.http.get<any>(`${this.apiUrl}/environments`).subscribe(
      (res) => {
        if (res.response === 'ok') {
          this.listeEnvironments = res.data;
        }
      },
      (error) => console.error('Erreur chargement environnements', error)
    );
  }

  // Sélection d'un environnement : on remplit le formulaire champ par champ
  selectionnerEnvironment(event: any) {
    const id = event.target.value;
    this.environmentSelectionne = this.listeEnvironments.find(e => e.id == id);

    if (this.environmentSelectionne) {
      this.nouvelEnvironment = {
        gateway_url: this.environmentSelectionne.gateway_url || 'https://192.168.53.53:8443',
        client_id: this.environmentSelectionne.client_id || '',
        merchantCode: this.environmentSelectionne.merchantCode || '',
        merchantPin: this.environmentSelectionne.merchantPin || '',
        customerAccount: this.environmentSelectionne.customerAccount || '',
        amount: this.environmentSelectionne.amount || '',
        description: this.environmentSelectionne.description || '',
        type: this.environmentSelectionne.type || 'MERCHANT'
      };
    }
  }

  // Réinitialisation du formulaire
  nouvelEnvironnementVide() {
    this.environmentSelectionne = null;
    this.nouvelEnvironment = {
      gateway_url: 'https://192.168.53.53:8443',
      client_id: '',
      merchantCode: '',
      merchantPin: '',
      customerAccount: '',
      amount: '',
      description: '',
      type: 'MERCHANT'
    };
  }

  // Création d'un nouvel environnement
  creerEnvironment() {
    const payload = {
      ...this.nouvelEnvironment,
      baseCible: this.baseCible
    };

    this.http.post<any>(`${this.apiUrl}/environments`, payload).subscribe(
      (res) => {
        if (res.response === 'ok') {
          alert(`Environnement créé avec succès !\n\nClient ID : ${res.client_id}\nClient Secret : ${res.client_secret}`);
          this.chargerEnvironments();
          this.nouvelEnvironnementVide(); // Réinitialise le formulaire
        }
      },
      (error) => {
        if (error.error.message === "Environnement existant") {
          const confirmer = confirm(`L'environnement ${this.nouvelEnvironment.merchantCode} existe déjà. Voulez-vous le mettre à jour ?`);
          if (confirmer) {
            this.mettreAJourEnvironment();
          }
        } else {
          alert('Erreur: ' + (error.error.message || 'Impossible de créer l\'environnement'));
        }
      }
    );
  }

  // Mise à jour d'un environnement existant
  mettreAJourEnvironment() {
    if (this.environmentSelectionne) {
      this.http.put<any>(`${this.apiUrl}/environments/${this.environmentSelectionne.id}`, this.nouvelEnvironment).subscribe(
        (res) => {
          if (res.response === 'ok') {
            alert('Environnement mis à jour avec succès !');
            this.chargerEnvironments();
            this.nouvelEnvironnementVide(); // Réinitialise le formulaire
          }
        },
        (error) => {
          alert('Erreur lors de la mise à jour: ' + (error.error.message || 'Erreur inconnue'));
        }
      );
    }
  }
}