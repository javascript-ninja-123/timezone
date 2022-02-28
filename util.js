const time_format = (d, timeZone) => {

    const time = d.toLocaleString("en-US", {timeZone, hour: "2-digit", minute:"2-digit", second:"2-digit", hour12: false})
    return time; 

}



module.exports = {
    time_format
}