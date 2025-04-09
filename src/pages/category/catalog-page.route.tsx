import { RouteObject } from 'react-router-dom';
import { createElement } from 'react';
import { CategoryPage } from './catalog-page.ui';
import { pathKeys } from '../../shared/lib/react-router';

export const categoryPageRoute: RouteObject = {
  path: pathKeys.category(),
  element: createElement(CategoryPage),
};
