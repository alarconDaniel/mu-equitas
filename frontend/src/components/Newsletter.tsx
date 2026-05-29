import React, { useState } from 'react';
import { subscribeToNewsletter } from '../services/newsletterService';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus(null);

    try {
      const response = await subscribeToNewsletter(email);
      setStatus(response.message);
      setEmail('');
    } catch {
      setStatus('No pudimos registrar tu correo. Intenta nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-24 bg-stone-50 border-t border-neutral-200 mt-10">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <h2 className="text-2xl font-semibold tracking-widest uppercase mb-4">Únete a nuestro universo</h2>
        <p className="text-neutral-500 mb-8 max-w-lg mx-auto text-sm">
          Suscríbete y recibe novedades de nuestras colecciones, piezas exclusivas y un 10% de descuento en tu primera compra.
        </p>

        <form className="flex flex-col sm:flex-row gap-0 max-w-xl mx-auto" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Tu correo electrónico"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="flex-1 bg-transparent border-b border-black py-4 px-2 focus:outline-none placeholder-neutral-400 text-sm"
            required
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-black text-white px-8 py-4 text-xs tracking-widest uppercase font-medium hover:bg-neutral-800 transition-colors sm:ml-4 mt-4 sm:mt-0 disabled:bg-neutral-500"
          >
            {isSubmitting ? 'Enviando...' : 'Suscribirme'}
          </button>
        </form>
        {status && <p className="text-neutral-500 text-xs mt-5 text-center">{status}</p>}
        <p className="text-[#a0a0a0] text-[10px] mt-6 text-center">
          Al suscribirte aceptas nuestros Términos y Condiciones y Política de Privacidad.
        </p>
      </div>
    </section>
  );
}
