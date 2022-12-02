import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HospitalService } from '../../../services/hospital.service';
import { Hospital } from '../../../models/hospital.model';
import { MedicoService } from '../../../services/medico.service';
import { Medico } from 'src/app/models/medico.models';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { delay } from 'rxjs';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: [
  ]
})
export class MedicoComponent implements OnInit {

  public medicoForm!: FormGroup;
  public hospitales!: Hospital[];

  public hospitalSeleccionado?: Hospital;
  public medicoSeleccionado?: Medico;

  constructor(private fb: FormBuilder,
              private hospitalService: HospitalService,
              private medicoService: MedicoService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(({ id }) =>  this.cargarMedico(id) )


    this.medicoForm = this.fb.group({
      nombre: ['', [Validators.required]],
      hospital: ['', [Validators.required]],
    })
    this.medicoForm.get('hospital')?.valueChanges
      .subscribe(idHospital => {
        this.hospitalSeleccionado =  this.hospitales.find(h => h._id === idHospital  ) ;
      })
    this.cargarHospitales();
  }

  cargarMedico(id: string) {
    if(id === 'nuevo'){
        return;

    }
    this.medicoService.cargarMedicoPorId(id)
    .pipe(
      delay(100)
    )
    .subscribe((medico: any) => {
      if(!medico) {
        this.router.navigateByUrl(`/dashboard/medicos`);
        return;
      }
      const { nombre, hospital: { _id }} = medico;
      this.medicoSeleccionado = medico;
      this.medicoForm.setValue( { nombre, hospital:  _id });
    })
  }

  cargarHospitales() {
    this.hospitalService.cargarHospitales()
        .subscribe((hospitales:  Hospital[] )=> {
          this.hospitales = hospitales;
        })
  }
  guardar() {
    const { nombre } = this.medicoForm.value;

    if(this.medicoSeleccionado){
      // ACTUALIZAR
      const data = {
        ...this.medicoForm.value,
        _id: this.medicoSeleccionado._id
      }
      this.medicoService.actualizarMedico(data)
        .subscribe(resp => {
          console.log(resp);

          Swal.fire('Actualizado', `${nombre} actualizado correctamente`, 'success');
        })
    }else {
      // CREAR
      this.medicoService.crearMedico(this.medicoForm.value)
      .subscribe((resp: any) => {
        Swal.fire('Creado', `${nombre}`, 'success');
        this.router.navigateByUrl(`/dashboard/medico/${resp.medico._id}`)
      })

    }
  }
}
