window.onload = function() {
    function elementId(id) {
        return document.getElementById(id);
    }

    function showTalk(event) {
        const talk = event.target.innerHTML;
        elementId('txt').innerHTML = `Negociações ${talk}`;
    }

    elementId('btc').onclick = showTalk;
    elementId('ltc').onclick = showTalk;
    elementId('bch').onclick = showTalk;
}