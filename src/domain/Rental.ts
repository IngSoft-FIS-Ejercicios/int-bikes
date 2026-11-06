export type BikeType = "urban" | "mountain" | "electric";

export const BIKE_TYPE_LABELS: Record<BikeType, string> = {
  urban: "Urbana",
  mountain: "Montaña",
  electric: "Eléctrica",
};

export type RentalData = {
  customer: string;
  bikeCode: string;
  bikeType: BikeType;
  hours: number;
  pricePerHour: number;
};

export class Rental {
  private _customer: string = "";
  private _bikeCode: string = "";
  private _bikeType: BikeType = "urban";
  private _hours: number = 1;
  private _pricePerHour: number = 0;
  private _lateHours: number = 0;

  constructor(data: RentalData) {
    this.customer = data.customer;
    this.bikeCode = data.bikeCode;
    this.bikeType = data.bikeType;
    this.hours = data.hours;
    this.pricePerHour = data.pricePerHour;
  }

  get customer(): string {
    return this._customer;
  }

  set customer(value: string) {
    const trimmed = value.trim();
    if (!trimmed) {
      throw new Error("El cliente no puede estar vacío.");
    }
    this._customer = trimmed;
  }

  get bikeCode(): string {
    return this._bikeCode;
  }

  set bikeCode(value: string) {
    const trimmed = value.trim();
    if (!/^B-\d{3}$/.test(trimmed)) {
      throw new Error("El código debe tener el formato B-123.");
    }
    this._bikeCode = trimmed;
  }

  get bikeType(): BikeType {
    return this._bikeType;
  }

  set bikeType(value: BikeType) {
    if (!Object.hasOwn(BIKE_TYPE_LABELS, value)) {
      throw new Error("Debe seleccionar un tipo de bicicleta válido.");
    }
    this._bikeType = value;
  }

  get hours(): number {
    return this._hours;
  }

  set hours(value: number) {
    if (!Number.isInteger(value) || value < 1 || value > 24) {
      throw new Error("Las horas deben ser un entero entre 1 y 24.");
    }
    this._hours = value;
  }

  get pricePerHour(): number {
    return this._pricePerHour;
  }

  set pricePerHour(value: number) {
    if (!Number.isFinite(value) || value <= 0) {
      throw new Error("El precio por hora debe ser mayor que 0.");
    }
    this._pricePerHour = value;
  }

  get lateHours(): number {
    return this._lateHours;
  }

  set lateHours(_value: number) {
    // TODO: validar y guardar las horas de atraso
  }

  cost(): number {
    return this.hours * this.pricePerHour;
  }

  toString(): string {
    return `${this.bikeCode} (${BIKE_TYPE_LABELS[this.bikeType]}) - ${this.customer} - ${this.hours} h - $${this.cost()}`;
  }
}
