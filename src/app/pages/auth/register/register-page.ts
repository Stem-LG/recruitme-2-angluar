import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ChevronLeft, LucideAngularModule } from 'lucide-angular';
import { AuthService } from '../../../services/auth';

@Component({
  selector: 'register-page',
  standalone: true,
  imports: [RouterLink, LucideAngularModule, ReactiveFormsModule],
  providers: [AuthService],
  templateUrl: './register-page.html',
})
export class RegisterPage {
  authService = inject(AuthService);
  router = inject(Router)

  readonly ChevronLeft = ChevronLeft;

  registerForm = new FormGroup({
    username: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
    role: new FormControl('USER') // Default to USER role
  });

  async onSubmit() {
    const { username, email, password, confirmPassword, role } = this.registerForm.value;
    if (!username || !email || !password || !confirmPassword || !role) {
      return;
    }
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    console.log('Registering user with username:', username, 'email:', email, 'password:', password, 'role:', role);

    const isRegistered = await this.authService.register(username, email, password, role);
    if (!isRegistered) {
      alert('Registration failed');
    } else {
      alert('Registration successful, please login');
      this.router.navigate(['/login']);
    }
  }

  // Helper function to toggle role
  toggleRole() {
    const currentRole = this.registerForm.get('role')?.value;
    this.registerForm.patchValue({
      role: currentRole === 'USER' ? 'ADMIN' : 'USER'
    });
  }
}
