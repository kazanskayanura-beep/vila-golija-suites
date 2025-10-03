// Логика формы бронирования
class BookingForm {
    constructor() {
        this.currentStep = 1;
        this.totalSteps = 4;
        this.formData = {};
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.showStep(1);
    }
    
    setupEventListeners() {
        const form = document.getElementById('booking-form');
        if (form) {
            form.addEventListener('submit', (e) => this.handleSubmit(e));
        }
        
        // Валидация полей в реальном времени
        this.setupRealTimeValidation();
    }
    
    setupRealTimeValidation() {
        const inputs = document.querySelectorAll('#booking-form input[required]');
        
        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                this.validateField(input);
            });
            
            input.addEventListener('input', () => {
                this.clearFieldError(input);
            });
        });
    }
    
    validateField(field) {
        this.clearFieldError(field);
        
        let isValid = true;
        let errorMessage = '';
        
        if (!field.value.trim()) {
            isValid = false;
            errorMessage = 'Это поле обязательно для заполнения';
        } else if (field.type === 'email' && !this.isValidEmail(field.value)) {
            isValid = false;
            errorMessage = 'Введите корректный email адрес';
        } else if (field.type === 'tel' && !this.isValidPhone(field.value)) {
            isValid = false;
            errorMessage = 'Введите корректный номер телефона';
        }
        
        if (!isValid) {
            this.showFieldError(field, errorMessage);
        }
        
        return isValid;
    }
    
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    isValidPhone(phone) {
        // Простая валидация телефона (можно улучшить)
        const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
        return phoneRegex.test(phone);
    }
    
    showFieldError(field, message) {
        field.classList.add('error');
        
        let errorElement = field.parentNode.querySelector('.field-error');
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'field-error';
            field.parentNode.appendChild(errorElement);
        }
        
        errorElement.textContent = message;
    }
    
    clearFieldError(field) {
        field.classList.remove('error');
        
        const errorElement = field.parentNode.querySelector('.field-error');
        if (errorElement) {
            errorElement.remove();
        }
    }
    
    nextStep(currentStep) {
        if (this.validateStep(currentStep)) {
            this.saveStepData(currentStep);
            this.showStep(currentStep + 1);
        }
    }
    
    prevStep(currentStep) {
        this.showStep(currentStep - 1);
    }
    
    validateStep(step) {
        let isValid = true;
        
        switch(step) {
            case 1:
                const step1Inputs = document.querySelectorAll('#step-1 input[required]');
                step1Inputs.forEach(input => {
                    if (!this.validateField(input)) {
                        isValid = false;
                    }
                });
                break;
                
            case 2:
                const selectedApartment = document.querySelector('input[name="apartment"]:checked');
                if (!selectedApartment) {
                    isValid = false;
                    this.showStepError('step-2', 'Пожалуйста, выберите апартамент');
                } else {
                    this.clearStepError('step-2');
                }
                break;
                
            case 3:
                const checkInDate = document.getElementById('check-in-date').textContent;
                const checkOutDate = document.getElementById('check-out-date').textContent;
                
                if (checkInDate === '--/--/----' || checkOutDate === '--/--/----') {
                    isValid = false;
                    this.showStepError('step-3', 'Пожалуйста, выберите даты заезда и выезда');
                } else {
                    this.clearStepError('step-3');
                    
                    // Проверка, что дата выезда после даты заезда
                    const checkIn = new Date(checkInDate);
                    const checkOut = new Date(checkOutDate);
                    
                    if (checkOut <= checkIn) {
                        isValid = false;
                        this.showStepError('step-3', 'Дата выезда должна быть после даты заезда');
                    }
                }
                break;
        }
        
        return isValid;
    }
    
    showStepError(stepId, message) {
        const stepElement = document.getElementById(stepId);
        let errorElement = stepElement.querySelector('.step-error');
        
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'step-error';
            stepElement.querySelector('h3').after(errorElement);
        }
        
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
    
    clearStepError(stepId) {
        const stepElement = document.getElementById(stepId);
        const errorElement = stepElement.querySelector('.step-error');
        
        if (errorElement) {
            errorElement.style.display = 'none';
        }
    }
    
    saveStepData(step) {
        switch(step) {
            case 1:
                this.formData.lastName = document.getElementById('last-name').value;
                this.formData.firstName = document.getElementById('first-name').value;
                this.formData.email = document.getElementById('email').value;
                this.formData.phone = document.getElementById('phone').value;
                break;
                
            case 2:
                const selectedApartment = document.querySelector('input[name="apartment"]:checked');
                this.formData.apartment = selectedApartment ? selectedApartment.value : '';
                break;
                
            case 3:
                this.formData.checkIn = document.getElementById('check-in-date').textContent;
                this.formData.checkOut = document.getElementById('check-out-date').textContent;
                break;
        }
    }
    
    showStep(step) {
        // Скрываем все шаги
        for (let i = 1; i <= this.totalSteps; i++) {
            const stepElement = document.getElementById(`step-${i}`);
            if (stepElement) {
                stepElement.classList.remove('active');
            }
        }
        
        // Показываем текущий шаг
        const currentStepElement = document.getElementById(`step-${step}`);
        if (currentStepElement) {
            currentStepElement.classList.add('active');
            this.currentStep = step;
            
            // Если это шаг подтверждения, заполняем данные
            if (step === 4) {
                this.populateConfirmation();
            }
        }
    }
    
    populateConfirmation() {
        document.getElementById('confirm-last-name').textContent = this.formData.lastName || '';
        document.getElementById('confirm-first-name').textContent = this.formData.firstName || '';
        document.getElementById('confirm-email').textContent = this.formData.email || '';
        document.getElementById('confirm-phone').textContent = this.formData.phone || '';
        document.getElementById('confirm-apartment').textContent = this.formData.apartment || '';
        document.getElementById('confirm-check-in').textContent = this.formData.checkIn || '';
        document.getElementById('confirm-check-out').textContent = this.formData.checkOut || '';
    }
    
    async handleSubmit(e) {
        e.preventDefault();
        
        if (this.validateStep(4)) {
            try {
                // Показываем индикатор загрузки
                this.showLoading();
                
                // Отправка данных в Google Таблицы
                await this.submitToGoogleSheets();
                
                // Показываем модальное окно успеха
                this.showSuccessModal();
                
                // Сбрасываем форму
                this.resetForm();
                
            } catch (error) {
                console.error('Ошибка при отправке формы:', error);
                this.showError('Произошла ошибка при отправке формы. Пожалуйста, попробуйте еще раз.');
            } finally {
                this.hideLoading();
            }
        }
    }
    
    async submitToGoogleSheets() {
        // URL вашего Google Apps Script
        const scriptURL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';
        
        const formData = new FormData();
        formData.append('lastName', this.formData.lastName);
        formData.append('firstName', this.formData.firstName);
        formData.append('email', this.formData.email);
        formData.append('phone', this.formData.phone);
        formData.append('apartment', this.formData.apartment);
        formData.append('checkIn', this.formData.checkIn);
        formData.append('checkOut', this.formData.checkOut);
        formData.append('timestamp', new Date().toISOString());
        
        const response = await fetch(scriptURL, {
            method: 'POST',
            body: formData
        });
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        return response;
    }
    
    showLoading() {
        const submitBtn = document.querySelector('.submit-btn');
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Отправка...';
        }
    }
    
    hideLoading() {
        const submitBtn = document.querySelector('.submit-btn');
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = languageManager.translate('submit');
        }
    }
    
    showSuccessModal() {
        const modal = document.getElementById('success-modal');
        if (modal) {
            modal.classList.add('active');
            
            // Закрытие модального окна
            const closeBtn = modal.querySelector('.close-modal');
            if (closeBtn) {
                closeBtn.addEventListener('click', () => {
                    modal.classList.remove('active');
                });
            }
            
            // Закрытие при клике вне модального окна
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.classList.remove('active');
                }
            });
        }
    }
    
    showError(message) {
        alert(message); // Можно заменить на более красивый вывод ошибки
    }
    
    resetForm() {
        // Сбрасываем форму к начальному состоянию
        document.getElementById('booking-form').reset();
        this.formData = {};
        this.showStep(1);
        
        // Сбрасываем календарь
        if (window.bookingCalendar) {
            window.bookingCalendar.reset();
        }
    }
}

// Глобальные функции для кнопок навигации
function nextStep(step) {
    if (window.bookingForm) {
        window.bookingForm.nextStep(step);
    }
}

function prevStep(step) {
    if (window.bookingForm) {
        window.bookingForm.prevStep(step);
    }
}

// Инициализация формы бронирования при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    window.bookingForm = new BookingForm();
});