
const LoggedInLayout = () => {

  return (
    <header className='bg-primary'>
      <nav className='mx-auto flex p-10' aria-label='Global'>
        <figure>
          <img src='https://w7.pngwing.com/pngs/293/485/png-transparent-tailwind-css-hd-logo.png' alt='Logo' />
        </figure>
        <ul className='hidden lg:flex lg:gap-x-12'>
          <li><a href='/home' className='text-tiny font-poppins text-white'>Inicio</a> </li>
          <li><a href='/news' className='text-tiny font-poppins text-white'>Noticias</a></li>
          <li><a href='/jobs' className='text-tiny font-poppins text-white'>Ofertas de empleo</a> </li>
          <li><a href='/courses' className='text-tiny font-poppins text-white'>Cursos</a> </li>
          <li><a href='/help' className='text-tiny font-poppins text-white'>Foro de ayuda</a> </li>
        </ul>
        <div className='hidden lg:flex lg:flex-1 lg:justify-end'>
          <a href='#' className='text-tiny font-poppins text-white'>Mi perfil</a>
        </div>
      </nav>
    </header>
  );
};

export default LoggedInLayout;
