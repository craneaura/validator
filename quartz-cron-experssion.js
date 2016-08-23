export default class QuartzCronExperssion {

  static isValid(cronExpression) {
    const units = cronExpression.split(' ');
    if (!Array.isArray(units) || units.length < 6 || units.length > 7) {
      return false;
    }
    const secondsRegex = /^\*|0*[1-5]?\d([,-]0*[1-5]?\d|\/\d+(?!\/))*$/;
    const minutesRegex = /^\*|0*[1-5]?\d([,-]0*[1-5]?\d|\/\d+(?!\/))*$/;
    const hoursRegex = /^\*|0*(1?\d|2[0-3])([,-]0*(1?\d|2[0-3])|\/0*(1?\d|2[0-3])(?!\/))*$/;
    const dayOfMonthRegex = /^\*|\?|L-0*([1-9]|[12]?\d|30)?|0*([1-9]|[12]?\d|3[01])W|0*([1-9]|[12]?\d|3[01])([,-]0*([1-9]|[12]?\d|3[01])|\/0*([1-9]|[12]?\d|3[01])(?!\/))*$/;
    const monthRegex = /^\*|0*(\d|1[01])([,-]0*(\d|1[01])|\/0*(\d|1[01])(?!\/))*|(JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC)([,-](JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC)(?!-\d)|\/(JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC|0*(\d|1[01]))(?!\/)|[,-]0*(\d|1[01]))*$/;
    const dayOfWeekRegex = /^\*|\?|0*[1-7](#[1-5]|L|([,-]0*[1-7]|\/\d+(?!\/))*)|(SUN|MON|TUE|WED|THU|FRI|SAT)(#[1-5]|L|([,-](SUN|MON|TUE|WED|THU|FRI|SAT)(?!-\d)|\/(SUN|MON|TUE|WED|THU|FRI|SAT|\d+)(?!\/)|,0*[1-7])*)$/;
    const yearRegex = /^\*|0*\d{1,4}$/;

    // seconds, minutes, hours, day-of-month
    if (!secondsRegex.test(units[0]) || !minutesRegex.test(units[1]) || !hoursRegex.test(units[2]) || !dayOfMonthRegex.test(units[3])) {
      return false;
    }
    // month
    if (!monthRegex.test(units[4])) {
      return false;
    }
    // day-of-week
    if (!dayOfWeekRegex.test(units[5])) {
      return false;
    }
    if (units[5] === '?' && units[3] === '?') {
      // '?' can only be specfied for Day-of-Month -OR- Day-of-Week.
      return false;
    } else if (units[5] !== '?' && units[3] !== '?') {
      // Support for specifying both a day-of-week AND a day-of-month parameter is not implemented.
      return false;
    }
    // year (optional)
    if (units.length === 7 && !yearRegex.test(units[6])) {
      return false;
    }

    return true;
  }
}
