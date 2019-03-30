import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApidataService {
  apidata: any;
  products: any;
  public data: any;
  products2;
  public arrobj: Subject<any> = new Subject<any>();
  constructor(public http : HttpClient ) { }


  getproducts(): Observable<any> {
    return this.http.get<any>('https://tingo-b5483.firebaseio.com/products.json');
  }
  product(){
    this.getproducts().pipe().subscribe(value => {
      this.apidata = value;
      this.products = Object.keys(this.apidata).map(apidata => {
        return this.apidata[apidata];
      });

      console.log(this.products);
    });
  }
  getdata(){
    console.log(this.products);
  }
  getcart(): Observable<any> {
    return this.http.get<any>('https://tingo-b5483.firebaseio.com/cart.json');
  }

  updatecart(url,ucart:any): Observable<any> {
    return this.http.put<any>(url, ucart, this.httpOptions)
  }

  
  
setData(filtervalue) {
  this.products2=this.products;
  

    this.products2 = this.products2.filter((products) => {
      console.log(filtervalue.Pcategories);
      
      if (products.Pcategories == filtervalue.Pcategories) {
        return true;
      }
      return false

    });
    console.log(this.products2);
    this.arrobj.next(this.products2);
  }

  getusers(): Observable<any> {
    return this.http.get<any>('https://tingo-b5483.firebaseio.com/users.json');
  }

  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      // 'Authorization': 'my-auth-token'
    })
  };

  adduser(user:any): Observable<any> {
    return this.http.post<any>('https://tingo-b5483.firebaseio.com/users.json', user,this.httpOptions);
  }

}

