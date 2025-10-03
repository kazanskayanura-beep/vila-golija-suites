// Многоязычность
class LanguageManager {
    constructor() {
        this.currentLang = 'ru';
        this.translations = {
            ru: {
                // Навигация
                'book-now': 'Забронировать',
                
                // Hero Section
                'hero-title': 'VILA GOLIJA SUITES',
                'hero-subtitle': 'Отдых на высоте',
                
                // Уникальное предложение
                'unique-title': 'Поднимите свой отдых на новый уровень буквально',
                'unique-desc': 'Подъемник номер 5 в 10м от вашей виллы',
                
                // О вилле
                'about-title': 'О вашей вилле',
                'kitchen': 'Кухня',
                'kitchen-desc': 'Полностью оборудованная кухня с современной техникой',
                'wifi': 'Wi-Fi',
                'wifi-desc': 'Высокоскоростной беспроводной интернет на всей территории',
                'spa': 'SPA',
                'spa-desc': 'Доступ к спа-зоне с сауной и джакузи',
                'parking': 'Парковка',
                'parking-desc': 'Бесплатная охраняемая парковка для гостей',
                'transfer': 'Трансфер',
                'transfer-desc': 'Трансфер от аэропорта и обратно для VIP гостей',
                
                // Категории апартаментов
                'guest-choice': 'Выбор гостей',
                'family': 'Семейный',
                'comfort': 'Комфорт',
                'mountain-view': 'Вид на горы',
                'vip': 'VIP',
                'economy': 'Эконом',
                
                // Названия апартаментов
                'apartment1-name': 'Волшебный вид',
                'apartment1-desc': 'Двухместный апартамент с кухней и балконом с видом на горы 33 кв.м.',
                'apartment2-name': 'Больше лучше',
                'apartment2-desc': 'Апартамент на 4 человека с кухней и балконом с видом на горы 41 кв.м.',
                'apartment3-name': 'Уют в горах',
                'apartment3-desc': 'Двухместный апартамент с кухней 33 кв.м.',
                'apartment4-name': 'Горные вершины',
                'apartment4-desc': 'Двухместный апартамент с панорамным видом на горы 35 кв.м.',
                'apartment5-name': 'Лучше не бывает',
                'apartment5-desc': 'Двухместный апартамент с кухней и балконом с видом на горы 41 кв.м. Трансфер от аэропорта.',
                'apartment6-name': 'Бюджетный вариант',
                'apartment6-desc': 'Двухместный апартамент 33 кв.м.',
                
                // Форма бронирования
                'booking-title': 'Заявка на бронирование',
                'step1-title': 'Контактные данные',
                'step2-title': 'Выбор апартамента',
                'step3-title': 'Выбор дат',
                'step4-title': 'Подтверждение бронирования',
                'last-name': 'Фамилия',
                'first-name': 'Имя',
                'phone': 'Номер телефона',
                'apartment': 'Апартамент',
                'check-in': 'Заезд',
                'check-out': 'Выезд',
                'prev': 'Назад',
                'next': 'Далее',
                'submit': 'Отправить заявку',
                
                // Модальное окно
                'success-title': 'Мы ответим в ближайшее время',
                'success-desc': 'Спасибо за вашу заявку! Наш менеджер свяжется с вами в течение 24 часов.',
                
                // Подвал
                'footer-desc': 'Отдых на высоте в самом сердце гор',
                'contact': 'Контакты',
                'address': 'Горный переулок, 5, Голия',
                'rights': 'Все права защищены.'
            },
            en: {
                // Навигация
                'book-now': 'Book Now',
                
                // Hero Section
                'hero-title': 'VILA GOLIJA SUITES',
                'hero-subtitle': 'Relaxation at Altitude',
                
                // Уникальное предложение
                'unique-title': 'Take your vacation to the next level literally',
                'unique-desc': 'Lift number 5 just 10m from your villa',
                
                // О вилле
                'about-title': 'About Your Villa',
                'kitchen': 'Kitchen',
                'kitchen-desc': 'Fully equipped kitchen with modern appliances',
                'wifi': 'Wi-Fi',
                'wifi-desc': 'High-speed wireless internet throughout the property',
                'spa': 'SPA',
                'spa-desc': 'Access to spa area with sauna and jacuzzi',
                'parking': 'Parking',
                'parking-desc': 'Free guarded parking for guests',
                'transfer': 'Transfer',
                'transfer-desc': 'Airport transfer for VIP guests',
                
                // Категории апартаментов
                'guest-choice': 'Guest Choice',
                'family': 'Family',
                'comfort': 'Comfort',
                'mountain-view': 'Mountain View',
                'vip': 'VIP',
                'economy': 'Economy',
                
                // Названия апартаментов
                'apartment1-name': 'Magical View',
                'apartment1-desc': 'Two-person apartment with kitchen and balcony with mountain view 33 sq.m.',
                'apartment2-name': 'More is Better',
                'apartment2-desc': 'Apartment for 4 people with kitchen and balcony with mountain view 41 sq.m.',
                'apartment3-name': 'Cozy in the Mountains',
                'apartment3-desc': 'Two-person apartment with kitchen 33 sq.m.',
                'apartment4-name': 'Mountain Peaks',
                'apartment4-desc': 'Two-person apartment with panoramic mountain view 35 sq.m.',
                'apartment5-name': 'Can\'t Get Better',
                'apartment5-desc': 'Two-person apartment with kitchen and balcony with mountain view 41 sq.m. Airport transfer included.',
                'apartment6-name': 'Budget Option',
                'apartment6-desc': 'Two-person apartment 33 sq.m.',
                
                // Форма бронирования
                'booking-title': 'Booking Request',
                'step1-title': 'Contact Information',
                'step2-title': 'Apartment Selection',
                'step3-title': 'Date Selection',
                'step4-title': 'Booking Confirmation',
                'last-name': 'Last Name',
                'first-name': 'First Name',
                'phone': 'Phone Number',
                'apartment': 'Apartment',
                'check-in': 'Check-in',
                'check-out': 'Check-out',
                'prev': 'Back',
                'next': 'Next',
                'submit': 'Submit Request',
                
                // Модальное окно
                'success-title': 'We will respond as soon as possible',
                'success-desc': 'Thank you for your request! Our manager will contact you within 24 hours.',
                
                // Подвал
                'footer-desc': 'Relaxation at altitude in the heart of the mountains',
                'contact': 'Contacts',
                'address': 'Mountain Lane, 5, Golija',
                'rights': 'All rights reserved.'
            }
        };
        
        this.init();
    }
    
    init() {
        // Восстановление выбранного языка из localStorage
        const savedLang = localStorage.getItem('vila-golija-lang');
        if (savedLang && this.translations[savedLang]) {
            this.currentLang = savedLang;
            this.updateLanguageButtons();
        }
        
        // Применение перевода при загрузке
        this.applyTranslations();
        
        // Обработчики для переключателя языка
        this.setupLanguageSwitcher();
    }
    
    setupLanguageSwitcher() {
        const langButtons = document.querySelectorAll('.lang-btn');
        
        langButtons.forEach(button => {
            button.addEventListener('click', () => {
                const lang = button.getAttribute('data-lang');
                this.switchLanguage(lang);
            });
        });
    }
    
    switchLanguage(lang) {
        if (this.translations[lang] && this.currentLang !== lang) {
            this.currentLang = lang;
            localStorage.setItem('vila-golija-lang', lang);
            this.applyTranslations();
            this.updateLanguageButtons();
        }
    }
    
    applyTranslations() {
        const elements = document.querySelectorAll('[data-lang-key]');
        
        elements.forEach(element => {
            const key = element.getAttribute('data-lang-key');
            if (this.translations[this.currentLang][key]) {
                if (element.tagName === 'INPUT' && element.type === 'text') {
                    element.placeholder = this.translations[this.currentLang][key];
                } else {
                    element.textContent = this.translations[this.currentLang][key];
                }
            }
        });
    }
    
    updateLanguageButtons() {
        const langButtons = document.querySelectorAll('.lang-btn');
        
        langButtons.forEach(button => {
            if (button.getAttribute('data-lang') === this.currentLang) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });
    }
    
    // Метод для получения перевода по ключу (для использования в JS)
    translate(key) {
        return this.translations[this.currentLang][key] || key;
    }
}

// Инициализация менеджера языков
const languageManager = new LanguageManager();