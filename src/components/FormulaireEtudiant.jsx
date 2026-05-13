import { useState, useEffect } from 'react'
import emailjs from '@emailjs/browser'
import { EMAILJS_CONFIG } from '../emailjs'

function FormulaireEtudiant({ onAjouter, onModifier, etudiantAModifier, setEtudiantAModifier, filieres, setPage }) {
  const [form, setForm] = useState({
    nom: '', prenom: '', filiere: '', note: '', statut: 'Admis'
  })
  const [erreur, setErreur] = useState('')
  const [succes, setSucces] = useState(false)
  const [envoi, setEnvoi] = useState(false)

  useEffect(() => {
    if (etudiantAModifier) {
      setForm(etudiantAModifier)
    } else {
      setForm({ nom: '', prenom: '', filiere: '', note: '', statut: 'Admis' })
    }
  }, [etudiantAModifier])

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const envoyerEmail = async (etudiant) => {
    // 📧 Email à toi
    await emailjs.send(
      EMAILJS_CONFIG.SERVICE_ID,
      EMAILJS_CONFIG.TEMPLATE_ID,
      {
        prenom:       etudiant.prenom,
        nom:          etudiant.nom,
        filiere:      etudiant.filiere,
        note:         etudiant.note,
        statut:       etudiant.statut,
        destinataire: EMAILJS_CONFIG.DESTINATAIRE,
      },
      EMAILJS_CONFIG.PUBLIC_KEY
    )

    // 📧 Email au prof
    await emailjs.send(
      EMAILJS_CONFIG.SERVICE_ID,
      EMAILJS_CONFIG.TEMPLATE_ID2,
      {
        prenom:       etudiant.prenom,
        nom:          etudiant.nom,
        filiere:      etudiant.filiere,
        note:         etudiant.note,
        statut:       etudiant.statut,
        destinataire: EMAILJS_CONFIG.DESTINATAIRE2,
      },
      EMAILJS_CONFIG.PUBLIC_KEY
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.nom || !form.prenom || !form.filiere || !form.note) {
      setErreur('⚠️ Veuillez remplir tous les champs.')
      return
    }
    if (form.note < 0 || form.note > 20) {
      setErreur('⚠️ La note doit être entre 0 et 20.')
      return
    }

    setEnvoi(true)
    setErreur('')

    try {
      const etudiant = { ...form, note: Number(form.note) }

      if (etudiantAModifier) {
        await onModifier(etudiant)
      } else {
        await onAjouter(etudiant)
        await envoyerEmail(etudiant) // 📧 Emails seulement à l'ajout
      }

      setSucces(true)
      setForm({ nom: '', prenom: '', filiere: '', note: '', statut: 'Admis' })
      setTimeout(() => {
        setSucces(false)
        setEtudiantAModifier(null)
        setPage('liste')
      }, 1500)

    } catch (err) {
      setErreur('❌ Une erreur est survenue. Réessayez.')
    } finally {
      setEnvoi(false)
    }
  }

  const annulerModification = () => {
    setEtudiantAModifier(null)
    setForm({ nom: '', prenom: '', filiere: '', note: '', statut: 'Admis' })
    setPage('liste')
  }

  return (
    <div className="page">
      <h2 className="page-titre">
        {etudiantAModifier ? '✏️ Modifier un étudiant' : '➕ Ajouter un étudiant'}
      </h2>

      {erreur && <p className="msg-erreur">{erreur}</p>}
      {succes && (
        <p className="msg-succes">
          {etudiantAModifier ? '✅ Étudiant modifié !' : '✅ Étudiant ajouté et emails envoyés !'} Redirection...
        </p>
      )}

      <form className="formulaire" onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label>Nom</label>
            <input name="nom" value={form.nom} onChange={handleChange} placeholder="Ex: Obame" />
          </div>
          <div className="form-group">
            <label>Prénom</label>
            <input name="prenom" value={form.prenom} onChange={handleChange} placeholder="Ex: Jean" />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Filière</label>
            <select name="filiere" value={form.filiere} onChange={handleChange}>
              <option value="">-- Choisir --</option>
              {filieres.map(f => (
                <option key={f.id} value={f.nom}>{f.nom}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Note /20</label>
            <input name="note" type="number" min="0" max="20" value={form.note} onChange={handleChange} placeholder="Ex: 14" />
          </div>
        </div>

        <div className="form-group">
          <label>Statut</label>
          <select name="statut" value={form.statut} onChange={handleChange}>
            <option>Admis</option>
            <option>Ajourné</option>
          </select>
        </div>

        <div className="form-btns">
          <button type="submit" className="btn-submit" disabled={envoi}>
            {envoi ? '⏳ En cours...' : etudiantAModifier ? '💾 Enregistrer' : '➕ Ajouter'}
          </button>
          {etudiantAModifier && (
            <button type="button" className="btn-annuler" onClick={annulerModification}>
              ✖️ Annuler
            </button>
          )}
        </div>
      </form>
    </div>
  )
}

export default FormulaireEtudiant