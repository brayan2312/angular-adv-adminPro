import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component  {

  public labels1: string[] = ['Lunes','Martes','Miercoles','Jueves','Viernes'];
  public labels2: string[] = ['Chatarra','Saludable','Energeticos'];
  public labels3: string[] = ['Facebook','WhatsApp','Instagram','Tiktok'];
  public labels4: string[] = ['Spotify','YouTube','Reproductor'];

  public data1: number[] = [10,20,30,40,50];
  public data2: number[] = [10,70,20];
  public data3: number[] = [30,40,20,10];
  public data4: number[] = [20,10,70];


}
