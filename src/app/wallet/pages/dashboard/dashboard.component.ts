import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';
import { cryptoResponse, Data } from '../../interfaces/authInterface';
import { PairingService } from '../../services/pairing.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  cryptoPairing: cryptoResponse = {
    data: {
      base: '',
      currency: '',
      amount: 0,
      pairing: 0
    }
  }

  ELEMENT_DATA: Data[] = [];
  displayedColumns: string[] = ['base', 'currency', 'amount', 'parity'];

  get user() {
    return this.authService.user;
  }

  get crypto() {
    return this.pairingService.crypto;
  }

  constructor(private router: Router,
    private authService: AuthService,
    private pairingService: PairingService) { }

  ngOnInit(): void {

    this.pairingService.getPairing().subscribe((cryptoPairing) => {
      this.cryptoPairing = cryptoPairing;
      this.cryptoPairing.data.pairing = this.user.cryptoCurrency * this.cryptoPairing.data.amount;
      this.ELEMENT_DATA = [this.cryptoPairing.data];
    });
  }

  logout() {
    this.router.navigateByUrl('/auth');
    this.authService.logout();
  }

  operations() {

      this.authService.validateToken()
        .subscribe( ok => {
          
          if( ok === true ){
            this.router.navigate(['./wallet/operations']);
          } else {
            Swal.fire('Error', 'Session Expired', 'error');
            this.router.navigate(['./auth/login']);
          }
          
        });
      
    } 
  


}
