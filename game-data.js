// game-data.js
export const products = {
    liquids: {
        owned: 0,
        basePrice: 50,
        baseIncome: 0.1,
        icon: '💧',
        name: 'Жидкости',
        description: 'Базовые жидкости для вейпа. Начните свой бизнес с малого.',
        unlockAt: 0,
        category: 'basic',
        maxOwned: Infinity,
        specialEffect: null
    },
    disposables: {
        owned: 0,
        basePrice: 200,
        baseIncome: 0.5,
        icon: '🚬',
        name: 'Одноразки',
        description: 'Популярные одноразовые устройства. Быстрая прибыль!',
        unlockAt: 500,
        category: 'basic',
        maxOwned: Infinity,
        specialEffect: null
    },
    podSystems: {
        owned: 0,
        basePrice: 500,
        baseIncome: 1.2,
        icon: '🔋',
        name: 'Pod-системы',
        description: 'Компактные и удобные устройства с хорошей прибылью.',
        unlockAt: 2000,
        category: 'basic',
        maxOwned: Infinity,
        specialEffect: null
    },
    mods: {
        owned: 0,
        basePrice: 2000,
        baseIncome: 5,
        icon: '💨',
        name: 'Моды',
        description: 'Мощные устройства для опытных вейперов. Высокий доход.',
        unlockAt: 10000,
        category: 'basic',
        maxOwned: Infinity,
        specialEffect: {
            type: 'clickMultiplier',
            value: 0.1,
            description: '+10% к доходу за клик'
        }
    },
    premiumLiquids: {
        owned: 0,
        basePrice: 5000,
        baseIncome: 5,
        icon: '🌟',
        name: 'Премиум жидкости',
        description: 'Элитные жидкости с уникальными вкусами. Для настоящих ценителей.',
        unlockAt: 25000,
        category: 'premium',
        maxOwned: 50,
        specialEffect: {
            type: 'goldenChance',
            value: 0.01,
            description: '+1% к шансу золотого клика'
        }
    },
    limitedDevices: {
        owned: 0,
        basePrice: 25000,
        baseIncome: 15,
        icon: '🏆',
        name: 'Лимитированные устройства',
        description: 'Эксклюзивные вейпы ручной работы. Статус и прибыль!',
        unlockAt: 100000,
        category: 'premium',
        maxOwned: 20,
        specialEffect: {
            type: 'criticalChance',
            value: 0.005,
            description: '+0.5% к шансу критического удара'
        }
    },
    vapeShop: {
        owned: 0,
        basePrice: 100000,
        baseIncome: 50,
        icon: '🏪',
        name: 'Вейп-шоп',
        description: 'Собственный магазин с постоянным потоком клиентов.',
        unlockAt: 500000,
        category: 'business',
        maxOwned: 10,
        specialEffect: {
            type: 'passiveMultiplier',
            value: 0.05,
            description: '+5% к пассивному доходу'
        }
    },
    franchise: {
        owned: 0,
        basePrice: 500000,
        baseIncome: 200,
        icon: '🏢',
        name: 'Франшиза',
        description: 'Сеть вейп-шопов по всему городу. Огромный пассивный доход.',
        unlockAt: 2000000,
        category: 'business',
        maxOwned: 5,
        specialEffect: {
            type: 'passiveMultiplier',
            value: 0.1,
            description: '+10% к пассивному доходу'
        }
    },
    vapeEmpire: {
        owned: 0,
        basePrice: 10000000,
        baseIncome: 500,
        icon: '👑',
        name: 'Вейп Империя',
        description: 'Контроль над рынком вейпинга в вашем регионе.',
        unlockAt: 10000000,
        category: 'ultimate',
        maxOwned: 1,
        specialEffect: {
            type: 'globalMultiplier',
            value: 0.25,
            description: '+25% ко всем доходам'
        }
    },
    spaceVapes: {
        owned: 0,
        basePrice: 50000000,
        baseIncome: 2500,
        icon: '🚀',
        name: 'Космические Вейпы',
        description: 'Продажи в невесомости! Абсолютный монополист.',
        unlockAt: 50000000,
        category: 'ultimate',
        maxOwned: 1,
        specialEffect: {
            type: 'prestigeBonus',
            value: 0.1,
            description: '+10% к бонусу престижа'
        }
    }
};

export const upgrades = {
    // Базовые улучшения
    strongFingers: {
        purchased: false,
        price: 1000,
        icon: '💪',
        name: 'Крепкие пальцы',
        description: 'Увеличивает доход за клик на 50%',
        effect: (game) => { game.clickMultiplier *= 1.5; },
        category: 'click',
        unlockAt: 0,
        tier: 1
    },
    autoClicker: {
        purchased: false,
        price: 5000,
        icon: '🤖',
        name: 'Автокликер',
        description: 'Автоматически кликает 1 раз в секунду',
        effect: (game) => {
            game.autoClickerInterval = setInterval(() => {
                game.handleClick({ clientX: window.innerWidth/2, clientY: window.innerHeight/2 });
            }, 1000);
        },
        category: 'automation',
        unlockAt: 1000,
        tier: 1
    },
    goldenCoils: {
        purchased: false,
        price: 15000,
        icon: '🌟',
        name: 'Золотые испарители',
        description: 'Увеличивает шанс золотого клика до 15%',
        effect: (game) => {
            game.goldenChance = Math.max(game.goldenChance, 0.15);
        },
        category: 'special',
        unlockAt: 10000,
        tier: 2
    },
    cloudMaster: {
        purchased: false,
        price: 30000,
        icon: '☁️',
        name: 'Мастер облаков',
        description: 'Увеличивает доход от жидкостей на 200%',
        effect: (game) => {
            game.products.liquids.baseIncome *= 3;
            game.recalculatePassiveIncome();
        },
        category: 'products',
        unlockAt: 20000,
        tier: 2
    },
    // Элитные улучшения
    quantumVape: {
        purchased: false,
        price: 100000,
        icon: '⚛️',
        name: 'Квантовый вейп',
        description: 'Клики иногда дают в 100 раз больше денег!',
        effect: (game) => {
            game.quantumChance = 0.01;
            game.quantumMultiplier = 100;
        },
        category: 'special',
        unlockAt: 50000,
        tier: 3
    },
    timeWarp: {
        purchased: false,
        price: 250000,
        icon: '⏳',
        name: 'Искривление времени',
        description: 'Увеличивает продолжительность буста в 2 раза',
        effect: (game) => {
            game.boostDuration *= 2;
        },
        category: 'boost',
        unlockAt: 100000,
        tier: 3
    },
    // Легендарные улучшения
    vapeGod: {
        purchased: false,
        price: 1000000,
        icon: '👑',
        name: 'Бог Вейпов',
        description: 'Удваивает все ваши доходы!',
        effect: (game) => {
            game.globalMultiplier = game.globalMultiplier ? game.globalMultiplier * 2 : 2;
        },
        category: 'ultimate',
        unlockAt: 500000,
        tier: 4
    },
    infinitePuff: {
        purchased: false,
        price: 5000000,
        icon: '♾️',
        name: 'Бесконечная затяжка',
        description: 'Пассивный доход работает в 3 раза быстрее',
        effect: (game) => {
            game.passiveSpeedMultiplier = 3;
        },
        category: 'ultimate',
        unlockAt: 2000000,
        tier: 4
    }
};

export const prestigeData = {
    level: 0,
    points: 0,
    bonus: 1,
    nextRequirement: 100000,
    baseRequirement: 100000,
    bonusPerLevel: 0.15,
    
    upgrades: {
        permIncome: {
            level: 0,
            maxLevel: 20,
            price: 50,
            bonusPerLevel: 0.05,
            name: 'Алмазные пальцы',
            description: 'После престижа сохраняется %bonus% вашего дохода',
            icon: '💎'
        },
        clickMastery: {
            level: 0,
            maxLevel: 15,
            price: 75,
            bonusPerLevel: 0.1,
            name: 'Мастер кликов',
            description: 'Увеличивает базовый доход за клик на %bonus%',
            icon: '👆'
        },
        businessGenius: {
            level: 0,
            maxLevel: 10,
            price: 100,
            bonusPerLevel: 0.1,
            name: 'Бизнес гений',
            description: 'Увеличивает пассивный доход на %bonus%',
            icon: '📈'
        },
        goldenLuck: {
            level: 0,
            maxLevel: 10,
            price: 150,
            bonusPerLevel: 0.02,
            name: 'Золотая удача',
            description: 'Увеличивает шанс золотого клика на %bonus%',
            icon: '🍀'
        },
        criticalThinking: {
            level: 0,
            maxLevel: 10,
            price: 200,
            bonusPerLevel: 0.015,
            name: 'Критическое мышление',
            description: 'Увеличивает шанс критического удара на %bonus%',
            icon: '💥'
        },
        boostExpert: {
            level: 0,
            maxLevel: 5,
            price: 300,
            bonusPerLevel: 0.25,
            name: 'Эксперт буста',
            description: 'Увеличивает множитель буста на %bonus%',
            icon: '🔥'
        },
        timeLord: {
            level: 0,
            maxLevel: 5,
            price: 500,
            bonusPerLevel: 0.2,
            name: 'Повелитель времени',
            description: 'Уменьшает время генерации буста на %bonus%',
            icon: '⏱️'
        }
    }
};

export const achievements = [
    // Базовые достижения
    {
        id: 'first_click',
        name: 'Первая затяжка',
        description: 'Совершите первый клик',
        reward: 100,
        condition: (game) => game.totalClicks >= 1,
        unlocked: false,
        icon: '👆',
        tier: 'common'
    },
    {
        id: 'hundred_clicks',
        name: 'Сто затяжек',
        description: 'Совершите 100 кликов',
        reward: 500,
        condition: (game) => game.totalClicks >= 100,
        unlocked: false,
        icon: '💯',
        tier: 'common'
    },
    {
        id: 'thousand_clicks',
        name: 'Тысяча кликов',
        description: 'Совершите 1000 кликов',
        reward: 2500,
        condition: (game) => game.totalClicks >= 1000,
        unlocked: false,
        icon: '👊',
        tier: 'uncommon'
    },
    // Товарные достижения
    {
        id: 'liquids_king',
        name: 'Король жидкостей',
        description: 'Купите 100 жидкостей',
        reward: 1000,
        condition: (game) => game.products.liquids.owned >= 100,
        unlocked: false,
        icon: '💧',
        tier: 'rare'
    },
    {
        id: 'premium_collector',
        name: 'Коллекционер премиум',
        description: 'Купите все премиум товары',
        reward: 5000,
        condition: (game) => {
            return Object.values(game.products)
                .filter(p => p.category === 'premium')
                .every(p => p.owned > 0);
        },
        unlocked: false,
        icon: '🌟',
        tier: 'epic'
    },
    // Улучшения
    {
        id: 'upgrade_master',
        name: 'Мастер улучшений',
        description: 'Купите 10 улучшений',
        reward: 2500,
        condition: (game) => {
            return Object.values(game.upgrades)
                .filter(u => u.purchased).length >= 10;
        },
        unlocked: false,
        icon: '⚡',
        tier: 'rare'
    },
    // Престижные
    {
        id: 'prestige_novice',
        name: 'Новичок престижа',
        description: 'Достигните 5 уровня престижа',
        reward: 10000,
        condition: (game) => game.prestige.level >= 5,
        unlocked: false,
        icon: '⭐',
        tier: 'epic'
    },
    {
        id: 'prestige_legend',
        name: 'Легенда престижа',
        description: 'Достигните 50 уровня престижа',
        reward: 100000,
        condition: (game) => game.prestige.level >= 50,
        unlocked: false,
        icon: '🏆',
        tier: 'legendary'
    },
    // Специальные
    {
        id: 'quantum_click',
        name: 'Квантовый клик',
        description: 'Совершите квантовый клик (100x)',
        reward: 5000,
        condition: (game) => game.quantumHits >= 1,
        unlocked: false,
        icon: '⚛️',
        tier: 'epic'
    },
    {
        id: 'ultimate_tycoon',
        name: 'Верховный Тайкун',
        description: 'Заработайте 1 триллион ₽',
        reward: 1000000,
        condition: (game) => game.totalEarned >= 1e12,
        unlocked: false,
        icon: '🤑',
        tier: 'legendary'
    },
    // Новые достижения
    {
        id: 'golden_master',
        name: 'Золотой мастер',
        description: 'Совершите 100 золотых кликов',
        reward: 5000,
        condition: (game) => game.goldenHits >= 100,
        unlocked: false,
        icon: '🌟',
        tier: 'rare'
    },
    {
        id: 'critical_expert',
        name: 'Эксперт критических ударов',
        description: 'Совершите 50 критических ударов',
        reward: 7500,
        condition: (game) => game.criticalHits >= 50,
        unlocked: false,
        icon: '💥',
        tier: 'epic'
    },
    {
        id: 'boost_enthusiast',
        name: 'Энтузиаст буста',
        description: 'Активируйте буст 25 раз',
        reward: 5000,
        condition: (game) => game.boostCount >= 25,
        unlocked: false,
        icon: '🔥',
        tier: 'rare'
    }
];

export const promocodes = {
    basePrice: 100000,
    nextRequirement: 100000,
    list: [],
    rewards: [
        { amount: 100, chance: 0.5 },
        { amount: 250, chance: 0.3 },
        { amount: 500, chance: 0.15 },
        { amount: 1000, chance: 0.05 },
        { amount: 5000, chance: 0.01, isSpecial: true },
        { 
            amount: '2x income for 1h', 
            chance: 0.005, 
            isSpecial: true,
            effect: (game) => {
                game.temporaryIncomeMultiplier = 2;
                setTimeout(() => {
                    game.temporaryIncomeMultiplier = 1;
                }, 3600000);
            }
        }
    ],
    minPrestige: 10,
    specialChance: 0.02
};

export const categories = {
    products: {
        'all': { name: 'Все', icon: '🛒' },
        'basic': { name: 'Базовые', icon: '🔹' },
        'premium': { name: 'Премиум', icon: '🌟' },
        'business': { name: 'Бизнес', icon: '🏢' },
        'ultimate': { name: 'Элитные', icon: '👑' }
    },
    upgrades: {
        'all': { name: 'Все', icon: '⚡' },
        'click': { name: 'Клики', icon: '👆' },
        'automation': { name: 'Автоматизация', icon: '🤖' },
        'special': { name: 'Особые', icon: '✨' },
        'ultimate': { name: 'Легендарные', icon: '🏆' }
    }
};

export const defaultGameState = {
    balance: 0,
    totalEarned: 0,
    passiveIncome: 0,
    clickValue: 1,
    clickMultiplier: 1,
    incomeMultiplier: 1,
    priceMultiplier: 1,
    globalMultiplier: 1,
    temporaryIncomeMultiplier: 1,
    passiveSpeedMultiplier: 1,
    
    // Клики
    totalClicks: 0,
    goldenChance: 0,
    goldenHits: 0,
    goldenMultiplier: 10,
    criticalChance: 0,
    criticalHits: 0,
    criticalMultiplier: 20,
    quantumChance: 0,
    quantumHits: 0,
    quantumMultiplier: 100,
    
    // Буст система
    boostUnlocked: false,
    boostActive: false,
    boostCount: 0,
    boostProgress: 0,
    boostTimer: 0,
    boostDuration: 30,
    boostMultiplier: 2,
    
    // Оффлайн
    lastPlayTime: Date.now(),
    offlineEarningsEnabled: false,
    totalOfflineEarned: 0,
    maxOfflineTime: 0,
    
    // Престиж
    prestige: JSON.parse(JSON.stringify(prestigeData)),
    nextPromocodeAt: 100000,
    promocodesGenerated: 0,
    
    // Коллекции
    products: JSON.parse(JSON.stringify(products)),
    upgrades: JSON.parse(JSON.stringify(upgrades)),
    achievements: JSON.parse(JSON.stringify(achievements)),
    promocodes: JSON.parse(JSON.stringify(promocodes)),
    
    // Настройки
    darkMode: false,
    notificationsEnabled: true,
    animationLevel: 'high',
    
    // Квесты
    dailyQuests: [
        {
            id: 'click_500',
            name: '500 кликов',
            description: 'Совершите 500 кликов',
            reward: 1000,
            progress: 0,
            required: 500,
            completed: false
        },
        {
            id: 'earn_50000',
            name: 'Заработать 50,000₽',
            description: 'Заработайте 50,000 рублей',
            reward: 5000,
            progress: 0,
            required: 50000,
            completed: false
        },
        {
            id: 'buy_upgrades',
            name: 'Улучшения',
            description: 'Купите 3 улучшения',
            reward: 3000,
            progress: 0,
            required: 3,
            completed: false
        }
    ],
    lastDailyRefresh: Date.now(),
    
    // События
    currentEvent: null,
    eventProgress: 0,
    eventEndTime: null
};
