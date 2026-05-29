import { apiFetch } from './api';

export interface ContactMessagePayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export function sendContactMessage(payload: ContactMessagePayload) {
  return apiFetch<{ id: string; received: boolean; message: string }>('/contact', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}
