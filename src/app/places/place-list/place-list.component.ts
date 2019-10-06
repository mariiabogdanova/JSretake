// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-place-list',
//   templateUrl: './place-list.component.html',
//   styleUrls: ['./place-list.component.css']
// })
// export class PlaceListComponent implements OnInit {

//   constructor() { }

//   ngOnInit() {
//   }

// }

import { Component, OnInit } from '@angular/core';
import { Place } from '../place';
import { PlaceService } from '../place.service';
import { PlaceDetailsComponent } from '../place-details/place-details.component';
z
@Component({
  selector: 'place-list',
  templateUrl: './place-list.component.html',
  styleUrls: ['./place-list.component.css'],
  providers: [PlaceService]
})

export class PlaceListComponent implements OnInit {

  places: Place[]
  selectedPlace: Place

  constructor(private placeService: PlaceService) { }

  ngOnInit() {
     this.placeService
      .getPlaces()
      .then((places: Place[]) => {
        this.places = places.map((place) => {
          if (!place.description) {
            place.description = ''
          }
          return place;
        });
      });
  }

  private getIndexOfPlace = (placeId: String) => {
    return this.places.findIndex((place) => {
      return place._id === placeId;
    });
  }

  selectPlace(place: Place) {
    this.selectedPlace = place
  }

  createNewPlace() {
    var place: Place = {
      name: '',
      description: '',
      activities: ''
    };

    // By default, a newly-created place will have the selected state.
    this.selectPlace(place);
  }

  deletePlace = (placeId: String) => {
    var idx = this.getIndexOfPlace(placeId);
    if (idx !== -1) {
      this.places.splice(idx, 1);
      this.selectPlace(null);
    }
    return this.places;
  }

  addPlace = (place: Place) => {
    this.places.push(place);
    this.selectPlace(place);
    return this.places;
  }

  updatePlace = (place: Place) => {
    var idx = this.getIndexOfPlace(place._id);
    if (idx !== -1) {
      this.places[idx] = place;
      this.selectPlace(place);
    }
    return this.places;
  }
}