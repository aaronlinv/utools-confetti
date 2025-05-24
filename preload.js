// 导出插件功能
window.exports = {
    'confetti': {
        mode: 'none',
        args: {
            // 进入插件时调用
            enter: ({ code, type, payload }) => {
                try {
                    utools.hideMainWindow()

                    // 1. 获取鼠标位置
                    const { x, y } = utools.getCursorScreenPoint()

                    // 2. 获取鼠标所在显示器
                    const display = utools.getDisplayNearestPoint({ x, y })
                    if (!display) {
                        utools.showNotification('未找到鼠标所在的显示器', 'error')
                        utools.outPlugin()
                        return
                    }

                    // 3. 只在该显示器创建撒花窗口
                    const { x: dx, y: dy, width, height } = display.bounds
                    const win = utools.createBrowserWindow('index.html', {
                        x: dx,
                        y: dy,
                        width,
                        height,
                        frame: false,
                        transparent: true,
                        hasShadow: false,
                        backgroundColor: '#00000000',
                        alwaysOnTop: true,
                        skipTaskbar: true,
                        webPreferences: {
                            nodeIntegration: true,
                            contextIsolation: false,
                            backgroundThrottling: false
                        }
                    })
                    win.setIgnoreMouseEvents(true, { forward: true })

                    // utools.showNotification('撒花窗口创建完成')
                } catch (error) {
                    utools.showNotification('创建窗口失败: ' + error.message, 'error')
                }
                // 这里不能 kill 否则动画窗口会一起关闭
                utools.outPlugin()
                // utools.showNotification('撒花 插件退出')
            }
        }
    }
}