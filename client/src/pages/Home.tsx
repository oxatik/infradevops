import { useEffect, useMemo, useState, type FormEvent } from "react";
import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  Code2,
  ExternalLink,
  Github,
  Mail,
  Menu,
  Radio,
  Server,
  ShieldCheck,
  Send,
  Sparkles,
  Terminal,
  Workflow,
  X,
} from "lucide-react";

// Terminal Noir reminder: this page is an operator field notebook—precise metadata,
// asymmetric sections, dark graphite surfaces, and acid-signal interactions.

const ASSETS = {
  hero: "/manus-storage/infradevops-hero-network_de2f908c.png",
  module: "/manus-storage/infradevops-module-art_33fd964f.png",
  timeline: "/manus-storage/infradevops-timeline-art_52de877e.png",
  avatar: "/manus-storage/infradevops-avatar_7884d1a7.png",
  logo: "/manus-storage/infradevops-ci-logo_65ebf927.jpg",
};

const roles = ["Blockchain DevOps", "Node Operator", "Testnet Hunter", "Infrastructure Engineer"];
const navItems = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Capabilities" },
  { href: "#journey", label: "Journey" },
  { href: "#projects", label: "Nodes" },
];

const services = [
  { index: "01", title: "Testnet Node Operations", description: "Running validators, full nodes, and RPC endpoints for emerging L1/L2 protocols. Specializing in Miden, Celestia, and modular blockchain infrastructure.", icon: Server, accent: "green", meta: "VALIDATORS / RPC / SYSTEMD", command: "$ journalctl -u miden-node -f" },
  { index: "02", title: "Security & Faucet Testing", description: "Rate limit analysis, PoW challenge validation, and API stress testing. Finding the weak seams in token distribution before mainnet.", icon: ShieldCheck, accent: "lime", meta: "POW / RATE LIMITS / API", command: "$ k6 run faucet-stress.js" },
  { index: "03", title: "DevOps Automation", description: "CI/CD pipelines, infrastructure-as-code, automated monitoring and alerting. Turning manual node deployment into one-click operations.", icon: Workflow, accent: "blue", meta: "CI/CD / OBSERVABILITY / IAC", command: "$ terraform plan -out=live.tfplan" },
  { index: "04", title: "Open Source Contribution", description: "Active contributor to the 0xMiden ecosystem: detailed bug reports, reproducible edge cases, and documentation that helps the next operator.", icon: Github, accent: "violet", meta: "GITHUB / DOCS / REPRO", command: "$ gh issue view --comments" },
];

const journey = [
  { year: "2024", title: "The First Node", body: "Started with a single Ubuntu VPS. Learned Linux, SSH, systemd, and log analysis the hard way. First testnet: Miden. First lesson: always check your firewall rules.", command: "$ systemctl status ambition" },
  { year: "2025", title: "Miden Testnet Deep Dive", body: "Deployed miden-client and miden-faucet-client, then ran rate-limit analysis across 100+ sequential requests. Testnet tokens have no value; testnet experience is priceless.", command: "$ ./scripts/observe --protocol miden" },
  { year: "2025", title: "Security Testing & Bug Hunting", body: "Analyzed faucet API behavior under concurrent load. Validated rate limiting, PoW difficulty scaling, and account-based throttling. Contributed issue reports to 0xMiden/faucet and 0xMiden/wallet.", command: "$ k6 run faucet-stress.js" },
  { year: "2026", title: "Infrastructure at Scale", body: "Built automated deployment scripts for multi-node operations. Monitoring with Prometheus/Grafana. Backup strategies for validator keys. The VPS became a data center mindset.", command: "$ terraform apply -var nodes=multi" },
];

const projects = [
  { title: "Miden Blockchain", status: "Testnet Active", statusTone: "active", description: "Running full node, faucet client, and smart contract deployment pipeline. Contributed to wallet and faucet issue tracking.", tags: ["Rust", "gRPC", "PoW", "Testnet"], href: "https://github.com/oxatik", metric: "01 / NODE" },
  { title: "Portfolio Site", status: "Live", statusTone: "live", description: "This portfolio. Built with a modern web stack and deployed on Cloudflare Pages. Proof that infrastructure engineers can ship calm frontend code too.", tags: ["React", "Cloudflare", "CI/CD"], href: "https://infradevops.xyz", metric: "02 / SHIP" },
  { title: "Open Source Contributions", status: "Contributing", statusTone: "contributing", description: "Active issue reporter and tester for the 0xMiden ecosystem. Rate-limit testing, documentation improvements, and community support.", tags: ["GitHub", "Testing", "Docs"], href: "https://github.com/oxatik", metric: "03 / TRACE" },
];

function useReveal() {
  useEffect(() => {
    const nodes = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    }), { threshold: 0.12 });
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);
}

function SectionLabel({ index, children }: { index: string; children: string }) {
  return <div className="section-label"><span className="section-label__index">[{index}]</span><span>{children}</span><span className="section-label__line" aria-hidden="true" /></div>;
}

function StatusPill({ label, tone = "active" }: { label: string; tone?: string }) {
  return <span className={`status-pill status-pill--${tone}`}><span className="status-pill__dot" aria-hidden="true" />{label}</span>;
}

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [roleIndex, setRoleIndex] = useState(0);
  const [typedRole, setTypedRole] = useState(roles[0]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isNavSolid, setIsNavSolid] = useState(false);
  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" });
  useReveal();

  useEffect(() => {
    const currentRole = roles[roleIndex];
    const speed = isDeleting ? 45 : 82;
    const delay = !isDeleting && typedRole === currentRole ? 1600 : speed;
    const timer = window.setTimeout(() => {
      if (!isDeleting && typedRole === currentRole) setIsDeleting(true);
      else if (isDeleting && typedRole === "") {
        setIsDeleting(false);
        setRoleIndex((current) => (current + 1) % roles.length);
      } else {
        setTypedRole(isDeleting ? currentRole.slice(0, typedRole.length - 1) : currentRole.slice(0, typedRole.length + 1));
      }
    }, delay);
    return () => window.clearTimeout(timer);
  }, [isDeleting, roleIndex, typedRole]);

  useEffect(() => {
    const onScroll = () => setIsNavSolid(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const currentDate = useMemo(() => new Intl.DateTimeFormat("en", { month: "short", year: "numeric" }).format(new Date()), []);
  const closeMenu = () => setMenuOpen(false);
  const handleContactSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const subject = contactForm.name ? `Protocol inquiry from ${contactForm.name}` : "Protocol inquiry";
    const body = `Name: ${contactForm.name}\nEmail: ${contactForm.email}\n\nMessage:\n${contactForm.message}`;
    window.location.href = `mailto:hello@infradevops.xyz?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">Skip to content</a>

      <div className="top-telemetry" aria-label="System status"><div className="top-telemetry__inner"><span className="top-telemetry__signal"><span /> SYS.ONLINE</span><span className="top-telemetry__message">Blockchain infrastructure / field notes from the edge</span><span className="top-telemetry__date">{currentDate} <span>/</span> UTC+6</span></div></div>

      <header className={`site-nav ${isNavSolid ? "site-nav--solid" : ""}`}><div className="site-nav__inner">
        <a href="#top" className="brand-lockup" onClick={closeMenu} aria-label="infradevops.xyz home"><span className="brand-lockup__monogram"><img src="assets/infra-logo.svg" alt="" style={{ height: "1em", verticalAlign: "-0.125em", width: "auto", display: "inline-block" }} /></span></a>
        <nav className={`desktop-nav ${menuOpen ? "desktop-nav--open" : ""}`} aria-label="Primary navigation">
          {navItems.map((item, index) => <a key={item.href} href={item.href} onClick={closeMenu}><span>0{index + 1}</span>{item.label}</a>)}
          <a className="nav-social" href="https://x.com/ATIKURR420" target="_blank" rel="noreferrer" onClick={closeMenu}><span aria-hidden="true">𝕏</span> X / Twitter <ExternalLink size={13} /></a>
          <a className="nav-contact" href="mailto:hello@infradevops.xyz" onClick={closeMenu}>Open a channel <ArrowUpRight size={14} /></a>
        </nav>
        <button className="menu-toggle" type="button" onClick={() => setMenuOpen((open) => !open)} aria-expanded={menuOpen} aria-label={menuOpen ? "Close navigation" : "Open navigation"}>{menuOpen ? <X size={21} /> : <Menu size={21} />}</button>
      </div></header>

      <aside className="section-rail" aria-label="Field note section index"><span className="section-rail__title">FIELD<br />NOTE</span><span className="section-rail__line" /><nav className="section-rail__links"><a href="#top" aria-label="Go to introduction">00</a><a href="#about" aria-label="Go to about">01</a><a href="#services" aria-label="Go to capabilities">02</a><a href="#journey" aria-label="Go to journey">03</a><a href="#projects" aria-label="Go to nodes">04</a><a href="#contact" aria-label="Go to contact">05</a></nav><span className="section-rail__year">26 / SYS</span></aside>

      <main id="main-content">
        <section id="top" className="hero-section" aria-labelledby="hero-title">
          <div className="hero-section__backdrop" style={{ backgroundImage: `url(${ASSETS.hero})` }} aria-hidden="true" /><div className="hero-section__grid" aria-hidden="true" />
          <div className="container hero-layout">
            <div className="hero-copy" data-reveal="up"><div className="eyebrow eyebrow--signal"><span className="eyebrow__dot" /> AVAILABLE FOR PROTOCOL WORK <span className="eyebrow__slash">//</span> 2026</div><h1 id="hero-title">Hello, I&apos;m<br /><span className="hero-title__signal">INFRA</span><br /><span className="hero-title__outline">DEVOPS</span></h1><div className="hero-role"><span className="hero-role__prompt">&gt;_</span><span>{typedRole}</span><span className="typing-caret" aria-hidden="true" /></div><p className="hero-intro">I build, test, and operate blockchain infrastructure at scale. When a protocol needs a node in the wild, I&apos;m usually already looking at the logs.</p><div className="hero-actions"><a className="button button--primary" href="#projects">View my nodes <ArrowDownRight size={16} /></a><a className="button button--text" href="https://github.com/oxatik" target="_blank" rel="noreferrer">github.com/oxatik <ExternalLink size={14} /></a></div><div className="hero-footnote"><span>Scroll to inspect</span><span className="hero-footnote__line" /><span>01 — 06</span></div></div>
            <div className="hero-console" data-reveal="left" style={{ transitionDelay: "160ms" }}><div className="console-card"><div className="console-card__topbar"><span className="window-lights"><i /><i /><i /></span><span>node-monitor / live</span><span className="console-card__topbar-right">v2.06</span></div><div className="console-card__identity"><div className="avatar-frame"><img src={ASSETS.avatar} alt="Geometric ID avatar" /><span className="avatar-frame__scan" /></div><div><p className="console-kicker">OPERATOR PROFILE</p><h2>O. XATIK</h2><p className="console-muted">Blockchain infrastructure / Dhaka</p></div></div><div className="console-stats"><div><span>UPTIME</span><strong>99.98<span>%</span></strong></div><div><span>NETWORKS</span><strong>04</strong></div><div><span>MODE</span><strong>24/7</strong></div></div><div className="console-log"><div><span className="log-time">00:00:01</span><span className="log-ok">OK</span><span>miden-node handshake</span></div><div><span className="log-time">00:00:02</span><span className="log-ok">OK</span><span>faucet rate limits verified</span></div><div><span className="log-time">00:00:03</span><span className="log-warn">••</span><span>watching for edge cases</span></div></div><div className="console-footer"><StatusPill label="ALL SYSTEMS NOMINAL" /><span>last ping 14ms</span></div></div><div className="hero-console__float hero-console__float--top"><Radio size={14} /><span>signal found</span></div><div className="hero-console__float hero-console__float--bottom"><Activity size={14} /><span>observability first</span></div><div className="hero-signature"><span className="hero-signature__monogram"><img src="assets/infra-logo.svg" alt="" style={{ height: "1em", verticalAlign: "-0.125em", width: "auto", display: "inline-block" }} /></span><span>MARK<br /><strong>INFRA / DEVOPS</strong></span></div></div>
          </div>
          <div className="hero-scroll"><ChevronDown size={15} /><span>01 / HELLO</span></div>
        </section>

        <div className="signal-marquee" aria-hidden="true"><div className="signal-marquee__track"><span>NODE OPERATIONS</span><i /> <span>SECURITY TESTING</span><i /> <span>DEVOPS AUTOMATION</span><i /> <span>OPEN SOURCE</span><i /> <span>NODE OPERATIONS</span><i /> <span>SECURITY TESTING</span><i /> <span>DEVOPS AUTOMATION</span><i /></div></div>

        <section id="about" className="section about-section"><div className="container about-layout"><div className="section-aside" data-reveal="up"><SectionLabel index="01">About me</SectionLabel><p className="aside-note">A field notebook for machines, protocols, and the person who keeps them moving.</p><div className="aside-rule" /><span className="aside-code">ID / 0XATIK / 2026</span></div><div className="about-main"><div className="section-heading" data-reveal="up"><p className="section-kicker">Digital infrastructure architect</p><h2>I keep the chain moving when the docs end.</h2><p className="section-lead">My journey started with a single VPS and grew into a multi-chain testing operation. I specialize in early-stage protocol validation, security-minded faucet testing, and DevOps automation that turns fragile steps into repeatable systems.</p></div><div className="stat-grid" data-reveal="up" style={{ transitionDelay: "120ms" }}><div className="stat-card"><span className="stat-card__index">/ 01</span><strong>10<span>+</span></strong><p>Testnets participated</p></div><div className="stat-card"><span className="stat-card__index">/ 02</span><strong>100K<span>+</span></strong><p>Lines of logs analyzed</p></div><div className="stat-card stat-card--signal"><span className="stat-card__index">/ 03</span><strong>24<span>/7</span></strong><p>Node uptime mindset</p></div></div></div></div></section>

        <section id="services" className="section services-section"><div className="section-art section-art--services" style={{ backgroundImage: `url(${ASSETS.module})` }} aria-hidden="true" /><div className="section-art__caption"><span>NETMAP / 04:19</span><span><i /> ROUTING STABLE</span></div><div className="container"><div className="section-header section-header--split" data-reveal="up"><div><SectionLabel index="02">What I do</SectionLabel><h2>Systems that survive<br /><em>contact with reality.</em></h2></div><p>From first boot to post-mortem, the work is practical: provision it, observe it, stress it, document what happened.</p></div><div className="service-grid">{services.map((service, index) => { const Icon = service.icon; return <article className={`service-card service-card--${service.accent}`} key={service.title} data-reveal="up" style={{ transitionDelay: `${index * 80}ms` }}><div className="service-card__top"><span className="service-card__index">{service.index}</span><Icon size={22} strokeWidth={1.5} /></div><h3>{service.title}</h3><p>{service.description}</p><code className="service-card__command">{service.command}</code><div className="service-card__meta"><span>{service.meta}</span><ArrowUpRight size={14} /></div></article>; })}</div></div></section>

        <section id="journey" className="section journey-section"><div className="container"><div className="section-header section-header--timeline" data-reveal="up"><div><SectionLabel index="03">My journey</SectionLabel><h2>From VPS to<br /><em>blockchain infrastructure.</em></h2></div><div className="timeline-stamp"><span>RUNBOOK / 004</span><strong>Built in public.<br />Learned in production.</strong></div></div><div className="timeline-visual" data-reveal="up" style={{ backgroundImage: `url(${ASSETS.timeline})` }}><div className="timeline-visual__overlay"><span className="timeline-visual__label">INFRASTRUCTURE / FIELD RECORD</span><span className="timeline-visual__value">4 nodes / 1 operator / infinite logs</span></div></div><div className="timeline-list">{journey.map((item, index) => <article className={`timeline-item ${index % 2 === 1 ? "timeline-item--offset" : ""}`} key={item.title} data-reveal="up" style={{ transitionDelay: `${index * 70}ms` }}><div className="timeline-item__marker"><span>{String(index + 1).padStart(2, "0")}</span><i /></div><div className="timeline-item__content"><div className="timeline-item__meta"><span>{item.year}</span><span className="timeline-item__dash" /><span>LOG ENTRY</span></div><h3>{item.title}</h3><p>{item.body}</p><code>{item.command}</code></div></article>)}</div></div></section>

        <section id="projects" className="section projects-section"><div className="container"><div className="section-header section-header--projects" data-reveal="up"><div><SectionLabel index="04">Active nodes &amp; contributions</SectionLabel><h2>Proof of work,<br /><em>not promises.</em></h2></div><a className="inline-link" href="https://github.com/oxatik" target="_blank" rel="noreferrer">View GitHub activity <ArrowUpRight size={15} /></a></div><div className="project-list">{projects.map((project, index) => <a className="project-card" href={project.href} target="_blank" rel="noreferrer" key={project.title} data-reveal="up" style={{ transitionDelay: `${index * 90}ms` }}><div className="project-card__number">{project.metric}</div><div className="project-card__body"><div className="project-card__title"><h3>{project.title}</h3><StatusPill label={project.status} tone={project.statusTone} /></div><p>{project.description}</p><div className="tag-row">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></div><div className="project-card__arrow"><ArrowUpRight size={21} /></div></a>)}</div></div></section>

        <section className="section principles-section"><div className="container principles-layout"><div data-reveal="up"><SectionLabel index="05">Operating principles</SectionLabel><h2>The work is technical.<br /><em>The standard is human.</em></h2><p className="section-lead">No anonymous praise wall here. Just the rules I bring to every protocol, every bug report, and every node that has to stay alive through the night.</p></div><div className="principles-card" data-reveal="left" style={{ transitionDelay: "120ms" }}><div className="principles-card__top"><Terminal size={17} /><span>operator-notes.md</span><span>read-only</span></div><ol><li><span>01</span><div><strong>Reproduce before you report.</strong><p>A useful issue leaves a trail another engineer can follow.</p></div><Check size={17} /></li><li><span>02</span><div><strong>Observe the system, not just the command.</strong><p>Logs, metrics, and failure modes tell the real story.</p></div><Check size={17} /></li><li><span>03</span><div><strong>Document the next person&apos;s first hour.</strong><p>Good infrastructure work compounds when it is easy to inherit.</p></div><Check size={17} /></li></ol><div className="principles-card__footer"><span><Sparkles size={14} /> A real endorsement belongs to a real source.</span><span>01—03 / DONE</span></div></div></div></section>

        <section id="contact" className="contact-section"><div className="contact-section__grid" aria-hidden="true" /><div className="container contact-layout" data-reveal="up"><div className="contact-copy"><p className="section-kicker">Open a channel</p><h2>Have a protocol<br /><span>worth stress-testing?</span></h2><p className="contact-copy__intro">Send the brief, the bug, or the node spec. This form opens your email client with the details ready to send.</p><div className="contact-copy__links"><a href="mailto:hello@infradevops.xyz"><Mail size={14} /> hello@infradevops.xyz</a><a href="https://x.com/ATIKURR420" target="_blank" rel="noreferrer"><span className="contact-copy__x" aria-hidden="true">𝕏</span> @ATIKURR420 <ExternalLink size={13} /></a></div></div><form className="contact-form" onSubmit={handleContactSubmit}><div className="contact-form__top"><span><span className="contact-form__status" /> MESSAGE RELAY</span><span>LOCAL MAIL CLIENT</span></div><div className="contact-form__fields"><label htmlFor="contact-name">Name<input id="contact-name" name="name" type="text" placeholder="Your name" autoComplete="name" value={contactForm.name} onChange={(event) => setContactForm((current) => ({ ...current, name: event.target.value }))} required /></label><label htmlFor="contact-email">Email<input id="contact-email" name="email" type="email" placeholder="you@company.com" autoComplete="email" value={contactForm.email} onChange={(event) => setContactForm((current) => ({ ...current, email: event.target.value }))} required /></label></div><label htmlFor="contact-message">Message<textarea id="contact-message" name="message" placeholder="Tell me what you are building or testing..." rows={5} value={contactForm.message} onChange={(event) => setContactForm((current) => ({ ...current, message: event.target.value }))} required /></label><div className="contact-form__footer"><span>Encrypted by your own email provider.</span><button className="button button--primary" type="submit">Compose email <Send size={15} /></button></div></form></div></section>
      </main>

      <footer className="site-footer"><div className="container site-footer__top"><a href="#top" className="brand-lockup"><span className="brand-lockup__monogram"><img src="assets/infra-logo.svg" alt="" style={{ height: "1em", verticalAlign: "-0.125em", width: "auto", display: "inline-block" }} /></span></a><p>This site runs on Cloudflare Pages.<br />My nodes run on bare metal.</p><div className="footer-links"><a href="https://github.com/oxatik" target="_blank" rel="noreferrer"><Github size={15} /> GitHub</a><a href="https://x.com/ATIKURR420" target="_blank" rel="noreferrer"><span className="footer-links__x" aria-hidden="true">𝕏</span> X / Twitter</a><a href="#top"><Code2 size={15} /> Back to top</a></div></div><div className="container site-footer__bottom"><span>© 2026 / Built by a Node Operator</span><span>All systems nominal <i /></span></div></footer>
    </div>
  );
}

export default Home;
