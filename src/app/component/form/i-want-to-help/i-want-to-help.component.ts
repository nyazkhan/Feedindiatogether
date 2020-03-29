import { Component, OnInit, Inject } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { DataService } from 'src/app/service/data.service';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/service/alert.service';

@Component({
  selector: 'app-i-want-to-help',
  templateUrl: './i-want-to-help.component.html',
  styleUrls: ['./i-want-to-help.component.scss']
})
export class IWantToHelpComponent implements OnInit {

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
    this.firestore.collection('WantToHelp').add(this.userDetails).then((docRef) => {
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
        this.userDetails.state = '';
        this.userDetails.district = '';
        this.blockArray = [];
        this.slectedBlock = [];
      }
      console.log(res[0]);
      console.log(this.userDetails);

    });
  }



}
