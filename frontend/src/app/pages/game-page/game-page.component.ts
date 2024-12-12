import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  OnDestroy,
} from '@angular/core'
import { GameService } from '../../services/game.service'
import { Game } from '../../interfaces/game'
import { Item } from '../../interfaces/item'
import { ItemService } from '../../services/item.service'
import { FormControl, ReactiveFormsModule } from '@angular/forms'
import { GameStatus } from '../../enums/game-status.enum'
import { CommonModule } from '@angular/common'
import { concatMap, Subscription, take } from 'rxjs'
import { getRandomElement } from '../../common'

@Component({
  selector: 'app-game-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './game-page.component.html',
  styleUrl: './game-page.component.css',
})
export class GamePageComponent implements OnInit, OnDestroy {
  items: Item[] = []
  game: Game | null = null
  input = new FormControl<string>('')

  subscription = new Subscription()
  options: string[] = []
  selectedOption: string | null = null

  @ViewChild('skipButton') skipButton!: ElementRef<HTMLButtonElement>
  @ViewChild('gameOver') gameOver!: ElementRef<HTMLDivElement>

  constructor(
    private readonly itemService: ItemService,
    private readonly gameService: GameService,
  ) {
    const sub = this.input.valueChanges.subscribe((value) => {
      this.options = []
      if (value && value.length > 0) {
        this.items
          .map((item) => item.name)
          .filter((name) => name.toLowerCase().includes(value.toLowerCase()))
          .forEach((name) => this.options.push(name))
      }
    })
    this.subscription.add(sub)
  }

  async ngOnInit() {
    this.itemService
      .getAll()
      .pipe(
        concatMap((items) => {
          this.items = items.filter((item) => item.imageId !== null)
          return this.gameService.getGame(getRandomElement(this.items).id)
        }),
      )
      .subscribe((game) => (this.game = game))
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

  play() {
    if (this.game?.gameStatus !== GameStatus.IN_PROGRESS) return
    const item = this.items.find((item) => item.name === this.input.value)
    if (item) {
      const alreadyPlayed = this.game.attempts.find(
        (attempt) => attempt?.name === item.name,
      )
      if (!alreadyPlayed) {
        this.game.attempts.push(item)
        this.gameService.play(this.game).subscribe((game) => (this.game = game))
      }
    }
    this.input.setValue('')
  }

  skip() {
    this.skipButton.nativeElement.disabled = true
    if (this.game?.gameStatus !== GameStatus.IN_PROGRESS) return
    this.game.attempts.push(null)
    this.gameService.play(this.game).subscribe((game) => {
      this.game = game
      this.skipButton.nativeElement.disabled = false
    })
  }

  reset() {
    const itemIndex = this.items.findIndex(
      (i) => i.id === this.game?.original.id,
    )
    this.items.splice(itemIndex, 1)
    if (this.items.length === 0) {
      this.itemService
        .getAll()
        .pipe(take(1))
        .subscribe(
          (items) =>
            (this.items = items.filter((item) => item.imageId !== null)),
        )
    }
    this.gameService
      .getGame(getRandomElement(this.items).id, true)
      .pipe(take(1))
      .subscribe((game) => (this.game = game))
  }

  selectSuggestion(suggestion: string) {
    this.input.setValue(suggestion)
    this.options = []
  }

  isSelected(option: string) {
    return this.selectedOption === option
  }

  handleKeydown(event: KeyboardEvent) {
    const activeElement = document.activeElement as HTMLElement
    if (event.key === 'Enter' || event.key === ' ') {
      if (activeElement && activeElement.getAttribute('role') === 'option') {
        const suggestion = activeElement.textContent
        if (suggestion) {
          this.selectSuggestion(suggestion)
        }
      }
    }
  }
}
