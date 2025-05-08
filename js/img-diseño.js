
document.addEventListener('DOMContentLoaded', function() {
    // Elementos principales
    const imgContainer = document.querySelector('.img-container');
    const img = document.querySelector('.img-facilitadores');
    const loader = document.querySelector('.loader');
    const zoomOverlay = document.querySelector('.zoom-overlay');
    const zoomImg = document.querySelector('.zoom-img');
    const closeZoom = document.querySelector('#close-zoom');
    
    // Simular carga de imagen
    setTimeout(() => {
        loader.classList.add('hidden');
    }, 1500);
    
    // Control de sonidos
    let soundsEnabled = false;
    const hoverSound = document.getElementById('hover-sound');
    const clickSound = document.getElementById('click-sound');
    
    // Activar sonidos después de la primera interacción del usuario
    document.addEventListener('click', () => {
        soundsEnabled = true;
    }, { once: true });
    
    // Crear elementos decorativos
    createParticles(30);
    createLightSpots(3);
    createParallaxLayers();
    
    // Efecto 3D con movimiento del mouse
    let isHovering = false;
    
    imgContainer.addEventListener('mouseenter', () => {
        isHovering = true;
        playSound(hoverSound);
    });
    
    imgContainer.addEventListener('mouseleave', () => {
        isHovering = false;
        imgContainer.style.transform = 'rotateY(0) rotateX(0)';
    });
    
    imgContainer.addEventListener('mousemove', (e) => {
        if (!isHovering) return;
        
        const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
        const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
        imgContainer.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
    });
    
    // Efecto de clic para zoom
    img.addEventListener('click', function(e) {
        playSound(clickSound);
        
        // Efecto visual
        const flash = document.createElement('div');
        flash.className = 'click-flash';
        imgContainer.appendChild(flash);
        
        imgContainer.classList.add('vibrate');
        createWaveEffect(e);
        
        // Mostrar zoom
        zoomImg.src = img.src;
        zoomOverlay.classList.add('active');
        
        setTimeout(() => {
            flash.style.opacity = '1';
            setTimeout(() => {
                flash.style.opacity = '0';
                setTimeout(() => flash.remove(), 300);
            }, 100);
        }, 10);
        
        setTimeout(() => imgContainer.classList.remove('vibrate'), 300);
    });
    
    // Cerrar zoom
    closeZoom.addEventListener('click', closeZoomOverlay);
    zoomOverlay.addEventListener('click', (e) => {
        if (e.target === zoomOverlay) closeZoomOverlay();
    });
    
    function closeZoomOverlay() {
        playSound(clickSound);
        zoomOverlay.classList.remove('active');
        zoomLevel = 1;
        zoomImg.style.transform = 'scale(1)';
    }
    
    // Efecto de levitación
    let levitateTimeout;
    img.addEventListener('mousedown', () => {
        levitateTimeout = setTimeout(() => {
            imgContainer.classList.add('levitating');
        }, 500);
    });
    
    document.addEventListener('mouseup', () => {
        clearTimeout(levitateTimeout);
        imgContainer.classList.remove('levitating');
    });
    
    // Cambiar tema día/noche
    const themeBtn = document.getElementById('theme-btn');
    themeBtn.addEventListener('click', () => {
        document.body.classList.toggle('day-mode');
        themeBtn.classList.toggle('day-mode');
        themeBtn.innerHTML = document.body.classList.contains('day-mode') ? 
            '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    });
    
    // Controles de zoom
    let zoomLevel = 1;
    const zoomInBtn = document.getElementById('zoom-in');
    const zoomOutBtn = document.getElementById('zoom-out');
    
    zoomInBtn.addEventListener('click', () => {
        if (zoomLevel < 3) {
            zoomLevel += 0.1;
            zoomImg.style.transform = `scale(${zoomLevel})`;
            playSound(clickSound);
        }
    });
    
    zoomOutBtn.addEventListener('click', () => {
        if (zoomLevel > 0.5) {
            zoomLevel -= 0.1;
            zoomImg.style.transform = `scale(${zoomLevel})`;
            playSound(clickSound);
        }
    });



    
   







// Compartir en redes sociales - Versión optimizada
const shareModal = document.getElementById('share-modal');
const shareSpinner = document.getElementById('share-spinner');
const shareSuccess = document.getElementById('share-success');
const shareCloseBtn = document.getElementById('share-close-btn');

// Configuración mejorada para compartir
const socialNetworks = {

    whatsapp: {
        url: () => {
            const message = "¡Mira este increíble diseño interactivo! 🎨✨";
            return `https://wa.me/?text=${encodeURIComponent(message + " " + getPublicUrl())}`;
        },
        color: '#25D366'
    },
    facebook: {
        url: () => {
            const quote = "Echa un vistazo a este proyecto interactivo que creé";
            return `https://www.facebook.com/sharer/sharer.php?u=${getPublicUrl()}&quote=${encodeURIComponent(quote)}`;
        },
        color: '#3b5998'
    },
    twitter: {
        url: () => {
            const tweet = "Acabo de crear este diseño interactivo 👀 #diseño #arte";
            return `https://twitter.com/intent/tweet?url=${getPublicUrl()}&text=${encodeURIComponent(tweet)}`;
        },
        color: '#1DA1F2'
    },
    instagram: {
        url: () => {
            return `https://www.instagram.com/`;
        },
        color: '#E1306C',
        message: "Descarga la imagen y compártela en Instagram 📱"
    }
};

// Función para obtener URL pública (compatible con GitHub Pages)
function getPublicUrl() {
    // Si está en GitHub Pages
    if (window.location.hostname.includes('github.io')) {
        return window.location.href;
    }
    // Si está en localhost (desarrollo)
    return "https://tunombredeusuario.github.io/turepo/"; // REEMPLAZAR CON TU URL REAL
}

// Configurar eventos de los botones
document.getElementById('share-wp').addEventListener('click', () => shareOnPlatform('whatsapp'));
document.getElementById('share-fb').addEventListener('click', () => shareOnPlatform('facebook'));
document.getElementById('share-x').addEventListener('click', () => shareOnPlatform('twitter'));
document.getElementById('share-ig').addEventListener('click', () => shareOnPlatform('instagram'));

// Cerrar modal
shareCloseBtn.addEventListener('click', closeShareModal);
shareModal.addEventListener('click', (e) => e.target === shareModal && closeShareModal());

// Función principal para compartir
function shareOnPlatform(platform) {
    const config = socialNetworks[platform];
    
    // Mostrar spinner con el color de la plataforma
    shareModal.classList.add('active');
    shareSpinner.style.display = 'flex';
    shareSuccess.style.display = 'none';
    document.querySelectorAll('.spinner-circle').forEach(circle => {
        circle.style.backgroundColor = config.color;
    });
    
    // Proceso de compartir (con retardo simulado)
    setTimeout(() => {
        shareSpinner.style.display = 'none';
        shareSuccess.style.display = 'flex';
        
        if (platform === 'instagram') {
            // Manejo especial para Instagram
            setTimeout(() => {
                alert(config.message || "Instagram requiere compartir manualmente");
                closeShareModal();
            }, 5000);
        } else {

            // Abrir enlace de compartir
            window.open(config.url(), '_blank');
            setTimeout(closeShareModal, 10000);
        }
    }, 5000);
}

function closeShareModal() {
    shareModal.classList.remove('active');
}










// Cerrar modal al hacer clic fuera del contenido
shareModal.addEventListener('click', (e) => {
    if (e.target === shareModal) {
        shareModal.classList.remove('active');
    }
});


















    
    // Efecto tilt avanzado
    let lastMoveTime = 0;
    let lastX = 0;
    let lastY = 0;
    
    imgContainer.addEventListener('mousemove', (e) => {
        const now = Date.now();
        if (now - lastMoveTime > 100) {
            const deltaX = Math.abs(e.clientX - lastX);
            const deltaY = Math.abs(e.clientY - lastY);
            const speed = deltaX + deltaY;
            
            if (speed > 50) {
                imgContainer.classList.add('tilt-effect');
                setTimeout(() => {
                    imgContainer.classList.remove('tilt-effect');
                }, 1000);
            }
            
            lastMoveTime = now;
            lastX = e.clientX;
            lastY = e.clientY;
        }
    });
    
    // Soporte para touch
    imgContainer.addEventListener('touchstart', handleTouch);
    imgContainer.addEventListener('touchmove', handleTouch);
    
    function handleTouch(e) {
        e.preventDefault();
        const touch = e.touches[0];
        const mouseEvent = new MouseEvent(e.type, {
            clientX: touch.clientX,
            clientY: touch.clientY
        });
        imgContainer.dispatchEvent(mouseEvent);
    }
    
    // Función para crear efecto de ondas
    function createWaveEffect(e) {
        const rect = img.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        for (let i = 0; i < 3; i++) {
            const wave = document.createElement('div');
            wave.className = 'wave-effect';
            wave.style.left = `${x}px`;
            wave.style.top = `${y}px`;
            
            img.appendChild(wave);
            
            setTimeout(() => {
                wave.style.transition = 'all 1s ease-out';
                wave.style.transform = 'scale(2)';
                wave.style.opacity = '0';
                
                setTimeout(() => wave.remove(), 1000);
            }, i * 200);
        }
    }
    
    // Función para crear partículas
    function createParticles(count) {
        const colors = ['#00ffff', '#ff00ff', '#ffff00', '#ffffff', '#00ff00'];
        
        for (let i = 0; i < count; i++) {
            const particle = document.createElement('div');
            particle.className = 'enhanced-particle';
            
            // Posición y propiedades aleatorias
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            particle.style.width = `${Math.random() * 6 + 2}px`;
            particle.style.height = particle.style.width;
            particle.style.background = colors[Math.floor(Math.random() * colors.length)];
            
            // Animación
            const duration = Math.random() * 20 + 10;
            const delay = Math.random() * 10;
            particle.style.animation = `float ${duration}s infinite ease-in-out ${delay}s`;
            
            // Efecto de parpadeo aleatorio
            if (Math.random() > 0.7) {
                particle.style.animation += `, blink ${Math.random() * 3 + 2}s infinite`;
            }
            
            imgContainer.appendChild(particle);
        }
    }
    
    // Función para crear puntos de luz
    function createLightSpots(count) {
        for (let i = 0; i < count; i++) {
            const light = document.createElement('div');
            light.className = 'light-spot';
            
            // Posición aleatoria
            light.style.left = `${Math.random() * 80 + 10}%`;
            light.style.top = `${Math.random() * 80 + 10}%`;
            
            // Tamaño aleatorio
            const size = Math.random() * 150 + 50;
            light.style.width = `${size}px`;
            light.style.height = `${size}px`;
            
            // Animación
            light.style.animation = `pulse ${Math.random() * 10 + 5}s infinite alternate`;
            
            document.body.appendChild(light);
        }
    }
    
    // Función para crear capas de paralaje
    function createParallaxLayers() {
        const layer1 = document.createElement('div');
        layer1.className = 'parallax-layer layer-1';
        
        const layer2 = document.createElement('div');
        layer2.className = 'parallax-layer layer-2';
        
        document.body.appendChild(layer1);
        document.body.appendChild(layer2);
        
        // Efecto de paralaje con movimiento del mouse
        document.addEventListener('mousemove', (e) => {
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;
            
            layer1.style.transform = `translate(${x * 20}px, ${y * 20}px)`;
            layer2.style.transform = `translate(${x * 40}px, ${y * 40}px)`;
        });
    }
    
    // Función para reproducir sonidos
    function playSound(sound) {
        if (soundsEnabled) {
            sound.currentTime = 0;
            sound.play().catch(e => console.log("Reproducción de sonido no permitida automáticamente"));
        }
    }
});
