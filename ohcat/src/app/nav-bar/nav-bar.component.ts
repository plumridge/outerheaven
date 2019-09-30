import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  search_string;
  date_string;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    this.search_string = "";
  }

  searchSubmit() {
      this.router.navigate(["/search"], { queryParams: { 'show': this.search_string } });
  }
}
