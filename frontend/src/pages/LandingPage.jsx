import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Code2, Users, Zap, MessageSquare, Shield, Layers, ArrowRight, ChevronRight, Wifi, Database, Server } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

/* ─── Animations ─── */
const fadeIn = {
    hidden: { opacity: 0, y: 40 },
    visible: (i = 0) => ({
        opacity: 1, y: 0,
        transition: { delay: i * 0.12, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
    }),
};

/* ─── Data ─── */
const features = [
    { icon: Code2, title: 'Monaco Editor', desc: 'VS Code-powered editing with IntelliSense, syntax highlighting, multi-cursor, and 20+ themes.' },
    { icon: Users, title: 'Real-Time Cursors', desc: 'See every collaborator\'s cursor and selections live with zero-conflict CRDT synchronization.' },
    { icon: MessageSquare, title: 'Integrated Chat', desc: 'Built-in room chat with message history so your team stays in context while coding.' },
    { icon: Zap, title: 'Multi-Language Execution', desc: 'Run Python, Java, C++, JavaScript, Go, and TypeScript in isolated Docker sandboxes.' },
    { icon: Layers, title: 'Web Playground', desc: 'Live HTML/CSS/JS preview with hot reload, React support, and inline error overlay.' },
    { icon: Shield, title: 'Secure Rooms', desc: 'JWT authentication, encrypted WebSocket connections, and role-based access per room.' },
];

const techStack = [
    { icon: Server, name: 'Spring Boot 3', desc: 'Java 23 backend with JPA, Security, and WebSocket support.' },
    { icon: Wifi, name: 'WebSocket + STOMP', desc: 'Sub-50ms latency real-time sync with STOMP messaging protocol.' },
    { icon: Database, name: 'MySQL + Redis', desc: 'Persistent storage with Redis pub/sub for horizontal scaling.' },
    { icon: Code2, name: 'React 18 + Vite', desc: 'Lightning-fast frontend with Monaco Editor and Framer Motion.' },
];

const testimonials = [
    { name: 'Aarav Patel', role: 'Full-Stack Developer', text: 'CodeCollab changed how our team does pair programming. The latency is unnoticeable — it feels like we\'re on the same machine.' },
    { name: 'Sara Chen', role: 'CS Student', text: 'I use this for every group project now. The room codes make it so easy to jump into a session and start coding together.' },
    { name: 'Marcus Johnson', role: 'Tech Lead', text: 'The integrated chat and multi-language execution make this the most complete collaborative editor I\'ve used. Impressive work.' },
];

/* ─── Styles (inline for guaranteed rendering) ─── */
const S = {
    page: { minHeight: '100vh', background: '#080808', color: '#ffffff', fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif", overflowX: 'hidden' },
    nav: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '24px 48px', maxWidth: '1280px', margin: '0 auto', position: 'relative', zIndex: 20 },
    logo: { display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' },
    logoIcon: { width: '40px', height: '40px', borderRadius: '10px', background: '#6C5CE7', display: 'flex', alignItems: 'center', justifyContent: 'center' },
    logoText: { fontSize: '22px', fontWeight: 800, color: '#fff', letterSpacing: '-0.02em' },
    navLinks: { display: 'flex', alignItems: 'center', gap: '36px' },
    navLink: { color: '#999', fontSize: '15px', fontWeight: 500, textDecoration: 'none', transition: 'color 0.2s' },
    getStartedBtn: {
        padding: '12px 28px', borderRadius: '100px', background: '#fff', color: '#080808',
        fontWeight: 700, fontSize: '15px', border: 'none', cursor: 'pointer', textDecoration: 'none',
        transition: 'all 0.3s ease', display: 'inline-flex', alignItems: 'center', gap: '6px'
    },
    hero: { maxWidth: '1100px', margin: '0 auto', padding: '100px 24px 120px', textAlign: 'center', position: 'relative' },
    badge: {
        display: 'inline-flex', alignItems: 'center', gap: '10px',
        padding: '8px 20px', borderRadius: '100px', marginBottom: '48px',
        background: 'rgba(108, 92, 231, 0.08)', border: '1px solid rgba(108, 92, 231, 0.25)',
        color: '#a89aec', fontSize: '14px', fontWeight: 500
    },
    badgeDot: { width: '8px', height: '8px', borderRadius: '50%', background: '#6C5CE7', boxShadow: '0 0 12px #6C5CE7' },
    h1: { fontSize: 'clamp(52px, 8vw, 96px)', fontWeight: 900, lineHeight: 1.0, letterSpacing: '-0.04em', marginBottom: '32px' },
    h1Purple: { background: 'linear-gradient(135deg, #6C5CE7, #a29bfe)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' },
    h1Dim: { color: 'rgba(255,255,255,0.4)' },
    subtitle: { fontSize: '18px', lineHeight: 1.7, color: '#666', maxWidth: '680px', margin: '0 auto 48px' },
    heroBtns: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' },
    primaryBtn: {
        padding: '16px 36px', borderRadius: '100px',
        background: '#6C5CE7', color: '#fff', fontWeight: 700, fontSize: '16px',
        border: 'none', cursor: 'pointer', textDecoration: 'none',
        display: 'inline-flex', alignItems: 'center', gap: '8px',
        transition: 'all 0.3s ease', boxShadow: '0 0 40px rgba(108,92,231,0.25)'
    },
    secondaryBtn: {
        padding: '16px 36px', borderRadius: '100px',
        background: 'transparent', color: '#999', fontWeight: 600, fontSize: '16px',
        border: '1px solid #333', cursor: 'pointer', textDecoration: 'none',
        display: 'inline-flex', alignItems: 'center', gap: '8px',
        transition: 'all 0.3s ease'
    },
    section: { maxWidth: '1200px', margin: '0 auto', padding: '100px 24px' },
    sectionTitle: { fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 800, textAlign: 'center', marginBottom: '16px', letterSpacing: '-0.03em' },
    sectionSub: { color: '#666', textAlign: 'center', marginBottom: '64px', fontSize: '16px', maxWidth: '560px', margin: '0 auto 64px' },
    featureGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2px' },
    featureCard: {
        padding: '36px', background: '#111', border: '1px solid #1a1a1a',
        transition: 'all 0.3s ease', cursor: 'default'
    },
    featureIconWrap: { width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(108,92,231,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' },
    featureTitle: { fontSize: '18px', fontWeight: 700, marginBottom: '8px' },
    featureDesc: { fontSize: '14px', color: '#666', lineHeight: 1.7, margin: 0 },
    techGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px' },
    techCard: { padding: '32px', borderRadius: '16px', background: '#111', border: '1px solid #1a1a1a', textAlign: 'center' },
    testimonialGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' },
    testimonialCard: { padding: '32px', borderRadius: '16px', background: '#111', border: '1px solid #1a1a1a' },
    testimonialText: { fontSize: '15px', color: '#999', lineHeight: 1.7, marginBottom: '20px', fontStyle: 'italic' },
    testimonialName: { fontSize: '15px', fontWeight: 700, color: '#fff' },
    testimonialRole: { fontSize: '13px', color: '#666' },
    divider: { width: '100%', height: '1px', background: '#1a1a1a' },
    cta: { maxWidth: '800px', margin: '0 auto', padding: '100px 24px', textAlign: 'center' },
    footer: { borderTop: '1px solid #1a1a1a', padding: '32px 48px', maxWidth: '1280px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '13px', color: '#444' },
};

export default function LandingPage() {
    const { user } = useAuth();
    const heroRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
    const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

    return (
        <div style={S.page}>
            {/* ─── Background Glow ─── */}
            <div style={{ position: 'fixed', top: '-300px', left: '50%', transform: 'translateX(-50%)', width: '800px', height: '800px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(108,92,231,0.07) 0%, transparent 60%)', pointerEvents: 'none', zIndex: 0 }} />

            {/* ─── Navbar ─── */}
            <motion.nav initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} style={S.nav}>
                <Link to="/" style={S.logo}>
                    <div style={S.logoIcon}>
                        <Code2 style={{ width: '22px', height: '22px', color: '#fff' }} />
                    </div>
                    <span style={S.logoText}>CodeCollab</span>
                </Link>

                <div style={S.navLinks}>
                    <a href="#features" style={S.navLink}>Features</a>
                    <a href="#tech-stack" style={S.navLink}>Tech Stack</a>
                    <a href="#testimonials" style={S.navLink}>Testimonials</a>
                    {user ? (
                        <Link to="/dashboard" style={S.getStartedBtn}>Dashboard</Link>
                    ) : (
                        <Link to="/signup" style={S.getStartedBtn}>Get Started</Link>
                    )}
                </div>
            </motion.nav>

            {/* ─── Hero ─── */}
            <motion.section ref={heroRef} style={{ ...S.hero, opacity: heroOpacity, scale: heroScale }}>
                <motion.div initial="hidden" animate="visible" variants={fadeIn} custom={0} style={S.badge}>
                    <span style={S.badgeDot} />
                    v2.0 is now live
                </motion.div>

                <motion.h1 initial="hidden" animate="visible" variants={fadeIn} custom={1} style={S.h1}>
                    Code Together,
                    <br />
                    <span style={S.h1Purple}>Real-Time</span>
                    <br />
                    <span style={S.h1Dim}>Forever.</span>
                </motion.h1>

                <motion.p initial="hidden" animate="visible" variants={fadeIn} custom={2} style={S.subtitle}>
                    Experience the future of collaborative development. Zero latency.
                    Room-based sessions. Integrated chat. Powered by WebSocket mastery.
                </motion.p>

                <motion.div initial="hidden" animate="visible" variants={fadeIn} custom={3} style={S.heroBtns}>
                    <Link to="/signup" style={S.primaryBtn}
                        onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 0 60px rgba(108,92,231,0.4)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 0 40px rgba(108,92,231,0.25)'; e.currentTarget.style.transform = 'translateY(0)'; }}
                    >
                        Start Coding <ArrowRight style={{ width: '18px', height: '18px' }} />
                    </Link>
                    <a href="#features" style={S.secondaryBtn}
                        onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#555'; e.currentTarget.style.color = '#ccc'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#333'; e.currentTarget.style.color = '#999'; }}
                    >
                        Learn More <ChevronRight style={{ width: '18px', height: '18px' }} />
                    </a>
                </motion.div>
            </motion.section>

            {/* ─── Divider ─── */}
            <div style={S.divider} />

            {/* ─── Features ─── */}
            <section id="features" style={S.section}>
                <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} style={S.sectionTitle}>
                    Built for <span style={S.h1Purple}>developers</span>
                </motion.h2>
                <motion.p initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} custom={1} style={S.sectionSub}>
                    Everything you need to collaborate, code, and ship — in one place.
                </motion.p>

                <div style={S.featureGrid}>
                    {features.map(({ icon: Icon, title, desc }, i) => (
                        <motion.div
                            key={title}
                            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} custom={i}
                            style={S.featureCard}
                            onMouseEnter={(e) => { e.currentTarget.style.background = '#151515'; e.currentTarget.style.borderColor = '#252525'; }}
                            onMouseLeave={(e) => { e.currentTarget.style.background = '#111'; e.currentTarget.style.borderColor = '#1a1a1a'; }}
                        >
                            <div style={S.featureIconWrap}>
                                <Icon style={{ width: '24px', height: '24px', color: '#6C5CE7' }} />
                            </div>
                            <h3 style={S.featureTitle}>{title}</h3>
                            <p style={S.featureDesc}>{desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            <div style={S.divider} />

            {/* ─── Tech Stack ─── */}
            <section id="tech-stack" style={S.section}>
                <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} style={S.sectionTitle}>
                    Powered by <span style={S.h1Purple}>modern tech</span>
                </motion.h2>
                <motion.p initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} custom={1} style={S.sectionSub}>
                    A production-grade stack designed for speed, scale, and reliability.
                </motion.p>

                <div style={S.techGrid}>
                    {techStack.map(({ icon: Icon, name, desc }, i) => (
                        <motion.div
                            key={name}
                            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} custom={i}
                            style={S.techCard}
                            onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#6C5CE7'; e.currentTarget.style.boxShadow = '0 0 30px rgba(108,92,231,0.08)'; }}
                            onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#1a1a1a'; e.currentTarget.style.boxShadow = 'none'; }}
                        >
                            <Icon style={{ width: '32px', height: '32px', color: '#6C5CE7', marginBottom: '16px' }} />
                            <h3 style={{ ...S.featureTitle, fontSize: '16px' }}>{name}</h3>
                            <p style={S.featureDesc}>{desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            <div style={S.divider} />

            {/* ─── Testimonials ─── */}
            <section id="testimonials" style={S.section}>
                <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} style={S.sectionTitle}>
                    Loved by <span style={S.h1Purple}>developers</span>
                </motion.h2>
                <motion.p initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} custom={1} style={S.sectionSub}>
                    See what builders are saying about CodeCollab.
                </motion.p>

                <div style={S.testimonialGrid}>
                    {testimonials.map(({ name, role, text }, i) => (
                        <motion.div
                            key={name}
                            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} custom={i}
                            style={S.testimonialCard}
                            onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#252525'; }}
                            onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#1a1a1a'; }}
                        >
                            <p style={S.testimonialText}>"{text}"</p>
                            <div>
                                <p style={S.testimonialName}>{name}</p>
                                <p style={S.testimonialRole}>{role}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            <div style={S.divider} />

            {/* ─── CTA ─── */}
            <section style={S.cta}>
                <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}
                    style={{ ...S.sectionTitle, marginBottom: '20px' }}
                >
                    Ready to build <span style={S.h1Purple}>together</span>?
                </motion.h2>
                <motion.p initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} custom={1}
                    style={{ color: '#666', marginBottom: '40px', fontSize: '16px' }}
                >
                    Create a room, share the code, and start coding — no downloads, no setup.
                </motion.p>
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} custom={2}>
                    <Link to="/signup" style={S.primaryBtn}
                        onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 0 60px rgba(108,92,231,0.4)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 0 40px rgba(108,92,231,0.25)'; e.currentTarget.style.transform = 'translateY(0)'; }}
                    >
                        Get Started Free <ArrowRight style={{ width: '18px', height: '18px' }} />
                    </Link>
                </motion.div>
            </section>

            {/* ─── Footer ─── */}
            <footer style={S.footer}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ ...S.logoIcon, width: '24px', height: '24px', borderRadius: '6px' }}>
                        <Code2 style={{ width: '14px', height: '14px', color: '#fff' }} />
                    </div>
                    <span style={{ fontWeight: 700, color: '#666' }}>CodeCollab</span>
                </div>
                <span>© {new Date().getFullYear()} CodeCollab. Built with passion.</span>
            </footer>
        </div>
    );
}
