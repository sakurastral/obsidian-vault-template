// Code adapted from @chokko, @reaty, @JRyven, and @solarboi on Obsidian forum, and Modified by @sakurastral
// https://forum.obsidian.md/t/i-created-the-date-picker-with-the-templater-plugin/55782

async function datePicker(placeholder = "") {
  // Calls Templater API for use in script
  const tp = app.plugins.plugins["templater-obsidian"].templater.current_functions_object

  // Set up constants for script
  const dayOfWeek = moment().day()
  const showDateFormat = "MM / DD (dd)"
  const manualFormat = "YYYY MM DD"
  const dateFormat = "YYYY-MM-DD"

  // Sets up a set of pre-made suggestions - today, tomorrow, and the previous 7 days
  const suggestions = new Map()
  suggestions.set(
    "Yesterday, " + moment().subtract(1, 'days').format(showDateFormat),
    moment().subtract(1, 'days')
  )
  suggestions.set(
    "Today, " + moment().format(showDateFormat),
    moment()
  )
  suggestions.set(
    "Tomorrow, " + moment().add(1, 'days').format(showDateFormat),
    moment().add(1, 'days')
  )
  suggestions.set(
    moment().add(2, 'days').format(showDateFormat),
    moment().add(2, 'days')
  )
  suggestions.set(
    moment().add(3, 'days').format(showDateFormat),
    moment().add(3, 'days')
  )
  suggestions.set(
    moment().add(4, 'days').format(showDateFormat),
    moment().add(4, 'days')
  )
  suggestions.set(
    moment().add(5, 'days').format(showDateFormat),
    moment().add(5, 'days')
  )
  suggestions.set(
    moment().add(6, 'days').format(showDateFormat),
    moment().add(6, 'days')
  )
  suggestions.set(
    moment().add(7, 'days').format(showDateFormat),
    moment().add(7, 'days')
  )
  suggestions.set(
    "Manual",
    null
  )
  suggestions.set(
    "> Calendar",
    "full date picker"
  )

  // Prompts for selection
  const selection = await tp.system.suggester(
    [...suggestions].map(([k, v]) => k !== "Manual" ? k + " (" + v.format(dateFormat) + ")" : k),
    Array.from(suggestions.values()),
    false, //throwOnCancel
    placeholder,
  )

  // Resolves selection
  let resultDate = null
  if (!selection) {
    // Asks for manual input if user selected "Manual"
    inputDate = await tp.system.prompt("Type a date (Format: " + manualFormat + ", Example: " + moment().format(manualFormat) + "):")
    resultDate = moment(inputDate, manualFormat)
    if (!resultDate.isValid()) {
      resultDate = moment()
    }
  } else
    if (selection == "full date picker") {
      // This is a full year/month/day picker

      // Year picker
      let thisYear = Number(tp.date.now("YYYY"))
      let yearList = []
      for (let i = 0; i < 10; i++) {
        yearList.push(thisYear + i)
      }
      let year = await tp.system.suggester(yearList, yearList)

      // Month picker
      if (year != null) {
        let month = await tp.system.suggester([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])

        // Day picker
        if (month != null) {
          let daysInMonth = new Date(year, month, 0).getDate();
          let dateList = []
          for (let i = 1; i <= daysInMonth; i++) {
            dateList.push(i)
          }
          const getDateString = (year, month, date) => {
            const dateStringFix = (num) => {
              if (num < 10) {
                return "0" + num
              } else return "" + num
            }
            return year + "-" + dateStringFix(month) + "-" + dateStringFix(date)
          }
          // Formats dates for picking
          let dateListString = dateList.map(d => {
            let rawString = getDateString(year, month, d)
            let weekdayString = tp.date.now("d", 0, rawString, dateFormat)
            let resultString = tp.date.now(showDateFormat, 0, rawString, dateFormat)
            if (weekdayString == 0) {
              resultString = resultString + "   ________________________________________________________"
            }
            return resultString
          })
          let date = await tp.system.suggester(dateListString, dateList)

          if (date != null) {
            resultDate = getDateString(year, month, date)
          }
        }
      }
    } else {
      // This returns whatever was specifically selected from the preset entries
      resultDate = selection
    }

  function createArrayWithLeadingZeros(n) {
    const arr = [];
    for (let i = 0; i <= n; i++) {
      const formattedNumber = String(i).padStart(2, '0');
      arr.push(formattedNumber);
    }
    return arr;
  }

  let hour = await tp.system.suggester(
    createArrayWithLeadingZeros(23),
    createArrayWithLeadingZeros(23),
    false, //throwOnCancel
    placeholder,
  )
  if (!hour) {
    hour = "17"
  }

  let minute = await tp.system.suggester(
    createArrayWithLeadingZeros(59),
    createArrayWithLeadingZeros(59),
    false, //throwOnCancel
    placeholder,
  )
  if (!minute) {
    minute = "00"
  }
  // const timeZone = moment().format("Z")
  const time = "T" + hour + ":" + minute + ":00" //+ timeZone

  return resultDate.format(dateFormat) + time // YYYY-MM-DDTHH:mm:ss
}
module.exports = datePicker