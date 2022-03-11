import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { cryptoResponse } from '../interfaces/authInterface';

@Injectable({
  providedIn: 'root'
})
export class PairingService {

  private pairingUrl: string = environment.pairingUrl;
  private _crypto!: cryptoResponse;

  constructor(private http: HttpClient) { }

  get crypto() {
    return { ...this._crypto };
  }



  getPairing(): Observable<cryptoResponse>{
    const url = this.pairingUrl;
    
    return this.http.get<cryptoResponse>( url );
  }

}
