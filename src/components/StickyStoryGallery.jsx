//src/components/StickyStoryGallery.jsx
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stories = [
  {
    title: "The Journey Begins",
    message: "A single step into the wild changes everything.",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
    align: "left"
  },
  {
    title: "Whispering Pines",
    message: "Listen closely; the forest has a language of its own.",
    image: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0",
    align: "right"
  },
  {
    title: "Golden Hour Peaks",
    message: "Where the sun kisses the earth one last time.",
    image: "https://images.pexels.com/photos/6602396/pexels-photo-6602396.jpeg",
    align: "left"
  },
  {
    title: "The Last Trail",
    message: "Every journey ends, but the memories walk beside us forever.",
    image: "https://res.cloudinary.com/dpfqlqewb/image/upload/v1763112724/last_trail.png",
    align: "center"
  },
];

export default function StickyStoryGallery() {
  const containerRef = useRef(null);
  const panelsRef = useRef([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const panels = panelsRef.current;

      // INITIAL STATE: Clip everything except the first slide
      gsap.set(panels.slice(1), { clipPath: "inset(100% 0% 0% 0%)" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: () => `+=${panels.length * 150}%`,
          pin: true,
          scrub: 1.2,
          pinSpacing: true,
        },
      });

      panels.forEach((panel, i) => {
        const isLast = i === panels.length - 1;
        const currentImg = panel.querySelector(".story-img");
        const currentWords = panel.querySelectorAll(".word-span");
        const currentMsg = panel.querySelector(".story-msg");

        // 1. Idle Background Movement (Ken Burns Effect)
        gsap.to(currentImg, {
          scale: 1.2,
          duration: 10,
          repeat: -1,
          yoyo: true,
          ease: "none"
        });

        if (!isLast) {
          const nextPanel = panels[i + 1];
          const nextImg = nextPanel.querySelector(".story-img");
          const nextWords = nextPanel.querySelectorAll(".word-span");
          const nextMsg = nextPanel.querySelector(".story-msg");

          // THE TRANSITION
          tl.to(panel, {
            yPercent: -30, // Parallax slide up
            scale: 0.9,    // Deep space exit
            opacity: 0,
            duration: 1.5,
            ease: "power2.inOut"
          }, i)
          .to(nextPanel, {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1.5,
            ease: "power2.inOut"
          }, i)
          .fromTo(nextImg, 
            { scale: 1.5 }, 
            { scale: 1, duration: 1.5, ease: "power2.inOut" }, 
            i
          )
          // Text Entrance (Staggered Words)
          .fromTo(nextWords, 
            { y: 50, opacity: 0, rotateX: -45 },
            { y: 0, opacity: 1, rotateX: 0, stagger: 0.1, duration: 1, ease: "back.out(1.7)" },
            i + 0.6
          )
          .fromTo(nextMsg,
            { opacity: 0, x: -20 },
            { opacity: 1, x: 0, duration: 1 },
            i + 1
          );
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="stories" ref={containerRef} className="relative w-full h-screen bg-black overflow-hidden perspective-1000">
      {stories.map((story, i) => (
        <div
          key={i}
          ref={(el) => (panelsRef.current[i] = el)}
          className="absolute inset-0 w-full h-full bg-black overflow-hidden pointer-events-none active:pointer-events-auto"
          style={{ zIndex: i }}
        >
          {/* Background Layer */}
          <div className="absolute inset-0 overflow-hidden">
            <img
              loading="lazy"
              decoding="async"
              src={story.image}
              className="story-img w-full h-full object-cover opacity-60 transition-all duration-700"
              alt=""
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/80" />
          </div>

          {/* Content Layer */}
          <div className={`relative z-10 flex h-full items-center px-10 md:px-24 
            ${story.align === 'right' ? 'justify-end' : story.align === 'center' ? 'justify-center text-center' : 'justify-start'}`}>
            <div className="max-w-4xl">
              <span className="block text-brand tracking-[0.5em] text-xs font-bold mb-6 opacity-70">
                STORY {i + 1}
              </span>
              <h2 className="text-6xl md:text-8xl font-black text-white leading-[0.9] mb-8 uppercase">
                {story.title.split(" ").map((word, idx) => (
                  <span key={idx} className="word-span inline-block mr-4 will-change-transform">
                    {word}
                  </span>
                ))}
              </h2>
              <div className={`h-1 w-20 bg-brand mb-8 ${story.align === 'center' ? 'mx-auto' : story.align === 'right' ? 'ml-auto' : ''}`} />
              <p className="story-msg text-xl md:text-3xl text-gray-300 font-extralight tracking-wide leading-relaxed max-w-2xl">
                {story.message || story.description}
              </p>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}