import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './components/header';
import Router from './components/route';
// Chatbot 컴포넌트 임포트
import Chatbot from './components/Chatbot';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Chatbot />
        <Header />
        
        {/* 원하는 위치에 Chatbot 추가 */}

          
        <Routes>
          {Router.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
