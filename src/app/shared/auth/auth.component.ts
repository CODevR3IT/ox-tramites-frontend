import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
    selector: 'app-auth',
    imports: [],
    template: ``,
    styles: ``
})
export class AuthComponent {
  constructor(private readonly route: ActivatedRoute, private readonly authService: AuthService){}
  ngOnInit(){
    this.route.queryParams.subscribe((params) => {
      if(!params['t']) this.authService.logout();
      this.authService.login(params['t']).subscribe();
    });
  }
}
