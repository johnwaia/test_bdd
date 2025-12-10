import React, { useEffect, useState } from 'react';

const API_URL = 'http://localhost:5000/api/games';

function App() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    titre: '',
    genre: '',
    plateforme: '',
    termine: false,
  });
  const [editingId, setEditingId] = useState(null);

  // Charger les jeux au démarrage
  useEffect(() => {
    fetchGames();
  }, []);

  const fetchGames = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error('Erreur lors du chargement des jeux');
      const data = await res.json();
      setGames(data);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Erreur serveur');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setForm({
      titre: '',
      genre: '',
      plateforme: '',
      termine: false,
    });
    setEditingId(null);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!form.titre.trim()) {
      setError('Le titre est obligatoire');
      return;
    }

    // Conversion des champs texte en tableaux
    const payload = {
      titre: form.titre.trim(),
      genre: form.genre
        .split(',')
        .map((g) => g.trim())
        .filter(Boolean),
      plateforme: form.plateforme
        .split(',')
        .map((p) => p.trim())
        .filter(Boolean),
      termine: form.termine,
    };

    try{
      setLoading(true);
      let res;
      if (editingId) {
        // UPDATE
        res = await fetch(`${API_URL}/${editingId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      } else {
        // CREATE
        res = await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      }

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.message || 'Erreur lors de la sauvegarde');
      }

      await fetchGames();
      resetForm();
    } catch (err) {
      console.error(err);
      setError(err.message || 'Erreur serveur');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (game) => {
    setEditingId(game._id);
    setForm({
      titre: game.titre || '',
      genre: (game.genre || []).join(', '),
      plateforme: (game.plateforme || []).join(', '),
      termine: !!game.termine,
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Supprimer ce jeu ?')) return;
    try {
      setLoading(true);
      setError('');
      const res = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.message || 'Erreur lors de la suppression');
      }
      await fetchGames();
    } catch (err) {
      console.error(err);
      setError(err.message || 'Erreur serveur');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        fontFamily: 'system-ui, sans-serif',
        maxWidth: 900,
        margin: '0 auto',
        padding: '1.5rem',
      }}
    >
      <h1>🎮 Gestion des jeux</h1>
      <p style={{ color: '#555' }}>
        Front simple pour tester le CRUD de ton back <code>/api/games</code>.
      </p>

      {error && (
        <div
          style={{
            background: '#ffe5e5',
            color: '#b00020',
            padding: '0.5rem 0.75rem',
            borderRadius: 4,
            marginBottom: '1rem',
          }}
        >
          {error}
        </div>
      )}

      <section
        style={{
          border: '1px solid #ddd',
          borderRadius: 8,
          padding: '1rem',
          marginBottom: '2rem',
        }}
      >
        <h2 style={{ marginTop: 0 }}>
          {editingId ? '✏️ Modifier un jeu' : '➕ Ajouter un jeu'}
        </h2>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '0.75rem' }}>
            <label>
              Titre<br />
              <input
                type="text"
                name="titre"
                value={form.titre}
                onChange={handleChange}
                style={{ width: '100%', padding: '0.4rem' }}
                placeholder="Elden Ring"
              />
            </label>
          </div>

          <div style={{ marginBottom: '0.75rem' }}>
            <label>
              Genre(s) (séparés par des virgules)<br />
              <input
                type="text"
                name="genre"
                value={form.genre}
                onChange={handleChange}
                style={{ width: '100%', padding: '0.4rem' }}
                placeholder="RPG, Action"
              />
            </label>
          </div>

          <div style={{ marginBottom: '0.75rem' }}>
            <label>
              Plateforme(s) (séparées par des virgules)<br />
              <input
                type="text"
                name="plateforme"
                value={form.plateforme}
                onChange={handleChange}
                style={{ width: '100%', padding: '0.4rem' }}
                placeholder="PC, PS5"
              />
            </label>
          </div>

          <div style={{ marginBottom: '0.75rem' }}>
            <label>
              <input
                type="checkbox"
                name="termine"
                checked={form.termine}
                onChange={handleChange}
                style={{ marginRight: '0.5rem' }}
              />
              Terminé
            </label>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              type="submit"
              disabled={loading}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: 4,
                border: 'none',
                background: '#2563eb',
                color: 'white',
                cursor: 'pointer',
              }}
            >
              {editingId ? '💾 Enregistrer' : '➕ Créer'}
            </button>

            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                style={{
                  padding: '0.5rem 1rem',
                  borderRadius: 4,
                  border: '1px solid #999',
                  background: '#f3f4f6',
                  cursor: 'pointer',
                }}
              >
                Annuler
              </button>
            )}
          </div>
        </form>
      </section>

      <section>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '0.5rem',
          }}
        >
          <h2 style={{ margin: 0 }}>📋 Liste des jeux</h2>
          <button
            onClick={fetchGames}
            disabled={loading}
            style={{
              padding: '0.3rem 0.7rem',
              borderRadius: 4,
              border: '1px solid #999',
              background: '#f3f4f6',
              cursor: 'pointer',
              fontSize: '0.9rem',
            }}
          >
            🔄 Rafraîchir
          </button>
        </div>

        {loading && <p>Chargement...</p>}

        {games.length === 0 && !loading && (
          <p style={{ color: '#777' }}>Aucun jeu pour le moment.</p>
        )}

        <div style={{ display: 'grid', gap: '0.75rem' }}>
          {games.map((game) => (
            <div
              key={game._id}
              style={{
                border: '1px solid #ddd',
                borderRadius: 8,
                padding: '0.75rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '0.75rem',
              }}
            >
              <div>
                <strong>{game.titre}</strong>{' '}
                {game.termine && (
                  <span
                    style={{
                      fontSize: '0.75rem',
                      background: '#16a34a22',
                      color: '#15803d',
                      padding: '0.1rem 0.4rem',
                      borderRadius: 999,
                      marginLeft: '0.25rem',
                    }}
                  >
                    Terminé
                  </span>
                )}
                <div style={{ fontSize: '0.85rem', color: '#555' }}>
                  {game.genre && game.genre.length > 0 && (
                    <div>Genre : {game.genre.join(', ')}</div>
                  )}
                  {game.plateforme && game.plateforme.length > 0 && (
                    <div>Plateforme : {game.plateforme.join(', ')}</div>
                  )}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  onClick={() => handleEdit(game)}
                  style={{
                    padding: '0.3rem 0.6rem',
                    borderRadius: 4,
                    border: '1px solid #2563eb',
                    background: 'white',
                    color: '#2563eb',
                    cursor: 'pointer',
                    fontSize: '0.85rem',
                  }}
                >
                  ✏️ Modifier
                </button>
                <button
                  onClick={() => handleDelete(game._id)}
                  style={{
                    padding: '0.3rem 0.6rem',
                    borderRadius: 4,
                    border: '1px solid #b91c1c',
                    background: 'white',
                    color: '#b91c1c',
                    cursor: 'pointer',
                    fontSize: '0.85rem',
                  }}
                >
                  🗑️ Supprimer
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default App;
