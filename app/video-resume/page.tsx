'use client';

import { useState, useRef } from 'react';
import { Camera, Square, Download } from 'lucide-react';
import SciFiCard from '@/components/ui/SciFiCard';
import Button from '@/components/ui/Button';

export default function VideoResumePage() {
  const [isRecording, setIsRecording] = useState(false);
  const [recordedVideo, setRecordedVideo] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="max-w-6xl mx-auto p-4 pb-24">
        <div className="text-center mb-6">
          <h1 className="text-2xl sm:text-4xl font-bold text-white mb-2 sm:mb-4">Video Resume</h1>
          <p className="text-cyan-300 text-sm sm:text-lg">Create video introductions</p>
        </div>

        <div className="space-y-6">
          <SciFiCard variant="glow" className="p-4 sm:p-6">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 text-center">Record Video</h2>
            
            <div className="aspect-video bg-slate-800 rounded-lg mb-4 sm:mb-6 overflow-hidden">
              <video
                ref={videoRef}
                autoPlay
                muted
                playsInline
                className="w-full h-full object-cover"
                src={recordedVideo || undefined}
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              {!isRecording ? (
                <Button onClick={startRecording} className="flex items-center justify-center gap-2 py-3 text-lg font-bold">
                  <Camera className="w-5 h-5" />
                  Start Recording
                </Button>
              ) : (
                <Button onClick={stopRecording} className="flex items-center justify-center gap-2 py-3 text-lg font-bold bg-red-500 hover:bg-red-600">
                  <Square className="w-5 h-5" />
                  Stop Recording
                </Button>
              )}
              
              {recordedVideo && (
                <Button className="flex items-center justify-center gap-2 py-3">
                  <Download className="w-5 h-5" />
                  Download
                </Button>
              )}
            </div>
          </SciFiCard>

          <SciFiCard className="p-4 sm:p-6">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 text-center">Quick Templates</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { title: 'Professional', duration: '60s', icon: '💼' },
                { title: 'Creative', duration: '90s', icon: '🎨' },
                { title: 'Technical', duration: '120s', icon: '⚡' }
              ].map((template, index) => (
                <div key={index} className="bg-slate-800 rounded-lg p-4 border border-cyan-500/20 text-center hover:border-cyan-400 transition-colors cursor-pointer">
                  <div className="text-2xl mb-2">{template.icon}</div>
                  <h3 className="text-white font-semibold text-sm">{template.title}</h3>
                  <span className="text-cyan-400 text-xs">{template.duration}</span>
                </div>
              ))}
            </div>
          </SciFiCard>
        </div>
        
        {/* Mobile Tips */}
        {isMobile && (
          <SciFiCard className="p-4 mt-6">
            <h3 className="text-lg font-bold text-white mb-3 text-center">📱 Mobile Tips</h3>
            <div className="space-y-2 text-sm text-gray-300">
              <div className="flex items-center gap-2">
                <span className="text-green-400">✓</span>
                <span>Hold phone horizontally for better framing</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-400">✓</span>
                <span>Ensure good lighting on your face</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-400">✓</span>
                <span>Keep it under 90 seconds</span>
              </div>
            </div>
          </SciFiCard>
        )}
      </div>
    </div>
  );
}