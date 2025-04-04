// game-data.js
export const products = {
    liquids: { 
        owned: 0, 
        basePrice: 50, 
        baseIncome: 0.1,
        icon: '💧',
        name: 'Жидкости',
        description: 'Продавайте жидкости для вейпа с базовой прибылью',
        unlockAt: 0,
        category: 'basic'
    },
    disposables: { 
        owned: 0, 
        basePrice: 200, 
        baseIncome: 0.5,
        icon: '🚬',
        name: 'Одноразки',
        description: 'Популярный товар среди новичков с повышенной прибылью',
        unlockAt: 500,
        category: 'basic'
    },
    podSystems: { 
        owned: 0, 
        basePrice: 500, 
        baseIncome: 1.5,
        icon: '🔋',
        name: 'Подсистемы',
        description: 'Средний уровень дохода с высокой рентабельностью',
        unlockAt: 2000,
        category: 'advanced'
    },
    mods: {
        owned: 0,
        basePrice: 2000,
        baseIncome: 5,
        icon: '💨',
        name: 'Моды',
        description: 'Профессиональные устройства с максимальным доходом',
        unlockAt: 10000,
        category: 'advanced'
    },
    shop: {
        owned: 0,
        basePrice: 10000,
        baseIncome: 20,
        icon: '🏪',
        name: 'Магазин',
        description: 'Собственный вейп-шоп с пассивным доходом',
        unlockAt: 50000,
        category: 'business'
    },
    franchise: {
        owned: 0,
        basePrice: 50000,
        baseIncome: 100,
        icon: '🏢',
        name: 'Франшиза',
        description: 'Сеть вейп-шопов по всей стране',
        unlockAt: 250000,
        category: 'business'
    },
    factory: {
        owned: 0,
        basePrice: 250000,
        baseIncome: 500,
        icon: '🏭',
        name: 'Фабрика',
        description: 'Собственное производство жидкостей и устройств',
        unlockAt: 1000000,
        category: 'enterprise'
    },
    corporation: {
        owned: 0,
        basePrice: 1000000,
        baseIncome: 2500,
        icon: '🏛️',
        name: 'Корпорация',
        description: 'Международная вейп-корпорация с огромным доходом',
        unlockAt: 5000000,
        category: 'enterprise'
    }
};

export const upgrades = {
    strongClick: { 
        purchased: false, 
        price: 1000, 
        icon: '💪',
        name: 'Усиленный клик',
        description: 'Увеличивает доход за клик на 50%',
        effect: (game) => { game.clickValue = Math.floor(game.clickValue * 1.5); },
        category: 'click'
    },
    autoClicker: { 
        purchased: false, 
        price: 5000,
        icon: '🤖',
        name: 'Автокликер',
        description: 'Автоматически кликает 1 раз в секунду',
        effect: (game) => {
            game.autoClickerInterval = setInterval(() => {
                if (game.passiveIncome > 0) {
                    game.handleClick({ clientX: window.innerWidth/2, clientY: window.innerHeight/2 });
                }
            }, 1000);
        },
        category: 'passive'
    },
    boostIncome: { 
        purchased: false, 
        price: 2500,
        icon: '📈',
        name: 'Улучшенные продажи',
        description: 'Увеличивает доход от всех товаров на 20%',
        effect: (game) => {
            game.incomeMultiplier *= 1.2;
            game.recalculatePassiveIncome();
        },
        category: 'passive'
    },
    multiClick: {
        purchased: false,
        price: 10000,
        icon: '👆',
        name: 'Мультиклик',
        description: 'Клики дают в 2 раза больше денег',
        effect: (game) => { game.clickMultiplier *= 2; },
        category: 'click'
    },
    goldenVape: {
        purchased: false,
        price: 25000,
        icon: '🌟',
        name: 'Золотой вейп',
        description: 'Шанс 10% получить 10x денег за клик',
        effect: (game) => { 
            game.goldenChance = 0.1;
            game.goldenMultiplier = 10;
        },
        category: 'click'
    },
    boostUnlock: {
        purchased: false,
        price: 15000,
        icon: '🔥',
        name: 'Система буста',
        description: 'Разблокирует временное ускорение дохода',
        effect: (game) => { 
            game.boostUnlocked = true;
            game.elements.boostBtn.style.display = 'flex';
        },
        category: 'special'
    },
    premiumLiquids: {
        purchased: false,
        price: 30000,
        icon: '💎',
        name: 'Премиум жидкости',
        description: 'Увеличивает доход от жидкостей на 300%',
        effect: (game) => {
            game.products.liquids.baseIncome *= 3;
            game.recalculatePassiveIncome();
        },
        category: 'passive'
    },
    bulkDiscount: {
        purchased: false,
        price: 40000,
        icon: '🛒',
        name: 'Оптовые закупки',
        description: 'Снижает стоимость товаров на 15%',
        effect: (game) => {
            game.priceMultiplier = 0.85;
        },
        category: 'passive'
    },
    criticalClick: {
        purchased: false,
        price: 50000,
        icon: '💥',
        name: 'Критический удар',
        description: 'Шанс 5% нанести критический удар (20x)',
        effect: (game) => {
            game.criticalChance = 0.05;
            game.criticalMultiplier = 20;
        },
        category: 'click'
    },
    timeWarp: {
        purchased: false,
        price: 75000,
        icon: '⏳',
        name: 'Искривление времени',
        description: 'Увеличивает продолжительность буста на 50%',
        effect: (game) => {
            game.boostDuration *= 1.5;
        },
        category: 'special'
    },
    quantumLeap: {
        purchased: false,
        price: 100000,
        icon: '⚛️',
        name: 'Квантовый скачок',
        description: 'Пассивный доход работает даже когда игра закрыта',
        effect: (game) => {
            game.offlineEarningsEnabled = true;
        },
        category: 'special'
    }
};

export const prestigeData = {
    level: 0,
    bonus: 1,
    nextRequirement: 100000,
    baseRequirement: 100000,
    bonusPerLevel: 0.15,
    points: 0,
    upgrades: {
        permIncome: {
            level: 0,
            maxLevel: 5,
            price: 50,
            bonusPerLevel: 0.05,
            name: 'Алмазные пальцы',
            description: 'После престижа сохраняется %bonus% вашего дохода в секунду'
        },
        clickBonus: {
            level: 0,
            maxLevel: 5,
            price: 75,
            bonusPerLevel: 0.1,
            name: 'Золотые руки',
            description: 'Увеличивает базовый доход за клик на %bonus%'
        },
        incomeBoost: {
            level: 0,
            maxLevel: 5,
            price: 100,
            bonusPerLevel: 0.07,
            name: 'Прибыльный бизнес',
            description: 'Увеличивает пассивный доход на %bonus%'
        },
        discount: {
            level: 0,
            maxLevel: 5,
            price: 60,
            bonusPerLevel: 0.03,
            name: 'Оптовик',
            description: 'Снижает стоимость товаров на %bonus%'
        }
    }
};

export const achievements = [
    {
        id: 'first_click',
        name: 'Первый клик',
        description: 'Совершите первый клик',
        reward: 100,
        condition: (game) => game.totalClicks >= 1,
        unlocked: false,
        icon: '👆'
    },
    {
        id: 'hundred_clicks',
        name: 'Сто раз кликни',
        description: 'Совершите 100 кликов',
        reward: 500,
        condition: (game) => game.totalClicks >= 100,
        unlocked: false,
        icon: '💯'
    },
    {
        id: 'thousand_clicks',
        name: 'Тысяча кликов',
        description: 'Совершите 1,000 кликов',
        reward: 2500,
        condition: (game) => game.totalClicks >= 1000,
        unlocked: false,
        icon: '👆👆👆'
    },
    {
        id: 'first_upgrade',
        name: 'Первое улучшение',
        description: 'Купите любое улучшение',
        reward: 1000,
        condition: (game) => Object.values(game.upgrades).some(u => u.purchased),
        unlocked: false,
        icon: '⚡'
    },
    {
        id: 'first_product',
        name: 'Первый товар',
        description: 'Купите любой товар',
        reward: 500,
        condition: (game) => Object.values(game.products).some(p => p.owned > 0),
        unlocked: false,
        icon: '🛒'
    },
    {
        id: 'millionaire',
        name: 'Миллионер',
        description: 'Заработайте 1,000,000 ₽',
        reward: 5000,
        condition: (game) => game.totalEarned >= 1000000,
        unlocked: false,
        icon: '💰'
    },
    {
        id: 'billionaire',
        name: 'Миллиардер',
        description: 'Заработайте 1,000,000,000 ₽',
        reward: 25000,
        condition: (game) => game.totalEarned >= 1000000000,
        unlocked: false,
        icon: '💎'
    },
    {
        id: 'prestige_master',
        name: 'Мастер престижа',
        description: 'Достигните 10 уровня престижа',
        reward: 10000,
        condition: (game) => game.prestige.level >= 10,
        unlocked: false,
        icon: '🎖️'
    },
    {
        id: 'boost_lover',
        name: 'Любитель буста',
        description: 'Активируйте буст 50 раз',
        reward: 3000,
        condition: (game) => game.boostCount >= 50,
        unlocked: false,
        icon: '🔥'
    },
    {
        id: 'promocode_collector',
        name: 'Коллекционер промокодов',
        description: 'Соберите 10 промокодов',
        reward: 5000,
        condition: (game) => game.promocodesGenerated >= 10,
        unlocked: false,
        icon: '🎟️'
    },
    {
        id: 'upgrade_complete',
        name: 'Совершенство',
        description: 'Купите все улучшения',
        reward: 15000,
        condition: (game) => Object.values(game.upgrades).every(u => u.purchased),
        unlocked: false,
        icon: '🏅'
    },
    {
        id: 'product_tycoon',
        name: 'Тайкун продуктов',
        description: 'Купите 1000 товаров в сумме',
        reward: 20000,
        condition: (game) => Object.values(game.products).reduce((sum, p) => sum + p.owned, 0) >= 1000,
        unlocked: false,
        icon: '🏆'
    },
    {
        id: 'critical_master',
        name: 'Критический мастер',
        description: 'Совершите 100 критических ударов',
        reward: 7500,
        condition: (game) => game.criticalHits >= 100,
        unlocked: false,
        icon: '💥'
    },
    {
        id: 'golden_touch',
        name: 'Золотое прикосновение',
        description: 'Совершите 50 золотых кликов',
        reward: 10000,
        condition: (game) => game.goldenHits >= 50,
        unlocked: false,
        icon: '🌟'
    },
    {
        id: 'offline_king',
        name: 'Король оффлайна',
        description: 'Заработайте 1,000,000 ₽ в оффлайне',
        reward: 15000,
        condition: (game) => game.totalOfflineEarned >= 1000000,
        unlocked: false,
        icon: '⏸️'
    }
];

export const promocodes = {
    basePrice: 100000,
    nextRequirement: 100000,
    list: [],
    rewards: [
        { amount: 100, chance: 0.7 },
        { amount: 200, chance: 0.2 },
        { amount: 500, chance: 0.08 },
        { amount: 1000, chance: 0.02 }
    ]
};

export const categories = {
    products: {
        'basic': { name: 'Базовые', icon: '🛒' },
        'advanced': { name: 'Продвинутые', icon: '⚡' },
        'business': { name: 'Бизнес', icon: '🏢' },
        'enterprise': { name: 'Предприятие', icon: '🏭' }
    },
    upgrades: {
        'click': { name: 'Клики', icon: '👆' },
        'passive': { name: 'Пассивный доход', icon: '💤' },
        'special': { name: 'Особые', icon: '✨' }
    }
};
