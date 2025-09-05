import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { environment } from '../../../../../../environments/environment';
import {AppService} from '../../../../../app.service';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root'
})
export class ImageGalleryService {

  constructor(
    private appService:AppService,
    private http:Http,
    private toastr: ToastrService
  ) { }

  getDocumentByProjectId(projectId: any, callback: any) {
		const ENDPOINT = `${environment.BASE_URL}/api/getDocumentByProjectId/${projectId}`;
		const requestOptions = {
			headers: this.appService.headers,
			method: 'get'
		};
		this.http.get(ENDPOINT, requestOptions).subscribe(
			(response: any) => {
				response = response.json();
				if (response.status) {
					return callback && callback(response.message);
				}

				console.log(response);
			},
			(error) => {
				return callback && callback(error);
			},
			() => {
				console.log('Observable is now completed.');
			}
		);
	}
  // End

  upload =   (formData: any, projectId, fileType, callback) => {   
    const ENDPOINT = `${environment.BASE_URL}/api/uploadFile`;
    console.log(formData);
    this.http.post(ENDPOINT, formData)
      .subscribe(
        (response) => {
          if(response.status){
            console.log(response);
            // this.appService.info('Image/document uploaded successfully');
            // this.uploadImage.next(true);
            // this.closeSpinnerEvent.next(false);
          }
          else{
            // this.appService.error('Image/document upload failed.')
            console.log(response)
            // this.closeSpinnerEvent.next(false);
          }
          return callback && callback(response);
          
        },
        error => {
          // this.appService.error('Image/document upload failed.')
          console.log(error);
          // this.closeSpinnerEvent.next(false);
          return callback && callback(error);
          
        },
        () => {
          console.log("Observable is now completed.");
        });
  }


  deleteImage(req: any, callback: any) {
    const ENDPOINT = `${environment.BASE_URL}/api/deleteImage`;
    const requestOptions = {
			headers: this.appService.headers,
			method: 'get',
      requestObject: req
		};
    console.log("requestOptions",requestOptions);
    
    this.http.post(ENDPOINT, requestOptions)
      .subscribe(
        (response) => {
          return callback && callback(response.json());
        },
        error => {
          console.log(error);
          return callback && callback(error);
        },
        () => {
          console.log("Observable is now completed.");
        });
  }
  
}
