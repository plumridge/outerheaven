import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CastsService } from '../casts.service';
import { Cast } from '../cast';

import { Globals } from '../globals';

@Component({
  selector: 'app-cast-list',
  templateUrl: './cast-list.component.html',
  styleUrls: ['./cast-list.component.css']
})
export class CastListComponent implements OnInit {
  casts: Cast[];
  
  constructor(
    private globals: Globals,
    private route: ActivatedRoute,
    private castsService: CastsService
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if ("show" in params) {
        this.castsService.getCastsByShow(params["show"])
          .subscribe(casts => this.casts = casts);
      } else if ("date_from" in params) {
        console.log("Date range");
        this.castsService.getCastsBetweenDates(params["date_from"], params["date_to"])
          .subscribe(casts => this.casts = casts);
      } else {
        this.castsService.getAllCasts()
          .subscribe(casts => this.casts = casts);
      }
    });
  }

  castsByDateRange(start_date: string, end_date: string) {
    this.castsService.getCastsBetweenDates(start_date, end_date)
    .subscribe(casts => this.casts = casts);
  }

  castsByShow(show: string) {
    this.castsService.getCastsByShow(show)
    .subscribe(casts => this.casts = casts);
  }

}
