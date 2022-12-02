import { Injectable, NgZone } from '@angular/core';
import { HttpClient  } from "@angular/common/http";
import { RegisterForm } from '../interfaces/register-form.interface';
import { environment } from 'src/environments/environment';
import { LoginForm } from '../interfaces/login-form.interface';
import { map, tap, Observable, catchError, of, delay } from 'rxjs';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.model';
import { CargarUsuario } from '../interfaces/cargar-usuarios.interface';

declare const google : any;

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  public auth2: any;
  public usuario!: Usuario;
  constructor(private http: HttpClient,
              private router: Router,
              private ngZone: NgZone) {

    this.googleInit();
   }

   get token(): string  {
    return localStorage.getItem('token') || '';
   }

   get uid(): string {
    return this.usuario!.uid || '';
   }

   get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
   }

  googleInit() {

    return new Promise<void>( resolve => {
      console.log('Google init');

      google.accounts.id.initialize({
        client_id: "1004423663877-5s9j2oat6mh465b5h63p0h89p9f00rfi.apps.googleusercontent.com",
        callback: (response: any) => this.handleCredentialResponse(response),
        cookiepolicy: 'single_host_origin',

      });
      resolve();
    })

  }

  handleCredentialResponse(response: any){

    this.loginGoogle(response.credential)
          .subscribe(resp => {
            this.router.navigateByUrl('/');
          })
  }


  logout() {
    localStorage.removeItem('token');
    google.accounts.id.revoke( 'brayan.nava1806@gmail.com' , () => {
      this.ngZone.run( () => {
        this.router.navigateByUrl('/login');
      })
    })
  }


  validarToken(): Observable<boolean> {
    const token = localStorage.getItem('token') || '';

    return this.http.get(`${ base_url }/login/renew`, {
      headers: {
        'x-token': token
      }
    }).pipe(
      map(( resp: any) => {
        const { nombre, email, google, role, uid, img = ''} = resp.usuario;
        this.usuario = new Usuario(nombre, email, '', img, google, role, uid );
        localStorage.setItem('token', resp.token);
        return true;
      }),
      catchError( err => {
        console.log(err);
        return of(false);

      } )
    );
  }


  crearUsuario(formData: RegisterForm){
    console.log('Creando Usuario');
    return this.http.post(`${base_url}/usuarios`, formData)
              .pipe(
                tap(( resp: any) => {
                  localStorage.setItem('token', resp.token)
                }),
              )
  }

  actualizarUsuario(dataa: { email: string, nombre: string, role: string } ) {

    const data = {
      ...dataa,
      role: this.usuario?.role
    };

    return this.http.put(`${base_url}/usuarios/${this.uid}`, data , this.headers);
  }

  login(formData: LoginForm){
    return this.http.post(`${base_url}/login`, formData)
                .pipe(
                  tap(( resp: any) => {
                    localStorage.setItem('token', resp.token)
                  }),
                )
  }

  loginGoogle(token: string) {
    return this.http.post(`${ base_url }/login/google`, {token})
              .pipe(
                tap(( resp: any) => {
                  localStorage.setItem('token', resp.token)
                  // console.log(resp);
                })
              )

  }

  cargarUsuarios(desde : number) {
    const url = `${ base_url }/usuarios?desde=${desde}`;
    return this.http.get<CargarUsuario>(url, this.headers)
              .pipe(
                map(resp => {

                  const usuarios = resp.usuarios.map(
                    user => new Usuario(user.nombre,user.email, '', user.img, user.google, user.role, user.uid)
                    );

                  return {
                    total: resp.total,
                    usuarios
                  };
                })
              )
  }

  eliminarUsuario(usuario: Usuario) {
    const url = `${ base_url }/usuarios/${usuario.uid}`;
    return this.http.delete(url, this.headers);

  }

  guardarUsuario(data: Usuario) {

    return this.http.put(`${base_url}/usuarios/${data.uid}`, data , this.headers);
  }

}
