const highlights = [
  { value: '+30', label: 'Años practicando' },
  { value: '+20', label: 'Años enseñando' },
  { value: 'BJJ', label: 'Cinturón negro 3er grado' },
  { value: '3º Dan', label: 'Luta Livre' },
  { value: '3º Dan', label: 'Judo' },
]

export default function ProfessorSection() {
  return (
    <section
      id="profesor"
      data-testid="professor-section"
      className="bg-white py-24 lg:py-32"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Text */}
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-gray-400 mb-5">
              Sobre el profesor
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-black leading-[1.05] mb-8">
              Gilberto García
              <br />
              Cerqueira
              <br />
              <span className="text-gray-400">&mdash; Betinho</span>
            </h2>
            <p className="text-gray-500 leading-relaxed text-base font-light">
              Hola, soy el profesor Gilberto Garcia Cerqueira, conocido
              cariñosamente por mis alumnos como &ldquo;Betinho&rdquo;. Soy
              profesor de jiu-jitsu brasileño, luta livre brasileña y judo.
              Practico estas artes desde hace más de 30 años, y enseño desde
              hace más de 20 años.
            </p>
            <p className="text-gray-500 leading-relaxed text-base font-light mt-4">
              Actualmente soy cinturón negro de jiu-jitsu brasileño 3er grado,
              3º Dan en luta livre brasileña y 3º Dan en judo. Mi enfoque es
              simplificar posiciones complejas, enseñar fundamentos claros y
              transformar practicantes intermedios en atletas de alto nivel.
            </p>
          </div>

          {/* Highlight cards */}
          <div className="grid grid-cols-2 gap-px bg-gray-100">
            {highlights.map((item) => (
              <div
                key={`${item.value}-${item.label}`}
                className="bg-white p-6 lg:p-8"
              >
                <p className="text-3xl lg:text-4xl font-light text-black mb-2 tracking-tight">
                  {item.value}
                </p>
                <p className="text-xs uppercase tracking-widest text-gray-400 leading-relaxed">
                  {item.label}
                </p>
              </div>
            ))}
            {/* 5 cards — last one spans 2 columns on even grid */}
          </div>
        </div>
      </div>
    </section>
  )
}
