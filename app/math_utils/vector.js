export default class Vector {
  static fromTwoPoints = (point0, point1) => {
    return new Vector(point1.x - point0.x, point1.y - point0.y)
  }

  constructor(x, y) {
    this.x = x
    this.y = y
  }

  sumWithVector(vec) {
    return new Vector(
      this.x + vec.x,
      this.y + vec.y
    )
  }

  getLength() {
    return Math.sqrt(this.x**2 + this.y**2)
  }

  toPoint() {
    return {
      x: this.x,
      y: this.y
    }
  }
}
