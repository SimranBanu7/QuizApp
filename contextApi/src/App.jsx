
import './App.css'
import Dashboard from './Component/childrenprop/Dashboard'
import Profile from './Component/Profile'
import UserContext from './Component/UserContext'

function App() {
 
  const username="John"

  return (
    <>
    {/* provider: providing this data to all the child components */}
      <UserContext.Provider value={username}>
        <Profile />
      </UserContext.Provider>

      <Dashboard />
    </>
  )
}

export default App
