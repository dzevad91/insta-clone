import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { AjaxService } from '../../ajax-service';
import { PhotoModel } from 'src/app/domain/photo/photo.model';
const baseUrl = `https://jsonplaceholder.typicode.com/`;

@Component({
    selector: 'app-edit-photo-component',
    templateUrl: './edit-photo.component.html'
})

export class EditPhotoComponent implements OnInit {


    public photoId: number;
    public editPhotoModel: PhotoModel;
    constructor(
        private _ajaxService: AjaxService,
        public dialogRef: MatDialogRef<any>,
        @Inject(MAT_DIALOG_DATA) data,
        private _toastrService: ToastrService) 
    {
        this.photoId = data;
        this.dialogRef.disableClose = false;
    }
    
    ngOnInit() {
        this.editPhotoModel = new PhotoModel();
        this.getPhoto(this.photoId);
    }

    getPhoto(id: number) {
        const url = baseUrl + `photos/${id}`;
        this._ajaxService.getPhotoById(url).subscribe(res => {
            if (res) {
                this.editPhotoModel = res;
            }
        });
    }
    editPhoto(photoId: number) {
        const url = baseUrl + `photos/${photoId}`;

        this._ajaxService.editPhotoById(url).subscribe(result => {
            if (result) {

                this.dialogRef.close(this.editPhotoModel);
            }
        }, errors => {
            console.log('an error occured, contact system admin');
            this._toastrService.warning('error');
        });

    }

    close() {
        this.dialogRef.close(false);
    }
}
