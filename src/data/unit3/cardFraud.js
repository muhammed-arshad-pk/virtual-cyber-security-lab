import { CreditCard } from 'lucide-react';

export default {
  slug: 'credit-card-fraud',
  number: 6,
  title: 'Credit Card Frauds in the Mobile & Wireless Era',
  icon: CreditCard,
  color: '#facc15',
  difficulty: 'Intermediate',
  summary: 'Card-not-present fraud, payment-app scams, OTP theft and how tokenization fights back.',
  tagline: 'Your card number is just data. Learn who wants it and how the system protects it.',
  keywords: ['credit card', 'card not present', 'cnp', 'tokenization', 'luhn', 'pci dss', 'upi fraud', 'skimming', 'fraud detection'],
  intro: [
    'As shopping moved to phones, card fraud moved with it. Most card fraud today is card-not-present (CNP): criminals use stolen card details online, where no physical card or PIN is needed.',
    'Defences have evolved too. Tokenization replaces real card numbers, an additional authentication factor (OTP or biometric) is required in India, and AI fraud engines score every transaction in milliseconds.',
  ],
  definitions: {
    title: 'Key Terms',
    items: [
      { term: 'PAN', text: 'Primary Account Number: the 15–16 digit number on your card.' },
      { term: 'Card-not-present (CNP)', text: 'Online or phone payments where the merchant never sees the physical card.' },
      { term: 'Tokenization', text: 'Replacing the PAN with a unique substitute token that is useless if stolen.' },
    ],
  },
  compare: {
    title: 'Card-Present vs Card-Not-Present',
    left: { title: 'Card-present', subtitle: 'Shop terminal', points: ['EMV chip creates a one-time cryptogram', 'PIN or contactless limits', 'Fraud: skimming, cloning magnetic stripes', 'Lower fraud today thanks to chip + PIN'] },
    right: { title: 'Card-not-present', subtitle: 'Online / in-app', points: ['Only card details are needed', 'OTP / 3-D Secure adds a factor', 'Fraud: phishing, data breaches, card testing', 'The largest share of card fraud worldwide'] },
  },
  flow: {
    title: 'Life of a Card Payment',
    steps: [
      { title: 'Customer pays', text: 'Taps, inserts or enters card details in an app.' },
      { title: 'Merchant / gateway', text: 'Sends a token or encrypted data to the acquiring bank.' },
      { title: 'Card network', text: 'Visa, Mastercard or RuPay routes it and runs fraud checks.' },
      { title: 'Issuer authorises', text: 'Your bank checks balance, risk score and OTP, then approves or declines.' },
    ],
  },
  table: {
    title: 'Fraud Types & Defences',
    columns: ['Fraud type', 'How it happens', 'Defence'],
    rows: [
      ['Phishing for card details', 'Fake shopping, refund or KYC pages', 'Check domain, use saved tokenized cards'],
      ['OTP / vishing fraud', 'Caller pretends to be the bank and asks for OTP', 'Never share OTP. Banks never ask'],
      ['SIM swap + OTP interception', 'Fraudster takes over your number', 'Bank alerts on email/app, quick reporting'],
      ['Data breach at merchant', 'Stored card data stolen', 'Tokenization (RBI 2022), PCI DSS'],
      ['Card testing', 'Tiny charges to check stolen cards', 'Velocity rules, CAPTCHA, alerts on small charges'],
      ['Skimming / cloning', 'Device copies magnetic-stripe data', 'Chip + PIN, cover keypad, inspect terminals'],
      ['Payment-app / UPI scams', 'Fake collect requests, QR codes, screen-sharing apps', 'PIN is only for paying, never install remote apps'],
    ],
  },
  cards: {
    title: 'Common Fraud Techniques',
    items: [
      { title: 'Card-not-present Fraud', text: 'Stolen details used on websites and apps.' },
      { title: 'Account Takeover', text: 'Criminal logs into your banking app and adds their device.' },
      { title: 'Phishing & Vishing', text: 'Fake pages and calls harvesting card data and OTPs.' },
      { title: 'Payment-app Fraud', text: 'Collect requests, malicious QR codes, fake customer care.' },
      { title: 'Card Testing', text: 'Bots try small charges to find live stolen cards.' },
      { title: 'Skimming', text: 'Hidden readers copy cards at ATMs and fuel pumps.' },
    ],
  },
  lists: [
    { title: 'Red Flags', tone: 'warn', items: ['Calls asking for OTP, CVV or PIN', '“Refund” that needs you to scan a QR code', 'Unknown small transactions (₹1–₹10)', 'Requests to install AnyDesk or TeamViewer-like apps', 'Pages with domains that don’t match the brand'] },
    { title: 'Protect Yourself', tone: 'good', items: ['Enable SMS + app alerts for every transaction', 'Set per-channel limits; disable international/online use if unused', 'Use tokenized cards / UPI in trusted apps', 'Never share OTP, CVV, PIN', 'Report within 3 days for zero liability'] },
    { title: 'If It Happens', tone: 'info', items: ['Block the card in your bank app immediately', 'Call 1930 or file at cybercrime.gov.in', 'Inform the bank in writing and keep the reference number', 'Change banking passwords, check linked devices', 'Follow up for the chargeback or dispute'] },
  ],
  lab: {
    key: 'u3-card',
    title: 'Mission: Fraud Analyst Console',
    description: 'Work a shift at a bank’s fraud desk. Live transactions stream in for one cardholder. Approve or decline using location, device, velocity and channel clues. Then validate card numbers with the real Luhn algorithm and watch tokenization defeat a merchant data breach.',
    badge: { name: 'Fraud Buster', emoji: '💳' },
    objectives: [
      { id: 'analyst', label: 'Finish a shift with every decision correct', xp: 50 },
      { id: 'luhn', label: 'Validate a card number with the Luhn algorithm', xp: 20 },
      { id: 'token', label: 'Run the merchant-breach demo with tokenization', xp: 30 },
    ],
  },
  quiz: [
    { q: 'What is card-not-present (CNP) fraud?', options: ['Losing your wallet', 'Using stolen card details for online or phone purchases', 'A broken ATM', 'Paying with cash'], answer: 1, explain: 'No physical card is needed, only the details.' },
    { q: 'How does tokenization protect you?', options: ['It hides your face', 'Merchants store a substitute token that is useless if stolen', 'It increases your credit limit', 'It removes the chip'], answer: 1, explain: 'Since October 2022, RBI rules prevent merchants from storing actual card numbers.' },
    { q: 'A caller from "your bank" asks for the OTP to "block a suspicious transaction". What do you do?', options: ['Share it quickly', 'Refuse and hang up, then call the bank’s official number', 'Share half of it', 'Text it instead'], answer: 1, explain: 'Banks never ask for OTPs. Sharing it authorises the fraud.' },
    { q: 'A series of ₹1–₹10 charges at unknown websites most likely indicates…', options: ['Bank interest', 'Card testing by fraudsters', 'Cashback', 'A system update'], answer: 1, explain: 'Criminals test stolen cards with tiny charges before big purchases.' },
    { q: 'To receive money on UPI, you need to…', options: ['Enter your UPI PIN', 'Do nothing. Receiving never needs a PIN', 'Scan the sender’s QR code', 'Share your OTP'], answer: 1, explain: 'A PIN or QR scan means you are paying.' },
  ],
  deep: {
    sections: [
      { title: 'Inside a card number', points: ['The first digit identifies the network: 4 = Visa, 5 (51–55) or 2 (2221–2720) = Mastercard, 34/37 = Amex, and 6, 8 or 508 ranges = RuPay.', 'The first 6–8 digits are the BIN/IIN, which identifies the issuing bank.', 'The last digit is a Luhn check digit that catches typing mistakes. It is not a security feature.', 'The CVV is never stored by merchants after authorisation (a PCI DSS rule).'] },
      { title: 'How fraud detection engines decide', points: ['Every transaction gets a risk score in milliseconds, using rules plus machine learning.', 'Signals: location vs the card’s usual area, "impossible travel", device fingerprint, time of day, merchant category, amount vs history.', 'Velocity: many transactions in a short time, or repeated attempts after declines.', 'High risk leads to a step-up (OTP/biometric), a decline, or a call to the customer.', 'Balancing act: too strict blocks genuine customers (false positives), too loose lets fraud through.'] },
      { title: 'Tokenization, EMV and 3-D Secure', points: ['Card-on-file tokenization (RBI, Oct 2022): merchants store a token unique to the card, merchant and device.', 'Device tokenization (Google Wallet, Apple Pay): the phone stores a token, and each payment adds a one-time cryptogram.', 'EMV chips generate dynamic cryptograms, so copied data can’t be replayed.', '3-D Secure 2 sends rich device data to the issuer, which can approve low-risk payments without friction.'] },
      { title: 'PCI DSS in brief', points: ['The Payment Card Industry Data Security Standard is mandatory for anyone storing, processing or transmitting card data.', 'Key rules: protect stored data, encrypt in transit, restrict access, monitor and test networks.', 'Never store full magnetic-stripe data, the CVV or the PIN.', 'Version 4.0 (2022) strengthened MFA and continuous security.'] },
    ],
    cases: [
      { year: '2013', title: 'Target breach (USA)', text: 'Attackers entered through an HVAC vendor and installed malware on point-of-sale systems, stealing about 40 million card numbers.' },
      { year: '2016', title: 'Indian debit-card compromise', text: 'About 3.2 million Indian debit cards were feared compromised through malware at a payment-switch provider, leading to mass card replacements.' },
      { year: '2018', title: 'Magecart / British Airways', text: 'Malicious script injected into a payment page skimmed card details from hundreds of thousands of customers. This is "digital skimming".' },
      { year: '2022', title: 'RBI card-on-file tokenization', text: 'From 1 October 2022, Indian merchants had to replace stored card numbers with tokens.' },
    ],
    myths: [
      { myth: 'Contactless cards can be emptied by anyone walking past.', fact: 'Contactless needs a few centimetres, each tap uses a one-time cryptogram, and limits apply (₹5,000 without PIN in India).' },
      { myth: 'If fraud happens, the money is gone forever.', fact: 'Under RBI rules, quick reporting can mean zero liability. Report within 3 working days.' },
      { myth: 'A valid-looking card number must be real.', fact: 'The Luhn check only catches typos. Anyone can generate Luhn-valid numbers. Authorisation is what matters.' },
    ],
    law: [
      { title: 'IT Act Sec 66C & 66D', text: 'Using someone’s card credentials or OTP fraudulently is identity theft. Posing as a bank is cheating by personation.' },
      { title: 'BNS Sec 318', text: 'Cheating, used together with the IT Act in card and payment fraud cases.' },
      { title: 'RBI customer-liability circular (2017)', text: 'Zero liability if a third-party breach is reported within 3 working days. Limited liability for 4–7 days.' },
      { title: 'Report', text: 'Call 1930 immediately (the golden hour helps freeze funds) · cybercrime.gov.in · your bank’s official helpline.' },
    ],
    examNotes: [
      'Card fraud types: CNP, phishing/vishing, account takeover, SIM swap + OTP, skimming, card testing, payment-app fraud.',
      'Defences: tokenization, EMV chip, 3-D Secure / OTP, fraud scoring, alerts, limits.',
      'Luhn = check digit for typos, not security. BIN identifies the issuer.',
      'PCI DSS: never store CVV/PIN, encrypt and restrict card data.',
      'RBI: tokenization (Oct 2022), AFA, zero liability if reported within 3 days.',
      'Report: 1930, cybercrime.gov.in, block the card in the app.',
    ],
    extraQuiz: [
      { q: 'What is the purpose of the Luhn check digit?', options: ['Encrypts the card', 'Detects typing errors in the number', 'Stores the PIN', 'Identifies the cardholder'], answer: 1, explain: 'It catches single-digit mistakes and most swaps. It provides no security.' },
      { q: 'A card used in Pune at 18:30 and at a shop in Dubai at 18:31 suggests…', options: ['Fast flight', 'Cloned card ("impossible travel")', 'Normal usage', 'Bank error only'], answer: 1, explain: 'Physical presence in two distant places within a minute is impossible.' },
      { q: 'Under PCI DSS, which data must never be stored after authorisation?', options: ['Cardholder name', 'CVV / card security code', 'Last 4 digits', 'Expiry month'], answer: 1, explain: 'Storing the CVV is prohibited, which makes stolen databases less useful.' },
    ],
  },
};
