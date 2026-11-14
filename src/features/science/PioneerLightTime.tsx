import { useEffect, useState } from "react";
import { Pause, Play, RotateCcw } from "lucide-react";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import {
  formatLightTime,
  lightTimeSeconds,
  LIGHT_SPEED_KM_S,
  LIGHT_TIME_PRESETS,
} from "../../utils/lightTime";

export function PioneerLightTime({ suspended = false }: { suspended?: boolean }) {
  const reduced = useReducedMotion();
  const [presetIndex, setPresetIndex] = useState(0);
  const [roundTrip, setRoundTrip] = useState(false);
  const [fraction, setFraction] = useState(0);
  const [playing, setPlaying] = useState(false);
  useEffect(() => { if (suspended) setPlaying(false); }, [suspended]);
  const preset = LIGHT_TIME_PRESETS[presetIndex];
  const oneWay = lightTimeSeconds(preset.distanceKm);
  const legDuration = Math.min(12, oneWay);
  const duration = legDuration * (roundTrip ? 2 : 1);
  useEffect(() => {
    if (!playing || reduced) return;
    let frame = 0,
      previous: number | undefined;
    const tick = (time: number) => {
      const delta =
        previous === undefined || document.hidden
          ? 0
          : Math.min(time - previous, 100);
      if (delta > 0)
        setFraction((current) =>
          Math.min(1, current + delta / (duration * 1000)),
        );
      previous = time;
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [playing, reduced, duration]);
  useEffect(() => {
    if (fraction >= 1 || reduced) setPlaying(false);
  }, [fraction, reduced]);
  const reset = () => {
    setPlaying(false);
    setFraction(0);
  };
  const x = roundTrip
    ? fraction < 0.5
      ? 90 + fraction * 2 * 620
      : 710 - (fraction - 0.5) * 2 * 620
    : 710 - fraction * 620;
  const direction =
    roundTrip && fraction < 0.5
      ? `Earth → ${preset.endpoint}`
      : `${preset.endpoint} → Earth`;
  const status =
    fraction === 1
      ? "Demonstration complete."
      : playing
        ? "Signal demonstration playing."
        : fraction === 0
          ? "Ready to send a simulated signal."
          : "Signal demonstration paused.";
  return (
    <section className="light-time" aria-labelledby="light-title">
      <div className="science-copy">
        <p className="ow-eyebrow">PIONEER 10 · 23 JANUARY 2003</p>
        <h2 id="light-title">The 11-hour message</h2>
        <p>
          NASA received Pioneer 10’s last faint signal with no telemetry. At
          about 12.23 billion km away, its signal needed about 11 hours 20
          minutes to reach Earth.
        </p>
        <p>
          Controllers plan ahead. They cannot use a live steering wheel across
          this distance.
        </p>
        <p className="science-evidence">
          Historical anchor · simulated propagation
        </p>
        <a
          href="https://science.nasa.gov/mission/pioneer-10/"
          target="_blank"
          rel="noreferrer"
        >
          NASA mission record ↗
        </a>
      </div>
      <div className="science-interaction">
        <p className="signal-distance">
          <strong>{preset.distanceLabel}</strong> ·{" "}
          {preset.id === "pioneer" ? "23 January 2003" : "Reference distance"}
        </p>
        <div className="signal-diagram">
          <svg
            viewBox="0 0 800 270"
            role="img"
            aria-label={`Schematic signal path: ${direction}. Distance and object sizes are not to scale.`}
          >
            <text
              x="400"
              y="36"
              textAnchor="middle"
              fill="#d8b77e"
              fontSize="13"
            >
              {preset.distanceLabel.toUpperCase()} · APPROXIMATE SEPARATION
            </text>
            <path
              d="M90 140H710"
              stroke="#d8b77e"
              strokeWidth="1"
              strokeDasharray="5 5"
            />
            <circle cx="90" cy="140" r="31" fill="#b8c9e0" />
            <path d="M74 116c28 2 40 31 12 50 34 0 48-51 9-57" fill="#172b43" />
            {preset.id === "pioneer" ? (
              <image
                href="/images/covers/outer-space.svg"
                x="645"
                y="75"
                width="130"
                height="130"
              />
            ) : (
              <circle
                cx="710"
                cy="140"
                r="22"
                fill={preset.id === "moon" ? "#b4bdb5" : "#d8b77e"}
              />
            )}
            <circle
              cx={x}
              cy="140"
              r="7"
              fill="#fff1c3"
              stroke="#d8b77e"
              strokeWidth="6"
              strokeOpacity=".4"
            />
            <text
              x="90"
              y="215"
              fill="#fff8e7"
              textAnchor="middle"
              fontSize="13"
            >
              EARTH
            </text>
            <text
              x="710"
              y="215"
              fill="#fff8e7"
              textAnchor="middle"
              fontSize="13"
            >
              {preset.endpoint.toUpperCase()}
            </text>
            <text
              x="400"
              y="184"
              fill="#fff8e7"
              textAnchor="middle"
              fontSize="14"
            >
              {direction}
            </text>
            <text
              x="400"
              y="252"
              fill="#b8c9e0"
              textAnchor="middle"
              fontSize="11"
            >
              DIAGRAM / DISTANCE AND OBJECT SIZES NOT TO SCALE
            </text>
          </svg>
        </div>
        <div className="science-readouts">
          <div>
            <span className="ow-eyebrow">ONE-WAY LIGHT TIME</span>
            <strong>{formatLightTime(oneWay)}</strong>
            <small>Approximate · distance ÷ c</small>
          </div>
          <div>
            <span className="ow-eyebrow">HYPOTHETICAL ROUND TRIP</span>
            <strong>{formatLightTime(2 * oneWay)}</strong>
            <small>Propagation only · fixed separation</small>
          </div>
        </div>
        <div className="science-controls">
          <button
            className="ow-button ow-paper-action"
            onClick={() => {
              if (reduced) {
                setFraction(1);
                return;
              }
              if (fraction === 1) setFraction(0);
              setPlaying((current) => !current);
            }}
          >
            {reduced ? (
              "Show signal arrival"
            ) : playing ? (
              <>
                <Pause size={16} />
                Pause signal
              </>
            ) : (
              <>
                <Play size={16} />
                {fraction > 0 && fraction < 1 ? "Resume signal" : "Play signal"}
              </>
            )}
          </button>
          <button className="ow-button" onClick={reset}>
            <RotateCcw size={16} />
            Reset
          </button>
          <p role="status">{status}</p>
        </div>
        <label className="signal-scrubber">
          Signal journey{" "}
          <input
            type="range"
            min="0"
            max="100"
            value={Math.round(fraction * 100)}
            aria-valuetext={`${Math.round(fraction * 100)} percent of ${roundTrip ? "hypothetical round trip" : "one-way journey"}`}
            onChange={(event) => {
              setPlaying(false);
              setFraction(Number(event.target.value) / 100);
            }}
          />
        </label>
        <div className="science-controls">
          <button
            className="ow-button"
            aria-pressed={!roundTrip}
            onClick={() => {
              reset();
              setRoundTrip(false);
            }}
          >
            One way
          </button>
          <button
            className="ow-button"
            aria-pressed={roundTrip}
            onClick={() => {
              reset();
              setRoundTrip(true);
            }}
          >
            Hypothetical round trip
          </button>
        </div>
        <label className="science-select">
          Compare distances
          <select
            value={presetIndex}
            onChange={(event) => {
              reset();
              setPresetIndex(Number(event.target.value));
            }}
          >
            {LIGHT_TIME_PRESETS.map((item, i) => (
              <option key={item.id} value={i}>
                {item.label}
              </option>
            ))}
          </select>
        </label>
        <p className="ow-caption">
          {preset.note} Radio travels at{" "}
          {LIGHT_SPEED_KM_S.toLocaleString("en-US")} km/s.{" "}
          {reduced
            ? "Reduced motion: use the journey slider or show arrival."
            : `${duration.toFixed(1)} second demonstration · approximately ${(oneWay / legDuration).toLocaleString("en-US", { maximumFractionDigits: 1 })}× time.`}
        </p>
        <p className="science-warning">
          {roundTrip ? "Hypothetical exchange. " : ""}This demonstrates
          propagation, not an actual successful two-way contact in 2003.
          Processing delay, moving endpoints and hardware availability are
          excluded. The final faint signal contained no telemetry.
        </p>
      </div>
    </section>
  );
}
