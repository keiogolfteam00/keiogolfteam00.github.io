import React from 'react'

const ICONS = {
  info: <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm1 15h-2v-6h2v6Zm0-8h-2V7h2v2Z" />,
  neutral: <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm1 15h-2v-6h2v6Zm0-8h-2V7h2v2Z" />,
  warning: <path d="M12 2 1 21h22L12 2Zm1 15h-2v-2h2v2Zm0-4h-2V9h2v4Z" />,
}

/**
 * 通知バナー。DADS「Notification Banner」の構成
 * （種別アイコン + 見出し + 本文、3pxの枠線と角丸12px）に倣う。
 */
function Banner({ type = 'info', title, headingLevel: Heading = 'h2', children }) {
  return (
    <div className={`banner banner--${type}`}>
      <svg aria-hidden="true" className="banner-icon" fill="currentColor" viewBox="0 0 24 24">
        {ICONS[type]}
      </svg>
      <Heading className="banner-title">{title}</Heading>
      <div className="banner-body prose">{children}</div>
    </div>
  )
}

export default Banner
