export default function parseDate(title) {
    const words = title.split(' ');
    if (words.length > 0) {
      const parts = words[0].split(/[.\-]/);
      if (parts.length === 3) {
        let year = parts[2];
        let month = parts[0];
        if (month.length < 2) {
          month = `0${month}`;
        }
        let day = parts[1];
        if (day.length < 2) {
          day = `0${day}`;
        }
        return `${year}-${month}-${day}`;
      }
    }
    return null;
  }