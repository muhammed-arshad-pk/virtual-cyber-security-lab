export default {
  sections: [
    {
      title: 'The infection chain',
      points: [
        'Delivery: email attachments, fake updates, malicious ads, cracked software and clone apps.',
        'Execution: the user runs it, and it often installs the real program too, so nothing seems wrong. This is called a dropper.',
        'Persistence: it adds itself to the startup folder, registry Run keys, scheduled tasks or services.',
        'Command & control: it connects out to the attacker, which is how a backdoor is opened.',
        'Actions on objective: stealing passwords, spying, joining a botnet or deploying ransomware.',
      ],
    },
    {
      title: 'How Trojans disguise themselves',
      points: [
        'Double extensions such as invoice.pdf.exe. Windows hides known extensions by default, so it looks like "invoice.pdf".',
        'Icon spoofing: a program can use a PDF or Word icon.',
        'Typosquatted download sites (g00gle-chrome-download.com) and fake "official" pages.',
        'Malicious ads placed above real results in search engines.',
        'Fake reviews, and clone apps with names almost identical to popular ones.',
      ],
    },
    {
      title: 'Verify before you trust',
      points: [
        'Check the digital signature: right-click the file → Properties → Digital Signatures, and confirm the publisher name.',
        'Compare the SHA-256 checksum with the one published by the vendor. In PowerShell: Get-FileHash file.exe -Algorithm SHA256. Or use the Checksum Verifier in this mission.',
        'Turn on File Explorer → View → "File name extensions" so double extensions are visible.',
        'Scan suspicious files with your antivirus. Don’t upload confidential documents to public scanners.',
      ],
    },
    {
      title: 'If you think you’re infected',
      points: [
        'Disconnect from the network (Wi-Fi off, cable out) to cut the attacker’s connection.',
        'Don’t log in to banking or email on that device.',
        'Run a full scan, ideally Microsoft Defender Offline, and check startup items.',
        'From a clean device, change your passwords and enable MFA.',
        'If unsure, restore from a clean backup or reinstall the OS. Report incidents to cybercrime.gov.in.',
      ],
    },
  ],
  cases: [
    { year: '1989', title: 'AIDS Trojan', text: 'Floppy disks posted to attendees of a WHO AIDS conference contained a Trojan that hid files and demanded payment. It is considered the first ransomware.' },
    { year: '2007', title: 'Zeus', text: 'A banking Trojan spread by phishing and drive-by downloads that stole millions in online banking fraud.' },
    { year: '2014', title: 'Emotet', text: 'Began as a banking Trojan and grew into "malware-as-a-service", delivering other malware for criminal groups until its 2021 takedown.' },
    { year: '2017', title: 'Joker malware', text: 'Repeatedly found hidden in Google Play apps. It secretly subscribed victims to paid premium services.' },
  ],
  myths: [
    { myth: 'Trojans spread by themselves like viruses.', fact: 'Trojans do not self-replicate. They rely on tricking you into installing them.' },
    { myth: 'If the program works, it’s safe.', fact: 'Many Trojans install the real program too, so you never notice the hidden payload.' },
    { myth: 'Apps from official stores are always safe.', fact: 'They are much safer, but malicious apps slip through (Joker), so still check the publisher, reviews and permissions.' },
  ],
  law: [
    { title: 'IT Act Sec 43(c)', text: 'Introducing any computer contaminant or virus into a system without permission.' },
    { title: 'IT Act Sec 66, 66C, 66D', text: 'Fraudulent access, identity theft and cheating by personation using computer resources.' },
    { title: 'Copyright Act Sec 63B', text: 'Knowingly using an infringing (pirated) copy of a computer program is an offence, so "cracked" software is risky legally as well as technically.' },
  ],
  examNotes: [
    'Trojan = malware disguised as legitimate software. It does not self-replicate.',
    'Backdoor = hidden access that bypasses authentication, often installed by a Trojan.',
    'Types: RAT, banking Trojan, downloader/dropper, fake antivirus, spy Trojan, ransomware dropper.',
    'Warning signs: unknown programs, startup entries, disabled antivirus, remote activity.',
    'Prevention: official sources, verified publishers, no cracks, updates, antivirus, checksum checks.',
    'Response: isolate → scan → clean → change passwords from a clean device → report.',
  ],
  extraQuiz: [
    {
      q: 'Why is a file named "invoice.pdf.exe" dangerous?',
      options: ['PDFs are always dangerous', 'It is actually an executable program disguised as a PDF', 'The name is too long', 'It is a picture'],
      answer: 1,
      explain: 'Only the last extension counts. ".exe" means it is a program.',
    },
    {
      q: 'What does matching a file’s SHA-256 checksum with the vendor’s value prove?',
      options: ['The file is free', 'The file is exactly the one the vendor published and has not been modified', 'The file is small', 'The file has no bugs'],
      answer: 1,
      explain: 'Even a one-byte change gives a totally different hash.',
    },
    {
      q: 'Which 1989 Trojan is considered the first ransomware?',
      options: ['Mirai', 'AIDS Trojan', 'Zeus', 'Pegasus'],
      answer: 1,
      explain: 'It was distributed on floppy disks and demanded payment to restore access.',
    },
  ],
};
