import { Component, OnInit, OnDestroy } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from '../../../services/usuario.service';
import { BusquedasService } from '../../../services/busquedas.service';
import Swal from 'sweetalert2';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { delay, Subscription } from 'rxjs';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit, OnDestroy {
  public imgSubs!: Subscription;
  public totalUsuarios: number =  0;
  public usuarios: Usuario[] = [];
  public usuariostemp: Usuario[] = [];
  public desde: number = 0;
  public cargando: boolean = true;
  constructor(private usuarioService: UsuarioService,
              private busquedadService :BusquedasService,
              private modalImagenService: ModalImagenService) { }
  ngOnDestroy(): void {
   this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarUsuarios();

    this.imgSubs = this.modalImagenService.nuevaImagen
    .pipe(
      delay(100)
    )
    .subscribe(img => {
      this.cargarUsuarios();
    })
  }

  cargarUsuarios() {
    this.cargando = true;
    this.usuarioService.cargarUsuarios(this.desde)
    .subscribe(({ total, usuarios})  => {
      this.totalUsuarios = total;
      this.usuarios = usuarios;
      this.usuariostemp = usuarios;
      this.cargando = false;

    });

  }
  cambiarPagina(valor: number) {
    this.desde += valor

    if(this.desde < 0){
      this.desde = 0;
    }else if(this.desde >= this.totalUsuarios){
      this.desde -=  valor;
    }
    this.cargarUsuarios();
  }

  buscar(texto: string) {

    if(texto.length === 0){
      this.usuarios = this.usuariostemp;
      return;
    }

    this.busquedadService.buscar('usuarios', texto)
        .subscribe((resp: any) => {

          this.usuarios = resp;
        });
  }

  eliminarUsuario(usuario: Usuario) {
    if(usuario.uid === this.usuarioService.usuario.uid){
      Swal.fire('Error', 'No puede borrarse a si mismo', 'error')
      return;
    }

    Swal.fire({
      title: '¿Borrar usuario?',
      text: `Esta a punto de borrar a ${usuario.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrarlo'
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.eliminarUsuario(usuario)
            .subscribe(resp => {
              Swal.fire('Usuario borrado',
                    `${usuario.nombre} fue eliminado correctamente`,
                    'success')
              this.cargarUsuarios();
            });
      }
    })

  }

  cambiarRole(usuario: Usuario){
    this.usuarioService.guardarUsuario(usuario)
      .subscribe(resp => {
        console.log(resp);
      })
  }

  abrirModal(usuario: Usuario) {
    console.log(usuario);
    this.modalImagenService.abrirModal('usuarios', usuario.uid, usuario.img);

  }
}
