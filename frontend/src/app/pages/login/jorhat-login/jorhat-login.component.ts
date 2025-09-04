import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-jorhat-login',
  templateUrl: './jorhat-login.component.html',
  styleUrls: ['./jorhat-login.component.css']
})
export class JorhatLoginComponent implements OnInit {

  public isLogin: boolean = false;
  public userCredentials = {
    email: "",
    password: ""
  };
  
  constructor(
    private loginService: LoginService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.init();
  }
  init = () =>{
  }

  ngOnInit(): void {
  }

  setCache = async () => {
    const newCache = await caches.open("new-cache");
    let obj = {
      id: 1,
      name: "Pragyan"  
    };
    newCache.add("yes");
  };

  login = () => {
    if (this.userCredentials.email == "") {
      this.toastr.error("Please enter email id.", "Blank email", {
        disableTimeOut: false
      });
    } else if (this.userCredentials.password == "") {
      this.toastr.error("Please enter your password.", "Blank password", {
        disableTimeOut: false
      });
    } else {
      this.isLogin = true;
      const requestObject = {
        email: this.userCredentials.email,
        password: this.userCredentials.password
      };

      this.loginService.loginVerify(requestObject, (res: any) => {
        this.isLogin = false;
        if (res.status == true) {
          let data = res.message;
          const userid = data.usr.email;
          localStorage.setItem("token", JSON.stringify(data));
          this.setCache();
          //  this.router.navigate(['/home']);
          window.location.href = "/#/home";
          location.reload();
        } else if (res.status == false) {
          if (res.type == "password") {
            this.toastr.error(
              "Please enter a valid password.",
              "Wrong password!",
              {
                disableTimeOut: false
              }
            );
          } else {
            this.toastr.error(
              "User with this Email cannot be found.",
              "Wrong email!",
              {
                disableTimeOut: false
              }
            );
          }
        }
      });
    }
  };

}
