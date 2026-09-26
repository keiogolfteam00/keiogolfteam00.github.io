import React from 'react'

/**
 * 別タブで開くリンク。DADS「リンク」仕様に従い、
 * 新規タブで開くことを示すアイコンを添える。
 */
function ExternalLink({ href, children, className = 'dads-link', onClick }) {
  return (
    <a
      className={className}
      href={href}
      onClick={onClick}
      rel="noopener noreferrer"
      target="_blank"
    >
      {children}
      <svg
        aria-label="新規タブで開きます"
        className="dads-link-external-icon"
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
    </a>
  )
}

export default ExternalLink
