import { Formik, Form, ErrorMessage, useFormikContext, Field } from 'formik';
import {
  IconButton,
  TextField,
  MenuItem,
  CircularProgress,
} from '@mui/material';
import { useState } from 'react';
import { withErrorBoundary } from 'react-error-boundary';
import { ErrorHandler } from '~shared/ui/error';
import { userQueries } from '~entities/user';
import { Button } from '@/app/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { MailCheck } from 'lucide-react';
const initialUser = {
  email: '',
  firstName: '',
  lastName: '',
  password: '',
  rePassword: '',
};

function RegisterPageComponent() {
  const [visibility, setVisibility] = useState(false);
  const handleClickShowPassword = () => setVisibility((prev) => !prev);
  const navigate = useNavigate();
  const {
    mutate: registerUser,
    isPending,
    isSuccess,
  } = userQueries.useRegisterMutation();

  if (isSuccess)
    return (
      <div className="flex justify-center items-center  bg-gray-50">
        <div className="bg-white text-green-800 px-8 py-6 rounded-lg shadow-lg flex flex-col items-center">
        <MailCheck />
          <p className="text-lg font-semibold text-center mb-4">
            На вашу почту отправлено письмо для подтверждения.
          </p>
          <Button
            variant="default"
            onClick={() => navigate('/')}
            className="mt-4"
          >
            Вернуться на главную
          </Button>
        </div>
      </div>
    );
  return (
    <div className="w-[380px] mx-auto rounded-md px-5 py-7">
      <h1 className="font-bold text-2xl text-pc-500">Регистрация</h1>
      <Formik
        initialValues={initialUser}
        validate={validateForm}
        onSubmit={(user) => registerUser({ user })}
        validateOnMount={true}
      >
        {({ values, setFieldValue }) => (
          <Form className="flex flex-col ">
            <CustomField name="email" label="Email" type="email" />
            <CustomField name="firstName" label="Имя" />
            <CustomField name="lastName" label="Фамилия" />
            <CustomField
              name="password"
              label="Введите пароль"
              type={visibility ? 'text' : 'password'}
              endAdornment={
                <IconButton onClick={handleClickShowPassword}>
                  {visibility ? '🙈' : '👁️'}
                </IconButton>
              }
            />
            <CustomField
              name="rePassword"
              label="Подтвердите пароль"
              type={visibility ? 'text' : 'password'}
            />
            <ErrorMessage
              name="phoneModels"
              component="div"
              className="text-xs text-[red]"
            />
            {!isPending ? (
              <SubmitButton />
            ) : (
              <div className="flex justify-center gap-2 border mt-3 items-center p-2 border-[gray]/50 rounded">
                <CircularProgress className="h-[20px] text-[gray]" />
                <p className="text-[gray]">Отправка данных...</p>
              </div>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
}

function CustomField({ name, label, type = 'text', endAdornment }) {
  return (
    <div className="mb-4">
      <Field
        as={TextField}
        fullWidth
        id={name}
        name={name}
        label={label}
        type={type}
        size="small"
        InputProps={{ endAdornment }}
      />
      <ErrorMessage
        name={name}
        component="div"
        className="text-xs text-[red]"
      />
    </div>
  );
}

function SubmitButton() {
  const { isValidating, isValid } = useFormikContext();
  return (
    <Button
      className="mt-3"
      variant="default"
      type="submit"
      disabled={!isValid}
    >
      Зарегистрироваться
    </Button>
  );
}

const validateForm = (values) => {
  const errors = {};
  if (!values.email) errors.email = 'Обязательное поле';
  if (!values.firstName) errors.firstName = 'Обязательное поле';
  if (!values.lastName) errors.lastName = 'Обязательное поле';
  if (!values.password || values.password.length < 6)
    errors.password = 'Пароль должен содержать минимум 6 символов';
  if (values.password !== values.rePassword)
    errors.rePassword = 'Пароли не совпадают';
  return errors;
};

export const RegisterPage = withErrorBoundary(RegisterPageComponent, {
  fallbackRender: ({ error }) => <ErrorHandler error={error} />,
});
