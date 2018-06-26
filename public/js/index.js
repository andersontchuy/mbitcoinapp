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
      showTrades(value);
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
      const field = { title: elementId('negotiations-title') };

      $.getJSON(`${path}/${coin.id}/orderbook/`).done(function(data) {
        const bids = data.bids;
        const asks = data.asks;

        bids.forEach(function(element, index) {
          if(index < 20) {
            $('.bids-head')
            .append($('<tr />').addClass('bids-row'))
            .append(
              $('<td />').addClass('quantity bids-quantity')
                .text(element[1].toFixed(5).replace('.', ',')),
              $('<td />').addClass('price bids-price')
                .text(element[0].toFixed(5).replace('.', ','))
            );
          }
        });

        asks.forEach(function(element, index) {
          if(index < 20) {
            $('.asks-head')
            .append($('<tr />').addClass('asks-row'))
            .append(
              $('<td />').addClass('quantity asks-quantity')
                .text(element[1].toFixed(5).replace('.', ',')),
              $('<td />').addClass('price asks-price')
                .text(element[0].toFixed(5).replace('.', ','))
            );
          }
        });

        console.log('bids', bids);
        console.log('asks', asks);
      });

      $('.bids-row').remove();
      $('.bids-price').remove();
      $('.bids-quantity').remove();

      $('.asks-row').remove();
      $('.asks-price').remove();
      $('.asks-quantity').remove();

      switch(coin.id) {
        case 'btc': 
          field.title.innerHTML = 'Últimas Negociações Bitcoin'; break;
        case 'ltc':
          field.title.innerHTML = 'Últimas Negociações Litecoin'; break;
        case 'bch':
          field.title.innerHTML = 'Últimas Negociações BCash'; break;
      }
    }

    function showTrades(value) {
      const coin = value.target === undefined 
        ? selected : value.target;

      $.getJSON(`${path}/${coin.id}/trades/`).done(function(data) {
        data.forEach(function(element, index) {
          if(index < 20) {
            $('.trades-head')
            .append($('<tr />').addClass('trades-row'))
            .append(
              $('<td />').addClass('date trades-date')
                .text(element.date),
              $('<td />').addClass(`type trades-type 
              ${element.type === "sell" ? 'trades-sell' : 'trades-buy'}`)
                .text(element.type === 'sell' ? 'Venda' : 'Compra'),
              $('<td />').addClass('quantity trades-quantity')
                .text(element.amount.toFixed(5).replace('.', ',')),
              $('<td />').addClass('price trades-price')
                .text(element.price.toFixed(5).replace('.', ','))   
            );
          }
        }) 
        console.log('trades', data);
      });

      $('.trades-row').remove();
      $('.trades-date').remove();
      $('.trades-type').remove();
      $('.trades-quantity').remove();
      $('.trades-price').remove();
    }

    elementId('btc').onclick = loadCoin;
    elementId('ltc').onclick = loadCoin;
    elementId('bch').onclick = loadCoin;

    setInterval(showTicker, 20000, selected);
});
