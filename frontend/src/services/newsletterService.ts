import { apiFetch } from './api';

export async function subscribeToNewsletter(email: string) {
  return apiFetch<{ subscribed: boolean; message: string }>('/newsletter', {
    method: 'POST',
    body: JSON.stringify({ email }),
  });
}
