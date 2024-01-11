import { FC, PropsWithChildren } from 'react';
import {
  ActivityLevelsMapping,
  GendersMapping,
  GoalsMapping,
  IDiet,
} from '../../api/types.ts';
import './DietPlan.css';
import viteLogo from '/vite.svg';

interface IDietPlan extends PropsWithChildren {
  diet: IDiet;
}

export const DietPlan: FC<IDietPlan> = ({ diet }) => {
  const { name, age, gender, goal, heightCm, weightKg, activityLevel } =
    diet?.user || {};
  const { caloriesPerDay, macronutrients, mealPlan } = diet?.dietPlan || {};

  return (
    <div className="container">
      <div className="wrapperHeader">
        <div>
          <a href={'/'}>
            <img src={viteLogo} className="logo vite" alt="Vite logo" />
          </a>
        </div>
        <div className="params">
          <p className="param">
            Имя: <code>{name}</code>
          </p>
          <p className="param">
            Возраст: <code>{age}</code>
          </p>
          <p className="param">
            Пол: <code>{GendersMapping[gender]}</code>
          </p>
          <p className="param">
            Цель: <code>{GoalsMapping[goal]}</code>
          </p>
          <p className="param">
            Рост: <code>{heightCm}см</code> Вес: <code>{weightKg}кг</code>
          </p>
          <p className="param">
            Уровень активности:{' '}
            <code>{ActivityLevelsMapping[activityLevel]}</code>
          </p>
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          textAlign: 'start',
          paddingLeft: '24px',
        }}
      >
        <h3>Оптимальные КБЖУ</h3>
        <p className="param">Объем калорий: ~{caloriesPerDay}</p>
        <p className="param">Белки: ~{macronutrients?.proteinG}г</p>
        <p className="param">Жиры: ~{macronutrients?.fatG}г</p>
        <p className="param">Углеводы: ~{macronutrients?.carbohydratesG}г</p>

        {mealPlan?.map(({ mealName, foods }, index) => {
          return (
            <div key={index}>
              <h3>{mealName}</h3>
              {foods.map((food, index) => (
                <p key={index}>
                  {food?.name}, {food?.portion} (К: {food?.calories}, Б:{' '}
                  {food?.proteinG}, Ж: {food?.fatG}, У: {food?.carbohydratesG})
                </p>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};
