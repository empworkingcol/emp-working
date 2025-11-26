import { useNavigate } from "react-router-dom";

import eventImage from '@images/event.jpg';
import peopleImage from '@images/people.jpg';
import logisticImage from '@images/logistic.jpg';

import Button from "../../../components/atoms/Button";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-slate-950 text-slate-100">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={eventImage}
            alt="Evento masivo con luces y público"
            className="h-full w-full object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
        </div>

        <div className="relative mx-4 sm:mx-6 md:mx-10 lg:mx-16 xl:mx-24 py-20 md:py-24 lg:py-28 flex flex-col lg:flex-row items-center gap-10">
          <div className="max-w-xl">
            <p className="text-xs font-semibold tracking-[0.25em] uppercase text-emerald-300">
              Formación en eventos & producción audiovisual
            </p>
            <h1 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
              Fundación el mundo de la producción Colombia
            </h1>
            <p className="mt-4 text-sm md:text-base text-slate-200">
              Aprende cómo se realizan grandes eventos, conciertos y producciones
              audiovisuales de la mano de profesionales con más de{" "}
              <strong>20 años de experiencia</strong>. Cursos presenciales en Bogotá
              y formación virtual para toda Colombia.
            </p>

            <div className="mt-6 flex flex-wrap gap-4">
              <Button onClick={() => navigate("/courses")}>
                Ver cursos disponibles
              </Button>
              <Button onClick={() => navigate("/login")}>
                Inscribirme gratis
              </Button>
            </div>

            <p className="mt-4 text-xs md:text-sm text-slate-300">
              Inscripción gratuita • Cupos limitados • Modalidad presencial y virtual
            </p>
          </div>
          <div className="w-full max-w-sm bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-5 md:p-6">
            <p className="text-sm font-semibold mb-3">
              ¿Qué puedes aprender con nosotros?
            </p>
            <ul className="space-y-2 text-sm text-slate-200">
              <li>• Producción de eventos masivos</li>
              <li>• Fotografía e iluminación escénica</li>
              <li>• Sonido en vivo y mezcla</li>
              <li>• Video, realización y streaming</li>
              <li>• Logística y seguridad en eventos</li>
            </ul>

            <div className="mt-5 border-t border-white/10 pt-4 text-xs text-slate-300">
              Más de <strong>9.000 personas</strong> ya hacen parte de nuestra
              comunidad en YouTube.{" "}
              <button
                type="button"
                onClick={() =>
                  window.open("https://www.youtube.com/@empworking", "_blank")
                }
                className="underline decoration-emerald-400 underline-offset-2"
              >
                Ver canal
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-4 sm:mx-6 md:mx-10 lg:mx-16 xl:mx-24 py-12 md:py-16">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">
              Formamos a la próxima generación de productores de eventos
            </h2>
            <p className="text-sm md:text-base text-justify text-slate-200 mb-4">
              La <strong>Fundación el mundo de la producción</strong> nace en 2023
              con el objetivo de brindar <strong>capacitación</strong> a miles de
              productores de <strong>eventos masivos de entretenimiento</strong> y
              motivar a nuevos talentos para que encuentren en el mundo de la
              producción su pasión.
            </p>
            <p className="text-sm md:text-base text-justify text-slate-200 mb-4">
              Ofrecemos cursos de fotografía, iluminación, vídeo, sonido, logística
              y mucho más, desde niveles básicos hasta avanzados, con el apoyo de
              profesionales y expertos en el campo que comparten los secretos de la
              industria.
            </p>
            <p className="text-sm md:text-base text-justify text-slate-200">
              Nuestros programas son de <strong>inscripción gratuita</strong> y
              están diseñados tanto para personas que quieren iniciar su carrera
              como para quienes desean profesionalizar su experiencia.
            </p>
          </div>

          <div className="relative">
            <img
              src={peopleImage}
              alt="Equipo de producción trabajando en backstage"
              className="w-full rounded-2xl object-cover shadow-xl"
            />
            <div className="absolute -bottom-4 -right-4 bg-emerald-500 text-slate-950 rounded-xl px-4 py-3 text-xs md:text-sm font-semibold shadow-lg">
              +20 años produciendo eventos masivos
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-900/60 border-y border-slate-800 py-12 md:py-16">
        <div className="mx-4 sm:mx-6 md:mx-10 lg:mx-16 xl:mx-24">
          <h2 className="text-2xl md:text-3xl font-semibold mb-2">
            Áreas de formación
          </h2>
          <p className="text-sm md:text-base text-slate-300 mb-8 max-w-2xl">
            Construye un perfil completo en el mundo de los eventos masivos. Combina
            cursos técnicos, creativos y de gestión para destacar en la industria.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Fotografía y video",
                desc: "Narrativa visual, manejo de cámara, encuadre, edición básica.",
              },
              {
                title: "Iluminación escénica",
                desc: "Diseño de luces para conciertos, teatrales y shows en vivo.",
              },
              {
                title: "Sonido en vivo",
                desc: "Operación de consolas, mezcla en vivo, microfonía y monitoreo.",
              },
              {
                title: "Producción técnica",
                desc: "Montaje de tarimas, rigging, estructuras y coordinación técnica.",
              },
              {
                title: "Logística de eventos",
                desc: "Planeación, accesos, seguridad, público y backstage.",
              },
              {
                title: "Streaming & contenido",
                desc: "Transmisiones en vivo, contenido para redes y YouTube.",
              },
           ].map((item) => (
              <article
                key={item.title}
                className="bg-black/40 border border-slate-800 rounded-2xl p-5 hover:border-emerald-400/70 transition-colors"
              >
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-slate-300">{item.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-4 sm:mx-6 md:mx-10 lg:mx-16 xl:mx-24 py-12 md:py-16">
        <div className="grid lg:grid-cols-[2fr,3fr] gap-10 items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">
              ¿Cómo funciona la fundación?
            </h2>
            <p className="text-sm md:text-base text-slate-200 mb-4">
              Queremos que el acceso al conocimiento sea sencillo y cercano. Por eso
              diseñamos un modelo flexible y gratuito para que puedas formarte a tu
              ritmo.
            </p>

            <div className="space-y-4 text-sm md:text-base text-slate-200">
              <div>
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500 text-slate-950 text-xs font-bold mr-2">
                  1
                </span>
                Explora nuestros cursos y elige el área que más te interesa.
              </div>
              <div>
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500 text-slate-950 text-xs font-bold mr-2">
                  2
                </span>
                Regístrate en nuestra plataforma y completa tu inscripción gratuita.
              </div>
              <div>
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500 text-slate-950 text-xs font-bold mr-2">
                  3
                </span>
                Asiste a las sesiones presenciales en Bogotá o conéctate a nuestras
                clases virtuales.
              </div>
              <div>
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500 text-slate-950 text-xs font-bold mr-2">
                  4
                </span>
                Participa en proyectos reales y conecta con empresas del sector.
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-4">
              <Button onClick={() => navigate("/login")}>Inscribirse ahora</Button>
              <Button onClick={() => navigate("/news")}>Ver noticias</Button>
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-4 text-center">
            <div className="bg-black/40 border border-slate-800 rounded-2xl p-4">
              <p className="text-2xl md:text-3xl font-bold text-emerald-400">
                +20
              </p>
              <p className="text-xs md:text-sm text-slate-300">
                años de experiencia en eventos
              </p>
            </div>
            <div className="bg-black/40 border border-slate-800 rounded-2xl p-4">
              <p className="text-2xl md:text-3xl font-bold text-emerald-400">
                +100
              </p>
              <p className="text-xs md:text-sm text-slate-300">
                contenidos en YouTube
              </p>
            </div>
            <div className="bg-black/40 border border-slate-800 rounded-2xl p-4">
              <p className="text-2xl md:text-3xl font-bold text-emerald-400">
                100%
              </p>
              <p className="text-xs md:text-sm text-slate-300">
                inscripción gratuita a cursos
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-900/70 border-t border-slate-800 py-12 md:py-16">
        <div className="mx-4 sm:mx-6 md:mx-10 lg:mx-16 xl:mx-24">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold mb-4">
                Conectamos talento con empresas del sector
              </h2>
              <p className="text-sm md:text-base text-slate-200 mb-4">
                Somos un equipo con más de 20 años de experiencia en la organización
                de eventos masivos de entretenimiento. Queremos ser un puente entre
                el mejor talento y las empresas que buscan profesionales confiables.
              </p>
              <p className="text-sm md:text-base text-slate-200 mb-4">
                Inscríbete como <strong>empresa</strong> para publicar ofertas o
                como <strong>colaborador</strong> para mostrar tu experiencia y
                empezar a construir tu portafolio profesional.
              </p>
              <Button onClick={() => navigate("/jobs")}>Ver ofertas</Button>
            </div>

            <div className="relative">
              <img
                src={logisticImage}
                alt="Público en un concierto levantando las manos"
                className="w-full rounded-2xl object-cover shadow-xl"
              />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 text-xs md:text-sm text-slate-100">
                <p className="font-semibold">Transforma tu pasión en profesión</p>
                <p className="text-slate-200">
                  Producción, escenarios, luces y sonido en un solo lugar.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-4 sm:mx-6 md:mx-10 lg:mx-16 xl:mx-24 py-10 md:py-14">
        <div className="bg-gradient-to-r from-emerald-500 to-emerald-400 text-slate-950 rounded-2xl px-6 py-8 md:px-10 md:py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-xl md:text-2xl font-semibold mb-2">
              ¿Listo para dar tu primer paso en la producción de eventos?
            </h2>
            <p className="text-sm md:text-base">
              Crea tu cuenta, elige tu curso y empieza a aprender con nosotros hoy
              mismo.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Button onClick={() => navigate("/login")}>Crear cuenta</Button>
            <Button onClick={() => navigate("/courses")}>Explorar cursos</Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
