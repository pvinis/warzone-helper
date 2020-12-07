const { app, BrowserWindow, globalShortcut } = require('electron')
const robot = require("robotjs")


const TOGGLE_ALL_KEYS_KEY = "CommandOrControl+p"
const DROP_ALL_MONEY_KEY = 'p'

let enabled = true

const toggleAllKeys = () => {
    enabled = !enabled
    console.log(`${enabled ? 'en' : 'dis'}abled all`)
    doTheRegistering()
}

const doTheRegistering = () => {
    if (enabled) {
        globalShortcut.register(DROP_ALL_MONEY_KEY, dropAllMoney)
    } else {
        globalShortcut.unregister(DROP_ALL_MONEY_KEY)
    }
}

const dropAllMoney = () => {
    console.log('dropping money')
   robot.keyToggle("tab", "down")
   robot.moveMouseSmooth(1450, 1600, 1)
   robot.mouseClick("right")
   robot.keyToggle("tab", "up")
}


function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  win.loadFile('index.html')
}

app.whenReady().then(() => {
    globalShortcut.register(TOGGLE_ALL_KEYS_KEY, toggleAllKeys)
    doTheRegistering()
    createWindow()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
