import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PhotoModel } from './domain/photo/photo.model';


const baseUrl = `https://jsonplaceholder.typicode.com/`;

@Injectable()
export class AjaxService {

    constructor(private http: HttpClient) {

    }

    getAllUsers(url: string): any {

        return this.http.get(url).pipe(response => {
            if (response) {
                return response;
            }
        });
    }

    deletePhotoById(url: string): any {

        return this.http.delete(url).pipe(response => {
            if (response) {
                return response;
            }
     });
    }

    editPhotoById(url: string): any {

        return this.http.put(url, PhotoModel).pipe(response => {
            if (response) {
                return response;
            }
        });
    }

    getPhotoById(url: string): any {
        return this.http.get(url).pipe(response => {
            if (response) {
                return response;
            }
        });
    }

    uploadPhoto(url: string, model: any): any {

        return this.http.post(url, PhotoModel).pipe(response => {
            if (response) {
                return response;
            }
        });
    }
}
