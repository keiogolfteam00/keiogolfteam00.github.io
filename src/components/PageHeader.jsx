import React from 'react'
import { Link } from 'react-router-dom'

/**
 * ページ先頭のパンくずリストと見出し。
 * DADS「Breadcrumbs」および見出し階層の考え方に沿って、
 * 各ページに h1 をひとつだけ置く。
 */
function PageHeader({ title, lead }) {
  return (
    <>
      <nav aria-label="パンくずリスト" className="breadcrumbs">
        <ol>
          <li>
            <Link className="dads-link" to="/">
              ホーム
            </Link>
          </li>
          <li>
            <span aria-current="page">{title}</span>
          </li>
        </ol>
      </nav>

      <div className="page-header">
        <h1 className="page-title">{title}</h1>
        {lead && <p className="page-header-lead">{lead}</p>}
      </div>
    </>
  )
}

export default PageHeader
