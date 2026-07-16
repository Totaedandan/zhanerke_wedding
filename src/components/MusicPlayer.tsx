import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { FiPause, FiPlay } from "react-icons/fi";

import song from "../assets/music/kerbez-sulu.mp3";

export default function MusicPlayer() {
  const audioRef =
    useRef<HTMLAudioElement>(null);

  const [playing, setPlaying] =
    useState(false);

  useEffect(() => {
    const startMusic = () => {
      if (!audioRef.current) return;

      audioRef.current
        .play()
        .then(() => {
          setPlaying(true);
        })
        .catch(() => {});

      window.removeEventListener(
        "click",
        startMusic
      );
    };

    window.addEventListener(
      "click",
      startMusic
    );

    return () => {
      window.removeEventListener(
        "click",
        startMusic
      );
    };
  }, []);

  const toggleMusic = async () => {
    if (!audioRef.current) return;

    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      await audioRef.current.play();
      setPlaying(true);
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={song}
        loop
      />

      <motion.button
        initial={{
          opacity: 0,
          y: 30,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 2,
        }}
        onClick={toggleMusic}
        className="fixed bottom-6 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full border border-white/40 bg-white/80 shadow-2xl backdrop-blur-xl"
      >
        <motion.div
          animate={{
            rotate: playing
              ? 360
              : 0,
          }}
          transition={{
            repeat: Infinity,
            duration: 8,
            ease: "linear",
          }}
          className="absolute h-16 w-16 rounded-full border border-[#d4af37]/30"
        />

        {playing ? (
          <FiPause
            size={22}
            className="text-[#d4af37]"
          />
        ) : (
          <FiPlay
            size={22}
            className="text-[#d4af37]"
          />
        )}
      </motion.button>
    </>
  );
}