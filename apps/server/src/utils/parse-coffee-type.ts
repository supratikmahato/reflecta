import { type IMood } from "../types";

function parseCoffeeType(moods: IMood[]): IMood[] {
  for (const mood of moods) {
    switch (mood.coffeeType) {
      case "black": {
        mood.coffeeType = "Black";
        break;
      }
      case "americano": {
        mood.coffeeType = "Americano";
        break;
      }
      case "latte": {
        mood.coffeeType = "Latte";
        break;
      }
      case "cappuccino": {
        mood.coffeeType = "Cappuccino";
        break;
      }
      case "espresso": {
        mood.coffeeType = "Espresso";
        break;
      }
      case "doppio": {
        mood.coffeeType = "Doppio";
        break;
      }
      case "cortado": {
        mood.coffeeType = "Cortado";
        break;
      }
      case "red-eye": {
        mood.coffeeType = "Red Eye";
        break;
      }
      case "galao": {
        mood.coffeeType = "Galão";
        break;
      }
      case "lungo": {
        mood.coffeeType = "Lungo";
        break;
      }
      case "macchiato": {
        mood.coffeeType = "Macchiato";
        break;
      }
      case "mocha": {
        mood.coffeeType = "Mocha";
        break;
      }
      case "ristretto": {
        mood.coffeeType = "Ristretto";
        break;
      }
      case "flat-white": {
        mood.coffeeType = "Flat White";
        break;
      }
      case "affogato": {
        mood.coffeeType = "Affogato";
        break;
      }
      case "cafe-au-lait": {
        mood.coffeeType = "Café Au Lait";
        break;
      }
      case "irish": {
        mood.coffeeType = "Irish";
        break;
      }
    }
  }
  return moods;
}

export default parseCoffeeType;
