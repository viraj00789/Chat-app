import React, { useEffect, useRef, useState } from "react";
import { FaPause, FaPlay } from "react-icons/fa";
import WaveSurfer from "wavesurfer.js";
import { useChat } from "../../store/ChatContext";

const WaveFormSurfer = ({ audio, times, autoPlay, onAudioEnd, index }) => {
  const waveformRef = useRef(null);
  const waveSurferRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [, setLoading] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const { chat } = useChat();

  useEffect(() => {
    waveSurferRef.current = WaveSurfer.create({
      splitChannels: false,
      autoCenter: true,
      container: waveformRef.current,
      barWidth: 4.5,
      barRadius: 10,
      height: 35,
      barGap: 2,
      backend: "MediaElement",
      normalize: false,
      cursorWidth: 0,
      hideScrollbar: true,
      responsive: true,
      progressColor: "#b8cfbe",
      waveColor: "#808080",
    });

    const loadAudio = async () => {
      setLoading(true);
      try {
        if (audio) {
          await waveSurferRef.current.load(audio);
          if (autoPlay) {
            waveSurferRef.current.play();
            setIsPlaying(true);
          }
        }
      } catch (error) {
        console.error("Error loading audio:", error);
      } finally {
        setLoading(false);
      }
    };

    loadAudio();

    waveSurferRef.current.on("ready", () => {
      setDuration(waveSurferRef.current.getDuration());
    });

    waveSurferRef.current.on("audioprocess", () => {
      setCurrentTime(waveSurferRef.current.getCurrentTime());
    });

    waveSurferRef.current.on("finish", () => {
      setIsPlaying(false);
      if (onAudioEnd) {
        onAudioEnd();
      }
    });

    return () => {
      if (waveSurferRef.current) {
        waveSurferRef.current.destroy();
      }
    };
  }, [audio, autoPlay, onAudioEnd]);

  const handlePlayPause = () => {
    if (waveSurferRef.current) {
      waveSurferRef.current.playPause();
      setIsPlaying(!isPlaying);
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  return (
    <div
      className="wave-form-contianer">
       <img className="audio-image-chat" src={chat?.image} alt="" />
      <div className="play-btn-continer" onClick={handlePlayPause}>
        {isPlaying ? <FaPause /> : <FaPlay />}
      </div>
      <span ref={waveformRef} className="wave" id="waveform"></span>
      <span className="audio-times">
        {formatTime(currentTime)}/{formatTime(duration)}
      </span>
      <div>
        <span className="audio-dates">{times}</span>
      </div>
    </div>
  );
};

export default WaveFormSurfer;
