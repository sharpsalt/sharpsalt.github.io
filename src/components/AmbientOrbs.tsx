import React from 'react';

/**
 * Floating ambient gradient orbs that drift slowly in the background.
 * Creates a moody, atmospheric depth behind all content.
 */
const AmbientOrbs: React.FC = React.memo(() => {
  return (
    <div className="ambient-orbs" aria-hidden="true">
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />
      <div className="orb orb-4" />
    </div>
  );
});

AmbientOrbs.displayName = 'AmbientOrbs';

export default AmbientOrbs;
