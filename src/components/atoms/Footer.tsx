import { FaYoutubeSquare } from 'react-icons/fa';
import { IoLogoFacebook } from 'react-icons/io';

const Footer = () => (
  <footer className='bg-primary flex-col flex md:flex-row justify-around p-6'>
    <div>
      <p className='text-white'> Mantente en contacto con nosotros a través de nuestras redes sociales </p>
      <div className='my-2 flex gap-4'>
        <a href='https://www.youtube.com/@freewayemp' target='_blank' rel='noopener noreferrer'>
          <FaYoutubeSquare className='text-white text-2xl' />
        </a>
        <a href='https://www.facebook.com/profile.php?id=100064752544323' target='_blank' rel='noopener noreferrer'>
          <IoLogoFacebook className='text-white text-2xl' />
        </a>
      </div>
      
    </div>
    <div>
    <ul>
      <li><a href='/news' className='text-tiny font-poppins text-white'>Noticias</a></li>
      <li><a href='/jobs' className='text-tiny font-poppins text-white'>Ofertas de empleo</a> </li>
      <li><a href='/courses' className='text-tiny font-poppins text-white'>Cursos</a> </li>
      <li><a href='/help' className='text-tiny font-poppins text-white'>Foro de ayuda</a> </li>
    </ul>
    </div>
  </footer>
)

export default Footer;
