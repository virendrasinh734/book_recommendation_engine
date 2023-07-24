$(document).ready(function() {
    function getSuggestions() {
        let user_input = $("#user_input").val();

        $.ajax({
            url: "/get_suggestions",
            type: "GET",
            data: { user_input: user_input },
            success: function(data) {
                var dropdown = $("#suggestions-dropdown");
                dropdown.html(data);

                if (data.trim() !== "") {
                    dropdown.show();
                } else {
                    dropdown.hide();
                }
            }
        });
    }

    $("#user_input").on("input", function() {
        getSuggestions();
    });

    // Update the input field when a suggestion is clicked
    $(document).on("click", "#suggestions-dropdown div", function() {
        var selectedSuggestion = $(this).text();
        $("#user_input").val(selectedSuggestion);
        $("#suggestions-dropdown").hide();
        // Optionally, you can trigger the search automatically when a suggestion is clicked
        performSearch();
    });

    // Handle form submission for search
    $("#submit-button").click(function(event) {
        event.preventDefault();
        performSearch();
    });

    // Function to perform the search
    function performSearch() {
        console.log("Being Called")
        let user_input = $("#user_input").val().trim();
        if (user_input === "") {
            console.log("User input is empty");
            return;
        }
    
        // Make a POST request to the '/recommend' route with the user input data
        $.ajax({
            url: "/recommend",
            type: "POST",
            data: { user_input: user_input },
            success: function(data) {
                // Replace the search results container with the rendered HTML from the server
                console.log(data)
                if (data=="not found"){
                    $(".items").html("")
                    $(".head").html("Sorry, book not found.Please try different book!")
                    $(".rec").html(``);
                    
                }
                else{
                    $("body").html(data);
                    $(".head").html(`You searched for: ${user_input}`);
                    $(".rec").html(`->Recommended books: `);
                }    
                


            },
            error: function(xhr, textStatus, errorThrown) {
                console.log("Error:", errorThrown);
            }
        });
    }
    
    
    
    
    
    
    
    
});