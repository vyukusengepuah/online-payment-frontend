// ==========================================
// IMPORTATIONS NÉCESSAIRES
// ==========================================
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

// ==========================================
// DÉCLARATION DU GUARD
// ==========================================
// @Injectable : permet d'injecter ce service dans d'autres composants
// CanActivate : interface qui définit une méthode pour autoriser ou non l'accès à une route
@Injectable({
  providedIn: 'root' // Le service est disponible dans toute l'application
})
export class AuthGuard implements CanActivate {

  // ==========================================
  // CONSTRUCTEUR
  // ==========================================
  // On injecte le Router pour pouvoir rediriger l'utilisateur
  constructor(private router: Router) { }

  // ==========================================
  // MÉTHODE canActivate
  // ==========================================
  // Cette méthode est appelée automatiquement par Angular
  // lorsqu'on essaie d'accéder à une route protégée par ce Guard.
  // Elle doit retourner :
  //   - true : si l'accès est autorisé
  //   - false : si l'accès est refusé (et on redirige l'utilisateur)
  canActivate(): boolean {
    
    // 1. On vérifie si l'utilisateur est connecté
    // On regarde dans le sessionStorage si la clé 'isLoggedIn' existe et vaut 'true'
    // Cette clé est définie dans le composant LoginComponent après une connexion réussie
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');

    // 2. Si l'utilisateur est connecté
    if (isLoggedIn === 'true') {
      // On autorise l'accès à la route
      return true;
    } 
    
    // 3. Si l'utilisateur n'est pas connecté
    else {
      // On le redirige vers la page de login
      // navigate() prend un tableau de segments d'URL
      this.router.navigate(['/login']);
      
      // On refuse l'accès à la route demandée
      return false;
    }
  }
}