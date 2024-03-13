import './App.css';
import LoginForm from './Components/LoginForm/LoginForm';
import SignUp from './Components/SignUpForm/SignUpForm';
import { useUserContext , UserProvider } from './ContextApi/UserContext';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import DashBoard from './Components/DashBoard/DashBoard';
import  PrivateRoute  from './Components/PrivateRoute/PrivateRoute';

function App() {
  return (
    <div className="App">
      <Router>
        <UserProvider>
          <Routes>
            
            <Route path="/login" element={<LoginForm />} />
            
            <Route path="/signup" element={<SignUp />} />
            <Route path="/dashboard" element={
                <PrivateRoute>
                  <DashBoard />
                </PrivateRoute>
						}/>
            {/* <Route element={<PrivateRoute />}>
                <Route path="/dashboard" element={<DashBoard/>} />
            </Route> */}
          </Routes>
        </UserProvider>
      </Router>
    </div>
  );
}

export default App;
