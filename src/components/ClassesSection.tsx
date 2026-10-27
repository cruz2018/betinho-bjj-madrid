const classes = [
  {
    title: 'Jiu-Jitsu Brasileño',
    description:
      'El arte suave en su forma más pura. Trabajo de suelo, sumisiones y control posicional para todos los niveles.',
  },
  {
    title: 'Luta Livre Brasileña',
    description:
      'Lucha sin kimono con énfasis en derribo, control y finalizaciones. Complemento ideal al jiu-jitsu.',
  },
  {
    title: 'Judo',
    description:
      'Proyecciones y trabajo de pie con base en los principios clásicos del judo. Técnica, equilibrio y timing.',
  },
  {
    title: 'Principiantes',
    description:
      'Clase de introducción pensada para quienes empiezan desde cero. Entorno seguro, ritmo progresivo, conceptos claros.',
  },
  {
    title: 'Nivel avanzado',
    description:
      'Para atletas con base sólida que buscan afinar técnica, desarrollar juego propio y competir.',
  },
]

const locations = [
  {
    name: 'Gym Clásico',
    address: 'Calle Arquitectura 11, Arganzuela, Madrid',
    schedule: [
      {
        days: 'Lunes, miércoles y viernes',
        time: '21:00 - 22:30',
      },
    ],
  },
  {
    name: 'Gimnasio CrossTraining 645 Retiro',
    address: 'Calle de Fernán González 41, Retiro, Madrid',
    schedule: [
      {
        days: 'Martes y jueves',
        time: '20:45 - 22:15',
      },
      {
        days: 'Viernes',
        time: '15:45 - 17:00',
      },
      {
        days: '2 sábados al mes · Open Mat',
        time: '17:30 - 19:30',
      },
    ],
  },
]

export default function ClassesSection() {
  return (
    <section
      id="clases"
      data-testid="classes-section"
      className="bg-gray-50 py-24 lg:py-32"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="mb-14 lg:mb-20 max-w-3xl">
          <p className="text-xs uppercase tracking-[0.25em] text-gray-400 mb-4">
            Disciplinas
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-black leading-tight max-w-2xl">
            Clases
          </h2>
          <p className="mt-5 text-base md:text-lg text-gray-500 leading-relaxed font-light">
            Entrenamientos de jiu-jitsu brasileño, luta livre y grappling en
            Madrid, con grupos para principiantes y alumnos avanzados.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-200">
          {classes.map((cls) => (
            <div
              key={cls.title}
              className="bg-white p-8 lg:p-10 group"
            >
              <div className="w-8 h-px bg-black mb-6 transition-all duration-300 group-hover:w-16" />
              <h3 className="text-lg font-medium text-black mb-3 tracking-tight">
                {cls.title}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed font-light">
                {cls.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 lg:mt-24">
          <div className="mb-10 max-w-3xl">
            <p className="text-xs uppercase tracking-[0.25em] text-gray-400 mb-4">
              Horarios y sedes
            </p>
            <h3 className="text-3xl md:text-4xl font-light tracking-tight text-black leading-tight">
              Entrena en Arganzuela y Retiro
            </h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-gray-200">
            {locations.map((location) => (
              <section key={location.name} className="bg-white p-8 lg:p-10">
                <div className="flex flex-col gap-2 border-b border-gray-100 pb-7">
                  <h4 className="text-xl md:text-2xl font-light tracking-tight text-black">
                    {location.name}
                  </h4>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {location.address}
                  </p>
                </div>

                <div className="divide-y divide-gray-100">
                  {location.schedule.map((item) => (
                    <div
                      key={`${location.name}-${item.days}`}
                      className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-2 sm:gap-6 py-5"
                    >
                      <p className="text-sm font-medium text-black">
                        {item.days}
                      </p>
                      <p className="text-sm text-gray-500 sm:text-right">
                        {item.time}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>

        <div className="mt-10 lg:mt-14">
          <a
            href="#contacto"
            className="inline-flex items-center gap-3 text-xs uppercase tracking-widest text-black border-b border-black pb-0.5 hover:gap-5 transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
          >
            Reservar clase de prueba
          </a>
        </div>
      </div>
    </section>
  )
}
