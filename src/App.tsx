
import { projects } from './data/projects'
import { useEffect, useRef, useState } from 'react'
import './App.css'


function ProjectImage({
  src,
  alt,
  onClick,
}: {
  src: string
  alt: string
  onClick: () => void
}) {
  return (
    <button
      className="project-image-button"
      onClick={onClick}
      aria-label={`Enlarge image: ${alt}`}
      type="button"
    >
      <span className="image-placeholder">PROJECT IMAGE</span>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onError={(event) => {
          event.currentTarget.style.display = 'none'
        }}
      />
      <span className="image-zoom-icon">↗</span>
    </button>
  )
}

function App() {
  const [opened, setOpened] = useState<number | null>(null)
  const [activeProject, setActiveProject] = useState<number | null>(null)
  const [activeImage, setActiveImage] = useState<number | null>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const previousFocus = useRef<HTMLElement | null>(null)
  const [showOtherProjects, setShowOtherProjects] = useState(false)

  const project =
    activeProject === null ? null : projects[activeProject]

  function toggleFolder(index: number) {
    setOpened(opened === index ? null : index)
  }

  function openProject(index: number) {
    previousFocus.current = document.activeElement as HTMLElement
    setActiveProject(index)
    setActiveImage(null)
  }

  function closeProject() {
    setActiveImage(null)
    setActiveProject(null)
    requestAnimationFrame(() => previousFocus.current?.focus())
  }

  function changeImage(direction: number) {
    setActiveImage((current) => {
      if (current === null || !project) return current
      return (
        current + direction + project.images.length
      ) % project.images.length
    })
  }

  useEffect(() => {
    if (activeProject === null) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()

    function handleKey(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        if (activeImage !== null) {
          setActiveImage(null)
        } else {
          closeProject()
        }
      }

      if (activeImage !== null && event.key === 'ArrowRight') {
        changeImage(1)
      }

      if (activeImage !== null && event.key === 'ArrowLeft') {
        changeImage(-1)
      }

      if (event.key === 'Tab') {
        const container = document.querySelector(
          activeImage !== null
            ? '.image-lightbox'
            : '.project-modal'
        )

        if (!container) return

        const elements = Array.from(
          container.querySelectorAll<HTMLElement>(
            'button:not([disabled]), a[href], [tabindex="0"]'
          )
        )

        const first = elements[0]
        const last = elements[elements.length - 1]

        if (!first || !last) return

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault()
          last.focus()
        } else if (
          !event.shiftKey &&
          document.activeElement === last
        ) {
          event.preventDefault()
          first.focus()
        }
      }
    }

    window.addEventListener('keydown', handleKey)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKey)
    }
  }, [activeProject, activeImage, project])

  return (
    <main>
      <header className="navigation">
        <a href="#home" className="logo">Veronika.</a>
        <nav>
          <a href="#work">Work</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <section className="hero" id="home">
        <p className="eyebrow">
          DESIGN WITH CLARITY. CREATE WITH FEELING.
        </p>

        <h1>HI, I'M VERONIKA.</h1>

        
<div className="avatar-space avatar-scene">

  {/* Soft background glows */}
  <div className="hero-glow hero-glow-pink" />
  <div className="hero-glow hero-glow-green" />

  {/* UX flow background */}
  <svg
    className="hero-flow"
    viewBox="0 0 1000 600"
    preserveAspectRatio="xMidYMid slice"
    aria-hidden="true"
  >
    <path d="M50 155 H260 V95 H410" />
    <path d="M590 95 H760 V190 H950" />
    <path d="M80 470 H270 V390 H430" />
    <path d="M570 390 H760 V490 H930" />
    <path d="M260 155 V310 H390" />

    <circle cx="260" cy="155" r="5" />
    <circle cx="760" cy="190" r="5" />
    <circle cx="270" cy="390" r="5" />
    <circle cx="760" cy="490" r="5" />
  </svg>

  {/* UX research card */}
  <div className="floating-ui-card floating-card-research">
    <span className="ui-card-label">01 / DISCOVER</span>
    <strong>UX Research</strong>
    <div className="research-lines">
      <span />
      <span />
      <span />
    </div>
    <div className="ui-card-bottom">
      <span className="ui-dot ui-dot-pink" />
      Human-centered
    </div>
  </div>

  {/* Interface design card */}
  <div className="floating-ui-card floating-card-design">
    <span className="ui-card-label">02 / DESIGN</span>
    <strong>UI Design</strong>
    <div className="mini-interface">
      <span className="mini-interface-top" />
      <div className="mini-interface-body">
        <span />
        <span />
        <span />
      </div>
    </div>
  </div>

  {/* User journey card */}
  <div className="floating-ui-card floating-card-flow">
    <span className="ui-card-label">03 / CONNECT</span>
    <strong>User Flows</strong>
    <div className="mini-flow">
      <span />
      <i />
      <span />
      <i />
      <span />
    </div>
  </div>

  {/* Original avatar */}
  <img
    src="/avatar.png"
    alt="Veronika's 3D avatar"
    className="avatar"
  />

</div>


        <p className="hero-role">
          UX/UI Designer & Digital Experience Designer
        </p>

        <div className="hero-bottom">
          <span>Thoughtful experiences. A human perspective.</span>
          <a href="#work">Explore My Work ↓</a>
        </div>
      </section>

      <section className="work" id="work">
        <p className="section-number">01 / SELECTED WORK</p>
        
<div className="work-heading-with-decoration">
  <h2>A few things I've designed.</h2>

  <img
    className="floating-3d-flower"
    src="/decorations/pink-flower.png"
    alt=""
    aria-hidden="true"
  />
</div>


        <div className="folder-stack">
          {projects.filter((item) => item.featured).map((item, index) => {
            const isOpen = opened === index

            return (
              <div
                className={`folder ${isOpen ? 'folder-open' : ''}`}
                key={item.name}
              >
                <button
                  type="button"
                  className="folder-header"
                  onClick={() => toggleFolder(index)}
                  aria-expanded={isOpen}
                >
                  <span className="folder-number">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <strong>{item.name}</strong>
                  <span className="folder-icon">
                    {isOpen ? '−' : '+'}
                  </span>
                </button>

                {isOpen && (
                  

<div className={`folder-preview ${index <= 5 ? 'featured-preview' : ''}`}>
  {index <= 5 ? (

    <>
      <div className="featured-intro">
        <div>
         

<span className="featured-category">
  {item.name === 'DENTSKILLS'
    ? 'UX/UI DESIGN · DIGITAL SERVICE'
    : item.name === 'HOWSPACE'
    ? 'UX/UI DESIGN · SERVICE DESIGN'
    : item.name === 'MAP MY TRIP'
    ? 'UX/UI DESIGN · DESIGN SPRINT'
    : item.name === 'RENDI'
  ? 'SERVICE DESIGN · UX/UI · FRONT-END'
  : item.name === 'CLICK & PICK'
  ? 'UX/UI DESIGN · MOBILE PROTOTYPING'
  : 'UX RESEARCH · AI-ASSISTED DESIGN'}
</span>


<h3>{item.name}.</h3>

<p>
  {item.name === 'DENTSKILLS'
    ? 'Reimagining practical skills assessment for dental education.'
    : item.name === 'HOWSPACE'
    ? 'Bringing people, ideas and collaboration together in one digital space.'
    : item.name === 'MAP MY TRIP'
    ? 'Turning museum travel inspiration into an interactive digital journey.'
    : item.name === 'RENDI'
  ? 'Making sports equipment more accessible through a digital rental experience.'
  : item.name === 'CLICK & PICK'
  ? 'Making grocery shopping easier with a seamless click-and-collect experience.'
  : 'Exploring how AI can support human-centered UX design, from research to evaluation.'}
</p>


        </div>

        <span className="featured-year">{item.period}</span>
      </div>

      <div className="featured-gallery">
        {item.images.slice(0, 3).map((src, imageIndex) => (
          <div
            key={src}
            className={`featured-image featured-image-${imageIndex + 1}`}
          >
            <ProjectImage
              src={src}
              alt={`${item.name} screenshot ${imageIndex + 1}`}
              onClick={() => {
                openProject(index)
                setActiveImage(imageIndex)
              }}
            />
            <span className="featured-image-label">
              

{(
  item.name === 'CLICK & PICK'
    ? ['01 / MOBILE APP', '02 / ONBOARDING', '03 / CAMPAIGN']
    : item.name === 'DENTSKILLS'
    ? ['01 / STUDENT', '02 / TEACHER', '03 / ADMIN']
    : item.name === 'HOWSPACE'
    ? ['01 / WORKSPACE', '02 / PRIORITIZATION', '03 / WORKSHOP']
    : item.name === 'MAP MY TRIP'
    ? ['01 / EXPLORE', '02 / MAP', '03 / POP-UP']
    : item.name === 'RENDI'
    ? ['01 / MOBILE APP', '02 / ONBOARDING', '03 / WEBSITE']
    : ['01 / FRAMEWORK', '02 / GOOGLE STITCH', '03 / COPILOT']
)[imageIndex]}


            </span>
          </div>
        ))}
      </div>

      <div className="featured-bottom">
        <div className="featured-role">
          <span>MY ROLE</span>
          <p>{item.role}</p>
        </div>

        <button
          className="featured-view-button"
          type="button"
          onClick={() => openProject(index)}
        >
          View Project <span>↗</span>
        </button>
      </div>
    </>
  ) : (
    <>
      <div className="thumbnails">
        {item.images.map((src, imageIndex) => (
          <ProjectImage
            key={src}
            src={src}
            alt={`${item.name} screenshot ${imageIndex + 1}`}
            onClick={() => {
              openProject(index)
              setActiveImage(imageIndex)
            }}
          />
        ))}
      </div>

      <p>{item.description}</p>
      <span className="project-role">{item.role}</span>

      <button
        className="view-button"
        type="button"
        onClick={() => openProject(index)}
      >
        View Project ↗
      </button>
    </>
  )}
</div>

                )}
              </div>
            )
          })}
        </div>
        
<div className="other-projects">
  <button
    type="button"
    className="other-projects-toggle"
    onClick={() => setShowOtherProjects((prev) => !prev)}
    aria-expanded={showOtherProjects}
  >
    <div>
      <span className="other-projects-label">
        02 / MORE WORK
      </span>
      <h3>Beyond UX.</h3>
<p>
  Website development, WordPress and e-commerce —
  bringing digital concepts to life.
</p>
    </div>

    <span className="other-projects-icon">
      {showOtherProjects ? '−' : '+'}
    </span>
  </button>

  {showOtherProjects && (
    <div className="other-projects-list">
      {projects
        .map((project, index) => ({ project, index }))
        .filter(({ project }) => !project.featured)
        
.map(({ project, index }) => (
  <button
    type="button"
    className="other-project-item other-project-card"
    key={project.name}
    onClick={() => openProject(index)}
  >
    <div className="other-project-card-content">
      <span className="other-project-name">
        {project.name}
      </span>
      <p>{project.description}</p>
      <span className="other-project-view">
        View Project ↗
      </span>
    </div>

    {project.images.length > 0 && (
      <div className="other-project-images">
        {project.images.slice(0, 3).map((src, imageIndex) => (
          <div
            className={`other-project-image other-project-image-${imageIndex + 1}`}
            key={src}
          >
            <img src={src} alt={`${project.name} screenshot ${imageIndex + 1}`} />
          </div>
        ))}
      </div>
    )}
  </button>
))}

    </div>
  )}
</div>

      </section>

      
<section className="about about-redesign" id="about">
  <p className="section-number">03 / ABOUT ME</p>

  
<div className="about-heading-with-decoration">
  <h2>Curiosity first. People always.</h2>

  <img
    src="/decorations/glass-orb.png"
    alt=""
    aria-hidden="true"
    className="floating-3d-orb"
  />
</div>


  <div className="about-intro">
    <p className="about-lead">
      A creative mind with a structured approach.
    </p>

    <p>
      I'm Veronika, a UX/UI and digital experience designer
      with a background in Business Information Technology.
    </p>

    <p>
      I combine human-centered design, research and project
      leadership to turn complex ideas into thoughtful digital
      experiences. I enjoy understanding people's needs,
      bringing structure to ideas and transforming them into
      intuitive solutions.
    </p>
  </div>


<div className="about-education">
  <div>
    <span className="education-label">
      EDUCATION
    </span>

    <h3>Bachelor of Business Administration (BBA)</h3>
    <p>Business Information Technology · Digital Services</p>
    <span className="education-school">
      Haaga-Helia University of Applied Sciences · 2026
    </span>
  </div>

  <div className="education-secondary">
    <h3>Double Qualification – Vocational & Matriculation Examinations</h3>
    <p>Vocational Qualification in Business (Merkonomi)</p>
    <span className="education-school">
      Business College Helsinki · 2020–2021
    </span>
  </div>
</div>


<div className="portfolio-documents">
  <span className="documents-label">DOCUMENTS</span>
  <h3>A little more about me.</h3>
  <p>Explore my experience, education and motivation.</p>

  <div className="document-links">
    <a href="/documents/veronika-cv.pdf" target="_blank" rel="noopener noreferrer">
      <span>↗</span>
      <strong>View CV</strong>
      <small>Curriculum Vitae · PDF</small>
    </a>

    <a href="/documents/veronika-cover-letter.pdf" target="_blank" rel="noopener noreferrer">
      <span>↗</span>
      <strong>Cover Letter</strong>
      <small>Introduction & motivation · PDF</small>
    </a>
  </div>
</div>

  <div className="about-expertise">
    <div className="expertise-card">
      <span>01 / HUMAN-CENTERED DESIGN</span>
      <h3>Designing for people.</h3>
      <p>
        Understanding user needs and creating experiences
        that feel intuitive and meaningful.
      </p>
    </div>

    <div className="expertise-card">
      <span>02 / PROJECT LEADERSHIP</span>
      <h3>Connecting the dots.</h3>
      <p>
        Bringing people, ideas and processes together
        to move projects forward.
      </p>
    </div>

    <div className="expertise-card">
      <span>03 / UX & UI DESIGN</span>
      <h3>From idea to interface.</h3>
      <p>
        Exploring user journeys, wireframes and
        interactive prototypes.
      </p>
    </div>

    <div className="expertise-card">
      <span>04 / DIGITAL INNOVATION</span>
      <h3>Always exploring.</h3>
      <p>
        Combining design thinking with technology,
        AI and creative problem-solving.
      </p>
    </div>
  </div>

  <div className="skills">
    {[
      'UX Research',
      'Service Design',
      'Figma',
      'Prototyping',
      'User Flows',
      'React',
      'AI-assisted Design',
      'Project Management',
    ].map((skill) => (
      <span key={skill}>{skill}</span>
    ))}
  </div>
</section>


      
<section className="contact contact-redesign" id="contact">
  <p className="section-number">04 / CONTACT</p>

  
<div className="contact-heading-with-decoration">
  <h2>Let's make something meaningful.</h2>

  <img
    src="/decorations/chrome-star.png"
    alt=""
    aria-hidden="true"
    className="floating-3d-star"
  />
</div>


  <p className="contact-description">
    Have a project, opportunity or idea in mind?
    I'd love to hear from you.
  </p>

  
<div className="contact-links">
 
<div className="contact-email-card">
  <div>
    <small>GET IN TOUCH</small>
    <h3>Email me</h3>
    <p>veronika.makkonen@gmail.com</p>
  </div>

  <div className="contact-email-actions">
    <a href="mailto:veronika.makkonen@gmail.com">
      Write email ↗
    </a>

    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(
            'veronika.makkonen@gmail.com'
          )
          alert('Email address copied!')
        } catch {
          alert('Copy failed. Please select the email address manually.')
        }
      }}
    >
      Copy address
    </button>
  </div>
</div>


  <a
    href="https://www.linkedin.com/in/veronika-kuzmin-683b4230b"
    target="_blank"
    rel="noopener noreferrer"
    className="contact-link"
  >
    <span>
      <small>LET'S CONNECT</small>
      <strong>LinkedIn</strong>
      <span className="contact-detail">
        View my professional profile
      </span>
    </span>
    <span className="contact-arrow">↗</span>
  </a>
</div>

<a
  className="contact-phone"
  href="tel:+358458592838"
>
  <span>Prefer a call?</span>
  +358 45 859 2838 ↗
</a>


  <p className="contact-location">
    Based in Finland · Open to new opportunities
  </p>
</section>


      <footer>
        © Veronika — Designed with intention.
      </footer>

      {project && (
        <div
          className="modal-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeProject()
            }
          }}
        >
          <article
            className="project-modal"
            role="dialog"
            aria-modal="true"
            aria-label={`${project.name} case study`}
          >
            
<div className="modal-topbar">
  <span>
    {String(activeProject! + 1).padStart(2, '0')}
    {' / '}
    {project.name === 'GREEN TRAVELS' || project.name === 'WEATHER APP'
      ? 'WEB DEVELOPMENT PROJECT'
      : project.name === 'PIENI JÄLKI'
        ? 'E-COMMERCE PROJECT'
        : 'UX & UI CASE STUDY'}
  </span>

              <button
                type="button"
                ref={closeRef}
                onClick={closeProject}
                className="modal-close"
                aria-label="Close project"
              >
                ✕ Close
              </button>
            </div>

            <div className="modal-body">
              <p className="section-number">SELECTED PROJECT</p>
              <h2 className="modal-title">{project.name}.</h2>
              <p className="modal-description">
                {project.overview}
              </p>

              <div className="modal-meta">
                <span>MY ROLE</span>
                <strong>{project.role}</strong>
              </div>
              
{project.name === 'WEATHER APP' && (
  <div className="dentskills-figma-links">
    <a
      href="https://veronica250-bot.github.io/pilvipalvelut/harjoitustyo/"
      target="_blank"
      rel="noopener noreferrer"
      className="featured-view-button"
    >
      View Live Application <span>↗</span>
    </a>
  </div>
)}


              
{project.name !== 'DENTSKILLS' &&
  project.name !== 'HOWSPACE' &&
  project.name !== 'MAP MY TRIP' &&
  project.name !== 'AI & UX' &&
  project.name !== 'RENDI' &&
  project.name !== 'CLICK & PICK' &&
  project.images.length > 0 && (
    <div className="modal-gallery">
      {project.images.map((src, index) => (
        <ProjectImage
          key={src}
          src={src}
          alt={`${project.name} design ${index + 1}`}
          onClick={() => setActiveImage(index)}
        />
      ))}
    </div>
  )}

              
{project.name === 'DENTSKILLS' ? (
  <div className="dentskills-story">

    <section className="case-section">
      <span className="case-label">01 / PROJECT OVERVIEW</span>
      <h3>Making practical skills easier to track.</h3>
      <p>
        DENTSKILLS is a digital service design project developed
        for the University of Helsinki's dental education
        environment.
      </p>
      <p>
        The goal was to explore how paper-based skill cards
        could be transformed into a clearer digital experience
        for students, teachers and administrators.
      </p>
      <div className="case-facts">
        <div>
          <span>CLIENT</span>
          <strong>University of Helsinki</strong>
        </div>
        <div>
          <span>PERIOD</span>
          <strong>2025–2026</strong>
        </div>
        <div>
          <span>MY ROLE</span>
          <strong>Project Leadership & UX/UI Design</strong>
        </div>
        <div>
          <span>TOOLS</span>
          <strong>Figma · Prototyping · User Research</strong>
        </div>
      </div>
    </section>

    <section className="case-section">
      <span className="case-label">02 / THE CHALLENGE</span>
      <h3>From paper to a connected experience.</h3>
      <p>
        Practical skills were documented and approved
        manually using paper-based assessment cards.
        This created challenges in tracking progress,
        managing information and transferring
        assessment results.
      </p>
      <p>
        The design challenge was to bring these workflows
        together while keeping the experience intuitive
        for different user groups.
      </p>
      <div className="case-highlight">
        How might we make practical skills assessment
        easier to document, track and evaluate?
      </div>
    </section>

    <section className="case-section">
      <span className="case-label">03 / USER RESEARCH</span>
      <h3>Understanding real user needs.</h3>
      <p>
        We conducted user research in the educational
        environment with students and teachers.
        Participants explored five existing prototypes
        and shared feedback about their experiences.
      </p>

      <div className="research-stats">
        <div><strong>07</strong><span>Participants</span></div>
        <div><strong>04</strong><span>Teachers</span></div>
        <div><strong>03</strong><span>Students</span></div>
        <div><strong>05</strong><span>Prototypes reviewed</span></div>
      </div>

      <h4>Key design priorities</h4>
      <div className="case-points">
        <div>Clear progress tracking</div>
        <div>Easy-to-access digital skill cards</div>
        <div>Simple assessment and feedback workflows</div>
        <div>Consistent navigation across user roles</div>
        <div>QR-based interaction concepts</div>
      </div>
    </section>

    <section className="case-section">
      <span className="case-label">04 / DESIGN PROCESS</span>
      <h3>Turning insights into interfaces.</h3>
      <p>
        The design work built on earlier prototypes.
        We compared their strengths, developed user
        journeys, explored wireframes and refined
        the interface direction based on user and
        client feedback.
      </p>

      <div className="process-grid">
        <div>
          <span>01</span>
          <strong>Discover</strong>
          <p>User feedback and existing prototypes.</p>
        </div>
        <div>
          <span>02</span>
          <strong>Define</strong>
          <p>User roles, workflows and requirements.</p>
        </div>
        <div>
          <span>03</span>
          <strong>Design</strong>
          <p>Wireframes and interface concepts in Figma.</p>
        </div>
        <div>
          <span>04</span>
          <strong>Refine</strong>
          <p>Iterations and client presentations.</p>
        </div>
      </div>
    </section>

    <section className="case-section">
      <span className="case-label">05 / STUDENT EXPERIENCE</span>
      <h3>Progress at a glance.</h3>
      <p>
        The student experience focuses on browsing courses,
        opening digital skill cards and following the
        progress of practical assignments.
        Self-assessment and assessment status are
        part of the proposed workflow.
      </p>
      <div className="case-feature-image">
        <ProjectImage
          src={project.images[0]}
          alt="DENTSKILLS student interface designs"
          onClick={() => setActiveImage(0)}
        />
        <span>Student experience — explore the interface</span>
      </div>
    </section>

    <section className="case-section">
      <span className="case-label">06 / TEACHER EXPERIENCE</span>
      <h3>Assessment without unnecessary complexity.</h3>
      <p>
        The teacher experience brings student information,
        practical assignments and assessment workflows
        into a structured interface.
      </p>
      <p>
        Teachers can review submitted work, approve or
        reject assessments and provide feedback in
        the proposed design.
      </p>
      <div className="case-feature-image">
        <ProjectImage
          src={project.images[1]}
          alt="DENTSKILLS teacher interface designs"
          onClick={() => setActiveImage(1)}
        />
        <span>Teacher experience — explore the interface</span>
      </div>
    </section>

    <section className="case-section">
      <span className="case-label">07 / ADMINISTRATION</span>
      <h3>Designing for complex workflows.</h3>
      <p>
        The administration interface explores how courses,
        assessment cards, students and user permissions
        could be managed in one place.
      </p>
      <p>
        The card editor allows different assessment
        structures to be defined, supporting
        flexibility across practical assignments.
      </p>
      <div className="case-feature-image">
        <ProjectImage
          src={project.images[2]}
          alt="DENTSKILLS administration dashboard"
          onClick={() => setActiveImage(2)}
        />
        <span>Administration interface — explore the design</span>
      </div>
    </section>

<section className="case-section">
  <span className="case-label">EXPLORE THE DESIGNS</span>
  <h3>From mobile experiences to web interfaces.</h3>
  <p>
    Explore the high-fidelity interface designs and the
    web-based administration concept created for DENTSKILLS.
  </p>

  <div className="dentskills-figma-links">
    <a
      href="https://www.figma.com/design/0ZCJJH21OMYc83zVagAkyY/Rautalanka-versio?node-id=357-24587"
      target="_blank"
      rel="noopener noreferrer"
      className="featured-view-button"
    >
      View Hi-Fi Designs <span>↗</span>
    </a>

    <a
      href="https://www.figma.com/design/0ZCJJH21OMYc83zVagAkyY/Rautalanka-versio?node-id=803-2924"
      target="_blank"
      rel="noopener noreferrer"
      className="featured-view-button"
    >
      Explore Web Interface <span>↗</span>
    </a>
  </div>
</section>

    <section className="case-section">
      <span className="case-label">08 / OUTCOME & LEARNINGS</span>
      <h3>From complex workflows to clearer experiences.</h3>
      <p>
        The project brought together user research,
        workflow design and interface prototyping
        to establish a foundation for further
        digital service development.
      </p>
      <p>
        My responsibilities combined project leadership
        with UX/UI design. The experience strengthened
        my ability to connect different user needs,
        coordinate design work and communicate
        complex solutions clearly.
      </p>
      <div className="case-highlight">
        Good digital experiences make complicated
        workflows feel understandable.
      </div>
    </section>

  </div>

) : project.name === 'HOWSPACE' ? (
  <div className="dentskills-story">

    <section className="case-section">
      <span className="case-label">01 / PROJECT OVERVIEW</span>
      <h3>Bringing collaboration into one digital space.</h3>
      <p>
        A digital collaboration workspace developed for the
        Huomisvoimalaitos Kokonniemi project in Porvoo,
        together with Posintra.
      </p>
      <p>
        The aim was to connect stakeholders, workshops,
        ideas and shared resources in one accessible
        digital environment.
      </p>

      <div className="case-facts">
        <div>
          <span>CLIENT / PARTNER</span>
          <strong>Posintra · Huomisvoimalaitos Kokonniemi</strong>
        </div>
        <div>
          <span>PERIOD</span>
          <strong>Spring 2026</strong>
        </div>
        <div>
          <span>MY ROLE</span>
          <strong>Project Management · UX/UI Design</strong>
        </div>
        <div>
          <span>TOOLS</span>
          <strong>Howspace · Figma · Figma Make · User Research</strong>
        </div>
      </div>
    </section>

    <section className="case-section">
      <span className="case-label">02 / THE CHALLENGE</span>
      <h3>Connecting people, ideas and decisions.</h3>
      <p>{project.challenge}</p>

      <div className="case-highlight">
        How might we make collaboration easier across
        physical workshops and digital environments?
      </div>
    </section>

    <section className="case-section">
      <span className="case-label">03 / USER RESEARCH</span>
      <h3>Understanding collaboration needs.</h3>
      <p>
        Our team conducted seven stakeholder interviews
        to understand how people collaborate, share
        information and participate in decisions.
      </p>
      <p>
        The findings emphasized the need for one shared
        workspace, clear navigation, accessible participation
        and a structured approach to digital collaboration.
      </p>

      <div className="case-points">
        <div>Centralized information and materials</div>
        <div>Easy participation for different stakeholders</div>
        <div>Clear workshop and collaboration stages</div>
        <div>Support for remote decision-making</div>
      </div>
    </section>

    <section className="case-section">
      <span className="case-label">04 / CONCEPT & PROTOTYPING</span>
      <h3>Exploring possibilities with Figma Make.</h3>
      <p>
        We explored interface concepts in Figma Make to
        visualize how workshops, discussions and shared
        information could work together.
      </p>
      <p>
        These images show the concept prototype, not
        the final Howspace implementation.
      </p>

      {[3, 4, 5].map((imageIndex) => (
        <div className="case-feature-image" key={imageIndex}>
          <ProjectImage
            src={project.images[imageIndex]}
            alt={`HOWSPACE concept prototype ${imageIndex - 2}`}
            onClick={() => setActiveImage(imageIndex)}
          />
          <span>
            {[
              'Concept — Home',
              'Concept — Workshop',
              'Concept — Discussion'
            ][imageIndex - 3]}
          </span>
        </div>
      ))}

      
<div className="dentskills-figma-links">
  <a
    href="https://www.figma.com/make/XcDvRo2y94GYctxZBuMCCB/Multichannel-Collaboration-Platform-UI?p=f&t=wD3cHXzX2UVOPQoT-0"
    target="_blank"
    rel="noopener noreferrer"
    className="featured-view-button"
  >
    Explore Figma Make Prototype <span>↗</span>
  </a>
</div>

    </section>

    <section className="case-section">
      <span className="case-label">05 / FROM CONCEPT TO PLATFORM</span>
      <h3>Turning ideas into a practical workspace.</h3>
      <p>
        We compared collaboration platforms and selected
        Howspace as the environment for the project.
      </p>
      <p>
        The concept was adapted to the platform's available
        features, focusing on workshops, idea prioritization,
        discussions, shared materials and remote participation.
      </p>

      <div className="process-grid">
        <div>
          <span>01</span>
          <strong>Discover</strong>
          <p>Stakeholder interviews and user needs.</p>
        </div>
        <div>
          <span>02</span>
          <strong>Explore</strong>
          <p>Platform comparison and concept prototyping.</p>
        </div>
        <div>
          <span>03</span>
          <strong>Build</strong>
          <p>Workspace structure and content in Howspace.</p>
        </div>
        <div>
          <span>04</span>
          <strong>Refine</strong>
          <p>Client feedback and final improvements.</p>
        </div>
      </div>
    </section>

    <section className="case-section">
      <span className="case-label">06 / FINAL IMPLEMENTATION</span>
      <h3>A shared environment for co-creation.</h3>
      <p>
        The final implementation brought together workshop
        stages, idea prioritization, shared materials
        and discussion spaces in Howspace.
      </p>

      {[0, 1, 2].map((imageIndex) => (
        <div className="case-feature-image" key={imageIndex}>
          <ProjectImage
            src={project.images[imageIndex]}
            alt={`HOWSPACE final workspace ${imageIndex + 1}`}
            onClick={() => setActiveImage(imageIndex)}
          />
          <span>
            {[
              'Final — Workspace Home',
              'Final — Idea Prioritization',
              'Final — Workshop Collaboration'
            ][imageIndex]}
          </span>
        </div>
      ))}
    </section>

    <section className="case-section">
      <span className="case-label">07 / OUTCOME & LEARNINGS</span>
      <h3>Designing beyond the interface.</h3>
      <p>
        The project resulted in a structured Howspace
        collaboration workspace supported by stakeholder
        research and concept prototyping.
      </p>
      <p>
        My role combined project leadership with UX/UI
        design. I developed my ability to coordinate
        multidisciplinary work, connect user needs with
        design decisions and adapt concepts to a real
        digital platform.
      </p>

      <div className="case-highlight">
        Meaningful digital collaboration starts with
        understanding how people work together.
      </div>
    </section>

  </div>

) : project.name === 'MAP MY TRIP' ? (
  <div className="dentskills-story">

    <section className="case-section">
      <span className="case-label">
        01 / PROJECT OVERVIEW
      </span>

      <h3>
        From travel inspiration to digital exploration.
      </h3>

      
<p>
  Museomatkat wanted to explore new ways of connecting
  its physical pop-up experience with its online travel
  service. The focus was on inspiring existing museum
  enthusiasts to discover cultural trips around Finland.
</p>

<p>
  Our team developed a concept that connects interactive
  travel discovery, destination information and QR-based
  experiences into one customer journey.
</p>


      <div className="case-facts">
        <div>
          <span>CLIENT</span>
          <strong>Museomatkat</strong>
        </div>

        <div>
          <span>PERIOD</span>
          <strong>May 2026 · 5-Day Design Sprint</strong>
        </div>

        <div>
          <span>MY ROLE</span>
          <strong>
            UX/UI Design · Concept Development
            · Prototyping
          </strong>
        </div>

        <div>
          <span>TOOLS & METHODS</span>
          <strong>
            Figma · Figma Make · Design Sprint
            · Storyboarding
          </strong>
        </div>
      </div>
    </section>

    <section className="case-section">
      <span className="case-label">
        02 / THE CHALLENGE
      </span>

      <h3>
        Connecting physical and digital experiences.
      </h3>

      <p>
        Museomatkat wanted to explore how a
        physical pop-up experience could encourage
        people to discover museum trips and
        continue their journey through its
        digital service.
      </p>

      <p>
        Our challenge was to make the transition
        from inspiration to exploration feel
        seamless, accessible and engaging.
      </p>

      <div className="case-highlight">
        How might we turn a moment of curiosity
        at a physical pop-up into a meaningful
        digital travel experience?
      </div>
    </section>

    <section className="case-section">
      <span className="case-label">
        03 / DESIGN SPRINT PROCESS
      </span>

      <h3>
        Exploring ideas through rapid design.
      </h3>

      <p>
        We used the Design Sprint method to
        understand the challenge, map the
        customer journey, explore ideas and
        develop interactive prototypes.
      </p>

      <p>
        The design considered different
        touchpoints, from the physical
        pop-up environment to digital
        interfaces and mobile interactions.
      </p>

      <div className="process-grid">
        <div>
          <span>01</span>
          <strong>Understand</strong>
          <p>
            Project goals, customer needs
            and experience mapping.
          </p>
        </div>

        <div>
          <span>02</span>
          <strong>Ideate</strong>
          <p>
            Concept exploration,
            sketches and storyboards.
          </p>
        </div>

        <div>
          <span>03</span>
          <strong>Prototype</strong>
          <p>
            Interactive interface concepts
            and digital touchpoints.
          </p>
        </div>

        <div>
          <span>04</span>
          <strong>Present</strong>
          <p>
            Communicating the concept
            and proposed customer journey.
          </p>
        </div>
      </div>

      <h4>Key design priorities</h4>

      <div className="case-points">
        <div>Easy travel discovery</div>
        <div>Visual inspiration</div>
        <div>Intuitive navigation</div>
        <div>Physical-to-digital transition</div>
        <div>Accessible trip information</div>
        <div>Clear next steps</div>
      </div>
    </section>

    <section className="case-section">
      <span className="case-label">
        04 / EXPLORE TRIPS
      </span>

      <h3>
        Making cultural travel inspiring.
      </h3>

      <p>
        The travel exploration interface
        presents destinations as visual cards,
        making it easier to browse different
        museum trips and compare options.
      </p>

      <p>
        Photography, destination information
        and pricing help visitors understand
        the available experiences at a glance.
      </p>

      <div className="case-feature-image">
        <ProjectImage
          src={project.images[0]}
          alt="MAP MY TRIP travel exploration interface"
          onClick={() => setActiveImage(0)}
        />
        <span>
          Travel exploration — destination cards
        </span>
      </div>
    </section>

    <section className="case-section">
      <span className="case-label">
        05 / INTERACTIVE MAP
      </span>

      <h3>
        Discovering Finland through interaction.
      </h3>

      <p>
        An interactive map of Finland allows
        visitors to explore cultural destinations
        through a more visual and geographical
        experience.
      </p>

      <p>
        Selecting a destination reveals
        additional trip information, allowing
        users to move naturally from browsing
        the map to exploring a specific journey.
      </p>

      <div className="case-feature-image">
  <ProjectImage
    src={project.images[5]}
    alt="MAP MY TRIP selected museum trip details"
    onClick={() => setActiveImage(5)}
  />
  <span>
    Trip details — selected destination and itinerary
  </span>
</div>

<div className="dentskills-figma-links">
  <a
    href="https://www.figma.com/make/bA64YHsRaQg0E5mvsUEYve/Map-my-trip?p=f&t=KO2cm6R0BIkjiB8G-0"
    target="_blank"
    rel="noopener noreferrer"
    className="featured-view-button"
  >
    Explore Interactive Prototype <span>↗</span>
  </a>
</div>

    </section>

    <section className="case-section">
      <span className="case-label">
        06 / POP-UP EXPERIENCE
      </span>

      <h3>
        Bridging the physical and digital journey.
      </h3>

      <p>
        The pop-up concept uses an interactive
        screen to help visitors discover routes
        and learn about available museum trips.
      </p>

      <p>
        Selecting a route opens a digital
        travel flyer with information about
        the experience, creating a clear
        connection between the physical
        touchpoint and digital content.
      </p>

      <div className="case-feature-image">
        <ProjectImage
          src={project.images[2]}
          alt="MAP MY TRIP pop-up interaction storyboard"
          onClick={() => setActiveImage(2)}
        />
        <span>
          Pop-up screen — interaction storyboard
        </span>
      </div>
    </section>

    <section className="case-section">
      <span className="case-label">
        07 / DIGITAL FLYER & MOBILE JOURNEY
      </span>

      <h3>
        Continuing the experience beyond the pop-up.
      </h3>

      <p>
        The digital flyer concept presents
        the museum trip through images,
        destination details and practical
        travel information.
      </p>

      <p>
        A QR-code-based transition was explored
        so visitors could continue viewing
        the information on their own phones
        and follow a path toward the
        Museomatkat online service.
      </p>

      <div className="case-feature-image">
        <ProjectImage
          src={project.images[3]}
          alt="Digital museum travel flyer and mobile journey"
          onClick={() => setActiveImage(3)}
        />
        <span>
          Digital flyer — pop-up screen and mobile
        </span>
      </div>
    </section>

    <section className="case-section">
      <span className="case-label">
        08 / ADDITIONAL TOUCHPOINT
      </span>

      <h3>
        Taking inspiration into everyday spaces.
      </h3>

      <p>
        The concept also explored how a
        QR-code-based advertisement could
        introduce museum travel opportunities
        outside the pop-up environment.
      </p>

      <div className="case-feature-image">
        <ProjectImage
          src={project.images[4]}
          alt="MAP MY TRIP physical QR code advertising concept"
          onClick={() => setActiveImage(4)}
        />
        <span>
          Physical touchpoint — QR advertisement concept
        </span>
      </div>
    </section>

    <section className="case-section">
      <span className="case-label">
        09 / OUTCOME & LEARNINGS
      </span>

      <h3>
        Designing a journey, not just an interface.
      </h3>

      <p>
        The Design Sprint resulted in interactive
        prototypes and a multi-channel service
        concept connecting physical travel
        inspiration with digital exploration.
      </p>

      <p>
        My contribution focused on UX/UI design,
        concept development, prototyping and
        visualizing the customer journey.
        The experience strengthened my ability
        to work creatively under time constraints
        while considering the entire service experience.
      </p>

      <div className="case-highlight">
        Great experiences connect every touchpoint
        into one understandable journey.
      </div>
    </section>

  </div>

) : project.name === 'AI & UX' ? (
  <div className="dentskills-story">

    <section className="case-section">
      <span className="case-label">
        01 / PROJECT OVERVIEW
      </span>

      <h3>
        Exploring AI as a creative design partner.
      </h3>

      <p>
        AI & UX is a portfolio-based bachelor's thesis
        exploring how artificial intelligence can support
        different stages of the UX design process.
      </p>

      <p>
        The goal was to develop an approachable framework
        that helps designers understand where AI can add
        value, how it can be used in practice and where
        human judgment remains essential.
      </p>

      <div className="case-facts">
        <div>
          <span>PROJECT TYPE</span>
          <strong>Bachelor's Thesis</strong>
        </div>
        <div>
          <span>PERIOD</span>
          <strong>2026</strong>
        </div>
        <div>
          <span>MY ROLE</span>
          <strong>
            Independent Research · UX Design · AI Experimentation
          </strong>
        </div>
        <div>
          <span>TOOLS</span>
          <strong>
            Copilot · Figma · Figma Make · Google Stitch
          </strong>
        </div>
      </div>
    </section>

    <section className="case-section">
      <span className="case-label">
        02 / THE CHALLENGE
      </span>

      <h3>
        Making AI useful, not just impressive.
      </h3>

      <p>
        AI tools are becoming increasingly accessible
        to designers, but understanding how to integrate
        them meaningfully into a UX workflow can be
        challenging.
      </p>

      <p>
        My goal was to investigate practical applications
        of AI while identifying its limitations, especially
        when working with user needs, design decisions
        and usability evaluation.
      </p>

      <div className="case-highlight">
        How might AI support the UX design process
        without replacing human-centered thinking?
      </div>
    </section>

    <section className="case-section">
      <span className="case-label">
        03 / USER UNDERSTANDING
      </span>

      <h3>
        Exploring synthetic user perspectives.
      </h3>

      <p>
        I created a Copilot agent designed to simulate
        different user personas for a public transport
        application.
      </p>

      <p>
        The experiment explored how AI-generated
        perspectives could help designers consider
        different user needs and uncover potential
        questions during early design exploration.
      </p>

      <div className="case-feature-image">
        <ProjectImage
          src={project.images[2]}
          alt="Copilot agent created to simulate user personas"
          onClick={() => setActiveImage(2)}
        />
        <span>
          Copilot — synthetic user persona agent
        </span>
      </div>

      <div className="case-feature-image">
        <ProjectImage
          src={project.images[3]}
          alt="Copilot conversation with three synthetic personas"
          onClick={() => setActiveImage(3)}
        />
        <span>
          AI-generated perspectives — persona simulation
        </span>
      </div>

      <div className="case-highlight">
        Synthetic personas can support exploration,
        but they do not replace interviews with real users.
      </div>
    </section>

    <section className="case-section">
      <span className="case-label">
        04 / AI-ASSISTED IDEATION
      </span>

      <h3>
        Generating and comparing design directions.
      </h3>

      <p>
        I explored generative AI as a tool for developing
        alternative UX concepts for a public transport
        application.
      </p>

      <p>
        The exercise compared ideas such as a recommended
        route, step-by-step guidance and simplified ticket
        selection. Synthetic persona responses were used
        to reflect on the proposed approaches.
      </p>

      <div className="case-feature-image">
        <ProjectImage
          src={project.images[4]}
          alt="AI-assisted UX ideation board with three design concepts"
          onClick={() => setActiveImage(4)}
        />
        <span>
          Ideation — design concepts and synthetic feedback
        </span>
      </div>

      <div className="case-points">
        <div>Exploring alternative solutions</div>
        <div>Comparing different interaction approaches</div>
        <div>Considering user needs from multiple perspectives</div>
        <div>Applying designer judgment to generated ideas</div>
      </div>
    </section>

    <section className="case-section">
      <span className="case-label">
        05 / RAPID PROTOTYPING
      </span>

      <h3>
        From prompts to interface concepts.
      </h3>

      <p>
        I experimented with AI-assisted interface
        generation to explore how quickly a design
        concept could be translated into visual
        screens and user flows.
      </p>

      <p>
        Google Stitch was used to create the
        Nordic Flow public transport interface,
        including route search, ticket selection
        and purchase-related screens.
      </p>

      <div className="case-feature-image">
        <ProjectImage
          src={project.images[1]}
          alt="Nordic Flow interface concepts created with Google Stitch"
          onClick={() => setActiveImage(1)}
        />
        <span>
          Google Stitch — Nordic Flow interface
        </span>
      </div>

      <p>
        I also explored Figma Make as an alternative
        approach to generating and developing
        interactive interface concepts.
      </p>

      <div className="case-feature-image">
        <ProjectImage
          src={project.images[5]}
          alt="Public transport interface experiment in Figma Make"
          onClick={() => setActiveImage(5)}
        />
        <span>
          Figma Make — interface prototyping experiment
        </span>
      </div>

      <div className="case-highlight">
        AI can accelerate early prototyping,
        but the designer remains responsible for
        structure, clarity and usability.
      </div>
    </section>

<div className="aiux-prototype-links">
  <p>
    Explore the AI-assisted interface concepts created
    with Google Stitch and Figma Make.
  </p>

  <div className="dentskills-figma-links">
    <a
      href="https://stitch.google.com/projects/10181475478881016049"
      target="_blank"
      rel="noopener noreferrer"
      className="featured-view-button"
    >
      Explore Google Stitch <span>↗</span>
    </a>

    <a
      href="https://www.figma.com/make/1JzuEUwX6UurXFhqZIfhZI/Public-Transport-App-UI"
      target="_blank"
      rel="noopener noreferrer"
      className="featured-view-button"
    >
      Explore Figma Make <span>↗</span>
    </a>
  </div>
</div>

    <section className="case-section">
      <span className="case-label">
        06 / USABILITY EVALUATION
      </span>

      <h3>
        Turning AI observations into design decisions.
      </h3>

      <p>
        I explored how AI could support early usability
        evaluation by identifying potential interface
        problems and suggesting improvements.
      </p>

      <p>
        The evaluation considered navigation,
        information overload, feedback messages,
        call-to-action visibility and clarity
        across the user journey.
      </p>

      <div className="case-feature-image">
        <ProjectImage
          src={project.images[6]}
          alt="Usability evaluation comparing observations AI feedback and design decisions"
          onClick={() => setActiveImage(6)}
        />
        <span>
          Usability evaluation — observations, AI feedback
          and my design decisions
        </span>
      </div>

      <div className="case-points">
        <div>Clearer navigation and guidance</div>
        <div>Reduced information overload</div>
        <div>Improved feedback and confirmation</div>
        <div>More visible call-to-action elements</div>
      </div>

      <p>
        AI-generated evaluation suggestions were
        treated as hypotheses for further investigation,
        not as verified usability findings.
      </p>
    </section>

    <section className="case-section">
      <span className="case-label">
        07 / THE AI & UX FRAMEWORK
      </span>

      <h3>
        Making AI practical across the UX process.
      </h3>

      <p>
        Based on the experiments, I developed a
        visual framework organized around four
        design stages: Discover, Define, Develop
        and Deliver.
      </p>

      <p>
        The framework presents AI's role, practical
        use cases, potential benefits and limitations
        at each stage.
      </p>

      <div className="process-grid">
        <div>
          <span>01</span>
          <strong>Discover</strong>
          <p>
            Exploring user perspectives and
            supporting research analysis.
          </p>
        </div>

        <div>
          <span>02</span>
          <strong>Define</strong>
          <p>
            Expanding ideas and comparing
            possible design directions.
          </p>
        </div>

        <div>
          <span>03</span>
          <strong>Develop</strong>
          <p>
            Accelerating wireframes,
            interface design and prototyping.
          </p>
        </div>

        <div>
          <span>04</span>
          <strong>Deliver</strong>
          <p>
            Supporting evaluation and
            identifying improvement opportunities.
          </p>
        </div>
      </div>

      <div className="case-feature-image">
        <ProjectImage
          src={project.images[0]}
          alt="AI and UX framework covering Discover Define Develop and Deliver"
          onClick={() => setActiveImage(0)}
        />
        <span>
          Final framework — AI across the UX design process
        </span>
      </div>
    </section>

    <section className="case-section">
      <span className="case-label">
        08 / OUTCOME & LEARNINGS
      </span>

      <h3>
        Designing with AI, thinking with intention.
      </h3>

      <p>
        The thesis resulted in four practical
        experiments and a visual framework
        to help designers explore AI-assisted
        UX methods.
      </p>

      <p>
        The work strengthened my understanding
        of AI-assisted research, ideation,
        prototyping and evaluation while
        developing my ability to assess
        generated outputs critically.
      </p>

      <p>
        The most important lesson was that
        AI is valuable as a supporting tool,
        but meaningful UX design still requires
        human judgment and genuine user understanding.
      </p>

      <div className="case-highlight">
        AI can support the design process.
        Human understanding gives it direction.
      </div>
      
<div className="thesis-link-wrapper">
  <div className="thesis-link-info">
    <span>WANT TO EXPLORE MORE?</span>
    <h4>Read the full thesis.</h4>
    <p>
      Explore the research, practical experiments
      and complete AI & UX framework.
    </p>
  </div>

  <a
    href="https://urn.fi/URN:NBN:fi:amk-2026060220477"
    target="_blank"
    rel="noopener noreferrer"
    className="thesis-link-button"
  >
    Read Full Thesis <span>↗</span>
  </a>
</div>

    </section>

  </div>

) : project.name === 'RENDI' ? (
  <div className="dentskills-story">

    {/* 01 / PROJECT OVERVIEW */}
    <section className="case-section">
      <span className="case-label">
        01 / PROJECT OVERVIEW
      </span>

      <h3>
        Making sports more accessible.
      </h3>

      <p>
        RENDI is a team-developed digital service concept
        that makes renting sports equipment easier,
        more affordable and more sustainable.
      </p>

      <p>
        The idea was to let people discover and reserve
        equipment at activity locations without needing
        to purchase or own everything themselves.
      </p>

      <div className="case-facts">
        <div>
          <span>PROJECT TYPE</span>
          <strong>Digital Service Concept · Team Project</strong>
        </div>
        <div>
          <span>PERIOD</span>
          <strong>2025</strong>
        </div>
        <div>
          <span>MY ROLE</span>
          <strong>
            UX/UI Design · Figma Prototyping · Front-End Development
          </strong>
        </div>
        <div>
          <span>TOOLS & METHODS</span>
          <strong>
            Figma · Service Blueprint · HTML · CSS
          </strong>
        </div>
      </div>
    </section>

    {/* 02 / THE CHALLENGE & RESEARCH */}
    <section className="case-section">
      <span className="case-label">
        02 / THE CHALLENGE & USER RESEARCH
      </span>

      <h3>
        Removing barriers to trying something new.
      </h3>

      <p>
        Buying sports equipment can be expensive,
        especially when someone wants to try a new
        activity or only needs equipment occasionally.
      </p>

      <p>
        As a team, we conducted seven interviews and
        explored the needs of potential users and
        sports activity providers.
      </p>

      <p>
        The research highlighted the importance of
        clear pricing, equipment availability,
        convenient collection and return,
        and trust in the rental process.
      </p>

      <div className="case-highlight">
        How might we make sports equipment easier
        to access without the commitment of ownership?
      </div>

      <h4>Key design priorities</h4>

      <div className="case-points">
        <div>Easy equipment discovery</div>
        <div>Clear availability and pricing</div>
        <div>Convenient booking and payment</div>
        <div>Simple collection and return</div>
        <div>Trust and equipment condition management</div>
      </div>
    </section>

    {/* 03 / SERVICE DESIGN */}
    <section className="case-section">
      <span className="case-label">
        03 / SERVICE DESIGN
      </span>

      <h3>
        Designing the complete rental journey.
      </h3>

      <p>
        We explored the service beyond the screen,
        considering how users would discover equipment,
        make reservations, collect items and
        return them after their activity.
      </p>

      <p>
        The Service Blueprint connects customer actions
        with visible service interactions and
        behind-the-scenes processes.
      </p>

      <div className="process-grid">
        <div>
          <span>01</span>
          <strong>Discover</strong>
          <p>
            Find available equipment near an activity location.
          </p>
        </div>

        <div>
          <span>02</span>
          <strong>Book</strong>
          <p>
            Choose dates, review pricing and reserve equipment.
          </p>
        </div>

        <div>
          <span>03</span>
          <strong>Collect & Use</strong>
          <p>
            Pick up the equipment and enjoy the activity.
          </p>
        </div>

        <div>
          <span>04</span>
          <strong>Return</strong>
          <p>
            Return the equipment and confirm its condition.
          </p>
        </div>
      </div>

      <div className="case-feature-image">
        <ProjectImage
          src={project.images[4]}
          alt="RENDI Service Blueprint showing the complete rental journey"
          onClick={() => setActiveImage(4)}
        />
        <span>
          Service Blueprint — customer journey and supporting processes
        </span>
      </div>
    </section>

    {/* 04 / MOBILE UX/UI */}
    <section className="case-section">
      <span className="case-label">
        04 / MOBILE UX/UI DESIGN
      </span>

      <h3>
        From service concept to mobile experience.
      </h3>

      <p>
        I developed Figma prototypes to visualize
        how users could browse equipment, view product
        details, select rental dates and manage bookings.
      </p>

      <p>
        The interface uses a dark visual identity
        with warm yellow and soft pink accents.
        The goal was to create a recognizable
        and approachable experience.
      </p>

      <div className="case-feature-image">
        <ProjectImage
          src={project.images[0]}
          alt="RENDI mobile application concept shown on four phone mockups"
          onClick={() => setActiveImage(0)}
        />
        <span>
          Mobile app — main interface screens
        </span>
      </div>

      <div className="case-feature-image">
        <ProjectImage
          src={project.images[3]}
          alt="RENDI Figma application screens and reservation flow"
          onClick={() => setActiveImage(3)}
        />
        <span>
          Figma prototype — browsing, booking and account views
        </span>
      </div>

      <h4>Helping users get started</h4>

      <p>
        I also designed onboarding screens to explain
        the rental process in simple steps,
        from finding equipment to booking,
        collecting and returning it.
      </p>

      <div className="case-feature-image">
        <ProjectImage
          src={project.images[1]}
          alt="RENDI mobile onboarding screens with illustrated instructions"
          onClick={() => setActiveImage(1)}
        />
        <span>
          Onboarding — introducing the service step by step
        </span>
      </div>
      <div className="dentskills-figma-links">
  <a
    href="https://www.figma.com/proto/Tlf8vAWTtLlPrnZ9cbF41m/RENDI-app?page-id=0%3A1&node-id=54-26&viewport=380%2C545%2C0.33&scaling=scale-down&content-scaling=fixed&starting-point-node-id=54%3A26"
    target="_blank"
    rel="noopener noreferrer"
    className="featured-view-button"
  >
    Try Interactive Prototype <span>↗</span>
  </a>
</div>
    </section>

    {/* 05 / WEB DEVELOPMENT */}
    <section className="case-section">
      <span className="case-label">
        05 / WEB DESIGN & DEVELOPMENT
      </span>

      <h3>
        Bringing RENDI to the web.
      </h3>

      <p>
        Alongside the mobile service concept,
        we explored how RENDI could be presented
        through a website.
      </p>

      <p>
        The page layout was planned collaboratively,
        while I independently implemented the
        website prototype using HTML and CSS.
      </p>

      <p>
        I built the page structure, navigation,
        visual sections and equipment category layouts,
        applying the project's colors and typography.
      </p>

      <div className="case-feature-image">
        <ProjectImage
          src={project.images[2]}
          alt="RENDI website prototype homepage with skiing hero image"
          onClick={() => setActiveImage(2)}
        />
        <span>
          Website prototype — homepage
        </span>
      </div>

      <div className="case-feature-image">
        <ProjectImage
          src={project.images[5]}
          alt="RENDI website prototype equipment category section"
          onClick={() => setActiveImage(5)}
        />
        <span>
          Website prototype — equipment categories
        </span>
      </div>

      <div className="case-highlight">
        My contribution: independently coding
        the HTML and CSS website prototype
        based on our shared design direction.
      </div>

      <p>
        The website remained a work in progress
        and was not launched as a complete rental service.
      </p>

      
<div className="thesis-link-wrapper">
  <div className="thesis-link-info">
    <span>EXPLORE THE DESIGN PROCESS</span>
    <h4>Website layout & planning.</h4>
    <p>
      Explore the collaboratively created website
      layout that guided my HTML and CSS implementation.
    </p>
  </div>

  <a
    href="/documents/rendi-website-layout.pdf"
    target="_blank"
    rel="noopener noreferrer"
    className="thesis-link-button"
  >
    View Website Layout <span>↗</span>
  </a>
</div>

    </section>

    {/* 06 / OUTCOME & LEARNINGS */}
    <section className="case-section">
      <span className="case-label">
        06 / OUTCOME & LEARNINGS
      </span>

      <h3>
        Connecting design, business and technology.
      </h3>

      <p>
        RENDI resulted in a digital rental service
        concept supported by user research,
        a Service Blueprint, Figma prototypes
        and a coded website prototype.
      </p>

      <p>
        I also created business model canvases
        to explore the concept's value proposition
        and business opportunities.
      </p>

      <p>
        The project strengthened my ability to
        connect user needs, service processes,
        interface design and front-end implementation.
        It also gave me experience developing
        a shared concept within a team while
        taking ownership of specific deliverables.
      </p>

      <div className="case-highlight">
        Good service design connects the digital
        experience with everything that makes
        the service work.
      </div>
    </section>

  </div>
) : project.name === 'CLICK & PICK' ? (
  <div className="dentskills-story">
<section className="case-section">
  <span className="case-label">01 / PROJECT OVERVIEW</span>
  <h3>Making grocery shopping more convenient.</h3>
  <p>
    CLICK & PICK is a mobile service concept exploring
    how grocery shopping and store pickup could be
    integrated into the Lidl Plus experience.
  </p>
  <p>
    The project focused on designing an intuitive
    shopping journey, from product discovery and
    ordering to pickup and confirmation.
  </p>
<p className="concept-disclaimer">
  Independent design concept inspired by Lidl Plus.
  Not affiliated with Lidl.
</p>
  <div className="case-facts">
    <div>
      <span>PROJECT TYPE</span>
      <strong>UX/UI Concept</strong>
    </div>
    <div>
      <span>PLATFORM</span>
      <strong>Lidl Plus-inspired Mobile Experience</strong>
    </div>
    <div>
      <span>MY ROLE</span>
      <strong>UX/UI Design · Prototyping</strong>
    </div>
    <div>
      <span>TOOLS</span>
      <strong>Figma · Interface Design · Visual Communication</strong>
    </div>
  </div>
</section>

<section className="case-section">
  <span className="case-label">02 / THE CHALLENGE</span>
  <h3>From shopping list to effortless pickup.</h3>
  <p>
    Grocery shopping often requires customers to
    spend time navigating stores, finding products
    and waiting at checkout.
  </p>
  <p>
    The design challenge was to create a familiar
    mobile experience that would allow customers
    to order groceries in advance and collect
    them conveniently.
  </p>
  <div className="case-highlight">
    How might we make everyday grocery shopping
    faster and more convenient through a familiar app?
  </div>
</section>

<section className="case-section">
  <span className="case-label">03 / USER JOURNEY</span>
  <h3>A simple path from browsing to pickup.</h3>
  <p>
    I designed a shopping flow that guides users
    through selecting products, reviewing their
    order, choosing pickup details and confirming
    the purchase.
  </p>

  <div className="process-grid">
    <div>
      <span>01</span>
      <strong>Discover</strong>
      <p>Find CLICK & PICK inside the app.</p>
    </div>
    <div>
      <span>02</span>
      <strong>Shop</strong>
      <p>Browse products and add items to the cart.</p>
    </div>
    <div>
      <span>03</span>
      <strong>Order</strong>
      <p>Review the purchase and pickup details.</p>
    </div>
    <div>
      <span>04</span>
      <strong>Collect</strong>
      <p>Receive confirmation and collect the order.</p>
    </div>
  </div>
</section>

<section className="case-section">
  <span className="case-label">04 / MOBILE EXPERIENCE</span>
  <h3>Designing a familiar shopping interface.</h3>
  <p>
    The interface concept follows familiar grocery
    shopping patterns while introducing an additional
    click-and-collect journey.
  </p>
  <p>
    Product browsing, product details, order review
    and confirmation were designed as connected steps
    of the same experience.
  </p>

  <div className="case-feature-image">
    <ProjectImage
      src={project.images[0]}
      alt="CLICK & PICK mobile shopping interface designs"
      onClick={() => setActiveImage(0)}
    />
    <span>Mobile experience — shopping and checkout</span>
  </div>
</section>

<section className="case-section">
  <span className="case-label">05 / ONBOARDING</span>
  <h3>Helping users understand the service.</h3>
  <p>
    I designed an onboarding sequence to communicate
    how CLICK & PICK works before customers begin
    using the service.
  </p>
  <p>
    Five illustrated screens introduce the journey
    from adding products to a shopping cart to
    collecting an order from the store.
  </p>

  <div className="case-feature-image">
    <ProjectImage
      src={project.images[1]}
      alt="CLICK & PICK five-screen onboarding experience"
      onClick={() => setActiveImage(1)}
    />
    <span>Onboarding — five steps to getting started</span>
  </div>
</section>

<section className="case-section">
  <span className="case-label">06 / VISUAL COMMUNICATION</span>
  <h3>Introducing a new service through design.</h3>
  <p>
    The concept also included promotional material
    showing how CLICK & PICK could be introduced
    to existing Lidl Plus users.
  </p>
  <p>
    The visual direction uses recognizable brand-inspired
    colors, a clear message and a step-by-step explanation
    of the proposed service.
  </p>

  <div className="case-feature-image">
    <ProjectImage
      src={project.images[2]}
      alt="CLICK & PICK promotional campaign concept"
      onClick={() => setActiveImage(2)}
    />
    <span>Marketing concept — introducing CLICK & PICK</span>
  </div>
</section>
<section className="case-section">
  <span className="case-label">07 / INTERACTIVE PROTOTYPE</span>
  <h3>Experience the concept yourself.</h3>
  <p>
    Explore the interactive CLICK & PICK prototype in Figma
    and follow the journey from browsing products to
    completing an order.
  </p>

  <a
    href="https://www.figma.com/proto/2HOhT2OYxy0SjpNzbL5kK4/Click---Pick?page-id=0%3A1&node-id=40-38&p=f&viewport=90%2C125%2C0.25&t=I8kv6rlLKZtrcU07-1&scaling=scale-down&content-scaling=fixed"
    target="_blank"
    rel="noopener noreferrer"
    className="featured-view-button"
  >
    Explore Interactive Prototype <span>↗</span>
  </a>
</section>
<section className="case-section">
  <span className="case-label">08 / OUTCOME & LEARNINGS</span>
  <h3>Connecting usability with visual storytelling.</h3>
  <p>
    The project resulted in a mobile interface
    prototype, onboarding experience and promotional
    design concept.
  </p>
  <p>
    It allowed me to explore how an additional service
    could fit into an existing digital ecosystem
    while keeping the customer journey clear,
    consistent and easy to understand.
  </p>

  <div className="case-highlight">
    A good digital service makes every step feel
    simple — from the first interaction to the final confirmation.
  </div>
</section>

  </div>

) : (
  [
    ['01 / PROJECT GOAL', project.challenge],
    ['02 / DESIGN & DEVELOPMENT', `${project.process} ${project.solutions}`],
    ['03 / OUTCOME & LEARNINGS', project.outcome],
  ].map(([heading, description]) => (
    <section className="modal-section" key={heading}>
      <h3>{heading}</h3>
      <p>{description}</p>
    </section>
  ))
)}



              <button
                type="button"
                className="modal-bottom-close"
                onClick={closeProject}
              >
                ← Back to portfolio
              </button>
            </div>
          </article>
        </div>
      )}

      {project && activeImage !== null && (
        <div
          className="lightbox-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setActiveImage(null)
            }
          }}
        >
          <div
            className="image-lightbox"
            role="dialog"
            aria-modal="true"
            aria-label="Enlarged project image"
          >
            <div className="lightbox-topbar">
              <span>
                {activeImage + 1} / {project.images.length}
              </span>
              <button
                className="lightbox-close"
                onClick={() => setActiveImage(null)}
                autoFocus
                aria-label="Close image"
              >
                ✕ Close image
              </button>
            </div>

            <div className="lightbox-content">
              <button
                className="gallery-arrow"
                onClick={() => changeImage(-1)}
                aria-label="Previous image"
              >
                ‹
              </button>

              <img
                src={project.images[activeImage]}
                alt={`${project.name} screenshot ${activeImage + 1}`}
              />

              <button
                className="gallery-arrow"
                onClick={() => changeImage(1)}
                aria-label="Next image"
              >
                ›
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}

export default App
