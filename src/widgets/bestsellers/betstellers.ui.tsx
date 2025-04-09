

export const Bestsellers = () => {
  const bestsellers = [
    {
      id: 1,
      image:
        'https://i.pinimg.com/736x/10/f8/14/10f81413b3ea7e86c19b604bacfe1184.jpg',
      title: 'Чехол для iPhone',
    },
    {
      id: 2,
      image:
        'https://i.pinimg.com/736x/8f/c2/33/8fc233a0a643da38ac421038f3b49359.jpg',
      title: 'Чехол для Samsung',
    },
    {
      id: 3,
      image:
        'https://i.pinimg.com/736x/e6/f8/96/e6f896b726a7fe83a306673b2c5c4a18.jpg',
      title: 'Универсальные аксессуары',
    },
    {
      id: 4,
      image:
        'https://i.pinimg.com/736x/13/a0/27/13a0277c206f54eec4e1c33893c9d649.jpg',
      title: 'Портативный аккумулятор',
    },
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Хиты продаж
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {bestsellers.map((product) => (
          <div
            key={product.id}
            className="relative bg-white rounded-lg shadow-md hover:shadow-lg overflow-hidden"
          >
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-48 object-cover"
            />
            <div className="absolute h-[90px] bottom-0 w-full bg-black bg-opacity-50 text-white text-center p-4">
              <h3 className="text-lg font-semibold">{product.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
