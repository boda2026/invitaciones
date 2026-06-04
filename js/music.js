import CONFIG from './config.js';

// ============================================================================
// STATE & SCOPE (Variables globales del módulo)
// ============================================================================
let audio = null;
let musicBtn = null;
let isPlaying = false;
let fadeRaf = null;

// ============================================================================
// MOTOR DE MÚSICA (Lógica del reproductor y efectos)
// ============================================================================

/**
 * Controla la transición suave del volumen (Fade In / Fade Out)
 */
function fadeTo(targetVol, duration, onDone) {
  if (!audio) return;
  if (fadeRaf) cancelAnimationFrame(fadeRaf);
  
  const start    = performance.now();
  const startVol = audio.volume;
  const delta    = targetVol - startVol;

  function step(now) {
    const t = Math.min((now - start) / duration, 1);
    audio.volume = Math.max(0, Math.min(1, startVol + delta * t));
    
    if (t < 1) {
      fadeRaf = requestAnimationFrame(step);
    } else {
      fadeRaf = null;
      if (onDone) onDone();
    }
  }
  fadeRaf = requestAnimationFrame(step);
}

/**
 * Inicia la reproducción de la música con un efecto Fade-In masivo.
 * Al ejecutarse dentro del evento 'click' del acceso, salta el bloqueo de autoplay.
 */
function playMusic() {
  if (!audio || isPlaying) return;
  
  audio.load(); // Resetea el buffer para evitar fallos de carga en iOS/Android
  const promise = audio.play();
  
  if (promise !== undefined) {
    promise.then(() => {
      fadeTo(0.65, CONFIG.music.fadeTime);
      if (musicBtn) {
        musicBtn.classList.add('is-playing');
        musicBtn.setAttribute('aria-label', 'Pausar música');
      }
      isPlaying = true;
    }).catch((err) => {
      console.warn('Audio play blocked or interrupted:', err);
    });
  }
}

/**
 * Pausa la música aplicando un efecto Fade-Out previo
 */
function pauseMusic() {
  if (!audio || !isPlaying) return;
  
  fadeTo(0, CONFIG.music.fadeTime / 2, () => { 
    audio.pause(); 
  });
  
  if (musicBtn) {
    musicBtn.classList.remove('is-playing');
    musicBtn.setAttribute('aria-label', 'Reproducir música');
  }
  isPlaying = false;
}

/**
 * Inicializa el elemento de audio dinámicamente en el DOM
 */
function initMusic() {
  musicBtn = document.getElementById('music-btn');
  if (!musicBtn) return;

  // Creamos el nodo de audio en memoria para evitar lag o estados corruptos en el HTML
  audio = document.createElement('audio');
  audio.loop    = true;
  audio.preload = 'none';
  audio.volume  = 0;
  audio.setAttribute('aria-hidden', 'true');

  const source = document.createElement('source');
  source.src  = CONFIG.music.src;
  source.type = 'audio/mpeg';
  audio.appendChild(source);
  audio.src = CONFIG.music.src;

  document.body.appendChild(audio);

  // Limpieza preventiva: removemos el <audio> viejo si existiera en el HTML original
  const oldAudio = document.getElementById('music-audio');
  if (oldAudio) oldAudio.remove();

  // Listener para el botón flotante (por si el usuario quiere pausar/reproducir después)
  musicBtn.addEventListener('click', () => { 
    isPlaying ? pauseMusic() : playMusic(); 
  });
  
  musicBtn.setAttribute('aria-label', 'Reproducir música');

  // Buena práctica UX: Si cambian de pestaña en el celular, pausamos la música
  document.addEventListener('visibilitychange', () => {
    if (document.hidden && isPlaying) pauseMusic();
  });
}

// ============================================================================
// PANTALLA DE ACCESO (Validación de contraseña)
// ============================================================================
function initAccessScreen() {
  const envelopeScreen = document.getElementById('envelope-screen');
  
  // Recuerda verificar/reemplazar estos IDs por los que tengan tu input y botón en el HTML real
  const passwordInput = document.getElementById('password-input'); 
  const passwordBtn   = document.getElementById('password-submit-btn'); 

  if (!passwordBtn) return;

  passwordBtn.addEventListener('click', () => {
    const passwordValue = passwordInput ? passwordInput.value.trim() : '';

    // Modifica 'amor2026' por la palabra clave elegida para la boda
    if (passwordValue.toLowerCase() === 'amor2026') {
      
      // CRUCIAL: Ejecutamos la música AQUÍ. Al ser una respuesta directa e inmediata
      // a la interacción del usuario ('click'), el navegador autoriza la reproducción.
      playMusic();

      // Animación de salida para la pantalla de bloqueo
      if (envelopeScreen) {
        envelopeScreen.classList.add('fade-out');
        
        // Removemos por completo el nodo del DOM tras la transición CSS para optimizar recursos
        setTimeout(() => {
          envelopeScreen.remove();
        }, 800);
      }

    } else {
      console.log('Contraseña incorrecta');
      if (passwordInput) {
        passwordInput.classList.add('is-invalid');
        // Tip: podrías remover la clase 'is-invalid' tras un timeout para poder reintentar visualmente
      }
    }
  });
}

// ============================================================================
// INITIALIZATION (Punto de entrada de la app)
// ============================================================================
document.addEventListener('DOMContentLoaded', () => {
  initMusic();
  initAccessScreen();
});
