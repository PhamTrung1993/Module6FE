import { Component } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {FormControl, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  formSearch = new FormGroup({
    address: new FormControl(),
    startTime: new FormControl(),
    endTime: new FormControl(),
    bedrooms: new FormControl(),
    bathrooms: new FormControl(),
    rent: new FormControl()
  })
  search: any;
  // name: string;
  constructor(
    private router: Router,
    private _mdr: MatDialogRef<SearchComponent>,
    // @Inject(MAT_DIALOG_DATA) data: string
  ) {
    // this.name = data.name;
  }
  CloseDialog() {
    this._mdr.close(false)
  }
  searchAll(){
    this.search = this.formSearch.value;
    if (this.search.address == null || this.search.address == ""){
      this.search.address = ".*";
    }
    if (this.search.bedrooms == null || this.search.bathrooms == ""){
      this.search.bedrooms = ".*";
    }
    if (this.search.bathrooms == null || this.search.bathrooms == ""){
      this.search.bathrooms = ".*";
    }
    if (this.search.bathrooms == null || this.search.bathrooms == ""){
      this.search.address = ".*";
    }
    if (this.search.rent == null){
      this.search.rent = "4";
    }
    if (this.search.startTime == null && this.search.endTime != null ){
      this.search.startTime = this.search.endTime;
    }
    if (this.search.endTime == null && this.search.startTime != null){
      this.search.endTime = this.search.startTime
    }
    if (this.search.startTime == null && this.search.endTime == null){
      this.search.startTime = "2100-01-01";
      this.search.endTime = "2100-02-01";
    }
    if (Date.parse(this.search.startTime) < Date.parse(this.search.endTime)){
      let temp: any;
      temp = this.search.startTime;
      this.search.startTime = this.search.endTime;
      this.search.endTime = temp;
    }
    localStorage.setItem("bedrooms", this.search.bedrooms);
    localStorage.setItem("bathrooms", this.search.bathrooms);
    localStorage.setItem("address", this.search.address);
    localStorage.setItem("startTime", this.search.startTime);
    localStorage.setItem("endTime", this.search.endTime);
    localStorage.setItem("rent", this.search.rent);
    this.router.navigate(['/houseSearch'])
  }
}
