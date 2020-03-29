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
  confirmed = 0;
  deaths = 0;
  recovered = 0;
  active = 0;
  totalForeignCases = 0;
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
    this.dataService.getStateWiseData().subscribe((res: any) => {
      this.date = res.lastUpdated;
      for (const key in res.data) {
        if (res.data.hasOwnProperty(key)) {
          // const element = res.data[key];
          this.confirmed += res.data[key].totalIndianCases;
          this.totalForeignCases += res.data[key].totalForeignCases;
          this.recovered += res.data[key].totalRecovered;
          this.deaths += res.data[key].totalDeaths;
        }
      }
      console.log(this.confirmed + '  ' +
        this.active + '  ' +
        this.recovered + '  ' +
        this.deaths + '  ');
      this.active = this.confirmed - (this.recovered + this.deaths);

    });



  }

}
