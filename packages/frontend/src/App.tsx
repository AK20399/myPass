import { Routes, Route } from 'react-router-dom';
import { HomePage, Login, Signup } from './Pages/index';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/home" element={<HomePage />} />
    </Routes>
  );
};
export default App;
