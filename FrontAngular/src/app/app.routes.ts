import { RouterModule, Routes } from '@angular/router';
import { PessoaCreateComponent } from './models/pessoa-create/pessoa-create.component';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [
  { path: '', component: AppComponent }, // Tela principal
  { path: 'cadastrar', component: PessoaCreateComponent } // Tela de cadastro
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

