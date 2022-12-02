import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit {

  public formSubmited =  false;

  miRegister: FormGroup =  this.fb.group({
    nombre: ['Fernando', [Validators.required ] ],
    email: ['test100@gmail.com', [Validators.required, Validators.email ] ],
    password : ['123456', [Validators.required, Validators.minLength(6) ] ],
    password2 : ['123456', [Validators.required, Validators.minLength(6) ] ],
    terminos : [ true, [Validators.requiredTrue] ],
  }, {
    Validators: this.passwordsIguales('password','password2')
  })

  constructor(private fb: FormBuilder,
              private usuarioService: UsuarioService,
              private router: Router) { }

  ngOnInit(): void {
  }
  crearUsuario() {
    this.formSubmited = true;
    // console.log(this.miRegister.value);

    if(this.miRegister.valid){
      console.log('posteando formulario');
      this.usuarioService.crearUsuario(this.miRegister.value)
            .subscribe(resp => {
              this.router.navigateByUrl('/');

            }, (err) => {
              swal.fire('Error', err.error.msg, 'error');
            });
      return;

    }else {
      console.log('Formulario no es corrcto');

    }

  }

  campoNoValido(campo: string) : boolean {

    if(this.miRegister.get(campo)?.invalid && this.formSubmited){
      return true;
    }{
      return false;
    }

  }
  contrasenasNoValidas(){
    const pass1 = this.miRegister.get('password')?.value;
    const pass2 = this.miRegister.get('password2')?.value;

    if( (pass1 !== pass2) && this.formSubmited ){
      return true;
    }else{

      return false;
    }
  }

  aceptaTerminos() {
   return  !this.miRegister.get('terminos')?.value && this.formSubmited;
  }

  passwordsIguales(pass1: string, pass2: string) {

    return (formGroup: FormGroup) => {
      const pass1Control = formGroup.get(pass1);
      const pass2Control = formGroup.get(pass2);

      if(pass1Control === pass2Control) {
        pass1Control?.setErrors(null);
      }else {
        pass2Control?.setErrors({ noEsIgual: true });
      }
    }
  }
}
