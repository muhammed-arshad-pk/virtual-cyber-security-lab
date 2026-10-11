import { Cpu } from 'lucide-react';

// Built from unit4/topic.txt and the "Buffer Overflow" mockup. Conceptual and defensive only.
export default {
  slug: 'buffer-overflow',
  number: 1,
  title: 'Buffer Overflow',
  icon: Cpu,
  color: '#f87171',
  difficulty: 'Advanced',
  summary: 'Memory corruption vulnerabilities and secure programming.',
  tagline: 'Understanding memory corruption and secure programming.',
  keywords: ['buffer overflow', 'memory', 'stack', 'heap', 'bounds checking', 'aslr', 'stack canary', 'secure coding'],
  intro: [
    'A buffer is a fixed-size block of memory that a program uses to hold data, like a 16-character box for a username. A buffer overflow happens when a program writes more data into the buffer than it can hold, so the extra data spills into neighbouring memory.',
    'That overwritten memory may hold other variables or control information the program depends on. The result can be a crash, wrong behaviour, or a security vulnerability. Buffer overflows are mostly a problem in languages like C and C++ that don’t check memory boundaries automatically.',
  ],
  definitions: {
    title: 'Key Terms',
    items: [
      { term: 'Buffer', text: 'A fixed-size area of memory reserved to store data temporarily.' },
      { term: 'Bounds checking', text: 'Verifying that data fits before writing it into a buffer.' },
      { term: 'Memory corruption', text: 'Unintended changes to memory contents, leading to crashes or unpredictable behaviour.' },
    ],
  },
  compare: {
    title: 'Stack-based vs Heap-based Overflow',
    left: { title: 'Stack-based', subtitle: 'Function-call memory', points: ['Affects local variables in a function’s stack frame', 'Can corrupt nearby control data such as the return address', 'Mitigated by stack canaries and non-executable stacks'] },
    right: { title: 'Heap-based', subtitle: 'Dynamically allocated memory', points: ['Affects memory allocated at runtime (malloc/new)', 'Can corrupt neighbouring objects or allocator data', 'Mitigated by hardened allocators and safe languages'] },
  },
  flow: {
    title: 'Buffer Overflow Mechanics (Conceptual)',
    steps: [
      { title: 'Excessive input received', text: 'The program receives more data than expected.' },
      { title: 'Boundary exceeded', text: 'No size check, so writing continues past the buffer’s end.' },
      { title: 'Adjacent memory corrupted', text: 'Neighbouring variables or control data are overwritten.' },
      { title: 'Crash or takeover risk', text: 'The program crashes, misbehaves or loses control of its execution flow.' },
    ],
  },
  table: {
    title: 'Causes & Defences',
    columns: ['Cause', 'Example', 'Defence'],
    rows: [
      ['No bounds checking', 'Copying input without checking its length', 'Validate length before every write'],
      ['Unsafe C functions', 'strcpy, strcat, gets, sprintf', 'Use bounded versions: strncpy/strlcpy, snprintf, fgets'],
      ['Incorrect size calculations', 'Off-by-one errors, integer overflow in sizes', 'Careful arithmetic, compiler warnings, code review'],
      ['Trusting external input', 'File, network or user data used directly', 'Input validation and fuzz testing'],
      ['Memory-unsafe language', 'Manual memory management in C/C++', 'Prefer memory-safe languages (Rust, Go, Java, Python) where possible'],
    ],
  },
  cards: {
    title: 'Defensive Programming & Protection',
    items: [
      { title: 'Bounds Checking', text: 'Never write more than the buffer’s size.' },
      { title: 'Safe Functions', text: 'Use length-limited functions such as fgets and snprintf.' },
      { title: 'Compiler Protections', text: 'Enable warnings and hardening flags (e.g. -fstack-protector, FORTIFY_SOURCE).' },
      { title: 'Stack Canaries', text: 'A secret value before control data. If it changes, the program stops safely.' },
      { title: 'ASLR', text: 'Address Space Layout Randomisation places memory at unpredictable addresses.' },
      { title: 'DEP / NX', text: 'Marks data memory as non-executable.' },
    ],
  },
  checklist: {
    title: 'Secure Coding Checklist',
    items: [
      'Check the size of every input before copying it',
      'Avoid gets(); use fgets() with the buffer size',
      'Prefer snprintf over sprintf, and strlcpy/strncpy over strcpy',
      'Turn on all compiler warnings and treat them as errors',
      'Build with stack protection, ASLR and DEP enabled',
      'Run static analysis and fuzz testing',
      'Keep third-party libraries patched',
    ],
  },
  lists: [
    { title: 'Security Risks of Memory Corruption', tone: 'warn', items: ['Program crashes (denial of service)', 'Corrupted data and wrong results', 'Loss of control over execution flow', 'Potential for unauthorised code execution'] },
    { title: 'Prevention & Mitigation', tone: 'good', items: ['Bounds checking and input validation', 'Safe library functions', 'Compiler and OS protections (canaries, ASLR, DEP)', 'Memory-safe languages', 'Code review, static analysis, fuzzing', 'Timely patching'] },
  ],
  caseStudy: {
    title: 'Case Study: The Legacy Network Daemon',
    text: 'An old network service copied incoming request data into a fixed-size buffer without checking its length. Oversized requests corrupted adjacent memory and crashed the service, and security researchers warned it could allow remote takeover. The fix was simple: validate the length before copying, rebuild with modern compiler protections, and deploy the patch everywhere. The lesson is that one missing size check can put a whole server at risk.',
  },
  lab: {
    key: 'u4-buffer',
    title: 'Mission: Memory Buffer Capacity Lab',
    description: 'A visual model of a 16-byte buffer and the memory beside it. Overfill it to see memory corruption, then turn on bounds checking and a stack canary to see how defences stop it. No real program or exploit code is involved.',
    badge: { name: 'Memory Guardian', emoji: '🧠' },
    objectives: [
      { id: 'overflow', label: 'Overflow the buffer and corrupt adjacent memory', xp: 20 },
      { id: 'bounds', label: 'Stop an oversized input with bounds checking', xp: 30 },
      { id: 'canary', label: 'Let a stack canary detect the overflow', xp: 30 },
    ],
  },
  deep: {
    sections: [
      { title: 'Process memory layout (conceptual)', points: ['Code (text) segment: the program’s instructions.', 'Data segments: global and static variables.', 'Heap: memory requested at runtime. It grows as the program allocates more.', 'Stack: function-call information and local variables. Each call gets a "stack frame".', 'A stack frame holds local variables plus control data that tells the CPU where to return when the function finishes.'] },
      { title: 'How modern mitigations help', points: ['Stack canaries detect overwrites of control data before a function returns.', 'ASLR randomises where code and data live, so memory addresses can’t be predicted.', 'DEP/NX prevents data regions from being executed as code.', 'Control-flow integrity checks that jumps go only to legitimate targets.', 'No single mitigation is perfect, so defence in depth combines them with secure coding.'] },
      { title: 'Why memory-safe languages matter', points: ['Languages like Rust, Go, Java, C# and Python check bounds or manage memory automatically.', 'Major vendors have reported that a large share of their serious security bugs are memory-safety issues.', 'Government agencies including CISA have urged a shift to memory-safe languages for new code.'] },
    ],
    cases: [
      { year: '1988', title: 'Morris Worm', text: 'One of the first internet worms spread partly through a buffer overflow in the "fingerd" service, infecting thousands of machines.' },
      { year: '2001', title: 'Code Red', text: 'A worm used a buffer-overflow flaw in Microsoft IIS web servers, affecting hundreds of thousands of systems before patches were applied.' },
      { year: '2003', title: 'SQL Slammer', text: 'A tiny worm exploited a buffer overflow in Microsoft SQL Server and spread worldwide within minutes, even though a patch had been available for months.' },
      { year: '2014', title: 'Heartbleed', text: 'A missing bounds check in OpenSSL let attackers read memory beyond a buffer, exposing secrets on many web servers.' },
    ],
    myths: [
      { myth: 'Buffer overflows are an old, solved problem.', fact: 'Memory-safety bugs are still among the most serious vulnerabilities reported today.' },
      { myth: 'ASLR alone makes overflows harmless.', fact: 'Mitigations raise the bar but must be combined with secure coding and patching.' },
      { myth: 'Only C programmers need to care.', fact: 'Every app depends on libraries and OS components often written in C/C++, so patching matters to everyone.' },
    ],
    law: [
      { title: 'IT Act Sec 43 & 66', text: 'Exploiting a vulnerability to access or damage a system without permission is an offence.' },
      { title: 'Responsible disclosure', text: 'Report vulnerabilities to the vendor or CERT-In (incident@cert-in.org.in) rather than exploiting them.' },
      { title: 'IT Act Sec 43A', text: 'Organisations must follow reasonable security practices, including secure development and patching.' },
    ],
    examNotes: [
      'Buffer overflow = writing more data than a buffer can hold, spilling into adjacent memory.',
      'Causes: no bounds checking, unsafe functions (strcpy, gets), size-calculation errors.',
      'Types: stack-based (local variables, return address) and heap-based (dynamic memory).',
      'Risks: crashes, data corruption, loss of control of execution.',
      'Defences: bounds checking, safe functions, compiler protections, canaries, ASLR, DEP, memory-safe languages.',
      'Examples: Morris Worm (1988), Code Red (2001), SQL Slammer (2003), Heartbleed (2014).',
    ],
    extraQuiz: [
      { q: 'What does ASLR do?', options: ['Encrypts files', 'Randomises memory addresses so they are hard to predict', 'Blocks phishing', 'Speeds up the CPU'], answer: 1, explain: 'Address Space Layout Randomisation makes memory locations unpredictable.' },
      { q: 'Which language feature prevents most buffer overflows?', options: ['Manual memory management', 'Automatic bounds checking in memory-safe languages', 'Global variables', 'Comments'], answer: 1, explain: 'Memory-safe languages check boundaries for you.' },
    ],
  },
  quiz: [
    { q: 'What is a buffer overflow?', options: ['A full hard disk', 'Writing more data into a buffer than it can hold', 'A slow internet connection', 'A screen error'], answer: 1, explain: 'Extra data spills into neighbouring memory.' },
    { q: 'Which C function is unsafe because it doesn’t limit input length?', options: ['fgets', 'gets', 'snprintf', 'strlcpy'], answer: 1, explain: 'gets() can’t know the buffer size and was removed from the C standard.' },
    { q: 'What is the primary target of stack smashing?', options: ['The heap', 'The function’s return address / control data', 'The monitor', 'The keyboard'], answer: 1, explain: 'Overwriting control data can change where the program goes next.' },
    { q: 'What does a stack canary do?', options: ['Sings', 'Detects that control data was overwritten and stops the program safely', 'Speeds up loops', 'Encrypts passwords'], answer: 1, explain: 'A changed canary value reveals an overflow before damage is done.' },
    { q: 'Which is the most fundamental defence?', options: ['Bounds checking every write', 'Bigger monitors', 'More RAM', 'Turning off warnings'], answer: 0, explain: 'If data never exceeds the buffer, there is no overflow.' },
  ],
};
