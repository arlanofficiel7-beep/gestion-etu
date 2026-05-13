import { useState, useEffect } from 'react'
import { collection, onSnapshot, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore'
import { db } from './firebase'
import Navbar from './components/Navbar'
import Dashboard from './components/Dashboard'
import ListeEtudiants from './components/ListeEtudiants'
import FormulaireEtudiant from './components/FormulaireEtudiant'
import Stats from './components/Stats'
import GestionFilieres from './components/GestionFilieres'
import './App.css'

const FILIERES_INITIALES = ['Informatique', 'Gestion', 'Droit', 'Médecine', 'Lettres']

function App() {
  const [page, setPage] = useState('dashboard')
  const [etudiants, setEtudiants] = useState([])
  const [filieres, setFilieres] = useState(FILIERES_INITIALES)
  const [loading, setLoading] = useState(true)
  const [pageLoading, setPageLoading] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const [etudiantAModifier, setEtudiantAModifier] = useState(null)

  // 🔥 Écoute en temps réel la collection "etudiants" dans Firestore
  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'etudiants'), (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      setEtudiants(data)
      setLoading(false)
    })
    return () => unsub() // nettoyage à la destruction du composant
  }, [])

  // 🔥 Écoute en temps réel la collection "filieres" dans Firestore
  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'filieres'), (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, nom: doc.data().nom }))
      setFilieres(data)
    })
    return () => unsub()
  }, [])

  const changerPage = (nouvellePage) => {
    setPageLoading(true)
    setTimeout(() => {
      setPage(nouvellePage)
      setPageLoading(false)
    }, 600)
  }

  // 🔥 Ajouter dans Firestore
  const ajouterEtudiant = async (etudiant) => {
    await addDoc(collection(db, 'etudiants'), etudiant)
  }

  // 🔥 Supprimer dans Firestore
  const supprimerEtudiant = async (id) => {
    await deleteDoc(doc(db, 'etudiants', id))
  }

  // 🔥 Modifier dans Firestore
  const modifierEtudiant = async (etudiantModifie) => {
    const { id, ...data } = etudiantModifie
    await updateDoc(doc(db, 'etudiants', id), data)
    setEtudiantAModifier(null)
  }

  const ouvrirModification = (etudiant) => {
    setEtudiantAModifier(etudiant)
    changerPage('ajouter')
  }

  // 🔥 Filières dans Firestore
  const ajouterFiliere = async (nom) => {
    const existe = filieres.find(f => f.nom === nom)
    if (!existe) await addDoc(collection(db, 'filieres'), { nom })
  }

  const supprimerFiliere = async (filiere) => {
    await deleteDoc(doc(db, 'filieres', filiere.id))
  }

  const modifierFiliere = async (filiere, nouveauNom) => {
    await updateDoc(doc(db, 'filieres', filiere.id), { nom: nouveauNom })
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
          setPage={changerPage}
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
      <Navbar page={page} setPage={changerPage} darkMode={darkMode} setDarkMode={setDarkMode} />
      <main className="main">{renderPage()}</main>
      <footer className="footer">© 2025 GestionEtu — Application React</footer>
    </div>
  )
}

export default App