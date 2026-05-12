import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Dashboard from './components/Dashboard'
import ListeEtudiants from './components/ListeEtudiants'
import FormulaireEtudiant from './components/FormulaireEtudiant'
import Stats from './components/Stats'
import GestionFilieres from './components/GestionFilieres'
import './App.css'

const DATA_INITIALE = [
  { id: 1, nom: 'Obame', prenom: 'Jean', filiere: 'Informatique', note: 16, statut: 'Admis' },
  { id: 2, nom: 'Nguema', prenom: 'Marie', filiere: 'Gestion', note: 12, statut: 'Admis' },
  { id: 3, nom: 'Mba', prenom: 'Paul', filiere: 'Droit', note: 8, statut: 'Ajourné' },
  { id: 4, nom: 'Ella', prenom: 'Sophie', filiere: 'Informatique', note: 18, statut: 'Admis' },
  { id: 5, nom: 'Nze', prenom: 'Thomas', filiere: 'Médecine', note: 14, statut: 'Admis' },
]

const FILIERES_INITIALES = ['Informatique', 'Gestion', 'Droit', 'Médecine', 'Lettres']

function App() {
  const [page, setPage] = useState('dashboard')
  const [etudiants, setEtudiants] = useState([])
  const [filieres, setFilieres] = useState(FILIERES_INITIALES)
  const [loading, setLoading] = useState(true)
  const [pageLoading, setPageLoading] = useState(false) // 👈 NOUVEAU
  const [darkMode, setDarkMode] = useState(false)
  const [etudiantAModifier, setEtudiantAModifier] = useState(null)

  useEffect(() => {
    setTimeout(() => {
      setEtudiants(DATA_INITIALE)
      setLoading(false)
    }, 1200)
  }, [])

  // 👇 NOUVEAU : changer de page avec un loader
  const changerPage = (nouvellePage) => {
    setPageLoading(true)
    setTimeout(() => {
      setPage(nouvellePage)
      setPageLoading(false)
    }, 600)
  }

  const ajouterEtudiant = (etudiant) => {
    const nouvel = { ...etudiant, id: Date.now() }
    setEtudiants(prev => [...prev, nouvel])
  }

  const supprimerEtudiant = (id) => {
    setEtudiants(prev => prev.filter(e => e.id !== id))
  }

  const modifierEtudiant = (etudiantModifie) => {
    setEtudiants(prev =>
      prev.map(e => e.id === etudiantModifie.id ? etudiantModifie : e)
    )
    setEtudiantAModifier(null)
  }

  const ouvrirModification = (etudiant) => {
    setEtudiantAModifier(etudiant)
    changerPage('ajouter') // 👈 utilise changerPage
  }

  const ajouterFiliere = (nom) => {
    if (!filieres.includes(nom)) setFilieres(prev => [...prev, nom])
  }

  const supprimerFiliere = (nom) => {
    setFilieres(prev => prev.filter(f => f !== nom))
    setEtudiants(prev =>
      prev.map(e => e.filiere === nom ? { ...e, filiere: '—' } : e)
    )
  }

  const modifierFiliere = (ancien, nouveau) => {
    setFilieres(prev => prev.map(f => f === ancien ? nouveau : f))
    setEtudiants(prev =>
      prev.map(e => e.filiere === ancien ? { ...e, filiere: nouveau } : e)
    )
  }

  const renderPage = () => {
    
    if (loading || pageLoading) return (
      <div className="loader-container">
        <div className="loader-spinner"></div>
        <p className="loader-texte">Chargement...</p>
      </div>
    )

    switch (page) {
      case 'dashboard': return <Dashboard etudiants={etudiants} />
      case 'liste':     return (
        <ListeEtudiants
          etudiants={etudiants}
          onSupprimer={supprimerEtudiant}
          onModifier={ouvrirModification}
        />
      )
      case 'ajouter':   return (
        <FormulaireEtudiant
          onAjouter={ajouterEtudiant}
          onModifier={modifierEtudiant}
          etudiantAModifier={etudiantAModifier}
          setEtudiantAModifier={setEtudiantAModifier}
          filieres={filieres}
          setPage={changerPage} // 👈 utilise changerPage
        />
      )
      case 'filieres':  return (
        <GestionFilieres
          filieres={filieres}
          onAjouter={ajouterFiliere}
          onSupprimer={supprimerFiliere}
          onModifier={modifierFiliere}
        />
      )
      case 'stats':     return <Stats etudiants={etudiants} />
      default:          return <Dashboard etudiants={etudiants} />
    }
  }

  return (
    <div className={`app ${darkMode ? 'dark' : ''}`}>
      <Navbar
        page={page}
        setPage={changerPage} // 👈 utilise changerPage
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />
      <main className="main">{renderPage()}</main>
      <footer className="footer">© 2025 GestionEtu — Application React</footer>
    </div>
  )
}

export default App