import OpenAI from 'openai';
import { IDiet, IUserParams } from './types.ts';

const openai = new OpenAI({
  apiKey: 'My api key',
  dangerouslyAllowBrowser: true,
});

export async function createDiet(userParams: IUserParams): Promise<IDiet> {
  const { name, age, goal, gender, heightCm, weightKg, activityLevel } =
    userParams || {};

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content:
            'You are a nutrition assistant, who generates a balanced diet for a person in russian, using their parameters. You return it in exact json format like this: {\n  "user": {\n    "name": "John Doe",\n    "age": 30,\n    "gender": "male",\n    "weightKg": 70,\n    "heightCm": 170,\n    "activityLevel": "moderate",\n    "goal": "weightLoss",\n  },\n  "dietPlan": {\n    "caloriesPerDay": 1800,\n    "macronutrients": {\n      "proteinG": 80,\n      "carbohydratesG": 200,\n      "fatG": 60\n    },\n    "mealPlan": [\n      {\n        "mealName": "Завтрак",\n        "foods": [\n          {\n            "name": "Овсянка",\n            "portion": "150 г",\n            "calories": 150,\n            "proteinG": 5,\n            "carbohydratesG": 30,\n            "fatG": 2\n          },\n          {\n            "name": "Греческий йогурт",\n            "portion": "75 г",\n            "calories": 80,\n            "proteinG": 10,\n            "carbohydratesG": 4,\n            "fatG": 3\n          }\n        ]\n      },\n      {\n        "mealName": "Обед",\n        "foods": [\n          {\n            "name": "Жаренная куриная грудка",\n            "portion": "200 г",\n            "calories": 150,\n            "proteinG": 25,\n            "carbohydratesG": 0,\n            "fatG": 3\n          },\n          {\n            "name": "Коричневый рис",\n            "portion": "300 г",\n            "calories": 100,\n            "proteinG": 2,\n            "carbohydratesG": 22,\n            "fatG": 1\n          }\n        ]\n      },\n      {\n        "mealName": "Перекус",\n        "foods": [\n          {\n            "name": "Банан",\n            "portion": "1 шт",\n            "calories": 150,\n            "proteinG": 5,\n            "carbohydratesG": 13,\n            "fatG": 4\n          },\n          {\n            "name": "Шоколадный батончик",\n            "portion": "1 шт",\n            "calories": 175,\n            "proteinG": 3,\n            "carbohydratesG": 12,\n            "fatG": 1\n          }\n        ]\n      },\n{\n        "mealName": "Ужин",\n        "foods": [\n          {\n            "name": "Лосось",\n            "portion": "300 г",\n            "calories": 300,\n            "proteinG": 40,\n            "carbohydratesG": 0,\n            "fatG": 14\n          },\n          {\n            "name": "Брокколи",\n            "portion": "200 г",\n            "calories": 55,\n            "proteinG": 3,\n            "carbohydratesG": 12,\n            "fatG": 1\n          }\n        ]\n      }\n    ]\n  }\n}\n',
        },
        {
          role: 'user',
          content:
            'Generate a balanced diet for this person – name: Maria Silver, age: 27, gender: female, weightKg: 52, heightCm: 161, activityLevel: moderate, goal: "weight maintainance". ',
        },
        {
          role: 'assistant',
          content:
            '{\n  "user": {\n    "name": "Maria Silver",\n    "age": 27,\n    "gender": "female",\n    "weightKg": 52,\n    "heightCm": 161,\n    "activityLevel": "moderate",\n    "goal": "weight_maintenance"\n  },\n  "dietPlan": {\n    "caloriesPerDay": 1600,\n    "macronutrients": {\n      "proteinG": 52,\n      "carbohydratesG": 208,\n      "fatG": 61\n    },\n    "mealPlan": [\n      {\n        "mealName": "Завтрак",\n        "foods": [\n          {\n            "name": "Яичный омлет",\n            "portion": "2 шт",\n            "calories": 180,\n            "proteinG": 12,\n            "carbohydratesG": 2,\n            "fatG": 14\n          },\n          {\n            "name": "Хлеб цельнозерновой",\n            "portion": "2 ломтика",\n            "calories": 160,\n            "proteinG": 8,\n            "carbohydratesG": 30,\n            "fatG": 2\n          },\n          {\n            "name": "Апельсин",\n            "portion": "1 шт",\n            "calories": 62,\n            "proteinG": 1,\n            "carbohydratesG": 15,\n            "fatG": 0\n          },\n          {\n            "name": "Чай зеленый",\n            "portion": "200 мл",\n            "calories": 0,\n            "proteinG": 0,\n            "carbohydratesG": 0,\n            "fatG": 0\n          }\n        ]\n      },\n      {\n        "mealName": "Перекус",\n        "foods": [\n          {\n            "name": "Миндаль",\n            "portion": "30 г",\n            "calories": 175,\n            "proteinG": 6,\n            "carbohydratesG": 6,\n            "fatG": 15\n          },\n          {\n            "name": "Яблоко",\n            "portion": "1 шт",\n            "calories": 52,\n            "proteinG": 0,\n            "carbohydratesG": 14,\n            "fatG": 0\n          }\n        ]\n      },\n      {\n        "mealName": "Обед",\n        "foods": [\n          {\n            "name": "Куриное филе",\n            "portion": "150 г",\n            "calories": 165,\n            "proteinG": 38,\n            "carbohydratesG": 0,\n            "fatG": 2\n          },\n          {\n            "name": "Гречка",\n            "portion": "100 г",\n            "calories": 343,\n            "proteinG": 13,\n            "carbohydratesG": 70,\n            "fatG": 3\n          },\n          {\n            "name": "Морковь",\n            "portion": "100 г",\n            "calories": 41,\n            "proteinG": 1,\n            "carbohydratesG": 10,\n            "fatG": 0\n          },\n          {\n            "name": "Огурец",\n            "portion": "100 г",\n            "calories": 15,\n            "proteinG": 0,\n            "carbohydratesG": 3,\n            "fatG": 0\n          }\n        ]\n      },\n      {\n        "mealName": "Полдник",\n        "foods": [\n          {\n            "name": "Творог",\n            "portion": "100 г",\n            "calories": 103,\n            "proteinG": 18,\n            "carbohydratesG": 3,\n            "fatG": 3\n          },\n          {\n            "name": "Малины",\n            "portion": "100 г",\n            "calories": 53,\n            "proteinG": 1,\n            "carbohydratesG": 12,\n            "fatG": 0\n          }\n        ]\n      },\n      {\n        "mealName": "Ужин",\n        "foods": [\n          {\n            "name": "Тунец",\n            "portion": "150 г",\n            "calories": 150,\n            "proteinG": 35,\n            "carbohydratesG": 0,\n            "fatG": 1\n          },\n          {\n            "name": "Брокколи",\n            "portion": "200 г",\n            "calories": 60,\n            "proteinG": 5,\n            "carbohydratesG": 12,\n            "fatG": 1\n          }\n        ]\n      }\n    ]\n  }\n}',
        },
        {
          role: 'user',
          content: `Generate a balanced diet for this person – name: ${name}, age: ${age}, gender: ${gender}, weightKg: ${weightKg}, heightCm: ${heightCm}, activityLevel: ${activityLevel}, goal: ${goal}. `,
        },
      ],
      temperature: 1,
      max_tokens: 2005,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    return JSON.parse(response?.choices[0]?.message?.content);
  } catch (e) {
    console.error(e);
    throw new Error('There is an error in response ');
  }
}

export async function createMockDiet(userParams: IUserParams): Promise<IDiet> {
  const mockRes = {
    user: {
      name: 'Роман',
      age: 26,
      gender: 'Male',
      weightKg: 66,
      heightCm: 199,
      activityLevel: 'high',
      goal: 'weight_maintenance',
    },
    dietPlan: {
      caloriesPerDay: 2600,
      macronutrients: {
        proteinG: 165,
        carbohydratesG: 325,
        fatG: 73,
      },
      mealPlan: [
        {
          mealName: 'Завтрак',
          foods: [
            {
              name: 'Омлет из яиц и овощей',
              portion: '3 шт',
              calories: 296,
              proteinG: 24,
              carbohydratesG: 9,
              fatG: 18,
            },
            {
              name: 'Хлеб цельнозерновой',
              portion: '2 ломтика',
              calories: 160,
              proteinG: 8,
              carbohydratesG: 30,
              fatG: 2,
            },
            {
              name: 'Апельсин',
              portion: '1 шт',
              calories: 62,
              proteinG: 1,
              carbohydratesG: 15,
              fatG: 0,
            },
            {
              name: 'Чай зеленый',
              portion: '200 мл',
              calories: 0,
              proteinG: 0,
              carbohydratesG: 0,
              fatG: 0,
            },
          ],
        },
        {
          mealName: 'Перекус',
          foods: [
            {
              name: 'Греческий йогурт',
              portion: '170 г',
              calories: 133,
              proteinG: 15,
              carbohydratesG: 7,
              fatG: 5,
            },
            {
              name: 'Мед',
              portion: '1 ст.л.',
              calories: 64,
              proteinG: 0,
              carbohydratesG: 17,
              fatG: 0,
            },
            {
              name: 'Орехи',
              portion: '30 г',
              calories: 196,
              proteinG: 4,
              carbohydratesG: 4,
              fatG: 20,
            },
          ],
        },
        {
          mealName: 'Обед',
          foods: [
            {
              name: 'Куриное филе',
              portion: '200 г',
              calories: 248,
              proteinG: 48,
              carbohydratesG: 0,
              fatG: 5,
            },
            {
              name: 'Картофель',
              portion: '200 г',
              calories: 166,
              proteinG: 2,
              carbohydratesG: 38,
              fatG: 0,
            },
            {
              name: 'Брокколи',
              portion: '200 г',
              calories: 60,
              proteinG: 5,
              carbohydratesG: 12,
              fatG: 1,
            },
            {
              name: 'Оливковое масло',
              portion: '1 ст.л.',
              calories: 119,
              proteinG: 0,
              carbohydratesG: 0,
              fatG: 14,
            },
          ],
        },
        {
          mealName: 'Полдник',
          foods: [
            {
              name: 'Творог',
              portion: '150 г',
              calories: 157,
              proteinG: 20,
              carbohydratesG: 3,
              fatG: 6,
            },
            {
              name: 'Клубника',
              portion: '200 г',
              calories: 32,
              proteinG: 1,
              carbohydratesG: 7,
              fatG: 0,
            },
          ],
        },
        {
          mealName: 'Ужин',
          foods: [
            {
              name: 'Говядина',
              portion: '200 г',
              calories: 400,
              proteinG: 46,
              carbohydratesG: 0,
              fatG: 23,
            },
            {
              name: 'Рис',
              portion: '150 г',
              calories: 197,
              proteinG: 4,
              carbohydratesG: 44,
              fatG: 0,
            },
            {
              name: 'Салат из овощей',
              portion: '150 г',
              calories: 50,
              proteinG: 2,
              carbohydratesG: 10,
              fatG: 0,
            },
            {
              name: 'Оливковое масло',
              portion: '1 ст.л.',
              calories: 119,
              proteinG: 0,
              carbohydratesG: 0,
              fatG: 14,
            },
          ],
        },
      ],
    },
  };
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockRes);
    }, 3000);
  });
}
