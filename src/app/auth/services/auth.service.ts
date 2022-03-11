import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { AuthResponse, User } from '../interfaces/authInterface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseUrl;
  private _user!: User;

  get user() {
    return { ...this._user };
  }

  constructor(private http: HttpClient) { }


  login(email: string, password: string) {

    const url = `${this.baseUrl}/auth`;
    const body = {
      email,
      password
    }

    return this.http.post<AuthResponse>(url, body)
      .pipe(
        tap(resp => {
          if (resp.ok) {
            sessionStorage.setItem('token', resp.token!);
            
            this._user = {
              ok: resp.ok,
              name: resp.name!,
              uid: resp.uid!,
              email: resp.email!,
              fiatCurrency: resp.fiatCurrency!,
              cryptoCurrency: resp.cryptoCurrency!
            }
          }
        }),
        map(valid => valid.ok),
        catchError(err => of(err.error.msg || err.errors.msg))
      );

  }

  register(name: string, email: string, password: string, fiatCurrency: number) {

    const url = `${this.baseUrl}/auth/new`;
    const body = {
      name,
      email,
      password,
      fiatCurrency
    }

    return this.http.post<AuthResponse>(url, body)
      .pipe(
        tap(resp => {
          if (resp.ok) {
            sessionStorage.setItem('token', resp.token!);
            this._user = {
              ok: resp.ok,
              name: resp.name!,
              uid: resp.uid!,
              email: resp.email!,
              fiatCurrency: resp.fiatCurrency!,
              cryptoCurrency: resp.cryptoCurrency!
            }
          }
        }),
        map(valid => valid.ok),
        catchError(err => of(err.error.msg || err.errors.msg))
      );

  }

  update( email: string, fiatCurrency: number, cryptoCurrency: number) {

    const url = `${this.baseUrl}/auth/update`;
    const body = {
      email,
      fiatCurrency,
      cryptoCurrency
    }

    return this.http.post<AuthResponse>(url, body)
      .pipe(
        tap(resp => {
          if (resp.ok) {
            sessionStorage.setItem('token', resp.token!);
            this._user = {
              ok: resp.ok,
              name: resp.name!,
              uid: resp.uid!,
              email: resp.email!,
              fiatCurrency: resp.fiatCurrency!,
              cryptoCurrency: resp.cryptoCurrency!
            }
          }
        }),
        map(valid => valid.ok),
        catchError(err => of(err.error.msg || err.errors.msg))
      );
      
  }


  validateToken(): Observable<boolean> {

    const url = `${this.baseUrl}/auth/renew`;
    const headers = new HttpHeaders()
      .set('x-api-key', sessionStorage.getItem('token') || '');

    return this.http.get<AuthResponse>(url, { headers })
      .pipe(
        map(resp => {
          sessionStorage.setItem('token', resp.token!);
          this._user = {
            ok: resp.ok,
            name: resp.name!,
            uid: resp.uid!,
            email: resp.email!,
            fiatCurrency: resp.fiatCurrency!,
            cryptoCurrency: resp.cryptoCurrency!
          }
          return resp.ok;
        }),
        catchError(err => of(false))
      );

  }

  logout(){
    sessionStorage.clear();
  }

}
