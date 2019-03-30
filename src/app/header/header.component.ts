import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { ApidataService } from "../apidata.service";
import { ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  apidata:any;
  userid:any;
  allcart:any;
  showcart:boolean=false;

  products:any;

  cartproducts:any;
  cartproid:any;
  
  id: string;
  filtervalue = {
    Pcategories: ""
  }
  constructor(public route: ActivatedRoute,private router: Router,public authService: AuthService,public servicedata: ApidataService) { }

  ngOnInit() {
    this.userid= parseInt(this.route.snapshot.paramMap.get('uid'));
    // console.log(this.userid);
    
    this.id = localStorage.getItem('token');
    
    this.servicedata
      .getcart()
      .pipe()
      .subscribe(value => {
        this.apidata = value;
        //  console.log("leys are here ", Object.keys(this.apidata));
        this.allcart = Object.keys(this.apidata).map(apidata => {
          return this.apidata[apidata];
        });
        // console.log(this.allcart);
      });

      this.servicedata
      .getproducts()
      .pipe()
      .subscribe(value => {
        this.apidata = value;
        //  console.log("leys are here ", Object.keys(this.apidata));
        this.products = Object.keys(this.apidata).map(apidata => {
          return this.apidata[apidata];
        });
       
        // console.log("from header",this.products);
      });

    
  }
  filter(key,value) {
    // console.log("teena");
    this.filtervalue[key] = value;
    // console.log(key,value);
    this.servicedata.setData(this.filtervalue)
  }
  logout(): void {
    // console.log("Logout");
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  getcart(){

    this.gotoProductDetails(this.userid);

    // this.cartproducts=[];
    // console.log(this.allcart);
    
    // this.allcart.map(ele=>{
    //   if (ele.id == this.userid){
    //     this.cartproid = ele.pid;
    //   }
    // })
    // // console.log("header" ,this.products);
    // console.log("all product ids",this.cartproid);
    // this.cartproid.map((ele)=>{
    //   // console.log("sdkuhhu",ele);
      
    //   this.products.map((pro)=>{
    //     // console.log("dgjgjsdg",pro.Pid);
        
    //     if(pro.Pid==ele){
    //        this.cartproducts.push(pro)
    //     }
    //   })
    // })
    // // console.log("all products",this.cartproducts);   
    // this.showcart=true;
  }


  public gotoProductDetails(uid?) {
    this.router.navigate(['/cart', uid]).then( (e) => {
      if (e) {
        console.log(" successful! in comtent");
      } else {
        console.log(" failed! from content ");
      }
    });
   
  }

 
}
