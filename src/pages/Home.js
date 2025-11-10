import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { courses as coursesData } from '../data/courses.js';
import CardCourse from '../components/CardCourse';

function Home() {
  const { state, setCourses } = useAppContext();

  useEffect(() => {
    if (state.courses.length === 0) {
      setCourses(coursesData);
    }
  }, [state.courses, setCourses]);

  // ✅ Gestion du paramètre de recherche dans l’URL (ex: /?search=python)
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchTerm = queryParams.get("search")?.toLowerCase() || "";

  // ✅ Filtrage des cours selon la recherche (utilise state.courses au lieu de coursesData)
  const filteredCourses = state.courses.filter((c) =>
    c.title.toLowerCase().includes(searchTerm)
  );

  return (
    <div className="container mt-5 pt-5">
      {/* Section Hero */}
      <section id="hero" className="hero text-center my-5">
        <div>
          <h1>LearnSmart</h1>
          <p>Apprenez de nouvelles compétences avec nos cours en ligne interactifs</p>
          <Link to="/?search=" className="btn btn-primary btn-lg mt-3">Explorer les Cours</Link>
          <a href="#promotions" className="btn btn-outline-secondary btn-lg mt-3 ms-2">Voir les Promotions</a>
        </div>
      </section>

      {/* Section des cours */}
      <section id="courses" className="my-5">
        <h1 className="text-center mb-4">Découvrez nos cours</h1>

        <div className="row">
          {filteredCourses.length > 0 ? (
            filteredCourses.map((course) => (
              <div key={course.id} className="col-md-4 mb-4">
                <CardCourse course={course} />
              </div>
            ))
          ) : (
            <p className="text-center text-muted mt-5">
              Aucun cours ne correspond à votre recherche.
            </p>
          )}
        </div>
      </section>

      {/* Section Témoignages */}
      <section id="testimonials" className="testimonials-section py-5">
        <div className="container">
          <h2 className="text-center mb-4 text-primary">
            Ce que disent nos anciens élèves sur LearnSmart
          </h2>
          <div className="row">
            <div className="col-md-4 mb-4">
              <div className="card testimonial-card shadow-sm">
                <div className="card-body">
                  <p className="card-text">
                    "LearnSmart m'a permis d'apprendre HTML et CSS en quelques semaines. Les cours sont clairs et les quiz m'ont aidé à retenir les concepts !"
                  </p>
                  <footer className="blockquote-footer">Marie D., Développeuse Web</footer>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card testimonial-card shadow-sm">
                <div className="card-body">
                  <p className="card-text">
                    "Le cours JavaScript était interactif et pratique. J'ai pu appliquer ce que j'ai appris directement dans mes projets."
                  </p>
                  <footer className="blockquote-footer">Jean L., Étudiant en Informatique</footer>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card testimonial-card shadow-sm">
                <div className="card-body">
                  <p className="card-text">
                    "React Moderne est top ! Les explications sont simples et les exercices m'ont boosté pour mon portfolio."
                  </p>
                  <footer className="blockquote-footer">Sophie T., Freelance</footer>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section FAQ */}
      <section id="faq" className="faq-section py-5 bg-light">
        <div className="container">
          <h2 className="text-center mb-4 text-primary">Questions Fréquemment Posées</h2>
          <div className="accordion" id="faqAccordion">
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingOne">
                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne">
                  Comment accéder aux cours ?
                </button>
              </h2>
              <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#faqAccordion">
                <div className="accordion-body">
                  Inscrivez-vous gratuitement et accédez à tous les cours depuis votre tableau de bord.
                </div>
              </div>
            </div>

            <div className="accordion-item">
              <h2 className="accordion-header" id="headingTwo">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo">
                  Les cours sont-ils payants ?
                </button>
              </h2>
              <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                <div className="accordion-body">
                  Les cours de base sont gratuits. Des options premium sont disponibles pour des contenus avancés.
                </div>
              </div>
            </div>

            <div className="accordion-item">
              <h2 className="accordion-header" id="headingThree">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree">
                  Puis-je suivre les cours sur mobile ?
                </button>
              </h2>
              <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                <div className="accordion-body">
                  Oui, notre plateforme est entièrement responsive et fonctionne sur tous les appareils.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Contact */}
      <section id="contact" className="contact-section py-5">
        <div className="container">
          <h2 className="text-center mb-4 text-primary">Contactez-nous</h2>
          <div className="row justify-content-center">
            <div className="col-md-6">
              <form>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Nom</label>
                  <input type="text" className="form-control" id="name" placeholder="Votre nom" required />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input type="email" className="form-control" id="email" placeholder="votre.email@example.com" required />
                </div>
                <div className="mb-3">
                  <label htmlFor="message" className="form-label">Message</label>
                  <textarea className="form-control" id="message" rows="4" placeholder="Votre message..." required></textarea>
                </div>
                <button type="submit" className="btn btn-primary w-100">Envoyer</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer retiré d'ici, car il est maintenant global dans App.jsx */}
    </div>
  );
}

export default Home;