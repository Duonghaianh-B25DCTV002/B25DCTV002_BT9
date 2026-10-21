import { useState, useContext } from 'react'
import useFetch from '../hooks/useFetch'
import { ThemeContext } from '../context/ThemeContext'

const API_URL = 'https://6ad8bd6df89c5702ed9a1579.mockapi.io/sinhvien'

function StudentManager() {
  const { theme } = useContext(ThemeContext)
  const { data: students, loading, error, refetch } = useFetch(API_URL)
  const [name, setName] = useState('')
  const [mssv, setMssv] = useState('')
  const [gpa, setGpa] = useState('')
  const [search, setSearch] = useState('')
  const [formError, setFormError] = useState('')

  const handleAdd = (e) => {
    e.preventDefault()
    if (!name.trim() || !mssv.trim()) {
      setFormError('Vui long nhap day du thong tin')
      return
    }
    const gpaNum = parseFloat(gpa)
    if (isNaN(gpaNum) || gpaNum < 0 || gpaNum > 4) {
      setFormError('GPA phai tu 0 den 4')
      return
    }
    setFormError('')
    fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, mssv, gpa: gpaNum })
    }).then(() => {
      setName('')
      setMssv('')
      setGpa('')
      refetch()
    })
  }

  const handleDelete = (id) => {
    if (window.confirm('Ban co chac muon xoa sinh vien nay?')) {
      fetch(`${API_URL}/${id}`, { method: 'DELETE' }).then(() => refetch())
    }
  }

  if (loading) return <p className="status">Dang tai du lieu...</p>
  if (error) return <p className="status error">Loi: {error}</p>

  const filtered = students.filter(sv =>
    sv.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <h2>Danh sach Sinh vien</h2>

      <input
        className="search-input"
        type="text"
        placeholder="Tim kiem theo ten..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      <form className="form" onSubmit={handleAdd}>
        <input
          placeholder="Ho ten"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <input
          placeholder="MSSV"
          value={mssv}
          onChange={e => setMssv(e.target.value)}
        />
        <input
          placeholder="GPA (0-4)"
          value={gpa}
          onChange={e => setGpa(e.target.value)}
        />
        <button type="submit">Them</button>
      </form>
      {formError && <p className="form-error">{formError}</p>}

      <table>
        <thead>
          <tr>
            <th>Ho ten</th>
            <th>MSSV</th>
            <th>GPA</th>
            <th>Hanh dong</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map(sv => (
            <tr key={sv.id}>
              <td>{sv.name}</td>
              <td>{sv.mssv}</td>
              <td>{sv.gpa}</td>
              <td>
                <button className="btn-delete" onClick={() => handleDelete(sv.id)}>
                  Xoa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {filtered.length === 0 && <p className="status">Khong tim thay sinh vien nao</p>}
    </div>
  )
}

export default StudentManager
