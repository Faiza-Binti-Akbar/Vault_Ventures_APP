const crypto = require('node:crypto');

const DEMO_LEGAL_VERSION = '0.1-demo';
const DEMO_LEGAL_EFFECTIVE_FROM = '2026-11-19 00:00:00.000';

const documentDrafts = [
  {
    documentCode: 'DEMO_TERMS',
    title: 'University Demo Terms of Service',
    version: DEMO_LEGAL_VERSION,
    effectiveFrom: DEMO_LEGAL_EFFECTIVE_FROM,
    body: 'Vault Ventures is a university educational demonstration created for coursework and software testing. It is not a live investment, funding, escrow, payment, or financial-services platform. All investment, funding, escrow, milestone-payment, and other financial activity shown in the application is simulated. No real money may be transferred through the application. Do not enter real financial information or sensitive personal information. Demonstration data may be changed or reset at any time during development.',
  },
  {
    documentCode: 'DEMO_SIMULATION',
    title: 'Investment/Funding Simulation Disclaimer',
    version: DEMO_LEGAL_VERSION,
    effectiveFrom: DEMO_LEGAL_EFFECTIVE_FROM,
    body: 'Vault Ventures is a university educational demonstration, not a live investment or payment platform. All investment, funding, escrow, milestone-payment, and other financial activity in the application is simulated; it is not an offer, financial advice, or a binding transaction. No real money may be transferred, held, or received through the application. Do not enter real financial information or sensitive personal information. Demonstration data and simulated outcomes may be changed or reset during development.',
  },
];

function sha256(body) {
  return crypto.createHash('sha256').update(body, 'utf8').digest('hex');
}

const DEMO_LEGAL_DOCUMENTS = Object.freeze(
  documentDrafts.map((document) =>
    Object.freeze({ ...document, contentSha256: sha256(document.body) }),
  ),
);

const DEMO_REQUIRED_CONSENTS = Object.freeze(
  DEMO_LEGAL_DOCUMENTS.map(({ documentCode, version, contentSha256 }) =>
    Object.freeze({ documentCode, version, contentSha256 }),
  ),
);

module.exports = {
  DEMO_LEGAL_DOCUMENTS,
  DEMO_LEGAL_EFFECTIVE_FROM,
  DEMO_LEGAL_VERSION,
  DEMO_REQUIRED_CONSENTS,
  sha256,
};
