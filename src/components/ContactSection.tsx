import { useState, type FormEvent } from 'react'

import { WHATSAPP_URL } from '../config/site'

const interestOptions = [
  'Jiu-Jitsu Brasileño',
  'Luta Livre Brasileña',
  'Judo',
  'Clase para principiantes',
  'Nivel avanzado',
  'Otro',
]

interface FormState {
  nombre: string
  telefono: string
  email: string
  clase: string
  mensaje: string
}

const emptyForm: FormState = {
  nombre: '',
  telefono: '',
  email: '',
  clase: '',
  mensaje: '',
}

export default function ContactSection() {
  const [form, setForm] = useState<FormState>(emptyForm)
  const [submitted, setSubmitted] = useState(false)

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setSubmitted(true)
    setForm(emptyForm)
  }

  return (
    <section
      id="contacto"
      className="bg-gray-50 py-24 lg:py-32"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
        {/* Left column — info */}
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-gray-400 mb-5">
            Contacto
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-black leading-[1.05] mb-8">
            Reserva una clase
            <br />
            de prueba
          </h2>
          <p className="text-gray-500 leading-relaxed font-light mb-10 max-w-sm">
            La primera clase es para que la conozcas. Sin compromisos. Ven, entrena
            y decide con calma.
          </p>

          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="whatsapp-contact-cta"
            aria-label="Abrir WhatsApp para reservar una clase de prueba"
            className="inline-flex items-center gap-3 bg-black text-white text-xs uppercase tracking-widest px-8 py-4 hover:bg-gray-800 transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black mb-10"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            Hablar por WhatsApp
          </a>

          <div className="mt-4 pt-8 border-t border-gray-200">
            <p className="text-xs uppercase tracking-widest text-gray-400 mb-2">
              Ubicación
            </p>
            <p className="text-sm text-gray-600 font-light leading-relaxed">
              Madrid, España
            </p>
            <p className="text-xs text-gray-400 mt-1 font-light">
              Dirección disponible al reservar clase
            </p>
          </div>
        </div>

        {/* Right column — form */}
        <div className="bg-white p-8 lg:p-10">
          {submitted ? (
            <div className="py-12 text-center">
              <p className="text-xs uppercase tracking-widest text-gray-400 mb-4">
                Mensaje enviado
              </p>
              <p className="text-2xl font-light text-black">
                Gracias por escribir.
              </p>
              <p className="text-gray-500 text-sm mt-3 leading-relaxed font-light">
                Te responderemos en la mayor brevedad posible.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-8 text-xs uppercase tracking-widest text-black border-b border-black pb-0.5 hover:text-gray-600 hover:border-gray-600 transition-colors duration-150"
              >
                Enviar otro mensaje
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              data-testid="contact-form"
              noValidate
              className="flex flex-col gap-5"
            >
              <div>
                <label
                  htmlFor="nombre"
                  className="block text-xs uppercase tracking-widest text-gray-500 mb-2"
                >
                  Nombre *
                </label>
                <input
                  id="nombre"
                  name="nombre"
                  type="text"
                  required
                  value={form.nombre}
                  onChange={handleChange}
                  placeholder="Tu nombre"
                  className="w-full border border-gray-200 px-4 py-3 text-sm text-black placeholder-gray-300 bg-white focus:outline-none focus:border-black transition-colors duration-150"
                />
              </div>

              <div>
                <label
                  htmlFor="telefono"
                  className="block text-xs uppercase tracking-widest text-gray-500 mb-2"
                >
                  Teléfono
                </label>
                <input
                  id="telefono"
                  name="telefono"
                  type="tel"
                  value={form.telefono}
                  onChange={handleChange}
                  placeholder="+34 600 000 000"
                  className="w-full border border-gray-200 px-4 py-3 text-sm text-black placeholder-gray-300 bg-white focus:outline-none focus:border-black transition-colors duration-150"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-xs uppercase tracking-widest text-gray-500 mb-2"
                >
                  Email *
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="tu@email.com"
                  className="w-full border border-gray-200 px-4 py-3 text-sm text-black placeholder-gray-300 bg-white focus:outline-none focus:border-black transition-colors duration-150"
                />
              </div>

              <div>
                <label
                  htmlFor="clase"
                  className="block text-xs uppercase tracking-widest text-gray-500 mb-2"
                >
                  Clase de interés
                </label>
                <select
                  id="clase"
                  name="clase"
                  value={form.clase}
                  onChange={handleChange}
                  className="w-full border border-gray-200 px-4 py-3 text-sm text-black bg-white focus:outline-none focus:border-black transition-colors duration-150 appearance-none cursor-pointer"
                >
                  <option value="" disabled>
                    Selecciona una opción
                  </option>
                  {interestOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="mensaje"
                  className="block text-xs uppercase tracking-widest text-gray-500 mb-2"
                >
                  Mensaje
                </label>
                <textarea
                  id="mensaje"
                  name="mensaje"
                  rows={4}
                  value={form.mensaje}
                  onChange={handleChange}
                  placeholder="Cuéntanos algo sobre ti o pregunta lo que necesites."
                  className="w-full border border-gray-200 px-4 py-3 text-sm text-black placeholder-gray-300 bg-white focus:outline-none focus:border-black transition-colors duration-150 resize-none"
                />
              </div>

              <button
                type="submit"
                className="bg-black text-white text-xs uppercase tracking-widest px-8 py-4 hover:bg-gray-800 transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black mt-2"
              >
                Enviar mensaje
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
