import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './home/home.component';
import { PageNotFoundComponent } from './shared/page-not-found.component';
import { UsersComponent } from './user/users.component';
import { AlbumComponent } from './album/album.component';
import { PhotosComponent } from './photos/photos.component';



const routes: Routes = [
  { path: '', redirectTo: '/users', pathMatch: 'full' },
  { path: 'home', component: AppComponent },
  { path: 'users', component: UsersComponent },
  { path: 'albums/:userId', component: AlbumComponent },
  { path: 'user-photos/:albumId', component: PhotosComponent },
  { path: 'not-found-page', component: PageNotFoundComponent },
  { path: '**', redirectTo: '/not-found-page' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
