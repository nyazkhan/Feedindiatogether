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
  latLng: any;
  mapOptions: any;
  beaches = [
    ['Bondi Beach', -33.890542, 151.274856, 4],
    ['Coogee Beach', -33.923036, 151.259052, 5],
    ['Cronulla Beach', -34.028249, 151.157507, 3],
    ['Manly Beach', -33.80010128657071, 151.28747820854187, 2],
    ['Maroubra Beach', -33.950198, 151.259302, 1]
  ];
  bounds: any;
  constructor() { }

  ngOnInit() {
  }
  // tslint:disable-next-line: use-lifecycle-interface
  async ngAfterViewInit() {
    // this.loadMap();

    this.latLng = new google.maps.LatLng(-33.890542, 151.274856);

    this.mapOptions = {
      center: this.latLng,
      zoom: 14,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      streetViewControl: false,
      mapTypeControl: false,
      // scaleControl: false,
      fullscreenControl: false
    };
    this.initAutocomplete();





  }

  initAutocomplete() {
    this.map = new google.maps.Map(document.getElementById('map'), this.mapOptions);
    this.setMarkers(this.map);



  }

  setMarkers(MAP) {

    // Adds markers to the map.

    // Marker sizes are expressed as a Size of X,Y where the origin of the image
    // (0,0) is located in the top left of the image.

    // Origins, anchor positions and coordinates of the marker increase in the X
    // direction to the right and in the Y direction down.
    const image = {
      url: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
      // This marker is 20 pixels wide by 32 pixels high.
      size: new google.maps.Size(20, 32),
      // The origin for this image is (0, 0).
      origin: new google.maps.Point(0, 0),
      // The anchor for this image is the base of the flagpole at (0, 32).
      anchor: new google.maps.Point(0, 32)
    };
    // Shapes define the clickable region of the icon. The type defines an HTML
    // <area> element 'poly' which traces out a polygon as a series of X,Y points.
    // The final coordinate closes the poly by connecting to the first coordinate.
    const shapes = {
      coords: [1, 1, 1, 20, 18, 20, 18, 1],
      type: 'poly'
    };
    // tslint:disable-next-line: prefer-for-of
    for (var i = 0; i < this.beaches.length; i++) {
      const beach = this.beaches[i];
      let marker = new google.maps.Marker({
        position: { lat: beach[1], lng: beach[2] },
        map: MAP,
        icon: image,
        shape: shapes,
        title: beach[0],
        zIndex: beach[3]
      });
      this.bounds = new google.maps.LatLngBounds();

      let infoWindow: any;
  
      marker.setAnimation(4);
      // this.markers.push(marker);
      infoWindow = new google.maps.InfoWindow();
      google.maps.event.addListener(marker, 'click', () => {
        infoWindow.setContent(marker.title);
        infoWindow.open(this.map, marker);
      });
      google.maps.event.addListener(marker, 'mouseover', () => {
        // infoWindow.setContent(marker.title);
        console.log('mouseover');

        // infoWindow.open(this.map, marker);
      });
    }
  }
}
