
var buttons = ["cat", "bull", "dog", "lion", "bear", "goat", "shark"];
//<button data-animal="bird">chirp</button>

$( document ).ready(function() {
    renewList();
});

$(document.body).on('click', ".btn-success" ,function(){
    event.preventDefault();
    var buttobval = $(".form-control").val().toLowerCase();

    //don't add to arry if already there
    if(buttons.indexOf(buttobval) == -1)
    buttons.push(buttobval);

    //show new animal from search
    loadEmUp($(".form-control").val());

    //
    renewList();
});

function renewList() {
    $("#btnList").empty();
    for (var i = 0; i < buttons.length; i++) {

        // Creating and storing a div tag
        var animalBtn = $("<button>");
        animalBtn.addClass("rounded ml-2")
    
        // take button string and make it lowercase
        animalBtn.html(buttons[i]);
    
    
        // Setting the src attribute of the image to a property pulled off the result item
        animalBtn.attr({
            "data-animal": buttons[i],
        });
    
        // Prependng the animalBtn to the HTML page in the "#gifs-appear-here" div
        $("#btnList").append(animalBtn);
    }
}