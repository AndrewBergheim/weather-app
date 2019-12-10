
$("#search-button").on("click", function(){
    // parameter variable initialization
    let temperature;
    let humidity;
    let windSpeed;
    let uvIndex;
    //geo variable init
    let lat;
    let long;
    // variables for ajax request construction
    let apiKey = "9f3acf47fedf13c0f5ba5b0b771606a7";
    let city = $("#search-text").val();
    let firstQueryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&APPID=" + apiKey
    let secondQueryURL; // to be filled later
    //this next function is declared here but not called until later
    
    function UVCall(){
        $.ajax({
            url: secondQueryURL,
            method: "GET"
        }).then(function(response){
            console.log(response);
            uvIndex = response.value;
        })
    }
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
        // url for second query using coordinates
        secondQueryURL = "https://api.openweathermap.org/data/2.5/uvi?APPID=" + apiKey + "&lat=" + lat +"&lon=" + long;
        console.log(secondQueryURL);
        UVCall()

    //now for the second call
    })
    
});

