import {Component, OnInit} from '@angular/core';
import {House} from "../../model/house";
import {HouseService} from "../../service/house.service";

@Component({
  selector: 'app-house-search',
  templateUrl: './house-search.component.html',
  styleUrls: ['./house-search.component.css']
})
export class HouseSearchComponent implements OnInit{
    listHouseSearch: House[] = [];
    listFirstImage: string[] = [];
    bedrooms: string = "";
    bathrooms: string = "";
    rent: string = "";
    startTime: string = "";
    endTime: string = "";
    address: string = "";
    rentMin: number = 0;
    rentMax: number = 0;
  constructor(private houseService: HouseService) {
    debugger
    this.bedrooms =  String(localStorage.getItem("bedrooms"));
    this.bathrooms =  String(localStorage.getItem("bathrooms"));
    this.rent =  String(localStorage.getItem("rent"));
    this.address =  String(localStorage.getItem("address"));
    this.startTime =  String(localStorage.getItem("startTime"));
    this.endTime =  String(localStorage.getItem("endTime"));
    this.getRent(this.rent);
    console.log(this.bedrooms)
    this.searchHouse(this.bedrooms, this.bathrooms, this.address, this.rentMin, this.rentMax, this.startTime, this.endTime)
  }

    ngOnInit(): void {
  }
  searchHouse(bedrooms: string,
              bathrooms: string,
              address: string,
              rentMin: number,
              rentMax: number,
              startTime: string,
              endTime: string){
  this.houseService.findByAll(bedrooms, bathrooms, address, rentMin, rentMax, startTime, endTime).subscribe( res => {
    this.listHouseSearch = res;
    for (let i = 0; i < this.listHouseSearch.length; i++) {
      // @ts-ignore
      this.listFirstImage.push(String(this.listHouseSearch[i].image[0].imageName))
    }
  }, error => {
    console.log(error);
  })
  }
  getRent(rent: string){
    switch(rent) {
      case "1":
        this.rentMin = 0;
        this.rentMax = 1000000;
        break;
      case "2":
        this.rentMin = 1000000;
        this.rentMax = 2000000;
        break;
      case "3":
        this.rentMin = 2000000;
        this.rentMax = 1000000000;
        break;
      default:
        this.rentMin = 0;
        this.rentMax = 1000000000;
    }
  }
}
