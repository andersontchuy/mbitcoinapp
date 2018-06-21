$(function() {
    const path = "https://www.mercadobitcoin.net/api";

    loadBitcoin();

    function elementId(id) {
        return document.getElementById(id);
    }
 
    function loadBitcoin() {
      const tickerLast = elementId('ticker-last');
      const tickerHigh = elementId('ticker-high');
      const tickerLow = elementId('ticker-low');
      const tickerVol = elementId('ticker-vol');

      tickerLast.innerHTML = '-';
      tickerHigh.innerHTML = '-';
      tickerLow.innerHTML = '-';
      tickerVol.innerHTML = '-';

      $.getJSON(`${path}/btc/ticker/`, function(data) {
          const last = parseFloat(data.ticker.last).toFixed(2);
          const high = parseFloat(data.ticker.high).toFixed(2);
          const low = parseFloat(data.ticker.low).toFixed(2);
          const vol = parseFloat(data.ticker.vol).toFixed(3);

          tickerLast.innerHTML = `R$ ${last}`;
          tickerHigh.innerHTML = `R$ ${high}`;
          tickerLow.innerHTML = `R$ ${low}`;
          tickerVol.innerHTML = `${vol} BTC`; 

          console.log(data);
        });
    }

    function showTicker(event) {
        const coin = event.target;
        elementId('txt').innerHTML = `Negociações ${coin.innerHTML}`;

        $.getJSON(`${path}/${coin.id}/ticker/`).done(function(data) {  
          console.log(data);
        });

        console.log(`${path}/${coin.id}/ticker/`);
        
    }

    elementId('btc').onclick = showTicker;
    elementId('ltc').onclick = showTicker;
    elementId('bch').onclick = showTicker;

    setInterval(loadBitcoin, 20000);
});