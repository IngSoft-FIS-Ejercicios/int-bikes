import { BIKE_TYPE_LABELS, Rental } from "../domain/Rental.ts";
import type { BikeType, RentalData } from "../domain/Rental.ts";
import { RentalList } from "../domain/RentalList.ts";
import mockRentals from "../data/rentals.json";

const rentalList = new RentalList();

const inpCustomer = document.getElementById(
  "inp-customer",
) as HTMLInputElement | null;
const inpCode = document.getElementById("inp-code") as HTMLInputElement | null;
const selType = document.getElementById("sel-type") as HTMLSelectElement | null;
const inpHours = document.getElementById(
  "inp-hours",
) as HTMLInputElement | null;
const inpPrice = document.getElementById(
  "inp-price",
) as HTMLInputElement | null;
const btnAdd = document.getElementById("btn-add") as HTMLButtonElement | null;
const errorContainer = document.getElementById(
  "error-container",
) as HTMLDivElement | null;
const errorMsg = document.getElementById(
  "error-msg",
) as HTMLParagraphElement | null;
const rentalsList = document.getElementById(
  "rentals-list",
) as HTMLDivElement | null;
const rentalsEmptyMsg = document.getElementById(
  "rentals-empty-msg",
) as HTMLParagraphElement | null;
const rentalsCount = document.getElementById(
  "rentals-count",
) as HTMLSpanElement | null;
const selFilterType = document.getElementById(
  "sel-filter-type",
) as HTMLSelectElement | null;
const byTypeList = document.getElementById(
  "by-type-list",
) as HTMLDivElement | null;
const byTypeEmptyMsg = document.getElementById(
  "by-type-empty-msg",
) as HTMLParagraphElement | null;
const inpTotalRentals = document.getElementById(
  "inp-total-rentals",
) as HTMLInputElement | null;
const inpTotalIncome = document.getElementById(
  "inp-total-income",
) as HTMLInputElement | null;

function clearInputs(): void {
  if (inpCustomer && inpCode && inpHours && inpPrice) {
    inpCustomer.value = "";
    inpCode.value = "";
    inpHours.value = "";
    inpPrice.value = "";
  }
}

function showError(message: string): void {
  if (errorContainer && errorMsg) {
    errorMsg.textContent = message;
    errorContainer.classList.remove("d-none");
  }
}

function hideError(): void {
  errorContainer?.classList.add("d-none");
}

function createText(text: string): HTMLParagraphElement {
  const paragraph = document.createElement("p");
  paragraph.className = "card-text mb-1";
  paragraph.textContent = text;
  return paragraph;
}

function createDeleteButton(rental: Rental): HTMLButtonElement {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "btn btn-outline-danger btn-sm";
  button.textContent = "Eliminar";
  button.setAttribute("aria-label", `Eliminar ${rental.bikeCode}`);
  button.addEventListener("click", () => {
    // TODO: eliminar este alquiler y actualizar los paneles
  });
  return button;
}

function createCard(rental: Rental): HTMLDivElement {
  const column = document.createElement("div");
  column.className = "col";
  const card = document.createElement("div");
  card.className = "card h-100";
  const body = document.createElement("div");
  body.className = "card-body";
  const title = document.createElement("h5");
  title.className = "card-title";
  title.textContent = rental.bikeCode;
  const lines = [
    `Tipo: ${BIKE_TYPE_LABELS[rental.bikeType]}`,
    `Cliente: ${rental.customer}`,
    `Horas: ${rental.hours}`,
    `Costo: $${rental.cost()}`,
  ];
  if (rental.lateHours > 0) {
    lines.push(`Atraso: ${rental.lateHours} h`);
  }
  body.append(title, ...lines.map(createText));
  const footer = document.createElement("div");
  footer.className = "card-footer bg-transparent";
  footer.append(createDeleteButton(rental));
  card.append(body, footer);
  column.append(card);
  return column;
}

function updateList(): void {
  if (rentalsList && rentalsEmptyMsg && rentalsCount) {
    const rentals = rentalList.getItems();
    rentalsCount.textContent = String(rentals.length);
    rentalsEmptyMsg.classList.toggle("d-none", rentals.length > 0);
    rentalsList.replaceChildren(...rentals.map(createCard));
  }
}

function updateListByType(): void {
  if (selFilterType && byTypeList && byTypeEmptyMsg) {
    const rentals = rentalList.getByType(selFilterType.value as BikeType);
    byTypeEmptyMsg.classList.toggle("d-none", rentals.length > 0);
    byTypeList.replaceChildren(...rentals.map(createCard));
  }
}

function updateTotals(): void {
  if (inpTotalRentals && inpTotalIncome) {
    inpTotalRentals.value = String(rentalList.getItems().length);
    inpTotalIncome.value = String(rentalList.totalIncome());
  }
}

function loadMockData(): void {
  for (const data of mockRentals as (RentalData & { lateHours?: number })[]) {
    const rental = new Rental(data);
    rental.lateHours = data.lateHours ?? 0;
    rentalList.add(rental);
  }
}

loadMockData();
updateList();
updateListByType();
updateTotals();

selFilterType?.addEventListener("change", updateListByType);

if (btnAdd && inpCustomer && inpCode && selType && inpHours && inpPrice) {
  btnAdd.addEventListener("click", () => {
    try {
      const rental = new Rental({
        customer: inpCustomer.value,
        bikeCode: inpCode.value,
        bikeType: selType.value as BikeType,
        hours: Number(inpHours.value),
        pricePerHour: Number(inpPrice.value),
      });
      rentalList.add(rental);
      hideError();
      clearInputs();
      updateList();
      updateListByType();
      updateTotals();
    } catch (error) {
      showError(error instanceof Error ? error.message : String(error));
    }
  });
}
