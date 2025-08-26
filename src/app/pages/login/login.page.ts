import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class LoginPage {
  email = '';
  password = '';

  constructor(private api: ApiService, private router: Router) {}

  doLogin() {
    this.api.login({ email: this.email, password: this.password }).subscribe({
      next: (res: any) => {
        this.api.setToken(res.token);
        this.router.navigateByUrl('/menu');
      },
      error: () => alert('Login gagal')
    });
  }

  goToRegister() {
    this.router.navigateByUrl('/register');
  }
}
