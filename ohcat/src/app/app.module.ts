import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CastListComponent } from './cast-list/cast-list.component';
import { CastDetailComponent } from './cast-detail/cast-detail.component';
import { CastsService } from './casts.service';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { QuantumLeapComponent } from './quantumleap/quantumleap.component';

import { OhdatePipe } from './ohdate.pipe';
import { Globals } from './globals';


@NgModule({
  declarations: [
    AppComponent,
    CastListComponent,
    CastDetailComponent,
    NavBarComponent,
    OhdatePipe,
    QuantumLeapComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      { path: '', component: CastListComponent },
      { path: 'search', component: CastListComponent },
      { path: 'date/:date', component: CastDetailComponent },
      { path: 'year', component: CastListComponent },
      { path: 'quantumleap', component: QuantumLeapComponent }
    ]),
    HttpClientModule,
    FormsModule
  ],
  providers: [
    Globals,
    CastsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
