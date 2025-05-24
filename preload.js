// 导出插件功能
window.exports = {
    'confetti': {
        mode: 'none',
        args: {
            // 进入插件时调用
            enter: ({ code, type, payload }) => {
                try {
                    utools.showNotification('开始创建撒花窗口')
                    // 使用 uTools API 创建窗口
                    const win = utools.createBrowserWindow('index.html', {
                        width: window.screen.width,
                        height: window.screen.height,
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

                    // 将窗口引用保存到全局变量，并暴露给渲染进程
                    window.confettiWindow = win
                    win.webContents.executeJavaScript(`
                        window.confettiWindowId = ${win.id};
                    `)

                    // 监听窗口加载完成
                    win.webContents.on('did-finish-load', () => {
                        utools.showNotification('撒花窗口加载完成')
                    })

                    // 监听窗口错误
                    win.webContents.on('did-fail-load', (event, errorCode, errorDescription) => {
                        utools.showNotification('窗口加载失败: ' + errorDescription, 'error')
                        win.close()
                    })

                    // 监听关闭窗口请求
                    utools.ipcRenderer.on('close-confetti-window', (event, windowId) => {
                        if (window.confettiWindow && window.confettiWindow.id === windowId) {
                            window.confettiWindow.close()
                            window.confettiWindow = null
                        }
                    })
                } catch (error) {
                    utools.showNotification('创建窗口失败: ' + error.message, 'error')
                }
            }
        }
    }
}