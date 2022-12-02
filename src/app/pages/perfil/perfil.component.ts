import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/usuario.service';
import Swal from "sweetalert2";

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})
export class PerfilComponent implements OnInit {
  public usuario!: Usuario;
  public miFormulario!: FormGroup;
  public imagenSubir!: File;
  public imgTemp: any = '';


  constructor(private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private fileUpload: FileUploadService) {
    this.usuario = usuarioService.usuario;
  }

  ngOnInit(): void {

     this.miFormulario = this.fb.group({
      nombre: [ this.usuario.nombre , [Validators.required] ],
      email: [ this.usuario.email,  [Validators.required, Validators.email ] ],
    })
  }
  guardarCambios() {
    // console.log(this.miFormulario.value);
    this.usuarioService.actualizarUsuario(this.miFormulario.value)
        .subscribe(resp => {
          const { nombre, email } = this.miFormulario.value;
          this.usuario.nombre = nombre;
          this.usuario.email = email;

          Swal.fire('Guardado', 'Cambios fueron guardados', 'success');
        }, (err) => Swal.fire('Error', err.error.msg, 'error') )

  }

  cambiarImagen(file: File) {

    this.imagenSubir = file;

    if(!file){
      this.imgTemp = null;
      return;
    }

    const reader =  new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      this.imgTemp = reader.result;
    }

  }

  subirImagen() {
    this.fileUpload
    .actualizarFoto(this.imagenSubir, 'usuarios', this.usuario.uid || '')
    .then(img => {
      Swal.fire('Guardado', 'Imagen de usuario actualizada', 'success')
      this.usuario.img =  img
    } ,(err) => Swal.fire('Error', 'No se pudo subir la imagen', 'error'))
  }
}
