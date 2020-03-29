import { Component, OnInit, Inject } from '@angular/core';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-needy-form',
  templateUrl: './needy-form.component.html',
  styleUrls: ['./needy-form.component.scss']
})
export class NeedyFormComponent implements OnInit {
  NeedyDetails: any = {};
  data: any;
  constructor(
    @Inject(DataService) private dataService: DataService,

  ) { }
  addressDropdownListLevel1 = [];
  addressDropdownListLevel2 = [];
  addressDropdownListLevel3 = [];
  addressDropdownListLevel4 = [];
  addressSettings = {};
  allData: any = [];
  allDataCopy: any = [];
  ngOnInit() {

    // this.data = [{ 'name': 'Anil', 'anil.singh581@gmail.com': 'ssd', 'age': '34', 'city': 'Noida, UP, India' },
    // { 'name': 'Anil', 'email': 'anil.singh581@gmail.com', 'age': '34', 'city': 'Noida' },
    // { 'name': 'Sunil', 'email': 'anil.singh581@gmail.com', 'age': '34', 'city': 'Noida' },
    // { 'name': 'Alok', 'email': 'anil.singh581@gmail.com', 'age': '34', 'city': 'Noida' },
    // { 'name': 'Tinku', 'email': 'anil.singh581@gmail.com', 'age': '34', 'city': 'Noida' },
    // { 'name': 'XYZ', 'email': 'anil.singh581@gmail.com', 'age': '34', 'city': 'Noida' },
    // { 'name': 'asas', 'email': 'anil.singh581@gmail.com', 'age': '34', 'city': 'Noida' },
    // { 'name': 'erer', 'email': 'anil.singh581@gmail.com', 'age': '34', 'city': 'Noida' },
    // { 'name': 'jhjh', 'email': 'anil.singh581@gmail.com', 'age': '34', 'city': 'Noida' }
    // ]



    let village;
    this.addressSettings = {
      singleSelection: true,
      idField: 'pattern',
      textField: 'label',
      // selectAllText: 'Select All',
      // unSelectAllText: 'UnSelect All',
      itemsShowLimit: 2,
      closeDropDownOnSelection: true,
      allowSearchFilter: true
    };
    this.dataService.getData().subscribe((res) => {
      console.log(res.Sheet1);
      this.allData = res.Sheet1;  // village = this.mapFunction(res.Sheet1, 'villagename');
      this.allDataCopy = res.Sheet1;
      this.addressDropdownListLevel1 = this.mapFunction(res.Sheet1, 'villagename').filter((value, index, self) => {
        return self.indexOf(value) === index;
      });
      console.log(this.addressDropdownListLevel1);
      console.log(this.NeedyDetails);

      // locality_detail1
    });

  }
  onItemSelectL1(item) {
    // this.maplevel2(this.allData, 'villagename', 'locality_detail1')
    this.NeedyDetails.address2 = [];

    this.addressDropdownListLevel2 = this.allData.filter((value, index, self) => {
      return (value.villagename === item);
    }).map((res) => {
      return res.locality_detail1;
    })
      .filter((val, ind, slf) => {
        return slf.indexOf(val) === ind;
      });
    console.log(this.NeedyDetails);

    console.log(this.addressDropdownListLevel2);

  }

  mapFunction(array, value) {
    return array.map(element => {
      return element[value];
    });
  }

  maplevel2(array, val, val2) {
    return array.map(element => {
      return element[val] && element[val2];
    });
  }


  onItemSelectL2(item) {
    this.NeedyDetails.address3 = [];
    console.log(this.NeedyDetails.address1[0]);
    console.log(this.NeedyDetails);

    this.addressDropdownListLevel3 = this.allData.filter((value, index, self) => {
      return (value.villagename === this.NeedyDetails.address1[0]) && (value.locality_detail1 === item);
    })
      .map((res) => {
        return res.locality_detail2;
      })
      .filter((val, ind, slf) => {
        return slf.indexOf(val) === ind;
      });
    console.log(this.addressDropdownListLevel3);

  }
  onItemSelectL3(item) {
    this.addressDropdownListLevel4 = this.allData.filter((value, index, self) => {
      return (value.villagename === this.NeedyDetails.address1[0]) &&
        (value.locality_detail1 === this.NeedyDetails.address2[0]) && (value.locality_detail2 === item);
    })
      .map((res) => {
        return res.locality_detail3;
      })
      .filter((val, ind, slf) => {
        return slf.indexOf(val) === ind;
      });
    console.log(this.addressDropdownListLevel4);

  }
  onItemSelectL4() {

  }


  filterData(event: any) {
    const val = event.target.value.toLowerCase();
    if (val.length > 4) {
      this.dataService.getDataByPincode(val).subscribe((res) => {
        console.log(res);

      });
    }
    console.log(val);

    // if (val && val.trim() !== '') {
    //   this.allData = this.allDataCopy.filter(element => {
    //     return element.villagename.toLowerCase().startsWith(val) || element.locality_detail1.toLowerCase().startsWith(val)
    //     || element.locality_detail3.toLowerCase().startsWith(val) || element.Pincode.toLowerCase().startsWith(val)
    //     ;
    //   });
    // } else {
    //   this.allData = this.allDataCopy;
    // }
  }
  // searchStudent(event: any) {
  //   const val = event.target.value.toLowerCase();
  //   if (val && val.trim() !== '') {
  //     this.studentFeeDetails = this.allItems.filter(student => {
  //       return student.fullName.toLowerCase().startsWith(val);
  //     });
  //   } else {
  //     this.studentFeeDetails = this.allItems;
  //   }
  // }

}
