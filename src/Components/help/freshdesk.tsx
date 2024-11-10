"use client"
import { useEffect } from 'react';

declare global {
  interface Window {
    fwSettings?: { widget_id: number };
    FreshworksWidget?: FreshworksWidgetFunction;
  }
}
type FreshworksWidgetFunction = {
  (...args: any[]): void;
  q: any[];
};

const FreshdeskWidget: React.FC = () => {
  useEffect(() => {
    window.fwSettings = {
      widget_id: 1060000001965,
    };

    (function () {
      if (typeof window.FreshworksWidget !== 'function') {
        const n: FreshworksWidgetFunction = function (...args: any[]) {
          n.q.push(args);
        };
        n.q = [];
        window.FreshworksWidget = n;
      }
    })();

    const script = document.createElement('script');
    script.src = 'https://ind-widget.freshworks.com/widgets/1060000001965.js';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null;
};

export default FreshdeskWidget;
