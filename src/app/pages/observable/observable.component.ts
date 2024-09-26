import { Component, OnInit, OnDestroy  } from '@angular/core';
import { ObservableService } from '../../_service/observable/observable.service';
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

  }

  ngOnDestroy(): void {
    
  }

  buildObservables(): void {

  }

}
