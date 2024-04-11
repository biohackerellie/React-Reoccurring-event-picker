import moment from 'moment-timezone';
import calculateNumberOfEvents from './calculateNumberOfEvents';

interface EventDateDetails {
	startDate: string;
	startTime: string;
	endTime: string;
	duration: number;
}

/**
 * Represents days of the week with Sunday as 0 and Saturday as 6.
 * This aligns with JavaScript's `getDay()` method on the `Date` object.
 */

type DayOfWeek = 0 | 1 | 2 | 3 | 4 | 5 | 6;

interface CreateEventDatesParams {
	startDate: string;
	dayOfWeek: DayOfWeek[]; // Array of days, ensuring each is between 0 and 6
	repeatUntil: string;
	startTime?: string;
	endTime?: string;
	timeZone: string | 'America/Denver';
}

/**
 * Custom function to generate an array of event dates based on specified start and end times,
 * repeating on specified days of the week until a given end date.
 * If start and end times are not provided, defaults to all day events.
 *
 * @param {CreateEventDatesParams} params - The parameters for creating event dates.
 * @returns {EventDateDetails[]} - Array of event objects with date and time details.
 */
export default function createEventDates(
	params: CreateEventDatesParams
): EventDateDetails[] {
	const {
		startDate,
		dayOfWeek,
		repeatUntil,
		timeZone,
		startTime = '00:00',
		endTime = '23:59',
	} = params;
	moment.tz.setDefault(timeZone);
	const formatTime = (date: moment.Moment): string => date.format('HH:mm');
	const formatDate = (date: moment.Moment): string => date.format('YYYY-MM-DD');

	const events: EventDateDetails[] = [];

	dayOfWeek.forEach((day) => {
		let currentStartDate = moment(startDate);

		while (currentStartDate.isoWeekday() !== (day === 0 ? 7 : day)) {
			currentStartDate.add(1, 'days');
		}

		let currentEndDate = moment(repeatUntil);
		currentEndDate.set({
			hour: 23,
			minute: 59,
			second: 59,
			millisecond: 999,
		});

		while (currentEndDate.isoWeekday() !== (day === 0 ? 7 : day)) {
			currentEndDate.add(-1, 'days');
		}

		const numberOfEvents = calculateNumberOfEvents(
			currentStartDate.toDate(),
			currentEndDate.toDate(),
			day
		);
		const duration = moment
			.duration(moment(endTime, 'HH:mm').diff(moment(startTime, 'HH:mm')))
			.asMilliseconds();

		for (let i = 0; i < numberOfEvents; i++) {
			const eventStart = currentStartDate
				.clone()
				.add(i * 7, 'days')
				.set({
					hour: moment(startTime, 'HH:mm').hour(),
					minute: moment(startTime, 'HH:mm').minute(),
				});
			const eventEnd = eventStart.clone().add(duration, 'milliseconds');

			events.push({
				startDate: formatDate(eventStart),
				startTime: formatTime(eventStart),
				endTime: formatTime(eventEnd),
				duration,
			});
		}
	});

	return events.sort((a, b) => moment(a.startDate).diff(moment(b.startDate)));
}
