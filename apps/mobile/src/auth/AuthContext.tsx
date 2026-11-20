import * as SecureStore from 'expo-secure-store';
import { router, useSegments } from 'expo-router';
import { createContext, type PropsWithChildren, useContext, useEffect, useState } from 'react';

import {
  type AuthSession,
  type ParticipantAccount,
  getParticipant,
  loginParticipant,
  logoutParticipant,
  refreshParticipant,
} from '../services/authApi';

const SESSION_KEY = 'vault_ventures.participant_session.v1';

type AuthContextValue = {
  account?: ParticipantAccount;
  restoring: boolean;
  signIn(email: string, password: string): Promise<void>;
  signOut(): Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

async function saveSession(session: AuthSession) {
  await SecureStore.setItemAsync(SESSION_KEY, JSON.stringify(session));
}

async function clearSession() {
  await SecureStore.deleteItemAsync(SESSION_KEY);
}

export function AuthProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<AuthSession>();
  const [restoring, setRestoring] = useState(true);
  const segments = useSegments();

  useEffect(() => {
    void (async () => {
      try {
        const stored = await SecureStore.getItemAsync(SESSION_KEY);
        if (!stored) return;
        const candidate = JSON.parse(stored) as AuthSession;
        try {
          const account = await getParticipant(candidate.accessToken);
          setSession({ ...candidate, account });
        } catch {
          const renewed = await refreshParticipant(candidate.refreshToken);
          await saveSession(renewed);
          setSession(renewed);
        }
      } catch {
        await clearSession();
      } finally {
        setRestoring(false);
      }
    })();
  }, []);

  useEffect(() => {
    if (restoring) return;
    const onHome = segments[0] === 'home';
    if (session && !onHome) router.replace('/home');
    if (!session && onHome) router.replace('/login');
  }, [restoring, segments, session]);

  async function signIn(email: string, password: string) {
    const next = await loginParticipant(email, password);
    await saveSession(next);
    setSession(next);
  }

  async function signOut() {
    const current = session;
    try {
      if (current) {
        try {
          await logoutParticipant(current.accessToken);
        } catch {
          // An expired access token cannot identify the current server session.
          // Rotate once, then revoke the newly current member of the same family.
          const renewed = await refreshParticipant(current.refreshToken);
          await logoutParticipant(renewed.accessToken);
        }
      }
    } finally {
      await clearSession();
      setSession(undefined);
    }
  }

  return (
    <AuthContext.Provider value={{ account: session?.account, restoring, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used inside AuthProvider');
  return context;
}
