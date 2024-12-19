// import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.scss'
import { Provider } from 'react-redux'
import store from './store/store.ts'
import ModalProvider from './hoc/Contexts/ModalWindow/ModalProvider.tsx'

createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <Provider store={store}>
    <ModalProvider>
      <App />
    </ModalProvider>
  </Provider>
  // </React.StrictMode>
)
