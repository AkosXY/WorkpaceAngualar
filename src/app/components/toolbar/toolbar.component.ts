import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/serivces/authentication.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent {

  constructor(private authService :AuthenticationService) { }


  getAuthenticated(): boolean{
    return this.authService.getAuthenticated();
  }

  logout(){
    this.authService.logout()
  }
  

}
