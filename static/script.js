// Global variables
let optionsData = {};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    loadOptions();
    initializeForm();
    addScrollAnimations();
    addSmoothScrolling();
});

// Load options from API
async function loadOptions() {
    try {
        const response = await fetch('/api/options');
        optionsData = await response.json();
        
        populateDropdown('manufacturer', optionsData.companies);
        populateDropdown('fuel', optionsData.fuel_types);
        populateDropdown('transmission', optionsData.transmissions);
        populateDropdown('owner', optionsData.owners);
        populateDropdown('drivetrain', optionsData.drivetrains);
    } catch (error) {
        console.error('Error loading options:', error);
        showError('Failed to load form options. Please refresh the page.');
    }
}

// Populate dropdown with options
function populateDropdown(elementId, options) {
    const select = document.getElementById(elementId);
    const placeholder = select.querySelector('option[value=""]');
    
    // Clear existing options except placeholder
    select.innerHTML = '';
    if (placeholder) {
        select.appendChild(placeholder);
    }
    
    // Add new options
    options.forEach(option => {
        const optionElement = document.createElement('option');
        optionElement.value = option;
        optionElement.textContent = option;
        select.appendChild(optionElement);
    });
}

// Initialize form event listeners
function initializeForm() {
    const form = document.getElementById('predictionForm');
    const manufacturerSelect = document.getElementById('manufacturer');
    const kmInput = document.getElementById('km_driven');
    
    // Handle manufacturer change
    manufacturerSelect.addEventListener('change', function() {
        const modelSelect = document.getElementById('model_name');
        const selectedManufacturer = this.value;
        
        if (selectedManufacturer && optionsData.manufacturer_models) {
            const models = optionsData.manufacturer_models[selectedManufacturer] || [];
            populateDropdown('model_name', models);
            modelSelect.disabled = false;
        } else {
            modelSelect.innerHTML = '<option value="">Select Model</option>';
            modelSelect.disabled = true;
        }
    });
    
    // Format kilometers input
    kmInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/,/g, '');
        if (!isNaN(value) && value !== '') {
            e.target.value = parseInt(value).toLocaleString('en-IN');
        }
    });
    
    // Handle form submission
    form.addEventListener('submit', handleFormSubmit);
}

// Handle form submission
async function handleFormSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = {
        manufacturer: formData.get('manufacturer'),
        model_name: formData.get('model_name'),
        year: parseInt(formData.get('year')),
        km_driven: parseInt(formData.get('km_driven').replace(/,/g, '')),
        fuel: formData.get('fuel'),
        transmission: formData.get('transmission'),
        owner: formData.get('owner'),
        max_power_bhp: parseFloat(formData.get('max_power_bhp')),
        engine_cc: parseFloat(formData.get('engine_cc')),
        max_torque_nm: parseFloat(formData.get('max_torque_nm')),
        drivetrain: formData.get('drivetrain')
    };
    
    // Validate data
    if (!validateFormData(data)) {
        return;
    }
    
    // Show loading animation
    showLoading();
    
    try {
        const response = await fetch('/api/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        
        const result = await response.json();
        
        if (result.success) {
            showResult(result.formatted_price);
        } else {
            hideLoading();
            showError(result.error || 'Prediction failed. Please try again.');
        }
    } catch (error) {
        hideLoading();
        console.error('Error:', error);
        showError('An error occurred. Please try again.');
    }
}

// Validate form data
function validateFormData(data) {
    if (data.year < 1990 || data.year > 2025) {
        showError('Year must be between 1990 and 2025');
        return false;
    }
    
    if (data.km_driven < 0 || data.km_driven > 500000) {
        showError('Kilometers driven must be between 0 and 500,000');
        return false;
    }
    
    if (data.max_power_bhp < 30 || data.max_power_bhp > 700) {
        showError('Max Power must be between 30 and 700 bhp');
        return false;
    }
    
    if (data.engine_cc < 500 || data.engine_cc > 7000) {
        showError('Engine size must be between 500 and 7000 cc');
        return false;
    }
    
    if (data.max_torque_nm < 50 || data.max_torque_nm > 800) {
        showError('Max Torque must be between 50 and 800 Nm');
        return false;
    }
    
    return true;
}

// Show loading animation
function showLoading() {
    const formContainer = document.querySelector('.form-container');
    const loadingAnimation = document.getElementById('loadingAnimation');
    const resultCard = document.getElementById('resultCard');
    
    formContainer.style.display = 'none';
    resultCard.classList.add('hidden');
    loadingAnimation.classList.remove('hidden');
}

// Hide loading animation
function hideLoading() {
    const loadingAnimation = document.getElementById('loadingAnimation');
    loadingAnimation.classList.add('hidden');
}

// Show result
function showResult(price) {
    const formContainer = document.querySelector('.form-container');
    const loadingAnimation = document.getElementById('loadingAnimation');
    const resultCard = document.getElementById('resultCard');
    const resultPrice = document.getElementById('resultPrice');
    
    resultPrice.textContent = price;
    
    loadingAnimation.classList.add('hidden');
    resultCard.classList.remove('hidden');
    
    // Scroll to result
    resultCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// Show error message
function showError(message) {
    alert(message);
}

// Reset form
function resetForm() {
    const form = document.getElementById('predictionForm');
    const formContainer = document.querySelector('.form-container');
    const resultCard = document.getElementById('resultCard');
    
    form.reset();
    
    // Reset model dropdown
    const modelSelect = document.getElementById('model_name');
    modelSelect.innerHTML = '<option value="">Select Model</option>';
    modelSelect.disabled = true;
    
    resultCard.classList.add('hidden');
    formContainer.style.display = 'block';
    
    // Scroll to form
    formContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Add scroll animations
function addScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.fade-in-up').forEach(element => {
        observer.observe(element);
    });
}

// Add smooth scrolling
function addSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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
}

// Add parallax effect to background circles
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const circles = document.querySelectorAll('.circle');
    
    circles.forEach((circle, index) => {
        const speed = 0.5 + (index * 0.1);
        circle.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// ========================================
// ADVANCED ANIMATIONS & ENHANCEMENTS
// ========================================

// Page Loading Animation
document.addEventListener('DOMContentLoaded', function() {
    const loader = document.getElementById('page-loader');
    
    // Simulate loading time
    setTimeout(() => {
        loader.classList.add('hidden');
        
        // Remove loader from DOM after animation
        setTimeout(() => {
            if (loader.parentNode) {
                loader.parentNode.removeChild(loader);
            }
        }, 500);
        
        // Trigger entrance animations
        triggerEntranceAnimations();
    }, 2000);
});

// Scroll Progress Bar
function updateScrollProgress() {
    const scrollProgress = document.querySelector('.scroll-progress-bar');
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (scrollTop / scrollHeight) * 100;
    
    if (scrollProgress) {
        scrollProgress.style.width = scrolled + '%';
    }
}

window.addEventListener('scroll', updateScrollProgress);

// Back to Top Button
function initBackToTop() {
    const backToTop = document.getElementById('backToTop');
    
    if (!backToTop) return;
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
    
    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        
        // Add click effect
        this.style.transform = 'translateY(-2px) scale(0.95)';
        setTimeout(() => {
            this.style.transform = '';
        }, 150);
    });
}

// Toast Notifications
function showToast(message, type = 'success', duration = 3000) {
    const toast = document.getElementById('toast');
    const toastMessage = toast.querySelector('.toast-message');
    const toastIcon = toast.querySelector('.toast-icon');
    
    // Set message
    toastMessage.textContent = message;
    
    // Set icon based on type
    const iconClasses = {
        success: 'fas fa-check-circle',
        error: 'fas fa-exclamation-circle',
        warning: 'fas fa-exclamation-triangle',
        info: 'fas fa-info-circle'
    };
    toastIcon.className = `toast-icon ${iconClasses[type] || iconClasses.success}`;
    
    // Show toast
    toast.classList.add('show');
    
    // Hide after duration
    setTimeout(() => {
        toast.classList.remove('show');
    }, duration);
}

// Enhanced Button Loading State
function setButtonLoading(button, loading = true) {
    if (loading) {
        button.classList.add('loading');
        button.disabled = true;
    } else {
        button.classList.remove('loading');
        button.disabled = false;
    }
}

// Particle System
function createParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles';
    document.querySelector('.background-animation').appendChild(particlesContainer);
    
    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 8 + 's';
        particle.style.animationDuration = (Math.random() * 3 + 5) + 's';
        
        particlesContainer.appendChild(particle);
        
        // Remove particle after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 8000);
    }
    
    // Create particles periodically
    setInterval(createParticle, 500);
}

// Entrance Animations
function triggerEntranceAnimations() {
    const elements = document.querySelectorAll('.fade-in, .fade-in-up');
    
    elements.forEach((element, index) => {
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Enhanced Form Interactions
function enhanceFormInputs() {
    const inputs = document.querySelectorAll('input, select');
    
    inputs.forEach(input => {
        // Add focus animations
        input.addEventListener('focus', function() {
            this.parentNode.classList.add('focused');
            
            // Create ripple effect
            createRipple(this, event);
        });
        
        input.addEventListener('blur', function() {
            this.parentNode.classList.remove('focused');
        });
        
        // Add input validation styling
        input.addEventListener('input', function() {
            if (this.checkValidity()) {
                this.classList.remove('invalid');
                this.classList.add('valid');
            } else {
                this.classList.remove('valid');
                this.classList.add('invalid');
            }
        });
    });
}

// Ripple Effect
function createRipple(element, event) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Smooth Scroll for Navigation
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 100;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Add active state
                navLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });
}

// Intersection Observer for Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Add stagger delay for multiple elements
                const siblings = Array.from(entry.target.parentNode.children);
                const index = siblings.indexOf(entry.target);
                entry.target.style.animationDelay = (index * 0.1) + 's';
            }
        });
    }, observerOptions);
    
    // Observe elements
    const animatedElements = document.querySelectorAll(
        '.stat-card, .team-card, .form-group, .result-section'
    );
    
    animatedElements.forEach(el => observer.observe(el));
}

// Enhanced Prediction Function
async function makePrediction() {
    const form = document.getElementById('prediction-form');
    const resultSection = document.getElementById('result-section');
    const submitButton = form.querySelector('button[type="submit"]');
    
    // Set loading state
    setButtonLoading(submitButton, true);
    
    // Hide previous results
    resultSection.classList.remove('show');
    
    // Get form data
    const formData = new FormData(form);
    const data = {};
    
    for (let [key, value] of formData.entries()) {
        // Convert numeric values
        if (['year', 'km_driven', 'max_power_bhp', 'engine_cc', 'max_torque_nm'].includes(key)) {
            data[key] = parseFloat(value);
        } else {
            data[key] = value;
        }
    }
    
    try {
        showToast('Processing your request...', 'info', 2000);
        
        const response = await fetch('/api/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        
        const result = await response.json();
        
        if (result.success) {
            // Show success result
            displayResult(result);
            showToast('Prediction completed successfully!', 'success');
        } else {
            throw new Error(result.error || 'Prediction failed');
        }
        
    } catch (error) {
        console.error('Prediction error:', error);
        showToast('Error: ' + error.message, 'error');
    } finally {
        setButtonLoading(submitButton, false);
    }
}

// Display Result with Animation
function displayResult(result) {
    const resultSection = document.getElementById('result-section');
    const priceElement = resultSection.querySelector('.result-value');
    
    // Update price with counting animation
    animateCount(priceElement, 0, result.price_raw, 1000);
    
    // Update formatted price
    const formattedElement = resultSection.querySelector('.formatted-price');
    if (formattedElement) {
        formattedElement.textContent = result.formatted_price;
    }
    
    // Show result section
    setTimeout(() => {
        resultSection.classList.add('show');
    }, 100);
}

// Count Up Animation
function animateCount(element, start, end, duration) {
    const startTime = performance.now();
    
    function updateCount(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(start + (end - start) * easeOut);
        
        element.textContent = '₹' + current.toLocaleString();
        
        if (progress < 1) {
            requestAnimationFrame(updateCount);
        }
    }
    
    requestAnimationFrame(updateCount);
}

// Keyboard Shortcuts
function initKeyboardShortcuts() {
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + Enter to submit form
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            const form = document.getElementById('prediction-form');
            if (form) {
                e.preventDefault();
                makePrediction();
            }
        }
        
        // Escape to close modals/notifications
        if (e.key === 'Escape') {
            const toast = document.getElementById('toast');
            if (toast.classList.contains('show')) {
                toast.classList.remove('show');
            }
        }
    });
}

// Performance Monitoring
function initPerformanceMonitoring() {
    // Monitor page load time
    window.addEventListener('load', function() {
        setTimeout(() => {
            const perfData = performance.getEntriesByType('navigation')[0];
            const loadTime = perfData.loadEventEnd - perfData.loadEventStart;
            
            if (loadTime > 3000) {
                console.warn('Page load time is slow:', loadTime + 'ms');
            }
        }, 0);
    });
}

// Initialize All Features
function initializeApp() {
    initBackToTop();
    enhanceFormInputs();
    initSmoothScroll();
    initScrollAnimations();
    initKeyboardShortcuts();
    initPerformanceMonitoring();
    createParticles();
    
    // Add CSS classes for animations
    document.body.classList.add('app-loaded');
    
    console.log('🚗 CarValueAI initialized successfully!');
}

// Start the app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}

// Add error handling for unhandled errors
window.addEventListener('error', function(e) {
    console.error('Application error:', e.error);
    showToast('An unexpected error occurred', 'error');
});

window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled promise rejection:', e.reason);
    showToast('Connection error occurred', 'error');
});

// Export functions for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        showToast,
        makePrediction,
        setButtonLoading,
        animateCount
    };
}
