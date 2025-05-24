// 使用全局变量而不是模块导出
window.ConfettiGun = class ConfettiGun {
    constructor() {
        this.count = 500;
        this.defaults = {
            origin: { y: 0.8 }
        };
    }

    fire(particleRatio, opts) {
        // 确保 confetti 是全局函数
        const confettiFn = window.confetti;
        if (typeof confettiFn !== 'function') {
            utools.showNotification('没有找到confetti库');
            return;
        }

        confettiFn({
            ...this.defaults,
            ...opts,
            particleCount: Math.floor(this.count * particleRatio)
        });
    }

    // 默认的撒花效果
    shootDefault() {
        this.fire(0.25, {
            spread: 26,
            startVelocity: 55,
        });
        this.fire(0.2, {
            spread: 60,
        });
        this.fire(0.35, {
            spread: 100,
            decay: 0.91,
            scalar: 0.8
        });
        this.fire(0.1, {
            spread: 120,
            startVelocity: 25,
            decay: 0.92,
            scalar: 1.2
        });
        this.fire(0.1, {
            spread: 120,
            startVelocity: 45,
        });
    }

    // 简单的撒花效果
    shootSimple() {
        this.fire(0.3, {
            spread: 50,
            startVelocity: 45,
        });
        this.fire(0.2, {
            spread: 80,
            startVelocity: 35,
        });
    }

    // 密集的撒花效果
    shootDense() {
        this.fire(0.4, {
            spread: 40,
            startVelocity: 60,
            decay: 0.93,
        });
        this.fire(0.3, {
            spread: 70,
            startVelocity: 50,
            decay: 0.92,
        });
        this.fire(0.3, {
            spread: 100,
            startVelocity: 40,
            decay: 0.91,
        });
    }

    // 从屏幕左右下角发射彩纸
    shootFromCorners() {

        // 抽取相同变量
        const commonOptions = {
            spread: 40,
            startVelocity: 120,
            decay: 0.93,
            ticks: 5*60, // 3秒 = 180帧
            gravity: 3.5,
            scalar: 1.9,
            particleCount: Math.floor(this.count * 0.8) // 增加纸屑数量
        };

        // 左侧发射
        this.fire(0.5, {
            ...commonOptions,
            origin: { x: -0.2, y: 1.2 },
            angle: 60,
            drift: 0.8
        });

        // 右侧发射
        this.fire(0.5, {
            ...commonOptions,
            origin: { x: 1.2, y: 1.2 },
            angle: 120,
            drift: -0.8
        });
    }
} 