import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-obtenir-token',
  templateUrl: './obtenir-token.component.html',
  styleUrls: ['./obtenir-token.component.scss']
})
export class ObtenirTokenComponent implements OnInit {

  private apiUrl = 'http://localhost:5000/routes';

  listeEnvironments: any[] = [];
  environmentSelectionne: any = null;
  environmentMisAJour: any = null;

  chargement: boolean = false;

  constructor(private http: HttpClient, private router: Router) { }

    retourMenu() {
  this.router.navigate(['/gestion-clients']);
}

  ngOnInit(): void {
    this.chargerEnvironments();
  }

  // Charge les environnements et sélectionne automatiquement le premier
  chargerEnvironments() {
    this.http.get<any>(`${this.apiUrl}/environments`).subscribe(
      (res) => {
        if (res.response === 'ok') {
          this.listeEnvironments = res.data;
          
          // --- SÉLECTION AUTOMATIQUE DU PREMIER ENVIRONNEMENT ---
          if (this.listeEnvironments.length > 0) {
            this.environmentSelectionne = this.listeEnvironments[0];
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
  }

  obtenirToken() {
    if (!this.environmentSelectionne) return;

    this.chargement = true;
    this.environmentMisAJour = null;

    this.http.post<any>(`${this.apiUrl}/token`, { 
      merchantCode: this.environmentSelectionne.merchantCode 
    }).subscribe(
      (res) => {
        this.chargement = false;
        if (res.response === 'ok') {
          alert('✅ Token obtenu avec succès !');
          this.environmentMisAJour = res.environment;
        } else {
          alert('❌ Erreur: ' + (res.message || 'Impossible d\'obtenir le token'));
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