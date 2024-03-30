
const LoggedOutLayout = () => {

  return (
    <header className='bg-primary'>
      <nav className='mx-auto flex' aria-label='Global'>
        <figure className='w-20 p-3'>
          <img src='https://thumbs.dreamstime.com/b/maple-leaf-isolated-transparent-background-bright-red-autumn-realistic-leaf-vector-illustration-eps-maple-leaf-isolated-126072815.jpg' alt='Logo' />
        </figure>
        <ul className='hidden lg:flex lg:gap-x-12 p-10'>
          <li><a href='/home' className='text-tiny font-poppins text-white'>Inicio</a> </li>
          <li><a href='/news' className='text-tiny font-poppins text-white'>Noticias</a></li>
          <li><a href='/jobs' className='text-tiny font-poppins text-white'>Ofertas de empleo</a> </li>
          <li><a href='/courses' className='text-tiny font-poppins text-white'>Cursos</a> </li>
          <li><a href='/help' className='text-tiny font-poppins text-white'>Foro de ayuda</a> </li>
        </ul>
        <div className='hidden lg:flex lg:flex-1 lg:justify-end p-10'>
          <a href='#' className='text-tiny font-poppins text-white'>Iniciar sesion</a>
        </div>
      </nav>
    </header>
  );
};

export default LoggedOutLayout;
