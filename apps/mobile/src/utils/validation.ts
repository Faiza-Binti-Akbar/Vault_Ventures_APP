export type FieldErrors = Record<string, string>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateEmail(email: string): string | undefined {
  if (!email.trim()) return 'Email is required.';
  if (!EMAIL_PATTERN.test(email.trim())) return 'Enter a valid email address.';
  return undefined;
}

export function validateLogin(email: string, password: string): FieldErrors {
  const errors: FieldErrors = {};
  const emailError = validateEmail(email);

  if (emailError) errors.email = emailError;
  if (!password) errors.password = 'Password is required.';

  return errors;
}

export function validateRegistration(
  email: string,
  password: string,
  confirmPassword: string,
  acceptedTerms: boolean,
): FieldErrors {
  const errors = validateLogin(email, password);

  if (!confirmPassword) {
    errors.confirmPassword = 'Confirm your password.';
  } else if (password !== confirmPassword) {
    errors.confirmPassword = 'Passwords do not match.';
  }

  if (!acceptedTerms) {
    errors.terms = 'Accept the Terms and simulation disclaimer to continue.';
  }

  return errors;
}
