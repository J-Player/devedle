import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { environment } from '../../environments/environment'
import { Game } from '../interfaces/game'
import { Observable, of } from 'rxjs'
import { LocalStorageService } from './local-storage.service'

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private url = `${environment.api}/game`

  constructor(
    private readonly client: HttpClient,
    private readonly localStorageService: LocalStorageService,
  ) {}

  play(game: Game) {
    return this.client.post<Game>(`${this.url}/play`, game)
  }

  getGame(itemId: string, reset?: boolean): Observable<Game | null> {
    const str = this.localStorageService.get<Game>('game')
    if (str === null || reset) {
      return new Observable((observer) =>
        this.client.get<Game>(`${this.url}/${itemId}`).subscribe({
          next: (data) => {
            this.localStorageService.set('game', data)
            observer.next(data)
            observer.complete()
          },
          error: (err) => {
            observer.error(err)
          },
        }),
      )
    }
    return of(str || null)
  }
}
