// import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.scss'
import { Provider } from 'react-redux'
import store from './store/store.ts'
import ModalProvider from './hoc/Contexts/ModalWindow/ModalProvider.tsx'
import SideDrawerProvider from './hoc/Contexts/SideDrawer/SideDrawerProvider.tsx'

createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <Provider store={store}>
    <ModalProvider>
      <SideDrawerProvider>
        <App />
      </SideDrawerProvider>
    </ModalProvider>
  </Provider>
  // </React.StrictMode>
)
