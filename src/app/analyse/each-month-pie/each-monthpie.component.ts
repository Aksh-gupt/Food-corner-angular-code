import { Component, OnInit } from '@angular/core';
import {Chart} from 'chart.js'
import { UserService } from '../../shared/user.service';

@Component({
  selector: 'app-each-monthpie',
  templateUrl: './each-monthpie.component.html',
  styleUrls: ['./each-monthpie.component.css']
})
export class EachMonthpieComponent implements OnInit {
  MonthlyPie = []
  array: Number[];
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.readRecord().subscribe(
      (response) => {
        // console.log(response.json());
        this.array = response.json();
        // console.log(this.array,"akshat");
        const store = document.getElementById('eachMonthPie');

        this.MonthlyPie = new Chart(store, {
          type: 'pie',
          data: {
            labels: ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            datasets: [{
              label: 'Monthly Earning',
              data: this.array,
              backgroundColor: [
                'rgba(255,99,132,0.2)',
                'rgba(54,162,235,0.2)',
                'rgba(255,206,86,0.2)',
                'rgba(75,192,192,0.2)',
                'rgba(255,159,62,0.2)',
                'rgba(25,99,121,0.2)',
                'rgba(54,1,235,0.2)',
                'rgba(25,26,186,0.2)',
                'rgba(175,12,12,0.2)',
                'rgba(155,159,2,0.2)',
                'rgba(75,12,192,0.2)',
                'rgba(25,59,226,0.2)'
              ],
              borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54,162,235,1)',
                'rgba(255,206,86,1)', 
                'rgba(75,192,192,1)',
                'rgba(255,159,62,1)',
                'rgba(25,99,121,1)',
                'rgba(54,1,235,1)',
                'rgba(25,26,186,1)',
                'rgba(175,12,12,1)',
                'rgba(155,159,2,1)',
                'rgba(75,12,192,1)',
                'rgba(25,59,226,1)'
              ],
              borderWidth: 1
            }]
          },
          options: {
            title: {
              text: 'Total sale in every month',
              display: true
            }
          }
        })


      },(error) => {
        console.log(error);
      }
    );
  }

}
