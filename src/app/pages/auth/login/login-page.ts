import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { ChevronLeft, LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'login-page',
  standalone: true,
  imports: [RouterLink, LucideAngularModule, ReactiveFormsModule],
  templateUrl: './login-page.html',
})
export class LoginPage {

  keycloak = inject(KeycloakService);
  router = inject(Router)

  readonly ChevronLeft = ChevronLeft;

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  async onSubmit() {
    const { email, password } = this.loginForm.value;
    if (!email || !password) {
      return;
    }
    // const isValid = await this.keycloak.login(email, password);

    // if (!isValid) {
    //   alert('Invalid email or password');
    // }
    else {
      // if (this.keycloak.getUser()?.role === 'ADMIN') {
      //   this.router.navigate(['/recruiter']);
      // } else {
      //   this.router.navigate(['/']);
      // }
    }
  }
}
