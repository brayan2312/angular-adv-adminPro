import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [

  ]
})
export class HeaderComponent implements OnInit {
  public imgUrl = '';
  public usuario!: Usuario;
  constructor(private usuarioService: UsuarioService) {
    // this.imgUrl = usuarioService.usuario.imagenUrl;
    this.usuario = usuarioService.usuario;

  }

  ngOnInit(): void {
  }

  logout() {
    this.usuarioService.logout();
  }
}
