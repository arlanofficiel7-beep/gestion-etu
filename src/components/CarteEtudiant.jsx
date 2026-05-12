function CarteEtudiant({ etudiant, onSupprimer, onModifier }) {
  const couleurNote = etudiant.note >= 10 ? '#22c55e' : '#ef4444'

  return (
    <div className="carte">
      <div className="carte-header">
        <div className="avatar">{etudiant.prenom[0]}{etudiant.nom[0]}</div>
        <div>
          <h3>{etudiant.prenom} {etudiant.nom}</h3>
          <p className="filiere">{etudiant.filiere}</p>
        </div>
      </div>
      <div className="carte-body">
        <span className="note" style={{ color: couleurNote }}>
          {etudiant.note}/20
        </span>
        <span className={`badge ${etudiant.statut === 'Admis' ? 'badge-vert' : 'badge-rouge'}`}>
          {etudiant.statut}
        </span>
      </div>
      <div className="carte-actions">
        <button className="btn-modifier" onClick={() => onModifier(etudiant)}>
          ✏️ Modifier
        </button>
        <button className="btn-supprimer" onClick={() => onSupprimer(etudiant.id)}>
          🗑️ Supprimer
        </button>
      </div>
    </div>
  )
}

export default CarteEtudiant