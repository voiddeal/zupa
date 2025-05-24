export interface Settings {
  tileUnFlipDelay: 1000 | 1300 | 1500
  boardTileCount: 16 | 36
  tileMode: "animals" | "flowers" | "humans"
  sessionTime: 60 | 90 | 120
  shouldCalculateMistakes: boolean
  shouldCalculateAttempts: boolean
  sounds: boolean
}
