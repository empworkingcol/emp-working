import { useNavigate } from "react-router-dom";

import Button from '../../../components/atoms/Button'

const Home = () => {
  
  const navigate = useNavigate();

  return (
    <>
      <h1 className='m-4 sm:m-6 md:m-8 lg:m-10 xl:mx-16'> Fundación el mundo de la producción Colombia </h1>
      <section className='m-4 sm:m-6 md:m-8 lg:m-10 xl:mx-16 text-normal text-justify'>
        <p className='my-5'> <strong> La fundacion el mundo de la producción</strong>, es una idea de <strong> Freeway Producciones SAS</strong>.
        Esta fundación nace en el 2023 con el objetivo de brindar <strong> capacitación </strong> a los miles de productores de <strong>eventos masivos de 
        entrenimiento</strong>, asi como incentivar a los nuevos talentos para que encuentren en el mundo de la producción su pasión.
        </p>

        <p className='my-5'>
          ¿Te interesa el mundo del arte visual y la producción audiovisual? Tenemos a tu disposición cursos de fotografía, iluminación, 
          vídeo, sonido, logística y muchos más. Todos ellos desde niveles básicos hasta avanzados, además que contarás con el apoyo y la 
          capacitación de profesionales y expertos en el campo que te brindarán los secretos de la industria para que puedas destacarte. 
          ¿Sabes qué es lo mejor? Son <strong>cursos de inscripción gratuita</strong>.
        </p>
        <Button 
          onClick={() => navigate("/courses")
          }
          > Ver cursos 
        </Button>
        <p className='my-5'>
          Ya sea que estés buscando iniciar tu carrera, mejorar tus habilidades o explorar nuevas pasiones, nuestros cursos ofrecen una
          experiencia enriquecedora y única. Ofrecemos nuestros cursos en forma presencial en la ciudad de Bogotá, Colombia y 
          virtuales a través de nuestra página web.
          <br/>
          <br />
          ¡No pierdas la oportunidad de convertir tu pasión en tu profesión y dar un paso adelante 
          en tu camino hacia el éxito creativo!
        </p>
        <Button
          onClick={() => navigate("/login")
        }> Inscribirse </Button>
        <p className='my-5'>
          Sigue nuestras transmisiones en vivo, las reuniones presenciales y todo lo que opinan las personas que 
          han trabajado con nosotros en nuestra sección de noticias. ¡Mantente al día con todo lo que tenemos para ofrecerte!
        </p>
        <Button
          onClick={() => navigate("/news")
        }
        > Noticias </Button>
        <p className='my-5'>
          Somos un equipo con más de 20 años de experiencia en la organización de eventos masivos de entretenimiento,
          y en esta ocasión queremos ser un puente entre el mejor talento para desarrollar los eventos y las empresas que 
          se encuentran buscándolos, Inscríbete como empresa y crea nuevas 
          ofertas de empleo ó inscríbete como colaborador y habla de todo el conocimiento que tienes para que las empresas
          se fijen en tu talento.
        </p>
        <Button
          onClick={() => navigate("/jobs")
        }> Ver ofertas </Button>
      </section>
    </>
    
  );
};

export default Home;
