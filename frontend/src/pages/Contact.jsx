import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Reveal from '../components/Reveal'
import WhatsAppButton from '../components/WhatsAppButton'

export default function Contact() {
  const { t } = useTranslation()
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'general',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [openFaq, setOpenFaq] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    // Simulated form submission (or WhatsApp direct dispatch)
    setSubmitted(true)
  }

  const directWhatsAppMessage = t('contact.directWhatsappMessage')

  const faqs = [
    { qKey: 'contact.faq1.q', aKey: 'contact.faq1.a' },
    { qKey: 'contact.faq2.q', aKey: 'contact.faq2.a' },
    { qKey: 'contact.faq3.q', aKey: 'contact.faq3.a' },
    { qKey: 'contact.faq4.q', aKey: 'contact.faq4.a' },
  ]

  return (
    <div className="pb-16">
      {/* HERO SECTION */}
      <section className="bg-gradient-to-br from-makitii-green-light/40 via-white to-makitii-yellow/20 py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <Reveal>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-makitii-green/20 bg-white/80 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-makitii-green-dark shadow-sm backdrop-blur">
              {t('contact.badge')}
            </span>
            <h1 className="mt-4 text-3xl font-extrabold text-neutral-900 sm:text-4xl">
              {t('contact.heroTitle')}
            </h1>
            <p className="mx-auto mt-3 max-w-xl text-sm text-neutral-600 sm:text-base">
              {t('contact.heroSubtitle')}
            </p>
          </Reveal>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-10 lg:grid-cols-3">
          {/* CONTACT INFO & WHATSAPP CARD */}
          <div className="space-y-6 lg:col-span-1">
            <Reveal delay={50}>
              <div className="rounded-3xl border border-neutral-100 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-bold text-neutral-800">{t('contact.directSupport')}</h3>
                <p className="mt-2 text-xs text-neutral-500">
                  {t('contact.directSupportText')}
                </p>
                <div className="mt-5">
                  <WhatsAppButton number="+224620000000" message={directWhatsAppMessage} fullWidth>
                    {t('contact.chatOnWhatsApp')}
                  </WhatsAppButton>
                </div>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <div className="space-y-4 rounded-3xl border border-neutral-100 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-bold text-neutral-800">{t('contact.details')}</h3>

                <div className="flex items-start gap-3 text-sm text-neutral-600">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-makitii-green-light text-makitii-green-dark">
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-neutral-800">{t('contact.address')}</p>
                    <p className="text-xs text-neutral-500">{t('contact.addressValue')}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-sm text-neutral-600">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-makitii-yellow/30 text-makitii-ink">
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-neutral-800">{t('contact.email')}</p>
                    <p className="text-xs text-neutral-500">contact@makitii.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-sm text-neutral-600">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-neutral-100 text-neutral-700">
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-neutral-800">{t('contact.hours')}</p>
                    <p className="text-xs text-neutral-500">{t('contact.hoursValue')}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* CONTACT FORM */}
          <div className="lg:col-span-2">
            <Reveal delay={150}>
              <div className="rounded-3xl border border-neutral-100 bg-white p-6 shadow-sm sm:p-8">
                <h2 className="text-xl font-bold text-neutral-800">{t('contact.formTitle')}</h2>
                <p className="mt-1 text-xs text-neutral-500 sm:text-sm">
                  {t('contact.formSubtitle')}
                </p>

                {submitted ? (
                  <div className="mt-6 rounded-2xl bg-makitii-green-light p-6 text-center">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-makitii-green text-white">
                      ✓
                    </div>
                    <h3 className="mt-3 font-bold text-makitii-green-dark">{t('contact.sentTitle')}</h3>
                    <p className="mt-1 text-xs text-makitii-green-dark/80">
                      {t('contact.sentText')}
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setSubmitted(false)
                        setForm({ name: '', email: '', phone: '', subject: 'general', message: '' })
                      }}
                      className="mt-4 rounded-full bg-makitii-green px-5 py-2 text-xs font-semibold text-white"
                    >
                      {t('contact.sendAnother')}
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="block text-xs font-semibold text-neutral-700">{t('contact.fullName')} *</label>
                        <input
                          type="text"
                          required
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          placeholder={t('contact.fullNamePlaceholder')}
                          className="mt-1 w-full rounded-xl border border-neutral-200 px-3.5 py-2.5 text-sm outline-none transition focus:border-makitii-green focus:ring-1 focus:ring-makitii-green"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-neutral-700">{t('contact.email')} *</label>
                        <input
                          type="email"
                          required
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          placeholder={t('contact.emailPlaceholder')}
                          className="mt-1 w-full rounded-xl border border-neutral-200 px-3.5 py-2.5 text-sm outline-none transition focus:border-makitii-green focus:ring-1 focus:ring-makitii-green"
                        />
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="block text-xs font-semibold text-neutral-700">{t('contact.phoneLabel')}</label>
                        <input
                          type="tel"
                          value={form.phone}
                          onChange={(e) => setForm({ ...form, phone: e.target.value })}
                          placeholder="+224 6..."
                          className="mt-1 w-full rounded-xl border border-neutral-200 px-3.5 py-2.5 text-sm outline-none transition focus:border-makitii-green focus:ring-1 focus:ring-makitii-green"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-neutral-700">{t('contact.subjectLabel')}</label>
                        <select
                          value={form.subject}
                          onChange={(e) => setForm({ ...form, subject: e.target.value })}
                          className="mt-1 w-full rounded-xl border border-neutral-200 bg-white px-3.5 py-2.5 text-sm outline-none transition focus:border-makitii-green focus:ring-1 focus:ring-makitii-green"
                        >
                          <option value="general">{t('contact.subjectGeneral')}</option>
                          <option value="vendor">{t('contact.subjectVendor')}</option>
                          <option value="recruitment">{t('contact.subjectRecruitment')}</option>
                          <option value="support">{t('contact.subjectSupport')}</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-neutral-700">{t('contact.messageLabel')} *</label>
                      <textarea
                        required
                        rows={5}
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        placeholder={t('contact.messagePlaceholder')}
                        className="mt-1 w-full rounded-xl border border-neutral-200 px-3.5 py-2.5 text-sm outline-none transition focus:border-makitii-green focus:ring-1 focus:ring-makitii-green"
                      />
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        className="w-full rounded-full bg-makitii-green px-6 py-3 text-sm font-semibold text-white shadow-md transition duration-200 hover:bg-makitii-green-dark hover:shadow-lg sm:w-auto"
                      >
                        {t('contact.sendMessage')} →
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </Reveal>
          </div>
        </div>

        {/* FAQ SECTION */}
        <Reveal as="section" className="mt-16">
          <div className="mb-8 text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-makitii-green">{t('contact.faqBadge')}</span>
            <h2 className="mt-1 text-2xl font-bold text-neutral-800 sm:text-3xl">{t('contact.faqTitle')}</h2>
            <p className="mt-2 text-xs text-neutral-500 sm:text-sm">{t('contact.faqSubtitle')}</p>
          </div>

          <div className="mx-auto max-w-3xl space-y-3">
            {faqs.map((faq, i) => {
              const isOpen = openFaq === i
              return (
                <div
                  key={i}
                  className="overflow-hidden rounded-2xl border border-neutral-100 bg-white transition duration-200 hover:border-neutral-200"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    className="flex w-full items-center justify-between p-4 text-left font-semibold text-neutral-800"
                  >
                    <span className="text-sm">{t(faq.qKey)}</span>
                    <span className="ml-3 text-makitii-green">{isOpen ? '−' : '+'}</span>
                  </button>
                  {isOpen && (
                    <div className="border-t border-neutral-50 px-4 pb-4 pt-2 text-xs leading-relaxed text-neutral-600 sm:text-sm">
                      {t(faq.aKey)}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </Reveal>
      </div>
    </div>
  )
}
