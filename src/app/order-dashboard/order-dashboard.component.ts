import { Component, OnInit } from '@angular/core';
import { FormBuilder , FormGroup} from '@angular/forms'
import { Router } from '@angular/router';
import { ApiService } from '../shared/api.service';
import { OrderModel } from './order-dashboard.model';

@Component({
  selector: 'app-order-dashboard',
  templateUrl: './order-dashboard.component.html',
  styleUrls: ['./order-dashboard.component.css']
})
export class OrderDashboardComponent implements OnInit {

  dateToday: number = Date.now();
  formValue !: FormGroup;
  orderModelObj : OrderModel = new OrderModel();
  orderData !: any;
  showAdd !: boolean;
  showUpdate !: boolean;

  constructor(private formbuilder: FormBuilder, private api : ApiService,private router : Router) { }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      ID : [''],
      Name : [''],
      Catagory : ['']
    })
    this.getAllOrder();
  }

  clickAddOrder(){
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  postOrderDetails(){
    this.orderModelObj.id = this.formValue.value.id;
    this.orderModelObj.Name = this.formValue.value.Name;
    this.orderModelObj.Catagory = this.formValue.value.Catagory;
    this.orderModelObj.Date = this.formValue.value.Date;

    this.api.postOrder(this.orderModelObj).subscribe(res=>{
      console.log(res);
      alert("Order Added Successfully")
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllOrder();
    },
    err=>{
      alert("Something went wrong")
    })
  }

  getAllOrder(){
    this.api.getOrder(this.orderData)
    .subscribe(res=>{
      this.orderData = res;
    })
  }

  deleteOrder(row : any){
    this.api.deleteOrder(row.id)
    .subscribe(res=>{
      alert("Order Deleted");
      this.getAllOrder();
    })
  }

  onEdit(row : any){
    this.showAdd = false;
    this.showUpdate = true;
    this.orderModelObj.id = row.id;
    this.formValue.controls['ID'].setValue(row.id);
    this.formValue.controls['Name'].setValue(row.Name);
    this.formValue.controls['Catagory'].setValue(row.Catagory);
    // this.formValue.controls['Date'].setValue(row.Date);
  }

  updateOrderDetails(){
    this.orderModelObj.id = this.formValue.value.ID;
    this.orderModelObj.Name = this.formValue.value.Name;
    this.orderModelObj.Catagory = this.formValue.value.Catagory;
    // this.orderModelObj.Date = this.formValue.value.Date;

    this.api.updateOrder(this.orderModelObj,this.orderModelObj.id).subscribe(res=>{
      alert("Updated Successfully");
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllOrder();
    })
  }

  logout(){
    this.router.navigate(['login'])
  }

}
