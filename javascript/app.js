var movies = ["Firefly", "cars", "Finding Nemo", "Transformers", "What We Do in the Shadows", "Monty Python's the Holy Grail"];

function buttonMaker(){
    for (var i=0; i < movies.length; i++){
    var newButton = $("#button");
    newButton.addClass("btn btn-success");
    newButton.attr("data-movie",movies[i]);
    newButton.text(movies[i]);
    $("#gif-div").append(newButton);
    };
    $(".movie-button").on("click", function(){
        $("#gifs").remove();
        var newMovie = $(this).attr("data-movie");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + newMovie + "&api_key=OKuVGjgT0V7r20tpzmToIqOjeggIVUYM&limit=10";
        $.ajax({
            url: queryURL,
            method:"GET"
        })
        .then(function(response){
            var giphyObj = response.data;
            for (vari=0;i<giphyObj.length;i++){
                if (giphyObj[i].rating !== "r"){
                    var newGifDiv = $("<div>");
                    newGifDiv.addClas("gifs");
                    var rating = giphyObj[i].rating;
                    
                }
            }
        })
    })
};