import { useParams, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

function CourseDetail() {
  const { id } = useParams();
  const { state } = useAppContext();
  const navigate = useNavigate();
  const course = state.courses.find(c => c.id === Number(id));

  if (!course) {
    return <div className="container mt-5 pt-5 text-center">Cours non trouvé</div>;
  }

  return (
<div className="container mt-5 pt-5">
  <div className="card shadow-lg border-0 rounded-4 p-4" style={{ maxWidth: '900px', margin: 'auto', background: '#ffffff' }}>
    <div className="row g-0 align-items-center">
      
      {/* Image du cours */}
      <div className="col-md-5 text-center">
        <img 
          src={course.image} 
          className="img-fluid rounded-start mb-3 mb-md-0" 
          alt={course.title} 
          style={{ maxHeight: '250px', objectFit: 'cover' }}
        />
      </div>

      {/* Contenu du cours */}
      <div className="col-md-7">
        <div className="card-body">
          <h2 className="card-title text-primary fw-bold">{course.title}</h2>
          <p className="card-text text-muted">{course.desc}</p>
          <p className="mb-1"><strong>Durée:</strong> {course.duration}</p>
          <p className="mb-3"><strong>Niveau:</strong> {course.level}</p>
          <button 
            className="btn btn-gradient w-100 fw-semibold"
            style={{ background: 'linear-gradient(90deg, #6a11cb, #2575fc)', color: 'white', border: 'none' }}
            onClick={() => navigate(`/quiz/${id}`)}
          >
            Commencer le Quiz
          </button>
        </div>
      </div>

    </div>
  </div>
</div>

  );
}

export default CourseDetail;
