import {
  Link,
  RouterProvider,
  createBrowserRouter,
  useRouteError,
} from 'react-router-dom';
import { homePageRoute } from '../../pages/home';
import { profilePageRoute } from '../../pages/profile';

import { GenericLayout } from '../../pages/layout';
import { aboutPageRoute } from '~pages/about';
import { getCookie } from 'typescript-cookie';
import { loyaltyPageRoute } from '~pages/loyalty';
import { loginPageRoute } from '~pages/login';
import { registerPageRoute } from '~pages/register';
import { verifyPageRoute } from '~pages/verify';
import { favoritePageRoute } from '~pages/favorite';
import { termsPageRoute } from '~pages/terms';
import { policyPageRoute } from '~pages/policy';
import { cartPageRoute } from './../../pages/cart/cart-page.route';
import { categoryPageRoute } from '~pages/category/catalog-page.route';
import { articlePageRoute } from '@/pages/article';
import { Button } from '../components/ui/button';


function BubbleError() {
  const error = useRouteError();

  if (error instanceof Error) {
    console.error('Route Error:', error.message);
  } else {
    console.error('Unknown Route Error:', error);
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-10 rounded-xl shadow-xl max-w-lg w-full text-center">
        <div className="flex flex-col items-center">
          <div className="bg-red-100 text-red-500 rounded-full p-4 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M12 18h.01M12 2a10 10 0 100 20 10 10 0 000-20z"
              />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Страница не найдена</h1>
          <p className="text-gray-600 mb-4">
            К сожалению, мы не можем найти страницу, которую вы ищете.
          </p>
          <p className="text-sm text-gray-500 mb-6">
            Возможно, ссылка устарела или была удалена.
          </p>
          <Button asChild>
            <Link
              to="/"
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
              Вернуться на главную
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default BubbleError;

const isAuth = !!getCookie('access');

const router = createBrowserRouter([
  {
    path: '/',
    element: <GenericLayout />,
    errorElement: <BubbleError />,
    children: [
      homePageRoute,
      profilePageRoute,
      categoryPageRoute,
      aboutPageRoute,
      articlePageRoute,
      aboutPageRoute,
      loyaltyPageRoute,
      policyPageRoute,
      loginPageRoute,
      verifyPageRoute,
      termsPageRoute,
      registerPageRoute,
      favoritePageRoute,
      cartPageRoute,
    ],
  },
]);

export function BrowserRouter() {
  return <RouterProvider router={router} />;
}
