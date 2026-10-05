import { useState } from "react";
import { Helmet } from "react-helmet-async";
import content from "../../content/content.json";
import membersData from "../../content/members.json";
import design from "../../content/team-design.json";
import "../styles/team.css";

const YEARS = ["4年", "3年", "2年", "1年"];
const ENGLISH_YEARS = {
  "4年": "FOURTH YEAR",
  "3年": "THIRD YEAR",
  "2年": "SECOND YEAR",
  "1年": "FIRST YEAR",
};
const normalize = (name) => name.replace(/\s/g, "");
const roles = ["Captain", "ViceCaptain", "Manager"];

function Photo({ src, alt, className, fallback, loading = "lazy" }) {
  const [failed, setFailed] = useState(false);
  return src && !failed ? (
    <img
      src={src}
      alt={alt}
      className={className}
      loading={loading}
      onError={() => setFailed(true)}
    />
  ) : (
    fallback
  );
}

function Placeholder() {
  return (
    <div className="roster-placeholder" aria-label="写真準備中">
      <span className="roster-placeholder-word" aria-hidden="true">
        KEIO
      </span>
      <img src="/assets/icons/logo512.png" alt="" width="64" height="64" />
      <span className="roster-placeholder-label">GOLF TEAM</span>
      <span className="roster-placeholder-note">写真準備中</span>
    </div>
  );
}

function Team() {
  const { team } = content;
  const [gender, setGender] = useState("male");
  const [yearFilter, setYearFilter] = useState("all");
  const years = YEARS.filter((year) =>
    membersData.members.some((m) => m.year === year),
  );
  const visible = membersData.members.filter(
    (m) =>
      m.gender === gender && (yearFilter === "all" || m.year === yearFilter),
  );
  const labels = [team.captainLabel, team.viceCaptainLabel, team.managerLabel];
  const roleIndex = (m) =>
    roles.findIndex(
      (role) =>
        normalize(m.name) ===
        normalize(
          membersData.captains[
            `${m.gender === "male" ? "men" : "women"}${role}`
          ] || "",
        ),
    );
  const rank = (m) => (roleIndex(m) < 0 ? 3 : roleIndex(m));

  return (
    <div className="roster-page">
      <Helmet>
        <title>部員紹介 | 慶應義塾體育會ゴルフ部</title>
        <meta
          name="description"
          content="慶應義塾體育會ゴルフ部の部員紹介。男子・女子、各学年のメンバーをご紹介します。"
        />
        <link rel="canonical" href="https://keiogolf.com/member" />
      </Helmet>
      <div className="container roster-intro">
        <p className="roster-eyebrow">
          KEIO UNIVERSITY GOLF TEAM <span>EST. 1922</span>
        </p>
        <div className="roster-title-row">
          <h1>
            <span>MEET</span> THE TEAM
            <span className="roster-japanese-title">{team.title}</span>
          </h1>
          <p className="roster-intro-note">
            コースで出会う、
            <br />
            私たちのチーム。
          </p>
        </div>
        <div className="roster-collage">
          <div className="roster-scene roster-scene-main">
            <Photo
              key={design.hero.main}
              src={design.hero.main}
              alt="慶應義塾體育會ゴルフ部の集合写真"
              loading="eager"
              fallback={<div className="roster-scene-empty">KEIO GOLF</div>}
            />
            <span className="roster-caption">TOGETHER ON THE COURSE</span>
          </div>
          <div className="roster-scene roster-scene-action">
            <Photo
              key={design.hero.action}
              src={design.hero.action}
              alt="ゴルフ部の練習風景"
              fallback={
                <div className="roster-editorial">
                  <span>ON THE</span>
                  <strong>COURSE.</strong>
                  <span className="roster-editorial-rule" />
                  <span>KEIO GOLF / EST. 1922</span>
                </div>
              }
            />
          </div>
          <div className="roster-scene roster-scene-team">
            <Photo
              key={design.hero.team}
              src={design.hero.team}
              alt="ゴルフ部のチームの風景"
              fallback={
                <div className="roster-emblem">
                  <img
                    src="/assets/icons/logo512.png"
                    alt=""
                    width="64"
                    height="64"
                  />
                  <span>ONE TEAM.</span>
                </div>
              }
            />
          </div>
        </div>
      </div>
      <div className="roster-directory">
        <div className="container">
          <div className="roster-filters">
            <div
              className="roster-gender"
              role="group"
              aria-label="男女で絞り込み"
            >
              {[
                ["male", team.menLabel, "MEN"],
                ["female", team.womenLabel, "WOMEN"],
              ].map(([value, label, english]) => (
                <button
                  key={value}
                  type="button"
                  aria-pressed={gender === value}
                  onClick={() => setGender(value)}
                >
                  <span>{english}</span>
                  {label}
                </button>
              ))}
            </div>
            <div
              className="roster-years"
              role="group"
              aria-label="学年で絞り込み"
            >
              {["all", ...years].map((year) => (
                <button
                  type="button"
                  key={year}
                  aria-pressed={yearFilter === year}
                  onClick={() => setYearFilter(year)}
                >
                  {year === "all" ? "すべて" : year}
                </button>
              ))}
            </div>
          </div>
          <p className="roster-result" role="status" aria-live="polite">
            {gender === "male" ? team.menLabel : team.womenLabel} /{" "}
            {yearFilter === "all" ? "全学年" : yearFilter}{" "}
            <span>{visible.length}名</span>
          </p>
          {years
            .filter((year) => yearFilter === "all" || yearFilter === year)
            .map((year) => {
              const group = visible
                .filter((m) => m.year === year)
                .sort((a, b) => rank(a) - rank(b));
              if (!group.length) return null;
              return (
                <section
                  className="roster-year-section"
                  key={year}
                  aria-labelledby={`roster-year-${year}`}
                >
                  <div className="roster-year-heading">
                    <div>
                      <span>{ENGLISH_YEARS[year]}</span>
                      <h2 id={`roster-year-${year}`}>{year}生</h2>
                    </div>
                    <span className="roster-year-count">
                      {String(group.length).padStart(2, "0")} MEMBERS
                    </span>
                  </div>
                  <ul className="roster-grid">
                    {group.map((m) => (
                      <li key={`${m.gender}-${m.name}`} className="roster-card">
                        <div className="roster-portrait">
                          <Photo
                            key={m.photo || m.name}
                            src={m.photo ? `/assets/members/${m.photo}` : ""}
                            alt=""
                            className="roster-member-photo"
                            fallback={<Placeholder />}
                          />
                          {roleIndex(m) >= 0 && (
                            <span className="roster-role">
                              {labels[roleIndex(m)]}
                            </span>
                          )}
                        </div>
                        <div className="roster-card-info">
                          <p className="roster-card-meta">
                            KEIO GOLF <span>{m.year}</span>
                          </p>
                          <h3>{m.name}</h3>
                        </div>
                      </li>
                    ))}
                  </ul>
                </section>
              );
            })}
          {visible.length === 0 && (
            <p className="roster-empty">この条件に該当する部員はいません。</p>
          )}
          <div className="roster-signoff">
            <span>KEIO UNIVERSITY GOLF TEAM</span>
            <span>EST. 1922</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Team;
