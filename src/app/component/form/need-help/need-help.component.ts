import { Component, OnInit, Inject } from '@angular/core';
import { DataService } from 'src/app/service/data.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/service/alert.service';
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
    noOfPersons: '',
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
    @Inject(AngularFirestore) private firestore: AngularFirestore,
    @Inject(Router) private router: Router,
    @Inject(AlertService) private alertService: AlertService,
  ) { }

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

  SaveUserDeatils() {
    console.log(this.userDetails);

    this.firestore.collection('NeedHelp').add(this.userDetails).then((docRef) => {
      this.router.navigate(['/home']);


    }).catch((error) => {
      this.alertService.showErrorMesg('Error adding document: ');

    });
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
        this.alertService.showErrorMesg(res[0].Message);
        this.userDetails.state = '';
        this.userDetails.district = '';
        this.blockArray = [];
        this.slectedBlock = [];
      }
      console.log(res[0]);
      console.log(this.userDetails);

    });
  }

  checkPincode(event) {
    const val = event.target.value;
    console.log(val.length > 6);

    if (val.length > 6) {
      this.userDetails.pincode = val.substring(0, 6);
    }
    console.log(this.userDetails.pincode);

  }
  submitForm() {
    // tslint:disable-next-line: triple-equals
    if (this.userDetails.pincode.length !== 6) {
      return this.alertService.showErrorMesg('pleas enter the pincode');
    }
    if (this.userDetails.state == '') {
      return this.alertService.showErrorMesg('pleas change the pincode for fectch state');

      // tslint:disable-next-line: align
    } if (this.userDetails.district == '') {
      return this.alertService.showErrorMesg('pleas change the pincode for fectch District');

      // tslint:disable-next-line: align
    } if (this.userDetails.block == '') {
      return this.alertService.showErrorMesg('pleas select block');

      // tslint:disable-next-line: align
    } if (this.userDetails.locality == '') {
      return this.alertService.showErrorMesg('pleas enter the Locality');

      // tslint:disable-next-line: align
    } if (this.userDetails.description == '') {
      return this.alertService.showErrorMesg('pleas enter the description');

      // tslint:disable-next-line: align
    } if (this.userDetails.informerName == '') {
      return this.alertService.showErrorMesg('pleas enter Informer Name');

      // tslint:disable-next-line: align
    } if (this.userDetails.informerPhone == '') {
      return this.alertService.showErrorMesg('pleas enter Informer Phone');

      // tslint:disable-next-line: align
    }
    this.SaveUserDeatils();
    // if (this.userDetails.description == '') {

    //   // tslint:disable-next-line: align
    // } if (this.userDetails.description == '') {

    // }
  }

  onBlockSelect(item) {
    console.log(item, this.slectedBlock);
    this.userDetails.block = item;
  }

}






