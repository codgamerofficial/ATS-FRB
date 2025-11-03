'use client';

import { useState, useRef } from 'react';
import { Camera, Square, Download } from 'lucide-react';
import SciFiCard from '@/components/ui/SciFiCard';
import Button from '@/components/ui/Button';

export default function VideoResumePage() {
  const [isRecording, setIsRecording] = useState(false);
  const [recordedVideo, setRecordedVideo] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      
      const chunks: BlobPart[] = [];
      mediaRecorder.ondataavailable = (e) => chunks.push(e.data);
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'video/webm' });
        setRecordedVideo(URL.createObjectURL(blob));
      };
      
      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Video Resume Builder</h1>
          <p className="text-cyan-300 text-lg">Create compelling video introductions</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <SciFiCard variant="glow" className="p-6">
            <h2 className="text-2xl font-bold text-white mb-6">Record Introduction</h2>
            
            <div className="aspect-video bg-slate-800 rounded-lg mb-6 overflow-hidden">
              <video
                ref={videoRef}
                autoPlay
                muted
                className="w-full h-full object-cover"
                src={recordedVideo || undefined}
              />
            </div>

            <div className="flex gap-4 justify-center">
              {!isRecording ? (
                <Button onClick={startRecording} className="flex items-center gap-2">
                  <Camera className="w-5 h-5" />
                  Start Recording
                </Button>
              ) : (
                <Button onClick={stopRecording} className="flex items-center gap-2">
                  <Square className="w-5 h-5" />
                  Stop Recording
                </Button>
              )}
              
              {recordedVideo && (
                <Button className="flex items-center gap-2">
                  <Download className="w-5 h-5" />
                  Download
                </Button>
              )}
            </div>
          </SciFiCard>

          <SciFiCard className="p-6">
            <h2 className="text-2xl font-bold text-white mb-6">Templates</h2>
            
            <div className="grid gap-4">
              {[
                { title: 'Professional', duration: '60s' },
                { title: 'Creative', duration: '90s' },
                { title: 'Technical', duration: '120s' }
              ].map((template, index) => (
                <div key={index} className="bg-slate-800 rounded-lg p-4 border border-cyan-500/20">
                  <h3 className="text-white font-semibold">{template.title}</h3>
                  <span className="text-cyan-400 text-sm">{template.duration}</span>
                </div>
              ))}
            </div>
          </SciFiCard>
        </div>
      </div>
    </div>
  );
}