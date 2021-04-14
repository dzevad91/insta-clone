import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AjaxService } from '../ajax-service';

const baseUrl = `https://jsonplaceholder.typicode.com/`;

@Component({
  selector: 'app-album-component',
  templateUrl: './album.component.html',
})

export class AlbumComponent implements OnInit {

  public userAlbums: any;
  public userId: number;

  constructor(
    private _ajaxService: AjaxService,
    private _router: Router, 
    private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userId = params['userId'];
      this.getUserAlbumsByUserId(this.userId);
    });
  }

  getUserAlbumsByUserId(userId: number) {
    const url = baseUrl + `users/${userId}/albums`;
    this._ajaxService.getAllUsers(url).subscribe(result => {
      if (result) {
        if (result.length > 0) {

          this.userAlbums = result;
        } else {
          this._router.navigateByUrl('/page-not-found', { skipLocationChange: true });
        }
      }
    }, errors => {
      console.log('an error occured, contact system admin');
    });
  }
}
