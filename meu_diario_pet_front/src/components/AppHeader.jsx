import { NavLink, useLocation } from "react-router-dom";

const links = [
  { to: "/", label: "Inicio" },
  { to: "/pets", label: "Pets" },
  { to: "/cuidados", label: "Guia de Cuidados" },
];

function AppHeader() {
  const location = useLocation();

  return (
    <header className="topbar">
      <div>
        <p className="eyebrow">Projeto MVP • Front-end Avancado</p>
        <h1 className="brand">Meu Diario Pet</h1>
      </div>

      <nav aria-label="Navegacao principal" className="topnav">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              isActive ? "nav-item nav-item-active" : "nav-item"
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>

      <p className="path-indicator">Rota atual: {location.pathname}</p>
    </header>
  );
}

export default AppHeader;
