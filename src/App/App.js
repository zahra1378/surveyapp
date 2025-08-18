import './App.css';
import { Routes, Route } from 'react-router-dom'; 
import MainLayout from '../components/layout/MainLayout/MainLayout';
import {
  QuestionPage,
  ThankYouPage,
  WelcomePage
} from '../pages';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<MainLayout />}>
          <Route index element={<WelcomePage />} />
          <Route path='questions/:id' element={<QuestionPage />} />
          <Route path='thankyou' element={<ThankYouPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
