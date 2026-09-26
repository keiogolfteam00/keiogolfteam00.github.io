import React from 'react'
import { Helmet } from 'react-helmet-async'
import Banner from './Banner'
import PageHeader from './PageHeader'
import data from '../../content/prospective.json'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

function Prospective() {
  useScrollAnimation(0.08)

  const helmetMeta = (
    <Helmet>
      <title>入部希望の方へ | 慶應義塾體育會ゴルフ部</title>
      <meta
        name="description"
        content="慶應義塾體育會ゴルフ部への入部案内。説明会情報・入部フローをご確認ください。"
      />
      <link rel="canonical" href="https://keiogolf.com/prospective" />
    </Helmet>
  )

  if (data.closed) {
    return (
      <div className="container page-content">
        {helmetMeta}
        <PageHeader title={data.pageTitle} />
        <div className="fade-up">
          <Banner title={data.closedMessage} type="neutral">
            <p>{data.closedNote}</p>
          </Banner>
        </div>
      </div>
    )
  }

  const { orientationSession, line } = data

  return (
    <div className="container page-content">
      {helmetMeta}
      <PageHeader lead={data.intro} title={data.pageTitle} />

      <section className="page-section fade-up">
        <h2 className="section-title">入部説明会</h2>

        <div className="card">
          <dl className="definition-list">
            <div>
              <dt>日時</dt>
              <dd>
                {orientationSession.date} {orientationSession.startTime}〜
                {orientationSession.endTime}
              </dd>
            </div>
            <div>
              <dt>開催形式</dt>
              <dd>{orientationSession.format}</dd>
            </div>
            <div>
              <dt>申込方法</dt>
              <dd>
                LINE公式アカウント「{line.accountName}」（LINE ID：{line.id}）を追加のうえ、
                {line.deadline}までに下記の項目をご送信ください。
              </dd>
            </div>
            <div>
              <dt>送信いただく項目</dt>
              <dd>
                <ul>
                  {data.requiredFields.map((field) => (
                    <li key={field}>{field}</li>
                  ))}
                </ul>
              </dd>
            </div>
          </dl>
        </div>

        <div className="prose" style={{ marginTop: 'var(--space-6)' }}>
          <p>{data.mandatoryNote}</p>
          <p className="text-muted">{data.formNote}</p>
        </div>
      </section>

      <section className="page-section fade-up">
        <h2 className="section-title">{data.timelineHeading}</h2>
        <ol className="steps">
          {data.timeline.map((step, i) => (
            <li key={i}>
              <p className="step-label">{step.label}</p>
              <p className="step-date">{step.date}</p>
              {step.time && <p className="step-date">{step.time}</p>}
              {step.note && <p className="step-note">※{step.note}</p>}
            </li>
          ))}
        </ol>

        <div style={{ marginTop: 'var(--space-10)' }}>
          <Banner headingLevel="h3" title="お問い合わせ" type="info">
            <p>{data.closing}</p>
          </Banner>
        </div>
      </section>
    </div>
  )
}

export default Prospective
