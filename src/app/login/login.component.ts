import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApidataService } from "../apidata.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userLogin: FormGroup;
  allemail: Array<any> = [];
  allpwd: Array<any> = [];
 
  email:any;
  password:any;
  encpwd:any;

  apiuser: any;
  users: any;
  uid:any;

  isEyeClose:boolean=true;

  constructor(public servicedata: ApidataService, private router: Router) {
    this.userLogin = new FormGroup({
      email: new FormControl('', [Validators.required,Validators.pattern("[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}")]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),

    });
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
        this.users.map(ele => {
          this.allpwd.push(btoa(ele.password));
        });
        // console.log("this is user data from login",this.users[0].email ,this.users[0].password );
      });

  }

  get fieldValues() {
    return this.userLogin.controls;
  }
  
  onSubmit(){

    console.log(this.allpwd);
    
    const result = this.allemail.filter(email => email == this.email);
    
    const result2 = this.allpwd.filter(pwd => pwd == this.password);
    // console.log(result);
    

    this.users.map((ele)=>{ 
      if(ele.email == result[0]){
          this.uid = ele.id;

      }
    })

    if (result.length >0 && result2.length>0 ){
      // alert("id  exist");
      localStorage.setItem('isLoggedIn',"true");
      localStorage.setItem('token',this.email);
      this.gotoProductDetails(this.uid);
    
    }
    else{

      alert("id does not exist")
    }

  }

  public gotoProductDetails(uid?) {
    this.router.navigate(['/products', uid]).then( (e) => {
      if (e) {
        console.log("Navigation is successful! in comtent");
      } else {
        console.log("Navigation has failed! from content ");
      }
    });
   
  }
  eyes(){
    if(this.isEyeClose){
      this.isEyeClose=false;
    }
    else{
      this.isEyeClose=true;
    }
  }


}
