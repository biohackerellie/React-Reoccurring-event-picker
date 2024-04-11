# 🗓️ React Reoccurring Event Picker

A TypeScript library for creating date-based events within a specified range, repeating on selected days of the week. This package leverages `moment-timezone` for date calculations, ensuring accurate time zone handling. It's designed to be flexible, allowing you to specify start and end times or default to all-day events.

## ✨ Features

- Generate events based on a range of dates.
- Events can repeat weekly on specified days.
- Define specific start and end times, or default to all-day events.
- Uses `moment-timezone` for accurate date handling across different time zones.

## 🛠 Installation

```bash
npm install react-reoccurring-event-picker # or pnpm, yarn, Bun.
```

## Usage

Import and call createEventDates to generate events:

```ts
import { createEventDates } from 'date-events-creator';

const events = createEventDates({
	startDate: '2024-01-01',
	dayOfWeek: [1, 3, 5], // Monday, Wednesday, Friday
	repeatUntil: '2024-01-31',
	startTime: '09:00',
	endTime: '17:00',
});

console.log(events);
```
