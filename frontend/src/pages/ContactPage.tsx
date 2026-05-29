import { useState, type FormEvent } from 'react';

const SUPPORT_EMAIL = 'soporte@munequitas.com';

type ContactFormState = {
  name: string;
  email: string;
  doll: string;
  message: string;
};

type ContactFormErrors = Partial<Record<keyof ContactFormState, string>>;

const initialFormState: ContactFormState = {
  name: '',
  email: '',
  doll: '',
  message: '',
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function createMailtoUrl(values: ContactFormState) {
  const subject = 'Sugerencia de nueva muñequita para el catálogo';
  const body = [
    'Hola equipo de soporte de Muñequitas,',
    '',
    'Me gustaría sugerir una nueva muñequita para el catálogo.',
    '',
    'Nombre:',
    values.name,
    '',
    'Correo:',
    values.email,
    '',
    'Muñequita sugerida:',
    values.doll,
    '',
    'Mensaje:',
    values.message,
    '',
    'Gracias.',
  ].join('\n');

  return `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export default function ContactPage() {
  const [formValues, setFormValues] = useState<ContactFormState>(initialFormState);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [statusMessage, setStatusMessage] = useState('');

  const updateField = (field: keyof ContactFormState, value: string) => {
    setFormValues((currentValues) => ({
      ...currentValues,
      [field]: value,
    }));
    setErrors((currentErrors) => ({
      ...currentErrors,
      [field]: undefined,
    }));
    setStatusMessage('');
  };

  const validateForm = (values: ContactFormState) => {
    const nextErrors: ContactFormErrors = {};

    if (!values.name) {
      nextErrors.name = 'Ingresa tu nombre.';
    }

    if (!values.email) {
      nextErrors.email = 'Ingresa tu correo.';
    } else if (!emailPattern.test(values.email)) {
      nextErrors.email = 'Ingresa un correo válido.';
    }

    if (!values.doll) {
      nextErrors.doll = 'Ingresa la muñequita que quieres sugerir.';
    }

    return nextErrors;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedValues: ContactFormState = {
      name: formValues.name.trim(),
      email: formValues.email.trim(),
      doll: formValues.doll.trim(),
      message: formValues.message.trim(),
    };
    const nextErrors = validateForm(trimmedValues);

    setFormValues(trimmedValues);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setStatusMessage('Revisa los campos marcados antes de enviar.');
      return;
    }

    setStatusMessage('Tu sugerencia está lista para enviarse por correo.');

    window.setTimeout(() => {
      window.location.href = createMailtoUrl(trimmedValues);
    }, 100);
  };

  return (
    <section className="w-full overflow-x-hidden bg-white">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-32">
        <div className="grid gap-16 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-24 items-start">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-[0.28em] uppercase text-neutral-500 mb-6">
              Sugerencias
            </p>
            <h1 className="text-4xl sm:text-5xl xl:text-6xl font-serif font-semibold uppercase tracking-[0.08em] sm:tracking-[0.1em] xl:tracking-[0.12em] leading-tight mb-8">
              CONTÁCTANOS
            </h1>
            <p className="text-lg sm:text-xl text-neutral-600 leading-relaxed font-light max-w-xl">
              ¿Hay una muñequita que te gustaría ver en nuestro catálogo? Cuéntanos cuál y la
              tendremos en cuenta para próximas colecciones.
            </p>
            <div className="mt-12 border-t border-neutral-200 pt-8">
              <p className="text-sm uppercase tracking-[0.24em] text-neutral-900">
                Tu idea puede inspirar nuestra próxima colección.
              </p>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            noValidate
            className="w-full bg-stone-50 px-5 py-8 sm:px-10 sm:py-12 lg:px-12 border border-stone-100"
          >
            <div className="grid gap-8">
              <div>
                <label
                  htmlFor="contact-name"
                  className="block text-xs font-semibold uppercase tracking-[0.2em] text-neutral-700 mb-3"
                >
                  Nombre
                </label>
                <input
                  id="contact-name"
                  type="text"
                  value={formValues.name}
                  onChange={(event) => updateField('name', event.target.value)}
                  placeholder="Tu nombre"
                  aria-invalid={Boolean(errors.name)}
                  className="w-full bg-transparent border-0 border-b border-neutral-300 px-0 py-3 text-base text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-black transition-colors"
                />
                {errors.name && <p className="mt-2 text-xs text-red-700">{errors.name}</p>}
              </div>

              <div>
                <label
                  htmlFor="contact-email"
                  className="block text-xs font-semibold uppercase tracking-[0.2em] text-neutral-700 mb-3"
                >
                  Correo
                </label>
                <input
                  id="contact-email"
                  type="email"
                  value={formValues.email}
                  onChange={(event) => updateField('email', event.target.value)}
                  placeholder="Tu correo electrónico"
                  aria-invalid={Boolean(errors.email)}
                  className="w-full bg-transparent border-0 border-b border-neutral-300 px-0 py-3 text-base text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-black transition-colors"
                />
                {errors.email && <p className="mt-2 text-xs text-red-700">{errors.email}</p>}
              </div>

              <div>
                <label
                  htmlFor="contact-doll"
                  className="block text-xs font-semibold uppercase tracking-[0.2em] text-neutral-700 mb-3"
                >
                  Muñequita sugerida
                </label>
                <input
                  id="contact-doll"
                  type="text"
                  value={formValues.doll}
                  onChange={(event) => updateField('doll', event.target.value)}
                  placeholder="Ej: Hatsune Miku, Nezuko, Anya Forger…"
                  aria-invalid={Boolean(errors.doll)}
                  className="w-full bg-transparent border-0 border-b border-neutral-300 px-0 py-3 text-base text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-black transition-colors"
                />
                {errors.doll && <p className="mt-2 text-xs text-red-700">{errors.doll}</p>}
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-xs font-semibold uppercase tracking-[0.2em] text-neutral-700 mb-3"
                >
                  Mensaje opcional
                </label>
                <textarea
                  id="contact-message"
                  value={formValues.message}
                  onChange={(event) => updateField('message', event.target.value)}
                  placeholder="Cuéntanos por qué te gustaría verla en el catálogo"
                  rows={5}
                  className="w-full resize-none bg-transparent border border-neutral-300 px-4 py-3 text-base text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-black transition-colors"
                />
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto justify-self-start bg-black text-white px-8 py-4 text-xs font-semibold uppercase tracking-[0.22em] hover:bg-neutral-800 transition-colors"
              >
                Enviar sugerencia
              </button>

              {statusMessage && (
                <p
                  className={`text-sm leading-relaxed ${
                    Object.keys(errors).length > 0 ? 'text-red-700' : 'text-neutral-600'
                  }`}
                  role="status"
                >
                  {statusMessage}
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
