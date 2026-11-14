export const LIGHT_SPEED_KM_S = 299792.458;
export const LIGHT_TIME_PRESETS = [
  { id: 'pioneer', label: 'Pioneer 10 · 23 Jan 2003', distanceKm: 12.23e9, distanceLabel: '12.23 billion km', endpoint: 'Pioneer 10', note: 'Rounded Earth–spacecraft separation associated with the final received signal.' },
  { id: 'moon', label: 'Mean Earth–Moon distance', distanceKm: 384400, distanceLabel: '384,400 km', endpoint: 'Moon', note: 'Mean reference distance, not the Moon’s position on 23 January 2003.' },
  { id: 'au', label: 'One astronomical unit', distanceKm: 149597870.7, distanceLabel: '149,597,870.7 km', endpoint: '1 AU reference', note: 'A reference length, not a spacecraft or a dated Earth–Sun measurement.' },
] as const;
export const lightTimeSeconds = (distanceKm: number) => distanceKm / LIGHT_SPEED_KM_S;
export function formatLightTime(seconds: number): string {
  if (seconds < 60) return `${seconds.toFixed(2)} s`;
  const roundedMinutes = Math.round(seconds / 60);
  return roundedMinutes >= 60 ? `${Math.floor(roundedMinutes / 60)}h ${roundedMinutes % 60}m` : `${Math.floor(seconds / 60)}m ${Math.round(seconds % 60)}s`;
}
