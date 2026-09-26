import React from 'react'
import content from '../../content/content.json'

const ICONS = {
  instagram: (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16Zm0 3.68a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32Zm0 10.16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm6.41-10.4a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0Z" />
    </svg>
  ),
  x: (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M18.9 2.5h3.4l-7.4 8.5 8.7 11.5h-6.8l-5.3-7-6.1 7H1.9l7.9-9-8.3-11h7l4.8 6.3 5.6-6.3Zm-1.2 17.9h1.9L7.4 4.4H5.4l12.3 16Z" />
    </svg>
  ),
  facebook: (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5 3.66 9.15 8.44 9.94v-7.03H7.9v-2.9h2.54V9.85c0-2.52 1.49-3.91 3.78-3.91 1.1 0 2.24.2 2.24.2v2.47h-1.26c-1.24 0-1.63.78-1.63 1.57v1.88h2.78l-.44 2.9h-2.34V22c4.78-.79 8.44-4.94 8.44-9.94Z" />
    </svg>
  ),
  link: (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M10.6 13.4a1 1 0 0 1 0-1.4l1.4-1.4a1 1 0 1 1 1.4 1.4l-1.4 1.4a1 1 0 0 1-1.4 0Zm-3.3 5.3a4 4 0 0 1 0-5.7l2.1-2.1 1.4 1.4-2.1 2.1a2 2 0 0 0 2.9 2.9l2.1-2.1 1.4 1.4-2.1 2.1a4 4 0 0 1-5.7 0Zm9.4-3.6-1.4-1.4 2.1-2.1a2 2 0 1 0-2.9-2.9l-2.1 2.1-1.4-1.4 2.1-2.1a4 4 0 0 1 5.7 5.7l-2.1 2.1Z" />
    </svg>
  ),
}

function getPlatform(url) {
  const u = url.toLowerCase()
  if (u.includes('instagram')) return 'instagram'
  if (u.includes('facebook')) return 'facebook'
  if (u.includes('x.com') || u.includes('twitter')) return 'x'
  return 'link'
}

/**
 * SNSリンク一覧。
 * withHeading を渡した場合のみ h2 を出す（お問い合わせページでは h1 と重複するため省く）。
 */
function ContactSection({ withHeading = false }) {
  const { contact } = content

  return (
    <section className="page-section fade-up">
      {withHeading && <h2 className="section-title">{contact.title}</h2>}
      <p className="prose">{contact.description}</p>

      <ul className="social-links" style={{ marginTop: 'var(--space-6)' }}>
        {contact.socialLinks.map((link) => {
          const platform = getPlatform(link.url)
          return (
            <li key={link.url}>
              <a
                className="social-link-card"
                href={link.url}
                rel="noopener noreferrer"
                target="_blank"
              >
                <span aria-hidden="true" className="social-link-icon">
                  {ICONS[platform]}
                </span>
                <span className="social-link-text">
                  <span className="social-link-label">{link.label}</span>
                  <span className="social-link-handle">{link.handle}</span>
                </span>
                <span className="social-link-arrow">
                  <svg
                    aria-label="新規タブで開きます"
                    fill="none"
                    height="16"
                    role="img"
                    viewBox="0 0 16 17"
                    width="16"
                  >
                    <path
                      clipRule="evenodd"
                      d="M3 13.5H13V9.16667H14V14.5H2V2.5H7.33333V3.5H3V13.5ZM9.33333 3.5V2.5H14V7.16667H13V4.23333L7 10.1667L6.33333 9.5L12.2667 3.5H9.33333Z"
                      fill="currentColor"
                      fillRule="evenodd"
                    />
                  </svg>
                </span>
              </a>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

export default ContactSection
