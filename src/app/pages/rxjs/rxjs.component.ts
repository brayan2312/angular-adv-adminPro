import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, retry, interval, take, map, filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnDestroy {
  public intervalSubs: Subscription | undefined;
  constructor() {




    // this.retornaObservable().pipe(
    //   retry(2)
    // ).subscribe(
    //   (valor) =>  console.log('subs', valor),
    //   (error) => console.warn(error),
    //   () => console.info('Obs terminado'),
    // );
    // this.intervalSubs = this.retornaInterval()
    //   .subscribe( console.log )

  }
  ngOnDestroy(): void {
    this.intervalSubs?.unsubscribe();
  }


  retornaInterval() {
    return interval(100)
            .pipe(
              // take(10),
              map(valor => valor + 1),
              filter(valor => (valor % 2 == 0) ? true : false),
            );



  }

  retornaObservable(): Observable<number> {
    let i = -1;

    const obs$ = new Observable<number>( observer => {

      const intervalo = setInterval(() => {

        i++;
         observer.next(i);

         if(i === 4){
           clearInterval(intervalo);
           observer.complete();
         }

         if(i === 2){
          //  console.log('i=2... error');
          //  observer.error('i llego al valor de 2');
         }

       }, 1000)
     });

     return obs$;
  }
}
