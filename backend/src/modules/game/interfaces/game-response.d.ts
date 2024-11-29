import { GameRequest } from './game-request'

export interface GameResponse extends GameRequest {
  maxAttempts: number
}
