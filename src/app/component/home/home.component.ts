import { Component, OnInit, Inject } from '@angular/core';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  corornaVirusPatient = {
    date: '2020-3-28',
    confirmed: 987,
    deaths: 24,
    recovered: 84,
    active: 903,

  };
  todayscount: any;
  StateData: any;
  date: any;
  confirmed: any;
  deaths: any;
  recovered: any;
  active: any;
  constructor(
    @Inject(DataService) private dataService: DataService,

  ) {
    this.dataService.getDataFromGithub().subscribe((res) => {
      console.log(res.India[res.India.length - 1]);
      this.todayscount = res.India[res.India.length - 1];
      this.corornaVirusPatient.date = this.todayscount.date;
      this.corornaVirusPatient.confirmed = this.todayscount.confirmed;
      this.corornaVirusPatient.deaths = this.todayscount.deaths;
      this.corornaVirusPatient.recovered = this.todayscount.recovered;
      this.corornaVirusPatient.active = this.todayscount.confirmed - this.todayscount.recovered;
    });
  }

  ngOnInit() {
    // this.dataService.getStateWiseData().subscribe((res: any) => {
    //   this.date =res.lastUpdated;
    //   res.data.map(element => {

    //   });
    //   for (let i = 0; i < res.data.length; i++) {
    //     const element = res.data[i];

    //   }
    // });
  }

}
