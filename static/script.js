// Load options on page load
document.addEventListener('DOMContentLoaded', async () => {
    await loadOptions();
    initializeForm();
    initializeSmoothScroll();
    initializeScrollAnimations();
});

// Global variable to store manufacturer-model mapping
let manufacturerModelsMap = {};

// Function to update model dropdown based on selected manufacturer
function updateModelDropdown(manufacturer) {
    const modelSelect = document.getElementById('model_name');
    
    // Clear existing options
    modelSelect.innerHTML = '<option value="">Select Model</option>';
    
    if (manufacturer && manufacturerModelsMap[manufacturer]) {
        // Enable the dropdown
        modelSelect.disabled = false;
        
        // Populate with models for selected manufacturer
        manufacturerModelsMap[manufacturer].forEach(model => {
            const option = document.createElement('option');
            option.value = model;
            option.textContent = model;
            modelSelect.appendChild(option);
        });
    } else {
        // Disable if no manufacturer selected
        modelSelect.disabled = true;
    }
}

// Load dropdown options from API
async function loadOptions() {
    try {
        const response = await fetch('/api/options');
        const data = await response.json();
        
        // Store manufacturer-model mapping
        manufacturerModelsMap = data.manufacturer_models;
        
        // Populate company dropdown
        const companySelect = document.getElementById('company');
        data.companies.forEach(company => {
            const option = document.createElement('option');
            option.value = company;
            option.textContent = company;
            companySelect.appendChild(option);
        });
        
        // Add event listener to filter models when manufacturer changes
        companySelect.addEventListener('change', function() {
            updateModelDropdown(this.value);
        });
        
        // Initially, model dropdown is disabled until manufacturer is selected
        document.getElementById('model_name').disabled = true;
        
        
        // Populate fuel dropdown
        const fuelSelect = document.getElementById('fuel');
        data.fuel_types.forEach(fuel => {
            const option = document.createElement('option');
            option.value = fuel;
            option.textContent = fuel;
            fuelSelect.appendChild(option);
        });
        
        // Populate transmission dropdown
        const transmissionSelect = document.getElementById('transmission');
        data.transmissions.forEach(transmission => {
            const option = document.createElement('option');
            option.value = transmission;
            option.textContent = transmission;
            transmissionSelect.appendChild(option);
        });
        
        // Populate owner dropdown
        const ownerSelect = document.getElementById('owner');
        data.owners.forEach(owner => {
            const option = document.createElement('option');
            option.value = owner;
            option.textContent = owner;
            ownerSelect.appendChild(option);
        });
        
    } catch (error) {
        console.error('Error loading options:', error);
        alert('Failed to load form options. Please refresh the page.');
    }
}

// Initialize form submission
function initializeForm() {
    const form = document.getElementById('predictionForm');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        await predictPrice();
    });
}

// Predict price function
async function predictPrice() {
    // Get form values
    const kmDrivenInput = document.getElementById('km_driven');
    const formData = {
        company: document.getElementById('company').value,
        model_name: document.getElementById('model_name').value,
        year: document.getElementById('year').value,
        km_driven: kmDrivenInput.value.replace(/,/g, ''),  // Remove commas before submission
        fuel: document.getElementById('fuel').value,
        transmission: document.getElementById('transmission').value,
        owner: document.getElementById('owner').value,
        max_power_bhp: document.getElementById('max_power_bhp').value,
        engine_cc: document.getElementById('engine_cc').value
    };
    
    // Validate form
    if (!formData.company || !formData.model_name || !formData.year || !formData.km_driven || 
        !formData.fuel || !formData.transmission || !formData.owner ||
        !formData.max_power_bhp || !formData.engine_cc) {
        alert('Please fill in all fields');
        return;
    }
    
    // Show loading animation
    const formContainer = document.querySelector('.form-container');
    const loadingAnimation = document.getElementById('loadingAnimation');
    const resultCard = document.getElementById('resultCard');
    
    formContainer.classList.add('hidden');
    loadingAnimation.classList.remove('hidden');
    resultCard.classList.add('hidden');
    
    try {
        // Call prediction API
        const response = await fetch('/api/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        
        const data = await response.json();
        
        if (data.success) {
            // Show result after a brief delay for effect
            setTimeout(() => {
                loadingAnimation.classList.add('hidden');
                displayResult(data);
            }, 1500);
        } else {
            throw new Error(data.error || 'Prediction failed');
        }
        
    } catch (error) {
        console.error('Error predicting price:', error);
        loadingAnimation.classList.add('hidden');
        formContainer.classList.remove('hidden');
        alert('Failed to predict price: ' + error.message);
    }
}

// Display result
function displayResult(data) {
    const resultCard = document.getElementById('resultCard');
    const resultPrice = document.getElementById('resultPrice');
    
    resultPrice.textContent = data.formatted_price;
    resultCard.classList.remove('hidden');
    
    // Scroll to result
    resultCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    // Add celebration effect
    createConfetti();
}

// Reset form
function resetForm() {
    const formContainer = document.querySelector('.form-container');
    const resultCard = document.getElementById('resultCard');
    const form = document.getElementById('predictionForm');
    
    resultCard.classList.add('hidden');
    formContainer.classList.remove('hidden');
    form.reset();
    
    // Scroll to form
    formContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// Smooth scroll for navigation links
function initializeSmoothScroll() {
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
}

// Scroll animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translate3d(0, 0, 0)';
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.fade-in-up').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translate3d(0, 30px, 0)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        el.style.willChange = 'opacity, transform';
        observer.observe(el);
    });
}

// Confetti effect for result
function createConfetti() {
    const duration = 2000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        
        // Create simple particle effect
        for (let i = 0; i < 5; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'fixed';
            particle.style.width = '10px';
            particle.style.height = '10px';
            particle.style.borderRadius = '50%';
            particle.style.backgroundColor = `hsl(${randomInRange(0, 360)}, 70%, 60%)`;
            particle.style.left = randomInRange(0, 100) + '%';
            particle.style.top = randomInRange(0, 100) + '%';
            particle.style.pointerEvents = 'none';
            particle.style.zIndex = '9999';
            particle.style.animation = 'fadeOut 2s ease-out forwards';
            
            document.body.appendChild(particle);
            
            setTimeout(() => {
                particle.remove();
            }, 2000);
        }
    }, 250);
}

// Add CSS for particle animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        from {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
        to {
            opacity: 0;
            transform: translateY(-100px) scale(0);
        }
    }
`;
document.head.appendChild(style);

// Input validation and formatting
document.addEventListener('DOMContentLoaded', () => {
    const yearInput = document.getElementById('year');
    const kmInput = document.getElementById('km_driven');
    const powerInput = document.getElementById('max_power_bhp');
    const engineInput = document.getElementById('engine_cc');
    
    if (yearInput) {
        yearInput.addEventListener('input', (e) => {
            if (e.target.value.length > 4) {
                e.target.value = e.target.value.slice(0, 4);
            }
        });
    }
    
    if (kmInput) {
        // Only allow numbers while typing
        kmInput.addEventListener('input', (e) => {
            // Remove any non-numeric characters
            let value = e.target.value.replace(/[^0-9]/g, '');
            e.target.value = value;
        });
        
        kmInput.addEventListener('blur', (e) => {
            // Format with commas when user leaves the field
            const value = e.target.value.trim();
            if (value !== '') {
                const numValue = parseInt(value);
                if (!isNaN(numValue) && numValue > 0) {
                    if (numValue > 500000) {
                        e.target.value = '500,000';
                    } else {
                        e.target.value = numValue.toLocaleString('en-IN');
                    }
                }
            }
        });
        
        kmInput.addEventListener('focus', (e) => {
            // Remove commas when user focuses to edit
            const value = e.target.value.replace(/,/g, '');
            if (value) {
                e.target.value = value;
            }
        });
    }
    
    if (powerInput) {
        powerInput.addEventListener('blur', (e) => {
            // Validate range when user leaves the field
            let value = parseFloat(e.target.value);
            if (value) {
                if (value > 700) {
                    e.target.value = '700';
                } else if (value < 30) {
                    e.target.value = '30';
                }
            }
        });
    }
    
    if (engineInput) {
        engineInput.addEventListener('blur', (e) => {
            // Validate range when user leaves the field
            let value = parseInt(e.target.value);
            if (value) {
                if (value > 7000) {
                    e.target.value = '7000';
                } else if (value < 500) {
                    e.target.value = '500';
                }
            }
        });
    }
});
