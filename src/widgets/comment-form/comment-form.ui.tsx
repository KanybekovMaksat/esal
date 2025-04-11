import {  Rating } from '@mui/material';
import {
  commentContracts,
  commentQueries,
  commentTypes,
} from '~entities/comment';
import {
  ErrorMessage,
  Formik,
  Form,
  useFormikContext,
  useField,
} from 'formik';
import { formikContract } from '~shared/lib/zod';
import { getCookie } from 'typescript-cookie';
import { Link } from 'react-router-dom';
import { Button } from '@/app/components/ui/button';

type CommentFormProps = {
  id: number;
};

type MyTextFieldProps = {
  name: string;
  type?: string;
};

// Поле для текстового комментария
const MyTextField: React.FC<MyTextFieldProps> = ({ name, ...props }) => {
  const [field, meta] = useField({ ...props, name });
  return (
    <>
      <textarea
        {...field}
        {...props}
        placeholder="Оставьте отзыв..."
        className="w-full h-[50px] overflow-auto mb-3 appearance-none border-none outline-none resize-none"
      />
      {meta.touched && meta.error ? (
        <div className="text-xs text-[red]">{meta.error}</div>
      ) : null}
    </>
  );
};

// Поле для рейтинга
const MyRatingField: React.FC<{ name: string }> = ({ name }) => {
  const [field, , helpers] = useField(name);

  return (
    <div className="flex items-center gap-2 mb-3">
      <span className="text-sm">Оценка:</span>
      <Rating
        value={field.value}
        onChange={(_, newValue) => helpers.setValue(newValue)}
      />
    </div>
  );
};

// Кнопка отправки
function SubmitButton({ isPending }: { isPending: boolean }) {
  const { isValidating, isValid } = useFormikContext<any>();
  return (
    <Button
      type="submit"
      className="mb-2 self-end"
      disabled={!isValid || isValidating || isPending}
    >
      {isPending ? 'Отправка...' : 'Отправить'}
    </Button>
  );
}

// Главный компонент формы
export function CommentForm({ id }: CommentFormProps) {
  const {
    mutate: createComment,
    isPending,
    isError,
  } = commentQueries.useCreateCommentMutation(id);

  const initialData: commentTypes.CreateComment = {
    text: '',
    place: id,
    rating: null,
  };

  const isAuth = getCookie('access');

  return (
    <>
      {!isAuth ? (
        <div className="max-w-[380px] h-[100%] border-l-4 border-pc-500 px-2 my-5">
          <Link className="underline text-second-100" to="/login">
            Зарегистрируйтесь на Esal
          </Link>
          , чтобы оставить отзыв
        </div>
      ) : (
        <div className="border max-w-[380px] md:max-w-[450px] min-h-[100px] border-pc-300 rounded p-2 flex flex-col mb-5">
          <Formik
            initialValues={initialData}
            validate={validateForm}
            onSubmit={(comment, { resetForm }) => {
              resetForm();
              createComment({ comment });
            }}
          >
            {() => (
              <Form className="flex flex-col">
                <fieldset disabled={isPending}>
                  <MyTextField name="text" type="text" />
                  <ErrorMessage
                    name="text"
                    component="div"
                    className="text-xs text-[red]"
                  />
                  <MyRatingField name="rating" />
                  <ErrorMessage
                    name="rating"
                    component="div"
                    className="text-xs text-[red]"
                  />
                </fieldset>
                <SubmitButton isPending={isPending} />
              </Form>
            )}
          </Formik>
          {isError && (
            <p className="text-center text-xs text-[red]">
              Ошибка при выполнении запроса
            </p>
          )}
        </div>
      )}
    </>
  );
}

// Валидация
const validateForm = formikContract(commentContracts.CreateCommentSchema);
