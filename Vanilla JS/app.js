import View from "./view.js";
import Store from "./store.js";

const players = [
    {
        id: 1,
        name: 'Player 1',
        iconClass: 'fa-x',
        colorClass: 'yellow',
    },
    {
        id: 2,
        name: 'Player 2',
        iconClass: 'fa-o',
        colorClass: 'turquoise',
    }
]

function init() {
    const view = new View();
    const store = new Store("Live-tt-storage-key", players);


    window.addEventListener('storage', () => {

        view.render(store.game, store.stats)

    })

    view.render(store.game, store.stats)

    view.bindGameResetEvent(e => {

        store.reset();

        view.render(store.game, store.stats)

    })

    view.bindNewRoundEvent(e => {
        store.newRound();
        view.render(store.game, store.stats)
    });

    view.bindPlayerMoveEvent((square) => {

        const existingMove = store.game.moves.find((move) => move.squareId === +square.id);

        if (existingMove) {
            return
        }

        store.playerMove(+square.id);

        view.render(store.game, store.stats);
    })
}

window.addEventListener('load', init())