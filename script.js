import { products, upgrades, prestigeData, achievements, promocodes, categories } from './game-data.js';

class TaburetkaTapGame {
    constructor() {
        this.balance = 0;
        this.totalEarned = 0;
        this.passiveIncome = 0;
        this.clickValue = 1;
        this.clickMultiplier = 1;
        this.incomeMultiplier = 1;
        this.priceMultiplier = 1;
        this.totalClicks = 0;
        this.goldenChance = 0;
        this.goldenMultiplier = 10;
        this.goldenHits = 0;
        this.criticalChance = 0;
        this.criticalMultiplier = 20;
        this.criticalHits = 0;
        this.lastPlayTime = Date.now();
        this.boostUnlocked = false;
        this.boostActive = false;
        this.boostDuration = 30; // seconds
        this.boostMultiplier = 2;
        this.boostProgress = 0;
        this.boostCount = 0;
        this.boostTimer = 0;
        this.autoClickerInterval = null;
        this.promocodesGenerated = 0;
        this.nextPromocodeAt = promocodes.basePrice;
        this.offlineEarningsEnabled = false;
        this.totalOfflineEarned = 0;
        
        this.prestige = JSON.parse(JSON.stringify(prestigeData));
        this.products = JSON.parse(JSON.stringify(products));
        this.upgrades = JSON.parse(JSON.stringify(upgrades));
        this.achievements = JSON.parse(JSON.stringify(achievements));
        this.promocodes = JSON.parse(JSON.stringify(promocodes));
        
        this.initElements();
        this.initEventListeners();
        this.setupMultitouch();
        this.setupParticles();
    }
    
    initElements() {
        this.elements = {
            balance: document.getElementById('balance'),
            income: document.getElementById('income'),
            clickValue: document.getElementById('clickValue'),
            clickAmount: document.getElementById('clickAmount'),
            totalClicks: document.getElementById('totalClicks'),
            vape: document.getElementById('vape'),
            clickArea: document.getElementById('clickArea'),
            clickEffect: document.querySelector('.click-effect'),
            clickCounter: document.querySelector('.click-counter'),
            notification: document.getElementById('notification'),
            themeToggle: document.getElementById('themeToggle'),
            sunIcon: document.getElementById('sunIcon'),
            moonIcon: document.getElementById('moonIcon'),
            prestigeLevel: document.getElementById('prestigeLevel'),
            prestigeBadge: document.getElementById('prestigeBadge'),
            prestigeBonusValue: document.getElementById('prestigeBonusValue'),
            prestigeProgress: document.getElementById('prestigeProgress'),
            prestigePrice: document.getElementById('prestigePrice'),
            prestigeBtn: document.getElementById('prestigeBtn'),
            prestigeRemaining: document.getElementById('prestigeRemaining'),
            tabBtns: document.querySelectorAll('.tab-btn'),
            tabContents: document.querySelectorAll('.tab-content'),
            productsContainer: document.getElementById('products'),
            upgradesContainer: document.getElementById('upgrades'),
            achievementsContainer: document.querySelector('.achievements-container'),
            offlineEarnings: document.getElementById('offlineEarnings'),
            offlineAmount: document.getElementById('offlineAmount'),
            offlineTime: document.getElementById('offlineTime'),
            collectOffline: document.getElementById('collectOffline'),
            touchZones: [
                document.getElementById('touchZone1'),
                document.getElementById('touchZone2'),
                document.getElementById('touchZone3')
            ],
            boostBtn: document.getElementById('boostBtn'),
            boostProgress: document.getElementById('boostProgress'),
            boostTimer: document.getElementById('boostTimer'),
            generatePromocode: document.getElementById('generatePromocode'),
            promocodesList: document.getElementById('promocodesList'),
            promocodesGenerated: document.getElementById('promocodesGenerated'),
            nextPromocode: document.getElementById('nextPromocode'),
            promocodeModal: document.getElementById('promocodeModal'),
            promocodeValue: document.getElementById('promocodeValue'),
            promocodeDiscount: document.getElementById('promocodeDiscount'),
            closePromocodeModal: document.getElementById('closePromocodeModal'),
            buyPermIncome: document.getElementById('buyPermIncome'),
            permIncomeLevel: document.getElementById('permIncomeLevel'),
            buyClickBonus: document.getElementById('buyClickBonus'),
            clickBonusLevel: document.getElementById('clickBonusLevel'),
            productFilters: document.getElementById('productFilters'),
            upgradeFilters: document.getElementById('upgradeFilters'),
            goldenHits: document.getElementById('goldenHits'),
            criticalHits: document.getElementById('criticalHits'),
            particles: document.getElementById('particles')
        };
    }
    
    initEventListeners() {
        // Клик по области
        this.elements.clickArea.addEventListener('click', (e) => this.handleClick(e));
        
        // Престиж
        this.elements.prestigeBtn.addEventListener('click', () => this.doPrestige());
        
        // Переключение вкладок
        this.elements.tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                this.switchTab(btn.dataset.tab);
                // Показываем/скрываем фильтры в зависимости от вкладки
                if (btn.dataset.tab === 'products') {
                    this.elements.productFilters.style.display = 'flex';
                    this.elements.upgradeFilters.style.display = 'none';
                } else if (btn.dataset.tab === 'upgrades') {
                    this.elements.productFilters.style.display = 'none';
                    this.elements.upgradeFilters.style.display = 'flex';
                } else {
                    this.elements.productFilters.style.display = 'none';
                    this.elements.upgradeFilters.style.display = 'none';
                }
            });
        });
        
        // Фильтры товаров
        document.querySelectorAll('#productFilters .filter-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('#productFilters .filter-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.renderAllProducts(btn.dataset.category);
            });
        });
        
        // Фильтры улучшений
        document.querySelectorAll('#upgradeFilters .filter-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('#upgradeFilters .filter-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.renderAllUpgrades(btn.dataset.category);
            });
        });
        
        // Переключение темы
        this.elements.themeToggle.addEventListener('click', () => this.toggleTheme());
        
        // Оффлайн заработок
        this.elements.collectOffline.addEventListener('click', () => this.collectOfflineEarnings());
        
        // Система буста
        this.elements.boostBtn.addEventListener('click', () => this.activateBoost());
        
        // Промокоды
        this.elements.generatePromocode.addEventListener('click', () => this.generatePromocode());
        this.elements.closePromocodeModal.addEventListener('click', () => this.closePromocodeModal());
        
        // Перманентные улучшения
        this.elements.buyPermIncome.addEventListener('click', () => this.buyPermanentUpgrade('permIncome'));
        this.elements.buyClickBonus.addEventListener('click', () => this.buyPermanentUpgrade('clickBonus'));
        
        // Сохранение при закрытии
        window.addEventListener('beforeunload', () => this.save());
    }
    
    setupMultitouch() {
        this.elements.touchZones.forEach(zone => {
            zone.addEventListener('touchstart', (e) => {
                e.preventDefault();
                this.handleClick({ clientX: e.touches[0].clientX, clientY: e.touches[0].clientY });
            });
        });
    }
    
    setupParticles() {
        // Создаем частицы для фона
        for (let i = 0; i < 50; i++) {
            this.createParticle();
        }
    }
    
    createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const size = Math.random() * 5 + 3;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 5;
        
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;
        particle.style.opacity = Math.random() * 0.5 + 0.1;
        particle.style.animation = `float ${duration}s linear ${delay}s infinite`;
        
        this.elements.particles.appendChild(particle);
    }
    
    start() {
        this.load();
        this.checkOfflineEarnings();
        this.startGameLoop();
        this.renderAllProducts();
        this.renderAllUpgrades();
        this.renderAllAchievements();
        this.renderPromocodes();
        this.updateAllUI();
        
        // Запуск анимации вейпа
        this.elements.vape.querySelector('.vape-image').classList.add('float-animation');
        this.startSmokeEffect();
    }
    
    startSmokeEffect() {
        setInterval(() => {
            if (Math.random() > 0.7) {
                this.createSmokeParticle();
            }
        }, 500);
    }
    
    createSmokeParticle() {
        const smoke = document.createElement('div');
        smoke.className = 'smoke-particle';
        
        const vapeRect = this.elements.vape.getBoundingClientRect();
        const startX = vapeRect.left + vapeRect.width / 2;
        const startY = vapeRect.top + vapeRect.height / 2;
        
        smoke.style.left = `${startX}px`;
        smoke.style.top = `${startY}px`;
        
        const size = Math.random() * 20 + 10;
        smoke.style.width = `${size}px`;
        smoke.style.height = `${size}px`;
        
        document.body.appendChild(smoke);
        
        setTimeout(() => {
            smoke.style.animation = `smokeFloat ${Math.random() * 2 + 1}s ease-out forwards`;
            setTimeout(() => smoke.remove(), 2000);
        }, 10);
    }
    
    handleClick(e) {
        let earned = this.clickValue * this.clickMultiplier;
        let isCritical = false;
        let isGolden = false;
        
        // Проверка на критический удар
        if (this.criticalChance > 0 && Math.random() < this.criticalChance) {
            earned *= this.criticalMultiplier;
            isCritical = true;
            this.criticalHits++;
            this.elements.criticalHits.textContent = this.criticalHits;
            this.showNotification(`Критический удар! +${this.formatMoney(earned)} ₽`, 'critical');
            this.createConfetti(30, 'critical');
        }
        // Проверка на золотой клик
        else if (this.goldenChance > 0 && Math.random() < this.goldenChance) {
            earned *= this.goldenMultiplier;
            isGolden = true;
            this.goldenHits++;
            this.elements.goldenHits.textContent = this.goldenHits;
            this.showNotification(`Золотой клик! +${this.formatMoney(earned)} ₽`, 'golden');
            this.createConfetti(30, 'golden');
        }
        
        // Увеличение прогресса буста
        if (this.boostUnlocked) {
            this.boostProgress = Math.min(100, this.boostProgress + 2);
            this.elements.boostProgress.style.width = `${this.boostProgress}%`;
            this.elements.boostBtn.disabled = this.boostProgress < 100;
        }
        
        this.addBalance(earned);
        this.totalClicks++;
        this.checkAchievements();
        
        // Позиция клика
        const rect = this.elements.vape.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Эффекты
        this.createClickEffect(x, y, isCritical ? 'critical' : isGolden ? 'golden' : 'normal');
        this.createClickText(x, y, earned, isCritical ? 'critical' : isGolden ? 'golden' : 'normal');
        this.animateVape();
    }
    
    createClickEffect(x, y, type = 'normal') {
        const effect = this.elements.clickEffect.cloneNode(true);
        effect.style.left = `${x}px`;
        effect.style.top = `${y}px`;
        effect.style.opacity = '1';
        
        if (type === 'golden') {
            effect.style.background = 'radial-gradient(circle at center, rgba(255,215,0,0.8) 0%, transparent 70%)';
        } else if (type === 'critical') {
            effect.style.background = 'radial-gradient(circle at center, rgba(239, 68, 68, 0.8) 0%, transparent 70%)';
            effect.classList.add('critical-effect');
        }
        
        this.elements.vape.appendChild(effect);
        setTimeout(() => effect.remove(), 500);
    }
    
    createClickText(x, y, amount, type = 'normal') {
        const text = this.elements.clickCounter.cloneNode(true);
        text.textContent = `+${this.formatMoney(amount)}₽`;
        text.style.left = `${x}px`;
        text.style.top = `${y}px`;
        text.style.opacity = '1';
        
        if (type === 'golden') {
            text.classList.add('golden-click');
        } else if (type === 'critical') {
            text.classList.add('critical-click');
        }
        
        this.elements.vape.appendChild(text);
        setTimeout(() => text.remove(), 1000);
    }
    
    animateVape() {
        this.elements.vape.classList.add('shake-animation');
        setTimeout(() => {
            this.elements.vape.classList.remove('shake-animation');
        }, 500);
    }
    
    addBalance(amount) {
        this.balance += amount;
        this.totalEarned += amount;
        
        // Проверка на возможность генерации промокода
        if (this.totalEarned >= this.nextPromocodeAt) {
            this.nextPromocodeAt += this.promocodes.basePrice;
            this.elements.generatePromocode.disabled = false;
        }
        
        this.updateUI();
        this.save();
    }
    
    buyProduct(type) {
        const product = this.products[type];
        const price = this.getProductPrice(type);
        
        if (this.balance >= price) {
            this.balance -= price;
            product.owned++;
            this.recalculatePassiveIncome();
            
            this.updateProductUI(type);
            this.showNotification(`Куплено: ${product.name}`, 'success');
            this.createConfetti();
            this.save();
        } else {
            this.showNotification('Недостаточно средств!', 'error');
        }
    }
    
    sellProduct(type) {
        const product = this.products[type];
        
        if (product.owned > 0) {
            const sellPrice = Math.floor(this.getProductPrice(type) * 0.7);
            this.balance += sellPrice;
            product.owned--;
            this.recalculatePassiveIncome();
            
            this.updateProductUI(type);
            this.showNotification(`Продано: ${product.name} за ${this.formatMoney(sellPrice)} ₽`, 'warning');
            this.save();
        }
    }
    
    getProductPrice(type) {
        const product = this.products[type];
        const discount = this.prestige.upgrades.discount.level * this.prestige.upgrades.discount.bonusPerLevel;
        const priceMultiplier = this.priceMultiplier * (1 - discount);
        return Math.floor(product.basePrice * Math.pow(1.15, product.owned) * priceMultiplier);
    }
    
    buyUpgrade(type) {
        const upgrade = this.upgrades[type];
        
        if (this.balance >= upgrade.price && !upgrade.purchased) {
            this.balance -= upgrade.price;
            upgrade.purchased = true;
            upgrade.effect(this);
            
            this.updateUpgradeUI(type);
            this.showNotification(`Куплено улучшение: ${upgrade.name}`, 'success');
            this.createConfetti();
            this.checkAchievements();
            this.save();
        } else if (upgrade.purchased) {
            this.showNotification('Уже куплено!', 'error');
        } else {
            this.showNotification('Недостаточно средств!', 'error');
        }
    }
    
    activateBoost() {
        if (this.boostProgress >= 100 && !this.boostActive) {
            this.boostActive = true;
            this.boostCount++;
            this.boostProgress = 0;
            this.boostTimer = this.boostDuration;
            this.elements.boostProgress.style.width = '0%';
            this.elements.boostBtn.disabled = true;
            this.elements.boostBtn.classList.add('active');
            
            const originalMultiplier = this.incomeMultiplier;
            this.incomeMultiplier *= this.boostMultiplier;
            this.recalculatePassiveIncome();
            
            this.showNotification(`Буст активирован! Доход x${this.boostMultiplier}`, 'warning');
            
            // Обновляем таймер каждую секунду
            const boostInterval = setInterval(() => {
                this.boostTimer--;
                this.elements.boostTimer.textContent = this.boostTimer;
                
                if (this.boostTimer <= 0) {
                    clearInterval(boostInterval);
                    this.boostActive = false;
                    this.incomeMultiplier = originalMultiplier;
                    this.recalculatePassiveIncome();
                    this.elements.boostBtn.classList.remove('active');
                    this.elements.boostTimer.textContent = '';
                    this.showNotification('Буст закончился', 'info');
                    this.save();
                }
            }, 1000);
            
            this.checkAchievements();
            this.save();
        }
    }
    
    doPrestige() {
        if (this.balance >= this.prestige.nextRequirement) {
            // Рассчитываем престиж-очки
            const earnedPoints = Math.floor(this.balance / this.prestige.nextRequirement);
            this.prestige.level++;
            this.prestige.points += earnedPoints;
            this.prestige.bonus = 1 + (this.prestige.level * this.prestige.bonusPerLevel);
            this.prestige.nextRequirement = this.prestige.baseRequirement * Math.pow(2, this.prestige.level);
            
            // Перманентный доход
            let permIncomeBonus = 0;
            if (this.prestige.upgrades.permIncome.level > 0) {
                permIncomeBonus = this.passiveIncome * this.prestige.upgrades.permIncome.level * 
                                 this.prestige.upgrades.permIncome.bonusPerLevel;
            }
            
            // Бонус за клик
            if (this.prestige.upgrades.clickBonus.level > 0) {
                this.clickValue = 1 + (this.prestige.upgrades.clickBonus.level * 
                                      this.prestige.upgrades.clickBonus.bonusPerLevel);
            } else {
                this.clickValue = 1;
            }
            
            // Сброс игры с сохранением престижа
            this.balance = permIncomeBonus;
            this.passiveIncome = permIncomeBonus;
            this.clickMultiplier = 1;
            this.incomeMultiplier = 1;
            this.goldenChance = 0;
            this.criticalChance = 0;
            this.boostProgress = 0;
            this.nextPromocodeAt = this.promocodes.basePrice;
            
            for (const type in this.products) {
                this.products[type].owned = 0;
            }
            
            for (const type in this.upgrades) {
                this.upgrades[type].purchased = false;
            }
            
            // Останавливаем автокликер
            if (this.autoClickerInterval) {
                clearInterval(this.autoClickerInterval);
                this.autoClickerInterval = null;
            }
            
            this.renderAllProducts();
            this.renderAllUpgrades();
            this.updateAllUI();
            this.showNotification(
                `Престиж ${this.prestige.level} достигнут! +${Math.round(this.prestige.bonus * 100 - 100)}% к доходу\n` +
                `Получено ${earnedPoints} престиж-очков`, 
                'success'
            );
            this.createConfetti(50);
            this.checkAchievements();
            this.save();
        }
    }
    
    buyPermanentUpgrade(type) {
        const upgrade = this.prestige.upgrades[type];
        
        if (upgrade.level < upgrade.maxLevel && this.prestige.points >= upgrade.price) {
            this.prestige.points -= upgrade.price;
            upgrade.level++;
            upgrade.price = Math.floor(upgrade.price * 1.5);
            
            // Применяем эффект улучшения
            if (type === 'permIncome') {
                // Эффект уже применяется при пр��стиже
            } else if (type === 'clickBonus') {
                this.clickValue = 1 + (upgrade.level * upgrade.bonusPerLevel);
            }
            
            this.updatePermanentUpgradesUI();
            this.showNotification(`Улучшение "${upgrade.name}" повышено до уровня ${upgrade.level}`, 'success');
            this.save();
        } else if (upgrade.level >= upgrade.maxLevel) {
            this.showNotification('Максимальный уровень улучшения достигнут!', 'error');
        } else {
            this.showNotification('Недостаточно престиж-очков!', 'error');
        }
    }
    
    generatePromocode() {
        if (this.balance >= this.promocodes.basePrice) {
            this.balance -= this.promocodes.basePrice;
            
            // Выбираем награду по вероятности
            const random = Math.random();
            let reward = 100;
            let cumulativeChance = 0;
            
            for (const r of this.promocodes.rewards) {
                cumulativeChance += r.chance;
                if (random <= cumulativeChance) {
                    reward = r.amount;
                    break;
                }
            }
            
            // Создаем промокод
            const promocode = {
                code: `TAP-${Math.floor(Math.random() * 9000) + 1000}`,
                amount: reward,
                date: new Date().toLocaleString()
            };
            
            this.promocodes.list.push(promocode);
            this.promocodesGenerated++;
            this.nextPromocodeAt += this.promocodes.basePrice;
            
            // Показываем модальное окно
            this.showPromocodeModal(promocode);
            
            this.renderPromocodes();
            this.updateUI();
            this.checkAchievements();
            this.save();
        }
    }
    
    showPromocodeModal(promocode) {
        this.elements.promocodeValue.textContent = promocode.code;
        this.elements.promocodeDiscount.textContent = promocode.amount;
        this.elements.promocodeModal.classList.add('show');
    }
    
    closePromocodeModal() {
        this.elements.promocodeModal.classList.remove('show');
    }
    
    renderPromocodes() {
        this.elements.promocodesList.innerHTML = '';
        
        if (this.promocodes.list.length === 0) {
            this.elements.promocodesList.innerHTML = `
                <div class="empty-state">
                    <i>🎟️</i>
                    <p>У вас пока нет промокодов</p>
                </div>
            `;
            return;
        }
        
        this.promocodes.list.forEach(promo => {
            const promoElement = document.createElement('div');
            promoElement.className = 'promocode-item';
            promoElement.innerHTML = `
                <div class="promocode-value">${promo.code}</div>
                <div class="promocode-amount">Скидка: ${promo.amount} ₽</div>
                <div class="promocode-date">${promo.date}</div>
            `;
            this.elements.promocodesList.appendChild(promoElement);
        });
    }
    
    recalculatePassiveIncome() {
        this.passiveIncome = 0;
        for (const type in this.products) {
            const product = this.products[type];
            this.passiveIncome += product.owned * product.baseIncome * this.incomeMultiplier * this.prestige.bonus;
        }
        
        // Применяем буст
        if (this.boostActive) {
            this.passiveIncome *= this.boostMultiplier;
        }
    }
    
    checkOfflineEarnings() {
        const now = Date.now();
        const offlineTime = Math.min((now - this.lastPlayTime) / 1000, 86400); // Макс 24 часа
        const offlineEarnings = Math.floor(this.passiveIncome * offlineTime * (this.offlineEarningsEnabled ? 1 : 0.5));
        
        if (offlineEarnings > 0) {
            this.elements.offlineAmount.textContent = this.formatMoney(offlineEarnings);
            
            // Форматируем время
            const hours = Math.floor(offlineTime / 3600);
            const minutes = Math.floor((offlineTime % 3600) / 60);
            const seconds = Math.floor(offlineTime % 60);
            
            let timeString = '';
            if (hours > 0) timeString += `${hours} ч `;
            if (minutes > 0) timeString += `${minutes} мин `;
            timeString += `${seconds} сек`;
            
            this.elements.offlineTime.textContent = `Время отсутствия: ${timeString}`;
            this.elements.offlineEarnings.classList.add('show');
            this.offlineEarnings = offlineEarnings;
            this.totalOfflineEarned += offlineEarnings;
        }
        
        this.lastPlayTime = now;
    }
    
    collectOfflineEarnings() {
        this.addBalance(this.offlineEarnings);
        this.elements.offlineEarnings.classList.remove('show');
        this.showNotification(`Получено оффлайн: ${this.formatMoney(this.offlineEarnings)} ₽`, 'info');
    }
    
    checkAchievements() {
        let unlockedCount = 0;
        
        this.achievements.forEach(achievement => {
            if (!achievement.unlocked && achievement.condition(this)) {
                achievement.unlocked = true;
                this.balance += achievement.reward;
                this.showNotification(`Достижение: ${achievement.name}!
Награда: ${this.formatMoney(achievement.reward)} ₽`, 'info');
                this.createConfetti(15);
                unlockedCount++;
            }
        });
        
        if (unlockedCount > 0) {
            this.renderAllAchievements();
            this.save();
        }
    }
    
    startGameLoop() {
        setInterval(() => {
            if (this.passiveIncome > 0) {
                const income = this.passiveIncome / 10; // 10 раз в секунду для плавности
                this.balance += income;
                this.totalEarned += income;
                
                // Автокликер
                if (this.upgrades.autoClicker.purchased && !this.autoClickerInterval) {
                    this.upgrades.autoClicker.effect(this);
                }
                
                this.updateUI();
                this.save();
            }
        }, 100);
    }
    
    renderAllProducts(category = 'all') {
        this.elements.productsContainer.innerHTML = '';
        
        let hasProducts = false;
        
        for (const type in this.products) {
            const product = this.products[type];
            
            if (this.totalEarned < product.unlockAt) continue;
            if (category !== 'all' && product.category !== category) continue;
            
            hasProducts = true;
            
            const productElement = document.createElement('div');
            productElement.className = 'upgrade-item';
            productElement.innerHTML = `
                <div class="upgrade-icon">${product.icon}</div>
                <div class="upgrade-info">
                    <div class="upgrade-name">${product.name}</div>
                    <div class="upgrade-description">${product.description}</div>
                    <div class="upgrade-stats">
                        <div class="upgrade-stat">
                            <i>📈</i> <span id="${type}Income">${(product.baseIncome * this.incomeMultiplier * this.prestige.bonus).toFixed(1)}</span> ₽/сек
                        </div>
                        <div class="upgrade-stat">
                            <i>🛒</i> <span id="${type}Owned">${product.owned}</span> шт
                        </div>
                    </div>
                    <div class="progress-bar">
                        <div class="progress-fill" id="${type}Progress"></div>
                    </div>
                    <div class="upgrade-actions">
                        <button class="buy-btn" id="buy${this.capitalize(type)}">
                            <i>➕</i> Купить <span id="${type}Price">${this.formatMoney(this.getProductPrice(type))}</span> ₽
                        </button>
                        <button class="sell-btn" id="sell${this.capitalize(type)}" ${product.owned <= 0 ? 'disabled' : ''}>
                            <i>➖</i> Продать
                        </button>
                    </div>
                </div>
            `;
            
            this.elements.productsContainer.appendChild(productElement);
            
            // Добавляем обработчики событий
            document.getElementById(`buy${this.capitalize(type)}`).addEventListener('click', () => this.buyProduct(type));
            document.getElementById(`sell${this.capitalize(type)}`).addEventListener('click', () => this.sellProduct(type));
        }
        
        if (!hasProducts) {
            this.elements.productsContainer.innerHTML = `
                <div class="empty-state">
                    <i>🛒</i>
                    <p>${category === 'all' ? 'Покупайте товары для пассивного дохода' : 'Нет товаров в этой категории'}</p>
                </div>
            `;
        }
    }
    
    renderAllUpgrades(category = 'all') {
        this.elements.upgradesContainer.innerHTML = '';
        
        let hasUpgrades = false;
        
        for (const type in this.upgrades) {
            const upgrade = this.upgrades[type];
            
            if (this.totalEarned < upgrade.unlockAt || (category !== 'all' && upgrade.category !== category)) continue;
            
            hasUpgrades = true;
            
            const upgradeElement = document.createElement('div');
            upgradeElement.className = 'upgrade-item';
            upgradeElement.innerHTML = `
                <div class="upgrade-icon">${upgrade.icon}</div>
                <div class="upgrade-info">
                    <div class="upgrade-name">${upgrade.name}</div>
                    <div class="upgrade-description">${upgrade.description}</div>
                    <div class="upgrade-stats">
                        <div class="upgrade-stat">
                            <i>💰</i> ${this.formatMoney(upgrade.price)} ₽
                        </div>
                    </div>
                    <div class="upgrade-actions">
                        <button class="buy-btn" id="buy${this.capitalize(type)}" ${upgrade.purchased ? 'disabled' : ''}>
                            <i>⚡</i> ${upgrade.purchased ? 'Куплено' : 'Купить'}
                        </button>
                    </div>
                </div>
            `;
            
            this.elements.upgradesContainer.appendChild(upgradeElement);
            
            if (!upgrade.purchased) {
                document.getElementById(`buy${this.capitalize(type)}`).addEventListener('click', () => this.buyUpgrade(type));
            }
        }
        
        if (!hasUpgrades) {
            this.elements.upgradesContainer.innerHTML = `
                <div class="empty-state">
                    <i>⚡</i>
                    <p>${category === 'all' ? 'Улучшайте свои возможности' : 'Нет улучшений в этой категории'}</p>
                </div>
            `;
        }
    }
    
    renderAllAchievements() {
        this.elements.achievementsContainer.innerHTML = '';
        
        this.achievements.forEach(achievement => {
            const achievementElement = document.createElement('div');
            achievementElement.className = `achievement-item ${achievement.unlocked ? 'unlocked' : ''}`;
            achievementElement.innerHTML = `
                <div class="achievement-icon">${achievement.icon}</div>
                <div class="achievement-info">
                    <div class="achievement-name">${achievement.name}</div>
                    <div class="achievement-desc">${achievement.description}</div>
                    ${!achievement.unlocked ? 
                        `<div class="achievement-progress">Награда: ${this.formatMoney(achievement.reward)} ₽</div>` : 
                        '<div class="achievement-progress">Получено!</div>'}
                </div>
            `;
            
            this.elements.achievementsContainer.appendChild(achievementElement);
        });
    }
    
    updateUI() {
        this.elements.balance.textContent = `${this.formatMoney(this.balance)} ₽`;
        this.elements.income.textContent = `${this.formatMoney(this.passiveIncome)} ₽/сек`;
        this.elements.clickValue.textContent = `${this.formatMoney(this.clickValue * this.clickMultiplier)} ₽`;
        this.elements.clickAmount.textContent = this.formatMoney(this.clickValue * this.clickMultiplier);
        this.elements.totalClicks.textContent = this.totalClicks;
        this.elements.prestigeBadge.textContent = this.prestige.level;
        
        // Престиж
        const prestigeProgress = Math.min(100, (this.balance / this.prestige.nextRequirement) * 100);
        this.elements.prestigeProgress.style.width = `${prestigeProgress}%`;
        this.elements.prestigeLevel.textContent = this.prestige.level;
        this.elements.prestigeBonusValue.textContent = Math.round((this.prestige.bonus - 1) * 100);
        this.elements.prestigePrice.textContent = this.formatMoney(this.prestige.nextRequirement);
        this.elements.prestigeRemaining.textContent = this.formatMoney(Math.max(0, this.prestige.nextRequirement - this.balance));
        this.elements.prestigeBtn.disabled = this.balance < this.prestige.nextRequirement;
        
        // Промокоды
        this.elements.promocodesGenerated.textContent = this.promocodesGenerated;
        this.elements.nextPromocode.textContent = this.formatMoney(Math.max(0, this.nextPromocodeAt - this.totalEarned));
        this.elements.generatePromocode.disabled = this.balance < this.promocodes.basePrice || this.totalEarned < this.nextPromocodeAt;
        
        // Буст
        if (this.boostUnlocked) {
            this.elements.boostBtn.style.display = 'flex';
            this.elements.boostBtn.disabled = this.boostProgress < 100 || this.boostActive;
        } else {
            this.elements.boostBtn.style.display = 'none';
        }
    }
    
    updateProductUI(type) {
        const product = this.products[type];
        const price = this.getProductPrice(type);
        
        if (document.getElementById(`${type}Owned`)) {
            document.getElementById(`${type}Owned`).textContent = product.owned;
            document.getElementById(`${type}Income`).textContent = (product.baseIncome * this.incomeMultiplier * this.prestige.bonus).toFixed(1);
            document.getElementById(`${type}Price`).textContent = this.formatMoney(price);
            
            document.getElementById(`buy${this.capitalize(type)}`).disabled = this.balance < price;
            document.getElementById(`sell${this.capitalize(type)}`).disabled = product.owned <= 0;
            
            const progress = Math.min(100, (product.owned / 50) * 100);
            document.getElementById(`${type}Progress`).style.width = `${progress}%`;
        }
        
        this.updateUI();
    }
    
    updateUpgradeUI(type) {
        const upgrade = this.upgrades[type];
        const btn = document.getElementById(`buy${this.capitalize(type)}`);
        
        if (btn) {
            if (upgrade.purchased) {
                btn.textContent = 'Куплено';
                btn.disabled = true;
            } else {
                btn.disabled = this.balance < upgrade.price;
            }
        }
    }
    
    updatePermanentUpgradesUI() {
        // Алмазные пальцы
        const permIncome = this.prestige.upgrades.permIncome;
        this.elements.permIncomeLevel.textContent = permIncome.level;
        this.elements.buyPermIncome.textContent = permIncome.level >= permIncome.maxLevel ? 
            'Максимальный уровень' : 
            `Улучшить (${permIncome.price} престиж-очков)`;
        this.elements.buyPermIncome.disabled = permIncome.level >= permIncome.maxLevel || this.prestige.points < permIncome.price;
        
        // Золотые руки
        const clickBonus = this.prestige.upgrades.clickBonus;
        this.elements.clickBonusLevel.textContent = clickBonus.level;
        this.elements.buyClickBonus.textContent = clickBonus.level >= clickBonus.maxLevel ? 
            'Максимальный уровень' : 
            `Улучшить (${clickBonus.price} престиж-очков)`;
        this.elements.buyClickBonus.disabled = clickBonus.level >= clickBonus.maxLevel || this.prestige.points < clickBonus.price;
    }
    
    updateAllUI() {
        this.updateUI();
        
        for (const type in this.products) {
            this.updateProductUI(type);
        }
        
        for (const type in this.upgrades) {
            this.updateUpgradeUI(type);
        }
        
        this.updatePermanentUpgradesUI();
    }
    
    switchTab(tabId) {
        this.elements.tabBtns.forEach(b => b.classList.remove('active'));
        this.elements.tabContents.forEach(c => c.classList.remove('active'));
        
        document.querySelector(`.tab-btn[data-tab="${tabId}"]`).classList.add('active');
        document.getElementById(tabId).classList.add('active');
    }
    
    createConfetti(count = 20, type = 'normal') {
        for (let i = 0; i < count; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = `${Math.random() * 100}%`;
            confetti.style.top = '100%';
            
            if (type === 'golden') {
                confetti.classList.add('golden-confetti');
            } else if (type === 'critical') {
                confetti.classList.add('critical-confetti');
            } else {
                confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
            }
            
            confetti.style.opacity = '1';
            confetti.style.animation = `confetti ${Math.random() * 3 + 2}s linear forwards`;
            
            document.body.appendChild(confetti);
            setTimeout(() => confetti.remove(), 5000);
        }
    }
    
    showNotification(message, type) {
        this.elements.notification.textContent = message;
        this.elements.notification.className = `notification ${type}`;
        this.elements.notification.classList.add('show');
        
        setTimeout(() => {
            this.elements.notification.classList.remove('show');
        }, 3000);
    }
    
    toggleTheme() {
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
        this.updateThemeIcon();
    }
    
    updateThemeIcon() {
        const isDark = document.body.classList.contains('dark-mode');
        this.elements.sunIcon.style.display = isDark ? 'none' : 'block';
        this.elements.moonIcon.style.display = isDark ? 'block' : 'none';
    }
    
    formatMoney(amount) {
        if (amount >= 1000000000) {
            return (amount / 1000000000).toFixed(1) + 'B';
        }
        if (amount >= 1000000) {
            return (amount / 1000000).toFixed(1) + 'M';
        }
        if (amount >= 1000) {
            return (amount / 1000).toFixed(1) + 'K';
        }
        return amount.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    
    capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    
    save() {
        const gameData = {
            balance: this.balance,
            totalEarned: this.totalEarned,
            passiveIncome: this.passiveIncome,
            clickValue: this.clickValue,
            clickMultiplier: this.clickMultiplier,
            incomeMultiplier: this.incomeMultiplier,
            priceMultiplier: this.priceMultiplier,
            totalClicks: this.totalClicks,
            goldenChance: this.goldenChance,
            goldenHits: this.goldenHits,
            criticalChance: this.criticalChance,
            criticalHits: this.criticalHits,
            lastPlayTime: this.lastPlayTime,
            boostUnlocked: this.boostUnlocked,
            boostActive: this.boostActive,
            boostCount: this.boostCount,
            boostProgress: this.boostProgress,
            boostTimer: this.boostTimer,
            offlineEarningsEnabled: this.offlineEarningsEnabled,
            totalOfflineEarned: this.totalOfflineEarned,
            prestige: this.prestige,
            products: this.products,
            upgrades: this.upgrades,
            achievements: this.achievements,
            promocodesGenerated: this.promocodesGenerated,
            nextPromocodeAt: this.nextPromocodeAt,
            promocodes: this.promocodes,
            darkMode: document.body.classList.contains('dark-mode')
        };
        localStorage.setItem('taburetkaTapSave', JSON.stringify(gameData));
    }
    
    load() {
        const savedData = localStorage.getItem('taburetkaTapSave');
        if (savedData) {
            const data = JSON.parse(savedData);
            
            this.balance = data.balance || 0;
            this.totalEarned = data.totalEarned || 0;
            this.passiveIncome = data.passiveIncome || 0;
            this.clickValue = data.clickValue || 1;
            this.clickMultiplier = data.clickMultiplier || 1;
            this.incomeMultiplier = data.incomeMultiplier || 1;
            this.priceMultiplier = data.priceMultiplier || 1;
            this.totalClicks = data.totalClicks || 0;
            this.goldenChance = data.goldenChance || 0;
            this.goldenHits = data.goldenHits || 0;
            this.criticalChance = data.criticalChance || 0;
            this.criticalHits = data.criticalHits || 0;
            this.lastPlayTime = data.lastPlayTime || Date.now();
            this.boostUnlocked = data.boostUnlocked || false;
            this.boostActive = data.boostActive || false;
            this.boostCount = data.boostCount || 0;
            this.boostProgress = data.boostProgress || 0;
            this.boostTimer = data.boostTimer || 0;
            this.offlineEarningsEnabled = data.offlineEarningsEnabled || false;
            this.totalOfflineEarned = data.totalOfflineEarned || 0;
            this.promocodesGenerated = data.promocodesGenerated || 0;
            this.nextPromocodeAt = data.nextPromocodeAt || this.promocodes.basePrice;
            
            this.prestige = data.prestige || JSON.parse(JSON.stringify(prestigeData));
            Object.assign(this.products, data.products || JSON.parse(JSON.stringify(products)));
            Object.assign(this.upgrades, data.upgrades || JSON.parse(JSON.stringify(upgrades)));
            Object.assign(this.achievements, data.achievements || JSON.parse(JSON.stringify(achievements)));
            Object.assign(this.promocodes, data.promocodes || JSON.parse(JSON.stringify(promocodes)));
            
            if (data.darkMode) {
                document.body.classList.add('dark-mode');
                this.updateThemeIcon();
            }
            
            // Восстанавливаем автокликер если нужно
            if (this.upgrades.autoClicker.purchased) {
                this.upgrades.autoClicker.effect(this);
            }
            
            // Восстанавливаем буст если он был активен
            if (this.boostActive) {
                this.activateBoost();
            }
        }
    }
}

// Запуск игры при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    const game = new TaburetkaTapGame();
    game.start();
});
