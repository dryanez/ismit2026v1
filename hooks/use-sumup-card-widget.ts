"use client"

import { useEffect, useState } from 'react';

const SUMUP_CARD_SDK_URL = 'https://gateway.sumup.com/gateway/ecom/card/v2/sdk.js';

declare global {
  interface Window {
    SumUpCard?: any;
  }
}

export default function useSumUpCardWidget() {
  const [SumUpCard, setSumUpCard] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if script already loaded
    if (window.SumUpCard) {
      setSumUpCard(window.SumUpCard);
      setIsLoading(false);
      return;
    }

    // Check if script tag already exists
    const existingScript = document.querySelector(`script[src="${SUMUP_CARD_SDK_URL}"]`);
    if (existingScript) {
      existingScript.addEventListener('load', () => {
        setSumUpCard(window.SumUpCard);
        setIsLoading(false);
      });
      return;
    }

    // Create and inject script
    const script = document.createElement('script');
    script.src = SUMUP_CARD_SDK_URL;
    script.async = true;
    
    script.onload = () => {
      if (window.SumUpCard) {
        setSumUpCard(window.SumUpCard);
      }
      setIsLoading(false);
    };

    script.onerror = () => {
      console.error('Failed to load SumUp Card SDK');
      setIsLoading(false);
    };

    document.head.appendChild(script);

    return () => {
      // Cleanup not needed as we want to keep the script loaded
    };
  }, []);

  return { SumUpCard, isLoading };
}
