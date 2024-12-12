import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private storage: Storage

  constructor() {
    this.storage = window.localStorage
  }

  set(key: string, value: unknown): boolean {
    if (this.storage) {
      this.storage.setItem(key, JSON.stringify(value))
      return true
    }
    return false
  }

  get<T>(key: string): T | null {
    if (this.storage) {
      const value = this.storage.getItem(key)
      return value ? (JSON.parse(value) as T) : null
    }
    return null
  }

  remove(key: string): boolean {
    if (this.storage) {
      this.storage.removeItem(key)
      return true
    }
    return false
  }

  clear(): boolean {
    if (this.storage) {
      this.storage.clear()
      return true
    }
    return false
  }
}
