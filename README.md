# LUCID PROTOCOL // Cryptographic Core

<p align="center">
  <img src="https://img.shields.io/badge/Status-Active-brightgreen.svg" alt="Status">
  <img src="https://img.shields.io/badge/Security-AES--256-blue.svg" alt="Security">
  <img src="https://img.shields.io/badge/Interface-eDEX--UI-purple.svg" alt="Interface">
  <img src="https://img.shields.io/badge/License-MIT-gray.svg" alt="License">
</p>

## Overview

**LUCID PROTOCOL** is a highly immersive, futuristic Symmetric Cryptographic Console. Designed with a deep cyberpunk and eDEX-UI aesthetic, this interface doesn't just look the part—it provides production-grade AES-256 encryption and decryption running entirely in the browser using clean, semantic web technologies.

No bloated frameworks. No fake visual wrappers. Just pure cryptographic logic paired with dynamic acoustic and visual telemetry.

## Core Features

- **AES-256-CBC Encryption**: Real, secure block ciphers powered by the standard `CryptoJS` engine, utilizing robust PBKDF2 key derivation and random initialization vectors.
- **Cyberpunk / eDEX-UI Aesthetics**: High-contrast neon interface, CRT scanline rendering, and authentic monospace grid layouts.
- **Acoustic Synthesizer**: Fully integrated Web Audio API generating synthetic ticks, confirmation sweeps, and warning buzzers for a tactile terminal experience.
- **Real-Time Telemetry**: Live network ping graphs rendered in dynamic SVGs alongside CPU/RAM tracking.
- **Scramble-Lock Decryption**: Custom JavaScript text descrambler that mathematically locks decrypted characters into place for an authentic "hacker" visual experience.

## Technical Architecture

The architecture focuses on absolute performance and zero-dependency DOM manipulation (outside of the cryptographic engine).

* **HTML5**: Semantic and responsive dashboard layout.
* **CSS3**: Native CSS Grid, Flexbox, custom properties (CSS Variables), and CRT shader keyframes.
* **Vanilla ES6+**: 
  * `CryptoEngine` for secure data handling.
  * `CyberSynth` for zero-latency audio synthesis.
  * `TextScramble` for fluid text animation matrices.

## Installation & Usage

LUCID PROTOCOL requires no server-side compilation. Simply serve the directory locally or deploy it statically.

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/lucid.git
   cd lucid
   ```
2. **Serve locally:**
   ```bash
   python3 -m http.server 8000
   ```
   Or use any local web server of your choice (e.g., Live Server, `npx serve`).
3. **Access the terminal:**
   Open `http://localhost:8000` in your browser.

## Operational Directive

1. **Tab Selection**: Switch between `[ENCRYPT]` to package secure payloads and `[DECRYPT]` to extract them.
2. **Payload Entry**: Enter your plaintext or Base64 ciphertext into the main console window.
3. **Key Exchange**: Provide a cryptographically sound Passkey. The system will evaluate the strength of your key in real-time.
4. **Execution**: Click the execution node to begin the cipher block processing. Wait for the compilation bar to reach 100%.

> **Note**: For a demonstration of the decryption capabilities, explore the `DIR_TREE` in the left panel. Accessing `classified_intel.enc` reveals a dummy encrypted log.

---

<p align="center">
  <i>"Security through obscurity is dead. Security through mathematics is absolute."</i><br>
  <b>— LUCID PROTOCOL</b>
</p>
