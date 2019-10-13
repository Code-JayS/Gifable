var gifs = ["The Office", "Chuck Norris", "failboat", "panda"];


function makeGif() {

    var gif = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/random?api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&tag=" + gif;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        var imageUrl = response.data.image_original_url;
        var stillUrl = response.data.images.original_still.url;
        console.log(stillUrl);
        $("#gifs-view").prepend(`<div class="card bg-dark text-white giphs"><img class="card-img" id= "gifControl" src="${imageUrl}" data-still="${stillUrl}" data-animate= "${imageUrl}" data-state="animate" alt="Gif"></div>`);
        
    });
}

// Function for displaying gif data
function renderButtons() {

    // empty the container to remove duplicates
    $("#buttons-view").empty();

    // Looping through the array of gifs
    for (var i = 0; i < gifs.length; i++) {

        
        var gifButton = $("<button>");
        //add class (THIS BUTTON HAS LOTS OF CLASS)
        gifButton.addClass("btn btn-outline-info mb-2 mx-sm-3 py-1 gif");
        // Adding a data-attribute
        gifButton.attr("data-name", gifs[i]);
        // Providing the initial button text
        gifButton.text(gifs[i]);
        // Adding the button to the GIF view div
        $("#buttons-view").append(gifButton);
    }

    //places the submit button back after .empty ****** commented out for design ***
    // $("#buttons-view").append(`<form class="form-inline" id="gif-form">
    //       <div class="form-group rounded mx-sm-3 mb-2">
    //           <label for="newGif" class="sr-only">Enter New Gif</label>
    //           <input type="text" class="text-info form-control" id="newGif" placeholder="Enter New Gif Here">
    //       </div>
    //       <button type="submit" class="btn btn-info mb-2" id="add-gif">Add that Gif</button>
    //   </form>`)
}
//gif button pauser thingy 
$(document.body).on("click", "#gifControl", gifStateChange);

function gifStateChange() {
    // get and set the value of data-states 
    var state = $(this).attr("data-state");
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  };




// gif button creator 
$(document.body).on("click","#add-gif", addAllgifs)
 function addAllgifs (event) {
    event.preventDefault();

    // get the input from the textbox
    var gif = $("#newGif").val().trim();

    gifs.push(gif);


    renderButtons();
};

// Function for displaying the gifs

$(document).on("click", ".gif", makeGif);

// Calling the renderButtons function to display the initial buttons
renderButtons();






