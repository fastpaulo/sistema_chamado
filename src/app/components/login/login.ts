import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth-service';
@Component({
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export class Login  {
   loginForm: FormGroup;
  isLoading = false;
  private router = inject(Router)

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      const credentials = this.loginForm.value;
      
      // Simulação de chamada de API
      console.log('Autenticando:', credentials);
      setTimeout(() => {
        this.isLoading = false;
        this.router.navigate(['/dashboard'])
      }, 1500);
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  loginWithSSO() {
    console.log('Iniciando fluxo de Single Sign-On (ex: Active Directory)');
  }
  
}