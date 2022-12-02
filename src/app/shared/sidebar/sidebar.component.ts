import { Component, OnInit, AfterViewInit } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit, AfterViewInit {
  menuItems: any[];
  // imgUrl = '';
  usuario!: Usuario;
  constructor(private SidebarService: SidebarService, private usuarioService: UsuarioService) {
    this.menuItems = SidebarService.menu;
    // this.imgUrl = this.usuarioService.usuario.imagenUrl;
    this.usuario = usuarioService.usuario;
  }

  ngOnInit(): void {
  }
  //: JQuery<HTMLElement>
  ngAfterViewInit(): void {
    // ==============================================================
      // Sidebarmenu
      // ==============================================================
      // $('#sidebarnav').AdminMenu();

  }


}
