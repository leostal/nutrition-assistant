export enum Genders {
  MALE = 'male',
  FEMALE = 'female',
}

export enum ActivityLevels {
  LOW = 'low',
  MODERATE = 'moderate',
  HIGH = 'high',
}

export enum Goals {
  WEIGHT_LOSS = 'weight_loss', // сброс веса
  WEIGHT_GAIN = 'weight_gain', // набор веса
  WEIGHT_MAINTENANCE = 'weight_maintenance', // поддержание веса
}

export const ActivityLevelsMapping = {
  [ActivityLevels.LOW]: 'Низкий',
  [ActivityLevels.MODERATE]: 'Умеренный',
  [ActivityLevels.HIGH]: 'Высокий',
};

export const GoalsMapping = {
  [Goals.WEIGHT_LOSS]: 'Похудеть',
  [Goals.WEIGHT_GAIN]: 'Набрать вес',
  [Goals.WEIGHT_MAINTENANCE]: 'Поддерживать вес',
};

export const GendersMapping = {
  [Genders.MALE]: 'Мужской',
  [Genders.FEMALE]: 'Женский',
};

export interface IUserParams {
  name: string;
  age: number;
  gender: Genders;
  weightKg: number;
  heightCm: number;
  activityLevel: ActivityLevels;
  goal: Goals;
}

export interface IMacronutrients {
  proteinG: string;
  carbohydratesG: string;
  fatG: string;
}

export interface IDietPlan {
  caloriesPerDay: string;
  macronutrients: IMacronutrients;
  mealPlan: IMeal[];
}

export interface IFood {
  name: string;
  portion: string;
  calories: string;
  proteinG: string;
  carbohydratesG: string;
  fatG: string;
}

export interface IMeal {
  mealName: string;
  foods: IFood[];
}

export interface IDiet {
  user: IUserParams;
  dietPlan: IDietPlan;
}
