import { Button } from '@/app/components/ui/button';
import { Box, Typography,Container, } from '@mui/material';
import {  LandPlot } from 'lucide-react';
import { Link } from 'react-router-dom';


export function Footer() {
  return (
    <div className=' border-t'>
    <Container maxWidth="lg" className="text-gray-400 py-4   ">

    
    <div className="container mx-auto flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
        <Button asChild className='shadow-none'>
        <Link to="/" className="flex items-center space-x-3">
          <LandPlot/>
          <Typography variant="h6" className="text-white font-semibold">
            Esal
          </Typography>
        </Link>
        </Button>
        <div className="flex flex-wrap justify-center md:justify-end space-x-6">
          <Link to="/about" className="hover:text-[#16a34a] transition text-sm">
            О нас
          </Link>
          <Link to="/category" className="hover:text-[#16a34a] transition text-sm">
            Категории
          </Link>
          <Link to="/terms-of-use" className="hover:text-[#16a34a] transition text-sm">
            Условия использования 
          </Link>
          <Link to="/privacy-policy" className="hover:text-[#16a34a] transition text-sm">
            Политика конфиденциальности
          </Link>
        </div>

      </div>
      <div className="mt-3  text-center">
        <Typography variant="body2" className="text-[gray] text-xs">
          &copy; {new Date().getFullYear()} Esal. Разработала @Eldana
        </Typography>
      </div>

    </Container>
    </div>
  );
}
