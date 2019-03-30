import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ApidataService } from "../apidata.service";
import { Router } from "@angular/router";


@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  userLogin: FormGroup;
  useresist: boolean = false;
  allemail: Array<any> = [];
  uid:any;

  newuser: any = {
    email: "",
    id: "",
    name: "",
    number: "",
    password: ""
  };

  apiuser: any;
  users: any;

  encpass: any;

  constructor(public servicedata: ApidataService,  private router: Router) {
    this.userLogin = new FormGroup({
      name: new FormControl("", Validators.required),
      phone: new FormControl("", [
        Validators.required,
        Validators.minLength(10)
      ]),
      email: new FormControl("", [
        Validators.required,
        Validators.pattern(
          "[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}"
        )
      ]),
      password: new FormControl("", [
        Validators.required,
        Validators.minLength(8)
      ])
    });
  }

  get fieldValues() {
    return this.userLogin.controls;
  }

  ngOnInit() {
    this.servicedata
      .getusers()
      .pipe()
      .subscribe(value => {
        this.apiuser = value;
        // console.log("leys are here ", this.apiuser);
        this.users = Object.keys(this.apiuser).map(data => {
          return this.apiuser[data];
        });

        this.users.map(ele => {
          this.allemail.push(ele.email);
        });
        // console.log("this is user data from register", this.users.length);
      });
  }

 

register() {
    // console.log(this.newuser);

    const result = this.allemail.filter(email => email == this.newuser.email);

    if (result.length == 0) {
      // console.log(this.newuser);
      this.encpass = atob(this.newuser.password);
      //  console.log(this.encpass);
      this.newuser.password = this.encpass;
      this.newuser.id = this.users.length + 1;
      // console.log(this.newuser);
    
      this.servicedata
        .adduser(this.newuser)
        .subscribe(user => this.users.push(this.newuser));
       
        // this.users.map((ele)=>{ 
        //   if(ele.email == result[0]){
        //       this.uid = ele.id;}
        //   });
        localStorage.setItem('isLoggedIn',"true");
        localStorage.setItem('token',this.newuser.email);
       this.gotoProductDetails(this.newuser.id)

        // console.log(this.newuser);
    }

   
    else{
      alert("this email exist")
    }

  }

  public gotoProductDetails(uid?) {
    this.router.navigate(['/products', uid]).then( (e) => {
      if (e) {
        console.log("Navigation is successful! in comtent" , uid);
      } else {
        console.log("Navigation has failed! from content ", uid);
      }
    });
   
  }


}
