import { createElement } from 'react';
import { RouteObject, redirect } from 'react-router-dom';
import { pathKeys } from '~shared/lib/react-router';
import { ArticlePage } from './article-page.ui';
import { articleQueries } from '~entities/article';
import { commentQueries } from '~entities/comment';
import { userQueries } from '~entities/user';

export const articlePageRoute: RouteObject = {
  path: 'places',
  children: [
    { index: true, loader: async () => redirect(pathKeys.page404()) },
    {
      path: ':id',
      element: createElement(ArticlePage),
      loader: async (args) => {
        Promise.all([
          articleQueries.articleService.prefetchQuery(parseInt(args.params.id)),
        ]);
        return args;
      },
    },
  ],
};
