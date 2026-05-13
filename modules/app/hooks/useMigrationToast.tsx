import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { MkrUpgradeToastContent } from '../components/MkrUpgradeToastContent';
import { useBreakpointIndex } from '@theme-ui/match-media';

export function useMigrationToast(): void {
  const bpi = useBreakpointIndex();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    // Only show toast on client-side
    if (!isClient) return;

    // Check if the toast has already been shown in this session
    const toastShown = sessionStorage.getItem('mkrUpgradeToastShown');

    if (!toastShown) {
      toast(<MkrUpgradeToastContent />, {
        autoClose: false,
        closeOnClick: false,
        draggable: false,
        toastId: 'mkr-upgrade-banner-toast',
        progressClassName: 'progress-bar',
        style: {
          background: 'rgba(255, 255, 255, 0.6)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          color: '#231536', // text
          width: bpi === 0 ? '80%' : '40%',
          borderRadius: '12px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
        }
      });

      // Mark the toast as shown for this session
      sessionStorage.setItem('mkrUpgradeToastShown', 'true');
    }
  }, [isClient]);
}
