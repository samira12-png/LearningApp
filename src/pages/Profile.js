import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

function Profile() {
  const { state, logoutUser } = useAppContext();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!loading && !state.user) {
      navigate('/login');
    }
  }, [state.user, loading, navigate]);

  const handleLogout = () => {
    if (window.confirm('Voulez-vous vous déconnecter ?')) {
      logoutUser();
      navigate('/login');
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-5 pt-5">
        <div className="spinner-border text-primary" role="status"></div>
        <p className="mt-3">Chargement du profil...</p>
      </div>
    );
  }

  if (!state.user) return null;

  const { nom, prenom, email, sexe } = state.user;

  return (
<div className="container mt-5 pt-5">
  <div className="card shadow-lg border-0 rounded-4 p-4" style={{ background: '#ffffff', maxWidth: '400px', margin: 'auto' }}>
    
    {/* Avatar */}
    <div className="text-center mb-3">
      <img 
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEKvyHTAB9RA1x7_UU_XLJD4bCyaIwA9Z-vQ&s" 
        alt="Avatar" 
        className="rounded-circle border border-3 border-primary" 
        style={{ width: '120px', height: '120px', objectFit: 'cover' }}
      />
    </div>

    {/* Titre */}
    <h2 className="text-center text-primary fw-bold mb-4">Mon Profil</h2>

    {/* Infos */}
    <ul className="list-group list-group-flush mb-4">
      <li className="list-group-item"><strong>Nom :</strong> {nom}</li>
      <li className="list-group-item"><strong>Prénom :</strong> {prenom}</li>
      <li className="list-group-item"><strong>Email :</strong> {email}</li>
      <li className="list-group-item"><strong>Sexe :</strong> {sexe}</li>
      <li className="list-group-item"><strong>Dernier score au quiz :</strong> {state.quizScore ?? 0} / 3</li>
    </ul>

    {/* Bouton */}
    <button 
      className="btn btn-primary w-100 fw-semibold"
      onClick={handleLogout}
    >
      Se déconnecter
    </button>
  </div>
</div>

  );
}

export default Profile;
