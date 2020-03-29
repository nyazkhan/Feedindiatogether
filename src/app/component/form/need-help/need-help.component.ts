import { Component, OnInit, Inject } from '@angular/core';
import { DataService } from 'src/app/service/data.service';
export class Hero {

  constructor(
    public id: number,
    public name: string,
    public power: string,
    public alterEgo?: string
  ) { }

}
@Component({
  selector: 'app-need-help',
  templateUrl: './need-help.component.html',
  styleUrls: ['./need-help.component.scss']
})
export class NeedHelpComponent implements OnInit {
  // serviceType: {
  //   food: false,
  //   clothes: false,
  //   shelter: false,
  //   other: false
  // },


  userDetails: any = {
    needyName: '',
    needyPhone: '',
    informerName: '',
    informerPhone: '',
    serviceType: {
      food: false,
      clothes: false,
      shelter: false,
      other: false
    },
    description: '',
    state: '',
    district: '',
    block: '',
    locality: '',
    pincode: '',

  };
  blockArray: any = [];
  slectedBlock: any;
  blockSettings: any;
  constructor(
    @Inject(DataService) private dataService: DataService,

  ) {
    this.dataService.getDataFromGithub().subscribe((res) => {
      console.log(res.India[res.India.length - 1]);


    });

  }
  ngOnInit() {

    this.blockSettings = {
      singleSelection: true,
      idField: 'pattern',
      textField: 'label',
      itemsShowLimit: 2,
      closeDropDownOnSelection: true,
      allowSearchFilter: true
    };
  }
  findPlace() {
    this.dataService.getDataByPincode(this.userDetails.pincode).subscribe((res) => {
      if (res[0].Status === 'Success') {
        console.log(res[0].PostOffice);
        this.userDetails.state = res[0].PostOffice[0].State;
        this.userDetails.district = res[0].PostOffice[0].District;
        this.blockArray = res[0].PostOffice.map((ele) => {
          return ele.Name;
        });
      } else {
        this.userDetails.state = '';
        this.userDetails.district = '';
        this.blockArray = [];
        this.slectedBlock = [];
      }
      console.log(res[0]);
      console.log(this.userDetails);

    });
  }
  onBlockSelect(item) {
    console.log(item, this.slectedBlock);

  }
}
