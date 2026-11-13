import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-initier-paiement',
  templateUrl: './initier-paiement.component.html',
  styleUrls: ['./initier-paiement.component.scss']
})
export class InitierPaiementComponent implements OnInit {

  private apiUrl = 'http://localhost:5000/routes';

  listeEnvironments: any[] = [];
  environmentSelectionne: any = null;
  environmentMisAJour: any = null;

  paiement = {
    merchantTransID: '',
    merchantCode: '',
    amount: '',
    customerAccount: '',
    description: '',
    merchantPin: ''
  };

  chargement: boolean = false;

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
          // Sélectionner automatiquement le premier environnement
          if (this.listeEnvironments.length > 0) {
            this.environmentSelectionne = this.listeEnvironments[0];
            this.remplirPaiement();
          }
        }
      },
      (error) => console.error('Erreur chargement environnements', error)
    );
  }

  selectionnerEnvironment(event: any) {
    const id = event.target.value;
    this.environmentSelectionne = this.listeEnvironments.find(e => e.id == id);
    this.environmentMisAJour = null;
    this.remplirPaiement();
  }

  remplirPaiement() {
    if (this.environmentSelectionne) {
      this.paiement.merchantCode = this.environmentSelectionne.merchantCode;
      this.paiement.amount = this.environmentSelectionne.amount;
      this.paiement.customerAccount = this.environmentSelectionne.customerAccount;
      this.paiement.description = this.environmentSelectionne.description;
      this.paiement.merchantPin = this.environmentSelectionne.merchantPin;
      this.paiement.merchantTransID = 'TEST-' + Date.now();
    }
  }

  initierPaiement() {
    if (!this.environmentSelectionne) return;

    this.chargement = true;
    this.environmentMisAJour = null;

    this.http.post<any>(`${this.apiUrl}/initier-paiement`, this.paiement).subscribe(
      (res) => {
        this.chargement = false;
        if (res.response === 'ok') {
          alert(`✅ Paiement initié !\nStatus: ${res.data.status}\nRaison: ${res.data.reason}`);
          this.environmentMisAJour = res.environment;
          this.paiement.merchantTransID = 'TEST-' + Date.now();
        } else {
          alert('❌ Erreur: ' + (res.message || 'Impossible d\'initier le paiement'));
        }
      },
      (error) => {
        this.chargement = false;
        console.error(error);
        alert('❌ Erreur: ' + (error.error?.details || error.error?.message || 'Erreur lors de l\'appel'));
      }
    );
  }
}