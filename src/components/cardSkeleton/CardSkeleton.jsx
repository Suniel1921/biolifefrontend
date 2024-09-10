import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import '../cardSkeleton/cardSkeleton.css';

const CardSkeleton = () => {
  const skeletonCount = 8 // Number of skeleton cards to display

  return (
    <SkeletonTheme>
      <div className="skeleton-container">
        {Array.from({ length: skeletonCount }).map((_, index) => (
          <div key={index} className="skeleton-card">
            <Skeleton width={210} height={210} />
            <h3><Skeleton width={210} /></h3>
            <p><Skeleton width={150} /></p>
            <p><Skeleton width={150} /></p>
          </div>
        ))}
      </div>
    </SkeletonTheme>
  );
};

export default CardSkeleton;
