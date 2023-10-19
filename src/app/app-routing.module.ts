import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BookFormComponent} from "./components/book/book-form/book-form.component";
import {BookListComponent} from "./components/book/book-list/book-list.component";


const routes: Routes = [
  {path: 'books', component: BookListComponent, data: {title: 'Book App'}},
  {path: 'add-book', component: BookFormComponent, data: {title: 'Add New Book'}},
  {path: '', redirectTo: '/books', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
