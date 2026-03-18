import { useEffect, useRef, useCallback, useState } from 'react';
import { io } from 'socket.io-client';

const SERVER_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:5002';

export const useSocket = () => {
  const socketRef = useRef(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    socketRef.current = io(SERVER_URL, { autoConnect: false });
    socketRef.current.on('connect',    () => setConnected(true));
    socketRef.current.on('disconnect', () => setConnected(false));
    socketRef.current.connect();
    return () => socketRef.current?.disconnect();
  }, []);

  const emit  = useCallback((event, data) => socketRef.current?.emit(event, data), []);
  const on    = useCallback((event, cb) => { socketRef.current?.on(event, cb); return () => socketRef.current?.off(event, cb); }, []);
  const off   = useCallback((event, cb) => socketRef.current?.off(event, cb), []);

  return { socket: socketRef.current, connected, emit, on, off };
};
