import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MousePointer2, Calendar, Mail, CheckCircle, ArrowRight, Zap, Target } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

import { getCalApi } from "@calcom/embed-react";

const Navbar = () => {
  const navRef = useRef(null);

  useEffect(() => {
    (async function () {
      const cal = await getCalApi();
      cal("ui", { "styles": { "branding": { "brandColor": "#7B61FF" } }, "hideEventTypeDetails": true, "layout": "month_view", "theme": "dark" });
    })();

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        start: 'top -50',
        end: 99999,
        toggleClass: { className: 'nav-scrolled', targets: navRef.current },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <nav ref={navRef} className="fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 px-6 py-3 rounded-[2rem] border border-transparent [&.nav-scrolled]:bg-[#0A0A14]/60 [&.nav-scrolled]:backdrop-blur-xl [&.nav-scrolled]:border-white/10 w-[90%] max-w-5xl flex justify-between items-center">
      <div className="font-heading font-bold text-xl tracking-tighter text-ghost">Satori AI</div>
      <div className="hidden md:flex items-center gap-8 font-data text-xs uppercase tracking-widest text-ghost/70">
        <a href="#features" className="hover:text-plasma transition-colors">Capabilities</a>
        <a href="#protocol" className="hover:text-plasma transition-colors">Protocol</a>
        <a href="#pricing" className="hover:text-plasma transition-colors">Plans</a>
      </div>
      <button data-cal-link="don-semana-ainzsw/45min" data-cal-config='{"layout":"month_view","theme":"dark"}' className="button-slide rounded-full px-5 py-2 text-sm font-heading font-semibold bg-white/5 border border-white/10 text-ghost magnetic">
        <span>Book Strategy Call</span>
      </button>
    </nav>
  );
};

const Hero = () => {
  const container = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-elem', {
        y: 40,
        opacity: 0,
        stagger: 0.08,
        duration: 1.2,
        ease: 'power3.out',
        delay: 0.2
      });
    }, container);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={container} className="relative h-[100dvh] w-full overflow-hidden flex items-end pb-24 px-8 md:px-16">
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop"
          alt="Abstract network texture"
          className="w-full h-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A14] via-[#0A0A14]/30 to-transparent"></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-start gap-4">
        <div className="flex flex-col text-ghost leading-[0.9]">
          <span className="hero-elem font-heading font-bold text-5xl md:text-8xl tracking-tight">Work smarter.</span>
          <span className="hero-elem font-drama italic text-5xl md:text-8xl text-plasma pr-4">Operate calmer.</span>
        </div>
        <p className="hero-elem font-data mt-6 text-ghost/60 max-w-md text-sm leading-relaxed">
          AI copilots for small businesses that want systems handling the busywork — so owners can focus on decisions that actually move the business forward.
        </p>
        <div className="hero-elem mt-8">
          <button data-cal-link="don-semana-ainzsw/45min" data-cal-config='{"layout":"month_view","theme":"dark"}' className="button-slide rounded-[2rem] px-8 py-4 font-heading font-semibold bg-plasma text-white magnetic flex items-center gap-2">
            <span>Explore the System</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
};

const ShufflerCard = () => {
  const [items, setItems] = useState([
    { id: 1, icon: <Mail size={16} />, label: "Email Triage" },
    { id: 2, icon: <Calendar size={16} />, label: "Calendar Sync" },
    { id: 3, icon: <Zap size={16} />, label: "Task Routing" }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setItems(prev => {
        const newArr = [...prev];
        const last = newArr.pop();
        newArr.unshift(last);
        return newArr;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="glass-panel p-8 rounded-[2rem] flex flex-col h-full min-h-[400px]">
      <div className="flex justify-between items-center mb-12">
        <h3 className="font-heading font-bold text-xl text-ghost">Automated Operations</h3>
        <span className="font-data text-xs text-plasma bg-plasma/10 px-3 py-1 rounded-full">Automate</span>
      </div>
      <div className="relative flex-1 flex items-center justify-center h-full" style={{ perspective: '1000px' }}>
        {items.map((item, i) => (
          <div
            key={item.id}
            className="absolute w-full max-w-[240px] bg-graphite/80 border border-white/10 rounded-2xl p-4 flex items-center gap-4 transition-all duration-[600ms]"
            style={{
              transform: `translateY(${i * 20 - 20}px) scale(${1 - i * 0.05})`,
              opacity: 1 - i * 0.2,
              zIndex: 3 - i,
              transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
            }}
          >
            <div className="bg-[#0A0A14] p-2 rounded-lg text-plasma">{item.icon}</div>
            <span className="font-heading text-sm text-ghost font-medium">{item.label}</span>
          </div>
        ))}
      </div>
      <p className="font-heading font-medium text-sm text-ghost mb-4">Routine work handled automatically</p>
      <ul className="font-data text-xs text-ghost/60 space-y-2 mb-6 flex-1">
        <li>&bull; Email triage and prioritization</li>
        <li>&bull; Calendar synchronization</li>
        <li>&bull; Task routing across teams</li>
        <li>&bull; Workflow automation that reduces administrative overhead</li>
      </ul>
      <p className="font-data text-xs text-ghost/50 mt-auto border-t border-white/10 pt-4">
        Your copilot manages repetitive processes so your team can focus on meaningful work.
      </p>
    </div>
  );
};

const TypewriterCard = () => {
  const fullText = "Receiving inbound call…\nUnderstanding request: Booking\nChecking availability…\nSlot confirmed: Tomorrow 10:00 AM\nAppointment scheduled. Client notified.";
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < fullText.length) {
      const timeout = setTimeout(() => {
        setText(prev => prev + fullText.charAt(index));
        setIndex(i => i + 1);
      }, Math.random() * 50 + 20);
      return () => clearTimeout(timeout);
    } else {
      const reset = setTimeout(() => {
        setText("");
        setIndex(0);
      }, 4000);
      return () => clearTimeout(reset);
    }
  }, [index, fullText]);

  return (
    <div className="glass-panel p-8 rounded-[2rem] flex flex-col h-full min-h-[400px]">
      <div className="flex justify-between items-center mb-8">
        <h3 className="font-heading font-bold text-xl text-ghost">Intelligent Reception</h3>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-plasma animate-pulse"></div>
          <span className="font-data text-xs text-ghost/70 uppercase">Live System Activity</span>
        </div>
      </div>
      <div className="flex-1 bg-[#0A0A14]/50 rounded-2xl p-6 border border-white/5 font-data text-xs text-ghost leading-relaxed whitespace-pre-wrap relative overflow-hidden">
        {text}
        <span className="inline-block w-2 h-3 bg-plasma ml-1 animate-pulse align-middle"></span>
      </div>
      <p className="font-data text-xs text-ghost/50 mt-8">
        AI copilots handle calls, bookings, and common customer questions instantly and consistently.
      </p>
    </div>
  );
};

const SchedulerCard = () => {
  const container = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1 });
      tl.to('.anim-cursor', { x: 80, y: 60, duration: 1, ease: 'power2.inOut', delay: 0.5 })
        .to('.anim-cursor', { scale: 0.8, duration: 0.1, yoyo: true, repeat: 1 })
        .to('.day-cell-3', { backgroundColor: '#7B61FF', color: '#FFF', duration: 0.2 }, "-=0.1")
        .to('.anim-cursor', { x: 160, y: 140, duration: 1, ease: 'power2.inOut', delay: 0.5 })
        .to('.anim-cursor', { scale: 0.8, duration: 0.1, yoyo: true, repeat: 1 })
        .to('.save-btn', { scale: 0.95, duration: 0.1, yoyo: true, repeat: 1 }, "-=0.1")
        .to('.anim-cursor', { opacity: 0, duration: 0.2, delay: 0.5 })
        .set('.anim-cursor', { x: 0, y: 0, opacity: 1 })
        .set('.day-cell-3', { backgroundColor: 'transparent', color: 'rgba(240, 239, 244, 0.5)' });
    }, container);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={container} className="glass-panel p-8 rounded-[2rem] flex flex-col h-full min-h-[400px] relative">
      <div className="flex justify-between items-center mb-8">
        <h3 className="font-heading font-bold text-xl text-ghost">Team Enablement</h3>
        <span className="font-data text-xs text-plasma bg-plasma/10 px-3 py-1 rounded-full">Training</span>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center relative">
        <div className="grid grid-cols-7 gap-2 mb-6 w-full max-w-[200px]">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
            <div
              key={i}
              className={`w-6 h-6 rounded flex items-center justify-center font-data text-[10px] text-ghost/50 border border-white/5 day-cell-${i}`}
            >
              {day}
            </div>
          ))}
        </div>
        <div className="save-btn w-full max-w-[200px] bg-white/5 border border-white/10 rounded-lg py-2 flex justify-center text-xs font-heading font-medium text-ghost/70">
          Save Protocol
        </div>

        <MousePointer2
          className="anim-cursor absolute top-0 left-0 text-white drop-shadow-lg z-20 pointer-events-none"
          size={24}
          fill="#000"
        />
      </div>

      <p className="font-heading font-medium text-sm text-ghost mb-4 mt-8">Systems your team actually uses</p>
      <ul className="font-data text-xs text-ghost/60 space-y-2 mb-6 flex-1">
        <li>&bull; Guided onboarding</li>
        <li>&bull; Operational protocols saved</li>
        <li>&bull; Workflow refinement</li>
        <li>&bull; Independent team ownership</li>
      </ul>
      <p className="font-data text-xs text-ghost/50 mt-auto border-t border-white/10 pt-4">
        We train your team alongside deployment so automation becomes part of daily operations — not another unused tool.
      </p>
    </div>
  );
};

const Features = () => {
  return (
    <section id="features" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="mb-16">
        <h2 className="font-heading font-bold text-4xl md:text-5xl text-ghost tracking-tight mb-4 text-center">Inside the Copilot</h2>
        <p className="font-data text-ghost/60 text-center max-w-2xl mx-auto">
          See how AI copilots quietly handle the work behind your business operations.
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ShufflerCard />
        <TypewriterCard />
        <SchedulerCard />
      </div>
      <div className="mt-16 text-center border-t border-white/5 pt-8">
        <p className="font-data text-sm text-ghost/60">
          These aren&rsquo;t demos &mdash; they&rsquo;re examples of systems running inside real businesses.
        </p>
      </div>
    </section>
  );
};

const Philosophy = () => {
  const container = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.phil-elem', {
        scrollTrigger: {
          trigger: container.current,
          start: 'top 70%',
        },
        y: 30,
        opacity: 0,
        stagger: 0.15,
        duration: 1,
        ease: 'power3.out'
      });

      gsap.to('.parallax-bg', {
        scrollTrigger: {
          trigger: container.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        },
        y: 100,
        ease: 'none'
      });
    }, container);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={container} className="relative py-32 overflow-hidden bg-[#0A0A14] flex flex-col items-center justify-center text-center px-6">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=2070&auto=format&fit=crop"
          alt="Abstract pattern"
          className="parallax-bg w-[120%] h-[120%] object-cover opacity-50 origin-top -ml-[10%]"
        />
        <div className="absolute inset-0 bg-[#0A0A14]/50 backdrop-blur-[2px]"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        <p className="phil-elem font-heading text-lg md:text-2xl text-ghost/60 mb-6 font-light">
          Technology <span className="text-ghost font-medium">shouldn&rsquo;t add complexity.</span>
        </p>
        <p className="phil-elem font-drama italic text-5xl md:text-[5rem] text-ghost leading-[1.1]">
          We <span className="text-plasma">automate the operational bottlenecks</span> that slow your business down &mdash; one step at a time.
        </p>
      </div>
    </section>
  );
};

const ProtocolContent = [
  {
    step: "01",
    title: "Identify Inefficiencies",
    desc: "We map where your business relies on manual effort — then deploy an AI copilot to handle the work that shouldn’t require your attention."
  },
  {
    step: "02",
    title: "Deploy Your AI Copilot",
    desc: "We embed intelligent automation into your business systems so tasks, follow-ups, and workflows continue running — even when you’re focused elsewhere."
  },
  {
    step: "03",
    title: "Monitor & Optimize Operations",
    desc: "After deployment, we monitor performance, train your team, and continuously refine the system so your automation runs reliably and improves over time."
  }
];

const Protocol = () => {
  const container = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.protocol-card');

      cards.forEach((card, i) => {
        if (i === cards.length - 1) return;

        ScrollTrigger.create({
          trigger: card,
          start: 'top top',
          endTrigger: container.current,
          end: 'bottom bottom',
          pin: true,
          pinSpacing: false,
          animation: gsap.to(card, {
            scale: 0.9,
            opacity: 0.5,
            filter: 'blur(10px)',
            ease: 'none'
          }),
          scrub: true,
        });
      });
    }, container);
    return () => ctx.revert();
  }, []);

  return (
    <section id="protocol" ref={container} className="bg-[#0A0A14] pb-24 relative">
      {ProtocolContent.map((item, i) => (
        <div key={i} className="protocol-card h-screen w-full flex items-center justify-center sticky top-0 px-6">
          <div className="glass-panel w-full max-w-5xl h-[70vh] rounded-[3xl] p-10 md:p-16 flex flex-col md:flex-row shadow-glow bg-[#18181B]/40 backdrop-blur-xl border border-white/5">
            <div className="flex-1 flex flex-col justify-between">
              <span className="font-data text-plasma text-2xl">[{item.step}]</span>
              <div>
                <h3 className="font-heading font-bold text-4xl md:text-5xl text-ghost mb-6 tracking-tight">{item.title}</h3>
                <p className="font-sans text-ghost/70 text-lg md:text-xl max-w-md">{item.desc}</p>
              </div>
            </div>
            <div className="flex-1 flex items-center justify-center mt-12 md:mt-0 relative">
              {i === 0 && (
                <div className="w-48 h-48 border border-white/20 rounded-full flex items-center justify-center relative spin-slow">
                  <div className="w-32 h-32 border border-plasma/50 rounded-full border-dashed absolute spin-reverse relative flex items-center justify-center">
                    <Target size={32} className="text-plasma opacity-50 absolute logo-static" />
                  </div>
                </div>
              )}
              {i === 1 && (
                <div className="w-full max-w-sm h-48 bg-[#18181B]/50 border border-white/5 rounded-2xl relative overflow-hidden flex flex-wrap gap-2 p-4 content-start">
                  {Array.from({ length: 40 }).map((_, idx) => (
                    <div key={idx} className="w-6 h-6 md:w-8 md:h-8 rounded bg-white/5"></div>
                  ))}
                  <div className="absolute top-0 left-0 w-full h-1 bg-plasma shadow-[0_0_15px_#7B61FF] laser-scan"></div>
                </div>
              )}
              {i === 2 && (
                <svg className="w-full h-32" viewBox="0 0 100 30" preserveAspectRatio="none">
                  <path
                    d="M 0,15 L 20,15 L 25,5 L 35,25 L 45,15 L 100,15"
                    fill="none"
                    stroke="#7B61FF"
                    strokeWidth="1"
                    className="ekg-path"
                    strokeDasharray="200"
                    strokeDashoffset="200"
                  />
                  <style>{`
                    .ekg-path { animation: dash 2s linear infinite; }
                    @keyframes dash { to { stroke-dashoffset: 0; } }
                    .laser-scan { animation: scan 3s ease-in-out infinite alternate; }
                    @keyframes scan { 0% { transform: translateY(0); } 100% { transform: translateY(190px); } }
                    .spin-slow { animation: spin 10s linear infinite; }
                    .spin-reverse { animation: spinRev 8s linear infinite; }
                    .logo-static { animation: spin 8s linear infinite reverse; }
                    @keyframes spin { 100% { transform: rotate(360deg); } }
                    @keyframes spinRev { 100% { transform: rotate(-360deg); } }
                  `}</style>
                </svg>
              )}
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

const Pricing = () => {
  return (
    <section id="pricing" className="py-32 px-6 max-w-7xl mx-auto relative z-10">
      <div className="text-center mb-16">
        <h2 className="font-heading font-bold text-4xl md:text-5xl text-ghost tracking-tight mb-4">Choose Your Copilot</h2>
        <p className="font-data text-ghost/50 text-sm">
          AI copilots designed to match how your business operates today &mdash; and where it&rsquo;s growing next.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        <div className="glass-panel p-10 rounded-[2rem] flex flex-col h-full magnetic cursor-pointer">
          <span className="font-data text-xs px-3 py-1 bg-white/5 rounded-full w-max text-ghost mb-6">Copilot Starter</span>
          <div className="font-heading font-bold text-4xl text-ghost mb-2">$1,500</div>
          <p className="font-data text-xs text-ghost/50 mb-8 max-w-xs">Ideal for solo operators ready to reclaim time from daily admin work.</p>
          <ul className="space-y-4 font-sans text-sm text-ghost/80 mb-12 flex-1">
            <li className="flex items-start gap-3"><CheckCircle size={16} className="text-plasma mt-0.5 shrink-0" /> <span>Email prioritization and routing</span></li>
            <li className="flex items-start gap-3"><CheckCircle size={16} className="text-plasma mt-0.5 shrink-0" /> <span>Calendar coordination</span></li>
            <li className="flex items-start gap-3"><CheckCircle size={16} className="text-plasma mt-0.5 shrink-0" /> <span>Core workflow automation</span></li>
          </ul>
          <button data-cal-link="don-semana-ainzsw/45min" data-cal-config='{"layout":"month_view","theme":"dark"}' className="button-slide w-full py-4 rounded-xl border border-white/10 font-heading font-semibold text-ghost flex items-center justify-center gap-2">
            <span>Start with a Copilot</span>
          </button>
        </div>

        <div className="bg-plasma p-[1px] rounded-[2rem] magnetic cursor-pointer transform scale-105 z-10 shadow-glow">
          <div className="bg-[#120f21] p-10 rounded-[2rem] h-full flex flex-col relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-plasma/20 blur-3xl rounded-full"></div>
            <span className="font-data text-xs px-3 py-1 bg-plasma/20 rounded-full w-max text-plasma mb-6 border border-plasma/30">Copilot Pro</span>
            <div className="font-heading font-bold text-4xl text-ghost mb-2">$3,000</div>
            <p className="font-data text-xs text-ghost/60 mb-8 max-w-xs">
              Built for growing teams ready to streamline operations.<br />
              <span className="text-plasma">Includes everything in Starter, plus:</span>
            </p>
            <ul className="space-y-4 font-sans text-sm text-ghost mb-12 flex-1">
              <li className="flex items-start gap-3"><CheckCircle size={16} className="text-plasma mt-0.5 shrink-0" /> <span>Customer communication automation</span></li>
              <li className="flex items-start gap-3"><CheckCircle size={16} className="text-plasma mt-0.5 shrink-0" /> <span>CRM synchronization</span></li>
              <li className="flex items-start gap-3"><CheckCircle size={16} className="text-plasma mt-0.5 shrink-0" /> <span>Cross-team workflow automation</span></li>
            </ul>
            <button data-cal-link="don-semana-ainzsw/45min" data-cal-config='{"layout":"month_view","theme":"dark"}' className="w-full py-4 rounded-xl bg-plasma hover:bg-[#8B74FF] transition-colors font-heading font-semibold text-white flex items-center justify-center gap-2">
              <span>Deploy My Copilot</span>
            </button>
          </div>
        </div>

        <div className="glass-panel p-10 rounded-[2rem] flex flex-col h-full magnetic cursor-pointer">
          <span className="font-data text-xs px-3 py-1 bg-white/5 rounded-full w-max text-ghost mb-6">Copilot Enterprise</span>
          <div className="font-heading font-bold text-4xl text-ghost mb-2">$5,000+</div>
          <p className="font-data text-xs text-ghost/50 mb-8 max-w-xs">A fully integrated AI copilot supporting daily business operations.</p>
          <ul className="space-y-4 font-sans text-sm text-ghost/80 mb-12 flex-1">
            <li className="flex items-start gap-3"><CheckCircle size={16} className="text-plasma mt-0.5 shrink-0" /> <span>AI Chief-of-Staff capabilities</span></li>
            <li className="flex items-start gap-3"><CheckCircle size={16} className="text-plasma mt-0.5 shrink-0" /> <span>Custom system integrations</span></li>
            <li className="flex items-start gap-3"><CheckCircle size={16} className="text-plasma mt-0.5 shrink-0" /> <span>Multi-channel operational support</span></li>
          </ul>
          <button data-cal-link="don-semana-ainzsw/45min" data-cal-config='{"layout":"month_view","theme":"dark"}' className="button-slide w-full py-4 rounded-xl border border-white/10 font-heading font-semibold text-ghost flex items-center justify-center gap-2">
            <span>Design My System</span>
          </button>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-[#05050A] rounded-t-[4rem] pt-20 pb-10 px-8 md:px-16 mt-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-12">
        <div className="max-w-sm">
          <div className="font-heading font-bold text-2xl tracking-tighter text-ghost mb-4">Satori AI</div>
          <p className="font-sans text-ghost/50 text-sm mb-8">
            AI Copilots for small businesses that want to work smarter. No tech team required.
          </p>
          <div className="flex items-center gap-3 font-data text-xs text-ghost/70 bg-white/5 px-4 py-2 rounded-full w-max border border-white/5 cursor-default">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            System Operational
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-2 gap-12">
          <div className="flex flex-col gap-4 font-sans text-sm text-ghost/60">
            <div className="font-data text-xs text-ghost/30 uppercase tracking-widest mb-2">Platform</div>
            <a href="#" className="hover:text-plasma transition-colors">Home</a>
            <a href="#features" className="hover:text-plasma transition-colors">Services</a>
            <a href="#protocol" className="hover:text-plasma transition-colors">About</a>
          </div>
          <div className="flex flex-col gap-4 font-sans text-sm text-ghost/60">
            <div className="font-data text-xs text-ghost/30 uppercase tracking-widest mb-2">Contact</div>
            <a href="mailto:don@satoriai.works" className="hover:text-plasma transition-colors">don@satoriai.works</a>
            <span className="hover:text-plasma transition-colors cursor-pointer">+1 (514) 589-8801</span>
            <span className="hover:text-plasma transition-colors cursor-pointer">Toronto, Canada</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center font-data text-xs text-ghost/40 gap-4">
        <span>© 2026 Satori AI Works. All rights reserved.</span>
        <div className="flex gap-6">
          <a href="#" className="hover:text-ghost">Privacy Policy</a>
          <a href="#" className="hover:text-ghost">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

function App() {
  return (
    <div className="w-full min-h-screen relative font-sans antialiased text-ghost selection:bg-plasma/30">
      <Navbar />
      <Hero />
      <Features />
      <Philosophy />
      <Protocol />
      <Pricing />
      <Footer />
    </div>
  );
}

export default App;
