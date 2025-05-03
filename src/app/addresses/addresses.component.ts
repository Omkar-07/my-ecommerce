import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../data.service';
import { Addresses } from '../models/product.model';
import { validateCity } from '../shared/city.validator';

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.css']
})
export class AddressesComponent {

  addressForm: FormGroup;
  submitted: boolean = false;
  addresses:any;

  constructor(private dataService: DataService) {
    this.addressForm = new FormGroup({
      'city': new FormControl('', [Validators.required, Validators.minLength(2),validateCity]),
      'state': new FormControl('', [Validators.required, Validators.minLength(2)]),
      'country': new FormControl('', [Validators.required, Validators.minLength(2)]),
    });
  }

  ngOnInit() {
    this.addresses=this.dataService.getAddress();
  }

  onSubmit() {
    this.submitted=true;
    if (this.addressForm.valid) {
      const productData :Addresses = this.addressForm.value;
      this.dataService.postAddress(productData).subscribe({
        complete: () => {
          console.log("Address successfully Submitted");
        }
      });
    } else {
      console.log('Invalid');
    }
  }

  onUpdate(){
    console.log("updated");
  }

}
