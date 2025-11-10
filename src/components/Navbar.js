import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

function Navbar() {
  const { state, logoutUser } = useAppContext();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const handleLogout = () => {
    if (window.confirm('Êtes-vous sûr de vouloir vous déconnecter ?')) {
      logoutUser();
      navigate('/login');
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      // ✅ Corrigé : Navigue vers /?search=... pour rester sur Home
      navigate(`/?search=${encodeURIComponent(search.trim())}`);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary fixed-top shadow-sm">
      <div className="container">
        <Link className="navbar-brand fw-bold text-light" to="/">LearnSmart</Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item">
              <Link className="nav-link text-light" to="/">Home</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link text-light" to="/">Cours</Link>  
            </li>

            {state.user && (
              <li className="nav-item">
                <Link className="nav-link text-light" to="/profile">Profil</Link>
              </li>
            )}

            <li className="nav-item">
              {state.user ? (
                <button className="btn btn-link nav-link text-light" onClick={handleLogout}>
                  Déconnexion
                </button>
              ) : (
                <Link className="nav-link text-light" to="/login">Connexion</Link>
              )}
            </li>
          </ul>

          {/* 🔍 Champ de recherche */}
          <form className="d-flex ms-lg-3 mt-3 mt-lg-0" onSubmit={handleSearch}>
            <input
              className="form-control me-2 rounded-pill px-3"
              type="search"
              placeholder="Rechercher un cours..."
              aria-label="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ width: '220px' }}
            />
            <button className="btn btn-light rounded-pill px-3 fw-semibold" type="submit">
              <i className="fas fa-search text-primary"></i>
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;