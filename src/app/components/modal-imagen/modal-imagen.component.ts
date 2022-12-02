import { Component, OnInit } from '@angular/core';
import { ModalImagenService } from '../../services/modal-imagen.service';
import { FileUploadService } from '../../services/file-upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styles: [
  ]
})
export class ModalImagenComponent implements OnInit {

  public imagenSubir!: File;
  public imgTemp: any = '';


  constructor(public modalService: ModalImagenService,
              public fileUpload: FileUploadService) { }

  ngOnInit(): void {
  }

  cerrarModal() {
    this.imgTemp = false;
    this.modalService.cerrarModal();
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
    const id =  this.modalService.id;
    const tipo =  this.modalService.tipo;

    this.fileUpload
    .actualizarFoto(this.imagenSubir, tipo , id || '')
    .then(img => {
      Swal.fire('Guardado', 'Imagen de usuario actualizada', 'success');
      this.cerrarModal();
      this.modalService.nuevaImagen.emit(img);
    } ,(err) => Swal.fire('Error', 'No se pudo subir la imagen', 'error'))
  }

}
