
$("#search-button").on("click"){
    // variables for ajax request construction
    let apiKey = 
    let queryURL = 
    //now make the actual ajax request
    $.ajax({
        url: queryURL ,
        method: "GET"
    }).then(function(response){
        //function to add ajax info onto the page
    });
};