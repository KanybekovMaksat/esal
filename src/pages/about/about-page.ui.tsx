import { Title } from '~shared/ui/title';

export function AboutPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-10">
        <Title>О нас</Title>
        <div className="mt-8">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-lg text-gray-700">
              Добро пожаловать в наш онлайн-магазин! Мы предлагаем лучшие
              чехлы, аксессуары и гаджеты для вашего устройства. Наша цель —
              соединить стиль и функциональность, чтобы каждый покупатель нашел
              именно то, что ему нужно.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <img
                src="https://i.pinimg.com/736x/10/f8/14/10f81413b3ea7e86c19b604bacfe1184.jpg"
                alt="Store"
                className="rounded-lg shadow-lg w-full"
              />
            </div>
            <div className="text-gray-800">
              <h2 className="text-2xl font-bold mb-4">
                Почему выбирают нас?
              </h2>
              <p className="mb-4">
                Мы стремимся предложить продукцию высокого качества по
                доступным ценам. В нашем магазине вы найдете широкий выбор
                аксессуаров, которые идеально подойдут для вашего устройства.
              </p>
              <ul className="list-disc ml-5 text-gray-600 space-y-2">
                <li>Только качественные материалы и проверенные бренды.</li>
                <li>Быстрая доставка по всему региону.</li>
                <li>Гарантия на все товары.</li>
                <li>Дружелюбная поддержка клиентов 24/7.</li>
              </ul>
            </div>
          </div>
          <div className="mt-16">
            <h2 className="text-center text-2xl font-bold mb-8">
              Наши преимущества
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white shadow-lg rounded-lg p-6 text-center">
                <h3 className="text-xl font-semibold text-blue-600 mb-2">
                  Широкий ассортимент
                </h3>
                <p className="text-gray-600">
                  Более 1000 товаров для вашего выбора.
                </p>
              </div>
              <div className="bg-white shadow-lg rounded-lg p-6 text-center">
                <h3 className="text-xl font-semibold text-blue-600 mb-2">
                  Надежное качество
                </h3>
                <p className="text-gray-600">
                  Мы предлагаем только проверенные и сертифицированные товары.
                </p>
              </div>
              <div className="bg-white shadow-lg rounded-lg p-6 text-center">
                <h3 className="text-xl font-semibold text-blue-600 mb-2">
                  Удобная доставка
                </h3>
                <p className="text-gray-600">
                  Быстрая доставка в любой уголок страны.
                </p>
              </div>
              <div className="bg-white shadow-lg rounded-lg p-6 text-center">
                <h3 className="text-xl font-semibold text-blue-600 mb-2">
                  Поддержка клиентов
                </h3>
                <p className="text-gray-600">
                  Мы всегда готовы помочь вам с выбором или ответить на ваши
                  вопросы.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
