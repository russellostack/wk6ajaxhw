var movies = ["Firefly", "cars", "Finding Nemo", "Transformers", "What We Do in the Shadows", "Monty Python's the Holy Grail,"];

function buttonMaker() {
    $("#gif-div").empty();
    for (var i = 0; i < movies.length; i++) {
        var newButton = $("<button>");
        newButton.addClass("btn btn-success movie-button");
        newButton.attr("data-movie", movies[i]);
        newButton.text(movies[i]);
        $("#gif-div").append(newButton);
    };
};
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
                    gifImg.attr("src", giphyObj[i].images.fixed_width_still.url)
                    gifImg.attr("data-still", giphyObj[i].images.fixed_width_still.url)
                    gifImg.attr("data-animate", giphyObj[i].images.fixed_width.url)
                    gifImg.attr("data-state", "still")
                    gifImg.addClass("gif");
                    newGifDiv.append(gifImg);
                    newGifDiv.append(p);
                    $("#gif-div").append(newGifDiv);
                }
            }
        })
});
$("#movie-button").on("click", function (event) {
    event.preventDefault();
    var movie = $("#movie-input").val().trim();
    if (movie === "") {
        return
    }
    movies.push(movie);
    buttonMaker();
});
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
buttonMaker();
