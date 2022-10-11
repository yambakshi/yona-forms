import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { EntryModeComponent } from '@components/entry-mode/entry-mode.component';
import { MainViewComponent } from '@components/main-view/main-view.component';
// import { EditModeComponent } from './components/edit-mode/edit-mode.component';

const routes: Routes = [
  // {
  //   path: '',
  //   component: EditModeComponent
  // },
  // {
  //   path: 'entry-mode',
  //   component: EntryModeComponent
  // }

  {
    path: '',
    component: MainViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
