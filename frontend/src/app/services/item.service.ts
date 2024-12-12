import { Injectable } from '@angular/core'
import { Item } from '../interfaces/item'
import { HttpClient } from '@angular/common/http'
import { environment } from '../../environments/environment'
import { Observable, of } from 'rxjs'
import { LocalStorageService } from './local-storage.service'

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  private url = `${environment.api}/items`
  items: Item[] = []

  constructor(
    private readonly client: HttpClient,
    private readonly localStorageService: LocalStorageService
  ) {}

  getItem(id: string): Observable<Item | null> {
    const str = this.localStorageService.get<Item[]>('items')
    if (str !== null) return of(str.find((item) => item.id === id) || null)
      return new Observable((observer) => {
        this.client.get<Item[]>(`${this.url}/all`).subscribe({
          next: (data) => {
            this.localStorageService.set('items', data);
            observer.next(data.find((item) => item.id === id) || null);
            observer.complete();
          },
          error: (err) => {
            observer.error(err);
          },
        });
      });
  }

  getAll(): Observable<Item[]> {
    const str = this.localStorageService.get<Item[]>('items')
    if (str !== null) return of(str)
      return new Observable((observer) => {
        this.client.get<Item[]>(`${this.url}/all`).subscribe({
          next: (data) => {
            this.localStorageService.set('items', data);
            observer.next(data);
            observer.complete();
          },
          error: (err) => {
            observer.error(err);
          },
        });
      });
  }
}
