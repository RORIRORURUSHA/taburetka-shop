// Промокоды (название, скидка %, количество активаций)
const promoCodes = [
    { code: "TABURETKA5", discount: 5, activations: 0, used: 0 },
    { code: "TABURETKAPIAR10", discount: 10, activations: 1, used: 0 },
    { code: "SMOKE15", discount: 15, activations: 0, used: 0 },
    { code: "POD20", discount: 20, activations: 0, used: 0 },
    { code: "LIQUID25", discount: 25, activations: 0, used: 0 },
    { code: "SHOP30", discount: 30, activations: 0, used: 0 },
    { code: "BIGSALE40", discount: 40, activations: 0, used: 0 },
    { code: "MEGASALE50", discount: 50, activations: 0, used: 0 }
];

// Сертификаты (название, сумма, количество активаций, применяется к определенным товарам или при сумме)
const certificates = [
    // Сертификаты для определенных товаров (по ID)
    { code: "VAPE100", amount: 100, activations: 1, used: 0, applyTo: ["vape1", "vape2", "vape3"] },
    { code: "POD50", amount: 50, activations: 1, used: 0, applyTo: ["pod1", "pod2"] },
    { code: "LIQUID30", amount: 30, activations: 1, used: 0, applyTo: ["liquid1", "liquid2", "liquid3"] },
    
    // Сертификаты, которые применяются при достижении определенной суммы
    { code: "BONUS200", amount: 200, activations: 100, used: 0, minOrderAmount: 1000 },
    { code: "BONUS500", amount: 500, activations: 100, used: 0, minOrderAmount: 3000 },
    { code: "BONUS1000", amount: 1000, activations: 100, used: 0, minOrderAmount: 5000 },
    
    // Обычные сертификаты
    { code: "CERT100", amount: 100, activations: 1, used: 0 },
    { code: "CERT200", amount: 200, activations: 0, used: 0 },
    { code: "CERT300", amount: 300, activations: 0, used: 0 },
    { code: "CERT400", amount: 400, activations: 0, used: 0 },
    { code: "CERT500", amount: 500, activations: 0, used: 0 },
    { code: "CERT1000", amount: 1000, activations: 0, used: 0 }
];
