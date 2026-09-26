import React, { useState, useEffect, useRef, useCallback, Suspense, lazy } from 'react'
import { BrowserRouter as Router, Route, Routes, NavLink, useLocation } from 'react-router-dom'
import ExternalLink from './components/ExternalLink'
import Home from './components/Home'
import content from '../content/content.json'

// ホーム以外のページは遅延ロード（初期バンドルサイズを削減）
const Team = lazy(() => import('./components/Team'))
const About = lazy(() => import('./components/About'))
const Prospective = lazy(() => import('./components/Prospective'))
const Contact = lazy(() => import('./components/Contact'))

const FOCUSABLE_SELECTOR = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'

function ChevronRightIcon() {
  return (
    <svg
      aria-hidden="true"
      className="mobile-menu-arrow"
      fill="none"
      height="16"
      viewBox="0 0 24 24"
      width="16"
    >
      <path
        d="M9 18l6-6-6-6"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  )
}

function AppInner() {
  const { siteTitle, nav, footer, contact } = content
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  const hamburgerRef = useRef(null)
  const menuRef = useRef(null)

  useEffect(() => {
    setMenuOpen(false)
  }, [location])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  // メニューを開いたら先頭要素へフォーカスを移す
  useEffect(() => {
    if (menuOpen && menuRef.current) {
      const first = menuRef.current.querySelector(FOCUSABLE_SELECTOR)
      first?.focus()
    }
  }, [menuOpen])

  // フォーカストラップ + Escape キー
  useEffect(() => {
    if (!menuOpen || !menuRef.current) return

    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        setMenuOpen(false)
        hamburgerRef.current?.focus()
        return
      }
      if (e.key !== 'Tab') return

      const focusable = Array.from(menuRef.current.querySelectorAll(FOCUSABLE_SELECTOR))
      if (focusable.length === 0) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault()
          last.focus()
        }
      } else if (document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [menuOpen])

  const closeMenu = useCallback(() => {
    setMenuOpen(false)
    hamburgerRef.current?.focus()
  }, [])

  const navItems = [
    { to: '/', label: nav.home },
    { to: '/about', label: nav.about },
    { to: '/member', label: nav.team },
    { to: '/prospective', label: nav.prospective },
    { to: '/contact', label: nav.contact },
  ]

  return (
    <>
      <a className="skip-link" href="#main">
        本文へスキップ
      </a>

      <header className="site-header">
        <div className="container site-header-inner">
          <NavLink className="site-brand" to="/">
            <img
              alt=""
              className="site-brand-logo"
              height="40"
              src="/assets/icons/logo512.png"
              width="40"
            />
            <span className="site-brand-text">
              <span className="site-brand-name">{siteTitle}</span>
              <span className="site-brand-eyebrow">KEIO UNIVERSITY GOLF TEAM</span>
            </span>
          </NavLink>

          <nav aria-label="メインナビゲーション" className="nav-desktop">
            <ul>
              {navItems.map(({ to, label }) => (
                <li key={to}>
                  <NavLink end={to === '/'} to={to}>
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <button
            aria-controls="mobile-menu"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? 'メニューを閉じる' : 'メニューを開く'}
            className={`hamburger${menuOpen ? ' open' : ''}`}
            onClick={() => setMenuOpen((v) => !v)}
            ref={hamburgerRef}
            type="button"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      {/* モバイルドロワー */}
      <nav
        aria-label="モバイルナビゲーション"
        className={`mobile-menu${menuOpen ? ' open' : ''}`}
        id="mobile-menu"
        inert={!menuOpen ? '' : undefined}
        ref={menuRef}
      >
        <p className="mobile-menu-heading">メニュー</p>
        <ul>
          {navItems.map(({ to, label }) => (
            <li key={to}>
              <NavLink end={to === '/'} onClick={closeMenu} to={to}>
                <span>{label}</span>
                <ChevronRightIcon />
              </NavLink>
            </li>
          ))}
        </ul>
        <div className="mobile-menu-social">
          <span className="mobile-menu-social-label">SNS</span>
          <div className="mobile-menu-social-links">
            {contact.socialLinks.map((link) => (
              <ExternalLink href={link.url} key={link.url} onClick={closeMenu}>
                {link.label}
              </ExternalLink>
            ))}
          </div>
        </div>
      </nav>
      {menuOpen && <div aria-hidden="true" className="mobile-overlay" onClick={closeMenu} />}

      <main id="main">
        <Suspense fallback={null}>
          <Routes>
            <Route element={<Home />} path="/" />
            <Route element={<About />} path="/about" />
            <Route element={<Team />} path="/member" />
            <Route element={<Prospective />} path="/prospective" />
            <Route element={<Contact />} path="/contact" />
          </Routes>
        </Suspense>
      </main>

      <footer className="site-footer">
        <div className="container">
          <div className="footer-grid">
            <div>
              <p className="footer-brand-name">{siteTitle}</p>
              <p className="footer-brand-text">
                1922年創部。日本最初の大学ゴルフ部として、技術の向上とゴルフ精神の涵養に励んでいます。
              </p>
            </div>

            <div>
              <h2 className="footer-heading">サイト内リンク</h2>
              <ul className="footer-list">
                {navItems.map(({ to, label }) => (
                  <li key={to}>
                    <NavLink end={to === '/'} to={to}>
                      {label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="footer-heading">SNS</h2>
              <ul className="footer-list">
                {contact.socialLinks.map((link) => (
                  <li key={link.url}>
                    <ExternalLink className="" href={link.url}>
                      {link.label}
                    </ExternalLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <p>{footer.copyright}</p>
          </div>
        </div>
      </footer>
    </>
  )
}

function App() {
  return (
    <Router>
      <AppInner />
    </Router>
  )
}

export default App
