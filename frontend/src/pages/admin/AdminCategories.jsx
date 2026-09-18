import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import api, { getErrorMessage } from '../../lib/api'
import Spinner from '../../components/Spinner'

export default function AdminCategories() {
  const { t } = useTranslation()
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [name, setName] = useState('')
  const [iconFile, setIconFile] = useState(null)
  const [iconPreview, setIconPreview] = useState(null)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const [editingId, setEditingId] = useState(null)
  const [editingName, setEditingName] = useState('')
  const [editingIconFile, setEditingIconFile] = useState(null)
  const [editingIconPreview, setEditingIconPreview] = useState(null)
  const [editingRemoveIcon, setEditingRemoveIcon] = useState(false)

  const load = () => {
    setLoading(true)
    api.get('/admin/categories').then((res) => setCategories(res.data.data)).finally(() => setLoading(false))
  }

  useEffect(() => {
    load()
  }, [])

  const handleIconChange = (e) => {
    const file = e.target.files?.[0] || null
    setIconFile(file)
    setIconPreview(file ? URL.createObjectURL(file) : null)
  }

  const handleCreate = async (e) => {
    e.preventDefault()
    setError('')
    if (!name.trim()) return
    setSaving(true)
    try {
      const formData = new FormData()
      formData.append('name', name.trim())
      if (iconFile) formData.append('icon', iconFile)
      await api.post('/admin/categories', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      setName('')
      setIconFile(null)
      setIconPreview(null)
      load()
    } catch (err) {
      setError(getErrorMessage(err))
    } finally {
      setSaving(false)
    }
  }

  const startEdit = (category) => {
    setEditingId(category.id)
    setEditingName(category.name)
    setEditingIconFile(null)
    setEditingIconPreview(null)
    setEditingRemoveIcon(false)
  }

  const handleEditingIconChange = (e) => {
    const file = e.target.files?.[0] || null
    setEditingIconFile(file)
    setEditingIconPreview(file ? URL.createObjectURL(file) : null)
    if (file) setEditingRemoveIcon(false)
  }

  const handleUpdate = async (id) => {
    setError('')
    try {
      const formData = new FormData()
      formData.append('name', editingName.trim())
      if (editingIconFile) formData.append('icon', editingIconFile)
      if (editingRemoveIcon) formData.append('remove_icon', '1')
      await api.post(`/admin/categories/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      setEditingId(null)
      setEditingIconFile(null)
      setEditingIconPreview(null)
      setEditingRemoveIcon(false)
      load()
    } catch (err) {
      setError(getErrorMessage(err))
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm(t('adminCategories.confirmDelete'))) return
    await api.delete(`/admin/categories/${id}`)
    load()
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-neutral-800">{t('productsPage.categories')}</h1>

      <form onSubmit={handleCreate} className="flex flex-wrap items-center gap-3">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={t('adminCategories.newCategory')}
          className="w-full max-w-sm rounded-lg border border-neutral-200 px-3.5 py-2.5 text-sm outline-none focus:border-makitii-green"
        />

        <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-dashed border-neutral-300 px-3 py-2 text-sm text-neutral-500 hover:border-makitii-green hover:text-makitii-green">
          {iconPreview ? (
            <img src={iconPreview} alt="" className="h-8 w-8 rounded-lg object-cover" />
          ) : (
            <span>{t('adminCategories.chooseImage')}</span>
          )}
          <input type="file" accept="image/*" onChange={handleIconChange} className="hidden" />
        </label>

        <button
          type="submit"
          disabled={saving}
          className="rounded-full bg-makitii-green px-5 py-2.5 text-sm font-semibold text-white hover:bg-makitii-green-dark disabled:opacity-60"
        >
          {saving ? t('adminCategories.adding') : t('adminCategories.add')}
        </button>
      </form>

      {error && <div className="max-w-sm rounded-lg bg-red-50 px-4 py-3 text-sm text-makitii-red">{error}</div>}

      {loading ? (
        <Spinner />
      ) : (
        <div className="divide-y divide-neutral-100 overflow-hidden rounded-2xl border border-neutral-100 bg-white">
          {categories.map((category) => (
            <div key={category.id} className="flex flex-wrap items-center justify-between gap-3 px-4 py-3">
              {editingId === category.id ? (
                <div className="flex flex-1 flex-wrap items-center gap-3">
                  <input
                    value={editingName}
                    onChange={(e) => setEditingName(e.target.value)}
                    className="w-full max-w-sm rounded-lg border border-neutral-200 px-3 py-1.5 text-sm outline-none focus:border-makitii-green"
                    autoFocus
                  />

                  <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-dashed border-neutral-300 px-3 py-1.5 text-xs text-neutral-500 hover:border-makitii-green hover:text-makitii-green">
                    {editingIconPreview ? (
                      <img src={editingIconPreview} alt="" className="h-7 w-7 rounded-lg object-cover" />
                    ) : !editingRemoveIcon && category.icon_url ? (
                      <img src={category.icon_url} alt="" className="h-7 w-7 rounded-lg object-cover" />
                    ) : (
                      <span>{t('adminCategories.chooseImage')}</span>
                    )}
                    <input type="file" accept="image/*" onChange={handleEditingIconChange} className="hidden" />
                  </label>

                  {category.icon_url && !editingIconFile && (
                    <label className="flex items-center gap-1.5 text-xs text-neutral-400">
                      <input
                        type="checkbox"
                        checked={editingRemoveIcon}
                        onChange={(e) => setEditingRemoveIcon(e.target.checked)}
                      />
                      {t('adminCategories.removeImage')}
                    </label>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  {category.icon_url ? (
                    <img src={category.icon_url} alt="" className="h-9 w-9 rounded-lg object-cover" />
                  ) : (
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-makitii-yellow/30 text-sm font-bold text-makitii-green-dark">
                      {category.name?.[0]}
                    </div>
                  )}
                  <span className="font-medium text-neutral-800">{category.name}</span>
                </div>
              )}

              <div className="flex shrink-0 gap-3 text-sm">
                {editingId === category.id ? (
                  <>
                    <button type="button" onClick={() => handleUpdate(category.id)} className="font-medium text-makitii-green hover:underline">
                      {t('common.save')}
                    </button>
                    <button type="button" onClick={() => setEditingId(null)} className="font-medium text-neutral-400 hover:underline">
                      {t('common.cancel')}
                    </button>
                  </>
                ) : (
                  <>
                    <button type="button" onClick={() => startEdit(category)} className="font-medium text-makitii-green hover:underline">
                      {t('common.edit')}
                    </button>
                    <button type="button" onClick={() => handleDelete(category.id)} className="font-medium text-makitii-red hover:underline">
                      {t('common.delete')}
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
