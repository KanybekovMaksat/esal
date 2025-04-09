import { Typography, Paper, TextField, CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import { getCookie, removeCookie } from 'typescript-cookie';
import { useNavigate } from 'react-router-dom';
import { pathKeys } from '~shared/lib/react-router';
import { ModalPopup } from '~widgets/modal-popup';
import $api from '../../shared/api/index';
import { Button } from '@/app/components/ui/button';
import {
  ErrorMessage,
  Field,
  Form,
  Formik,
  FormikValues,
  useFormikContext,
} from 'formik';
import { toast } from 'react-toastify';
import { LogOut, Pencil } from 'lucide-react';

export async function editUserProfile(params) {
  return $api.patch('users/me/', params);
}

export function ProfilePage() {
  const isAuth = getCookie('access');
  const [active, setActive] = useState(false);
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isAuth)
    return (
      <div className="flex flex-col items-center justify-center border py-10 w-[350px] mx-auto rounded">
        <Typography variant="h6" className="text-center text-gray-700 mb-4">
          Вы не авторизованы
        </Typography>
        <Button
          variant="default"
          onClick={() => navigate(pathKeys.login())}
          className="shadow-none"
        >
          Перейти к авторизации
        </Button>
      </div>
    );
  
  useEffect(() => {
    async function fetchUserData() {
      try {
        const response = await $api.get('users/me');
        setUserData(response.data);
      } catch (err) {
        setError('Ошибка загрузки данных');
      } finally {
        setLoading(false);
      }
    }
    fetchUserData();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress color="primary" />
      </div>
    );

  if (error)
    return <div className="text-red-500 text-center mt-10">{error}</div>;

  const handleLogout = () => {
    removeCookie('access');
    localStorage.removeItem('refreshesal');
    navigate(`${pathKeys.home()}`);
  };

  const { email, firstName, lastName } = userData;

  const initialUser = {
    email: email,
    firstName: firstName,
    lastName: lastName,
  };

  const handleEditProfile = async (values) => {
    setIsPending(true);
    setIsSuccess(false);
    try {
      await editUserProfile(values);
      const response = await $api.get('users/me');
      setUserData(response.data);
      setActive(false);
      setIsSuccess(true);

      toast.success('Профиль успешно обновлён!', {
        position: 'top-right',
        autoClose: 3000,
      });

      setTimeout(() => {
        setIsSuccess(false);
      }, 3000);
    } catch (err) {
      toast.error('Ошибка при обновлении профиля!', {
        position: 'top-right',
        autoClose: 3000,
      });
      console.error('Ошибка обновления профиля', err);
    } finally {
      setIsPending(false);
    }
  };

  
  return (
    <div className="my-10 max-w-[300px] mx-auto py-10">
      <Paper
        elevation={3}
        sx={{ padding: 2 }}
        className="shadow-none border border-alto mx-auto py-10"
      >
        <div>
          <div className="flex flex-col items-center">
            <Typography variant="h6" className="text-center">
              {userData.firstName} {userData.lastName}
            </Typography>
          </div>
          <div className="mt-5 flex flex-col items-center">
            <div className="flex flex-col gap-4">
              <div className="flex gap-[10px]"></div>
              <Button
                variant="destructive"
                className=" shadow-none"
                onClick={handleLogout}
              >
                <LogOut />
                Выйти
              </Button>

              <Button
                variant="default"
                className=" shadow-none"
                onClick={() => setActive(true)}
              >
                <Pencil />
                Редактировать
              </Button>
            </div>
          </div>
        </div>
      </Paper>

      <ModalPopup active={active} setActive={setActive}>
        <Formik
          initialValues={initialUser}
          validate={validateForm}
          onSubmit={(values) => {
            handleEditProfile({
              email: values.email,
              firstName: values.firstName,
              lastName: values.lastName,
            });
          }}
        >
          {({ setFieldValue }) => (
            <Form>
              <fieldset>
                <fieldset className="my-5">
                  <Field
                    as={TextField}
                    fullWidth
                    id="email"
                    name="email"
                    label="Email"
                    size="small"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-xs text-[red]"
                  />
                </fieldset>
                <fieldset className="my-5">
                  <Field
                    as={TextField}
                    fullWidth
                    id="firstName"
                    name="firstName"
                    label="Имя"
                    size="small"
                  />
                  <ErrorMessage
                    name="firstName"
                    component="div"
                    className="text-xs text-[red]"
                  />
                </fieldset>
                <fieldset className="my-5">
                  <Field
                    as={TextField}
                    fullWidth
                    id="lastName"
                    name="lastName"
                    size="small"
                    label="Фамилия"
                  />
                  <ErrorMessage
                    name="lastName"
                    component="div"
                    className="text-xs text-[red]"
                  />
                </fieldset>
              </fieldset>
              <SubmitButton isPending={isPending} />
            </Form>
          )}
        </Formik>
      </ModalPopup>
    </div>
  );
}

function SubmitButton({ isPending }) {
  const { isValidating, isValid } = useFormikContext();
  return (
    <Button
      variant="default"
      type="submit"
      className="w-full mb-2  text-white shadow-none"
      disabled={!isValid || isValidating || isPending}
    >
      {isPending ? <CircularProgress size={20} /> : 'Редактировать'}
    </Button>
  );
}

const validateForm = (values) => {
  const errors: Partial<FormikValues> = {};
  if (!values.email) {
    errors.email = 'Обязательное поле';
  } else if (!/^\S+@\S+\.\S+$/.test(values.email)) {
    errors.email = 'Неправильный формат email';
  }
  if (!values.firstName) {
    errors.firstName = 'Обязательное поле';
  }
  if (!values.lastName) {
    errors.lastName = 'Обязательное поле';
  }

  return errors;
};
