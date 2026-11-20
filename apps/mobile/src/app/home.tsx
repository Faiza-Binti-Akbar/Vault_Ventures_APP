import { StyleSheet, Text, View } from 'react-native';

import { useAuth } from '../auth/AuthContext';
import { AuthShell } from '../components/AuthShell';
import { Button } from '../components/Button';
import { Notice } from '../components/Notice';
import { colors, radius } from '../theme';

export default function HomeScreen() {
  const { account, signOut } = useAuth();

  return (
    <AuthShell
      eyebrow="Authenticated participant"
      title="Welcome to Vault Ventures."
      subtitle="Your local demonstration session is active and protected routes validate your current account status on the server."
    >
      <View style={styles.card}>
        <Text style={styles.label}>SIGNED IN AS</Text>
        <Text style={styles.email}>{account?.email}</Text>
        <Text style={styles.meta}>
          Roles: {account?.roles.join(', ') || 'None'} · Tier {account?.verificationTier ?? 0}
        </Text>
      </View>
      <Notice
        tone="demo"
        title="Non-production session"
        message="The 15-minute access token and rotating refresh session are provisional for this university demonstration."
      />
      <View style={styles.actions}>
        <Button label="Sign out" onPress={() => void signOut()} variant="secondary" />
      </View>
    </AuthShell>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.paper,
    borderColor: colors.border,
    borderRadius: radius.large,
    borderWidth: 1,
    gap: 8,
    marginBottom: 16,
    padding: 20,
  },
  label: { color: colors.gold, fontSize: 11, fontWeight: '800', letterSpacing: 1.2 },
  email: { color: colors.ink, fontSize: 20, fontWeight: '800' },
  meta: { color: colors.inkMuted, fontSize: 13, lineHeight: 19 },
  actions: { marginTop: 18 },
});
