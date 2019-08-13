// Adding click event listen listener to all buttons
$(document.body).on("click", "#btnList > button", loadEmUp);

//play pause
$(document.body).on('click', ".gif > img", function () {
    console.log(this);
    // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
    var state = $(this).attr("data-state");
    // If the clicked image's state is still, update its src attribute to what its data-animate value is.
    // Then, set the image's data-state to animate
    // Else set src to the data-still value
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});

function loadEmUp(nAnimal) {
    $("#gifs-appear-here").empty();
    // Grabbing and storing the data-animal property value from the button
    if ($(this).parents('#btnList').length) {
        var animal = $(this).attr("data-animal");
    } else {
        var animal = nAnimal;
    }
    // Constructing a queryURL using the animal name
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        animal + "&api_key=dc6zaTOxFJmzC&limit=10";

    // Performing an AJAX request with the queryURL
    $.ajax({
        url: queryURL,
        method: "GET"
    })
        // After data comes back from the request
        .then(function (response) {
            console.log(queryURL);

            console.log(response);
            // storing the data from the AJAX request in the results variable
            var results = response.data;

            // Looping through each result item
            for (var i = 0; i < results.length; i++) {

                // Creating and storing a div tag
                var animalDiv = $("<div>");
                animalDiv.addClass("gif col-lg-4 col-sm-12 mx-auto rounded")
                // Creating a paragraph tag with the result item's rating
                var p = $("<p>").text("Rating: " + results[i].rating);
                p.addClass("bg-dark mt-3 mb-0 rounded-top");
                p.attr({
                    "style": "width: 100%; color: white;"
                });


                // Creating and storing an image tag
                var animalImage = $("<img>");
                // Setting the src attribute of the image to a property pulled off the result item
                animalImage.attr({
                    "data-still": results[i].images.fixed_height_still.url,
                    "data-animate": results[i].images.fixed_height.url,
                    "data-state": "still",
                    "src": results[i].images.fixed_height_still.url,
                    "style": "width: 100%;"
                });

                animalImage.addClass("rounded-bottom");

                // Appending the paragraph and image tag to the animalDiv
                animalDiv.append(p);
                animalDiv.append(animalImage);

                // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
                $("#gifs-appear-here").prepend(animalDiv);
            }

        });
}
