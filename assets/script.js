function searchFunction(city){
    // parameter variable initialization
    let temperature;
    let humidity;
    let windSpeed;
    let uvIndex;
    let date = new Date()
    let currentDate = "(" + (date.getMonth() + 1) +"/" + date.getDate() + "/" + date.getFullYear() + ")"
    //geo variable init
    let lat;
    let long;

    // time variable init (For Five Day Forecast)
    let futureDateRaw;
    let futureDateParsed;
    // variables for ajax request construction
    let apiKey = "9f3acf47fedf13c0f5ba5b0b771606a7";
    //let city = $("#search-text").val();
    let firstQueryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&APPID=" + apiKey
    let fiveDayQueryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&APPID=" + apiKey
    let secondQueryURL; // to be filled later
    //this next function is declared here but not called until later (so AJAX requests happen sequentially)
    
    function UVCall(){
        $.ajax({
            url: secondQueryURL,
            method: "GET"
        }).then(function(response){
            console.log(response);
            uvIndex = response.value;
            $("#current-UV").text(uvIndex)
        })
    }

    /* save data to local storage
    //push city to cities array
    citiesArray.push(city);
    // save search history to local storage
    localStorage.setItem("searchHistory", citiesArray)
    // save city as last searched
    localStorage.setItem("lastSearch", city)
    */

    //now make the actual ajax request
    $.ajax({
        url: firstQueryURL,
        method: "GET"
    }).then(function(response){
        console.log(response)
        //record temperature data
        temperature = response.main.temp;
        humidity = response.main.humidity;
        windSpeed = response.wind.speed;
        //record geo data
        lat = response.coord.lat;
        console.log("lat" + lat)
        long = response.coord.lon;
        console.log("long" + long)

        // add temperature data to html
        $("#city-name-date").text(city + " " + currentDate)
        $("#current-temp").text("Temperature: " + temperature + " °F")
        $("#current-humidity").text("Humidity: " + humidity + "%")
        $("#current-wind").text("Wind Speed: " + windSpeed + " MPH")


        // url for second query using coordinates
        secondQueryURL = "https://api.openweathermap.org/data/2.5/uvi?APPID=" + apiKey + "&lat=" + lat +"&lon=" + long;
        console.log(secondQueryURL);
        //now for the second call
        UVCall()
    })

    // call the five day forecast data
    $.ajax({
        url:fiveDayQueryURL,
        method: "GET"
    }).then(function(response){
        console.log("Five Day Forecast")
        console.log(response)
        /* since there are 8 sets of data per day, a for loop that runs 5 times (once per day) 
        and incremements by 8 each time (8,16,24,32,40) will grab a data set for each 24 hour period */
        for (let i = 8; i < 41; i += 8){
            let currentSet = response.list[i-1] //uses i-1 due to zero indexing
            let thisDay = $("#forecast-day-" + (i/8))
            //console.log(currentSet)
            
            // construct date (multiplied by 1000 because date is stored in seconds rather than ms)
            futureDateRaw = new Date(currentSet.dt * 1000) 

            futureDateParsed = "(" + (futureDateRaw.getMonth() + 1 )+"/" + futureDateRaw.getDate() + "/" + futureDateRaw.getFullYear() + ")"
            console.log(futureDateRaw)
            // add data to children //
            thisDay.children(".forecast-date").text(futureDateParsed)
            thisDay.children(".forecast-temp").text("Temp: " + currentSet.main.temp + " °F")
            thisDay.children(".forecast-humidity").text("Humidity: " + currentSet.main.humidity + "%")
        }

    })
    
}

$("#search-button").on("click", function(){
    let city = $("#search-text").val()
    searchFunction(city)  
});

