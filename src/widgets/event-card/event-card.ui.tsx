'use client';

import {
  Card,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from '@/app/components/ui/drawer';
import { CalendarDays, MapPin } from 'lucide-react';
import { format } from 'date-fns';
import { useState } from 'react';

interface EventCardProps {
  id: number;
  title: string;
  photo: string;
  description: string;
  location: string;
  startDate: string;
  endDate: string;
}

export const EventCard = ({
  title,
  photo,
  description,
  location,
  startDate,
  endDate,
}: EventCardProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const openDrawer = () => setIsOpen(true);
  const closeDrawer = () => setIsOpen(false);
  return (
    <>
      <Card className="flex flex-col self-center mx-auto  md:h-[200px] md:flex-row w-full  
      max-w-4xl rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition relative">
        <img
          src={photo}
          alt={title}
          className="w-full md:w-60 h-48 md:h-auto object-cover"
        />
        <div className="p-4 flex flex-col justify-between flex-1">
          <div>
            <CardTitle className="text-xl mb-1">{title}</CardTitle>
            <Button onClick={openDrawer} variant="outline" className="mt-3">
              Подробнее
            </Button>
          </div>
        </div>
        {isOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/60"
            onClick={closeDrawer}
          />
        )}

        <div
          className={`fixed left-0 right-0 bottom-0 z-50 transform transition-transform duration-300 ${
            isOpen ? 'translate-y-0' : 'translate-y-[150%]'
          } bg-white  p-6 max-h-[90vh] overflow-y-auto shadow-none`}
        >
          <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-gray-300" />
          <h2 className="text-xl font-semibold mb-2">Подробности</h2>
          <p className="text-gray-700 mb-4">{description}</p>
          <CardContent className="p-0 space-y-2 mt-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span>{location}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <CalendarDays className="w-4 h-4" />
              <span>
                {format(new Date(startDate), 'dd MMM yyyy, HH:mm')} –{' '}
                {format(new Date(endDate), 'HH:mm')}
              </span>
            </div>
          </CardContent>
          <button
            onClick={closeDrawer}
            className="mt-2 px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200"
          >
            Закрыть
          </button>
        </div>
      </Card>
    </>
  );
};
