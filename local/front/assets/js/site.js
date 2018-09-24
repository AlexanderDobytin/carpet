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
const Sample = (function (items) {
    let SampleConstructor = function (item) {
        this.init = (item) => {
            let index = item.data('id');

            index?'':index = 'index'
            item.slick(this.config[index]);
        }
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
                responsive: [
                    {
                        breakpoint: 1170,
                        settings: {
                            slidesToShow: 5,
                            slidesToScroll: 1,
                        }
                    },
                    {
                        breakpoint: 800,
                        settings: {
                            slidesToShow: 4,
                            slidesToScroll: 1,
                            //  arrows: true,
                        }
                    },
                    {
                        breakpoint: 480,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 1,
                            arrows: true
                        }
                    }

                ]
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
                responsive: [
                    {
                        breakpoint: 1170,
                        settings: {
                            slidesToShow: 4,
                            slidesToScroll: 1,
                        }
                    },
                    {
                        breakpoint: 800,
                        settings: {
                            slidesToShow: 4,
                            slidesToScroll: 1,
                            //  arrows: true,
                        }
                    },
                    {
                        breakpoint: 480,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 1,
                            arrows: true
                        }
                    }

                ]
            }
        }
        this.init(item)
    }
    return (
        this.init = (items) => {
            new SampleConstructor(items);
        }
    );
    this.init(items);
})();


/*
* Вызываю так, ибо удобно
* */

/*Модуль меню */
const Menu = (function () {
    /*Поиск в хэдере*/
    const SearchInHeader = function () {
        this.init = () => {
            this.state = false;
            this.root = $('.i-search');
            this.input = this.root.find('.i-search__input');
            this.link = this.root.find('.i-search__link');
            $(document).on('click', (e) => {
                $(e.target).parents().hasClass('i-search') ? '' : this.closeField();
            })
            this.root.on('submit', e => {
                this.controller(e);
            })
            this.link.on('click', e => {
                this.controller(e);
            });
        }
        this.controller = (e) => {
            if (this.state) {
                /*
                * тут можно аяксом гонять за результатом поиска и юзать метод this.closeField для выпиливания поля.
                * Или можно нихуя не делать и тогда сработает стандартный экшн у формы
                * */
            } else {
                e.preventDefault();
                this.openField();
            }

        }
        this.closeField = () => {
            this.root.removeClass('active');
            this.state = false;
        }
        this.openField = () => {
            this.root.addClass('active');
            this.state = true;
            this.input.focus()
        }
        this.init();
    }
    /*Открывашка-закрывашка  меню*/
    const MenuInner = function () {
        this.init = () => {
            this.state = false;
            this.root = $('.i-navbar');
            this.nav = $('.i-navbar__list');
            this.icon = $('.i-navbar__link');
            this.icon.on('click', () => {

                this.controller();
            })
            $(document).on('click', (e) => {
                $(e.target).parents().hasClass('i-navbar') ? '' : this.close();
            })
            //this.controller();
        };
        this.controller = () => {
            this.state ? this.close() : this.open();
        };
        this.open = () => {
            this.nav.addClass('show');
            this.state = true;
            this.icon.addClass('active');
        }
        this.close = () => {
            this.icon.removeClass('active');
            this.nav.removeClass('show');
            this.state = false;
        };
        this.init();
    }
    /*Спойлер(ака аккардеон ака кат)  меню */
    const MenuSpoiler = function (item) {
        this.init = (item) => {
            /*По дефолту спойлеры закрыты, но потом можно утащить стейт в дата-атрибут и задавть его с бэка*/
            this.state = false;
            this.root = $(item);
            this.link = this.root.find('.i-navSpoil__icon');
            this.list = this.root.find('.i-navSpoil__list');
            this.link.on('click', (e) => {
                e.preventDefault();
                this.controller();
            })
            $(document).on('click', (e) => {
                $(e.target).parents().hasClass('i-navSpoil') ? '' : this.close();
            })


        }
        this.controller = () => {
            this.state ? this.close() : this.open();
        };
        this.open = () => {
            this.root.addClass('show');
            this.state = true;
            this.link.addClass('active');
        }
        this.close = () => {
            this.link.removeClass('active');
            this.root.removeClass('show');
            this.state = false;
        };
        this.init(item);
    }
    const Fixed = function () {
        this.init = () => {
            this.item = $('.i-fixed');
            this.wrapper = $('.i-fixed__wrapper');
            $(window).scroll((e) => {
                if ($(document).scrollTop() > this.wrapper.offset().top) {
                    this.item.addClass('fixed')
                }
                else {
                    this.item.removeClass('fixed')
                }
            })
        }
        this.init();
    }
    return {
        /*Инициализация всей портянки*/
        init: function () {
            this.menu = new MenuInner();
            this.spoilers = [];
            $('.i-navSpoil').each((i, item) => {
                this.spoilers.push(new MenuSpoiler(item));
            });
            this.searchBlock = new SearchInHeader();
            this.fixed = new Fixed();
            console.log(this);

        }
    }

})();

const ItemSlider = (
    function () {
        const setSlider = function () {
            this.init = () => {
                this.slider = $('.i-topslider').slick(this.config().top);

                this.controller();
            }
            this.controller = () => {
                $('.i-topslider__controlls').find('.i-topslider__cont').each((index, item) => {

                    new ControlConstructor(item, index, this.slider);
                })
            }
            const ControlConstructor = function (item, index, slider) {
                this.init = () => {
                    this.number = index;
                    this.item = item;
                    $(this.item).on('click', () => {
                        this.action();
                    })

                }
                this.action = () => {
                    slider.slick('slickGoTo', this.number);
                }
                this.init();
            }
            this.config = () => {
                return {
                    top: {
                        dots: false,
                        infinite: true,
                        speed: 300,
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        arrows: false,
                    }
                }
            }
            this.init();
        }
        return {
            init: function () {
                this.init = new setSlider();
                console.log(this);
            }
        }
    }
)();

/*
*   Табы, работают через признак в датаатрибуте.
* */
const Tabs = (function () {


    /*Класс табов*/
    const Tabslogic = function (item, className) {
        this.init = (item, className) => {
            this.root = item;
            this.link = $(this.root).find(className + '__link');
            this.list = $(this.root).find(className + '__list');
            this.state = $(this.root).data('default') || this.list[0].dataset.type;

            this.link.on('click', (e) => {
                this.onClickInLink(e);
            })
            this.action();
        },
            this.onClickInLink = (e) => {
                e.preventDefault();
                let item = e.target;
                let type = e.target.dataset.id;
                this.state = type;
                this.action();
            }
        this.action = () => {
            this.list.each((item) => {

                if (this.list[item].dataset.id === this.state) {
                    $(this.list[item]).addClass('active');
                } else {
                    $(this.list[item]).removeClass('active');
                }
            })
        }
        this.init(item, className);
    }

    return {
        /*ищем род узлы табов и инициализируем классы */
        init: function (className) {
            /* хак, чтобы подменять класс, так на всякий случай*/

            className == undefined ? className = '.i-tabs' : '';

            $(className).each((index, item) => {

                this.tablist.push(new Tabslogic(item, className))
            })
        },
        tablist: []
    }
})();
const CitySelector = (function (className) {
    CityClass = function (item,className,GetList) {
        this.init = (item,className,GetList)=>{
            this.root = item;
            this.globalList = GetList();
            this.link = $(this.root).find(className + '__link');
            this.list = $(this.root).find(className + '__list');

            this.state = false;

            this.link.on('click',(e)=>{
                this.controller(e);
            });

        }
        this.controller = (e)=>{
           !this.state ? this.forward(e) : this.back(e);
        }
        this.forward = (e)=>{
            e.preventDefault();
            this.link.addClass('active');
            $(this.globalList).each((i,item)=>{
                $(item.root).hide();
            })
            $(this.root).show();
            $(this.root).addClass('active')
            this.list.addClass('active')
            this.state = true;
        }
        this.back = ()=>{
            $(this.globalList).each((i,item)=>{
                $(item.root).show();
            })
            $(this.root).removeClass('active')
            this.link.removeClass('active');
            this.list.removeClass('active')
            this.state = false;
        };
        this.init(item,className,GetList);
    }
    return{
        init:function (className) {
            const GetList = ()=>{
                return this.list;
            }
            className == undefined? className = '.i-adres':'';
            $(className).each((index,item)=>{
                this.list.push(new CityClass(item,className,GetList));
            })
        },
        list:[]
    }
})();
const Map =(function (ymaps) {
    console.log(ymaps)
    return{
        init:function (ymaps) {
                console.log(ymaps)
                // Создание карты.
                var myMap = new ymaps.Map("map", {

                    center: [55.76, 37.64],
                    // Уровень масштабирования. Допустимые значения:
                    // от 0 (весь мир) до 19.
                    zoom: 7,
                    controls:[]
                });

        }
    }

})();
function initMap (ymaps){

    $('#map').length > 0 ? Map.init(ymaps):'';

}


const CatSpoiler = (function () {
    const CatSpoilerClass = function (item) {
        this.init = (item)=>{
            this.root = $(item);
            this.link = this.root.find('.i-catspoil__link');
            this.list = this.root.find('.i-catspoil__list');
            console.log(this)
            this.state = false;
            this.link.on('click',(e)=>{
                this.controller(e);
            })
        }
        this.controller = () => {
            this.state ? this.close() : this.open();
        };
        this.open = () => {
            this.list.addClass('show');
            this.state = true;
            this.link.addClass('active');
        }
        this.close = () => {
            this.link.removeClass('active');
            this.list.removeClass('show');
            this.state = false;
        };
        this.init(item);
    }
    return{
        init:function () {
                $('.i-catspoil').each((i,item)=>{

                    this.list = new CatSpoilerClass(item);
                })
        },
        list:[]
    }
})()
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
    Sample($('.i-sample__list'));

})

