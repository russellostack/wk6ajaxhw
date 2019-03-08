var movies = ["Firefly", "Cars", "Finding Nemo", "Transformers", "What We Do in the Shadows", "Monty Python's the Holy Grail,"];

//function that takes movie array and adds buttons to the html initialized with a data-movie attribute for each movie.
// can and will be called when new buttons are added.
function buttonMaker() {
    $("#gif-div").empty();
    for (var i = 0; i < movies.length; i++) {
        var newButton = $("<button>");
        newButton.addClass("btn btn-success movie-button");
        newButton.attr("data-movie", movies[i]);
        newButton.text(movies[i]);
        $("#buttons").append(newButton);
    };
};

//event listener for each gif button made, encompases ajax call to giphy api as well as pushing the results to html. adds 
// Do i need to keep the gifs from previous searches? if not keep as is, if so remove line 18.
$(document).on("click", ".movie-button", function () {
    $("#gif-div").empty();
    var newMovie = $(this).attr("data-movie");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + newMovie + "&api_key=idUSKX9OnepbhgPb8StIaa3e7IpaT2lq&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {
            var giphyObj = response.data;
            for (var i = 0; i < giphyObj.length; i++) {

                if (giphyObj[i].rating !== "r") {

                    var newGifDiv = $("<div>");
                    newGifDiv.addClass("gifs");
                    var rating = giphyObj[i].rating;
                    var p = $("<p>").text("Rating: " + rating);
                    var gifImg = $("<img>");
                    gifImg.attr("src", giphyObj[i].images.fixed_width.url);
                    gifImg.attr("data-animate", giphyObj[i].images.fixed_width.url);
                    gifImg.attr("data-still", giphyObj[i].images.fixed_width_still.url);
                    gifImg.attr("title", giphyObj[i].title);
                    gifImg.attr("data-state", "");
                    gifImg.addClass("gif");
                    newGifDiv.append(gifImg);
                    newGifDiv.prepend(p);
                    $("#gif-div").append(newGifDiv);
                    gifImg.attr("data-state", "animate");
                }
            }
        })
});

// movie submit event listener, adds movie from input to movie array then reruns the button maker.
$("#movie-button").on("click", function (event) {
    event.preventDefault();
    var movie = $("#movie-input").val().trim();
    if (movie === "" || $.inArray(movie, movies !== -1)) {
        return
    }
    movies.push(movie);
    buttonMaker();
});

// gif start and stop function event listener, starts with still gifs.
$(document).on("click", ".gif", function () {

    var state = $(this).attr("data-state");
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});
//runs the button maker function on page load with initial array.
buttonMaker();
