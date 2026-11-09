import { Component, OnInit } from '@angular/core';
import { ConnexionService } from '../../services/connexion.service';

@Component({
  selector: 'app-redirect-portail',
  templateUrl: './redirect-portail.component.html',
  styleUrls: ['./redirect-portail.component.scss']
})
export class RedirectPortailComponent implements OnInit {

  constructor(
      private connexion:ConnexionService) { }

  ngOnInit(): void {
    window.location.replace(this.connexion.portal);
  }

}
