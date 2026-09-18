// Icônes de catégories Makitii : de petits SVG en ligne (pas de dépendance
// externe) choisis pour rappeler visuellement la maquette makitii.com.
// La clé de chaque entrée correspond au champ `icon` renvoyé par l'API
// (voir backend CategorySeeder) ou, à défaut, au slug de la catégorie.

const paths = {
  vehicules: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3.75 16.5v-3.6c0-.4.13-.79.38-1.1l1.9-2.42a2 2 0 0 1 1.57-.76h8.8c.62 0 1.2.29 1.57.76l1.9 2.41c.25.32.38.71.38 1.11v3.6M3.75 16.5h16.5M3.75 16.5a1.5 1.5 0 0 0 1.5 1.5h1a1.5 1.5 0 0 0 1.5-1.5m-4-0v-1.5m16.5 1.5a1.5 1.5 0 0 1-1.5 1.5h-1a1.5 1.5 0 0 1-1.5-1.5m4 0v-1.5M6.5 13.5h11"
    />
  ),
  immobilier: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 10.5 12 3l9 7.5M5.25 9v10.5a.75.75 0 0 0 .75.75h3.75v-6h4.5v6H18a.75.75 0 0 0 .75-.75V9"
    />
  ),
  electronique: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 3.75v1.5m6-1.5v1.5m-6 13.5v1.5m6-1.5v1.5m3.75-12h1.5m-1.5 4.5h1.5m-18-4.5h1.5m-1.5 4.5h1.5M6.75 6.75h10.5v10.5H6.75z"
    />
  ),
  'meubles-decoration': (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4.5 12V9a2.25 2.25 0 0 1 2.25-2.25h10.5A2.25 2.25 0 0 1 19.5 9v3m-15 0a1.5 1.5 0 0 0-1.5 1.5v2.25c0 .414.336.75.75.75h.75m0 0v2.25m15-5.25a1.5 1.5 0 0 1 1.5 1.5v2.25a.75.75 0 0 1-.75.75h-.75m0 0v2.25m-15-3h15"
    />
  ),
  emplois: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M20.25 14.15v4.1a2 2 0 0 1-2 2H5.75a2 2 0 0 1-2-2v-4.1M3.75 14.15v-3.4a2 2 0 0 1 2-2h12.5a2 2 0 0 1 2 2v3.4m-16.5 0c1.68.5 4.94 1.2 8.25 1.2s6.57-.7 8.25-1.2M9 8.75v-2A1.75 1.75 0 0 1 10.75 5h2.5A1.75 1.75 0 0 1 15 6.75v2"
    />
  ),
  mode: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M8.25 4.5 6 6.75 3.75 9l2.5 1.5v9h11.5v-9l2.5-1.5L18 6.75 15.75 4.5m-7.5 0c0 1.24 1.68 2.25 3.75 2.25s3.75-1.01 3.75-2.25m-7.5 0h7.5"
    />
  ),
  'enfants-bebes': (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 3v3m0 0a2.25 2.25 0 1 0 0 4.5A2.25 2.25 0 0 0 12 6Zm0 4.5v3m-4.5 0h9a1.5 1.5 0 0 1 1.5 1.5v3a4.5 4.5 0 0 1-4.5 4.5h-3a4.5 4.5 0 0 1-4.5-4.5v-3a1.5 1.5 0 0 1 1.5-1.5Z"
    />
  ),
  'agriculture-animaux': (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 21c-3.87 0-6.5-1.86-6.5-4.5 0-2.2 2.2-3.5 3.4-5.1.8-1.07 1-2.15 1-3.15a2.1 2.1 0 1 1 4.2 0c0 1 .2 2.08 1 3.15 1.2 1.6 3.4 2.9 3.4 5.1 0 2.64-2.63 4.5-6.5 4.5Zm-4.9-9.75a1.65 1.65 0 1 0 0-3.3 1.65 1.65 0 0 0 0 3.3Zm9.8 0a1.65 1.65 0 1 0 0-3.3 1.65 1.65 0 0 0 0 3.3Z"
    />
  ),
  'sports-equipement': (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6.5 8.25v7.5m11-7.5v7.5M4 10.5v3M20 10.5v3M6.5 12h11M3.75 9h1.5v6h-1.5zM18.75 9h1.5v6h-1.5z"
    />
  ),
  loisirs: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 18V5.5l10-2v12.5M9 18a2.25 2.25 0 1 1-4.5 0A2.25 2.25 0 0 1 9 18Zm10-2v2a2.25 2.25 0 1 1-2.25-2.25c.79 0 1.5.34 2 .88"
    />
  ),
  bazar: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 7.5h12l1 12.75a1.5 1.5 0 0 1-1.5 1.5H6.5a1.5 1.5 0 0 1-1.5-1.5L6 7.5Zm2.5 0v-1.5a3.5 3.5 0 1 1 7 0v1.5"
    />
  ),
  madina: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4 21V10.5l8-5.25 8 5.25V21M4 21h16M4 21v-6.75h3.5V21m5-8.25h3v3.75h-3zm0 0V21"
    />
  ),
}

const fallback = (
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
  />
)

export default function CategoryIcon({ slug, className = 'h-7 w-7', strokeWidth = '1.6' }) {
  const path = paths[slug] || fallback
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={strokeWidth}>
      {path}
    </svg>
  )
}
