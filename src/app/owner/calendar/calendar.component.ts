import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  @Input() orders: { startDate: string; endDate: string }[] = [];

  calendarDays: { date: Date, isOccupied: boolean }[] = [];
  currentMonth: number = new Date().getMonth();
  currentYear: number = new Date().getFullYear();

  ngOnInit(): void {
    this.generateCalendar();
  }

  generateCalendar(): void {
    const startOfMonth = new Date(this.currentYear, this.currentMonth, 1);
    const endOfMonth = new Date(this.currentYear, this.currentMonth + 1, 0);

    this.calendarDays = [];

    // Generate all days for the current month
    for (let day = 1; day <= endOfMonth.getDate(); day++) {
      this.calendarDays.push({
        date: new Date(this.currentYear, this.currentMonth, day),
        isOccupied: false
      });
    }

    // Mark occupied dates
    this.orders.forEach(order => {
      const startDate = new Date(order.startDate);
      const endDate = new Date(order.endDate);

      this.calendarDays.forEach(day => {
        if (day.date >= startDate && day.date <= endDate) {
          day.isOccupied = true;
        }
      });
    });
  }

  changeMonth(offset: number): void {
    this.currentMonth += offset;
    if (this.currentMonth < 0) {
      this.currentMonth = 11;
      this.currentYear--;
    } else if (this.currentMonth > 11) {
      this.currentMonth = 0;
      this.currentYear++;
    }
    this.generateCalendar();
  }
}
