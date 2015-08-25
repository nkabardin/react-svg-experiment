import Vector from './vector'

export default function parallelogramArea(points) {
  const sideA = Vector.fromTwoPoints(points[0], points[1])
  const sideB = Vector.fromTwoPoints(points[1], points[2])
  const diagonal = sideA.sumWithVector(sideB)

  const lenA = sideA.getLength()
  const lenB = sideB.getLength()
  const lenD = diagonal.getLength()

  const p = (lenA + lenB + lenD) / 2

  // we use Heron's formula to determine the area of triangle
  // and then double this value to get full area of parallelogram
  return Math.sqrt(p * (p - lenA) * (p - lenB) * (p - lenD)) * 2
}
