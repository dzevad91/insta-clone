import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { PhotoModel } from 'src/app/domain/photo/photo.model';
import { AjaxService } from 'src/app/ajax-service';

const baseUrl = `https://jsonplaceholder.typicode.com/`;

@Component({
    selector: 'app-delete-photo-component',
    templateUrl: './delete-photo.component.html'
})

export class DeletePhotoComponent implements OnInit {


    public photoId: number;
    public deletePhotoModel: PhotoModel;
    constructor(
        private _ajaxService: AjaxService,
        public dialogRef: MatDialogRef<any>,
        @Inject(MAT_DIALOG_DATA) data) 
    {
        this.photoId = data;
        this.dialogRef.disableClose = false;
    }
    ngOnInit() {
        
        this.deletePhotoModel = new PhotoModel();

        this.getPhoto(this.photoId);
    }

    getPhoto(id: number) {
        const url = baseUrl + `photos/${id}`;
        this._ajaxService.getPhotoById(url).subscribe(res => {
            if (res) {
                this.deletePhotoModel = res;
            }
        });
    }
    deletePhoto(photoId: number) {
        const url = baseUrl + `photos/${photoId}`;

        this._ajaxService.deletePhotoById(url).subscribe(result => {
            if (result) {
                this.dialogRef.close(true);
            }
        }, errors => {
            console.log('an error occured, contact system admin');
        });

    }

    close() {
        this.dialogRef.close(false);
    }
}
