import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { AjaxService } from '../../ajax-service';
import { PhotoModel } from 'src/app/domain/photo/photo.model';
const baseUrl = `https://jsonplaceholder.typicode.com/`;

@Component({
    selector: 'app-photo-details-component',
    templateUrl: './photo-details.component.html'
})

export class PhotoDetailsComponent implements OnInit {

    public photoId: number;
    public photoViewModel: PhotoModel;

    constructor(
        private _ajaxService: AjaxService,
        public dialogRef: MatDialogRef<any>,
        @Inject(MAT_DIALOG_DATA) data) 
    {
        this.photoId = data;
    }
    ngOnInit() {
        this.photoViewModel = new PhotoModel();
        this.getPhoto(this.photoId);
    }

    getPhoto(id: number) {
        const url = baseUrl + `photos/${id}`;
        this._ajaxService.getPhotoById(url).subscribe(res => {
            if (res) {
                this.photoViewModel = res;
            }
        });
    }

    close() {
        this.dialogRef.close(false);
    }
}
