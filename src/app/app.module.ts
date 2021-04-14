import { BrowserModule, HammerGestureConfig } from '@angular/platform-browser';
import { NgModule, Injectable } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './home/home.component';
import { MatDialogModule, MatDialog } from '@angular/material';
import { AjaxService } from './ajax-service';
import { HttpClientModule } from '@angular/common/http';
import { PageNotFoundComponent } from './shared/page-not-found.component';
import { NgxGalleryModule } from 'ngx-gallery';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { EditPhotoComponent } from './photos/edit-photo/edit-photo.component';
import { FormsModule } from '@angular/forms';
import { PhotoDetailsComponent } from './photos/photo-details/photo-details.component';
import { UploadPhotoComponent } from './photos/upload-photo/upload-photo.component';
import { AlbumComponent } from './album/album.component';
import { UsersComponent } from './user/users.component';
import { PhotosComponent } from './photos/photos.component';
import { DeletePhotoComponent } from './photos/delete-photo/delete-photo.component';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    AlbumComponent,
    PhotosComponent,
    PageNotFoundComponent,
    DeletePhotoComponent,
    EditPhotoComponent,
    PhotoDetailsComponent,
    UploadPhotoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule,
    HttpClientModule,
    NgxGalleryModule,
    NgxSpinnerModule,
    ToastrModule.forRoot({
      timeOut: 2000,
    }),
    CommonModule,
    FormsModule
  ],
  entryComponents: [
    DeletePhotoComponent,
    EditPhotoComponent,
    PhotoDetailsComponent,
    UploadPhotoComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    HttpClientModule,
    MatDialog,
    AjaxService,
    NgxSpinnerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


