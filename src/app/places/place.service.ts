import { Injectable } from '@angular/core';
import { Place } from './place';
import { Http, Response } from '@angular/http';

@Injectable()
export class PlaceService {
    private placesUrl = '/api/places';

    constructor (private http: Http) {}

    // get("/api/places")
    getPlaces(): Promise<void | Place[]> {
      return this.http.get(this.placesUrl)
                 .toPromise()
                 .then(response => response.json() as Place[])
                 .catch(this.handleError);
    }

    // post("/api/places")
    createPlace(newPlace: Place): Promise<void | Place> {
      return this.http.post(this.placesUrl, newPlace)
                 .toPromise()
                 .then(response => response.json() as Place)
                 .catch(this.handleError);
    }

    // get("/api/places/:id") endpoint not used by Angular app

    // delete("/api/places/:id")
    deletePlace(delPlaceId: String): Promise<void | String> {
      return this.http.delete(this.placesUrl + '/' + delPlaceId)
                 .toPromise()
                 .then(response => response.json() as String)
                 .catch(this.handleError);
    }

    // put("/api/places/:id")
    updatePlace(putPlace: Place): Promise<void | Place> {
      var putUrl = this.placesUrl + '/' + putPlace._id;
      return this.http.put(putUrl, putPlace)
                 .toPromise()
                 .then(response => response.json() as Place)
                 .catch(this.handleError);
    }

    private handleError (error: any) {
      alert("error in service");
      let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
      console.error(errMsg); // log to console instead
    }
}