import { useContext } from 'react'
import { ThemeProvider, ThemeContext } from './context/ThemeContext'
import StudentManager from './components/StudentManager'
import './App.css'

function AppContent() {
  const { theme, toggleTheme } = useContext(ThemeContext)

  return (
    <div className={`app ${theme}`}>
      <header>
        <h1>Quan ly Sinh vien</h1>
        <button onClick={toggleTheme}>
          {theme === 'light' ? 'Che do toi' : 'Che do sang'}
        </button>
      </header>
      <StudentManager />
    </div>
  )
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  )
}

export default App
