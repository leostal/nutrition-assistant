import {
  DetailedHTMLProps,
  FC,
  InputHTMLAttributes,
  PropsWithChildren,
  useEffect,
  useState,
} from 'react';
import './Parameters.css';
import {
  ActivityLevels,
  Genders,
  Goals,
  IUserParams,
} from '../../api/types.ts';
import Spinner from '../Loader';

interface IInputProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  inputName: string;
  invalidText?: string;
}

const Input: FC<IInputProps> = ({ inputName, invalidText, ...rest }) => {
  return (
    <div className="inputElement">
      <div className="wrapper">
        <p className="label">{inputName}</p>
        <input required {...rest} />
      </div>
      {invalidText && <span className="errorText">{invalidText}</span>}
    </div>
  );
};

interface IParameters extends PropsWithChildren {
  onConfirmClick: (params: IUserParams) => void;
  isLoading: boolean;
  isError: boolean;
}

export const Parameters: FC<IParameters> = ({
  onConfirmClick,
  isError,
  isLoading,
}) => {
  const [formData, setFormData] = useState<IUserParams>({});
  const [formValid, setFormValid] = useState(false);

  const onInputChange = (name: string, value: string | number | null) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const [formErrors, setFormErrors] = useState({
    name: '',
    age: '',
    heightCm: '',
    weightKg: '',
    gender: '',
    goal: '',
    activityLevel: '',
  });

  const validateField = (name: string, value: string | number) => {
    let errorMessage = '';

    switch (name) {
      case 'name':
        if (!value?.trim() || value?.trim()?.length > 50) {
          errorMessage = 'Значение имени должно быть от 1 до 50 символов';
        }

        break;
      case 'age':
        if (
          !value ||
          parseInt(value.toString(), 10) < 1 ||
          parseInt(value.toString(), 10) > 130
        ) {
          errorMessage =
            'Значение возраста должно быть в диапазоне от 1 до 130';
        }
        break;
      case 'heightCm':
        if (
          !value ||
          parseInt(value.toString(), 10) < 40 ||
          parseInt(value.toString(), 10) > 260
        ) {
          errorMessage = 'Значение роста должно быть в диапазоне от 40 до 260';
        }
        break;
      case 'weightKg':
        if (
          !value ||
          parseInt(value.toString(), 10) < 1 ||
          parseInt(value.toString(), 10) > 300
        ) {
          errorMessage = 'Значение веса должно быть в диапазоне от 1 до 300';
        }
        break;
      case 'gender':
      case 'goal':
      case 'activityLevel':
        if (!value) {
          errorMessage = 'Выбери вариант ответа';
        }
        break;
      default:
        break;
    }

    setFormErrors((prevFormErrors) => ({
      ...prevFormErrors,
      [name]: errorMessage,
    }));
  };

  const handleBlur = (name: string, value: string | number) => {
    validateField(name, value);
  };

  const validateForm = () => {
    for (const key in formErrors) {
      if (formErrors[key]?.length > 5 || !formData[key]) {
        setFormValid(false);
        return;
      }
    }

    setFormValid(true);
  };

  useEffect(() => {
    validateForm();
  }, [formData]);

  if (isError) {
    return (
      <>
        <div style={{ marginTop: '20vh', marginBottom: '16px' }}>
          Упс! Что-то пошло не так...
        </div>
        <button onClick={() => onConfirmClick(formData)}>
          Попробовать снова
        </button>
      </>
    );
  }

  if (isLoading) {
    return (
      <div style={{ marginTop: '20vh' }}>
        <Spinner />
      </div>
    );
  }

  return (
    <div>
      <Input
        inputName="Имя"
        type="text"
        placeholder="Иван Иванов"
        value={formData?.name || ''}
        id="personName"
        invalidText={formErrors?.name}
        onChange={(event) => onInputChange('name', event?.target?.value)}
        onBlur={(event) => handleBlur('name', event.target.value)}
      />
      <Input
        inputName="Возраст"
        type="number"
        inputMode="numeric"
        placeholder="25"
        value={formData?.age || ''}
        id="age"
        invalidText={formErrors?.age}
        onChange={(event) => onInputChange('age', event?.target?.value)}
        onBlur={(event) => handleBlur('age', event.target.value)}
      />
      <Input
        inputName="Рост, см"
        type="number"
        inputMode="numeric"
        placeholder="178"
        value={formData?.heightCm || ''}
        id="height"
        invalidText={formErrors?.heightCm}
        onChange={(event) => onInputChange('heightCm', event?.target?.value)}
        onBlur={(event) => handleBlur('heightCm', event.target.value)}
      />
      <Input
        inputName="Вес, кг"
        type="number"
        inputMode="numeric"
        placeholder="65"
        value={formData?.weightKg || ''}
        id="weightKg"
        invalidText={formErrors?.weightKg}
        onChange={(event) => onInputChange('weightKg', event?.target?.value)}
        onBlur={(event) => handleBlur('weightKg', event.target.value)}
      />
      <div className="inputElement">
        <div className="wrapper">
          <p className="label">Пол</p>
          <select
            required
            value={formData?.gender}
            id="gender"
            defaultValue=""
            onChange={(event) => onInputChange('gender', event?.target?.value)}
            onBlur={(event) => handleBlur('gender', event.target.value)}
          >
            <option disabled value="">
              –
            </option>
            <option value={Genders.MALE}>Мужчина</option>
            <option value={Genders.FEMALE}>Женщина</option>
          </select>
        </div>
        {formErrors?.gender && (
          <span className="errorText">{formErrors?.gender}</span>
        )}
      </div>

      <div className="inputElement">
        <div className="wrapper">
          <p className="label">Цель</p>
          <select
            required
            value={formData?.goal}
            id="goal"
            defaultValue=""
            onChange={(event) => onInputChange('goal', event?.target?.value)}
            onBlur={(event) => handleBlur('goal', event.target.value)}
          >
            <option disabled value="">
              –
            </option>
            <option value={Goals.WEIGHT_GAIN}>Набрать массу</option>
            <option value={Goals.WEIGHT_LOSS}>Сбросить вес</option>
            <option value={Goals.WEIGHT_MAINTENANCE}>Поддерживать вес</option>
          </select>
        </div>
        {formErrors?.goal && (
          <span className="errorText">{formErrors?.goal}</span>
        )}
      </div>

      <div className="inputElement">
        <div className="wrapper">
          <p className="label">Уровень активности</p>
          <select
            required
            value={formData?.activityLevel}
            id="activity"
            defaultValue=""
            onChange={(event) =>
              onInputChange('activityLevel', event?.target?.value)
            }
            onBlur={(event) => handleBlur('activityLevel', event.target.value)}
          >
            <option disabled value="">
              –
            </option>
            <option value={ActivityLevels.LOW}>Низкий</option>
            <option value={ActivityLevels.MODERATE}>Умеренный</option>
            <option value={ActivityLevels.HIGH}>Высокий</option>
          </select>
        </div>
        {formErrors?.activityLevel && (
          <span className="errorText">{formErrors?.activityLevel}</span>
        )}
      </div>

      <button onClick={() => onConfirmClick(formData)} disabled={!formValid}>
        Сгенерировать рацион
      </button>
    </div>
  );
};
