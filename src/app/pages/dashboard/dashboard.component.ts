import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  imports: [ReactiveFormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  user: any;
  productsSubmenuVisible: boolean = false;
  ordersSubmenuVisible: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(){
    this.getUser();
  }

  toggleSubmenu(event: Event, submenu: string) {
    event.preventDefault();
    if (submenu === 'products') {
      this.productsSubmenuVisible = !this.productsSubmenuVisible;
    } else if (submenu === 'orders') {
      this.ordersSubmenuVisible = !this.ordersSubmenuVisible;
    }
  }

  logout(): boolean {
    try {
      this.authService.logout().subscribe({
        next: (response) => {
          localStorage.removeItem('access_token');
          console.log('Saiu com sucesso', response);

          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error('Erro ao sair', error);
        },
      });
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  getUser() {
    this.authService.getUser().subscribe({
      next: (data) => {
        this.user = data;
      },
      error: (error) => {
        console.error('Erro ao buscar informações', error);
      },
    });
  }
}
