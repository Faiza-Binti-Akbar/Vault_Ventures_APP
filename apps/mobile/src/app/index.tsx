import { router } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { AuthShell } from '../components/AuthShell';
import { Button } from '../components/Button';
import { Notice } from '../components/Notice';
import { colors, radius } from '../theme';

const highlights = [
  ['01', 'Build', 'Shape a credible venture profile'],
  ['02', 'Connect', 'Meet aligned investors and professionals'],
  ['03', 'Progress', 'Move forward with structured workflows'],
] as const;

export default function WelcomeScreen() {
  return (
    <AuthShell
      eyebrow="A clearer path to progress"
      title="Where ambitious ventures find the right people."
      subtitle="A focused space for founders, investors and skilled professionals to discover aligned opportunities."
      footer={
        <Text style={styles.footerText}>
          Participant preview · Admin access is available only through the separate Web Admin application.
        </Text>
      }
    >
      <View style={styles.heroCard}>
        <View style={styles.orbitOuter}>
          <View style={styles.orbitInner}>
            <Text style={styles.heroMonogram}>VV</Text>
          </View>
        </View>
        <Text style={styles.heroLabel}>VENTURE · CAPITAL · TALENT</Text>
      </View>

      <View style={styles.highlights}>
        {highlights.map(([number, title, copy]) => (
          <View key={number} style={styles.highlightRow}>
            <Text style={styles.number}>{number}</Text>
            <View style={styles.highlightCopy}>
              <Text style={styles.highlightTitle}>{title}</Text>
              <Text style={styles.highlightText}>{copy}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.actions}>
        <Button label="Get started" onPress={() => router.push('/register')} />
        <Button label="I already have an account" onPress={() => router.push('/login')} variant="secondary" />
      </View>

      <Notice
        tone="demo"
        title="Local university demonstration"
        message="Participant registration and authentication use the API configured by EXPO_PUBLIC_API_BASE_URL."
      />
    </AuthShell>
  );
}

const styles = StyleSheet.create({
  heroCard: {
    height: 174,
    borderRadius: radius.large,
    backgroundColor: colors.evergreenDark,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  orbitOuter: {
    width: 130,
    height: 130,
    borderRadius: 65,
    borderWidth: 1,
    borderColor: '#FFFFFF30',
    alignItems: 'center',
    justifyContent: 'center',
  },
  orbitInner: {
    width: 86,
    height: 86,
    borderRadius: 43,
    backgroundColor: colors.gold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroMonogram: { color: colors.evergreenDark, fontSize: 28, fontWeight: '900', letterSpacing: -2 },
  heroLabel: { position: 'absolute', bottom: 13, color: '#FFFFFFB8', fontSize: 10, fontWeight: '700', letterSpacing: 1.7 },
  highlights: { gap: 15, marginBottom: 24 },
  highlightRow: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  number: { color: colors.gold, fontWeight: '900', fontSize: 13 },
  highlightCopy: { flex: 1 },
  highlightTitle: { color: colors.ink, fontWeight: '800', fontSize: 15 },
  highlightText: { color: colors.inkMuted, fontSize: 13, lineHeight: 19 },
  actions: { gap: 11, marginBottom: 16 },
  footerText: { textAlign: 'center', color: colors.inkMuted, fontSize: 11, lineHeight: 17 },
});
