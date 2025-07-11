import React, { useEffect, useRef, useState } from 'react';
import '../styles/ZoomSession.css';
import type { ZoomSessionData } from '../utils/api';
import Loader from '../../../components/Loader';

interface Props {
  courseId: number;
  session: ZoomSessionData;
}

const ZoomSession: React.FC<Props> = ({ session }) => {
  const { meeting_number, meeting_password, meeting_user, course_title } = session;

  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [connectionAttempts, setConnectionAttempts] = useState(0);
  const [isConnected, setIsConnected] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  const maxAttempts = 3;

  const zoomUrl = [
    `https://zoom.us/wc/join/${meeting_number}`,
    `?pwd=${meeting_password}`,
    `&uname=${encodeURIComponent(meeting_user)}`,
    `&userName=${encodeURIComponent(meeting_user)}`,
    `&lang=es-ES`
  ].join('');

  useEffect(() => {
    const iframe = iframeRef.current;

    const detectDevice = () => {
      const userAgent = navigator.userAgent;
      const desktop = !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
      setIsDesktop(desktop);
      if (desktop) {
        console.log('Dispositivo: Escritorio');
      } else {
        console.log('Dispositivo: Móvil');
      }
    };

    const requestMediaPermissions = async () => {
      if (isDesktop && navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
          stream.getTracks().forEach((track) => track.stop());
          console.log('Permisos de medios concedidos');
        } catch (error) {
          console.warn('No se pudieron obtener permisos de medios:', error);
        }
      }
    };

    const handleIframeLoad = () => {
      setLoading(false);
      setIsConnected(true);
      console.log('Conexión exitosa');
      if (isDesktop) {
        setTimeout(requestMediaPermissions, 3000);
      }
    };

    const handleIframeError = () => {
      setConnectionAttempts((prev) => prev + 1);
      if (connectionAttempts >= maxAttempts) {
        setLoading(false);
        setError(true);
        console.log('Error de conexión');
      } else {
        retryConnection();
      }
    };

    const retryConnection = () => {
      if (iframe) {
        const originalSrc = iframe.src.split('?')[0];
        const params = iframe.src.split('?')[1];
        iframe.src = `${originalSrc}?t=${Date.now()}&${params}`;
        console.log(`Reintentando conexión (${connectionAttempts}/${maxAttempts})`);
      }
    };

    detectDevice();

    if (iframe) {
      iframe.addEventListener('load', handleIframeLoad);
      iframe.addEventListener('error', handleIframeError);
    }

    const connectionTimeout = setTimeout(() => {
      if (!isConnected) handleIframeError();
    }, 15000);

    return () => {
      if (iframe) {
        iframe.removeEventListener('load', handleIframeLoad);
        iframe.removeEventListener('error', handleIframeError);
      }
      clearTimeout(connectionTimeout);
    };
  }, [connectionAttempts, isConnected, isDesktop]);

  return (
    <div className="zs-wrapper">
      {loading && <Loader message="Cargando sesión..." />}
      {error && (() => { throw new Error('Error al cargar la sesión'); })()}
      <iframe
        ref={iframeRef}
        className="zs-iframe"
        src={zoomUrl}
        title={`Sesión: ${course_title}`}
        allow="microphone; camera; fullscreen; display-capture; autoplay; encrypted-media; geolocation"
        allowFullScreen
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-presentation allow-modals allow-popups-to-escape-sandbox"
        loading="eager"
      />
    </div>
  );
};

export default ZoomSession;
