import { Component, OnInit, OnDestroy  } from '@angular/core';
import { ObservableService } from '../_service/observable/observable.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-observable',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './observable.component.html',
  styleUrl: './observable.component.css'
})
export class ObservableComponent implements OnInit, OnDestroy {

  names$!: Observable<string[]>;

  constructor(private observableService: ObservableService){}

  ngOnInit(): void {
    this.names$ = this.observableService.getUsers();
      // Construction de l'obs
      const monObservable = new Observable(observer => {
        observer.next('Salut !'); 
        observer.next('Comment ça va ?');
        observer.complete();
    });

    // Abonnement à l'obs
    const monAbonnement = monObservable.subscribe({
      next: message => console.log(message),
      error: err => console.error('Quelque chose s\'est mal passé :', err),
      complete: () => console.log('L\'histoire est terminée !')
    });

  }

  ngOnDestroy(): void {
    
  }

  buildObservables(): void {

  }

}
