import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class RegisterPage {
  name = '';
  email = '';
  password = '';
  password_confirmation = '';

  constructor(private api: ApiService, private router: Router) {}

  doRegister() {
    this.api.register({
      name: this.name,
      email: this.email,
      password: this.password,
      password_confirmation: this.password_confirmation
    }).subscribe({
      next: () => {
        alert('Registrasi berhasil, silakan login');
        this.router.navigateByUrl('/login');
      },
      error: () => alert('Registrasi gagal')
    });
  }
}
