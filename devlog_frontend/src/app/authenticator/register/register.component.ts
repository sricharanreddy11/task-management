import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthenticatorService } from '../authenticator.service';
import { last, Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm!: FormGroup;
  message: string = '';
  private authSubscribe: Subscription | undefined;

  constructor(private authService: AuthenticatorService) {
    this.registerForm = new FormGroup({
      first_name: new FormControl('',[Validators.required]),
      last_name: new FormControl(''),
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      this.message = 'Please enter a valid details.';
      return;
    }
    const email = this.registerForm.value.email;
    const first_name = this.registerForm.value.first_name;
    const last_name = this.registerForm.value.last_name;
    this.authSubscribe = this.authService.registerUser(first_name,last_name,email).subscribe(
      (requestData) => {
        console.log(requestData);
        this.message = 'User registered Sucessfully';

      },
      error => {
        console.log(error.error);
        this.message = error.error;
      }
    );
  }

  closeMessage(){
    this.message = ''
  }

  ngOnDestroy(){
    this.authSubscribe?.unsubscribe()
  }
}
