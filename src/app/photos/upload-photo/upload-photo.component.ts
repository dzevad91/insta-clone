import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { AjaxService } from '../../ajax-service';
import { PhotoModel } from 'src/app/domain/photo/photo.model';

const baseUrl = `https://jsonplaceholder.typicode.com/`;

@Component({
    selector: 'app-upload-photo-component',
    templateUrl: './upload-photo.component.html'
})

export class UploadPhotoComponent implements OnInit {

    public albumId: number;
    public uploadPhotoModel: PhotoModel;
    public imagePath;
    public imgURL: any;
    public imageValidator: boolean = false;

    constructor(
        private _ajaxService: AjaxService,
        public dialogRef: MatDialogRef<any>,
        @Inject(MAT_DIALOG_DATA) data,
        private _toastrService: ToastrService) 
    {
        this.albumId = data;
        this.dialogRef.disableClose = false;

    }
    ngOnInit() {
        this.uploadPhotoModel = new PhotoModel();
        this.uploadPhotoModel.albumId = this.albumId;
    }


    uploadPhoto() {
        const imgInput = document.getElementById('image-input') as HTMLInputElement;
        if (imgInput.value === '') {

            this.imageValidator = false;
            return;
        } else {
            this.imageValidator = true;
        }

        const url = baseUrl + `photos`;
        const form = document.getElementById('forms') as HTMLFormElement;
        const formdata = new FormData(form);

        this._ajaxService.uploadPhoto(url, formdata).subscribe(result => {
            if (result) {
                this.uploadPhotoModel.id = result.id
                this.dialogRef.close(this.uploadPhotoModel);
            }
        }, errors => {
            console.log('an error occured, contact system admin');
            this._toastrService.error('error');
        });

    }

    preview(files) {

        const reader = new FileReader();
        this.imagePath = files;
        reader.readAsDataURL(files[0]);
        reader.onload = (_event) => {
            this.imgURL = reader.result;
        };
        this.imageValidator = true;
    }

    close() {
        this.dialogRef.close(false);
    }

}
