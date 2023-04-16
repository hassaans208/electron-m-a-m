const { ipcRenderer } = require('electron');
const electron = require('electron')
const { app, BrowserWindow, ipcMain, session } = electron
const path = require('path');
const { billingsButton } = require('./src/Controllers/DashboardController');
// const sqlite3 = require('sqlite3');
// const db = new sqlite3.Database('./src/database/db.sqlite');
let win;
let usersWin;
let billingsWin;
let carsWin;
let companiesWin;
let partsWin;
let customersWin;

function createWindow(){

  win = new BrowserWindow({
    width: 1200,
    height: 900,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  })
  win.loadFile('src/index.html')
  
  return win
}


app.whenReady().then(() => {
  win = createWindow()



  app.on('activate', () => {
    createWindow()



    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()

      // win = new BrowserWindow({
      //   width: 1200,
      //   height: 900,
      //   webPreferences: {
      //     nodeIntegration: true,
      //     contextIsolation: false
      //   }
      // })

      // win.loadFile('src/index.html')
    }
  })
})
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

ipcMain.on('login', (event, data) => {
  console.log(data)
  if (data) {
    event.sender.send('user-login', 'User Logged In');
  }
  // sessionStorage.setItem('email', data?.email)
  // sessionStorage.setItem('name', data?.name)
  // const auth = session.fromPartition('presist:login')
  // auth.set('email', 'data.email')
  // auth.set('name', 'data.name')
})
ipcMain.on('usersButton', (event, data) => {
  usersWin = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    },
    parent: win,
    modal: true,
  })

  usersWin.loadFile('src/views/users.html')
})
ipcMain.on('carsButton', (event, data) => {
  carsWin = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    },
    parent: win,
    modal: true,
  })

  carsWin.loadFile('src/views/cars.html')
})
ipcMain.on('companiesButton', (event, data) => {
  companiesWin = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    },
    parent: win,
    modal: true,
  })
  companiesWin.loadFile('src/views/companies.html')
})
ipcMain.on('customersButton', (event, data) => {
  customersWin = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    },
    parent: win,
    modal: true,
  })
  customersWin.loadFile('src/views/customers.html')
  customersWin.webContents.openDevTools()
})
ipcMain.on('partsButton', (event, data) => {
  partsWin = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    },
    parent:win,
    modal:true,
  })

  partsWin.loadFile('src/views/parts.html')
})
ipcMain.on('billingsButton', (event, data) => {
  billingsWin = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    },
    parent:win,
    modal:true,
  })
  billingsWin.on('blur', ()=>{
    console.log('error');
  })

  billingsWin.loadFile('src/views/billings.html')
})