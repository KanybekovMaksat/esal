import { RouteObject } from 'react-router-dom';
import { createElement } from 'react';
import { LoyaltyPage} from './loyalty-page.ui';
import { pathKeys } from '../../shared/lib/react-router';

export const loyaltyPageRoute: RouteObject = {
  path: pathKeys.loyalty(),
  element: createElement(LoyaltyPage),
};
