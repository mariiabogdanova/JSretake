import { Component, Input } from '@angular/core';
import { Place } from '../place';
import { PlaceService } from '../place.service';

@Component({
  selector: 'place-details',
  templateUrl: './place-details.component.html',
  styleUrls: ['./place-details.component.css']
})

export class PlaceDetailsComponent {
  @Input()
  place: Place;

  @Input()
  createHandler: Function;
  @Input()
  updateHandler: Function;
  @Input()
  deleteHandler: Function;

  constructor (private placeService: PlaceService) {}

  createPlace(place: Place) {
    this.placeService.createPlace(place).then((newPlace: Place) => {
      this.createHandler(newPlace);
    });
  }

  updatePlace(place: Place): void {
    this.placeService.updatePlace(place).then((updatedPlace: Place) => {
      this.updateHandler(updatedPlace);
    });
  }

  deletePlace(placeId: String): void {
    this.placeService.deletePlace(placeId).then((deletedPlaceId: String) => {
      this.deleteHandler(deletedPlaceId);
    });
  }
}