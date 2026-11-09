import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-gestion-clients',
  templateUrl: './gestion-clients.component.html',
  styleUrls: ['./gestion-clients.component.scss']
})
export class GestionClientsComponent implements OnInit {

  // URL de votre backend local
  private apiUrl = 'http://localhost:5000/routes/clients';

  listeClients: any[] = [];
  
  nouveauClient = {
    merchantCode: '',
    name: '',
    url_callback: '',
    type: 'MERCHANT'
  };

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.chargerClients();
  }

  // 1. Récupérer la liste depuis le backend
  chargerClients() {
    this.http.get<any>(this.apiUrl).subscribe(
      (res) => {
        if (res.response === 'ok') {
          this.listeClients = res.data;
        }
      },
      (error) => console.error('Erreur lors du chargement', error)
    );
  }

  // 2. Ajouter un client via le backend (MySQL + Keycloak)
  ajouterClient() {
    this.http.post<any>(this.apiUrl, this.nouveauClient).subscribe(
      (res) => {
        if (res.response === 'ok') {
          alert('Client ajouté avec succès dans MySQL et Keycloak !');
          this.chargerClients(); // Rafraîchir la liste
          // Réinitialiser le formulaire
          this.nouveauClient = { merchantCode: '', name: '', url_callback: '', type: 'MERCHANT' };
        }
      },
      (error) => {
        console.error(error);
        alert('Erreur: ' + (error.error.message || 'Impossible d\'ajouter le client'));
      }
    );
  }

  // 3. Supprimer un client
  supprimerClient(code: string) {
    if (confirm('Voulez-vous vraiment supprimer ce partenaire ?')) {
      this.http.delete<any>(`${this.apiUrl}/${code}`).subscribe(
        (res) => {
          if (res.response === 'ok') {
            this.chargerClients(); // Rafraîchir la liste
          }
        },
        (error) => console.error('Erreur lors de la suppression', error)
      );
    }
  }
}