


const DateTimeFormat = (DateTime) => {
    const parsedDateTime = new Date(DateTime);

    // Set seconds to 0
    parsedDateTime.setSeconds(0);

    // Format the adjusted date and time back to the same format
    const adjustedDateTime = parsedDateTime.toLocaleString('en-US', {
    month: 'numeric',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: true
});

return adjustedDateTime;


}


module.exports = DateTimeFormat;