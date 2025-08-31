class Terminal {
    constructor() {
        this.terminalInput = document.getElementById('terminal-input');
        this.terminalOutput = document.getElementById('terminal-output');
        this.commandHistory = [];
        this.historyIndex = -1;
        this.initializeTerminal();
    }

    initializeTerminal() {
        // Initial terminal welcome message
        this.terminalOutput.innerHTML = `
            <p class="terminal-info">Welcome to Ubuntu 22.04.3 LTS (GNU/Linux 5.15.0-84-generic x86_64)</p>
            <p class="mb-2">
                <span class="terminal-success">✓</span> System initialized | Last login: ${new Date().toLocaleString()}
            </p>
            <p class="terminal-info mb-2">Type <span class="command">'help'</span> to see available commands</p>
        `;

        this.setupEventListeners();
    }

    setupEventListeners() {
        this.terminalInput.addEventListener('keydown', (e) => this.handleKeydown(e));
    }

    handleKeydown(e) {
        if (e.key === 'Enter') {
            const command = this.terminalInput.value.trim().toLowerCase();
            const currentPrompt = document.createElement('div');
            currentPrompt.innerHTML = `<span class="flex"><span class="terminal-user">omesh</span><span class="terminal-at">@</span><span class="terminal-hostname">dev</span><span class="terminal-path">:~$</span> ${this.terminalInput.value}</span>`;
            this.terminalOutput.appendChild(currentPrompt);
            
            if (command) {
                this.commandHistory.push(command);
                this.historyIndex = this.commandHistory.length;
                this.executeCommand(command);
            }
            this.terminalInput.value = '';
        }
        // Command history navigation
        else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (this.historyIndex > 0) {
                this.historyIndex--;
                this.terminalInput.value = this.commandHistory[this.historyIndex];
            }
        }
        else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (this.historyIndex < this.commandHistory.length - 1) {
                this.historyIndex++;
                this.terminalInput.value = this.commandHistory[this.historyIndex];
            } else {
                this.historyIndex = this.commandHistory.length;
                this.terminalInput.value = '';
            }
        }
    }

    async executeCommand(command) {
        const result = await this.getCommandOutput(command);
        if (result) {
            const commandOutput = document.createElement('div');
            commandOutput.innerHTML = result;
            this.terminalOutput.appendChild(commandOutput);
        }
        this.scrollToBottom();
    }

    scrollToBottom() {
        this.terminalOutput.scrollTop = this.terminalOutput.scrollHeight;
    }

    getCommandOutput(command) {
        const commands = {
            help: () => `Available commands:
                <br><span class="command">System Commands:</span>
                <br>• clear - Clear the terminal
                <br>• ls - List directory contents
                <br>• pwd - Print working directory
                <br>• date - Show current date and time
                <br>• whoami - Display current user
                <br>• neofetch - System information
                <br>
                <br><span class="command">Portfolio Commands:</span>
                <br>• about - Learn about me
                <br>• skills - View my technical skills
                <br>• resume - View my resume
                <br>• resume --download - Download resume as PDF
                <br>• resume --image - Download resume as image
                <br>• projects - See my projects
                <br>• contact - Get my contact info
                <br>• github - Open GitHub profile
                <br>• train - Start neural network training`,

            clear: () => {
                this.terminalOutput.innerHTML = '';
                return '';
            },

            pwd: () => '<span class="terminal-path">/home/omesh/portfolio</span>',

            ls: () => `<span class="terminal-dir">projects/</span>  <span class="terminal-dir">skills/</span>  <span class="terminal-file">about.md</span>  <span class="terminal-file">contact.txt</span>  <span class="terminal-file">resume.pdf</span>`,

            date: () => new Date().toLocaleString(),

            whoami: () => '<span class="terminal-user">omesh</span>',

            about: () => `<div class="terminal-info">
                <pre class="my-2">
╭─────────────────────────────╮
│   AI/ML Developer Profile   │
╰─────────────────────────────╯</pre>
                → <span class="terminal-success">Name:</span> Omesh Thokchom
                <br>→ <span class="terminal-success">Role:</span> AI/ML Developer
                <br>→ <span class="terminal-success">Education:</span> B.Tech CSE Student
                <br>→ <span class="terminal-success">Focus:</span> Deep Learning & Neural Networks
                <br>→ <span class="terminal-success">Status:</span> Actively Learning & Building
            </div>`,

            skills: () => `<div class="my-2">
                <span class="terminal-success">Technical Proficiencies:</span>
                <br>
                <br>[■■■■■■■■■■] Python & Machine Learning
                <br>[■■■■■■■■··] Deep Learning & Neural Networks
                <br>[■■■■■■■■■·] Computer Vision
                <br>[■■■■■■■···] Natural Language Processing
                <br>[■■■■■■■■■·] TensorFlow & PyTorch
                <br>[■■■■■■■■··] Data Analysis & Visualization
            </div>`,

            neofetch: () => `<div class="terminal-info my-2">
                <pre class="terminal-success">
   .-/+oossssoo+/-.           omesh@dev
':+ssssssssssssssssss+:'     -------------------------
-+ssssssssssssssssssyyssss+- OS: Ubuntu 22.04.3 LTS x86_64
.ossssssssssssssssssdMMMNysssso. Host: Portfolio Website
/ssssssssssshdmmNNmmyNMMMMhssssss/ Kernel: 5.15.0-84-generic
+ssssssssshmydMMMMMMMNddddyssssssss+ Uptime: ∞
/sssssssshNMMMyhhyyyyhmNMMMNhssssssss/ Packages: AI, ML, DL
.ssssssssdMMMNhsssssssssshNMMMdssssssss. Shell: JavaScript
+sssshhhyNMMNyssssssssssssyNMMMysssssss+ Theme: Neon Dark
ossyNMMMNyMMhsssssssssssssshmmmhssssssso Memory: 16GB DDR4
ossyNMMMNyMMhsssssssssssssshmmmhssssssso 
+sssshhhyNMMNyssssssssssssyNMMMysssssss+ CPU: Brain @ 4.20GHz
.ssssssssdMMMNhsssssssssshNMMMdssssssss. GPU: RTX 4090 Ti
/sssssssshNMMMyhhyyyyhdNMMMNhssssssss/ IDE: VS Code
+sssssssssdmydMMMMMMMMddddyssssssss+   
/ssssssssssshdmNNNNmyNMMMMhssssss/    
.ossssssssssssssssssdMMMNysssso.     
  -+sssssssssssssssssyyyssss+-      
    ':+ssssssssssssssssss+:'        
        .-/+oossssoo+/-.</pre>
            </div>`,

            train: () => `<div class="terminal-info">
                <br>Initializing Neural Network Training...
                <br>[================] Environment setup complete
                <br>[================] Data preprocessing done
                <br>
                <br>Training Progress:
                <br>Epoch 1/100   - Loss: 1.2534 - Acc: 0.5432 ⏳
                <br>Epoch 25/100  - Loss: 0.8765 - Acc: 0.7123 ⏳
                <br>Epoch 50/100  - Loss: 0.5432 - Acc: 0.8234 ⏳
                <br>Epoch 75/100  - Loss: 0.3210 - Acc: 0.8945 ⏳
                <br>Epoch 100/100 - Loss: 0.1234 - Acc: 0.9567 ✓
                <br>
                <br><span class="terminal-success">Training completed successfully!</span>
            </div>`,

            resume: async (args) => {
                if (args === '--download') {
                    // Create an iframe to properly render the resume with all styles
                    const iframe = document.createElement('iframe');
                    iframe.style.position = 'absolute';
                    iframe.style.left = '-9999px';
                    iframe.style.width = '816px';  // Letter size width
                    iframe.style.height = '1056px'; // Letter size height
                    document.body.appendChild(iframe);
                    
                    // Load resume content
                    const response = await fetch('resume.html');
                    const html = await response.text();
                    
                    // Write the complete HTML to iframe
                    iframe.contentDocument.open();
                    iframe.contentDocument.write(html);
                    iframe.contentDocument.close();
                    
                    // Wait for all resources to load
                    await new Promise(resolve => {
                        iframe.onload = resolve;
                        setTimeout(resolve, 1000); // Fallback timeout
                    });
                    
                    const content = iframe.contentDocument.getElementById('resume-content');

                    // Generate PDF with better options
                    const opt = {
                        margin: [0.5, 0.5],
                        filename: 'omesh-thokchom-resume.pdf',
                        image: { type: 'jpeg', quality: 1 },
                        html2canvas: { 
                            scale: 2,
                            useCORS: true,
                            logging: false,
                            width: 816, // Letter size width at 96 DPI
                            height: 1056, // Letter size height at 96 DPI
                            windowWidth: 816,
                            windowHeight: 1056
                        },
                        jsPDF: { 
                            unit: 'pt', 
                            format: 'letter', 
                            orientation: 'portrait'
                        }
                    };
                    
                    await html2pdf().set(opt).from(content).save();
                    document.body.removeChild(iframe);
                    
                    return '<div class="terminal-success">Downloading resume as PDF...</div>';
                } else if (args === '--image') {
                    // Create an iframe to properly render the resume with all styles
                    const iframe = document.createElement('iframe');
                    iframe.style.position = 'absolute';
                    iframe.style.left = '-9999px';
                    iframe.style.width = '816px';  // Letter size width
                    iframe.style.height = '1056px'; // Letter size height
                    document.body.appendChild(iframe);
                    
                    // Load resume content
                    const response = await fetch('resume.html');
                    const html = await response.text();
                    
                    // Write the complete HTML to iframe
                    iframe.contentDocument.open();
                    iframe.contentDocument.write(html);
                    iframe.contentDocument.close();
                    
                    // Wait for all resources to load
                    await new Promise(resolve => {
                        iframe.onload = resolve;
                        setTimeout(resolve, 1000); // Fallback timeout
                    });
                    
                    const content = iframe.contentDocument.getElementById('resume-content');
                    
                    // Generate image with better options
                    const canvas = await html2canvas(content, {
                        scale: 2,
                        useCORS: true,
                        logging: false,
                        width: 816,
                        height: 1056,
                        windowWidth: 816,
                        windowHeight: 1056,
                        backgroundColor: '#1f2937'
                    });

                    const link = document.createElement('a');
                    link.download = 'omesh-thokchom-resume.png';
                    link.href = canvas.toDataURL('image/png', 1.0);
                    link.click();
                    
                    document.body.removeChild(iframe);
                    return '<div class="terminal-success">Downloading resume as image...</div>';
                } else {
                    window.open('resume.html', '_blank');
                    return '<div class="terminal-success">Opening resume in new tab...</div>';
                }
            }
        };

        // Parse command and arguments
        const [cmd, ...args] = command.split(' ');
        return commands[cmd] ? commands[cmd](args.join(' ')) : `<span class="terminal-error">Command not found: ${command}</span>`;
    }
}

// Initialize terminal when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Terminal();
});
