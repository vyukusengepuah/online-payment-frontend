import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, Injectable, OnInit, ViewChild } from '@angular/core';
import { map } from 'rxjs/operators';
import { ConnexionService } from '../../../services/connexion.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-piece',
  templateUrl: './piece.component.html',
  styleUrls: ['./piece.component.scss']
})
export class PieceComponent implements OnInit {

  @ViewChild('pdfViewerAutoLoad') pdfViewerAutoLoad;
  constructor(
    private http: HttpClient,
    private connexion:ConnexionService,  
    private activatedRoute: ActivatedRoute,
  ) { }

  private downloadFile(url: string): any {
    return this.http.get(url, { responseType: 'blob' })
        .pipe(
            map((result: any) => {
                return result;
            })
        );
}

  ngOnInit(): void {

    if(this.activatedRoute.snapshot.queryParams.TYPE==1)
      var nom="facture_"
    else var nom="cashpower_"

    let url = this.connexion.base_url+"REGIDESO/"+nom+this.activatedRoute.snapshot.queryParams.ID+".pdf"; 
  var path="uploads/REGIDESO/"+nom+this.activatedRoute.snapshot.queryParams.ID+".pdf"
    this.downloadFile(url).subscribe(
    (res) => {
        this.pdfViewerAutoLoad.pdfSrc = res; // pdfSrc can be Blob or Uint8Array
        this.pdfViewerAutoLoad.refresh(); // Ask pdf viewer to load/reresh pdf
      }
    );
  }


  
}
