import { Component, EventEmitter, Output } from '@angular/core';
import { Product } from '../models/product.model';
import { DataService } from '../data.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {
  // createObj : Product = {
  //   name: '',
  //   img: '../../assets/images/playstation.jpg',
  //   description: '',
  //   price: 0
  // };

  productForm: FormGroup;
  submitted:boolean=false;

  constructor(private dataService: DataService) {
    this.productForm = new FormGroup({
      'name': new FormControl('', [Validators.required, Validators.minLength(10)]),
      'description': new FormControl(''),
      'price': new FormControl(''),
    })
  }

  //For Template Driven form 
  // onSubmit(productForm: any) {

  //   if(productForm.valid){
  //     const productData=productForm.value;
  //   this.dataService.postData(productData).subscribe({
  //     complete: ()=> {
  //       this.dataService.getData();
  //     }
  //   });
  //   }else{
  //     console.log('valid');
  //   }

  //   // console.log(productForm)

  // }


  //Reactive form 
  onSubmit() {
    console.log(this.productForm.valid);
    this.submitted=true;
    if (this.productForm.valid) {
      const productData = this.productForm.value;
      this.dataService.postData(productData).subscribe({
        complete: () => {
          this.dataService.getData();
          this.productForm.reset();
          this.submitted=false;
        }
      });
    } else {
      console.log('Invalid');
    }
  }
}
