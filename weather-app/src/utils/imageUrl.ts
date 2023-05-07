import image_01d from '../assets/images/weather_icons/01d.png';
import image_01n from '../assets/images/weather_icons/01n.png';
import image_02d from '../assets/images/weather_icons/02d.png';
import image_02n from '../assets/images/weather_icons/02n.png';
import image_03d from '../assets/images/weather_icons/03d.png';
import image_03n from '../assets/images/weather_icons/03n.png';
import image_04d from '../assets/images/weather_icons/04d.png';
import image_04n from '../assets/images/weather_icons/04n.png';
import image_09d from '../assets/images/weather_icons/09d.png';
import image_09n from '../assets/images/weather_icons/09n.png';
import image_10d from '../assets/images/weather_icons/10d.png';
import image_10n from '../assets/images/weather_icons/10n.png';
import image_11d from '../assets/images/weather_icons/11d.png';
import image_11n from '../assets/images/weather_icons/11n.png';
import image_13d from '../assets/images/weather_icons/13d.png';
import image_13n from '../assets/images/weather_icons/13n.png';
import image_50d from '../assets/images/weather_icons/50d.png';
import image_50n from '../assets/images/weather_icons/50n.png';

export const getImage = (icon: string) => {
  switch (icon) {
    case '01d':
      return image_01d;
    case '01n':
      return image_01n;
    case '02d':
      return image_02d;
    case '02n':
      return image_02n;
    case '03d':
      return image_03d;
    case '03n':
      return image_03n;
    case '04d':
      return image_04d;
    case '04n':
      return image_04n;
    case '09d':
      return image_09d;
    case '09n':
      return image_09n;
    case '10d':
      return image_10d;
    case '10n':
      return image_10n;
    case '11d':
      return image_11d;
    case '11n':
      return image_11n;
    case '13d':
      return image_13d;
    case '13n':
      return image_13n;
    case '50d':
      return image_50d;
    case '50n':
      return image_50n;
    default:
      return image_01d;
  }
}
