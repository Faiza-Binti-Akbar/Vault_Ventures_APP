import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { AuthShell } from '../components/AuthShell';
import { Button } from '../components/Button';
import { FormField } from '../components/FormField';
import { Notice } from '../components/Notice';
import { demoConsentVersionLabel } from '../config/demoConsents';
import {
  registerParticipant,
  RegistrationApiError,
  type RegisteredAccount,
} from '../services/authApi';
import { colors, radius } from '../theme';
import { type FieldErrors, validateRegistration } from '../utils/validation';

type Role = 'Founder' | 'Investor' | 'Skilled Professional';
type Status = 'idle' | 'loading' | 'success';

const apiRoleByLabel: Record<Role, 'founder' | 'investor' | 'professional'> = {
  Founder: 'founder',
  Investor: 'investor',
  'Skilled Professional': 'professional',
};

const roles: readonly { role: Role; short: string; description: string }[] = [
  { role: 'Founder', short: 'F', description: 'Build your venture profile and connect with aligned people.' },
  { role: 'Investor', short: 'I', description: 'Discover ventures that match your interests and perspective.' },
  { role: 'Skilled Professional', short: 'P', description: 'Bring your experience to promising teams and opportunities.' },
];

export default function RegisterScreen() {
  const [step, setStep] = useState<1 | 2>(1);
  const [role, setRole] = useState<Role>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>('idle');
  const [requestError, setRequestError] = useState('');
  const [registeredAccount, setRegisteredAccount] = useState<RegisteredAccount>();

  async function submit() {
    const nextErrors = validateRegistration(email, password, confirmPassword, acceptedTerms);
    setErrors(nextErrors);
    setRequestError('');
    if (Object.keys(nextErrors).length > 0 || !role) return;

    setStatus('loading');
    try {
      const account = await registerParticipant({
        email,
        password,
        role: apiRoleByLabel[role],
      });
      setRegisteredAccount(account);
      setPassword('');
      setConfirmPassword('');
      setStatus('success');
    } catch (error) {
      const registrationError = error instanceof RegistrationApiError
        ? error
        : new RegistrationApiError('Registration could not be completed.');
      setErrors((current) => ({ ...current, ...registrationError.fieldErrors }));
      setRequestError(registrationError.message);
      setStatus('idle');
    }
  }

  return (
    <AuthShell
      compact
      eyebrow={`Create participant account · Step ${step} of 2`}
      title={step === 1 ? 'Choose your starting role.' : 'Set up your account.'}
      subtitle={
        step === 1
          ? 'Select the participant role that best describes how you want to begin.'
          : `${role ?? 'Participant'} selected. Role-specific profile details will be completed later.`
      }
    >
      <View style={styles.progressTrack}>
        <View style={[styles.progressFill, step === 2 && styles.progressComplete]} />
      </View>

      {step === 1 ? (
        <View style={styles.roleList}>
          {roles.map((item) => {
            const selected = role === item.role;
            return (
              <Pressable
                accessibilityRole="radio"
                accessibilityState={{ checked: selected }}
                key={item.role}
                onPress={() => setRole(item.role)}
                style={({ pressed }) => [
                  styles.roleCard,
                  selected && styles.roleCardSelected,
                  pressed && styles.pressed,
                ]}
              >
                <View style={[styles.roleBadge, selected && styles.roleBadgeSelected]}>
                  <Text style={[styles.roleBadgeText, selected && styles.roleBadgeTextSelected]}>{item.short}</Text>
                </View>
                <View style={styles.roleCopy}>
                  <Text style={styles.roleTitle}>{item.role}</Text>
                  <Text style={styles.roleDescription}>{item.description}</Text>
                </View>
                <View style={[styles.radio, selected && styles.radioSelected]}>
                  {selected ? <View style={styles.radioDot} /> : null}
                </View>
              </Pressable>
            );
          })}

          <Notice
            tone="demo"
            title="Role scope"
            message="This demo selects one starting role only. Adding or removing roles remains pending DEC-005 / BE-DEC-12."
          />
          <Button disabled={!role} label="Continue" onPress={() => setStep(2)} />
        </View>
      ) : (
        <View style={styles.form}>
          <Notice
            tone="demo"
            title="University demo registration"
            message="A local demonstration account will be stored after submission. No login session or real financial access will be created."
          />
          <FormField
            autoComplete="email"
            error={errors.email}
            keyboardType="email-address"
            label="Email address"
            onChangeText={(value) => {
              setEmail(value);
              if (errors.email) setErrors((current) => ({ ...current, email: '' }));
              setRequestError('');
              if (status === 'success') setStatus('idle');
            }}
            placeholder="you@example.com"
            value={email}
          />
          <FormField
            autoComplete="new-password"
            error={errors.password}
            label="Password"
            onChangeText={(value) => {
              setPassword(value);
              if (errors.password) setErrors((current) => ({ ...current, password: '' }));
              setRequestError('');
              if (status === 'success') setStatus('idle');
            }}
            password
            placeholder="Create a password"
            value={password}
          />
          <FormField
            autoComplete="new-password"
            error={errors.confirmPassword}
            label="Confirm password"
            onChangeText={(value) => {
              setConfirmPassword(value);
              if (errors.confirmPassword) setErrors((current) => ({ ...current, confirmPassword: '' }));
              setRequestError('');
              if (status === 'success') setStatus('idle');
            }}
            onSubmitEditing={submit}
            password
            placeholder="Repeat your password"
            returnKeyType="done"
            value={confirmPassword}
          />

          <Pressable
            accessibilityRole="checkbox"
            accessibilityState={{ checked: acceptedTerms }}
            onPress={() => {
              setAcceptedTerms((current) => !current);
              if (errors.terms) setErrors((current) => ({ ...current, terms: '' }));
              setRequestError('');
            }}
            style={styles.termsRow}
          >
            <View style={[styles.checkbox, acceptedTerms && styles.checkboxChecked]}>
              {acceptedTerms ? <Text style={styles.checkmark}>✓</Text> : null}
            </View>
            <Text style={styles.termsText}>
              I accept the required Terms of Service and simulation disclaimer.
              <Text style={styles.pendingText}> University-demo version {demoConsentVersionLabel}.</Text>
            </Text>
          </Pressable>
          {errors.terms ? (
            <Text accessibilityLiveRegion="polite" style={styles.error}>{errors.terms}</Text>
          ) : null}

          {requestError ? (
            <Notice tone="error" title="Registration failed" message={requestError} />
          ) : null}

          {status === 'success' ? (
            <Notice
              tone="success"
              title="Account created"
              message={`Participant account ${registeredAccount?.accountId ?? ''} was saved at Tier 0. Email remains unverified and no login session was created.`}
            />
          ) : null}

          <Button disabled={status === 'success'} label="Create demo account" loading={status === 'loading'} onPress={submit} />
          <Button label="Back to role selection" onPress={() => { setStep(1); setStatus('idle'); }} variant="secondary" />
        </View>
      )}

      <View style={styles.switchRow}>
        <Text style={styles.switchText}>Already registered?</Text>
        <Pressable accessibilityRole="link" onPress={() => router.replace('/login')}>
          <Text style={styles.link}>Sign in</Text>
        </Pressable>
      </View>
      <Button label="Back to welcome" onPress={() => router.replace('/')} variant="ghost" />
    </AuthShell>
  );
}

const styles = StyleSheet.create({
  progressTrack: { height: 4, borderRadius: 2, backgroundColor: colors.border, marginBottom: 24, overflow: 'hidden' },
  progressFill: { width: '50%', height: '100%', backgroundColor: colors.gold },
  progressComplete: { width: '100%' },
  roleList: { gap: 14 },
  roleCard: {
    padding: 16,
    borderRadius: radius.medium,
    borderWidth: 1.5,
    borderColor: colors.border,
    backgroundColor: colors.paper,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 13,
  },
  roleCardSelected: { borderColor: colors.evergreen, backgroundColor: colors.mint },
  roleBadge: { width: 42, height: 42, borderRadius: 14, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.cream },
  roleBadgeSelected: { backgroundColor: colors.evergreen },
  roleBadgeText: { color: colors.evergreen, fontSize: 17, fontWeight: '900' },
  roleBadgeTextSelected: { color: colors.white },
  roleCopy: { flex: 1, gap: 3 },
  roleTitle: { color: colors.ink, fontSize: 16, fontWeight: '800' },
  roleDescription: { color: colors.inkMuted, fontSize: 13, lineHeight: 18 },
  radio: { width: 20, height: 20, borderRadius: 10, borderWidth: 1.5, borderColor: colors.border, alignItems: 'center', justifyContent: 'center' },
  radioSelected: { borderColor: colors.evergreen },
  radioDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: colors.evergreen },
  form: { gap: 17 },
  termsRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 11 },
  checkbox: { width: 23, height: 23, borderRadius: 7, borderWidth: 1.5, borderColor: colors.border, backgroundColor: colors.paper, alignItems: 'center', justifyContent: 'center', marginTop: 1 },
  checkboxChecked: { backgroundColor: colors.evergreen, borderColor: colors.evergreen },
  checkmark: { color: colors.white, fontSize: 14, fontWeight: '900' },
  termsText: { flex: 1, color: colors.ink, fontSize: 13, lineHeight: 20 },
  pendingText: { color: colors.inkMuted },
  error: { color: colors.danger, fontSize: 13, lineHeight: 18, marginTop: -10 },
  switchRow: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 6, marginTop: 26 },
  switchText: { color: colors.inkMuted, fontSize: 14 },
  link: { color: colors.evergreen, fontSize: 14, fontWeight: '800' },
  pressed: { opacity: 0.82 },
});
