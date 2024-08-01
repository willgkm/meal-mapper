import { Food } from "./Food";

export type Meal = {
  id: number;
  name?: string;
  description?: string;
  foods: Food[];
  amountCalories: number;
  amountCarbs: number;
  amountProtein: number;
  amountFat: number;
}
