import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class CheckoutPage implements OnInit {
  cart: any[] = [];
  result: any;

  constructor(private api: ApiService) {}

  ngOnInit() {
    const saved = localStorage.getItem('cart');
    this.cart = saved ? JSON.parse(saved) : [];
  }

  doCheckout() {
    this.api.checkout(this.cart).subscribe({
      next: (res: any) => this.result = res,
      error: () => alert('Checkout gagal')
    });
  }
}
