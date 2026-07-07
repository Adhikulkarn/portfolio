import React from 'react';

const BlogSkeleton = () => {
  return (
    <div className="blog-skeletons-grid" aria-hidden="true">
      {[1, 2, 3].map((i) => (
        <div key={i} className="blog-skeleton-card glass-panel">
          <div className="skeleton-blog-image pulse" />
          <div className="blog-skeleton-body">
            <div className="skeleton-blog-meta pulse" />
            <div className="skeleton-blog-title pulse" />
            <div className="skeleton-blog-desc pulse" />
            <div className="skeleton-blog-tags">
              <div className="skeleton-blog-tag pulse" />
              <div className="skeleton-blog-tag pulse" />
            </div>
            <div className="skeleton-blog-btn pulse" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlogSkeleton;
