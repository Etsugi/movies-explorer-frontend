import howToLearn from '../images/portfolio/how-to-learn.jpg';
import russianTravel from '../images/portfolio/russian-travel.jpg';
import mesto from '../images/portfolio/mesto.jpg';
import bookSearch from '../images/portfolio/book-search.jpg';

const portfolio = [
  {
    title: 'How to Learn',
    description: 'Статичный, не адаптивный сайт. Использованы простые css анимации, айфреймы и flexbox.',
    gitLink: 'https://github.com/Etsugi/how-to-learn',
    link: 'https://etsugi.github.io/how-to-learn',
    img: howToLearn,
    id: 1
  },
  {
    title: 'Russian travel',
    description: 'Адаптивный сайт. Использованы flexbox, grid, media для адаптивности.',
    gitLink: 'https://github.com/Etsugi/russian-travel',
    link: 'https://etsugi.github.io/russian-travel',
    img: russianTravel,
    id: 2
  },
  {
    title: 'Mesto-react',
    description: 'Одностраничное адаптивное приложение. Использованы flexbox, grid, media, реализована возможность регистрации и авторизации, изменения данных профиля, добавления и "лайка" изображений. Работа с самописным апи.',
    gitLink: 'https://github.com/Etsugi/react-mesto-api-full',
    link: 'https://kiprin.students.nomoredomains.icu',
    img: mesto,
    id: 3
  },
  {
    title: 'Book search',
    description: 'Одностраничное адаптивное приложение. Использованы flexbox, grid, media, реализована возможность поиска книг по названию или автору. Работа с легаси апи.',
    gitLink: 'https://github.com/Etsugi/book-search',
    link: 'https://etsugi.github.io/book-search',
    img: bookSearch,
    id: 4
  },
]

export {
  portfolio
};