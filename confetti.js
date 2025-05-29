// 创建撒花效果实例
const confettiGun = new ConfettiGun();

// 获取屏幕尺寸
const screenWidth = window.screen.width
const screenHeight = window.screen.height

// 配置撒花效果
var count = 200;
var defaults = {
    origin: { y: 0.8 }
};

// 存储所有的 confetti Promise
let confettiPromises = [];

function fire(particleRatio, opts) {
    // 保存返回的 Promise
    const promise = confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio)
    });

    confettiPromises.push(promise);
    return promise;
}

// 创建撒花效果
function shoot() {
    try {
        if (typeof confetti !== 'function') {
            utools.showNotification("没有找到confetti库")
            return
        }

        // 清空之前的 promises
        confettiPromises = [];

        // 执行撒花效果并收集所有 Promise
        const shootPromises = confettiGun.shootFromCorners();

        // 将返回的 Promise 数组添加到全局 Promise 数组中
        if (Array.isArray(shootPromises)) {
            confettiPromises.push(...shootPromises);
        }

        // 当所有 confetti 动画完成时，关闭窗口并退出插件
        Promise.all(confettiPromises)
            .then(() => {
                // utools.showNotification('所有纸屑都落下了, 即将关闭窗口');
                // 所有纸屑都落下后执行
                try {
                    if (window.close) {
                        window.close()
                    }
                    utools.outPlugin(true)
                } catch (error) {
                    utools.showNotification('关闭窗口失败: ' + error.message, 'error')
                }
            })
            .catch(error => {
                utools.showNotification('撒花效果出错: ' + error.message, 'error')
            });
    } catch (error) {
        utools.showNotification('撒花效果执行失败: ' + error.message, 'error')
    }
}

// 等待页面完全加载后执行
window.addEventListener('load', () => {
    // 确保 confetti 库已加载
    if (typeof confetti === 'function') {
        shoot()
    } else {
        utools.showNotification('confetti 库加载失败，请检查网络连接', 'error')
    }
}) 