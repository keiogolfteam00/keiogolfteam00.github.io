import React from 'react'
import { Helmet } from 'react-helmet-async'
import ContactSection from './ContactSection'
import content from '../../content/content.json'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

function Home() {
  const { home, about } = content
  useScrollAnimation()

  return (
    <>
      <Helmet>
        <title>慶應義塾體育會ゴルフ部 公式サイト</title>
        <meta
          name="description"
          content="慶應義塾體育會ゴルフ部の公式サイトです。1922年創部。試合結果、部員紹介、入部案内はこちらをご覧ください。"
        />
        <link rel="canonical" href="https://keiogolf.com/" />
      </Helmet>

      <section className="hero">
        <picture>
          <source
            type="image/avif"
            srcSet="/assets/hero-image-480.avif 480w, /assets/hero-image-768.avif 768w, /assets/hero-image-1280.avif 1280w, /assets/hero-image-1920.avif 1920w"
            sizes="100vw"
          />
          <source
            type="image/webp"
            srcSet="/assets/hero-image-480.webp 480w, /assets/hero-image-768.webp 768w, /assets/hero-image-1280.webp 1280w, /assets/hero-image-1920.webp 1920w"
            sizes="100vw"
          />
          <img
            alt=""
            className="hero-bg"
            decoding="async"
            fetchPriority="high"
            height="1280"
            src="/assets/hero-image-1920.jpg"
            width="1920"
          />
        </picture>

        <div className="container">
          <p className="hero-eyebrow">SINCE 1922</p>
          <h1 className="hero-title">{home.heroTitle}</h1>
          <p className="hero-subtitle">{home.heroSubtitle}</p>
        </div>
      </section>

      <div className="container page-content">
        <section className="page-section fade-up">
          <h2 className="section-title">{about.title}</h2>
          <div className="prose">
            <p>{home.description}</p>
          </div>
        </section>

        <ContactSection withHeading />
      </div>
    </>
  )
}

export default Home
