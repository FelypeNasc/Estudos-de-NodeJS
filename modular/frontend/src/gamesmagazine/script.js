$( document ).ready(function() {
    const apiURL = "http://localhost:3040/gamesmagazine/"
    // listeners
    $('#send-button').on('click', () => {
        $.post({
            url: apiURL + 'add-new-game',
            data: {
                id: $('#id-input').val(),
                game: $('#game-name-input').val(),
                year: $('#year-input').val(),
                genre: $('#genre-input').val(),
                multiplayer: $('#multiplayer-check').is(":checked"),
                offline: $("#offline-check").is(":checked"),
                crossplataform: $("#crossp-check").is(":checked")
            }
        })
        .done((data) => {
            data.forEach((currItem) => {
                const trueOrFalse = (key) => {
                    if (key == true) return 'Sim'; else return "Não"
                }
                $("#res-tbody").append(`
                    <tr>
						<td>${currItem.id}</td>
						<td>${currItem.game}</td>
						<td>${currItem.year}</td>
						<td>${trueOrFalse(currItem.multiplayer)}</td>
						<td>${trueOrFalse(currItem.offline)}</td>
						<td>${trueOrFalse(currItem.crossplataform)}</td>
					</tr>
                `)
            })
        })
    })
});




// )