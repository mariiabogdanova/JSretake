import { Component, Input, ViewChild, NgZone, OnInit } from '@angular/core';
import { MapsAPILoader, AgmMap, GoogleMapsAPIWrapper } from '@agm/core';
import { Place } from '../place';
import { PlaceService } from '../place.service';
import { PlaceListComponent } from '../place-list/place-list.component';
// import { GoogleMapsAPIWrapper } from '@agm/core/services';
declare var google: any;
 
interface Marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}
 
interface Location {
  lat: number;
  lng: number;
  viewport?: Object;
  zoom: number;
  address_level_1?:string;
  address_level_2?: string;
  address_country?: string;
  address_zip?: string;
  address_state?: string;
  marker?: Marker;
}

@Component({
  selector: 'app-map',
  // template:`<app-map [mapOf]='Oulu'></app-map>`,
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})


  

// @Input() mapOf: string;

export class MapComponent implements OnInit {

  places: Place[]

  // @Input() public mapOf: string;
  

  geocoder:any;
  public location:Location = {
    lat: 51.678418,
    lng: 7.809007,
    marker: {
      lat: 51.678418,
      lng: 7.809007,
      draggable: true
    },
    zoom: 5
  };
 
  @ViewChild(AgmMap, {static:false}) map: AgmMap;

constructor(public mapsApiLoader: MapsAPILoader,
    private zone: NgZone,
    private wrapper: GoogleMapsAPIWrapper,
    private listComponent: PlaceListComponent, private placeService: PlaceService) {
      this.placeService
      .getPlaces()
      .then((places: Place[]) => {
        this.places = places.map((place) => {
          // if (!place.description) {
          //   place.description = ''
          // }
          console.log(place.name);
          return place;
        });
      });
    // console.log(this.listComponent.place.name);
    this.mapsApiLoader = mapsApiLoader;
    this.zone = zone;
    this.wrapper = wrapper;
    this.mapsApiLoader.load().then(() => {
    this.geocoder = new google.maps.Geocoder();
  });
}

ngOnInit() {
  

  this.findLocation('Helsinki, Finland');
  this.location.marker.draggable = true;
  
}

findLocation(address) {
  if (!this.geocoder) this.geocoder = new google.maps.Geocoder()
  this.geocoder.geocode({
    'address': address
  }, (results, status) => {
    console.log(results);
    if (status == google.maps.GeocoderStatus.OK) {
      if (results[0].geometry.location) {
        this.location.lat = results[0].geometry.location.lat();
        this.location.lng = results[0].geometry.location.lng();
        this.location.marker.lat = results[0].geometry.location.lat();
        this.location.marker.lng = results[0].geometry.location.lng();
        this.location.marker.draggable = true;
        this.location.viewport = results[0].geometry.viewport;
      }
      this.map.triggerResize()
    } else {
      console.log("Sorry, your interesting place was not found. Please rename it.");
    }
  })
}


}

