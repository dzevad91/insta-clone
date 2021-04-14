import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AjaxService } from '../ajax-service';

const baseUrl = `https://jsonplaceholder.typicode.com/`;

@Component({
  selector: 'users-component',
  templateUrl: './users.component.html',
})

export class UsersComponent implements OnInit {

  public userViewModels: any;

  constructor(
    private _ajaxService: 
    AjaxService, private _router: Router) { }

  ngOnInit() {

    this.getAllUsers();
  }

  getAllUsers() {

    const url = baseUrl + `users`;
    this._ajaxService.getAllUsers(url).subscribe(result => {
      if (result) {
        if (result.length > 0) {

          this.userViewModels = result;
        } else {
          this._router.navigateByUrl('/page-not-found', { skipLocationChange: true });
        }
      }
      else{
        alert('Error Occured with API');
      }
    }, errors => {
      alert('Error Occured with API');
      console.log('an error occured, contact system admin');
    });
  }


}



