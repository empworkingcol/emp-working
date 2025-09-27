import { useState, Fragment } from 'react';
import { Outlet } from 'react-router-dom';
import { MenuButton, Menu, MenuItem, MenuItems, Transition } from '@headlessui/react';

import { useAuth } from 'src/app/core/useAuth';

const MenuLayout = () => {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header className='sticky top-0 z-10 bg-primary'>
        <nav className='mx-auto flex items-center justify-between p-4' aria-label='Global'>
          <figure className='w-[80px] h-[80px]'>
            <img className='w-full h-full object-cover' src='https://empworkstore.s3.us-east-2.amazonaws.com/logo.jpeg' alt='Logo' />
          </figure>
          <ul className='hidden ml-8 lg:flex lg:gap-x-12'>
            <li><a href='/home' className='text-tiny font-poppins text-white'>Inicio</a></li>
            <li><a href='/news' className='text-tiny font-poppins text-white'>Noticias</a></li>
            <li><a href='/jobs' className='text-tiny font-poppins text-white'>Ofertas de empleo</a></li>
            <li><a href='/courses' className='text-tiny font-poppins text-white'>Cursos</a></li>
            <li><a href='/help' className='text-tiny font-poppins text-white'>Foro de ayuda</a></li>
          </ul>
          <div className='hidden lg:flex lg:flex-1 lg:justify-end'>
            {user ? (
              <Menu as='div' className='relative'>
                <MenuButton className='text-tiny font-poppins text-white'>Mi cuenta</MenuButton>
                <Transition
                  as={Fragment}
                  enter='transition ease-out duration-100'
                  enterFrom='transform opacity-0 scale-95'
                  enterTo='transform opacity-100 scale-100'
                  leave='transition ease-in duration-75'
                  leaveFrom='transform opacity-100 scale-100'
                  leaveTo='transform opacity-0 scale-95'
                >
                  <MenuItems className='absolute right-0 mt-2 w-48 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                    <div className='py-1'>
                      <MenuItem>
                        <a href='/profile' className={`block px-4 py-2 text-sm data-[focus]:bg-gray-100`}>Mi perfil</a>
                      </MenuItem>
                      <MenuItem>
                        <a href='/mycourses' className={`block px-4 py-2 text-sm data-[focus]:bg-gray-100`}>Mis cursos</a>
                      </MenuItem>
                      {user.rol.rol_name === 'SPR' && (
                        <MenuItem>
                          <a href='/dashboard' className={`block px-4 py-2 text-sm data-[focus]:bg-gray-100`}>Dashboard</a>
                        </MenuItem>
                      )}
                      <MenuItem>
                        <button
                          onClick={() => logout()}
                          className={`block w-full text-left px-4 py-2 text-sm data-[focus]:bg-gray-100`}
                        >
                          Cerrar sesión
                        </button>
                      </MenuItem>
                    </div>
                  </MenuItems>
                </Transition>
              </Menu>
            ) : (
              <a href='/login' className='text-tiny font-poppins text-white'>Iniciar sesión</a>
            )}
          </div>
          <div className='lg:hidden'>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className='text-white focus:outline-none'
            >
              <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M4 6h16M4 12h16M4 18h16'></path>
              </svg>
            </button>
          </div>
        </nav>
        {isMenuOpen && (
          <div className='lg:hidden'>
            <ul className='flex flex-col gap-2 p-4'>
              <li><a href='/home' className='text-tiny font-poppins text-white'>Inicio</a></li>
              <li><a href='/news' className='text-tiny font-poppins text-white'>Noticias</a></li>
              <li><a href='/jobs' className='text-tiny font-poppins text-white'>Ofertas de empleo</a></li>
              <li><a href='/courses' className='text-tiny font-poppins text-white'>Cursos</a></li>
              <li><a href='/help' className='text-tiny font-poppins text-white'>Foro de ayuda</a></li>
              {user ? (
                <>
                  <li><a href='/profile' className='text-tiny font-poppins text-white'>Mi perfil</a></li>
                  <li><a href='/mycourses' className='text-tiny font-poppins text-white'>Mis cursos</a></li>
                  {user.rol.rol_name === 'SPR' && (
                    <li><a href='/dashboard' className='text-tiny font-poppins text-white'>Dashboard</a></li>
                  )}
                  <li>
                    <button onClick={logout} className='text-tiny font-poppins text-white'>Cerrar sesión</button>
                  </li>
                </>
              ) : (
                <li><a href='/login' className='text-tiny font-poppins text-white'>Iniciar sesión</a></li>
              )}
            </ul>
          </div>
        )}
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default MenuLayout;
