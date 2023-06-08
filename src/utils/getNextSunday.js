import { DateTime }  from 'luxon';

export default function getNextSunday() {
  const now = DateTime.local();
  return now.plus({ days: 7 }).startOf('week').minus({ days: 1 }).toString();
}