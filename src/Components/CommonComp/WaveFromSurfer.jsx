import React, { useEffect, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';

const WaveFormSurfer = ({ audio }) => {
    const waveformRef = useRef(null);
    const waveSurferRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        waveSurferRef.current = WaveSurfer.create({
            splitChannels:false,
            autoCenter:true,
            container: waveformRef.current,
            barWidth: 3,
            barHeight:6,
            barGap: 3,
            backend: "MediaElement",
            normalize: false,
            cursorWidth: 0,
            hideScrollbar: true,
            responsive: true,
            progressColor: "#2492FC",
            waveColor: "#E9EFF4",
        });

        const loadAudio = async () => {
            setLoading(true);
            try {
                if (audio) {
                    console.log('Loading audio from URL:', audio);
                    await waveSurferRef.current.load(audio);
                }
            } catch (error) {
                console.error('Error loading audio:', error);
            } finally {
                setLoading(false);
            }
        };

        loadAudio();

        return () => {
            if (waveSurferRef.current) {
                waveSurferRef.current.destroy();
            }
        };
    }, [audio]);

    const handlePlayPause = () => {
        if (waveSurferRef.current) {
            waveSurferRef.current.playPause();
            setIsPlaying(!isPlaying);
        }
    };

    return (
        <>
            <button onClick={handlePlayPause} disabled={loading}>
                {isPlaying ? 'Pause' : 'Play'}
            </button>
            {loading && <p>Loading audio...</p>}

                <div ref={waveformRef} />
        </>
    );
};

export default WaveFormSurfer;
