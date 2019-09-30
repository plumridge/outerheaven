import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quantumleap',
  templateUrl: './quantumleap.component.html',
  styleUrls: ['./quantumleap.component.css']
})
export class QuantumLeapComponent implements OnInit {
  years = [];
  
  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
    let today = new Date();
    for (let i = 2005; i <= today.getFullYear(); i++) {
      this.years.push(i);
    }
    this.years = this.years.reverse();
  }

  leap(year: string) {
    this.router.navigate(["/year"], 
      { queryParams: 
        { 'date_from': year + "0101",
          'date_to': year + "1231"
        }
      });
  }

}
