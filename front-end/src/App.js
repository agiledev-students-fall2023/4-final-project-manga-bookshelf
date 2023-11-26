import './App.css'
import { AppRoutes } from './routes/index';
import { BrowserRouter } from 'react-router-dom';
import { useAuth } from "./hook/useAuth.js" 
import { AuthContext } from './context/AuthContext';

function App() {
  const auth = useAuth()

  return (
    <AuthContext.Provider value={auth}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthContext.Provider>
  )
}

export default App