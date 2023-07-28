((self) => {
    'use strict';

    const config = {
        notificationPopupTitleText: 'DISCOVER OUR DEALS',
        defaultProductNotificationDescTitleTexts: [
            'Summer Sale -20%',
            'Autumn Sale -20%',
            'Winter Sale -20%'
        ],
        defaultDiscountImageSources: [
            'https://i.ibb.co/znd8TQ7/big-sale.png',
            'https://i.ibb.co/fr5pPVf/special-offer.png',
            'https://i.ibb.co/8N6QBqy/flash-sale.png'
        ],
        newTagImageSource: 'https://i.ibb.co/JKNrpgy/new.png',
        notificationBellImageSource: 'https://i.ibb.co/QFK5pck/bell.png'
    };

    const classes = {
        notificationCenter: 'ins-notification-center',
        notificationPopupContainer: 'ins-notification-popup-container',
        hidden: 'ins-hidden',
        notificationPopup: 'ins-notification-popup',
        notificationPopupTitle: 'ins-notification-popup-title',
        productNotificationContainer: 'ins-product-notification-container',
        discountImage: 'ins-discount-image',
        productNotificationDescContainer: 'ins-product-notification-desc-container',
        productNotificationDescTitle: 'ins-product-notification-desc-title',
        notificationBell: 'ins-notification-bell',
        bellImage: 'ins-bell-image',
        newTagImage: 'ins-new-tag-image',
        style: 'ins-custom-style'
    };

    const selectors = Object.keys(classes).reduce((createdSelector, key) => {
        createdSelector[key] = `.${ classes[key] }`;

        return createdSelector;
    }, {});

    self.init = () => {
        if (Insider.systemRules.call('isOnProductPage')) {
            return;
        }

        self.reset();
        self.buildHTML();
        self.buildCss();
        self.buildEventListeners();
    };

    self.reset = () => {
        Insider.dom(`${ selectors.notificationCenter }, ${ selectors.style }`).remove();
    };

    self.buildCss = () => {
        const { notificationCenter, notificationPopupContainer, hidden, notificationPopup, notificationPopupTitle,
            productNotificationContainer, discountImage, productNotificationDescContainer, productNotificationDescTitle,
            newTagImage, notificationBell, bellImage } = selectors;

        const style =
        `${ notificationCenter } { 
            list-style: none;
            display: flex;
            flex-direction: column;
            gap: 10px;
            margin-right: 2%;
            position: fixed;
            top: 15%;
            right: 0%;
            width: 400px;
            height: 400px;
            font-family: 'Agdasima', sans-serif;
            font-family: 'Raleway', sans-serif;
            font-family: 'Roboto Mono', monospace;
            z-index: 9999999;
        }
        ${ notificationBell } { 
            position: absolute;
            width: 60px;
            height: 60px;
            margin-left: auto;
            right: 0;
            bottom: 0;
        }
        ${ bellImage } { 
            width: 60px;
            height: 60px;
        }
        ${ notificationPopupContainer } { 
            display: flex;
            flex-direction: column;
            position: absolute;
            list-style: none;
            padding: 0px 5px;
            width: 300px;
            margin-left: auto;
            right: 20%;
            bottom: 0;
        }
        ${ hidden } { 
            display: none;
        }
        ${ notificationPopup } { 
            border: 5px solid bisque;
            border-radius: 10px;
            list-style: none;
            padding: 5px;
            width: 350px;
        }
        ${ notificationPopupTitle } { 
            display: flex;
            flex-direction: column;
            background-color: rgb(135, 206, 228);
            border-radius: 10px;
            text-align: center;
        }
        ${ productNotificationContainer } { 
            display: flex;
            flex-direction: row;
            align-items: start;
            list-style: none;
            gap: 15px;
            justify-content: flex-end;
            border: 3px solid bisque;
            border-radius: 10px;
            margin-top: 5px;
            background-color: rgb(135, 206, 228);
        }
        ${ productNotificationDescContainer } { 
            display: flex;
            flex-direction: column;
            align-items: start;
            list-style: none;
            gap: 5px;
            padding: 15px 5px;
            text-align: justify;
            font-size: 12px;
        }
        ${ productNotificationDescTitle } { 
            font-weight: 700;
            font-size: 15px;
        }
        ${ discountImage } { 
            width: 80px;
            height: 80px;
        }
        ${ newTagImage } { 
            width: 35px;
            height: 35px;
        }`;

        Insider.dom('<style>').addClass(classes.style).html(style).appendTo('head');
    };

    self.buildHTML = () => {
        const { notificationCenter, notificationPopupContainer, hidden, notificationPopup, notificationPopupTitle,
            productNotificationContainer, discountImage, productNotificationDescContainer, productNotificationDescTitle,
            newTagImage, notificationBell, bellImage } = classes;

        const productVisit = (Insider.storage.localStorage.get('insiderVersusData') || {})['tr_TR'] || [];

        const liItems = [];

        for (let i = 0; i < 3; i++) {
            let discountImageSource;
            let productNotificationDescText;
            const productNotificationDescTitleText = config.defaultProductNotificationDescTitleTexts[i];

            const productData = productVisit[productVisit.length - i - 1];

            if (productData) {
                discountImageSource = productData['img'];
                productNotificationDescText = decodeURI(productData['name']);
            } else {
                discountImageSource = config.defaultDiscountImageSources[i];
                productNotificationDescText = config.defaultProductNotificationDescTitleTexts[i];
            }

            const skeleton =
            `<li class="${ productNotificationContainer }">
                <img class="${ discountImage }"
                    src=${ discountImageSource }>
                <ul class="${ productNotificationDescContainer }">
                    <li class="${ productNotificationDescTitle }">${ productNotificationDescTitleText }</li>
                    <li>${ productNotificationDescText }</li>
                </ul>
                <img class="${ newTagImage }" src="${ config.newTagImageSource }">
            </li>`;

            liItems.push(skeleton);
        }

        let html =
        `<ul class="${ notificationCenter }">
            <li class="${ notificationPopupContainer } ${ hidden }">
                <ul class="${ notificationPopup }">
                    <li class="${ notificationPopupTitle }">
                        <h3>${ config.notificationPopupTitleText }</h3>
                    </li>`;

        liItems.forEach((liItem) => {
            html += liItem;
        });

        html +=
        `</ul>
            </li>
            <li class="${ notificationBell }">
                <img class="${ bellImage }"
                    src="${ config.notificationBellImageSource }">
            </li>
        </ul>`;

        Insider.dom('#header__container').append(html);
    };

    self.buildEventListeners = () => {
        const { notificationPopupContainer, bellImage } = selectors;

        const notificationBell = Insider.dom(bellImage);
        const notificationPopup = Insider.dom(notificationPopupContainer);

        Insider.eventManager.once('click.notification:bell', bellImage, () => {
            if (notificationPopup.hasClass(classes.hidden)) {
                notificationPopup.removeClass(classes.hidden);
                notificationBell.attr('src', 'https://i.ibb.co/C7Vw6Sp/close.png');
            } else {
                notificationPopup.addClass(classes.hidden);
                notificationBell.attr('src', 'https://i.ibb.co/QFK5pck/bell.png');
            }
        });
    };

    self.init();
})({});