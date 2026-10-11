import { PenTool } from 'lucide-react';

export default {
  slug: 'digital-signatures',
  number: 3,
  title: 'Digital Signatures and the Indian IT Act',
  icon: PenTool,
  color: '#34d399',
  difficulty: 'Advanced',
  disclaimer: true,
  summary: 'How public-key cryptography, certificates and Certifying Authorities make electronic documents trustworthy.',
  tagline: 'How digital authentication supports trust in electronic transactions.',
  keywords: ['digital signature', 'electronic signature', 'public key', 'private key', 'hash', 'certificate', 'certifying authority', 'dsc', 'esign', 'pki'],
  intro: [
    'A digital signature is a mathematical technique that proves who signed an electronic document (authenticity) and that it hasn’t been changed since (integrity). The signer can’t later deny signing it (non-repudiation).',
    'Under the IT Act, digitally signed electronic records have legal validity (Sec 3, 5). India’s trust framework is a public-key infrastructure: the Controller of Certifying Authorities runs the Root CA of India and licenses Certifying Authorities, which issue Digital Signature Certificates (DSCs) used for tax filing, company filings, e-tenders and more.',
  ],
  definitions: {
    title: 'Key Terms',
    items: [
      { term: 'Key pair', text: 'A private key (kept secret, used to sign) and a matching public key (shared, used to verify).' },
      { term: 'Hash function', text: 'Creates a fixed-length fingerprint of a document. Any change produces a different hash.' },
      { term: 'Digital Signature Certificate (DSC)', text: 'An electronic certificate from a licensed CA that binds a person’s identity to their public key.' },
    ],
  },
  compare: {
    title: 'Electronic Signature vs Digital Signature',
    left: { title: 'Electronic signature (Sec 3A)', subtitle: 'Broad, technology-neutral', points: ['Any reliable electronic authentication technique listed in the Second Schedule', 'Includes Aadhaar-based eSign', 'Added by the 2008 amendment'] },
    right: { title: 'Digital signature (Sec 3)', subtitle: 'A specific type', points: ['Uses asymmetric cryptography plus a hash function', 'Backed by a DSC from a licensed CA', 'Strong integrity and non-repudiation'] },
  },
  flow: {
    title: 'Digital Signature Creation & Verification',
    steps: [
      { title: 'Hash the document', text: 'The document is reduced to a unique fingerprint (e.g. SHA-256).' },
      { title: 'Sign with private key', text: 'The hash is encrypted with the signer’s private key, creating the signature.' },
      { title: 'Send document + signature', text: 'Along with the signer’s certificate containing the public key.' },
      { title: 'Verify with public key', text: 'The receiver recomputes the hash and checks the signature. A match means authentic and unaltered.' },
    ],
  },
  table: {
    title: 'Truth vs Authentication',
    columns: ['Concept', 'Purpose', 'What it helps verify', 'Important limitation'],
    rows: [
      ['Digital signature', 'Authenticates electronic records', 'Integrity and signer identity', 'Proves who signed and that nothing changed, not that the content is true'],
      ['Private key', 'Creates signatures', 'Non-repudiation', 'If the key is stolen, signatures can be forged'],
      ['Public key', 'Verifies signatures', 'That the matching private key signed', 'Must be trusted, which is why certificates exist'],
      ['Digital certificate', 'Links a person to a public key', 'Identity of the key holder', 'Subject to expiry and revocation by the CA'],
    ],
  },
  cards: {
    title: 'The Trust Framework',
    items: [
      { title: 'Public & Private Keys', text: 'Asymmetric cryptography: sign with private, verify with public.' },
      { title: 'Hash Functions', text: 'Any change, even one comma, breaks the signature.' },
      { title: 'Digital Certificates', text: 'Electronic ID cards binding identity to a public key.' },
      { title: 'Certifying Authorities', text: 'Licensed by the CCA to issue and revoke certificates.' },
      { title: 'Root CA of India', text: 'The top of the chain of trust, operated by the CCA.' },
      { title: 'eSign', text: 'Online Aadhaar-based electronic signature service.' },
    ],
  },
  lists: [
    { title: 'Where DSCs Are Used', tone: 'info', items: ['Income-tax e-filing (for audited returns)', 'MCA company filings', 'GST and customs filings', 'Government e-tendering', 'Signing PDFs and contracts'] },
    { title: 'Limitations & Challenges', tone: 'warn', items: ['A stolen USB token or private key enables forgery', 'Certificates expire and must be renewed', 'Users may not check revocation status', 'Doesn’t prove the content is true or fair', 'Some documents still excluded (First Schedule)'] },
    { title: 'Good Practices', tone: 'good', items: ['Keep the DSC token and PIN separate and safe', 'Never share your token or PIN with agents', 'Revoke immediately if lost', 'Verify signatures and certificate validity before trusting', 'Use timestamps for long-term validity'] },
  ],
  caseStudy: {
    title: 'Case Study: The Altered Tender Bid',
    text: 'In a fictional e-tender, a vendor claimed the department had changed their quoted price after submission. The bid had been digitally signed with the vendor’s DSC. When the department verified the signature against the stored document, it validated, proving the document was exactly what the vendor signed. Had anyone altered even one digit, verification would have failed. Digital signatures turned a "your word against mine" dispute into a mathematical fact.',
  },
  lab: {
    key: 'u5-dsig',
    title: 'Mission: Sign & Verify (Real Cryptography)',
    description: 'A genuine cryptography lab running in your browser. Generate an RSA-2048 key pair, hash a document with SHA-256, sign it, then verify it. Tamper with one character, or verify with the wrong key, and watch verification fail. Finally, inspect a certificate chain and spot the invalid certificate.',
    badge: { name: 'Signature Master', emoji: '✍️' },
    objectives: [
      { id: 'sign', label: 'Generate keys and sign a document', xp: 25 },
      { id: 'verify', label: 'Successfully verify a genuine signature', xp: 20 },
      { id: 'tamper', label: 'Detect a tampered document or wrong key', xp: 30 },
      { id: 'cert', label: 'Identify the invalid certificate in the chain', xp: 25 },
    ],
  },
  quiz: [
    { q: 'Which key is used to create a digital signature?', options: ['The receiver’s public key', 'The signer’s private key', 'Any shared password', 'The CA’s public key'], answer: 1, explain: 'Only the signer holds the private key, which gives non-repudiation.' },
    { q: 'Under the IT Act, who issues Digital Signature Certificates?', options: ['Any ISP', 'A licensed Certifying Authority', 'Any notary', 'The individual'], answer: 1, explain: 'CAs are licensed by the Controller of Certifying Authorities.' },
    { q: 'What does a valid digital signature prove?', options: ['That the content is true', 'That the document is unaltered and who signed it', 'That the document is secret', 'Nothing'], answer: 1, explain: 'Authenticity and integrity, not the truth of the content.' },
    { q: 'What happens to verification if one character of a signed document changes?', options: ['Still valid', 'Verification fails', 'The signature updates itself', 'The CA is notified'], answer: 1, explain: 'The hash changes, so the signature no longer matches.' },
    { q: 'Which section added "electronic signature" as a broader concept?', options: ['Sec 3A', 'Sec 66F', 'Sec 43', 'Sec 79'], answer: 0, explain: 'The 2008 amendment introduced technology-neutral electronic signatures.' },
  ],
  deep: {
    sections: [
      { title: 'How asymmetric cryptography works', points: ['Two mathematically linked keys: what one locks, only the other can unlock.', 'RSA (used in most Indian DSCs) relies on the difficulty of factoring very large numbers. 2048-bit keys are standard.', 'Signing: hash(document) → transform with the private key → signature.', 'Verifying: transform the signature with the public key → compare with a fresh hash(document).', 'Encryption works the other way round: encrypt with the receiver’s public key, decrypt with their private key.'] },
      { title: 'Certificates and the chain of trust', points: ['A certificate (X.509 format) contains: subject name, public key, issuer CA, validity dates, serial number and the CA’s signature.', 'The chain: Root CA of India → licensed CA (e.g. eMudhra, (n)Code Solutions, IDRBT, NIC) → your DSC.', 'Software trusts a certificate only if every link’s signature verifies up to a trusted root.', 'Revoked certificates are listed in CRLs or checked by OCSP. A revoked or expired certificate must not be trusted.'] },
      { title: 'Indian DSC classes and eSign', points: ['DSCs are issued after identity verification and stored on FIPS-compliant USB tokens.', 'Class 2 certificates were discontinued from 2021, and Class 3 is now the standard for individuals and organisations.', 'eSign (Second Schedule) lets users sign online using Aadhaar OTP or biometrics, without a token.', 'DGFT, MCA, Income Tax and e-procurement portals accept DSCs.'] },
      { title: 'Legal effect', points: ['Sec 3: authentication of electronic records using digital signatures.', 'Sec 5: where law requires a signature, a digital or electronic signature satisfies it.', 'Sec 15: secure electronic signature, under the signatory’s sole control at the time of signing.', 'Evidence law presumes the validity of secure electronic records and signatures, unless proven otherwise.'] },
    ],
    cases: [
      { year: '2000', title: 'CCA established', text: 'The Controller of Certifying Authorities was set up under the IT Act to build India’s PKI.' },
      { year: '2008', title: 'Electronic signatures', text: 'The amendment introduced technology-neutral electronic signatures (Sec 3A).' },
      { year: '2015', title: 'eSign launched', text: 'Aadhaar-based online signing allowed citizens to sign documents without a USB token.' },
      { year: '2021', title: 'Class 2 DSC discontinued', text: 'The CCA merged Class 2 into Class 3 with stronger identity verification.' },
    ],
    myths: [
      { myth: 'A scanned image of my handwritten signature is a digital signature.', fact: 'A scanned image has no cryptographic protection. Anyone can copy it.' },
      { myth: 'A digital signature encrypts the document.', fact: 'Signing proves origin and integrity. The document itself may still be readable.' },
      { myth: 'If the signature is valid, the content must be correct.', fact: 'It only proves who signed and that nothing changed since.' },
    ],
    law: [
      { title: 'IT Act Sec 3, 3A, 5', text: 'Authentication by digital/electronic signature and legal recognition of signatures.' },
      { title: 'IT Act Chapter VI–VIII', text: 'Controller and Certifying Authorities, certificates, and subscriber duties (keep the private key safe, Sec 42).' },
      { title: 'IT Act Sec 71, 73, 74', text: 'Offences for misrepresentation to the CCA/CA, and publishing false or fraudulent certificates.' },
    ],
    examNotes: [
      'Digital signature = hash + private-key signing, which gives authenticity, integrity and non-repudiation.',
      'Electronic signature (Sec 3A) is broader. A digital signature (Sec 3) is one type.',
      'Keys: sign with private, verify with public.',
      'Certificate binds identity to a public key and is issued by a licensed CA under the CCA (Root CA of India).',
      'Process: hash → sign → send → verify (recompute hash and compare).',
      'Limitations: key theft, expiry/revocation, doesn’t prove truth, First Schedule exclusions.',
    ],
    extraQuiz: [
      { q: 'Which list shows revoked certificates?', options: ['CRL (Certificate Revocation List)', 'DNS', 'URL', 'CSV'], answer: 0, explain: 'CRLs and OCSP tell verifiers when a certificate has been revoked.' },
      { q: 'Who operates the Root CA of India?', options: ['RBI', 'Controller of Certifying Authorities', 'UIDAI', 'CERT-In'], answer: 1, explain: 'The CCA operates the root of India’s PKI.' },
    ],
  },
};
