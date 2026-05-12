function Dashboard({ etudiants }) {
  const total   = etudiants.length
  const admis   = etudiants.filter(e => e.statut === 'Admis').length
  const ajourne = etudiants.filter(e => e.statut === 'Ajourné').length
  const moyenne = total > 0
    ? (etudiants.reduce((s, e) => s + e.note, 0) / total).toFixed(1)
    : 0

  return (
    <div className="page">
      <h2 className="page-titre">Tableau de bord</h2>

      <div className="kpi-grid">
        <div className="kpi kpi-blue">
          <span className="kpi-val">{total}</span>
          <span className="kpi-label">Total étudiants</span>
        </div>
        <div className="kpi kpi-green">
          <span className="kpi-val">{admis}</span>
          <span className="kpi-label">Admis</span>
        </div>
        <div className="kpi kpi-red">
          <span className="kpi-val">{ajourne}</span>
          <span className="kpi-label">Ajournés</span>
        </div>
        <div className="kpi kpi-yellow">
          <span className="kpi-val">{moyenne}/20</span>
          <span className="kpi-label">Moyenne générale</span>
        </div>
      </div>

      <div className="welcome">
        <h3>Bienvenue sur GestionEtu 👋</h3>
        <p>Gérez vos étudiants, suivez leurs résultats et consultez les statistiques de votre promotion.</p>
      </div>
    </div>
  )
}

export default Dashboard