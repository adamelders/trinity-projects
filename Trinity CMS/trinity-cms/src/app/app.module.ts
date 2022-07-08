import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { MainMenuComponent } from "./main-menu/main-menu.component";
import { AccountRegisterComponent } from "./account-register/account-register.component";
import { Routes, RouterModule } from "@angular/router";
import { MenuItemComponent } from "./menu-item/menu-item.component";

const appRoutes: Routes = [
  { path: "register", component: AccountRegisterComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    MainMenuComponent,
    AccountRegisterComponent,
    MenuItemComponent,
  ],
  imports: [
    RouterModule.forRoot(appRoutes, { enableTracing: true }),
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
