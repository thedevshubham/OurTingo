import { Component, OnInit } from "@angular/core";
import { ApidataService } from "../apidata.service";
import { Router } from "@angular/router";
import { ActivatedRoute} from '@angular/router';

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.css"]
})
export class ProductsComponent implements OnInit {
  apidata: any;
  products: any;
  userid:any;
  url:any;
  allcart:any;
  cartproducts:any;
  cartproid :any;

  apiuser: any;
  users: any;

  displaywishlist:boolean=true;

  constructor(public servicedata: ApidataService, private router: Router ,public route: ActivatedRoute) {
    this.servicedata.arrobj.subscribe(
      (data)=>{this.products=data}
    )
  }

  ngOnInit() {
    
    this.userid= parseInt(this.route.snapshot.paramMap.get('uid'));

    if(this.userid == 6189){
      this.displaywishlist=false  }
    
      this.servicedata
      .getcart()
      .pipe()
      .subscribe(value => {
        this.apidata = value;
        //  console.log("leys are here ", Object.keys(this.apidata));
        this.allcart = Object.keys(this.apidata).map(apidata => {
          return this.apidata[apidata];
        });
        // console.log("all cart",this.allcart);
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
        console.log(this.products);
      });
    // console.log("sjgjy iuhuds",this.products);
    console.log(this.servicedata.product());
  }

  public gotoProductDetails(Pid?) {
    this.router.navigate(['/details', Pid]).then( (e) => {
      if (e) {
        console.log(" successful! in comtent");
      } else {
        console.log(" failed! from content ");
      }
    });
   
  }
  arrystar(n: number): any[] {
    return Array(n);
  }

  addtocart(pid){
    console.log("show product cart", pid , this.userid);
    this.url = "https://tingo-b5483.firebaseio.com/cart/cart"+this.userid+"/pid.json"
    console.log(this.url);
        
    // this.cartproducts=[];
    console.log(this.allcart);
    
    this.allcart.map(ele=>{
      if (ele.id == this.userid){
        this.cartproid = Object.keys(ele.pid).map(elem => {
          return ele.pid[elem];
        });
        
      }
    })

    this.cartproid.push(pid);

    console.log("qwertyui",this.cartproid);
    

    this.servicedata.updatecart(this.url,this.cartproid).pipe().subscribe();

  }
 
}
