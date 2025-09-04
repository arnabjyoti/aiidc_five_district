import { Component, OnInit } from "@angular/core";
// import * as Mgx from 'mgx';
import * as L from "leaflet";
// declare const L: any;

import { HomePublicService } from "../home-public/home-public.service";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { mappls, mappls_plugin } from 'mappls-web-maps';
const mapKey = '3621abf57ba9334ab639a56430e94924';

@Component({
  selector: "app-home-public",
  templateUrl: "./home-public.component.html",
  styleUrls: ["./home-public.component.css"]
})
export class HomePublicComponent implements OnInit {
  mapobject:any
  mapplsClassObject:any= new mappls()
  mapplsPluginObject:any= new mappls_plugin()
  title = 'Map_angular';



  newMarker: any;
  row_data = [];
  map: any;
  projectsToShow = [];
  public project = [
    {
      projectId: 35,
      lat: 26.15706,
      long: 91.81154,
      name: "Udayan Path Vip Road, Near Pratiksha Hospital",
      percent: "100"
    },
    {
      projectId: 36,
      lat: 26.12898,
      long: 91.78187,
      name: "Improvement of Milanjyoti Path at Sijubari",
      percent: "100"
    },
    {
      projectId: 37,
      lat: 26.12127,
      long: 91.80236,
      name: "Tagar Path at Sourav Nagar Beltola ",
      percent: "100"
    },
    {
      projectId: 38,
      lat: 26.12977,
      long: 91.78192,
      name: "Improvement of Milanjyoti Path at Sijubari",
      percent: "100"
    },
    {
      projectId: 39,
      lat: 26.15591,
      long: 91.7993,
      name:
        "Milijuli Path(From LichuBagan Namghar Path to jayanta Gogoi House)",
      percent: "100"
    },
    {
      projectId: 41,
      lat: 26.11415,
      long: 91.80205,
      name: "Helipad Road at Trinayan Nagar",
      percent: "100"
    },
    {
      projectId: 40,
      lat: 26.12279,
      long: 91.80449,
      name: "Beltola High School Road side drain",
      percent: "100"
    },
    {
      projectId: 42,
      lat: 26.13538,
      long: 91.80149,
      name: "Chinaki Path at Rukminigaon",
      percent: "100"
    },
    {
      projectId: 43,
      lat: 26.14003,
      long: 91.79191,
      name: "Law College Road bye lane Dispur",
      percent: "100"
    },
    {
      projectId: 45,
      lat: 26.15591,
      long: 91.7993,
      name: "Namghar Path Lichubagan Remaining Portion",
      percent: "100"
    },
    {
      projectId: 49,
      lat: 26.11928,
      long: 91.8029,
      name: "Padum Path, Sourav Nagar, Beltola",
      percent: "100"
    },
    {
      projectId: 47,
      lat: 26.13416,
      long: 91.78573,
      name: "Bohagi Path bhetapara",
      percent: "100"
    },
    {
      projectId: 51,
      lat: 26.11417,
      long: 91.77989,
      name: "Improvement of Jagaran Path Bidhya Mandir Path bye at Bhetapra",
      percent: "100"
    },
    {
      projectId: 31,
      lat: 26.13352,
      long: 91.80362,
      name: "Priya Kalita Path, Rukminigaon",
      percent: "100"
    },
    {
      projectId: 52,
      lat: 26.13536,
      long: 91.79936,
      name: "Trinayan Path at Rukminigaon",
      percent: "100"
    },
    {
      projectId: 653,
      lat: 26.140858,
      long: 91.762964,
      name: "Improvement of sankar azan path kahilipara",
      percent: "12"
    }
  ];


  // Define multiple polygons with their coordinates and properties
  // public polygons = [
  //   {
  //     coordinates: [
  //       { lat: 26.15706, lng: 91.81154 },
  //       { lat: 26.16000, lng: 91.81500 },
  //       { lat: 26.15500, lng: 91.81500 },
  //       { lat: 26.15500, lng: 91.81000 },
  //       { lat: 26.15706, lng: 91.81154 }
  //     ],
  //     fillColor: 'red',
  //     fillOpacity: 0.5,
  //     strokeColor: 'blue',
  //     strokeOpacity: 0.8
  //   },
  //   {
  //     coordinates: [
  //       { lat: 26.16100, lng: 91.81700 },
  //       { lat: 26.16300, lng: 91.82000 },
  //       { lat: 26.15900, lng: 91.82000 },
  //       { lat: 26.15900, lng: 91.81500 },
  //       { lat: 26.16100, lng: 91.81700 }
  //     ],
  //     fillColor: 'purple',
  //     fillOpacity: 0.6,
  //     strokeColor: 'orange',
  //     strokeOpacity: 0.9
  //   },
  //   {
  //     coordinates: [
  //       { lat: 26.15200, lng: 91.80700 },
  //       { lat: 26.15400, lng: 91.81000 },
  //       { lat: 26.15000, lng: 91.81000 },
  //       { lat: 26.15000, lng: 91.80500 },
  //       { lat: 26.15200, lng: 91.80700 }
  //     ],
  //     fillColor: 'yellow',
  //     fillOpacity: 0.7,
  //     strokeColor: 'purple',
  //     strokeOpacity: 1
  //   }
  // ];

  polygons:any = [];
  constructor(private homePublicService: HomePublicService, private router: Router) {}

  ngOnInit() {
    this.getAllProjects();
  }

  allProjects:any = [];
  public isLodaing: boolean = true;
  getAllProjects = () => {
    this.homePublicService.getAllProjects(res => {
      this.isLodaing = false;
      if (!res || res === undefined || res === null) {
        this.allProjects = [];
      } else {
        this.projectObjectFormatter(res);
      }
    });
  };

  projectObjectFormatter = (data:any) =>{
    if(data?.length>0){
      data.map((item:any)=>{
        let obj:any = {
          projectId: item?.id,
          lat: item?.lat1,
          long: item?.long1,
          name: item?.name,
          percent: item?.percentageProgress
        };

        let polygonObj:any = {
        coordinates: [
            { lat: item?.lat1, lng: item.long1 },
            { lat: item?.lat2, lng: item.long2 },
            { lat: item?.lat3, lng: item.long3 },
            { lat: item?.lat4, lng: item.long4 },
            { lat: item?.lat5, lng: item.long5 },
          ],
          fillColor: 'red',
          fillOpacity: 0.5,
          strokeColor: 'blue',
          strokeOpacity: 0.8
        }
        this.allProjects.push(obj);
        this.polygons.push(polygonObj);
      });
      console.log("this.allProjects=", this.allProjects);
      this.fn();
    }
  }

fn(){
  const loadObject = {
    map: true,
    layer: 'raster', // Optional Default Vector
    version: '3.0', // Optional, other version 3.5 also available with CSP headers
    libraries: ['airspacelayers'], // Optional for Polydraw and airspaceLayers
    plugins: ['direction'], // Optional for any plugins

  };

  

this.mapplsClassObject.initialize( mapKey, loadObject, () => {
    this.mapobject = this.mapplsClassObject.Map({
      id: 'map',
      properties: {
        center: [26.15706, 91.81154],
        zoomControl: true,
        location: true,
        zoom: 10, // Set zoom level to display all points properly
      },
    });

    // Add markers for all projects
    this.allProjects.forEach(project => {
      // Add marker to the map at project lat/long
      const marker = new this.mapplsClassObject.Marker({
        map: this.mapobject,
        position: [project.lat, project.long], // Use the project's lat and long
        title: project.name // Title displayed on hover
      });

      // Create InfoWindow (Popup) for each marker
      const infoWindow = new this.mapplsClassObject.InfoWindow({
        content: `<b>${project.name}</b><br>Completion: ${project.percent}%`
      });

      // Add event listener to open the popup when the marker is clicked
      marker.addListener('click', () => {
        infoWindow.open(this.mapobject, marker); // Open popup on click
      });

      marker.addTo(this.mapobject); // Add marker to the map
    });

    

    // Add each polygon to the map
    this.polygons.forEach(polygonData => {
      const polygon = new this.mapplsClassObject.Polygon({
        map: this.mapobject, // Make sure to assign the map object here
        paths: polygonData.coordinates,
        fillColor: polygonData.fillColor,
        fillOpacity: polygonData.fillOpacity,
        strokeColor: polygonData.strokeColor,
        strokeOpacity: polygonData.strokeOpacity,
      });

      // Log polygon creation for debugging
      console.log("Polygon created:", polygonData);
  });
}
  
);
}


  
}
