import {Component, OnInit} from '@angular/core';

import {House} from "../../model/house";
import {HouseService} from "../../service/house.service";
import {Image} from "../../model/Image";
import {ActivatedRoute, ParamMap} from "@angular/router";


@Component({
  selector: 'app-house-list',
  templateUrl: './house-list.component.html',
  styleUrls: ['./house-list.component.css']
})
export class HouseListComponent implements OnInit{
  id: number = 0;
  houses: House[] = [];
  listHouse!: House[]
  lastPage!: number;
  listImage: Image[] = [];
  listFirstImage: string[] = [];
  listPageNumber: number[] = [];
  page: number = 0;
  constructor(private houseService: HouseService,
              private activatedRoute: ActivatedRoute) {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      // @ts-ignore
      this.page = +paramMap.get('start');
      this.getAllHouse(this.page);
    });
  }

  ngOnInit() {

  }
  getAllHouse(start: number){
    this.houseService.getAllHouse(start).subscribe(result => {
        this.houses = result;
      // console.log(this.houses)

      for (let i = 0; i < this.houses.length; i++) {
        // @ts-ignore
        this.listFirstImage.push(String(this.houses[i].image[0].imageName))
      }
      }, error => {
        console.log(error);
      }
    )
  }

  getPageNumberMax() {
    this.houseService.getAll().subscribe(res => {
      this.listHouse = res;
      this.lastPage = Math.floor(((this.listHouse.length) / 9));
      for (let i = 0; i <= Math.floor(this.listHouse.length / 9); i++) {
        this.listPageNumber.push((i + 1));
      }
    })
  }


}
