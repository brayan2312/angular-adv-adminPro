import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import swal from 'sweetalert2';
declare const google: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit, AfterViewInit {
  @ViewChild('googleBtn') googleBtn!: ElementRef;

  public formSubmitted = false;


public auth2: any;
  miLogin: FormGroup =  this.fb.group({
    email: [ localStorage.getItem('email') || '', [Validators.required, Validators.email ] ],
    password : ['', [Validators.required, Validators.minLength(6) ] ],
    remember: [true],
  })

  constructor(private router: Router,
              private fb: FormBuilder,
              private usuarioService: UsuarioService,
              private ngZone: NgZone) { }


  ngOnInit(): void {
  }

  ngAfterViewInit(): void {

  this.googleInit();

  }

  async googleInit() {

      // google.accounts.id.initialize({
      //   client_id: "1004423663877-5s9j2oat6mh465b5h63p0h89p9f00rfi.apps.googleusercontent.com",
      //   callback: (response: any) => this.handleCredentialResponse(response)
      // });

      this.usuarioService.googleInit();
      // this.auth2 = this.usuarioService.auth2;
      google.accounts.id.renderButton(
        //  document.getElementById("buttonDiv"),
       this.googleBtn.nativeElement,
        { theme: "outline", size: "large" }  // customization attributes
      );


  }

  // handleCredentialResponse(response: any){
  //   // console.log( { esto: this } );
  //   // console.log("Encoded JWT ID token: " + response.credential);

  //   this.usuarioService.loginGoogle(response.credential)
  //         .subscribe(resp => {
  //           this.router.navigateByUrl('/');
  //         })

  // }


  login() {
    // console.log(this.miLogin.value);
    this.usuarioService.login(this.miLogin.value)
          .subscribe(resp => {
           if(this.miLogin.get('remember')?.value){
              localStorage.setItem('email', this.miLogin.get('email')?.value);
           }else {
            localStorage.removeItem('email');
           }
           this.ngZone.run( ()=> {
             this.router.navigateByUrl('/');
           })

          }, (err) => {
            swal.fire('Error', err.error.msg, 'error');
          });
  }


}
