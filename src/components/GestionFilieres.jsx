import { useState } from 'react'

function GestionFilieres({ filieres, onAjouter, onSupprimer, onModifier }) {
  const [nouvelle, setNouvelle] = useState('')
  const [erreur, setErreur] = useState('')
  const [filiereEnEdition, setFiliereEnEdition] = useState(null)
  const [valeurEdition, setValeurEdition] = useState('')

  const handleAjouter = () => {
    if (!nouvelle.trim()) {
      setErreur('⚠️ Le nom ne peut pas être vide.')
      return
    }
    if (filieres.includes(nouvelle.trim())) {
      setErreur('⚠️ Cette filière existe déjà.')
      return
    }
    onAjouter(nouvelle.trim())
    setNouvelle('')
    setErreur('')
  }

  const handleModifier = (ancien) => {
    if (!valeurEdition.trim()) return
    if (valeurEdition.trim() === ancien) {
      setFiliereEnEdition(null)
      return
    }
    if (filieres.includes(valeurEdition.trim())) {
      setErreur('⚠️ Cette filière existe déjà.')
      return
    }
    onModifier(ancien, valeurEdition.trim())
    setFiliereEnEdition(null)
    setValeurEdition('')
    setErreur('')
  }

  const ouvrirEdition = (filiere) => {
    setFiliereEnEdition(filiere)
    setValeurEdition(filiere)
    setErreur('')
  }

  return (
    <div className="page">
      <h2 className="page-titre">🗂️ Gestion des filières</h2>

      {/* Formulaire d'ajout */}
      <div className="filiere-form">
        <h3>Ajouter une filière</h3>
        {erreur && <p className="msg-erreur">{erreur}</p>}
        <div className="filiere-input-row">
          <input
            className="recherche"
            placeholder="Nom de la nouvelle filière..."
            value={nouvelle}
            onChange={e => setNouvelle(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleAjouter()}
          />
          <button className="btn-submit btn-inline" onClick={handleAjouter}>
            ➕ Ajouter
          </button>
        </div>
      </div>

      {/* Liste des filières */}
      <div className="filiere-liste">
        <h3>Filières existantes ({filieres.length})</h3>
        {filieres.length === 0 ? (
          <p className="vide">Aucune filière enregistrée.</p>
        ) : (
          filieres.map(f => (
            <div key={f} className="filiere-item">
              {filiereEnEdition === f ? (
                // Mode édition
                <div className="filiere-edit-row">
                  <input
                    className="recherche"
                    value={valeurEdition}
                    onChange={e => setValeurEdition(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleModifier(f)}
                    autoFocus
                  />
                  <button className="btn-submit btn-inline" onClick={() => handleModifier(f)}>
                    💾 Sauvegarder
                  </button>
                  <button className="btn-annuler" onClick={() => setFiliereEnEdition(null)}>
                    ✖️ Annuler
                  </button>
                </div>
              ) : (
                // Mode affichage
                <div className="filiere-affichage">
                  <span className="filiere-nom">🎓 {f}</span>
                  <div className="filiere-actions">
                    <button className="btn-modifier" onClick={() => ouvrirEdition(f)}>
                      ✏️ Modifier
                    </button>
                    <button className="btn-supprimer" onClick={() => onSupprimer(f)}>
                      🗑️ Supprimer
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default GestionFilieres