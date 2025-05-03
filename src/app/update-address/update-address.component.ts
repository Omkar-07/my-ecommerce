import { Component, Input } from '@angular/core';
import { Addresses } from '../models/product.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../data.service';

@Component({
  selector: 'app-update-address',
  templateUrl: './update-address.component.html',
  styleUrls: ['./update-address.component.css']
})
export class UpdateAddressComponent {
  @Input() address !: Addresses;
  addressForm : FormGroup;

  constructor(private fb:FormBuilder,private dataService: DataService){
    this.addressForm=this.fb.group({
      'city':['',[Validators.required]],
      'state':[''],
      'country':[''],
    })
  }
  
  ngOnInit(){
    this.addressForm.patchValue(this.address);
  }

  onUpdate(id :any){
    const updateAddress = this.addressForm.value;
    this.dataService.updateAddress(id,updateAddress).subscribe({
      next: () => {
        this.address = { ...this.address, ...updateAddress };
      },
      complete:()=>{
        console.log("Address successfully Updated");
      }
    })
  }


  deleted = false;

onDelete(id: any) {
  this.dataService.deleteAddress(id).subscribe({
    next: () => {
      console.log("Address deleted successfully");
      this.deleted = true;
    }
  });
}

}
