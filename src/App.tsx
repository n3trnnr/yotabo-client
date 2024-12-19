import styles from './App.module.scss'
import Router from './router/router'

const App = () => {
  return (
    <main className={styles.main}>
      <Router />
    </main>
  )
}

export default App
