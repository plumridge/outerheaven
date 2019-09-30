import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ohdate'
})
export class OhdatePipe implements PipeTransform {

  transform(raw_date: string): string {
    let raw_year = raw_date.substring(0,4);
    let raw_month = raw_date.substring(4,6);
    let raw_day = raw_date.substring(6,8);

    let month_str;
    let day_super;

    switch(Number(raw_day) % 10) {
      case 1:
        day_super = "st";
        break;
      case 2:
        day_super = "nd";
        break;
      case 3:
        day_super = "rd";
        break;
      default:
        day_super = "th";
    }

    //English is bad
    switch(Number(raw_day)) {
      case 11:
        day_super = "th";
        break;
      case 12:
        day_super = "th";
        break;
      case 13:
        day_super = "th";
        break;
      default:
    }

    switch(Number(raw_month)) {
      case 1:
        month_str = "January";
        break;
      case 2:
        month_str = "February";
        break;
      case 3:
        month_str = "March";
        break;
      case 4:
        month_str = "April";
        break;
      case 5:
        month_str = "May";
        break;
      case 6:
        month_str = "June";
        break;
      case 7:
        month_str = "July";
        break;
      case 8:
        month_str = "August";
        break;
      case 9:
        month_str = "September";
        break;
      case 10:
        month_str = "October";
        break;
      case 11:
        month_str = "November";
        break;
      case 12:
        month_str = "December";
        break;
      default:
        month_str = "Crebuary";
    }
    

    return month_str + " " + String(Number(raw_day)) 
      + day_super + ", " + raw_year;
  }

}
