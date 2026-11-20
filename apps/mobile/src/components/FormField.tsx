import { useState } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  type TextInputProps,
} from 'react-native';

import { colors, radius } from '../theme';

type FormFieldProps = TextInputProps & {
  label: string;
  error?: string;
  password?: boolean;
};

export function FormField({ label, error, password = false, ...inputProps }: FormFieldProps) {
  const [showPassword, setShowPassword] = useState(false);
  const inputId = label.toLowerCase().replaceAll(' ', '-');

  return (
    <View style={styles.wrapper}>
      <Text nativeID={`${inputId}-label`} style={styles.label}>
        {label}
      </Text>
      <View style={[styles.inputShell, error && styles.inputShellError]}>
        <TextInput
          {...inputProps}
          accessibilityLabelledBy={`${inputId}-label`}
          accessibilityHint={error}
          autoCapitalize={inputProps.autoCapitalize ?? 'none'}
          placeholderTextColor="#89958F"
          secureTextEntry={password && !showPassword}
          style={styles.input}
        />
        {password ? (
          <Pressable
            accessibilityLabel={showPassword ? 'Hide password' : 'Show password'}
            accessibilityRole="button"
            hitSlop={10}
            onPress={() => setShowPassword((current) => !current)}
          >
            <Text style={styles.showText}>{showPassword ? 'Hide' : 'Show'}</Text>
          </Pressable>
        ) : null}
      </View>
      {error ? (
        <Text accessibilityLiveRegion="polite" style={styles.error}>
          {error}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { gap: 7 },
  label: { color: colors.ink, fontSize: 14, fontWeight: '700' },
  inputShell: {
    minHeight: 54,
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: radius.medium,
    backgroundColor: colors.paper,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  inputShellError: { borderColor: colors.danger },
  input: { flex: 1, color: colors.ink, fontSize: 16, paddingVertical: 14 },
  showText: { color: colors.evergreen, fontSize: 14, fontWeight: '800' },
  error: { color: colors.danger, fontSize: 13, lineHeight: 18 },
});
