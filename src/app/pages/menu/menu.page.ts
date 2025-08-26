import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class MenuPage implements OnInit {
  menus: any[] = [];
  cart: any[] = [];

  constructor(private api: ApiService, private router: Router) {}

  ngOnInit() {
    this.api.getMenus().subscribe({
      next: (res: any) => this.menus = res,
      error: () => alert('Gagal memuat menu')
    });
  }

  addToCart(menu: any) {
    this.cart.push({ menu_id: menu.id, quantity: 1, name: menu.name });
    alert(menu.name + ' ditambahkan ke keranjang');
  }

  goToCart() {
    localStorage.setItem('cart', JSON.stringify(this.cart));
    this.router.navigateByUrl('/cart');
  }
}
