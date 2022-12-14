import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { PagesComponent } from "./pages.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { ProgressComponent } from "./progress/progress.component";
import { Grafica1Component } from "./grafica1/grafica1.component";
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from "./rxjs/rxjs.component";
import { AuthGuard } from "../guards/auth.guard";
import { PerfilComponent } from './perfil/perfil.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { MedicosComponent } from "./mantenimientos/medicos/medicos.component";
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { MedicoComponent } from './mantenimientos/medicos/medico.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: PagesComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: DashboardComponent, data: { titulo: 'Dashboard'} },
      { path: 'progress', component: ProgressComponent, data: { titulo: 'ProgressBar'} },
      { path: 'grafica1', component: Grafica1Component, data: { titulo: 'Gráfica #1'} },
      { path: 'account', component: AccountSettingsComponent, data: { titulo: 'Ajustes de cuenta'} },
      { path: 'promesas', component: PromesasComponent, data: { titulo: 'Promesas'} },
      { path: 'rxjs', component: RxjsComponent, data: { titulo: 'RxJs'} },
      { path: 'perfil', component: PerfilComponent, data: { titulo: 'Perfil de usuario'} },

      // MANTENIMIENTOS
      { path: 'usuarios', component: UsuariosComponent, data: { titulo: 'usuario de aplicacion'} },
      { path: 'hospitales', component: HospitalesComponent, data: { titulo: 'Mantenimiento de hospitales'} },
      { path: 'medicos', component: MedicosComponent, data: { titulo: 'Mantenimiento de medicos'} },
      { path: 'medico/:id', component: MedicoComponent, data: { titulo: 'Mantenimiento de medico'} },

    ]
  },
];
@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
})

export class PagesRouingModule {}
