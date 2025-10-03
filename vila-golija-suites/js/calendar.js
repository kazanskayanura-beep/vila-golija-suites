// Календарь для выбора дат
class BookingCalendar {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.selectedDates = {
            checkIn: null,
            checkOut: null
        };
        this.blockedDates = [];
        this.currentMonth = new Date().getMonth();
        this.currentYear = new Date().getFullYear();
        
        this.init();
    }
    
    async init() {
        await this.loadBlockedDates();
        this.renderCalendar();
        this.setupEventListeners();
    }
    
    async loadBlockedDates() {
        try {
            // Загрузка занятых дат из Google Таблиц через Apps Script
            const scriptURL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE/read';
            const response = await fetch(scriptURL);
            
            if (response.ok) {
                const data = await response.json();
                this.blockedDates = data.blockedDates || [];
            } else {
                console.error('Ошибка при загрузке занятых дат');
            }
        } catch (error) {
            console.error('Ошибка при загрузке занятых дат:', error);
        }
    }
    
    renderCalendar() {
        if (!this.container) return;
        
        this.container.innerHTML = '';
        
        // Создаем заголовок календаря
        const header = document.createElement('div');
        header.className = 'calendar-header';
        header.innerHTML = `
            <button class="calendar-nav prev-month"><i class="fas fa-chevron-left"></i></button>
            <h4>${this.getMonthName(this.currentMonth)} ${this.currentYear}</h4>
            <button class="calendar-nav next-month"><i class="fas fa-chevron-right"></i></button>
        `;
        this.container.appendChild(header);
        
        // Создаем сетку дней недели
        const weekdays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
        const weekdaysRow = document.createElement('div');
        weekdaysRow.className = 'calendar-weekdays';
        
        weekdays.forEach(day => {
            const dayElement = document.createElement('div');
            dayElement.className = 'calendar-weekday';
            dayElement.textContent = day;
            weekdaysRow.appendChild(dayElement);
        });
        
        this.container.appendChild(weekdaysRow);
        
        // Создаем сетку дней
        const daysGrid = document.createElement('div');
        daysGrid.className = 'calendar-days';
        
        const firstDay = new Date(this.currentYear, this.currentMonth, 1);
        const lastDay = new Date(this.currentYear, this.currentMonth + 1, 0);
        const startingDay = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1; // Корректировка для понедельника
        
        // Пустые ячейки для дней предыдущего месяца
        for (let i = 0; i < startingDay; i++) {
            const emptyCell = document.createElement('div');
            emptyCell.className = 'calendar-day empty';
            daysGrid.appendChild(emptyCell);
        }
        
        // Ячейки для дней текущего месяца
        for (let day = 1; day <= lastDay.getDate(); day++) {
            const date = new Date(this.currentYear, this.currentMonth, day);
            const dayElement = document.createElement('div');
            dayElement.className = 'calendar-day';
            dayElement.textContent = day;
            dayElement.setAttribute('data-date', date.toISOString().split('T')[0]);
            
            // Проверяем, заблокирована ли дата
            if (this.isDateBlocked(date)) {
                dayElement.classList.add('blocked');
            }
            
            // Проверяем, является ли дата прошедшей
            if (this.isPastDate(date)) {
                dayElement.classList.add('past');
            }
            
            // Проверяем, выбрана ли дата
            if (this.isDateSelected(date)) {
                dayElement.classList.add('selected');
                
                if (this.isCheckInDate(date)) {
                    dayElement.classList.add('check-in');
                } else if (this.isCheckOutDate(date)) {
                    dayElement.classList.add('check-out');
                }
            }
            
            // Проверяем, находится ли дата в выбранном диапазоне
            if (this.isDateInSelectedRange(date)) {
                dayElement.classList.add('in-range');
            }
            
            dayElement.addEventListener('click', () => this.handleDateClick(date));
            
            daysGrid.appendChild(dayElement);
        }
        
        this.container.appendChild(daysGrid);
        
        // Обновляем отображение выбранных дат
        this.updateSelectedDatesDisplay();
    }
    
    setupEventListeners() {
        // Навигация по месяцам
        const prevBtn = this.container.querySelector('.prev-month');
        const nextBtn = this.container.querySelector('.next-month');
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => this.previousMonth());
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.nextMonth());
        }
    }
    
    handleDateClick(date) {
        if (this.isDateBlocked(date) || this.isPastDate(date)) {
            return;
        }
        
        if (!this.selectedDates.checkIn || (this.selectedDates.checkIn && this.selectedDates.checkOut)) {
            // Выбираем дату заезда
            this.selectedDates.checkIn = date;
            this.selectedDates.checkOut = null;
        } else {
            // Выбираем дату выезда
            if (date > this.selectedDates.checkIn) {
                this.selectedDates.checkOut = date;
            } else {
                // Если выбрана дата раньше заезда, меняем их местами
                this.selectedDates.checkOut = this.selectedDates.checkIn;
                this.selectedDates.checkIn = date;
            }
        }
        
        this.renderCalendar();
    }
    
    isDateBlocked(date) {
        const dateString = date.toISOString().split('T')[0];
        return this.blockedDates.includes(dateString);
    }
    
    isPastDate(date) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return date < today;
    }
    
    isDateSelected(date) {
        const dateString = date.toISOString().split('T')[0];
        const checkInString = this.selectedDates.checkIn ? this.selectedDates.checkIn.toISOString().split('T')[0] : null;
        const checkOutString = this.selectedDates.checkOut ? this.selectedDates.checkOut.toISOString().split('T')[0] : null;
        
        return dateString === checkInString || dateString === checkOutString;
    }
    
    isCheckInDate(date) {
        const dateString = date.toISOString().split('T')[0];
        const checkInString = this.selectedDates.checkIn ? this.selectedDates.checkIn.toISOString().split('T')[0] : null;
        return dateString === checkInString;
    }
    
    isCheckOutDate(date) {
        const dateString = date.toISOString().split('T')[0];
        const checkOutString = this.selectedDates.checkOut ? this.selectedDates.checkOut.toISOString().split('T')[0] : null;
        return dateString === checkOutString;
    }
    
    isDateInSelectedRange(date) {
        if (!this.selectedDates.checkIn || !this.selectedDates.checkOut) {
            return false;
        }
        
        return date > this.selectedDates.checkIn && date < this.selectedDates.checkOut;
    }
    
    previousMonth() {
        this.currentMonth--;
        if (this.currentMonth < 0) {
            this.currentMonth = 11;
            this.currentYear--;
        }
        this.renderCalendar();
    }
    
    nextMonth() {
        this.currentMonth++;
        if (this.currentMonth > 11) {
            this.currentMonth = 0;
            this.currentYear++;
        }
        this.renderCalendar();
    }
    
    getMonthName(month) {
        const months = [
            'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
            'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
        ];
        return months[month];
    }
    
    updateSelectedDatesDisplay() {
        const checkInElement = document.getElementById('check-in-date');
        const checkOutElement = document.getElementById('check-out-date');
        
        if (checkInElement) {
            checkInElement.textContent = this.selectedDates.checkIn 
                ? this.formatDate(this.selectedDates.checkIn)
                : '--/--/----';
        }
        
        if (checkOutElement) {
            checkOutElement.textContent = this.selectedDates.checkOut 
                ? this.formatDate(this.selectedDates.checkOut)
                : '--/--/----';
        }
    }
    
    formatDate(date) {
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }
    
    reset() {
        this.selectedDates = {
            checkIn: null,
            checkOut: null
        };
        this.renderCalendar();
    }
}

// Инициализация календаря при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    const calendarContainer = document.getElementById('booking-calendar');
    if (calendarContainer) {
        window.bookingCalendar = new BookingCalendar('booking-calendar');
    }
});