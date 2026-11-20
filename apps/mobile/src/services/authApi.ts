import { demoRegistrationConsents } from '../config/demoConsents';

type ParticipantRole = 'founder' | 'investor' | 'professional';

type RegistrationInput = {
  email: string;
  password: string;
  role: ParticipantRole;
};

export type RegisteredAccount = {
  accountId: string;
  emailVerified: false;
  roles: ParticipantRole[];
  status: string;
  verificationTier: 0;
};

export type ParticipantAccount = {
  accountId: string;
  email: string;
  emailVerified: boolean;
  roles: ParticipantRole[];
  status: string;
  verificationTier: number;
};

export type AuthSession = {
  accessToken: string;
  refreshToken: string;
  tokenType: 'Bearer';
  expiresIn: number;
  account: ParticipantAccount;
};

type ErrorEnvelope = {
  error?: {
    code?: string;
    message?: string;
    fields?: { field?: string; message?: string }[];
  };
};

export class RegistrationApiError extends Error {
  constructor(message: string, readonly fieldErrors: Record<string, string> = {}) {
    super(message);
    this.name = 'RegistrationApiError';
  }
}

function apiBaseUrl(): string {
  const configuredUrl = process.env.EXPO_PUBLIC_API_BASE_URL?.trim();
  if (!configuredUrl) {
    throw new RegistrationApiError(
      'API address is not configured. Set EXPO_PUBLIC_API_BASE_URL in apps/mobile/.env.local.',
    );
  }
  return configuredUrl.replace(/\/$/, '');
}

async function readEnvelope<T>(response: Response): Promise<T> {
  const envelope = (await response.json().catch(() => ({}))) as
    | { data?: T }
    | ErrorEnvelope;
  if (!response.ok) {
    const apiError = (envelope as ErrorEnvelope).error;
    const fieldErrors = Object.fromEntries(
      (apiError?.fields ?? [])
        .filter((item) => item.field && item.message)
        .map((item) => [item.field as string, item.message as string]),
    );
    throw new RegistrationApiError(
      apiError?.message ?? 'The request could not be completed.',
      fieldErrors,
    );
  }
  const data = (envelope as { data?: T }).data;
  if (!data) throw new RegistrationApiError('The service returned an invalid response.');
  return data;
}

async function authPost<T>(path: string, body: object, accessToken?: string): Promise<T> {
  let response: Response;
  try {
    response = await fetch(`${apiBaseUrl()}${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      },
      body: JSON.stringify(body),
    });
  } catch (error) {
    if (error instanceof RegistrationApiError) throw error;
    throw new RegistrationApiError('Cannot reach the authentication service. Check the API and network.');
  }
  if (response.status === 204) return undefined as T;
  return readEnvelope<T>(response);
}

export function loginParticipant(email: string, password: string): Promise<AuthSession> {
  return authPost('/api/v1/auth/login', { email: email.trim().toLowerCase(), password });
}

export function refreshParticipant(refreshToken: string): Promise<AuthSession> {
  return authPost('/api/v1/auth/refresh', { refreshToken });
}

export function logoutParticipant(accessToken: string): Promise<void> {
  return authPost('/api/v1/auth/logout', {}, accessToken);
}

export async function getParticipant(accessToken: string): Promise<ParticipantAccount> {
  let response: Response;
  try {
    response = await fetch(`${apiBaseUrl()}/api/v1/me`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  } catch {
    throw new RegistrationApiError('Cannot reach the authentication service. Check the API and network.');
  }
  return readEnvelope<ParticipantAccount>(response);
}

export async function registerParticipant(input: RegistrationInput): Promise<RegisteredAccount> {
  let response: Response;
  try {
    response = await fetch(`${apiBaseUrl()}/api/v1/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: input.email.trim().toLowerCase(),
        password: input.password,
        roles: [input.role],
        consents: demoRegistrationConsents,
      }),
    });
  } catch (error) {
    if (error instanceof RegistrationApiError) throw error;
    throw new RegistrationApiError(
      'Cannot reach the registration service. Confirm that the API is running and the phone is on the same network.',
    );
  }

  const envelope = (await response.json().catch(() => ({}))) as
    | { data?: RegisteredAccount }
    | ErrorEnvelope;

  if (!response.ok) {
    const apiError = (envelope as ErrorEnvelope).error;
    const fieldErrors = Object.fromEntries(
      (apiError?.fields ?? [])
        .filter((item) => item.field && item.message)
        .map((item) => [item.field as string, item.message as string]),
    );
    throw new RegistrationApiError(
      apiError?.message ?? 'Registration could not be completed. Please try again.',
      fieldErrors,
    );
  }

  const account = (envelope as { data?: RegisteredAccount }).data;
  if (!account?.accountId) {
    throw new RegistrationApiError('The registration service returned an invalid response.');
  }
  return account;
}
