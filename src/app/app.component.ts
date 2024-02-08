import { Component, HostListener, OnInit } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  headerfixes: boolean = false;

  @HostListener('window:scroll', []) onScroll(){
    if(window.scrollY > 7*16){
      this.headerfixes = true;
    }
    else{
      this.headerfixes = false;
    }
  }

  constructor(private authService: AuthService) {}

  ngOnInit() {
    const rememberedUser = localStorage.getItem('rememberMe');
    if (rememberedUser) {
      const user = JSON.parse(rememberedUser);
      this.authService.login(user.email, user.password, true)
        .then(() => {
          console.log("User logged in from rememberMe");
        })
        .catch(() => {
          console.log("Error logging in from rememberMe");
        });
    }
    if(!this.authService.isLoggedIn){
      localStorage.removeItem("uid");
    }
  }
}
