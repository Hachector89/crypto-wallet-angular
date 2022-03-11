import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email = new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(35), Validators.pattern("^[\\w!#$%&'*+/=?`{|}~^-]+(?:\\.[\\w!#$%&'*+/=?`{|}~^-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,6}$")]);
  password = new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(25)]);

  constructor(private router: Router,
              private authService: AuthService ) { }

  ngOnInit(): void {

    sessionStorage.clear();

  }


  login() {

    if ( this.email.valid && this.password.valid ) {

      this.authService.login( this.email.value, this.password.value )
        .subscribe( ok => {
          
          if( ok === true ){
            this.router.navigate(['./wallet/dashboard']);
          } else {
            Swal.fire('Error', ok, 'error');
          }
          
        });
      
    } else {
      this.email.markAsTouched();
      this.password.markAsTouched();
    }

  }

  register(){
    this.router.navigate(['./auth/register']);
  }

  getErrorMessage(field: string) {


    switch (field) {

   
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


      default:
        return '';
    }



  }

}
