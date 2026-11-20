import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { AuthShell } from '../components/AuthShell';
import { Button } from '../components/Button';
import { FormField } from '../components/FormField';
import { Notice } from '../components/Notice';
import { colors } from '../theme';
import { type FieldErrors, validateLogin } from '../utils/validation';
import { useAuth } from '../auth/AuthContext';
import { RegistrationApiError } from '../services/authApi';

type Status = 'idle' | 'loading';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>('idle');
  const [info, setInfo] = useState<string>();
  const { signIn } = useAuth();

  async function submit() {
    const nextErrors = validateLogin(email, password);
    setErrors(nextErrors);
    setInfo(undefined);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus('loading');
    try {
      await signIn(email, password);
      setPassword('');
    } catch (error) {
      const authError = error instanceof RegistrationApiError
        ? error
        : new RegistrationApiError('Login could not be completed.');
      setErrors((current) => ({ ...current, ...authError.fieldErrors }));
      setInfo(authError.message);
      setStatus('idle');
    }
  }

  return (
    <AuthShell
      compact
      eyebrow="Participant access"
      title="Welcome back."
      subtitle="Sign in with your participant email and password. No role selection is required at login."
    >
      <View style={styles.form}>
        <Notice
          tone="demo"
          title="University demo login"
          message="Credentials are sent only to the configured local API. Session credentials are stored with Expo SecureStore."
        />

        <FormField
          autoComplete="email"
          error={errors.email}
          keyboardType="email-address"
          label="Email address"
          onChangeText={(value) => {
            setEmail(value);
            if (errors.email) setErrors((current) => ({ ...current, email: '' }));
          }}
          placeholder="you@example.com"
          returnKeyType="next"
          value={email}
        />
        <FormField
          autoComplete="current-password"
          error={errors.password}
          label="Password"
          onChangeText={(value) => {
            setPassword(value);
            if (errors.password) setErrors((current) => ({ ...current, password: '' }));
          }}
          onSubmitEditing={submit}
          password
          placeholder="Enter your password"
          returnKeyType="done"
          value={password}
        />

        <Pressable
          accessibilityRole="button"
          hitSlop={8}
          onPress={() => setInfo('Password reset delivery is pending DEC-052. No reset request was sent.')}
          style={styles.forgot}
        >
          <Text style={styles.link}>Forgot password?</Text>
        </Pressable>

        {info ? <Notice tone="error" title="Login failed" message={info} /> : null}

        <Button label="Sign in" loading={status === 'loading'} onPress={submit} />
      </View>

      <View style={styles.switchRow}>
        <Text style={styles.switchText}>New to Vault Ventures?</Text>
        <Pressable accessibilityRole="link" onPress={() => router.replace('/register')}>
          <Text style={styles.link}>Create an account</Text>
        </Pressable>
      </View>
      <Button label="Back to welcome" onPress={() => router.replace('/')} variant="ghost" />
    </AuthShell>
  );
}

const styles = StyleSheet.create({
  form: { gap: 17 },
  forgot: { alignSelf: 'flex-end', marginTop: -4 },
  link: { color: colors.evergreen, fontSize: 14, fontWeight: '800' },
  switchRow: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 6, marginTop: 26 },
  switchText: { color: colors.inkMuted, fontSize: 14 },
});
