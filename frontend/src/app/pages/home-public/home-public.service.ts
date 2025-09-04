import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from "@angular/http";
import { ToastrService } from "ngx-toastr";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { environment } from "../../../environments/environment";
import { AppService } from "../../app.service";

@Injectable({
  providedIn: 'root'
})
export class HomePublicService {
  public accessKeyword:any=null;
  constructor(
    private toastr: ToastrService,
    private appService: AppService,
    private http: Http
  ) { 
    let token = JSON.parse(localStorage.getItem('token'));
    this.accessKeyword = token.usr.accessKeyword;
  }

   //Start: Method to pull all the projects
   getAllProjects(callback: any) {
    const ENDPOINT = `${environment.BASE_URL}/api/getAllProjects`;
    const requestOptions = {
      headers: this.appService.headers,
      method: "post",
      body: {accessKeyword:this.accessKeyword}
    };
    this.http.get(ENDPOINT, requestOptions).subscribe(
      response => {
        return callback && callback(response.json());
      },
      error => {
        return callback && callback(error);
      },
      () => { }
    );
  }
  // End

}
