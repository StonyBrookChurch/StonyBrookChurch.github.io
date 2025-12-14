import { DateTime }  from 'luxon';

const days = {
    'mon': 1,
    'tue': 2,
    'wed': 3,
    'thu': 4,
    'fri': 5,
    'sat': 6,
    'sun': 7
}

export function getNextDayOfWeek(day) {
    const dayOfWeek = days[day.toLowerCase().substring(0, 3)];
    const now = DateTime.local();
    let offset = now.weekday - dayOfWeek;
    if (offset <= 0) {
        offset += 7;
    }
    return now.plus({ days: 7 - offset });
}

export function getNextWednesday() {
  return getNextDayOfWeek('Wednesday');
}

export default function getNextSunday() {
    return getNextDayOfWeek('Sunday');
}
