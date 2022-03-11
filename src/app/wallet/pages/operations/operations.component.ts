import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';
import { cryptoResponse, Data } from '../../interfaces/authInterface';
import { PairingService } from '../../services/pairing.service';
import Swal from 'sweetalert2';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-operations',
  templateUrl: './operations.component.html',
  styleUrls: ['./operations.component.css']
})
export class OperationsComponent implements OnInit {

  cryptoPairing: cryptoResponse = {
    data: {
      base: '',
      currency: '',
      amount: 0,
      pairing: 0
    }
  }

  parity: number = 0;

  ELEMENT_DATA: Data[] = [];
  displayedColumns: string[] = ['base', 'currency', 'amount', 'parity'];

  fiatCurrency = new FormControl(0, [Validators.required, Validators.min(0.01), Validators.minLength(1), Validators.maxLength(25), Validators.pattern("^[0-9]*\.[0-9]{0,2}$")]);
  cryptoCurrency = new FormControl(0, [Validators.required, Validators.min(0.000001), Validators.minLength(1), Validators.maxLength(25), Validators.pattern("^[0-9]*\.[0-9]{0,6}$")]);

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
      this.parity = this.cryptoPairing.data.pairing;
      this.ELEMENT_DATA = [this.cryptoPairing.data];

    });

  }
  buyCrypto() {
    if (this.fiatCurrency.valid) {

      if (this.fiatCurrency.value > this.user.fiatCurrency) {
        Swal.fire('Error', 'Insufficient money', 'error');
      } else {

        const newFiat: number = this.user.fiatCurrency - this.fiatCurrency.value;
        const newCrypto: number = this.user.cryptoCurrency + (this.fiatCurrency.value / this.cryptoPairing.data.amount);

        this.authService.update(this.user.email, newFiat, newCrypto)
          .subscribe(ok => {

            if (ok === true) {
              this.router.navigate(['./wallet/dashboard']);
            } else {
              Swal.fire('Error', ok, 'error');
            }

          });
      }

    } else {
      this.fiatCurrency.markAllAsTouched();
    }

  }
  sellCrypto() {
    if (this.cryptoCurrency.valid) {

      if (this.cryptoCurrency.value > this.user.cryptoCurrency) {
        Swal.fire('Error', 'Insufficient crypto currency', 'error');
      } else {

        const newCrypto: number = this.user.cryptoCurrency - this.cryptoCurrency.value;
        const newFiat: number = this.user.fiatCurrency + (this.cryptoCurrency.value * this.cryptoPairing.data.amount);

        this.authService.update(this.user.email, newFiat, newCrypto)
          .subscribe(ok => {

            if (ok === true) {
              this.router.navigate(['./wallet/dashboard']);
            } else {
              Swal.fire('Error', ok, 'error');
            }

          });
      }

    } else {
      this.cryptoCurrency.markAllAsTouched();
    }

  }



  dashboard() {
    this.router.navigateByUrl('/wallet/dashboard');
  }

  logout() {
    this.router.navigateByUrl('/auth');
    this.authService.logout();
  }

  getErrorMessage(field: string) {


    switch (field) {

      case 'fiatCurrency':
        if (this.fiatCurrency.hasError('min')) {
          return 'Your currency must be greater or equal than 0.01';
        }

        if (this.fiatCurrency.hasError('minlength')) {
          return 'Your currency must contain at least 1 characters.';
        }

        if (this.fiatCurrency.hasError('maxlength')) {
          return "Your currency can't have more than 25 characters.";
        }

        if (this.fiatCurrency.hasError('pattern')) {
          return "Your currency must be numeric and greater or equal than 0.01 and max 2 decimals.";
        }

        return this.fiatCurrency.hasError('required') ? 'A currency is required.' : '';

      case 'cryptoCurrency':
        if (this.cryptoCurrency.hasError('min')) {
          return 'Your currency must be greater or equal than 0.000001';
        }

        if (this.cryptoCurrency.hasError('minlength')) {
          return 'Your currency must contain at least 1 characters.';
        }

        if (this.cryptoCurrency.hasError('maxlength')) {
          return "Your currency can't have more than 25 characters.";
        }

        if (this.cryptoCurrency.hasError('pattern')) {
          return "Your currency must be numeric and greater or equal than 0.000001 and max 6 decimals.";
        }

        return this.cryptoCurrency.hasError('required') ? 'A currency is required.' : '';

      default:
        return '';
    }

  }


}
