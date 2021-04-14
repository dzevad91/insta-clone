import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AjaxService } from '../ajax-service';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryComponent} from 'ngx-gallery';
import { ToastrService } from 'ngx-toastr';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { EditPhotoComponent } from './edit-photo/edit-photo.component';
import { PhotoDetailsComponent } from './photo-details/photo-details.component';
import { UploadPhotoComponent } from './upload-photo/upload-photo.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { DeletePhotoComponent } from './delete-photo/delete-photo.component';

const baseUrl = `https://jsonplaceholder.typicode.com/`;

@Component({
  selector: 'app-photos-component',
  templateUrl: './photos.component.html',
})

export class PhotosComponent implements OnInit {

  public userPhotos: any;
  public albumId: number;
  public numberOfColumns: number = 3;
  public numberOfRows: number = 17;

  constructor(
    private _ajaxService: AjaxService, 
    private _router: Router,
    private route: ActivatedRoute, 
    private _toastrService: ToastrService,
    private dialog: MatDialog, 
    private _spinnerService: NgxSpinnerService) {

  }
  @ViewChild('gallery', { static: false }) gallery: NgxGalleryComponent;

  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];


  ngOnInit() {
    this._spinnerService.show();

    this.route.params.subscribe(params => {
      this.albumId = Number(params['albumId']);
      this.getUserPhotosByAlbumId(this.albumId);
    });

    setTimeout(() => {
      this._spinnerService.hide();
    }, 2000);

    this.galleryOptions =
      [{
        image: false,
        thumbnails: false,
        width: '0px',
        height: '0px',
        previewSwipe: true,
        previewZoom : true,
        previewRotate : true,
      },
      ];
  }

  openPreview(index: number): void {
    this.gallery.openPreview(index);
  }

  getUserPhotosByAlbumId(albumId: number) {

    let url = baseUrl + `albums/${albumId}/photos`;
    this._ajaxService.getAllUsers(url).subscribe(result => {
      if (result) {
        if (result.length > 0) {
          this.userPhotos = result;

          let tempList = new Array<any>();

          this.userPhotos.forEach(item => {

            let photo = {
              small: item.thumbnailUrl,
              medium: item.url,
              big: item.url,
              description: item.title,
              photoId: item.id
            };

            tempList.push(photo);
          });

          this.galleryImages = tempList;
        } 
        else {
          this._router.navigateByUrl('/page-not-found', { skipLocationChange: true })
        }
      }
    }, errors => {
      this._spinnerService.hide();
      console.log("an error occured, contact system admin")
    });
  }


  deletePhoto(photoId: number, index: number): void {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = 'auto';
    dialogConfig.width = '800px';
    dialogConfig.data = photoId;
    let dialogOpen = this.dialog.open(DeletePhotoComponent, dialogConfig);
    dialogOpen.afterClosed().subscribe(result => {
      if (result) {
        this.galleryImages.splice(index, 1);
        this._toastrService.info('Successfully deleted')
      }
    });
  }

  editPhoto(photoId: number, index: number): void {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = 'auto';
    dialogConfig.width = '800px';
    dialogConfig.data = photoId;
    let dialogOpen = this.dialog.open(EditPhotoComponent, dialogConfig);
    dialogOpen.afterClosed().subscribe(result => {
      if (result) {
        this.galleryImages[index].description = result.title;
        this._toastrService.success('Successfully Edited')
      }
    });
  }

  viewPhoto(photoId: number, index: number): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = 'auto';
    dialogConfig.width = '850px';
    dialogConfig.data = photoId;
    let dialogOpen = this.dialog.open(PhotoDetailsComponent, dialogConfig);
  }

  uploadPhoto() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = 'auto';
    dialogConfig.width = '800px';
    dialogConfig.data = this.albumId;
    let dialogOpen = this.dialog.open(UploadPhotoComponent, dialogConfig);
    dialogOpen.afterClosed().subscribe(result => {
      if (result) {
        let lastUserPhoto = this.userPhotos[this.userPhotos.length - 1];

        let galleryPhoto = {
          small: lastUserPhoto.thumbnailUrl,
          medium: lastUserPhoto.url,
          big: lastUserPhoto.url,
          description: result.title,
          photoId: result.id
        };
        this.galleryImages.unshift(galleryPhoto);
        
        let userPhoto = {
          small: lastUserPhoto.thumbnailUrl,
          url: lastUserPhoto.url,
          title: result.title,
          id: result.id
        };

        this.userPhotos.unshift(userPhoto);

        this._toastrService.success('Successfully Uploaded')
      }
    });
  }
}

