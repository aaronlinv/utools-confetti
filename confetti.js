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

function fire(particleRatio, opts) {
  confetti({
    ...defaults,
    ...opts,
    particleCount: Math.floor(count * particleRatio)
  });
}

// 创建撒花效果
function shoot() {
    try {
        if (typeof confetti !== 'function') {
            utools.showNotification("没有找到confetti库")
            return
        }

        // utools.showNotification('开始执行撒花效果')
        confettiGun.shootFromCorners();
        // utools.showNotification('撒花效果执行成功')
    } catch (error) {
        utools.showNotification('撒花效果执行失败: ' + error.message, 'error')
    }
}

// 等待页面完全加载后执行
window.addEventListener('load', () => {
    // 确保 confetti 库已加载
    if (typeof confetti === 'function') {
        // utools.showNotification('页面加载完成，准备执行撒花效果')
        shoot()
        // 动画结束后关闭窗口并退出插件
        setTimeout(() => {
            try {
                // utools.showNotification('撒花效果结束，准备 kill 插件')
                if (window.close) {
                    // utools.showNotification('撒花效果结束，准备 close 撒花窗口')
                    window.close()
                }
                utools.outPlugin(true)
            } catch (error) {
                utools.showNotification('关闭窗口失败: ' + error.message, 'error')
            }
        }, 5000) // 设置5秒后关闭窗口
    } else {
        utools.showNotification('confetti 库加载失败，请检查网络连接', 'error')
    }
}) 