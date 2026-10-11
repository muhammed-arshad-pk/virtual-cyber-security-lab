# Cyber Shield — Virtual Cyber Security Lab

An interactive, gamified virtual lab for the Cyber Security course. Each topic has
theory, an animated hands-on mission, and a timed knowledge check. Progress, XP and
badges are saved in the browser.

## Run it

```bash
npm install      # first time only
npm run dev      # open http://localhost:5173
npm run build    # production build in dist/
```

## Unit II missions

| Topic | Mission |
|---|---|
| Cyberstalking | Judge messages arriving live on a phone, then build a safety plan |
| Botnets | Watch a botnet form on a network map, then defend it with 5 security fixes |
| Password Cracking | Strength analyzer, PIN brute-force animation, guessing attack vs your password |
| Keyloggers & Spyware | See keystrokes stream to an attacker screen, defeat it with autofill, spot spyware apps |
| DoS & DDoS | Sort DoS vs DDoS facts, then handle incidents as the on-call engineer |
| SQL Injection | *Coming soon* |
| Trojans & Backdoors | Download Detective: pick safe software or watch your PC get compromised |

## Unit III missions

| Topic | Mission |
|---|---|
| Proliferation of Mobile & Wireless Devices | Switch off unneeded radios across 6 devices to shrink the attack surface; wireless range visualizer |
| Trends in Mobility | 1G→5G security time machine, 4G vs 5G latency race, trend-to-risk matcher |
| Security Challenges | Harden a phone's settings to score 100; minute-by-minute lost-phone emergency |
| Authentication Service Security | Real TOTP (pair with Google/Microsoft Authenticator), login design vs 5 attacks, JWT tamper test |
| Attacks on Mobiles | SMS inbox with sender + link-domain dissection; café Wi-Fi eavesdropper view (HTTP / HTTPS / VPN, evil twin) |
| Credit Card Frauds | Fraud-analyst transaction console, Luhn validator, tokenization breach demo |
| Organizational Measures | MDM admin console: policies, compliance, quarantine, privacy-aware incident response |

Every topic also has a **Present** button: a fullscreen slide deck generated from the topic (arrow keys to navigate).

Plus: **Cyber Defender** arcade game, Unit II mixed challenge, 6 levels, and 10 badges.

## Adding a new unit / topic

1. Create a topic file in `src/data/unitN/` (copy `src/data/unit2/botnets.js` as a template).
2. List it in `src/data/unitN/index.js` and set `topics` for that unit in `src/data/units.js`.
3. Optional mission: create a component in `src/labs/`, register it in `src/labs/index.js`
   under the topic's `lab.key`, and call `useMission(key).complete('objective-id')` from it.
