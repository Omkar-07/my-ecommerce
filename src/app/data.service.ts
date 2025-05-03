import { Injectable, signal } from '@angular/core';
import { Addresses, Product } from './models/product.model';
import { HttpClient } from '@angular/common/http';
import { map, Subject, } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  // private API_LINk = 'https://67e7951720e3af747c3eee0b.mockapi.io/products';
  private API_LINk = environment.ENDPOINT;
  cartCount: number = 0;

  // private Add_Link='https://67e7951720e3af747c3eee0b.mockapi.io/addresses';
  private Add_Link=environment.ADDENDPOINT;

  isLoggedIn = true;

  public mainArr: Product[] = [];
  public mainAddress:Addresses[] =[];

  constructor(private http: HttpClient) {}

  public productSubject = new Subject();
  // public productSignal=signal()

  getData() {
    this.http.get(this.API_LINk).pipe(
      map((data: any) => {
        
        const mapData = data.map((prod: any) => {
          return {
            ...prod,
            price: prod.price * 85.53,
          };
        });

        return mapData;
      })
    ).subscribe({
      next: (products) => {
        this.productSubject.next(products);
      }
    })
    // .subscribe((data) => {
    //   this.dataSubject.next(data);
    // })
  }

  getSingleProduct(id : number){
    return this.http.get(this.API_LINk + "/" + id);
  }

  postData(product: Product) {
    return this.http.post(this.API_LINk, product);
  }

  deleteProduct(id: number) {
    return this.http.delete(this.API_LINk + '/' + id);
  }


  getAddress(){
    return this.http.get<Addresses[]>(this.Add_Link);
  }
  postAddress(address:Addresses){
    return this.http.post<Addresses>(this.Add_Link,address);
  }

  updateAddress(id :any,value:any){
    return this.http.put(this.Add_Link+"/"+id,value);

  }

  deleteAddress(id: any) {
    return this.http.delete(this.Add_Link + "/" + id);
  }
  

}
