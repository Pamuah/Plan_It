import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

// ─── Lazy Image with skeleton loader ────────────────────────────────────────
const LazyImage = ({ src, alt, className }) => {
  const [loaded, setLoaded] = useState(false);
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      {/* Skeleton */}
      {!loaded && (
        <div className="absolute inset-0 bg-neutral-800 animate-pulse">
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-800 via-neutral-700 to-neutral-800 animate-shimmer" />
        </div>
      )}
      {inView && (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          onLoad={() => setLoaded(true)}
          className={`w-full h-full object-cover transition-opacity duration-700 ${loaded ? "opacity-100" : "opacity-0"}`}
        />
      )}
    </div>
  );
};

// ─── Fade-in on scroll ───────────────────────────────────────────────────────
const FadeIn = ({ children, delay = 0, className = "" }) => {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${className}`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
};

// ─── Nav Button ──────────────────────────────────────────────────────────────
const NavBtn = ({ title, onPress, outline }) => (
  <button
    onClick={onPress}
    className={`px-5 py-2 text-sm font-semibold tracking-widest uppercase transition-all duration-200 rounded-sm cursor-pointer ${
      outline
        ? "border border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-neutral-900"
        : "bg-blue-500 text-white hover:bg-blue-400"
    }`}
  >
    {title}
  </button>
);

// ─── Section Label ───────────────────────────────────────────────────────────
const SectionLabel = ({ children }) => (
  <div className="flex items-center gap-4 mb-3">
    <span className="w-8 h-px bg-blue-400" />
    <span className="text-xs font-bold tracking-[0.25em] uppercase text-blue-400">
      {children}
    </span>
  </div>
);

// ─── Event Card ──────────────────────────────────────────────────────────────
const EventCard = ({ src, title, description, delay }) => (
  <FadeIn delay={delay} className="flex-1">
    <div className="relative h-64 mb-4 overflow-hidden rounded-sm group">
      <LazyImage
        src={src}
        alt={title}
        className="w-full h-full transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/80 via-transparent to-transparent" />
      <p className="absolute text-xl font-bold tracking-wide text-white bottom-4 left-4">
        {title}
      </p>
    </div>
    <p className="text-sm leading-relaxed text-neutral-400">{description}</p>
  </FadeIn>
);

// ─── Main Landing Page ───────────────────────────────────────────────────────
const LandingPage = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="flex flex-col w-screen min-h-screen font-sans text-white bg-neutral-950">
      {/* ── Navbar ── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 h-16 transition-all duration-300 ${scrolled ? "bg-neutral-950/95 backdrop-blur border-b border-neutral-800 shadow-xl" : "bg-transparent"}`}
      >
        <div className="flex items-center gap-2">
          <span className="text-2xl font-black tracking-tight text-blue-400">
            EVE
          </span>
          <span className="text-2xl font-light tracking-tight text-white">
            NT
          </span>
          <span className="ml-1 text-xs font-medium tracking-widest uppercase text-neutral-500">
            Co.
          </span>
        </div>
        <div className="flex items-center gap-4">
          <NavBtn title="Login" onPress={() => navigate("/signIn")} outline />
          <NavBtn title="Register" onPress={() => navigate("/signUp")} />
        </div>
      </nav>

      {/* ── Hero ── */}
      <div className="relative flex items-end w-full h-screen overflow-hidden">
        <LazyImage
          src="../assets/concertphoto.jpg"
          alt="Hero"
          className="absolute inset-0 w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/50 to-neutral-950/20" />

        <div className="relative z-10 max-w-3xl px-10 pb-20">
          <FadeIn delay={100}>
            <SectionLabel>Premium Event Planning</SectionLabel>
          </FadeIn>
          <FadeIn delay={250}>
            <h1 className="text-6xl md:text-7xl font-black leading-[1.05] tracking-tight mb-6">
              Your Vision,
              <br />
              <span className="text-blue-400">Brought to Life.</span>
            </h1>
          </FadeIn>
          <FadeIn delay={400}>
            <p className="max-w-lg mb-8 text-lg leading-relaxed text-neutral-300">
              Seamless planning and exceptional execution — from intimate
              gatherings to grand spectacles. Let us craft your unforgettable
              moment.
            </p>
          </FadeIn>
          <FadeIn delay={550}>
            <div className="flex gap-4">
              <NavBtn title="Get Started" onPress={() => navigate("/signUp")} />
              <NavBtn title="Learn More" onPress={() => {}} outline />
            </div>
          </FadeIn>
        </div>
      </div>

      {/* ── Parties Section ── */}
      <section className="px-8 pt-20 pb-12">
        <FadeIn>
          <SectionLabel>Celebrations</SectionLabel>
          <h2 className="mb-2 text-4xl font-black tracking-tight">
            Parties <span className="text-blue-400">&</span> Gatherings
          </h2>
          <p className="max-w-lg mb-12 text-neutral-400">
            Every celebration deserves a touch of magic. We tailor every detail
            to your vision.
          </p>
        </FadeIn>
        <div className="flex flex-col gap-8 md:flex-row">
          <EventCard
            src="../assets/birthday photo.jpg"
            title="Birthdays"
            description="Personalised themes, fun activities, and flawless execution. Enjoy the celebration while we handle every detail."
            delay={0}
          />
          <EventCard
            src="../assets/wedding photo.jpg"
            title="Weddings"
            description="From intimate ceremonies to grand receptions — we craft every detail to make your special day truly unforgettable."
            delay={150}
          />
          <EventCard
            src="../assets/funeral photo.jpg"
            title="Other Events"
            description="Corporate events, anniversaries, or special gatherings — we ensure every moment is memorable and seamlessly executed."
            delay={300}
          />
        </div>
      </section>

      {/* ── Divider ── */}
      <div className="mx-8 my-4 border-t border-neutral-800" />

      {/* ── Concerts Section ── */}
      <section className="px-8 py-16">
        <div className="flex flex-col items-center gap-12 md:flex-row">
          {/* Left text */}
          <div className="flex-1">
            <FadeIn>
              <SectionLabel>Live Entertainment</SectionLabel>
              <h2 className="mb-8 text-4xl font-black tracking-tight">
                Concerts <span className="text-blue-400">&</span> Shows
              </h2>
            </FadeIn>

            {[
              {
                title: "Musical Concerts",
                desc: "Experience the thrill of live music. We bring you closer to your favourite artists with unforgettable performances and an electric atmosphere.",
              },
              {
                title: "Comedy Concerts",
                desc: "Laughter, fun, and a memorable experience for everyone — our comedy events deliver the perfect night out.",
              },
              {
                title: "Conventions & Rallies",
                desc: "We bring people together to share ideas, passions, and enthusiasm in one powerful, well-organized space.",
              },
            ].map((item, i) => (
              <FadeIn key={item.title} delay={i * 150}>
                <div className="pl-4 mb-6 transition-colors duration-300 border-l-2 border-blue-400/40 hover:border-blue-400">
                  <p className="mb-1 font-bold text-white">{item.title}</p>
                  <p className="text-sm leading-relaxed text-neutral-400">
                    {item.desc}
                  </p>
                </div>
              </FadeIn>
            ))}

            <FadeIn delay={500}>
              <div className="flex gap-4 mt-8">
                <NavBtn
                  title="Login"
                  onPress={() => navigate("/signIn")}
                  outline
                />
                <NavBtn title="Register" onPress={() => navigate("/signUp")} />
              </div>
            </FadeIn>
          </div>

          {/* Right image */}
          <FadeIn className="flex-1" delay={200}>
            <div className="relative rounded-sm overflow-hidden h-[480px] group">
              <LazyImage
                src="../assets/rave2.jpg"
                alt="Concert"
                className="w-full h-full transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-transparent" />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Divider ── */}
      <div className="mx-8 my-4 border-t border-neutral-800" />

      {/* ── Traditional Events Section ── */}
      <section className="px-8 py-16">
        <FadeIn>
          <SectionLabel>Cultural</SectionLabel>
          <h2 className="mb-2 text-4xl font-black tracking-tight">
            Traditional <span className="text-blue-400">Events</span>
          </h2>
          <p className="max-w-lg mb-12 text-neutral-400">
            Honoring culture, community, and connection with the care and
            reverence they deserve.
          </p>
        </FadeIn>

        <div className="flex flex-col gap-8 md:flex-row">
          {[
            {
              src: "../assets/namingceremony2.jpg",
              title: "Naming Ceremonies",
              desc: "Celebrate the beautiful beginning of a new life. A heartfelt gathering of family and friends to bless and welcome your little one with love, joy, and cherished tradition.",
              delay: 0,
            },
            {
              src: "../assets/funeral2.JPG",
              title: "Funerals",
              desc: "Compassionate and respectful services to help you honour your loved ones — personalized arrangements that reflect the life and memory of those you cherish.",
              delay: 200,
            },
          ].map((item) => (
            <FadeIn key={item.title} delay={item.delay} className="flex-1">
              <div className="relative mb-4 overflow-hidden rounded-sm group h-80">
                <LazyImage
                  src={item.src}
                  alt={item.title}
                  className="w-full h-full transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/80 via-transparent to-transparent" />
                <p className="absolute text-xl font-bold tracking-wide text-white bottom-4 left-4">
                  {item.title}
                </p>
              </div>
              <p className="text-sm leading-relaxed text-neutral-400">
                {item.desc}
              </p>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <FadeIn>
        <section className="relative mx-8 mb-16 overflow-hidden rounded-sm">
          <div className="flex flex-col items-center justify-between gap-6 px-10 py-12 bg-blue-600 md:flex-row">
            <div>
              <p className="text-3xl font-black tracking-tight text-white">
                Ready to plan your event?
              </p>
              <p className="mt-1 text-sm text-blue-100">
                Join hundreds of clients who trust us with their most important
                moments.
              </p>
            </div>
            <button
              onClick={() => navigate("/signUp")}
              className="px-8 py-3 text-sm font-bold tracking-widest text-blue-600 uppercase transition-colors duration-200 bg-white rounded-sm cursor-pointer shrink-0 hover:bg-blue-50"
            >
              Get Started
            </button>
          </div>
        </section>
      </FadeIn>

      {/* ── Footer ── */}
      <footer className="flex flex-col items-center justify-between gap-4 px-8 py-8 text-xs border-t border-neutral-800 md:flex-row text-neutral-500">
        <div className="flex items-center gap-2">
          <span className="font-black text-blue-400">EVENT</span>
          <span className="font-light">Co.</span>
        </div>
        <p>© {new Date().getFullYear()} Event Co. All rights reserved.</p>
        <div className="flex gap-6">
          {["Privacy", "Terms", "Contact"].map((l) => (
            <button
              key={l}
              className="transition-colors cursor-pointer hover:text-blue-400"
            >
              {l}
            </button>
          ))}
        </div>
      </footer>

      {/* ── Shimmer animation ── */}
      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .animate-shimmer {
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite;
        }
      `}</style>
    </div>
  );
};

export default LandingPage;
