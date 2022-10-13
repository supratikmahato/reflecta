import { IMood } from "../types";

function parseCoffeeType(moods: IMood[]) {
  for (const i in moods) {
    if (moods[i].coffeeType === "black") {
      moods[i].coffeeType = "Black";
    } else if (moods[i].coffeeType === "americano") {
      moods[i].coffeeType = "Americano";
    } else if (moods[i].coffeeType === "latte") {
      moods[i].coffeeType = "Latte";
    } else if (moods[i].coffeeType === "cappuccino") {
      moods[i].coffeeType = "Cappuccino";
    } else if (moods[i].coffeeType === "espresso") {
      moods[i].coffeeType = "Espresso";
    } else if (moods[i].coffeeType === "doppio") {
      moods[i].coffeeType = "Doppio";
    } else if (moods[i].coffeeType === "cortado") {
      moods[i].coffeeType = "Cortado";
    } else if (moods[i].coffeeType === "red-eye") {
      moods[i].coffeeType = "Red Eye";
    } else if (moods[i].coffeeType === "galao") {
      moods[i].coffeeType = "Galão";
    } else if (moods[i].coffeeType === "lungo") {
      moods[i].coffeeType = "Lungo";
    } else if (moods[i].coffeeType === "macchiato") {
      moods[i].coffeeType = "Macchiato";
    } else if (moods[i].coffeeType === "mocha") {
      moods[i].coffeeType = "Mocha";
    } else if (moods[i].coffeeType === "ristretto") {
      moods[i].coffeeType = "Ristretto";
    } else if (moods[i].coffeeType === "flat-white") {
      moods[i].coffeeType = "Flat White";
    } else if (moods[i].coffeeType === "affogato") {
      moods[i].coffeeType = "Affogato";
    } else if (moods[i].coffeeType === "cafe-au-lait") {
      moods[i].coffeeType = "Café Au Lait";
    } else if (moods[i].coffeeType === "irish") {
      moods[i].coffeeType = "Irish";
    }
  }
  return moods;
}

export default parseCoffeeType;
