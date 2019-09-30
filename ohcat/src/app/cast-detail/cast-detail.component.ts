import { Component, OnInit, ViewChildren, ElementRef, QueryList } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CastsService } from '../casts.service';
import { Cast } from '../cast';

import { Globals } from '../globals';

@Component({
  selector: 'app-cast-detail',
  templateUrl: './cast-detail.component.html',
  styleUrls: ['./cast-detail.component.css']
})
export class CastDetailComponent implements OnInit {
  cast: Cast;
  pics: String[];
  has_pics = false;
  pics_page = 0;
  pics_per_page = 12;
  pics_to_render: String[];

  @ViewChildren('video') videos: QueryList<ElementRef>;

  constructor(
    private globals: Globals,
    private route: ActivatedRoute,
    private castsService: CastsService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.castsService.getCastByDate(String(+params.get('date')))
        .subscribe(cast => this.cast = cast[0]);
      this.castsService.getPics(String(+params.get('date')))
        .subscribe(pics => {
          if (pics.length > 0) {
            this.has_pics = true;
            this.pics = pics;
            this.picsUpdate();
          }
        });
    });
  }

  picsUpdate() {
    this.pics_to_render = this.pics.slice(
      this.pics_page * this.pics_per_page,
      this.pics_page * this.pics_per_page + this.pics_per_page
    );
  }

  picsScrollBack() {
    if (this.pics_page > 0) {
      this.pics_page--;
      this.picsUpdate();
    }
    console.log(this.pics_page);
  }

  picsScrollFwd() {
    if (this.pics_page < (this.pics.length / this.pics_per_page) - 1) {
      this.pics_page++;
      this.picsUpdate();
    }
    console.log(this.pics_page);
  }

  ngAfterViewInit() {
    this.videos.changes.subscribe((changes) => {
      changes.forEach((video: ElementRef) => {
        video.nativeElement.muted = true;
      })
    });
  }
}
