document.addEventListener('DOMContentLoaded', () => {

    const cartBtn = document.getElementById('cart');
    const cardWrapper = document.querySelector('.card-wrapper');
    const modalInfo = document.getElementById('Modal_more');
    const modalCart = document.getElementById('Modal_order');
    let cardDeck = document.getElementById('card-deck');
    let cartCounter = document.getElementById('cartCounter');
    let wishList = [];
    let cart = {};

    // console.log(modalInfo);

    // загрузка услуг на страницу
    loadService();
    checkCart();
    checkCount();

    const printServices = (out) => {
        let card = document.createElement('div');
        card.className = 'card-wrapper col-lg-4 col-md-6 col-sm-6 mb-4';
        card.innerHTML = out;
        cardDeck.append(card);
    }

    function loadService() {
        $.getJSON('service.json', function (data) {
            // console.log(data);
            let out;
            for (var key in data) {
                out = `<div class="card text-dark">
                            <img src="${data[key]['img']}" alt=""
                                class="card-img-top">
                            <div class="card-body text-center">
                                <h4 class="card-title font-weight-bold">${data[key]['type']}</h4>
                                <p class="card-text">${data[key]['text']}</p>
                            </div>
                            <div class="card-footer">
                                <span class="">${data[key]['price']} руб</span>
                            </div>
                            <div class="row">
                                <div class="col-md-6">
                                <button type="button" class="btn btn-primary more-info" data-id=${key} data-toggle="modal" data-target="#Modal_more">Подробнее
                                </button>
                                </div>
                                <div class="col-md-6">
                                <button type="button" class="btn order-button text-white add-to-cart" data-id=${key}>Заказать</button>
                                </div>
                            </div>
                            </div>`
                printServices(out);
            }
            // console.log(out);    
        })
    }

    const addToCart = id => {
        // добавление услуги в корзину
        let serviceId = id;
        if (cart[serviceId] != undefined) {
            cart[serviceId]++;
            // console.log(cart);
        }
        else {
            cart[serviceId] = 1;
            // console.log(cart);
        }
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    const showMoreInfo = id => {
        // modalInfo.innerHTML='';
        let out;
        $.getJSON('service.json', function (data) {
            out = `<div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h4 class="modal-title">${data[id].type}</h4>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                  <span class="sr-only">Close</span>
                </button>
              </div>
              <div class="modal-body">
                <div class="row">
                  <div class="col-md-5">
                    <div class="fotorama" data-nav="thumbs">
                      <img src="${data[id].img}" alt="">
                      <img src="${data[id].img}" alt="">
                      <img src="${data[id].img}" alt="">
                      <img src="${data[id].img}" alt="">
                    </div>
                  </div>
                  <div class="col-md-7">
                    <p>${data[id].description}</p>
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-primary">Оставить заявку</button>
              </div>
            </div><!-- /.modal-content -->
          </div><!-- /.modal-dialog -->`;
          console.log(out);
          modalInfo.innerHTML=out;
        })
    }

    function checkCount() {
        // подсчет количества в корзине
        cartCounter.textContent = Object.keys(cart).length;
        // console.log(cartCounter);
    }

    const handlerCard = event => {
        // обработчик добавления в корзину и wishList
        const target = event.target;
        // добавить в корзину
        if (target.classList.contains('add-to-cart')) {
            // console.log(event);
            // console.log(target.dataset);
            addToCart(target.dataset.id);
            checkCount();
        }
        if (target.classList.contains('more-info')) {
            // узнать подробнее
            // console.log(target.dataset);
            showMoreInfo(target.dataset.id);

        }
        // добавить в избранное
    }

    function checkCart() {
        // проверка наличия корзины в localStorage
        if (localStorage.getItem('cart') != null) {
            cart = JSON.parse(localStorage.getItem('cart'));
            // console.log(cart);
        }
        // console.log(localStorage.getItem('cart'));
    }

    // прослушиватель событий кнопок в "услугах"
    cardDeck.addEventListener('click', handlerCard);












})