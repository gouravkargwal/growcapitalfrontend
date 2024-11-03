"use client"
import { useEffect } from 'react';

declare global {
  interface Window {
    fwSettings?: { widget_id: number };
    FreshworksWidget?: FreshworksWidgetFunction;
  }
}

// Define a type for FreshworksWidgetFunction that includes `q`
type FreshworksWidgetFunction = {
  (...args: any[]): void;
  q: any[];
};

const FreshdeskWidget: React.FC = () => {
  useEffect(() => {
    // Set the widget settings
    window.fwSettings = {
      widget_id: 1060000001965, // Replace with your actual widget ID
    };

    // Define FreshworksWidget if it's not already available
    (function () {
      if (typeof window.FreshworksWidget !== 'function') {
        const n: FreshworksWidgetFunction = function (...args: any[]) {
          n.q.push(args);
        };
        n.q = []; // Explicitly initialize q as an array of any
        window.FreshworksWidget = n;
      }
    })();

    // Dynamically create and load the Freshdesk widget script
    const script = document.createElement('script');
    script.src = 'https://ind-widget.freshworks.com/widgets/1060000001965.js';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    // Cleanup function to remove the script when the component is unmounted
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null; // This component does not render any visible content
};

export default FreshdeskWidget;
