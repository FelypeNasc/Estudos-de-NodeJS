$( document ).ready(function() {
    const apiURL = "http://localhost:3040/gamesmagazine/"
    // listeners
    $('#send-button').on('click', () => {
        $.post({
            url: apiURL + 'test',
            data: JSON.stringify({
                id: $('#id-input').val(),
                game: $('#game-name-input').val(),
                year: $('#year-input').val(),
                genre: $('#genre-input').val(),
                multiplayer: $('#multiplayer-check').is(":checked"),
                offline: $("#offline-check").is(":checked"),
                crossplataform: $("#offline-check").is(":checked")
            })
        })
    })
});




// )