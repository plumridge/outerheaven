import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Cast } from './cast';
// import { start } from 'repl';

@Injectable({
  providedIn: 'root'
})
export class CastsService {
  // api = "http://localhost:3000/api/";
  api = "http://192.168.0.20:3000/api/"
  casts: Cast[];
  constructor(
    private http: HttpClient
  ) { }

  getAllCasts() {
    return this.http.get<Cast[]>(this.api + "casts/");
  }

  getCastsBetweenDates(start_date: string, end_date: string) {
    return this.http.get<Cast[]>(this.api + "casts/" + start_date + "/" + end_date);
  }

  getCastByDate(date: string) {
    return this.http.get<Cast>(this.api + "casts/" + date);
  }

  getCastsByShow(show: string) {
    return this.http.get<Cast[]>(this.api + "show/" + show);
  }

  getPics(date: string) {
    return this.http.get<String[]>(this.api + "pics/" + date);
  }
}
