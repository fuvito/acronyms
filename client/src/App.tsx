import { useState, useEffect } from 'react'
import './App.css'
import AcronymList from './components/AcronymList'
import AcronymSearch from './components/AcronymSearch'
import AcronymForm from './components/AcronymForm'
import type {Acronym} from './types/acronym'
import { acronymService } from './services/acronymService'

function App() {
  const [acronyms, setAcronyms] = useState<Acronym[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const fetchAcronyms = async () => {
    try {
      setLoading(true)
      const data = await acronymService.getAll()
      setAcronyms(data)
      setError(null)
    } catch (err) {
      setError('Error fetching acronyms. Please try again.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAcronyms()
  }, [])

  const handleSearch = async (query: string, type: 'acronym' | 'definition') => {
    try {
      setLoading(true)
      let data: Acronym[]

      if (type === 'acronym') {
        data = await acronymService.searchByAcronym(query)
      } else {
        data = await acronymService.searchByDefinition(query)
      }

      setAcronyms(data)
      setError(null)
    } catch (err) {
      setError('Search failed. Please try again.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleAddAcronym = async (newAcronym: Omit<Acronym, 'id'>) => {
    try {
      setLoading(true)
      await acronymService.create(newAcronym)

      fetchAcronyms()
    } catch (err) {
      setError('Failed to add acronym. Please try again.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="app-container">
      <header>
        <h1>Acronyms Manager</h1>
      </header>

      <main>
        <div className="search-and-add">
          <AcronymSearch onSearch={handleSearch} />
          <AcronymForm onAddAcronym={handleAddAcronym} />
        </div>

        {error && <div className="error-message">{error}</div>}

        {loading ? (
          <div className="loading">Loading...</div>
        ) : (
          <AcronymList acronyms={acronyms} />
        )}
      </main>
    </div>
  )
}

export default App
