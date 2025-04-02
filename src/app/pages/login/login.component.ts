import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], // Aqui está o importante!
  templateUrl: './login.component.html',
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      console.log('Enviando:', this.loginForm.value); // 👈 Veja se está certo
      this.authService.login(this.loginForm.value).subscribe({
        next: (response) => {
          console.log('Login bem-sucedido:', response);
          localStorage.setItem('token', response.access_token);
        },
        error: (error) => {
          console.error('Erro no login:', error);
        },
      });
    }
  }
}
