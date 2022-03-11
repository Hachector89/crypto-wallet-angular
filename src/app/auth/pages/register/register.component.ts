import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  username = new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]);
  email = new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(35), Validators.pattern("^[\\w!#$%&'*+/=?`{|}~^-]+(?:\\.[\\w!#$%&'*+/=?`{|}~^-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,6}$")]);
  password = new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(25)]);
  fiatCurrency = new FormControl('', [Validators.required, Validators.min(1), Validators.minLength(1), Validators.maxLength(25), Validators.pattern("^[0-9]*$")]);

  constructor(private router: Router,
              private authService: AuthService) { }

  ngOnInit(): void {

    sessionStorage.clear();

  }


  register() {

    if ( this.email.valid && this.password.valid 
      && this.username.valid && this.fiatCurrency.valid ) {

      this.authService.register( this.username.value, this.email.value, 
                                  this.password.value, this.fiatCurrency.value )
        .subscribe( ok => {
          
          if( ok === true ){
            this.router.navigate(['./wallet/dashboard']);
          } else {
            Swal.fire('Error', ok, 'error');
          }
          
        });
      
    } else {
      this.username.markAsTouched();
      this.password.markAsTouched();
      this.email.markAsTouched();
      this.fiatCurrency.markAsTouched();
    }

  }

  login(){
    this.router.navigate(['./auth/login']);
  }

  getErrorMessage(field: string) {


    switch (field) {

      case 'username':
        if (this.username.hasError('minlength')) {
          return 'The name must contain at least 2 characters.';
        }

        if (this.username.hasError('maxlength')) {
          return "The name can't have more than 25 characters.";
        }

        return this.username.hasError('required') ? 'A name is required.' : '';


      case 'email':
        if (this.email.hasError('minlength')) {
          return 'The email must contain at least 4 characters.';
        }

        if (this.email.hasError('maxlength')) {
          return "The email can't have more than 35 characters.";
        }

        if (this.email.hasError('pattern')) {
          return "Email is required and correctly formatted.";
        }

        return this.email.hasError('required') ? 'An email is required.' : '';


      case 'password':
        if (this.password.hasError('minlength')) {
          return 'The password must contain at least 6 characters.';
        }

        if (this.password.hasError('maxlength')) {
          return "The password can't have more than 25 characters.";
        }

        return this.password.hasError('required') ? 'A password is required.' : '';


      case 'fiatCurrency':
        if (this.fiatCurrency.hasError('min')) {
          return 'Your currency must be greater or equal than 1.';
        }

        if (this.fiatCurrency.hasError('minlength')) {
          return 'Your currency must contain at least 1 characters.';
        }

        if (this.fiatCurrency.hasError('maxlength')) {
          return "Your currency can't have more than 25 characters.";
        }

        if (this.fiatCurrency.hasError('pattern')) {
          return "Your currency must be numeric and greater or equal than 1.";
        }

        return this.fiatCurrency.hasError('required') ? 'A currency is required.' : '';

      default:
        return '';
    }



  }

}
