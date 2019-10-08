import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AgmCoreModule, GoogleMapsAPIWrapper  } from '@agm/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlaceDetailsComponent } from './places/place-details/place-details.component';
import { PlaceListComponent } from './places/place-list/place-list.component';
import { MapComponent } from './places/map/map.component';

@NgModule({
  declarations: [
    AppComponent,
    PlaceDetailsComponent,
    PlaceListComponent,
    MapComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FormsModule,
    // NgbModule.forRoot(),
    AgmCoreModule.forRoot({apiKey: 'AIzaSyCZQaeF34-eJSqUKgQ9xnDTPb6oFPAGieU'}),
  ],
  providers: [ GoogleMapsAPIWrapper ],
  bootstrap: [AppComponent]
})


export class AppModule { }
