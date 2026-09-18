// Small utilities shared by listing cards and pages.

export const CONDITION_KEYS = {
  neuf: 'condition.new',
  comme_neuf: 'condition.likeNew',
  occasion: 'condition.used',
}

export function conditionLabel(condition, t) {
  const key = CONDITION_KEYS[condition]
  if (!key) return null
  return t ? t(key) : condition
}

export function conditionBadgeClass(condition) {
  if (condition === 'neuf') {
    return 'bg-makitii-green text-white'
  }
  // "Like new" and "Used" share the light, discreet badge style
  // used across the storefront.
  return 'border border-white/80 bg-white/90 text-neutral-800 backdrop-blur-md'
}

export function formatPublishedDate(dateString, t) {
  if (!dateString) return null
  try {
    const locale = t && t('common.locale', { defaultValue: 'fr-FR' })
    return new Intl.DateTimeFormat(locale || 'fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(new Date(dateString))
  } catch {
    return null
  }
}
