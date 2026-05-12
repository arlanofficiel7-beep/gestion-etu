import { useState } from 'react'
import CarteEtudiant from './CarteEtudiant'

function ListeEtudiants({ etudiants, onSupprimer, onModifier }) {
  const [recherche, setRecherche] = useState('')
  const [filtre, setFiltre] = useState('Tous')

  const filieres = ['Tous', ...new Set(etudiants.map(e => e.filiere))]

  const resultats = etudiants
    .filter(e => filtre === 'Tous' || e.filiere === filtre)
    .filter(e =>
      `${e.prenom} ${e.nom}`.toLowerCase().includes(recherche.toLowerCase())
    )

  return (
    <div className="page">
      <h2 className="page-titre">Liste des étudiants</h2>

      <div className="filtres">
        <input
          className="recherche"
          placeholder="🔍 Rechercher un étudiant..."
          value={recherche}
          onChange={e => setRecherche(e.target.value)}
        />
        <div className="filtre-btns">
          {filieres.map(f => (
            <button
              key={f}
              className={`filtre-btn ${filtre === f ? 'actif' : ''}`}
              onClick={() => setFiltre(f)}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {resultats.length === 0 ? (
        <p className="vide">Aucun étudiant trouvé.</p>
      ) : (
        <div className="grille">
          {resultats.map(e => (
            <CarteEtudiant
              key={e.id}
              etudiant={e}
              onSupprimer={onSupprimer}
              onModifier={onModifier}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default ListeEtudiants