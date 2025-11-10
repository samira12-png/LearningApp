// import { Routes, Route } from 'react-router-dom';
// import Navbar from './components/Navbar';
// import Home from './pages/Home';
// import CourseDetail from './pages/CourseDetail';
// import QuizPage from './pages/QuizPage';
// import Profile from './pages/Profile';
// import Login from './pages/Login';  // Assure-toi que c'est importé

// function App() {
//   return (
//     <div className="d-flex flex-column min-vh-100">
//       <Navbar />
//       <main className="flex-grow-1">
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/course/:id" element={<CourseDetail />} />
//           <Route path="/quiz/:id" element={<QuizPage />} />
//           <Route path="/login" element={<Login />} />  {/* Route ajoutée pour Login */}
//           <Route path="/profile" element={<Profile />} />
//         </Routes>
//       </main>
//     </div>
//   );
// }

// export default App;

import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';  // Ajouté pour un Footer global
import Home from './pages/Home';
import CourseDetail from './pages/CourseDetail';
import QuizPage from './pages/QuizPage';
import Profile from './pages/Profile';
import Login from './pages/Login';

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <main className="flex-grow-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/course/:id" element={<CourseDetail />} />
          <Route path="/quiz/:id" element={<QuizPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </main>
      <Footer />  
    </div>
  );
}

export default App;