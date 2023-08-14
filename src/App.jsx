import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Login } from './pages/Login';
import { Profile } from './pages/Profile';
import { Register } from './pages/Register';
import { Home } from './pages/Home';
import { Navbar } from './components/Navbar';
import { store } from './store';
import { Provider } from 'react-redux';
import './App.css';
import { ChangeProfil } from './components/ChangeProfil';
import { User } from './pages/User';

function App() {

  return (
   <>
    <Provider store={store}>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='login' element={<Login />}/>
          <Route path='register' element={<Register />}/>
          <Route path='profile' element={<Profile />}>
            <Route path ='changeprofile' element={<ChangeProfil/>} />
          </Route>
          <Route path='user/[user]' element={<User />}/>
        </Routes>
      </Router>
    </Provider>
   </>
  )
}

export default App
