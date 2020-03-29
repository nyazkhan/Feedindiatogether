import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
declare const google: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  @ViewChild('map', { static: true }) mapElement: ElementRef;
  map: any;
  currentLocation: any = {};
  mapOptions: any;
  input: any;
  infowindow: any;
  autocomplete: any;
  infowindowContent: any;
  // beaches = [
  //   ['Bondi Beach', -33.890542, 151.274856, 4],
  //   ['Coogee Beach', -33.923036, 151.259052, 5],
  //   ['Cronulla Beach', -34.028249, 151.157507, 3],
  //   ['Manly Beach', -33.80010128657071, 151.28747820854187, 2],
  //   ['Maroubra Beach', -33.950198, 151.259302, 1]
  // ];
  latLng: any;
  bounds: any;

  constructor() { }

  ngOnInit() {
  }
  // tslint:disable-next-line: use-lifecycle-interface
  async ngAfterViewInit() {
    this.getCurrentLocation();
  }

  getCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.currentLocation.lat = position.coords.latitude || 23.0201818;
        this.currentLocation.lng = position.coords.longitude || 72.4396558;
        console.log(position.coords);
        this.getMapReady();

      });
    } else {
      this.getMapReady();
      this.currentLocation = new google.maps.LatLng(23.0201818, 72.4396558);
    }

  }

  getMapReady() {
    this.mapOptions = {
      center: this.currentLocation,
      zoom: 14,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      streetViewControl: false,
      mapTypeControl: false,
      // scaleControl: false,
      fullscreenControl: false
    };
    this.map = new google.maps.Map(document.getElementById('map'), this.mapOptions);
    this.initAutocomplete();

  }





  initAutocomplete() {
    // var map = new google.maps.Map(document.getElementById('map'), this.mapOptions);
    this.input = document.getElementById('pac-input');
    this.autocomplete = new google.maps.places.Autocomplete(this.input, { country: 'In' });

    this.autocomplete.bindTo('bounds', this.map);

    // Specify just the place data fields that you need.
    this.autocomplete.setFields(['place_id', 'geometry', 'name', 'formatted_address']);

    this.map.controls[google.maps.ControlPosition.TOP_CENTER].push(this.input);

    this.infowindow = new google.maps.InfoWindow();
    this.infowindowContent = document.getElementById('infowindow-content');
    this.infowindow.setContent(this.infowindowContent);

    var geocoder = new google.maps.Geocoder;

    var marker = new google.maps.Marker({
      map: this.map,
      draggable: true,
      animation: google.maps.Animation.DROP,
      // position: results[0].geometry.location

    });
    marker.setMap(this.map);
    this.moveBus(this.map, marker);
    marker.addListener('click', () => {
      this.infowindow.open(this.map, marker);
    });
    google.maps.event.addListener(marker, 'dragend', (event) => {
      // infoWindow.setContent(marker.title);
      console.log('dragend');
      console.log(event);
      console.log(event.latLng.lat());
      console.log(event.latLng.lng());
      console.log(event.latLng);
      console.log(marker.getPosition());


      // infoWindow.open(this.map, marker);
    });
    this.autocomplete.addListener('place_changed', () => {
      this.infowindow.close();
      var place = this.autocomplete.getPlace();

      if (!place.place_id) {
        return;
      }
      geocoder.geocode({ 'placeId': place.place_id }, function (results, status) {
        if (status !== 'OK') {
          window.alert('Geocoder failed due to: ' + status);
          return;
        }

        this.map.setZoom(17);
        this.map.setCenter(results[0].geometry.location);

        // Set the position of the marker using the place ID and location.
        marker.setPlace(
          { placeId: place.place_id, location: results[0].geometry.location });

        marker.setVisible(true);

        this.infowindowContent.children['place-name'].textContent = place.name;
        this.infowindowContent.children['place-id'].textContent = place.place_id;
        this.infowindowContent.children['place-address'].textContent =
          results[0].formatted_address;

        this.infowindow.open(this.map, marker);
      });
    });
    // this.setMarkers(this.map);



  }
  moveBus(map, marker) {

    marker.setPosition(this.latLng);
    map.panTo(this.latLng);

  };












  // setMarkers(MAP) {

  //   // Adds markers to the map.

  //   // Marker sizes are expressed as a Size of X,Y where the origin of the image
  //   // (0,0) is located in the top left of the image.

  //   // Origins, anchor positions and coordinates of the marker increase in the X
  //   // direction to the right and in the Y direction down.
  //   const image = {
  //     url: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
  //     // This marker is 20 pixels wide by 32 pixels high.
  //     size: new google.maps.Size(20, 32),
  //     // The origin for this image is (0, 0).
  //     origin: new google.maps.Point(0, 0),
  //     // The anchor for this image is the base of the flagpole at (0, 32).
  //     anchor: new google.maps.Point(0, 32)
  //   };
  //   // Shapes define the clickable region of the icon. The type defines an HTML
  //   // <area> element 'poly' which traces out a polygon as a series of X,Y points.
  //   // The final coordinate closes the poly by connecting to the first coordinate.
  //   const shapes = {
  //     coords: [1, 1, 1, 20, 18, 20, 18, 1],
  //     type: 'poly'
  //   };
  //   // tslint:disable-next-line: prefer-for-of
  //   for (var i = 0; i < this.beaches.length; i++) {
  //     const beach = this.beaches[i];
  //     let marker = new google.maps.Marker({
  //       position: { lat: beach[1], lng: beach[2] },
  //       map: MAP,
  //       icon: image,
  //       shape: shapes,
  //       title: beach[0],
  //       zIndex: beach[3]
  //     });
  //     this.bounds = new google.maps.LatLngBounds();

  //     let infoWindow: any;

  //     marker.setAnimation(4);
  //     // this.markers.push(marker);
  //     infoWindow = new google.maps.InfoWindow();
  //     google.maps.event.addListener(marker, 'click', () => {
  //       infoWindow.setContent(marker.title);
  //       infoWindow.open(this.map, marker);
  //     });
  //     google.maps.event.addListener(marker, 'mouseover', () => {
  //       // infoWindow.setContent(marker.title);
  //       console.log('mouseover');

  //       // infoWindow.open(this.map, marker);
  //     });
  //   }
  // }
}
