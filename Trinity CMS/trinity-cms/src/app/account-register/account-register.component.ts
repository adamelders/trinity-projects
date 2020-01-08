import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-account-register',
  templateUrl: './account-register.component.html',
  styleUrls: ['./account-register.component.css']
})
export class AccountRegisterComponent implements OnInit {
  @Input()
  accountName: string;
  @Input()
  accountEmail: string;
  @Input()
  accountPassword: string;

  constructor() {}

  ngOnInit() {}

  createAccount() {
    // todo
  }
}
