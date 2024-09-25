import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ObservableService {

  constructor() { }

  getUsers(): Observable<string[]> {
    return of(['Alice', 'Bob', 'Charlie']);
  }
}
