import './App.css';
import BigCommunity from './BigCommunity';
import JoinProgram from './JoinProgram';
import { Routes, Route } from 'react-router-dom';
import { NotFound } from './ErrorPage';
import { UserPage } from './UserPage';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<JoinProgram />} />
        <Route path='/community' element={<BigCommunity />} />
        <Route path='/community/:id' element={<UserPage />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
