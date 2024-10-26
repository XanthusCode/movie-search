
import './App.css'; // Importa el archivo CSS
import { Link, useLocation } from 'react-router-dom';


const Navbar = () => {
  const location = useLocation();
  const active = location.pathname;

  return (
    <div className="navbar">
      {/* Navigation Links */}
      <div className="nav-links">
        <ul className="link-list">
          <li>
            <Link to="/" className={`link ${active === '/' ? 'active' : ''}`}>
              Inicio
            </Link>
          </li>
          <li>
            <Link to="/favoritos" className={`link ${active === '/favoritos' ? 'active' : ''}`}>
              Favoritos
            </Link>
          </li>
          
        </ul>

      </div>
    </div>
  );
};

export default Navbar;
