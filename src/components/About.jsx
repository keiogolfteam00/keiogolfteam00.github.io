import React from 'react'
import { Helmet } from 'react-helmet-async'
import PageHeader from './PageHeader'
import content from '../../content/content.json'
import scheduleData from '../../content/schedule.json'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

function About() {
  const { nav, about, schedule: labels } = content
  const { schedule } = scheduleData
  useScrollAnimation()

  return (
    <div className="container page-content">
      <Helmet>
        <title>部について | 慶應義塾體育會ゴルフ部</title>
        <meta
          name="description"
          content="慶應義塾體育會ゴルフ部の理念と活動方針。1922年創部、関東大学対抗戦Aブロック復帰を目指して日々精進しています。"
        />
        <link rel="canonical" href="https://keiogolf.com/about" />
      </Helmet>

      <PageHeader title={nav.about} />

      <section className="page-section fade-up" id="philosophy">
        <h2 className="section-title">{about.title}</h2>
        <div className="prose">
          <p>{about.philosophy}</p>
        </div>
      </section>

      <section className="page-section fade-up" id="schedule">
        <h2 className="section-title">{labels.title}</h2>
        <div className="table-wrapper">
          <table className="data-table">
            <caption>{labels.annualHeading}</caption>
            <thead>
              <tr>
                <th scope="col">月</th>
                <th scope="col">試合・イベント</th>
              </tr>
            </thead>
            <tbody>
              {schedule.map(({ month, events }) => (
                <tr key={month}>
                  <th scope="row">{month}</th>
                  <td>{events.length > 0 ? events.join('、') : '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}

export default About
