'use client'

import React, { useState, useEffect } from 'react'
import { 
  Rocket, Music, Bot, Heart, Flame, Gamepad, Sparkles, Monitor, Laptop,
  Keyboard, Lightbulb, Glasses, Cog, Cherry, Wand2, Headphones, Moon,
  Music as MusicNote, Camera, Clock, Zap, Telescope, Microscope, Satellite
} from 'lucide-react'

const hexagonData = [
  [Rocket, Music, Bot, Heart, Flame],
  [Gamepad, Sparkles, Monitor, Monitor, Laptop, Keyboard],
  [Keyboard, Lightbulb, Glasses, Cog, Cherry, Wand2, Gamepad],
  [Monitor, Headphones, Moon, MusicNote],
  [Heart, Camera, Clock, Rocket, Music, Bot, Heart, Flame],
  [Gamepad, Sparkles, Monitor, Monitor, Laptop, Keyboard, Keyboard],
  [Glasses, Cog, Cherry, Zap, Laptop, Telescope, Satellite],
  [Microscope, Telescope, Monitor, Satellite, Wand2],
  [Zap, Monitor, Moon, Sparkles, Glasses]
]

export default function HexagonGrid() {
  const [showRipple, setShowRipple] = useState(false)

  const handleRipple = (target: Element | null) => {
    if (showRipple || !target) return
    const container = document.getElementById('container')
    if (!container) return

    const hexagons = container.querySelectorAll('.hexagon')
    const hexagonElements = Array.from(hexagons)

    const targetRect = target.getBoundingClientRect()
    const data = hexagonElements
      .map(element => {
        const rect = element.getBoundingClientRect()
        const centerX = rect.x + rect.width / 2
        const centerY = rect.y + rect.height / 2
        const distance = Math.round(
          Math.sqrt(
            Math.pow(rect.x - targetRect.x, 2) +
            Math.pow(rect.y - targetRect.y, 2)
          )
        )
        return { element, rect, centerX, centerY, distance }
      })
      .sort((a, b) =>
        a.distance > b.distance ? 1 : a.distance < b.distance ? -1 : 0
      )

    const [max] = data.slice(-1)
    data.forEach(item =>
      (item.element as HTMLElement).style.setProperty(
        '--ripple-factor',
        `${(item.distance * 100) / max.distance}`
      )
    )
    setShowRipple(true)

    const cleanUp = () => {
      requestAnimationFrame(() => {
        setShowRipple(false)
        data.forEach(item =>
          (item.element as HTMLElement).style.removeProperty('--ripple-factor')
        )
        max.element.removeEventListener('animationend', cleanUp)
      })
    }
    max.element.addEventListener('animationend', cleanUp)
  }

  return (
    <div className="body !bg-red-500">
      <div id="container" className={`container ${showRipple ? 'show-ripple' : ''}`}>
        {hexagonData.map((column, columnIndex) => (
          <div key={columnIndex} className="column" style={{ '--column': columnIndex } as React.CSSProperties}>
            {column.map((Icon, index) => (
              <div
                key={index}
                className="hexagon"
                style={{ '--index': index + 1 } as React.CSSProperties}
                onClick={(e) => handleRipple(e.currentTarget)}
              >
                <Icon className="icon" />
              </div>
            ))}
          </div>
        ))}
      </div>
      <style jsx>{`
        :root {
          --color-primary: #ee75d2;
          --color-secondary: #75d8ee;
          --color-tertiary: #deee75;
          --color-quaternary: #9375ee;
          --color-surface: black;
          --bg: linear-gradient(
            to bottom,
            color-mix(in srgb, var(--color-quaternary), black 70%),
            var(--color-surface)
          );
          --color-on-surface: var(--color-primary);
          --hover-filter: brightness(1.2);
          --icon-filter: saturate(3.4) brightness(0.5) invert(1);
          --ripple-filter: blur(1rem);
        }

        :root {
          --hexagon-size: 8vmin;
          --gap: 0.1vmin;
        }

        .body {
          width: 100vw;
          height: 100vh;
          display: grid;
          place-items: center;
          background: var(--bg);
          color: var(--color-on-surface);
          overflow: hidden;
        }

        .container {
          display: flex;
          position: relative;
          align-items: center;
        }
        .container .column {
          margin: 0 -0.2vmin;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .hexagon {
          --mix-percentage: calc(var(--column) * var(--index) * 3%);
          width: var(--hexagon-size);
          aspect-ratio: 1;
          position: relative;
          background: var(--color-surface-container, color-mix(in srgb, var(--color-secondary), var(--color-primary) var(--mix-percentage)));
          backdrop-filter: blur(1rem);
          clip-path: polygon(98.66024% 45%, 99.39693% 46.5798%, 99.84808% 48.26352%, 100% 50%, 99.84808% 51.73648%, 99.39693% 53.4202%, 98.66025% 55%, 78.66025% 89.64102%, 77.66044% 91.06889%, 76.42788% 92.30146%, 75% 93.30127%, 73.4202% 94.03794%, 71.73648% 94.48909%, 70% 94.64102%, 30% 94.64102%, 28.26352% 94.48909%, 26.5798% 94.03794%, 25% 93.30127%, 23.57212% 92.30146%, 22.33956% 91.06889%, 21.33975% 89.64102%, 1.33975% 55%, 0.60307% 53.4202%, 0.15192% 51.73648%, 0% 50%, 0.15192% 48.26352%, 0.60307% 46.5798%, 1.33975% 45%, 21.33975% 10.35898%, 22.33956% 8.93111%, 23.57212% 7.69854%, 25% 6.69873%, 26.5798% 5.96206%, 28.26352% 5.51091%, 30% 5.35898%, 70% 5.35898%, 71.73648% 5.51091%, 73.4202% 5.96206%, 75% 6.69873%, 76.42788% 7.69854%, 77.66044% 8.93111%, 78.66025% 10.35898%);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .hexagon:hover {
          filter: var(--hover-filter);
        }
        .hexagon .icon {
          width: 60%;
          height: 60%;
          filter: var(--icon-filter);
        }

        @keyframes ripple {
          from {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(max(0.8, calc(var(--ripple-factor) / 100)));
            opacity: 0.42;
          }
          65% {
            opacity: 1;
          }
          70% {
            transform: scale(1.5);
            filter: var(--ripple-filter);
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        .container.show-ripple {
          pointer-events: none;
        }
        .container.show-ripple .hexagon {
          cursor: default;
          --duration: 0.45s;
          animation: ripple var(--duration) ease-in-out;
          animation-duration: max(var(--duration), calc(var(--duration) * var(--ripple-factor) / 100));
          animation-delay: calc(var(--ripple-factor) * 8ms);
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}