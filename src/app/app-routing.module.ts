import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingsApiComponent } from './bookings-api/bookings-api.component';
import { BookingsComponent } from './bookings/bookings.component';
import { LoginComponent } from './core/auth/login/login.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'bookings', component: BookingsComponent },
  { path: 'bookings-api', component: BookingsApiComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
