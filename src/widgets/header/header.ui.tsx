import {
  AppBar,
  Toolbar,
  Container,
  IconButton,
  Tooltip,
} from '@mui/material';
import { Link} from 'react-router-dom';
import { pathKeys } from '~shared/lib/react-router';
import {
  FolderHeart,
  LandPlot,
  RectangleEllipsis,
  SquareUserRound,
} from 'lucide-react';

export function Header() {

  return (
    <AppBar
      position="fixed"
      className="shadow-none border-b-2 border-sc-100"
      color="inherit"
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters className="flex justify-between">
          <Link
            to={pathKeys.home()}
            className="hidden md:flex font-bold text-xl hover:text-second-100 duration-300"
          >
            <LandPlot className="mr-1" />
            Esal
          </Link>

          <div className="flex md:hidden">
            <LandPlot />
            <Link to={pathKeys.home()} className="font-bold text-xl">
              Esal
            </Link>
          </div>
          <div className="flex gap-4 items-center">
            <div className="flex items-center ml-3">
              <Link to="/favorites">
                <Tooltip title="Сохранённые">
                  <IconButton aria-label="navigate to favorites article page">
                    <FolderHeart className="hover:text-second-100" />
                  </IconButton>
                </Tooltip>
              </Link>
              <Link to="/category">
                <Tooltip title="Категории">
                  <IconButton aria-label="navigate to favorites article page">
                    <RectangleEllipsis />
                  </IconButton>
                </Tooltip>
              </Link>
              <Link to="/profile">
                <Tooltip title="Открыть профиль">
                  <IconButton>
                    <SquareUserRound />
                  </IconButton>
                </Tooltip>
              </Link>
            </div>
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
