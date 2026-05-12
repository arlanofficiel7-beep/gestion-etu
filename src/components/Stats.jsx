function Stats({ etudiants }) {
  const total   = etudiants.length
  const admis   = etudiants.filter(e => e.statut === 'Admis').length
  const tauxRec = total > 0 ? ((admis / total) * 100).toFixed(0) : 0

  const parFiliere = etudiants.reduce((acc, e) => {
    acc[e.filiere] = (acc[e.filiere] || 0) + 1
    return acc
  }, {})

  const meilleur = etudiants.length > 0
    ? etudiants.reduce((a, b) => a.note > b.note ? a : b)
    : null

  return (
    <div className="page">
      <h2 className="page-titre">Statistiques</h2>

      <div className="stats-grid">
        <div className="stat-card">
          <h4>🏆 Meilleur étudiant</h4>
          {meilleur
            ? <p>{meilleur.prenom} {meilleur.nom} — <strong>{meilleur.note}/20</strong></p>
            : <p>Aucun étudiant</p>
          }
        </div>

        <div className="stat-card">
          <h4>📈 Taux de réussite</h4>
          <div className="barre-container">
            <div className="barre" style={{ width: `${tauxRec}%` }}></div>
          </div>
          <p>{tauxRec}% d'admis</p>
        </div>

        <div className="stat-card">
          <h4>🎓 Étudiants par filière</h4>
          {Object.entries(parFiliere).map(([filiere, nb]) => (
            <div key={filiere} className="filiere-ligne">
              <span>{filiere}</span>
              <span className="badge badge-vert">{nb}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Stats