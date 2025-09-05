import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { mappls, mappls_plugin } from 'mappls-web-maps';
import { HomePublicService } from "../home-public/home-public.service";

const mapKey = '3621abf57ba9334ab639a56430e94924';

@Component({
  selector: "app-home-public",
  templateUrl: "./home-public.component.html",
  styleUrls: ["./home-public.component.css"]
})
export class HomePublicComponent implements OnInit {
  isLodaing: boolean = false;
  mapobject: any;
  mapplsClassObject: any = new mappls();
  mapplsPluginObject: any = new mappls_plugin();

  allProjects: any = [];

  constructor(private homePublicService: HomePublicService, private router: Router) {}

  // ✅ Dummy Project List
  projectList: any = [
    {
      projectId: 1,
      name: "Project A",
      percent: 80,
      lat1: 26.15706, long1: 91.81154,
      lat2: 26.16000, long2: 91.81500,
      lat3: 26.15500, long3: 91.81500,
      lat4: 26.15500, long4: 91.81000,
      lat5: 26.15706, long5: 91.81154
    },
    {
      projectId: 2,
      name: "Project B",
      percent: 40,
      lat1: 26.16100, long1: 91.81700,
      lat2: 26.16300, long2: 91.82000,
      lat3: 26.15900, long3: 91.82000,
      lat4: 26.15900, long4: 91.81500,
      lat5: 26.16100, long5: 91.81700
    },
    {
      projectId: 3,
      name: "Project C",
      percent: 15,
      lat1: 26.15200, long1: 91.80700,
      lat2: 26.15400, long2: 91.81000,
      lat3: 26.15000, long3: 91.81000,
      lat4: 26.15000, long4: 91.80500,
      lat5: 26.15200, long5: 91.80700
    }
  ];

  ngOnInit() {
    // --- Switch between dummy data or backend ---
    const useBackend = true; // ⬅️ change to true to load backend API

    if (useBackend) {
      this.getAllProjectsFromBackend();
    } else {
      this.allProjects = this.projectList;
      this.fn();
    }
  }

  // ✅ Normalize API response
  getAllProjectsFromBackend() {
  this.homePublicService.getAllProjectsMapView((res: any) => {
    console.log("getAllProjects", res);

    if (!res || res.length === 0) {
      this.allProjects = [];
      this.isLodaing = false;
      return;
    }

    this.allProjects = res.map((item: any) => {
      // Extract coordinates from file_repos
      const coordinates = (item.file_repos || [])
        .filter((f: any) => f.GPSLatitude && f.GPSLongitude) // only valid coords
        .map((f: any) => ({
          lat: parseFloat(f.GPSLatitude),
          lng: parseFloat(f.GPSLongitude),
        }));

      return {
        projectId: item.id,
        name: item.name,
        percent: item.percentageProgress || 0, // fallback
        coordinates, // dynamic array of {lat, lng}
      };
    });

    this.fn();
  });
}


  // ✅ Helper function: choose color based on percent
  getFillColor(percent: number): string {
    if (percent >= 80) return "green";   // High completion
    if (percent >= 50) return "orange";  // Medium completion
    return "red";                        // Low completion
  }

  fn() {
  const loadObject = {
    map: true,
    layer: 'raster',
    version: '3.0',
  };

  this.mapplsClassObject.initialize(mapKey, loadObject, () => {
    this.mapobject = this.mapplsClassObject.Map({
      id: 'map',
      properties: {
        center: [26.15706, 91.81154],
        zoomControl: true,
        location: true,
        zoom: 13,
      },
    });

    // --- Add Projects ---
    this.allProjects.forEach((project: any) => {
      if (!project.coordinates || project.coordinates.length === 0) return;

      // Marker at first coordinate
      const first = project.coordinates[0];
      const marker = new this.mapplsClassObject.Marker({
        map: this.mapobject,
        position: [first.lat, first.lng],
        title: project.name
      });

      const infoWindow = new this.mapplsClassObject.InfoWindow({
        content: `<b>${project.name}</b><br>Completion: ${project.percent}%`
      });

      marker.addListener('click', () => {
        infoWindow.open(this.mapobject, marker);
      });
      marker.addTo(this.mapobject);

      // Polygon from all coordinates
      if (project.coordinates.length >= 3) { // at least 3 points needed
        const polygon = new this.mapplsClassObject.Polygon({
          map: this.mapobject,
          paths: project.coordinates,
          fillColor: this.getFillColor(project.percent),
          fillOpacity: 0.5,
          strokeColor: "black",
          strokeOpacity: 0.9,
        });

        polygon.addListener("click", () => {
          infoWindow.open(this.mapobject, marker);
        });
      }
    });
  });
}

}
