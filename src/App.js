import {Routes, Route} from 'react-router-dom';
import Signup from './views/auth/Signup';
import Login from './views/auth/Login';
import Overview from './views/Overview';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Overview />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
