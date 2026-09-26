import React from 'react'
import { Helmet } from 'react-helmet-async'
import ContactSection from './ContactSection'
import PageHeader from './PageHeader'
import content from '../../content/content.json'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

function Contact() {
  const { contact } = content
  useScrollAnimation(0.08)

  return (
    <div className="container page-content">
      <Helmet>
        <title>お問い合わせ | 慶應義塾體育會ゴルフ部</title>
        <meta
          name="description"
          content="慶應義塾體育會ゴルフ部へのお問い合わせはInstagramのDMまたはX（旧Twitter）からどうぞ。"
        />
        <link rel="canonical" href="https://keiogolf.com/contact" />
      </Helmet>

      <PageHeader title={contact.title} />
      <ContactSection />
    </div>
  )
}

export default Contact
