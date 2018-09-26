'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/*
* Привет, Виталий.
* Ниже логика сайта. Старался сделать все через конструкторы и не слишком уходя в ес6.
* Но все равно весь код необходимо прогнать через бабель, иначе на старых брузерах нихуя работать не будет/
* Коменты и понятные названия должны тебе помочь, если что - пиши в телегу.
*
* */

/*
 *  * галерейка образцов. Работает на слике, нихуя хитрого и сложного.
 *  Работает так
 *  Sample($(dom-element-link));
 *
 * */
var Sample = function (items) {
    var SampleConstructor = function SampleConstructor(item) {
        var _this = this;

        this.init = function (item) {
            var index = item.data('id');

            index ? '' : index = 'index';
            item.slick(_this.config[index]);
        };
        this.config = {
            index: {
                dots: false,
                infinite: true,
                speed: 300,
                slidesToShow: 6,
                slidesToScroll: 1,
                prevArrow: '<div class="b-sample__arrow b-sample__arrow--prev"><span class="b-sample__strip"></span></div>',
                nextArrow: '<div class="b-sample__arrow b-sample__arrow--next"><span class="b-sample__strip"></span></div>',
                swipeToSlide: true,
                responsive: [{
                    breakpoint: 1170,
                    settings: {
                        slidesToShow: 5,
                        slidesToScroll: 1
                    }
                }, {
                    breakpoint: 800,
                    settings: {
                        slidesToShow: 4,
                        slidesToScroll: 1
                        //  arrows: true,
                    }
                }, {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1,
                        arrows: true
                    }
                }]
            },
            item: {
                dots: false,
                infinite: true,
                speed: 300,
                slidesToShow: 5,
                slidesToScroll: 1,
                prevArrow: '<div class="b-sample__arrow b-sample__arrow--prev"><span class="b-sample__strip"></span></div>',
                nextArrow: '<div class="b-sample__arrow b-sample__arrow--next"><span class="b-sample__strip"></span></div>',
                swipeToSlide: true,
                responsive: [{
                    breakpoint: 1170,
                    settings: {
                        slidesToShow: 4,
                        slidesToScroll: 1
                    }
                }, {
                    breakpoint: 800,
                    settings: {
                        slidesToShow: 4,
                        slidesToScroll: 1
                        //  arrows: true,
                    }
                }, {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1,
                        arrows: true
                    }
                }]
            }
        };
        this.init(item);
    };
    return {
        init: function init(items) {
            new SampleConstructor(items);
        }
    };
}();

/*
* Вызываю так, ибо удобно
* */

/*Модуль меню */
var Menu = function () {
    /*Поиск в хэдере*/
    var SearchInHeader = function SearchInHeader() {
        var _this2 = this;

        this.init = function () {
            _this2.state = false;
            _this2.root = $('.i-search');
            _this2.input = _this2.root.find('.i-search__input');
            _this2.link = _this2.root.find('.i-search__link');
            $(document).on('click', function (e) {
                $(e.target).parents().hasClass('i-search') ? '' : _this2.closeField();
            });
            _this2.root.on('submit', function (e) {
                _this2.controller(e);
            });
            _this2.link.on('click', function (e) {
                _this2.controller(e);
            });
        };
        this.controller = function (e) {
            if (_this2.state) {
                /*
                * тут можно аяксом гонять за результатом поиска и юзать метод this.closeField для выпиливания поля.
                * Или можно нихуя не делать и тогда сработает стандартный экшн у формы
                * */
            } else {
                e.preventDefault();
                _this2.openField();
            }
        };
        this.closeField = function () {
            _this2.root.removeClass('active');
            _this2.state = false;
        };
        this.openField = function () {
            _this2.root.addClass('active');
            _this2.state = true;
            _this2.input.focus();
        };
        this.init();
    };
    /*Открывашка-закрывашка  меню*/
    var MenuInner = function MenuInner() {
        var _this3 = this;

        this.init = function () {
            _this3.state = false;
            _this3.root = $('.i-navbar');
            _this3.nav = $('.i-navbar__list');
            _this3.icon = $('.i-navbar__link');
            _this3.icon.on('click', function () {

                _this3.controller();
            });
            $(document).on('click', function (e) {
                $(e.target).parents().hasClass('i-navbar') ? '' : _this3.close();
            });
            //this.controller();
        };
        this.controller = function () {
            _this3.state ? _this3.close() : _this3.open();
        };
        this.open = function () {
            _this3.nav.addClass('show');
            _this3.state = true;
            _this3.icon.addClass('active');
        };
        this.close = function () {
            _this3.icon.removeClass('active');
            _this3.nav.removeClass('show');
            _this3.state = false;
        };
        this.init();
    };
    /*Спойлер(ака аккардеон ака кат)  меню */
    var MenuSpoiler = function MenuSpoiler(item) {
        var _this4 = this;

        this.init = function (item) {
            /*По дефолту спойлеры закрыты, но потом можно утащить стейт в дата-атрибут и задавть его с бэка*/
            _this4.state = false;
            _this4.root = $(item);
            _this4.link = _this4.root.find('.i-navSpoil__icon');
            _this4.list = _this4.root.find('.i-navSpoil__list');
            _this4.link.on('click', function (e) {
                e.preventDefault();
                _this4.controller();
            });
            $(document).on('click', function (e) {
                $(e.target).parents().hasClass('i-navSpoil') ? '' : _this4.close();
            });
        };
        this.controller = function () {
            _this4.state ? _this4.close() : _this4.open();
        };
        this.open = function () {
            _this4.root.addClass('show');
            _this4.state = true;
            _this4.link.addClass('active');
        };
        this.close = function () {
            _this4.link.removeClass('active');
            _this4.root.removeClass('show');
            _this4.state = false;
        };
        this.init(item);
    };
    var Fixed = function Fixed() {
        var _this5 = this;

        this.init = function () {
            _this5.item = $('.i-fixed');
            _this5.wrapper = $('.i-fixed__wrapper');
            $(window).scroll(function (e) {
                if ($(document).scrollTop() > _this5.wrapper.offset().top) {
                    _this5.item.addClass('fixed');
                } else {
                    _this5.item.removeClass('fixed');
                }
            });
        };
        this.init();
    };
    return {
        /*Инициализация всей портянки*/
        init: function init() {
            var _this6 = this;

            this.menu = new MenuInner();
            this.spoilers = [];
            $('.i-navSpoil').each(function (i, item) {
                _this6.spoilers.push(new MenuSpoiler(item));
            });
            this.searchBlock = new SearchInHeader();
            this.fixed = new Fixed();
            console.log(this);
        }
    };
}();

var ItemSlider = function () {
    var setSlider = function setSlider() {
        var _this7 = this;

        this.init = function () {
            _this7.slider = $('.i-topslider').slick(_this7.config().top);

            _this7.controller();
        };
        this.controller = function () {
            $('.i-topslider__controlls').find('.i-topslider__cont').each(function (index, item) {

                new ControlConstructor(item, index, _this7.slider);
            });
        };
        var ControlConstructor = function ControlConstructor(item, index, slider) {
            var _this8 = this;

            this.init = function () {
                _this8.number = index;
                _this8.item = item;
                $(_this8.item).on('click', function () {
                    _this8.action();
                });
            };
            this.action = function () {
                slider.slick('slickGoTo', _this8.number);
            };
            this.init();
        };
        this.config = function () {
            return {
                top: {
                    dots: false,
                    infinite: true,
                    speed: 300,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false
                }
            };
        };
        this.init();
    };
    return {
        init: function init() {
            this.init = new setSlider();
            console.log(this);
        }
    };
}();

/*
*   Табы, работают через признак в датаатрибуте.
* */
var Tabs = function () {

    /*Класс табов*/
    var Tabslogic = function Tabslogic(item, className) {
        var _this9 = this;

        this.init = function (item, className) {
            _this9.root = item;
            _this9.link = $(_this9.root).find(className + '__link');
            _this9.list = $(_this9.root).find(className + '__list');
            _this9.state = $(_this9.root).data('default') || _this9.list[0].dataset.type;

            _this9.link.on('click', function (e) {
                _this9.onClickInLink(e);
            });
            _this9.action();
        }, this.onClickInLink = function (e) {
            e.preventDefault();
            var item = e.target;
            var type = e.target.dataset.id;
            _this9.state = type;
            _this9.action();
        };
        this.action = function () {
            _this9.list.each(function (item) {

                if (_this9.list[item].dataset.id === _this9.state) {
                    $(_this9.list[item]).addClass('active');
                } else {
                    $(_this9.list[item]).removeClass('active');
                }
            });
        };
        this.init(item, className);
    };

    return {
        /*ищем род узлы табов и инициализируем классы */
        init: function init(className) {
            var _this10 = this;

            /* хак, чтобы подменять класс, так на всякий случай*/

            className == undefined ? className = '.i-tabs' : '';

            $(className).each(function (index, item) {

                _this10.tablist.push(new Tabslogic(item, className));
            });
        },
        tablist: []
    };
}();
var CitySelector = function (className) {
    var CityClass = function CityClass(item, className, GetList) {
        var _this11 = this;

        this.init = function (item, className, GetList) {
            _this11.root = item;
            _this11.globalList = GetList();
            _this11.link = $(_this11.root).find(className + '__link');
            _this11.list = $(_this11.root).find(className + '__list');

            _this11.state = false;

            _this11.link.on('click', function (e) {
                _this11.controller(e);
            });
        };
        this.controller = function (e) {
            !_this11.state ? _this11.forward(e) : _this11.back(e);
        };
        this.forward = function (e) {
            e.preventDefault();
            _this11.link.addClass('active');
            $(_this11.globalList).each(function (i, item) {
                $(item.root).hide();
            });
            $(_this11.root).show();
            $(_this11.root).addClass('active');
            _this11.list.addClass('active');
            _this11.state = true;
        };
        this.back = function () {
            $(_this11.globalList).each(function (i, item) {
                $(item.root).show();
            });
            $(_this11.root).removeClass('active');
            _this11.link.removeClass('active');
            _this11.list.removeClass('active');
            _this11.state = false;
        };
        this.init(item, className, GetList);
    };
    return {
        init: function init(className) {
            var _this12 = this;

            var GetList = function GetList() {
                return _this12.list;
            };
            className == undefined ? className = '.i-adres' : '';
            $(className).each(function (index, item) {
                _this12.list.push(new CityClass(item, className, GetList));
            });
        },
        list: []
    };
}();
var Map = function (ymaps) {

    var MapControll = function MapControll(ymaps, map) {
        var _this13 = this;

        this.init = function () {
            var city = void 0;
            /*если кликаем на город, мутим экшн*/
            $('.i-adres__link').on('click', function (e) {
                _this13.clickToCity(e);
            });
        };
        this.clickToCity = function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(e) {
                var city, cityCoord, shopCoord;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                city = e.target.dataset.cityname;
                                cityCoord = void 0, shopCoord = void 0;
                                /*асинхронно идем за кеообъектами магазинов*/

                                _context.next = 4;
                                return _this13.getShopCoord(city).then(function (res) {
                                    shopCoord = res;
                                });

                            case 4:
                                _context.next = 6;
                                return _this13.getCoord(city).then(function (res) {
                                    cityCoord = res;
                                });

                            case 6:
                                /*хуячим все это на карту*/
                                _this13.setCoord(cityCoord, shopCoord);

                            case 7:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, _this13);
            }));

            return function (_x) {
                return _ref.apply(this, arguments);
            };
        }();
        this.getCoord = function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(item) {
                var returnData;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                returnData = void 0;
                                _context2.next = 3;
                                return ymaps.geocode(item).then(function (res) {
                                    returnData = res.geoObjects.get(0).geometry.getCoordinates();
                                });

                            case 3:
                                return _context2.abrupt('return', returnData);

                            case 4:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, _this13);
            }));

            return function (_x2) {
                return _ref2.apply(this, arguments);
            };
        }();
        this.getShopCoord = function () {
            var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(city) {
                var ret;
                return regeneratorRuntime.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                ret = void 0;

                                coordArray = [];
                                /*тут запрос на сайт*/
                                /*TODO запилить запрос к сайту*/
                                /*в урле урл, который по городу отдает магазы*/
                                // fetch("url", {body: city,method:'post'}).then(res => {
                                //     /*магазины, адреса*/
                                //     ret = res.data;
                                // });
                                /*в рете будет список магазинов*/
                                ret = [" ул. ленина 43", "ул. республики 22"];
                                /*TODO выпилить фэйковый рет*/
                                ret.forEach(function () {
                                    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(item) {
                                        return regeneratorRuntime.wrap(function _callee3$(_context3) {
                                            while (1) {
                                                switch (_context3.prev = _context3.next) {
                                                    case 0:
                                                        _context3.next = 2;
                                                        return ymaps.geocode(city + ',' + item).then(function (response) {
                                                            /*получаем координаты*/
                                                            var coord = response.geoObjects.get(0).geometry.getCoordinates();
                                                            /*создаем геообъект*/
                                                            var geoobj = new ymaps.GeoObject({
                                                                geometry: { type: "Point", coordinates: coord
                                                                },
                                                                properties: {
                                                                    clusterCaption: item
                                                                }
                                                            });
                                                            /*пакуем его в массив*/
                                                            coordArray.push(geoobj);
                                                        });

                                                    case 2:
                                                    case 'end':
                                                        return _context3.stop();
                                                }
                                            }
                                        }, _callee3, _this13);
                                    }));

                                    return function (_x4) {
                                        return _ref4.apply(this, arguments);
                                    };
                                }());
                                /*отдаем полный массив*/
                                return _context4.abrupt('return', coordArray);

                            case 5:
                            case 'end':
                                return _context4.stop();
                        }
                    }
                }, _callee4, _this13);
            }));

            return function (_x3) {
                return _ref3.apply(this, arguments);
            };
        }();
        this.setCoord = function (coord, cluster) {
            console.log(cluster);
            map.setCenter(coord, 12);
            var clusterer = new ymaps.Clusterer();
            clusterer.add(cluster);
            map.geoObjects.add(clusterer);
        };

        this.init();
    };

    return {
        init: function init(ymaps) {
            // Создание карты.
            var myMap = new ymaps.Map("map", {
                center: [55.76, 37.64],
                zoom: 7,
                controls: []
            });
            new MapControll(ymaps, myMap);
        }

    };
}();

function initMap(ymaps) {

    $('#map').length > 0 ? Map.init(ymaps) : '';
}

var CatSpoiler = function () {
    var CatSpoilerClass = function CatSpoilerClass(item) {
        var _this14 = this;

        this.init = function (item) {
            _this14.root = $(item);
            _this14.link = _this14.root.find('.i-catspoil__link');
            _this14.list = _this14.root.find('.i-catspoil__list');
            console.log(_this14);
            _this14.state = false;
            _this14.link.on('click', function (e) {
                _this14.controller(e);
            });
        };
        this.controller = function () {
            _this14.state ? _this14.close() : _this14.open();
        };
        this.open = function () {
            _this14.list.addClass('show');
            _this14.state = true;
            _this14.link.addClass('active');
        };
        this.close = function () {
            _this14.link.removeClass('active');
            _this14.list.removeClass('show');
            _this14.state = false;
        };
        this.init(item);
    };
    return {
        init: function init() {
            var _this15 = this;

            $('.i-catspoil').each(function (i, item) {

                _this15.list = new CatSpoilerClass(item);
            });
        },
        list: []
    };
}();
$(document).ready(function () {
    CatSpoiler.init();
    /*
    * Выбор города в контактах
    * */
    CitySelector.init('.i-adres');
    /*
    Инициализация таба,
    в инит можно передать класс, либо нихуя, тогда будет дефолтный*/
    Tabs.init();

    ItemSlider.init();
    /*menu*/
    Menu.init();
    /*Галерейка образцов*/
    Sample.init($('.i-sample__list'));
});