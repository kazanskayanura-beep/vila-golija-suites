// Основной скрипт для функциональности сайта

document.addEventListener('DOMContentLoaded', function() {
    // Инициализация всех компонентов
    initNavigation();
    initFeatures();
    initSmoothScroll();
    initAnimations();
});

// Инициализация навигации
function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }
    
    // Закрытие меню при клике вне его области
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.nav') && navLinks.classList.contains('active')) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });
}

// Инициализация функционала особенностей
function initFeatures() {
    const featureItems = document.querySelectorAll('.feature-item');
    
    featureItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            // Закрываем все открытые элементы
            featureItems.forEach(otherItem => {
                if (otherItem !== this) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Открываем текущий элемент
            this.classList.add('active');
        });
        
        // Закрытие при клике вне элемента
        document.addEventListener('click', function(event) {
            if (!event.target.closest('.feature-item')) {
                featureItems.forEach(item => {
                    item.classList.remove('active');
                });
            }
        });
    });
}

// Плавная прокрутка
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Закрываем мобильное меню если открыто
                const hamburger = document.querySelector('.hamburger');
                const navLinks = document.querySelector('.nav-links');
                if (hamburger && hamburger.classList.contains('active')) {
                    hamburger.classList.remove('active');
                    navLinks.classList.remove('active');
                }
            }
        });
    });
}

// Анимации при скролле
function initAnimations() {
    const animatedElements = document.querySelectorAll('.hero-title, .hero-subtitle, .cta-button, .unique-offer-title, .unique-offer-desc, .section-title, .feature-item, .apartment-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    animatedElements.forEach(element => {
        element.style.animationPlayState = 'paused';
        observer.observe(element);
    });
}

// Функция для прокрутки к блоку бронирования
function scrollToBooking() {
    const bookingSection = document.getElementById('booking');
    const headerHeight = document.querySelector('.header').offsetHeight;
    
    if (bookingSection) {
        window.scrollTo({
            top: bookingSection.offsetTop - headerHeight,
            behavior: 'smooth'
        });
    }
}

// Обработка изменения размера окна
window.addEventListener('resize', function() {
    // Закрываем мобильное меню при изменении размера на десктоп
    if (window.innerWidth > 768) {
        const hamburger = document.querySelector('.hamburger');
        const navLinks = document.querySelector('.nav-links');
        
        if (hamburger && hamburger.classList.contains('active')) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        }
    }
});