import { Component, OnInit, OnDestroy } from '@angular/core';
import { HospitalService } from '../../../services/hospital.service';
import { Hospital } from '../../../models/hospital.model';
import Swal from 'sweetalert2';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { delay, Subscription } from 'rxjs';
import { BusquedasService } from '../../../services/busquedas.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})
export class HospitalesComponent implements OnInit, OnDestroy {
  public hospitales: Hospital[] = [];
  public cargando: boolean = true;
  private imgSubs!: Subscription;
  constructor(private hospitalService: HospitalService,
              private modalImagenService:ModalImagenService,
              private busquedasService: BusquedasService) { }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }
  ngOnInit(): void {
    this.cargarHospitales();

    this.imgSubs = this.modalImagenService.nuevaImagen
    .pipe(
      delay(100)
    )
    .subscribe(img => {
      this.cargarHospitales();
    })


  }
  cargarHospitales() {

    this.cargando = true;
    this.hospitalService.cargarHospitales()
      .subscribe(hospitales => {
        console.log(hospitales);
        this.cargando = false;
        this.hospitales = hospitales;

      });
  }

  guardarCambios(hospital: Hospital) {
    this.hospitalService.actualizarHospital(hospital.nombre, hospital._id || '')
      .subscribe(resp => {
        Swal.fire('Actualizado', hospital.nombre, 'success');
      })
  }

  eliminarHospital(hospital: Hospital) {
    this.hospitalService.eliminarHospital( hospital._id || '')
      .subscribe(resp => {
        Swal.fire('Eliminado', hospital.nombre, 'success');
        this.cargarHospitales();
      })
  }

 async abrirModalSwe() {

    const { value = ''} = await Swal.fire<string>({
      title: 'Crear Hospital',
      text: 'Ingrese el nombre del nuevo hospital',
      input: 'text',
      inputLabel: 'Nombre del hospital',
      showCancelButton: true
    })

   if(value!.trim().length > 0){
    this.hospitalService.crearHospital(value!)
      .subscribe((resp: any) => {
        console.log(resp);
        this.hospitales.push(resp.hospital)
      })
   }


  }

  abrirModal(hospital: Hospital) {

    this.modalImagenService.abrirModal('hospitales', hospital._id, hospital.img);

  }

  buscar(texto: string) {

    if(texto.length === 0){
      this.cargarHospitales();
      return;
    }

    this.busquedasService.buscar('hospitales', texto)
        .subscribe(resp => {
          this.hospitales = resp;
        });
  }
}
