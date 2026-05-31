/**
 * eDEX-UI // Symmetric Cryptographic Console
 * Core Application Engine
 * Protocol: LUCID PROTOCOL
 */

// ==========================================
// 1. AUDIOSYNTH ENGINE (WEB AUDIO API)
// ==========================================
class CyberSynth {
    constructor() {
        this.ctx = null;
        this.muted = false;
        this.initialized = false;
    }

    init() {
        if (this.initialized) return;
        try {
            this.ctx = new (window.AudioContext || window.webkitAudioContext)();
            this.initialized = true;
            console.log("CyberSynth: Web Audio API context active.");
        } catch (e) {
            console.warn("CyberSynth: Web Audio API not supported in this browser.", e);
        }
    }

    toggleMute() {
        this.muted = !this.muted;
        this.playClick();
        return this.muted;
    }

    // High speed retro digital tick for typing
    playTick() {
        if (this.muted) return;
        this.init();
        if (!this.ctx) return;

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.type = 'sine';
        osc.frequency.setValueAtTime(1400 + Math.random() * 200, this.ctx.currentTime);
        gain.gain.setValueAtTime(0.008, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.03);

        osc.start();
        osc.stop(this.ctx.currentTime + 0.04);
    }

    // Standard electronic selection click
    playClick() {
        if (this.muted) return;
        this.init();
        if (!this.ctx) return;

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.type = 'square';
        osc.frequency.setValueAtTime(650, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(250, this.ctx.currentTime + 0.08);
        gain.gain.setValueAtTime(0.03, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.1);

        osc.start();
        osc.stop(this.ctx.currentTime + 0.12);
    }

    // Interactive hover hum
    playHover() {
        if (this.muted) return;
        this.init();
        if (!this.ctx) return;

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.type = 'sine';
        osc.frequency.setValueAtTime(880, this.ctx.currentTime);
        gain.gain.setValueAtTime(0.015, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.05);

        osc.start();
        osc.stop(this.ctx.currentTime + 0.06);
    }

    // Rising electronic swipe on successful operations
    playSuccessSwipe() {
        if (this.muted) return;
        this.init();
        if (!this.ctx) return;

        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(300, now);
        osc.frequency.exponentialRampToValueAtTime(1500, now + 0.35);

        gain.gain.setValueAtTime(0.04, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.4);

        osc.start(now);
        osc.stop(now + 0.42);

        // Harmonious confirmation note after sweep
        setTimeout(() => {
            if (this.muted) return;
            const subOsc = this.ctx.createOscillator();
            const subGain = this.ctx.createGain();
            subOsc.connect(subGain);
            subGain.connect(this.ctx.destination);
            subOsc.type = 'sine';
            subOsc.frequency.setValueAtTime(1200, this.ctx.currentTime);
            subGain.gain.setValueAtTime(0.025, this.ctx.currentTime);
            subGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.2);
            subOsc.start();
            subOsc.stop(this.ctx.currentTime + 0.22);
        }, 320);
    }

    // Heavy glitch warning buzzer for errors/invalid validations
    playWarningBuzz() {
        if (this.muted) return;
        this.init();
        if (!this.ctx) return;

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(130, this.ctx.currentTime);
        osc.frequency.linearRampToValueAtTime(80, this.ctx.currentTime + 0.35);

        gain.gain.setValueAtTime(0.07, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.4);

        osc.start();
        osc.stop(this.ctx.currentTime + 0.42);
    }
}

const Audio = new CyberSynth();


// ==========================================
// 2. TEXT SCRAMBLE ENGINE
// ==========================================
class TextScramble {
    constructor(el) {
        this.el = el;
        // Cyber characters for matrix/scramble effect
        this.chars = '!<>-_\\/[]{}—=+*^?#________0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        this.update = this.update.bind(this);
    }

    setText(newText) {
        const oldText = this.el.innerText || '';
        const length = Math.max(oldText.length, newText.length);
        const promise = new Promise((resolve) => this.resolve = resolve);
        this.queue = [];
        
        for (let i = 0; i < length; i++) {
            const from = oldText[i] || '';
            const to = newText[i] || '';
            // Offset start times so characters resolve progressively
            const start = Math.floor(Math.random() * 20);
            const end = start + Math.floor(Math.random() * 25);
            this.queue.push({ from, to, start, end, char: '' });
        }
        
        cancelAnimationFrame(this.frameRequest);
        this.frame = 0;
        this.update();
        return promise;
    }

    update() {
        let output = '';
        let complete = 0;
        
        for (let i = 0, n = this.queue.length; i < n; i++) {
            let { from, to, start, end, char } = this.queue[i];
            
            if (this.frame >= end) {
                complete++;
                output += `<span class="scramble-text-resolved">${to}</span>`;
            } else if (this.frame >= start) {
                if (!char || Math.random() < 0.28) {
                    char = this.randomChar();
                    this.queue[i].char = char;
                }
                output += `<span class="scramble-placeholder">${char}</span>`;
            } else {
                output += from;
            }
        }
        
        this.el.innerHTML = output;
        
        if (complete === this.queue.length) {
            this.resolve();
        } else {
            this.frameRequest = requestAnimationFrame(this.update);
            this.frame++;
        }
    }

    randomChar() {
        return this.chars[Math.floor(Math.random() * this.chars.length)];
    }
}


// ==========================================
// 3. CRYPTOGRAPHY CORE (AES-256 ENGINE)
// ==========================================
const CryptoEngine = {
    // Encrypt Plaintext -> Ciphertext (Base64)
    encrypt(plaintext, passkey) {
        try {
            if (!plaintext) throw new Error("Null plain text payload.");
            if (!passkey) throw new Error("Passkey validation failed.");
            
            // Standard secure AES-256 encryption via CryptoJS
            // Internally manages salt derivation, IV initialization, and returns OpenSSL compatible cipher block formats.
            const cipher = CryptoJS.AES.encrypt(plaintext, passkey);
            return cipher.toString();
        } catch (e) {
            console.error("CryptoEngine.encrypt Error: ", e);
            throw e;
        }
    },

    // Decrypt Ciphertext (Base64) -> Plaintext
    decrypt(ciphertext, passkey) {
        try {
            if (!ciphertext) throw new Error("Empty payload sequence.");
            if (!passkey) throw new Error("Invalid decryption key.");

            const bytes = CryptoJS.AES.decrypt(ciphertext, passkey);
            const plaintext = bytes.toString(CryptoJS.enc.Utf8);
            
            // If bytes structure yields null/corrupted string, decryption failed
            if (!plaintext) {
                throw new Error("Corrupted byte alignment or incorrect key signature.");
            }
            return plaintext;
        } catch (e) {
            console.error("CryptoEngine.decrypt Error: ", e);
            throw e;
        }
    }
};


// ==========================================
// 4. MOCK DATA & ACTIVE TELEMETRY
// ==========================================
const MockSystem = {
    // Files inside the directory browser structure
    files: {
        "aes.txt": `/* SECURE AES ALGORITHM DEFINITION */
const algorithm = "AES-256-CBC";
const hashIterations = 1000;
const blockSizeBytes = 16;
const keySizeBits = 256;

// AES CBC employs salt, IV, and cipher feedback.
console.log("Core AES initialized.");`,
        
        "salt.txt": `/* SECURE KEY DERIVATION SCHEME */
const KDF = "PBKDF2-SHA256";
const iterations = 10000;
const saltLengthBytes = 16;

function deriveSecretKey(passphrase, salt) {
    return CryptoJS.PBKDF2(passphrase, salt, {
        keySize: 256 / 32,
        iterations: iterations
    });
}`,

        "classified.txt": "", // Populated dynamically in init() with encrypted intel

        "credentials.txt": `U2FsdGVkX18mN4kF7j3S0WJleB0x1W5vOG9mMTIzNDU2Nzg5MA==`, // Dummy cipher

        "readme.txt": `# eDEX-UI // CRYPTOGRAPHIC CORE

Futuristic symmetric AES-256 secure communication node.
Developed under LUCID PROTOCOL

## OPERATIONAL DIRECTIVE
1. Select tab Mode: [ENCRYPT] to package payloads, [DECRYPT] to extract payloads.
2. Enter plain text or valid cipher text into target fields.
3. Input cryptographically sound secret key.
4. Execute terminal compiler pipeline.

*ALERT*: Clicking "classified_intel.enc" in the vault directory retrieves a secured network log. Try using passkey: "lucid" to decrypt.`
    },

    // Process lists for the side grid panel
    processes: [
        { name: "crypt-core.bin", pid: 8201 },
        { name: "entropy-daemon", pid: 3122 },
        { name: "network-handshake", pid: 9024 },
        { name: "lucid-firewall", pid: 1403 },
        { name: "aes-salt-gen", pid: 7490 },
        { name: "crt-renderer.exe", pid: 4899 }
    ]
};


// ==========================================
// 5. APPLICATION MASTERCONTROLLER
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    // --- DOM Elements ---
    const tabEncrypt = document.getElementById("tab-encrypt");
    const tabDecrypt = document.getElementById("tab-decrypt");
    const labelMessage = document.getElementById("input-message-label");
    const inputMessage = document.getElementById("input-message");
    const secretKey = document.getElementById("secret-key");
    const btnToggleVisibility = document.getElementById("toggle-key-visibility");
    const actionBtn = document.getElementById("action-btn");
    const actionIcon = document.getElementById("action-icon");
    const actionText = document.getElementById("action-text");
    const outputContainer = document.getElementById("output-container");
    const outputText = document.getElementById("output-text");
    const btnCopyOutput = document.getElementById("btn-copy-output");
    const keyStrengthBadge = document.getElementById("key-strength-badge");
    const soundBtn = document.getElementById("sound-btn");
    const soundIcon = document.getElementById("sound-icon");
    const consoleProgressFill = document.getElementById("console-progress-fill");
    
    // Ambient metrics
    const cpuBar = document.getElementById("cpu-bar");
    const cpuTemp = document.getElementById("cpu-temp");
    const memBar = document.getElementById("mem-bar");
    const memUsage = document.getElementById("mem-usage");
    const pingText = document.getElementById("ping-text");
    const pingVal = document.getElementById("ping-val");
    const pingPath = document.getElementById("ping-path");
    const pingPathFill = document.getElementById("ping-path-fill");
    const logStream = document.getElementById("log-stream");
    const processList = document.getElementById("process-list");
    const clockTime = document.getElementById("header-clock");
    const clockDate = document.getElementById("header-date");
    
    // Core parameters
    let currentMode = "encrypt"; // 'encrypt' or 'decrypt'
    let progressTimer = null;
    let isProcessing = false;
    let textScrambler = new TextScramble(outputText);

    // Dynamic encryption of easter egg classified text for "lucid" key
    const secretIntelText = "DECRYPTED INTEL [NODE_SECURE]: Operation Antigravity is online. All protocols operational. Lucent systems verified. AES-256 cryptographic handshakes are holding structurally secure. End log.";
    MockSystem.files["classified.txt"] = CryptoEngine.encrypt(secretIntelText, "lucid");

    // --- Audio Sound Initializations ---
    // User must click around to unlock AudioContext standard browser security policies.
    const addSoundTrigger = (el, type) => {
        el.addEventListener("mouseenter", () => {
            if (!isProcessing) Audio.playHover();
        });
        el.addEventListener("click", () => {
            if (type === "click") Audio.playClick();
        });
    };

    // Apply sounds to interactive components
    document.querySelectorAll(".mode-tab, .cyber-btn, .btn-action-small, .tree-item, .btn-toggle-visibility, .footer-sound-btn")
        .forEach(el => addSoundTrigger(el, "hover"));

    inputMessage.addEventListener("input", () => Audio.playTick());
    secretKey.addEventListener("input", () => {
        Audio.playTick();
        evaluateKeyStrength();
    });

    // Muted Controller
    soundBtn.addEventListener("click", () => {
        const isMuted = Audio.toggleMute();
        if (isMuted) {
            soundBtn.classList.remove("engaged");
            soundBtn.innerHTML = `<i class="fa-solid fa-volume-xmark" id="sound-icon"></i> AUDIO: MUTED`;
        } else {
            soundBtn.classList.add("engaged");
            soundBtn.innerHTML = `<i class="fa-solid fa-volume-high" id="sound-icon"></i> AUDIO: ENGAGED`;
        }
        appendLog("INFO", `Terminal audio system state changed: ${isMuted ? 'OFF' : 'ON'}`);
    });
    // Set engaged state by default
    soundBtn.classList.add("engaged");


    // --- Toggle Secret Key Visibility ---
    btnToggleVisibility.addEventListener("click", () => {
        Audio.playClick();
        if (secretKey.type === "password") {
            secretKey.type = "text";
            btnToggleVisibility.innerHTML = `<i class="fa-solid fa-eye"></i>`;
            appendLog("INFO", "Secret key display masking bypassed.");
        } else {
            secretKey.type = "password";
            btnToggleVisibility.innerHTML = `<i class="fa-solid fa-eye-slash"></i>`;
            appendLog("INFO", "Secret key masked under cryptographic asterisks.");
        }
    });


    // --- Tab Switching Mode (Encrypt/Decrypt) ---
    function setConsoleMode(mode) {
        if (isProcessing) return;
        if (currentMode === mode) return;
        
        currentMode = mode;
        Audio.playClick();

        // Manage active classes on elements
        if (mode === "encrypt") {
            tabEncrypt.classList.add("active");
            tabDecrypt.classList.remove("active");
            
            // Set dynamic CSS Theme variables (Cyan theme for encrypt)
            document.documentElement.style.setProperty('--theme-color', 'var(--neon-cyan)');
            document.documentElement.style.setProperty('--theme-glow', 'var(--neon-cyan-glow)');
            document.documentElement.style.setProperty('--theme-dark', 'var(--neon-cyan-dark)');
            document.documentElement.style.setProperty('--theme-dim', 'var(--neon-cyan-dim)');
            document.documentElement.style.setProperty('--theme-border', 'rgba(0, 240, 255, 0.25)');
            
            // Labels & UI Content Updates
            labelMessage.innerHTML = `<span class="label-accent">&gt;&gt;</span> ENTER PLAINTEXT TO ENCRYPT:`;
            inputMessage.placeholder = "Type secret payload message here...";
            actionIcon.className = "fa-solid fa-lock";
            actionText.innerText = "EXECUTE SECURE ENCRYPTION";
            
            appendLog("INFO", "Cryptographic core configured: TRANSMIT / ENCRYPTION ENGINE ENGAGED.");
        } else {
            tabDecrypt.classList.add("active");
            tabEncrypt.classList.remove("active");

            // Set dynamic CSS Theme variables (Green theme for decrypt)
            document.documentElement.style.setProperty('--theme-color', 'var(--neon-green)');
            document.documentElement.style.setProperty('--theme-glow', 'var(--neon-green-glow)');
            document.documentElement.style.setProperty('--theme-dark', 'var(--neon-green-dark)');
            document.documentElement.style.setProperty('--theme-dim', 'var(--neon-green-dim)');
            document.documentElement.style.setProperty('--theme-border', 'rgba(0, 255, 102, 0.25)');

            // Labels & UI Content Updates
            labelMessage.innerHTML = `<span class="label-accent">&gt;&gt;</span> ENTER CIPHERTEXT (BASE64) TO DECRYPT:`;
            inputMessage.placeholder = "Paste AES-256 encrypted payload structure here...";
            actionIcon.className = "fa-solid fa-lock-open";
            actionText.innerText = "EXECUTE SECURE DECRYPTION";
            
            appendLog("INFO", "Cryptographic core configured: RECEIVE / DECRYPTION ENGINE ENGAGED.");
        }

        // Clean out form textareas on switch
        inputMessage.value = "";
        outputText.innerText = "Awaiting operation execution...";
        btnCopyOutput.disabled = true;
        consoleProgressFill.style.width = "0%";
    }

    tabEncrypt.addEventListener("click", () => setConsoleMode("encrypt"));
    tabDecrypt.addEventListener("click", () => setConsoleMode("decrypt"));


    // --- Passkey Strength Checker ---
    function evaluateKeyStrength() {
        const val = secretKey.value;
        if (!val) {
            keyStrengthBadge.innerText = "KEY_STRENGTH: EMPTY";
            keyStrengthBadge.style.color = "var(--text-dim)";
            return;
        }

        // Simple cryptographic sound strength rules
        let score = 0;
        if (val.length >= 8) score++;
        if (val.length >= 14) score++;
        if (/[A-Z]/.test(val)) score++;
        if (/[0-9]/.test(val)) score++;
        if (/[^A-Za-z0-9]/.test(val)) score++;

        if (score <= 1) {
            keyStrengthBadge.innerText = "KEY_STRENGTH: VULNERABLE";
            keyStrengthBadge.style.color = "var(--neon-red)";
        } else if (score <= 3) {
            keyStrengthBadge.innerText = "KEY_STRENGTH: ADEQUATE";
            keyStrengthBadge.style.color = "var(--neon-cyan)";
        } else {
            keyStrengthBadge.innerText = "KEY_STRENGTH: CRYPTO_HARDENED";
            keyStrengthBadge.style.color = "var(--neon-green)";
        }
    }


    // --- Form secure submission (Encrypt / Decrypt Operation) ---
    actionBtn.addEventListener("click", (e) => {
        e.preventDefault();
        if (isProcessing) return;

        const payload = inputMessage.value.trim();
        const key = secretKey.value.trim();

        if (!payload) {
            Audio.playWarningBuzz();
            appendLog("ERROR", "Operation abort: Input payload is blank.");
            highlightInput(inputMessage);
            return;
        }

        if (!key) {
            Audio.playWarningBuzz();
            appendLog("ERROR", "Operation abort: Authorization key required.");
            highlightInput(secretKey);
            return;
        }

        if (key.length < 8) {
            appendLog("WARN", "HACK_RISK: Secret key under 8 characters is mathematically weak.");
        }

        triggerCryptoCompilation(payload, key);
    });

    function highlightInput(el) {
        el.style.borderColor = "var(--neon-red)";
        setTimeout(() => {
            el.style.borderColor = "";
        }, 1500);
    }

    // High fidelity progress compiled visualization simulation
    function triggerCryptoCompilation(payload, key) {
        isProcessing = true;
        actionBtn.disabled = true;
        inputMessage.disabled = true;
        secretKey.disabled = true;
        btnCopyOutput.disabled = true;
        tabEncrypt.style.pointerEvents = "none";
        tabDecrypt.style.pointerEvents = "none";

        let percent = 0;
        consoleProgressFill.style.width = "0%";
        
        appendLog("INFO", `Initializing AES core compilation. Data payload size: ${payload.length} bytes.`);
        
        progressTimer = setInterval(() => {
            percent += Math.floor(Math.random() * 15) + 5;
            if (percent >= 100) {
                percent = 100;
                clearInterval(progressTimer);
                executeCryptography(payload, key);
            }
            consoleProgressFill.style.width = `${percent}%`;
            // Trigger rapid clicks simulating clock ticks of computer compilation
            if (percent < 90) Audio.playTick();
        }, 80);
    }

    function executeCryptography(payload, key) {
        setTimeout(() => {
            try {
                if (currentMode === "encrypt") {
                    const result = CryptoEngine.encrypt(payload, key);
                    
                    // Ciphertext uses generic typewriter animation representing machine inject
                    typewriterOutput(result);
                    Audio.playSuccessSwipe();
                    appendLog("SUCCESS", "Encryption successful! Payload secured in CBC block format.");
                } else {
                    const result = CryptoEngine.decrypt(payload, key);
                    
                    // Plaintext uses scramble animation to visually lock decrypted parameters in
                    textScrambler.setText(result).then(() => {
                        isProcessing = false;
                        actionBtn.disabled = false;
                        inputMessage.disabled = false;
                        secretKey.disabled = false;
                        btnCopyOutput.disabled = false;
                        tabEncrypt.style.pointerEvents = "auto";
                        tabDecrypt.style.pointerEvents = "auto";
                    });

                    Audio.playSuccessSwipe();
                    appendLog("SUCCESS", "Decryption signature verified! Scramble lock engaged.");
                }
            } catch (err) {
                Audio.playWarningBuzz();
                appendLog("ERROR", `Compilation error: Decryption hash key failure.`);
                
                // Triggers a visual ERROR scramble overlay
                textScrambler.setText("DECRYPTION_FAILED // AUTH_ERROR // BAD_KEY").then(() => {
                    isProcessing = false;
                    actionBtn.disabled = false;
                    inputMessage.disabled = false;
                    secretKey.disabled = false;
                    btnCopyOutput.disabled = false;
                    tabEncrypt.style.pointerEvents = "auto";
                    tabDecrypt.style.pointerEvents = "auto";
                });
            }
        }, 150);
    }

    // High fidelity ciphertext typewriter effect
    function typewriterOutput(text) {
        let index = 0;
        outputText.innerHTML = "";
        
        // Output very long structures in fast chunks
        const charsPerTick = Math.max(1, Math.floor(text.length / 50));
        
        function type() {
            if (index < text.length) {
                outputText.innerHTML += text.substring(index, index + charsPerTick);
                index += charsPerTick;
                Audio.playTick();
                requestAnimationFrame(type);
            } else {
                outputText.innerHTML = text; // Just to make sure we don't drop tail chars
                isProcessing = false;
                actionBtn.disabled = false;
                inputMessage.disabled = false;
                secretKey.disabled = false;
                btnCopyOutput.disabled = false;
                tabEncrypt.style.pointerEvents = "auto";
                tabDecrypt.style.pointerEvents = "auto";
            }
        }
        type();
    }


    // --- Clipboard Copy Operations ---
    btnCopyOutput.addEventListener("click", () => {
        const textToCopy = outputText.innerText;
        if (!textToCopy || textToCopy.startsWith("Awaiting") || textToCopy.startsWith("DECRYPTION_FAILED")) return;

        navigator.clipboard.writeText(textToCopy).then(() => {
            Audio.playClick();
            const originalText = btnCopyOutput.innerHTML;
            btnCopyOutput.innerHTML = `<i class="fa-solid fa-check"></i> COPIED_SUCCESS`;
            appendLog("SUCCESS", "Payload exported to local user clipboard registry.");
            setTimeout(() => {
                btnCopyOutput.innerHTML = originalText;
            }, 2000);
        }).catch(err => {
            appendLog("ERROR", "Clipboard access refused by host OS.");
        });
    });


    // --- Simulated Directory tree interactions ---
    const treeItems = document.querySelectorAll(".tree-item.file");
    treeItems.forEach(item => {
        item.addEventListener("click", () => {
            const fileName = item.getAttribute("data-file");
            Audio.playClick();

            // Handle active files inside lists
            treeItems.forEach(i => i.classList.remove("active"));
            item.classList.add("active");

            let targetPayload = "";
            if (fileName === "aes.txt") {
                targetPayload = MockSystem.files["aes.txt"];
                setConsoleMode("encrypt");
            } else if (fileName === "salt.txt") {
                targetPayload = MockSystem.files["salt.txt"];
                setConsoleMode("encrypt");
            } else if (fileName === "classified.txt") {
                targetPayload = MockSystem.files["classified.txt"];
                setConsoleMode("decrypt");
            } else if (fileName === "credentials.txt") {
                targetPayload = MockSystem.files["credentials.txt"];
                setConsoleMode("decrypt");
            } else if (fileName === "readme.txt") {
                targetPayload = MockSystem.files["readme.txt"];
                setConsoleMode("encrypt");
            }

            inputMessage.value = targetPayload;
            appendLog("INFO", `Loading filesystem pointer: /root/${fileName} (${targetPayload.length} bytes).`);
        });
    });

    // Expand/Collapse Folders
    const folderToggles = document.querySelectorAll(".tree-item.folder");
    folderToggles.forEach(toggle => {
        toggle.addEventListener("click", () => {
            Audio.playClick();
            const childContainer = toggle.nextElementSibling;
            const chevron = toggle.querySelector(".tree-toggle i");
            const folderIcon = toggle.querySelector(".folder-icon");
            
            if (childContainer.classList.contains("hidden")) {
                childContainer.classList.remove("hidden");
                toggle.classList.add("open");
                chevron.className = "fa-solid fa-chevron-down";
                folderIcon.className = "fa-solid fa-folder-open folder-icon";
            } else {
                childContainer.classList.add("hidden");
                toggle.classList.remove("open");
                chevron.className = "fa-solid fa-chevron-right";
                folderIcon.className = "fa-solid fa-folder folder-icon";
            }
        });
    });


    // ==========================================
    // 6. REALTIME METRICS GRAPH & LOG STREAM
    // ==========================================
    
    // Dynamic network path generation
    const pingPoints = Array(20).fill(20); // standard height Q level
    
    function updatePingGraph() {
        // Shift values to the left and append random new latency
        pingPoints.shift();
        const basePing = 30 + Math.floor(Math.sin(Date.now() / 5000) * 10);
        const dynamicFluctuation = Math.floor(Math.random() * 15);
        const finalPing = basePing + dynamicFluctuation;
        
        pingVal.innerText = `${finalPing} ms`;
        pingText.innerText = `PING: ${finalPing} MS`;
        
        // Normalize ping value to graphic height (max height 40)
        // 20 is average, 40 is max latency, 5 is low latency
        const mappedY = 40 - Math.min(38, Math.max(2, (finalPing / 3)));
        pingPoints.push(mappedY);

        // Build SVG path coordinates
        let pathD = `M 0 ${pingPoints[0]} `;
        for (let i = 1; i < pingPoints.length; i++) {
            const x = i * (200 / (pingPoints.length - 1));
            pathD += `L ${x} ${pingPoints[i]} `;
        }
        
        pingPath.setAttribute("d", pathD);
        
        // Build closed fill paths for gradients
        const fillD = pathD + `L 200 40 L 0 40 Z`;
        pingPathFill.setAttribute("d", fillD);
    }

    // Dynamic process usage lists
    function renderProcesses() {
        processList.innerHTML = "";
        MockSystem.processes.forEach(proc => {
            // Generate standard dynamic CPU metrics
            let baseCpu = 1.2;
            if (proc.name === "crypt-core.bin" && isProcessing) {
                baseCpu = 45 + Math.random() * 20;
            } else {
                baseCpu = Math.random() * 5 + 0.5;
            }
            const displayCpu = baseCpu.toFixed(1);
            
            const row = document.createElement("div");
            row.className = `process-row ${isProcessing && proc.name === "crypt-core.bin" ? 'active' : ''}`;
            row.innerHTML = `
                <span class="process-name">${proc.name}</span>
                <span class="process-pid">[PID:${proc.pid}]</span>
                <span class="process-cpu">${displayCpu}%</span>
            `;
            processList.appendChild(row);
        });
    }

    // System metrics resource bars (CPU & Memory allocation stats)
    function updateMetrics() {
        let cpuTarget = 8 + Math.floor(Math.random() * 5);
        let memTarget = 58 + Math.floor(Math.sin(Date.now() / 15000) * 3);

        if (isProcessing) {
            cpuTarget = 75 + Math.floor(Math.random() * 15);
            memTarget = 68 + Math.floor(Math.random() * 5);
        }

        cpuTemp.innerText = `${cpuTarget + 30}°C`;
        cpuBar.style.width = `${cpuTarget}%`;
        memUsage.innerText = `${memTarget.toFixed(0)}%`;
        memBar.style.width = `${memTarget}%`;
    }

    // Appends beautiful terminal log lines
    function appendLog(level, message) {
        const timeStr = new Date().toLocaleTimeString();
        const row = document.createElement("div");
        row.className = "log-row";
        
        let levelClass = level.toLowerCase();
        
        row.innerHTML = `
            <span class="log-time">[${timeStr}]</span>
            <span class="log-level ${levelClass}">[${level}]</span>
            <span class="log-msg">${message}</span>
        `;
        
        logStream.appendChild(row);
        
        // Scroll to the bottom of terminal log container
        logStream.scrollTop = logStream.scrollHeight;
        
        // Truncate logs if they exceed 50 items to optimize memory
        if (logStream.children.length > 50) {
            logStream.removeChild(logStream.children[0]);
        }
    }

    // Ambient logs random feeder
    const logMessages = [
        "Routing crypt handshake through secure proxy node.",
        "PBKDF2 SHA-256 entropy levels within nominal range.",
        "Scattering matrix keys inside isolated system threads.",
        "Incoming secure websocket heartbeat ping acknowledged.",
        "CRT monitor refresh scan frequencies synchronized.",
        "AES salt arrays checking for standard buffer overflows.",
        "Clean firewall integrity checks completed: 0 threats.",
        "Garbage collection executed. Memory addresses flushed.",
        "Securing active cryptographic memory registers."
    ];

    function feedAmbientLogs() {
        if (isProcessing) return; // Do not interrupt during compilation logs
        if (Math.random() < 0.35) {
            const randMsg = logMessages[Math.floor(Math.random() * logMessages.length)];
            appendLog("INFO", randMsg);
        }
    }

    // Real Digital Clock
    function updateClock() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const date = String(now.getDate()).padStart(2, '0');

        clockTime.innerText = `${hours}:${minutes}:${seconds}`;
        clockDate.innerText = `${year}-${month}-${date}`;
    }


    // --- Initialization Routines ---
    updateClock();
    setInterval(updateClock, 1000);

    // Dynamic metrics ticks
    setInterval(updatePingGraph, 1500);
    setInterval(renderProcesses, 2000);
    setInterval(updateMetrics, 1000);
    setInterval(feedAmbientLogs, 4000);

    // Initial log setups
    appendLog("INFO", "eDEX-UI Secure Terminal Interface Initialized.");
    appendLog("INFO", "Symmetric encryption engine loaded under active AES-256 standards.");
    appendLog("SUCCESS", "System online. Terminal authorization verified.");
    
    // Trigger first metrics render
    updatePingGraph();
    renderProcesses();
    updateMetrics();
});
