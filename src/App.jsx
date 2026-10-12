import { useEffect, useRef, useState } from 'react'
import Plane from './Plane'
import { AGENCY, DEST, SERVICES, WA_NUMBER, wa } from './data'

const FB = 'https://web.facebook.com/Star.Travel.Agency10'

// Hash routing: #/destination/istanbul -> destination page, #/contact -> contact page, else home
const parse = () => {
  if (location.hash === '#/contact') return 'contact'
  const m = location.hash.match(/^#\/destination\/(\w+)$/)
  return m && DEST[m[1]] ? m[1] : null
}
function useRoute() {
  const [id, setId] = useState(parse)
  useEffect(() => {
    const f = () => setId(parse())
    addEventListener('hashchange', f)
    return () => removeEventListener('hashchange', f)
  }, [])
  return id
}

function Btn({ name, alt, green, children }) {
  const msg = `Bonjour Star Travel, je souhaite un devis${name ? ' pour ' + name : ''}.`
  return (
    <a className={'btn' + (alt ? ' alt' : '') + (green ? ' wa' : '')} href={wa(msg)} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  )
}

function Header({ name }) {
  return (
    <div className="wrap">
      <header>
        <a className="logo" href="/"><i>★</i> Star Travel</a>
        <nav>
          <a href="#services">Services</a>
          <a href="#destinations">Destinations</a>
          <a href="#/contact">Contact</a>
        </nav>
        <Btn name={name}>Demander un devis</Btn>
      </header>
    </div>
  )
}

function Home() {
  const stage = useRef(null)
  const [on, setOn] = useState(false)
  return (
    <>
      <div className="wrap hero">
        <div>
          <h1>Votre voyage commence à Bouira.</h1>
          <p>Billets d'avion, Omra, visas, hôtels et séjours organisés. Une équipe locale qui s'occupe de tout, de la réservation jusqu'au retour.</p>
          <div className="cta">
            <Btn>Demander un devis</Btn>
            <a className="btn alt" href="#destinations">Voir les destinations</a>
          </div>
        </div>
        <div id="stage" ref={stage} className={on ? 'on' : ''}>
          {/* Fallback shown if WebGL is unavailable */}
          <div className="pass">
            <div className="row"><small>DÉPART</small><small>ARRIVÉE</small></div>
            <div className="row"><span className="code">ALG</span><span className="mid" /><span className="code">IST</span></div>
            <div className="row"><small>Alger</small><small>Istanbul</small></div>
            <div className="tear" />
            <div className="meta">
              <div><small>AGENCE</small><br />Star Travel</div>
              <div><small>VILLE</small><br />Bouira</div>
              <div><small>CLASSE</small><br />Sur mesure</div>
            </div>
          </div>
          <span className="hint">Faites défiler pour décoller</span>
        </div>
      </div>
      <Plane stageRef={stage} onReady={setOn} />

      <section id="services"><div className="wrap">
        <h2>Ce que nous organisons pour vous</h2>
        <p className="lead">Un seul interlocuteur pour préparer votre départ, sans file d'attente ni démarches compliquées.</p>
        <div className="svc">
          {SERVICES.map(([ico, t, x]) => (
            <div key={t}><span>{ico}</span><div><h3>{t}</h3><p>{x}</p></div></div>
          ))}
        </div>
      </div></section>

      <section id="destinations"><div className="wrap">
        <h2>Destinations populaires</h2>
        <p className="lead">Choisissez une destination pour voir les offres et les documents nécessaires.</p>
        <div className="dest">
          {Object.entries(DEST).map(([k, d]) => (
            <a key={k} className={'tile ' + d.cls} href={'#/destination/' + k}>
              <b>{d.code}</b>
              <div><h3>{d.name}</h3><small>{d.sub}</small></div>
            </a>
          ))}
        </div>
      </div></section>
    </>
  )
}

function Destination({ d }) {
  return (
    <main className="wrap">
      <a className="back" href="#destinations">← Toutes les destinations</a>
      <div className={'dhead ' + d.cls}>
        <div>
          <h1>{d.name}</h1>
          <p>{d.tag}</p>
          <Btn name={d.name}>Demander un devis</Btn>
        </div>
        <b aria-hidden="true">{d.code}</b>
      </div>
      <div className="facts">
        {d.facts.map(([k, v]) => <div key={k}><small>{k}</small>{v}</div>)}
      </div>
      <div className="dgrid">
        <div>
          <h2>Annonces et offres</h2>
          {d.posts.map((p) => (
            <article className="post" key={p.t}>
              <div className="who">
                <span className="av">★</span>
                <div><b>Star Travel</b><small>Exemple d'annonce</small></div>
              </div>
              <h3>{p.t}</h3>
              <p>{p.x}</p>
              <Btn alt name={d.name}>Je suis intéressé</Btn>
            </article>
          ))}
        </div>
        <aside className="need">
          <h2>Ce qu'il vous faut</h2>
          <ul>
            {d.need.map(([t, x]) => (
              <li key={t}><i>✓</i><div><b>{t}</b><span>{x}</span></div></li>
            ))}
          </ul>
          <p className="note">Conditions indicatives, mises à jour en octobre 2026. L'agence confirme les règles en vigueur avant votre réservation.</p>
        </aside>
      </div>
    </main>
  )
}

function Cta({ name }) {
  return (
    <section><div className="wrap">
      <div className="contact one">
        <div>
          <h2>Parlons de votre prochain départ</h2>
          <p>Écrivez-nous sur WhatsApp ou passez à l'agence.</p>
          <p className="row2">
            <Btn name={name} green>Écrire sur WhatsApp</Btn>
            <a className="btn alt light" href="#/contact">Nous trouver</a>
          </p>
        </div>
      </div>
    </div></section>
  )
}

function ContactPage() {
  const [f, setF] = useState({ name: '', dest: '', msg: '' })
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value })
  const send = (e) => {
    e.preventDefault()
    const text = `Bonjour Star Travel, je m'appelle ${f.name || '...'}.` +
      (f.dest ? ` Je suis intéressé(e) par : ${f.dest}.` : '') + (f.msg ? ` ${f.msg}` : '')
    window.open(wa(text), '_blank', 'noopener')
  }
  const q = encodeURIComponent(AGENCY.mapQuery)
  return (
    <main className="wrap cpage">
      <h1 className='wrap-heading-title'>Contact</h1>
      <p className="lead">Une question, un devis, un dossier de visa ? Écrivez-nous ou passez nous voir à Bouira.</p>
      <div className="cgrid">
        <div className='cgridInner'>
          <ul className="clist">
            <li><span>💬</span><div><b>WhatsApp</b><a href={wa('Bonjour Star Travel, j\'ai une question.')} target="_blank" rel="noopener noreferrer">Écrire maintenant</a></div></li>
            <li><span>📞</span><div><b>Téléphone</b><a href={`tel:+${WA_NUMBER}`}>{AGENCY.phone}</a></div></li>
            <li><span>📍</span><div><b>Adresse</b>{AGENCY.address}</div></li>
            <li><span>🕘</span><div><b>Horaires</b>{AGENCY.hours}</div></li>
            <li><span>👍</span><div><b>Facebook</b><a href={FB} target="_blank" rel="noopener noreferrer">Star Travel Agency</a></div></li>
          </ul>
          <form className="cform" onSubmit={send}>
            <h2>Envoyer un message</h2>
            <label>Votre nom<input value={f.name} onChange={set('name')} autoComplete="name" /></label>
            <label>Destination
              <select value={f.dest} onChange={set('dest')}>
                <option value="">Autre / je ne sais pas encore</option>
                {Object.values(DEST).map((x) => <option key={x.name}>{x.name}</option>)}
              </select>
            </label>
            <label>Message<textarea rows="4" value={f.msg} onChange={set('msg')} /></label>
            <button className="btn wa" type="submit">Envoyer sur WhatsApp</button>
          </form>
        </div>
        <div className="mapbox">
          <iframe
            title="Localisation de Star Travel à Bouira"
            src={`https://www.google.com/maps?q=${q}&output=embed`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <a className="btn alt" href={`https://www.google.com/maps/search/?api=1&query=${q}`} target="_blank" rel="noopener noreferrer">Ouvrir dans Google Maps</a>
        </div>
      </div>
    </main>
  )
}

export default function App() {
  const id = useRoute()
  const contact = id === 'contact'
  const d = id && !contact ? DEST[id] : null

  useEffect(() => {
    document.title = contact ? 'Contact – Star Travel' : d ? `${d.name} – Star Travel` : 'Star Travel – Agence de voyages à Bouira'
    const target = !d && location.hash.length > 1 && document.getElementById(location.hash.slice(1))
    target ? target.scrollIntoView() : scrollTo(0, 0)
  }, [id])

  return (
    <>
      <div className="demo">Nouvelle offre : une nouvelle destination a été ajoutée, découvrez-la dès maintenant.</div>
      <Header name={d?.name} />
      {contact ? <ContactPage /> : d ? <Destination d={d} /> : <Home />}
      {!contact && <Cta name={d?.name} />}
      <footer>© 2026 Star Travel · Bouira</footer>
    </>
  )
}