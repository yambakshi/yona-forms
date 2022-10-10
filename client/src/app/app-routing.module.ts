import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditModeComponent } from './components/edit-mode/edit-mode.component';

const routes: Routes = [{
  path: '',
  component: EditModeComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
