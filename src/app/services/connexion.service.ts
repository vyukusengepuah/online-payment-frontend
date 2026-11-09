import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConnexionService {

  // base_url="http://172.16.150.43:8001/";
  // service_regideso_p="regideso-uat"
  service_regideso_p="regideso-service"
  service_regideso_ft="regideso-ft-service"
  ModeFinalFlag="N"
  Mode="N"
  
  
  
  

  // base_url="http://172.16.150.60:8005/";
  // portal="http://172.16.150.60";
  // Numero_de_Caisse="57201"
  // base_url="http://172.16.150.43:8005/";
  // portal="http://172.16.150.43";
  // Numero_de_Caisse="57001"
  base_url="http://localhost:5000";
  portal="https://digitalhub.bancobu.com";
  Numero_de_Caisse="57001"
  


  portal_public="https://digitalhub.bancobu.com";

  // base_url="http://localhost:8001/";
  // thunes_url="http://localhost:8100/";
  thunes_url="http://localhost:8001/";
  local_url="http://localhost:4201/#/";
  online_url="http://localhost:4201/#/";
  APP_ID=8
  IS_PROD='false'
  // IS_PROD='true'
  CASHOWER="ON"
  BILLPAIEMENT="ON"
  SESSION_TIME=15
  constructor() { }
}
