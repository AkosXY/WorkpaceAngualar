import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/serivces/authentication.service';
import { User, NULL_USER} from "../../interface/user.interface";
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  constructor(private authService: AuthenticationService) { }

  userData = NULL_USER;

  ngOnInit(): void{
    this.userData = this.authService.getUserData()   
    console.log(this.userData)
  }

  getUserData(): User{    
    return this.authService.getUserData();
  }

  isUserNull(){
    return this.userData === NULL_USER;
  }

}
