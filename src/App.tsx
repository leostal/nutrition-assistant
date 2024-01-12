import { useState } from 'react';
import viteLogo from '/vite.svg';
import './App.css';
import Parameters from './components/Parameters';
import { IDiet, IUserParams } from './api/types.ts';
import { createDiet } from './api/create-diet.ts';
import DietPlan from './components/DietPlan';

const getTitle = (showParams: boolean, hasDiet: boolean) => {
  if (showParams && !hasDiet) {
    return <h1>Заполни свои параметры</h1>;
  }

  return (
    <h1>
      Сбалансированный <br /> рацион питания
    </h1>
  );
};

function App() {
  const [showParams, setShowParams] = useState<boolean>(false);
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);
  const [diet, setDiet] = useState<IDiet | null>(null);
  const title = getTitle(showParams, !!diet);

  const handleSubmit = async (formData: IUserParams) => {
    setLoading(true);
    setError(false);
    try {
      const data = await createDiet(formData);

      setLoading(false);
      setDiet(data);
    } catch (e) {
      console.error(e);
      setLoading(false);
      setError(true);
    }
  };

  if (!!diet && !isLoading) {
    return (
      <>
        <DietPlan diet={diet} />
      </>
    );
  }

  return (
    <>
      <div>
        <a href="/">
          <img src={viteLogo} className="logo vite" alt="Vite logo" />
        </a>
      </div>
      {title}

      {!showParams && (
        <>
          <div className="card">
            <p>
              Нажмите на кнопку <code>Начать</code> для ввода параметров
            </p>
            <button
              style={{ marginTop: '32px' }}
              onClick={() => setShowParams(true)}
            >
              Начать
            </button>
          </div>

          <div className="card">
            <p>
              Все данные, которые показываются в рационе{' '}
              <code>сгенерировала нейросеть</code>,<br />
              поэтому иногда они могут отличаться от действительности.
            </p>
          </div>
        </>
      )}

      {showParams && (
        <Parameters
          onConfirmClick={handleSubmit}
          isLoading={isLoading}
          isError={isError}
        />
      )}
    </>
  );
}

export default App;
