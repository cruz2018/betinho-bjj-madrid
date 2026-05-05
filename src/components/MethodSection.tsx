const pillars = [
  {
    number: '01',
    title: 'Defensa y contraataque',
    body: 'Construir una base defensiva sólida antes de desarrollar ataques. La seguridad posicional como fundamento de todo juego ofensivo.',
  },
  {
    number: '02',
    title: 'Posiciones complejas simplificadas',
    body: 'Descomponer técnicas avanzadas en principios comprensibles. Lo complejo se aprende mejor cuando se entiende por qué funciona.',
  },
  {
    number: '03',
    title: 'Enseñanza basada en conceptos',
    body: 'No solo movimientos: conceptos transferibles. Un buen concepto resuelve situaciones que nunca has visto antes.',
  },
  {
    number: '04',
    title: 'Progresión técnica real',
    body: 'Cada alumno sigue su propio camino de evolución. El progreso es medible, visible y constante.',
  },
]

export default function MethodSection() {
  return (
    <section className="bg-black py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="mb-16 lg:mb-24">
          <p className="text-xs uppercase tracking-[0.25em] text-gray-500 mb-5">
            Metodología
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-white leading-[1.1] max-w-3xl">
            Fundamentos claros.
            <br />
            Técnica real.
            <br />
            Evolución constante.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-gray-800">
          {pillars.map((pillar) => (
            <div key={pillar.number} className="bg-black p-8 lg:p-10">
              <p className="text-xs text-gray-600 font-light mb-6 tracking-widest">
                {pillar.number}
              </p>
              <h3 className="text-base font-medium text-white mb-4 leading-snug">
                {pillar.title}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed font-light">
                {pillar.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
