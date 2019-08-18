import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { AccountRegisterComponent } from './account-register/account-register.component';
import { Routes, RouterModule } from '@angular/router';

const appRoutes: Routes = [
  { path: 'register', component: AccountRegisterComponent }
];

@NgModule({
  declarations: [AppComponent, MainMenuComponent, AccountRegisterComponent],
  imports: [
    RouterModule.forRoot(appRoutes, { enableTracing: true }),
    BrowserModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
