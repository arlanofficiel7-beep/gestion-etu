function Navbar({ page, setPage, darkMode, setDarkMode }) {
  const liens = [
    { id: 'dashboard', label: '🏠 Tableau de bord' },
    { id: 'liste',     label: '👨‍🎓 Étudiants' },
    { id: 'ajouter',   label: '➕ Ajouter' },
    { id: 'filieres',  label: '🗂️ Filières' },
    { id: 'stats',     label: '📊 Statistiques' },
  ]

  return (
    <nav className="navbar">
      <div className="logo">🎓 GestionEtu</div>
      <ul className="nav-links">
        {liens.map(l => (
          <li
            key={l.id}
            className={page === l.id ? 'active' : ''}
            onClick={() => setPage(l.id)}
          >
            {l.label}
          </li>
        ))}
      </ul>
      <button className="toggle-theme" onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? '☀️ Clair' : '🌙 Sombre'}
      </button>
    </nav>
  )
}

export default Navbar