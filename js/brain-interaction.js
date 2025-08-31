let isAbsorbing = false;
let absorptionAnimationFrame = null;
let shakeTimeout = null;

document.addEventListener('DOMContentLoaded', () => {
    const brainContainer = document.getElementById('brain-container');
    const brainAnimation = document.getElementById('brain-animation');

    // Add click event listener
    brainContainer.addEventListener('click', toggleAbsorption);

    function toggleAbsorption() {
        isAbsorbing = !isAbsorbing;
        
        if (isAbsorbing) {
            startAbsorption();
        } else {
            stopAbsorption();
        }
    }

    function startAbsorption() {
        // Start the absorption animation
        animateParticleAbsorption();
        
        // Add shaking animation class
        brainContainer.classList.add('shake-animation');
        
        // Add glow effect
        brainContainer.style.filter = 'drop-shadow(0 0 10px #06b6d4) drop-shadow(0 0 20px #a855f7)';
        
        // Increase animation speed
        if (brainAnimation) {
            brainAnimation.speed = 1.5;
        }

        // Shake animation function
        function shake() {
            if (!isAbsorbing) return;

            const randomX = (Math.random() - 0.5) * 8;
            const randomY = (Math.random() - 0.5) * 8;
            brainContainer.style.transform = `translate(${randomX}px, ${randomY}px)`;

            shakeTimeout = setTimeout(shake, 50);
        }

        shake();
    }

    function stopAbsorption() {
        // Stop the absorption animation
        cancelAnimationFrame(absorptionAnimationFrame);
        
        // Clear shake timeout
        if (shakeTimeout) {
            clearTimeout(shakeTimeout);
        }
        
        // Remove shaking animation and reset position
        brainContainer.classList.remove('shake-animation');
        brainContainer.style.transform = 'none';
        
        // Remove glow effect
        brainContainer.style.filter = 'none';
        
        // Reset animation speed
        if (brainAnimation) {
            brainAnimation.speed = 1;
        }

        // Release particles with burst effect
        releaseParticles();
    }

    function animateParticleAbsorption() {
        if (!window.pJSDom?.[0]?.pJS) return;
        
        const pJS = window.pJSDom[0].pJS;
        const particles = pJS.particles.array;
        const brainRect = brainContainer.getBoundingClientRect();
        const centerX = brainRect.left + brainRect.width / 2;
        const centerY = brainRect.top + brainRect.height / 2;

        particles.forEach(particle => {
            // Calculate direction to brain center
            const dx = centerX - particle.x;
            const dy = centerY - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < brainRect.width) {
                // Particles very close to the brain become more transparent
                particle.opacity = Math.max(0.1, distance / brainRect.width);
            }
            
            // Update particle velocity based on distance
            const factor = 0.05;
            particle.vx += (dx / distance) * factor;
            particle.vy += (dy / distance) * factor;

            // Add spiral effect
            const angle = Math.atan2(dy, dx);
            const spiralFactor = 0.2;
            particle.vx += Math.cos(angle + Math.PI / 2) * spiralFactor;
            particle.vy += Math.sin(angle + Math.PI / 2) * spiralFactor;

            // Add pulsing effect to particles
            particle.radius = particle.initialRadius * (1 + 0.2 * Math.sin(Date.now() / 200));
        });

        if (isAbsorbing) {
            absorptionAnimationFrame = requestAnimationFrame(animateParticleAbsorption);
        }
    }

    function releaseParticles() {
        if (!window.pJSDom?.[0]?.pJS) return;
        
        const pJS = window.pJSDom[0].pJS;
        const particles = pJS.particles.array;
        const brainRect = brainContainer.getBoundingClientRect();
        const centerX = brainRect.left + brainRect.width / 2;
        const centerY = brainRect.top + brainRect.height / 2;

        // Burst effect for existing particles
        particles.forEach(particle => {
            const dx = particle.x - centerX;
            const dy = particle.y - centerY;
            const angle = Math.atan2(dy, dx);
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            // Stronger burst for closer particles
            const burstForce = 15 * (1 - Math.min(1, distance / 200));
            particle.vx = Math.cos(angle) * burstForce;
            particle.vy = Math.sin(angle) * burstForce;
            
            // Reset opacity
            particle.opacity = particle.initialOpacity || 0.6;
        });

        // Create additional burst particles
        for (let i = 0; i < 15; i++) {
            const angle = (i / 15) * Math.PI * 2;
            const speed = 5 + Math.random() * 5;
            
            pJS.particles.array.push({
                x: centerX,
                y: centerY,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                radius: 2 + Math.random() * 2,
                color: Math.random() > 0.5 ? '#06b6d4' : '#a855f7',
                opacity: 1,
                initialOpacity: 1
            });
        }
    }
});

// Update Particles.js configuration for better interaction
window.particlesJS('particles-js', {
    particles: {
        number: {
            value: 100,
            density: {
                enable: true,
                value_area: 800
            }
        },
        color: {
            value: ['#06b6d4', '#a855f7']
        },
        shape: {
            type: 'circle'
        },
        opacity: {
            value: 0.6,
            random: true,
            anim: {
                enable: true,
                speed: 1,
                opacity_min: 0.1,
                sync: false
            }
        },
        size: {
            value: 3,
            random: true
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: '#06b6d4',
            opacity: 0.3,
            width: 1
        },
        move: {
            enable: true,
            speed: 2,
            direction: 'none',
            random: true,
            straight: false,
            out_mode: 'out',
            bounce: false,
            attract: {
                enable: true,
                rotateX: 600,
                rotateY: 1200
            }
        }
    },
    interactivity: {
        detect_on: 'canvas',
        events: {
            onhover: {
                enable: true,
                mode: 'grab'
            },
            onclick: {
                enable: true,
                mode: 'push'
            },
            resize: true
        },
        modes: {
            grab: {
                distance: 140,
                line_linked: {
                    opacity: 0.8
                }
            }
        }
    },
    retina_detect: true
});
