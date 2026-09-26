import React, { useMemo } from 'react'
import { Helmet } from 'react-helmet-async'
import PageHeader from './PageHeader'
import content from '../../content/content.json'
import membersData from '../../content/members.json'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

const YEARS = ['4年', '3年', '2年', '1年']

function normalize(name) {
  return name.replace(/\s/g, '')
}

function MemberPhotoPlaceholder() {
  return (
    <div className="member-photo-placeholder">
      <svg aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0 2c-4.42 0-8 2.24-8 5v1h16v-1c0-2.76-3.58-5-8-5Z" />
      </svg>
    </div>
  )
}

function MemberCard({ m, role }) {
  return (
    <div className="member-card">
      <div className="member-photo-wrap">
        {m.photo ? (
          <img alt="" className="member-photo" src={`/assets/members/${m.photo}`} />
        ) : (
          <MemberPhotoPlaceholder />
        )}
      </div>
      <span className="member-role-slot">
        {role && <span className="member-role">{role}</span>}
      </span>
      <p className="member-name">{m.name}</p>
    </div>
  )
}

function Team() {
  const { team } = content
  const { captains } = membersData

  useScrollAnimation(0.08)

  const roleMap = useMemo(() => {
    const map = {}
    map[normalize(captains.menCaptain)] = team.captainLabel
    map[normalize(captains.menViceCaptain)] = team.viceCaptainLabel
    map[normalize(captains.menManager)] = team.managerLabel
    map[normalize(captains.womenCaptain)] = team.captainLabel
    map[normalize(captains.womenViceCaptain)] = team.viceCaptainLabel
    map[normalize(captains.womenManager)] = team.managerLabel
    return map
  }, [captains, team])

  const grouped = useMemo(() => {
    const map = {}
    for (const year of YEARS) map[year] = { male: [], female: [] }
    for (const m of membersData.members) {
      const bucket = map[m.year]
      if (bucket && bucket[m.gender]) bucket[m.gender].push(m)
    }
    return map
  }, [])

  const renderGroup = (label, members) => (
    <div className="gender-group">
      <h3 className="gender-heading">{label}</h3>
      <ul className="members-grid">
        {members.map((m, i) => (
          <li key={`${m.name}-${i}`}>
            <MemberCard m={m} role={roleMap[normalize(m.name)]} />
          </li>
        ))}
      </ul>
    </div>
  )

  return (
    <div className="container page-content">
      <Helmet>
        <title>部員紹介 | 慶應義塾體育會ゴルフ部</title>
        <meta
          name="description"
          content="慶應義塾體育會ゴルフ部の部員紹介。男子・女子、各学年の部員一覧です。"
        />
        <link rel="canonical" href="https://keiogolf.com/member" />
      </Helmet>

      <PageHeader title={team.title} />

      {YEARS.map((year) => {
        const { male: men, female: women } = grouped[year]
        if (men.length === 0 && women.length === 0) return null
        return (
          <section className="year-group fade-up" key={year}>
            <h2 className="section-title">{year}</h2>
            {men.length > 0 && renderGroup(team.menLabel, men)}
            {women.length > 0 && renderGroup(team.womenLabel, women)}
          </section>
        )
      })}
    </div>
  )
}

export default Team
