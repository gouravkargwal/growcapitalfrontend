import React from 'react';
import Image from 'next/image';

import bear from "../../../assets/bearish.jpeg";
import bull from "../../../assets/bullish.jpeg";

interface Strategy {
  id: string;
  name: string;
  icon: string;
  result: string;
  color: string;
}

const Banner: React.FC<{ strategies: Strategy[]; speed?: number }> = ({ strategies, speed = 5000 }) => {
  return (
    <div className="inner">
      <div className="wrapper">
        <section style={{ "--speed": `${speed}ms` } as React.CSSProperties}>
          {strategies.map(({ id, name, icon, result, color }) => (
            <div className="relative p-2 bg-white rounded-lg shadow-lg w-64 h-20 flex items-center justify-start mx-1 py-1" key={id}>
              <div className="w-12 h-12">
                <img
                  src={icon}
                  alt={name}
                  className="w-full h-full rounded-md object-contain"
                />
              </div>
              <div className="flex flex-col ml-4">
                <div className="text-sm font-semibold">{name}</div>
                <div className="relative">
                  <span className={`text-lg font-bold ${color} blur-sm`} style={{ clipPath: 'inset(0 20% 0 0)' }}>
                    {'200000'}
                  </span>
                </div>
              </div>

              {/* Conditional Bullish or Bearish Image */}
              {result.trim().startsWith("+") ? (
                <Image
                  src={bull}
                  alt="Bullish"
                  className="absolute bottom-0 right-0"
                  width={60}
                  height={60}
                />
              ) : result.trim().startsWith("-") ? (
                <Image
                  src={bear}
                  alt="Bearish"
                  className="absolute bottom-0 right-0"
                  width={60}
                  height={60}
                />
              ) : null}
            </div>
          ))}
        </section>
        <section style={{ "--speed": `${speed}ms` } as React.CSSProperties}>
          {strategies.map(({ id, name, icon, result, color }) => (
            <div className="relative p-2 bg-white rounded-lg shadow-lg w-64 h-20 flex items-center justify-start mx-1 py-1" key={id}>
              <div className="w-12 h-12">
                <img
                  src={icon}
                  alt={name}
                  className="w-full h-full rounded-md object-contain"
                />
              </div>
              <div className="flex flex-col ml-4">
                <div className="text-sm font-semibold">{name}</div>
                <div className="relative">
                  <span className={`text-lg font-bold ${color} blur-sm`} style={{ clipPath: 'inset(0 20% 0 0)' }}>
                    {'200000'}
                  </span>
                </div>
              </div>

              {/* Conditional Bullish or Bearish Image */}
              {result.trim().startsWith("+") ? (
                <Image
                  src={bull}
                  alt="Bullish"
                  className="absolute bottom-0 right-0"
                  width={60}
                  height={60}
                />
              ) : result.trim().startsWith("-") ? (
                <Image
                  src={bear}
                  alt="Bearish"
                  className="absolute bottom-0 right-0"
                  width={60}
                  height={60}
                />
              ) : null}
            </div>
          ))}
        </section>
        <section style={{ "--speed": `${speed}ms` } as React.CSSProperties}>
          {strategies.map(({ id, name, icon, result, color }) => (
            <div className="relative p-2 bg-white rounded-lg shadow-lg w-64 h-20 flex items-center justify-start mx-1 py-1" key={id}>
              <div className="w-12 h-12">
                <img
                  src={icon}
                  alt={name}
                  className="w-full h-full rounded-md object-contain"
                />
              </div>
              <div className="flex flex-col ml-4">
                <div className="text-sm font-semibold">{name}</div>
                <div className="relative">
                  <span className={`text-lg font-bold ${color} blur-sm`} style={{ clipPath: 'inset(0 20% 0 0)' }}>
                    {'200000'}
                  </span>
                </div>
              </div>

              {/* Conditional Bullish or Bearish Image */}
              {result.trim().startsWith("+") ? (
                <Image
                  src={bull}
                  alt="Bullish"
                  className="absolute bottom-0 right-0"
                  width={60}
                  height={60}
                />
              ) : result.trim().startsWith("-") ? (
                <Image
                  src={bear}
                  alt="Bearish"
                  className="absolute bottom-0 right-0"
                  width={60}
                  height={60}
                />
              ) : null}
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};

export { Banner };
