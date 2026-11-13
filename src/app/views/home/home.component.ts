import { Component, OnInit } from '@angular/core';
import { ConnexionService } from '../../services/connexion.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  adress

  constructor(
    private connexion:ConnexionService,
    private activatedRoute: ActivatedRoute,) { }

  ngOnInit(): void {
    var url1=window.location.href
      
                      var path=url1.split("#")
    // console.log(path)
    this.adress=path[0]
  }

}
