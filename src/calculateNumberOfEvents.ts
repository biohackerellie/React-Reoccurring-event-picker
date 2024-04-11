/**
 * Calculates the number of events that occur on a specific day of the week within a given date range.
 *
 * @param {Date} startDate - The start date of the period to calculate events for.
 * @param {Date} repeatUntil - The end date of the period.
 * @param {number} dayOfWeek - The day of the week to count occurrences of (0=Sunday, 1=Monday, ..., 6=Saturday).
 * @returns {number} - The number of times the specified day of the week occurs between the start and end dates.
 */
export default function calculateNumberOfEvents(
	startDate: Date,
	repeatUntil: Date,
	dayOfWeek: number
): number {
	let count = 0;
	let current = new Date(startDate);
	while (current <= repeatUntil) {
		if (current.getDay() === dayOfWeek) {
			count++;
		}
		current.setDate(current.getDate() + 1);
	}
	return count;
}
