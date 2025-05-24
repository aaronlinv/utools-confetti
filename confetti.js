// 获取屏幕尺寸
const screenWidth = window.screen.width
const screenHeight = window.screen.height

// 配置撒花效果
const defaults = {
    spread: 360,
    ticks: 200,  // 增加动画持续时间
    gravity: 0.8,  // 添加重力效果
    decay: 0.92,  // 调整衰减速度
    startVelocity: 45,  // 增加初始速度
    shapes: ['star', 'circle'],  // 同时使用星星和圆形
    colors: ['FFE400', 'FFBD00', 'E89400', 'FFCA6C', 'FDFFB8', 'FF0000', '00FF00', '0000FF'],  // 增加更多颜色
    origin: { y: 0.6 }  // 从屏幕中间偏上位置开始
}

// 创建多个撒花效果
function shoot() {
    try {
        utools.showNotification('开始执行撒花效果')
        // 从多个位置发射
        const origins = [
            { x: 0.2, y: 0.6 },
            { x: 0.5, y: 0.6 },
            { x: 0.8, y: 0.6 }
        ]

        origins.forEach(origin => {
            confetti({
                ...defaults,
                particleCount: 50,  // 增加粒子数量
                scalar: 1.5,  // 增大粒子尺寸
                origin: origin
            })
        })
        utools.showNotification('撒花效果执行成功')
    } catch (error) {
        utools.showNotification('撒花效果执行失败: ' + error.message, 'error')
    }
}

// 等待页面完全加载后执行
window.addEventListener('load', () => {
    utools.showNotification('页面加载完成，准备执行撒花效果')
    shoot()
    
    // 动画结束后关闭窗口
    setTimeout(() => {
        try {
            utools.showNotification('撒花效果结束，准备关闭窗口')
            window.close()  // 直接关闭当前窗口
        } catch (error) {
            utools.showNotification('关闭窗口失败: ' + error.message, 'error')
        }
    }, 4000)
}) 