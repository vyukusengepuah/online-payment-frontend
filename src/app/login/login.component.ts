import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  username: string = '';
  password: string = '';
  erreur: string = '';

  // Identifiants de test (à remplacer par une vraie authentification)
  private validUsername = 'admin';
  private validPassword = 'admin123';

  constructor(private router: Router) { }

  seConnecter() {
  // Connexion temporaire : accepte n'importe quel identifiant
  sessionStorage.setItem('isLoggedIn', 'true');
  this.router.navigate(['/gestion-clients']);
}
}