import Navbar from '@components/navbar/Navbar'
import Home from '@pages/Home'
import '@styles/globals.css'
import { BrowserRouter as Router } from 'react-router-dom';

function App() {

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow mt-28">
          <Home />
        </main>
      </div>
    </Router>
  )
}

export default App
