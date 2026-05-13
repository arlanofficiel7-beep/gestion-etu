import { useState } from 'react'

function GestionFilieres({ filieres, onAjouter, onSupprimer, onModifier }) {
  const [nouvelle, setNouvelle] = useState('')
  const [erreur, setErreur] = useState('')
  const [filiereEnEdition, setFiliereEnEdition] = useState(null)
  const [valeurEdition, setValeurEdition] = useState('')

  const handleAjouter = async () => {
    if (!nouvelle.trim()) {
      setErreur('⚠️ Le nom ne peut pas être vide.')
      return
    }
    if (filieres.find(f => f.nom === nouvelle.trim())) {
      setErreur('⚠️ Cette filière existe déjà.')
      return
    }
    await onAjouter(nouvelle.trim())
    setNouvelle('')
    setErreur('')
  }

  const handleModifier = async (filiere) => {
    if (!valeurEdition.trim() || valeurEdition.trim() === filiere.nom) {
      setFiliereEnEdition(null)
      return
    }
    if (filieres.find(f => f.nom === valeurEdition.trim())) {
      setErreur('⚠️ Cette filière existe déjà.')
      return
    }
    await onModifier(filiere, valeurEdition.trim())
    setFiliereEnEdition(null)
    setValeurEdition('')
    setErreur('')
  }

  const ouvrirEdition = (filiere) => {
    setFiliereEnEdition(filiere.id)
    setValeurEdition(filiere.nom)
    setErreur('')
  }

  return (
    <div className="page">
      <h2 className="page-titre">🗂️ Gestion des filières</h2>

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

      <div className="filiere-liste">
        <h3>Filières existantes ({filieres.length})</h3>
        {filieres.length === 0 ? (
          <p className="vide">Aucune filière enregistrée.</p>
        ) : (
          filieres.map(f => (
            <div key={f.id} className="filiere-item">
              {filiereEnEdition === f.id ? (
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
                <div className="filiere-affichage">
                  <span className="filiere-nom">🎓 {f.nom}</span>
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