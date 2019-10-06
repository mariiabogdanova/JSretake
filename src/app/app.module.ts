import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AgmCoreModule } from '@agm/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlaceDetailsComponent } from './places/place-details/place-details.component';
import { PlaceListComponent } from './places/place-list/place-list.component';

@NgModule({
  declarations: [
    AppComponent,
    PlaceDetailsComponent,
    PlaceListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCZQaeF34-eJSqUKgQ9xnDTPb6oFPAGieU'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
