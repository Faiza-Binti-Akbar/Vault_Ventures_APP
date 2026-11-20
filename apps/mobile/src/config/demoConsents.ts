export const demoRegistrationConsents = [
  { documentCode: 'DEMO_TERMS', version: '0.1-demo' },
  { documentCode: 'DEMO_SIMULATION', version: '0.1-demo' },
] as const;

export const demoConsentVersionLabel = demoRegistrationConsents[0].version;
