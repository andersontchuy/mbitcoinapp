$(function() {
    const path = "https://www.mercadobitcoin.net/api";
    const selected = { id: 'btc' };

    loadCoin(selected);

    function elementId(id) {
      return document.getElementById(id);
    }
 
    function loadCoin(value) {
      showTicker(value);
      showOrderBook(value);
    }

    function showTicker(value) {
      const coin = value.target === undefined 
        ? selected : value.target;
      const field = { 
        last: elementId('ticker-last'),
        high: elementId('ticker-high'),
        low: elementId('ticker-low'),
        vol: elementId('ticker-vol')
      }

      field.last.innerHTML = '-';
      field.high.innerHTML = '-';
      field.low.innerHTML = '-';
      field.vol.innerHTML = '-';

      $.getJSON(`${path}/${coin.id}/ticker/`).done(function(data) {  
        field.last.innerHTML = `R$ ${parseFloat(data.ticker.last)
          .toFixed(2).replace('.', ',')}`;
        field.high.innerHTML = `R$ ${parseFloat(data.ticker.high)
          .toFixed(2).replace('.', ',')}`;
        field.low.innerHTML = `R$ ${parseFloat(data.ticker.low)
          .toFixed(2).replace('.', ',')}`;
        field.vol.innerHTML = `${parseFloat(data.ticker.vol)
          .toFixed(3).replace('.', ',')} ${coin.id.toUpperCase()}`; 
          
        console.log('ticker', data);
      });

      console.log('selectedCoin', selected);
      selected.id = coin.id;
      console.log(`URL: ${path}/${coin.id}/ticker/`);
    }

    function showOrderBook(value) {
      const coin = value.target === undefined 
        ? selected : value.target;
      const field = { title: elementId('orderbook-title') };

      $.getJSON(`${path}/${coin.id}/orderbook/`).done(function(data) {
        console.log('orderbook', data);
      });

      switch(coin.id) {
        case 'btc': 
          field.title.innerHTML = 'Negociações Bitcoin'; break;
        case 'ltc':
          field.title.innerHTML = 'Negociações Litecoin'; break;
        case 'bch':
          field.title.innerHTML = 'Negociações BCash'; break;
      }
    }

    elementId('btc').onclick = loadCoin;
    elementId('ltc').onclick = loadCoin;
    elementId('bch').onclick = loadCoin;

    setInterval(showTicker, 20000, selected);
});
