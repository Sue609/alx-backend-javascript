const brandSymbol = Symbol('brand');
const motorSymbol = Symbol('motor');
const colorSymbol = Symbol('color');

export default class Car {
  constructor(brand, motor, color) {
    this[brandSymbol] = brand;
    this[motorSymbol] = motor;
    this[colorSymbol] = color;
  }

  getBrand() {
    return this[brandSymbol];
  }

  getMotor() {
    return this[motorSymbol];
  }

  getColor() {
    return this[colorSymbol];
  }

  cloneCar() {
    return new Car(this[brandSymbol], this[motorSymbol], this[colorSymbol]);
  }
}
