// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    // Add animation classes to elements
    const animateElements = document.querySelectorAll('.project-card, .skill-category, .timeline-item, .stat-item');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Contact form handling
const form = document.querySelector('.form');
if (form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Simple validation
        if (!data.name || !data.email || !data.message) {
            alert('Please fill in all fields');
            return;
        }
        
        // For demo purposes, just show a success message
        // In a real implementation, you would send this to a server
        alert('Thank you for your message! I\'ll get back to you soon.');
        this.reset();
    });
}

// Add typing effect to hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect when page loads
document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.hero-title .gradient-text');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 150);
        }, 500);
    }
});

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    if (hero && heroContent) {
        const rate = scrolled * -0.5;
        heroContent.style.transform = `translateY(${rate}px)`;
    }
});

// Add hover effects to skill items
document.querySelectorAll('.skill-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.05)';
        this.style.boxShadow = '0 10px 25px rgba(102, 126, 234, 0.2)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
        this.style.boxShadow = 'none';
    });
});

// Floating animation removed - image stays static

// X-wing Star Wars Animation on page load
document.addEventListener('DOMContentLoaded', () => {
    const xwingContainer = document.getElementById('xwing-container');
    const xwing = document.querySelector('.xwing');
    const xwing2 = document.getElementById('xwing-2');
    const xwing3 = document.getElementById('xwing-3');
    
    if (xwingContainer && xwing) {
        // Create audio context for sound effects
        let audioContext;
        let engineSound;
        
        // Initialize Web Audio API
        const initAudio = () => {
            try {
                audioContext = new (window.AudioContext || window.webkitAudioContext)();
                
                // Create engine sound effect
                const createEngineSound = () => {
                    const oscillator = audioContext.createOscillator();
                    const gainNode = audioContext.createGain();
                    const filter = audioContext.createBiquadFilter();
                    
                    oscillator.connect(filter);
                    filter.connect(gainNode);
                    gainNode.connect(audioContext.destination);
                    
                    oscillator.frequency.setValueAtTime(80, audioContext.currentTime);
                    oscillator.frequency.exponentialRampToValueAtTime(120, audioContext.currentTime + 1);
                    oscillator.frequency.exponentialRampToValueAtTime(40, audioContext.currentTime + 4);
                    
                    filter.frequency.setValueAtTime(400, audioContext.currentTime);
                    filter.Q.setValueAtTime(1, audioContext.currentTime);
                    
                    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
                    gainNode.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 0.5);
                    gainNode.gain.linearRampToValueAtTime(0.05, audioContext.currentTime + 3);
                    gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 4);
                    
                    oscillator.start(audioContext.currentTime);
                    oscillator.stop(audioContext.currentTime + 4);
                };
                
                engineSound = createEngineSound;
            } catch (e) {
                console.log('Web Audio API not supported');
            }
        };
        
        // Show the X-wing container
        setTimeout(() => {
            xwingContainer.style.opacity = '1';
            
            // Initialize audio on first user interaction
            if (audioContext && audioContext.state === 'suspended') {
                audioContext.resume();
            }
            
            // Play engine sound if available
            if (engineSound) {
                engineSound();
            }
            
            // Start the flying animation for main X-wing
            xwing.style.animation = 'xwing-fly 4s ease-out forwards';
            
            // Start squadron X-wings with delays
            setTimeout(() => {
                if (xwing2) {
                    xwing2.style.animation = 'xwing-fly-2 5s ease-out forwards';
                }
            }, 300);
            
            setTimeout(() => {
                if (xwing3) {
                    xwing3.style.animation = 'xwing-fly-3 5s ease-out forwards';
                }
            }, 600);
            
            // Trigger laser effects
            setTimeout(() => {
                const lasers = document.querySelectorAll('.laser');
                lasers.forEach((laser, index) => {
                    setTimeout(() => {
                        laser.style.opacity = '1';
                        laser.style.animation = `laser-fire 0.8s ease-out`;
                    }, index * 200);
                });
            }, 1500);
            
            // Add screen shake effect during laser fire
            setTimeout(() => {
                document.body.style.animation = 'screen-shake 0.5s ease-in-out';
                setTimeout(() => {
                    document.body.style.animation = '';
                }, 500);
            }, 2000);
            
            // Fade out the container
            xwingContainer.style.animation = 'xwing-container-fade 5s ease-out forwards';
            
            // Remove the element after animation completes
            setTimeout(() => {
                xwingContainer.remove();
            }, 5000);
            
        }, 500); // Small delay before X-wing appears
        
        // Initialize audio system
        initAudio();
        
        // Add click event to trigger X-wing on demand (Easter egg)
        let xwingClickCount = 0;
        document.addEventListener('click', (e) => {
            if (e.ctrlKey && e.shiftKey) {
                xwingClickCount++;
                if (xwingClickCount >= 3) {
                    triggerXwingSequence();
                    xwingClickCount = 0;
                }
            }
        });
        
        // Function to trigger X-wing sequence manually
        const triggerXwingSequence = () => {
            if (document.getElementById('xwing-container')) return; // Don't create if already exists
            
            // Re-create the X-wing container
            const newContainer = xwingContainer.cloneNode(true);
            newContainer.style.opacity = '0';
            document.body.appendChild(newContainer);
            
            // Reset animations
            const newXwings = newContainer.querySelectorAll('.xwing');
            newXwings.forEach(wing => {
                wing.style.animation = '';
            });
            
            // Trigger the sequence again
            setTimeout(() => {
                newContainer.style.opacity = '1';
                // ... animation logic here
            }, 100);
        };
    }
});

// Add progress bar for page scroll
const progressBar = document.createElement('div');
progressBar.style.position = 'fixed';
progressBar.style.top = '0';
progressBar.style.left = '0';
progressBar.style.width = '0%';
progressBar.style.height = '3px';
progressBar.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
progressBar.style.zIndex = '9999';
progressBar.style.transition = 'width 0.1s ease';
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    progressBar.style.width = scrolled + '%';
}); 