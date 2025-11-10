import { useNavigate } from 'react-router-dom';

function CardCourse({ course }) {
  const navigate = useNavigate();

  return (
    <div className="card h-100">
      <img src={course.image} className="card-img-top" alt={course.title} />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{course.title}</h5>
        <p className="card-text flex-grow-1">{course.desc}</p>
        <p><strong>Durée:</strong> {course.duration}</p>
        <p><strong>Niveau:</strong> {course.level}</p>
        <button className="btn btn-primary mt-auto" onClick={() => navigate(`/course/${course.id}`)}>Voir plus</button>
      </div>
    </div>
  );
}

export default CardCourse;