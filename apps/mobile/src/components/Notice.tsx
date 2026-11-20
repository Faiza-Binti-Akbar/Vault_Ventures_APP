import { StyleSheet, Text, View } from 'react-native';

import { colors, radius } from '../theme';

type NoticeProps = {
  tone: 'demo' | 'success' | 'error';
  title: string;
  message: string;
};

export function Notice({ tone, title, message }: NoticeProps) {
  return (
    <View
      accessibilityLiveRegion="polite"
      style={[styles.base, tone === 'success' && styles.success, tone === 'error' && styles.error]}
    >
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    backgroundColor: colors.mint,
    borderRadius: radius.medium,
    borderLeftColor: colors.gold,
    borderLeftWidth: 4,
    padding: 14,
    gap: 3,
  },
  success: { backgroundColor: colors.successSoft, borderLeftColor: colors.success },
  error: { backgroundColor: colors.dangerSoft, borderLeftColor: colors.danger },
  title: { color: colors.ink, fontSize: 14, fontWeight: '800' },
  message: { color: colors.inkMuted, fontSize: 13, lineHeight: 19 },
});
