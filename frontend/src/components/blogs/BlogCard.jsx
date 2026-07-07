import React from 'react';
import { motion } from 'framer-motion';
import Button from '../ui/Button';

const BlogCard = ({ blog }) => {
  // Average reading speed: 200 words per minute
  const wordCount = (blog.content || '').split(/\s+/).filter(Boolean).length;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  const formattedDate = blog.created_at
    ? new Date(blog.created_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : '';

  const tagsList = blog.tags
    ? blog.tags
        .split(',')
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0)
    : [];

  // Strip HTML elements for raw text excerpts
  const plainText = (blog.content || '').replace(/<[^>]*>/g, '');
  const excerpt = plainText.length > 130 
    ? `${plainText.substring(0, 130)}...` 
    : plainText;

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="blog-card glass-panel"
      role="article"
      aria-label={`Blog post: ${blog.title}`}
    >
      {/* Visual Cover Image */}
      <a href={`/blogs/${blog.slug}`} className="blog-image-link" aria-label={`Read article: ${blog.title}`}>
        <div className="blog-image-wrapper">
          <img
            src={blog.cover_image}
            alt={blog.title}
            className="blog-image"
            loading="lazy"
          />
          <div className="blog-image-overlay" />
        </div>
      </a>

      {/* Card Content */}
      <div className="blog-card-body">
        <div className="blog-meta-row">
          <span className="blog-date">{formattedDate}</span>
          <span className="blog-meta-divider" aria-hidden="true">•</span>
          <span className="blog-reading-time">{readingTime} min read</span>
        </div>

        <h3 className="blog-title">
          <a href={`/blogs/${blog.slug}`}>{blog.title}</a>
        </h3>

        <p className="blog-excerpt">{excerpt}</p>

        {tagsList.length > 0 && (
          <div className="blog-tags-container">
            {tagsList.map((tag) => (
              <span key={tag} className="blog-tag">
                #{tag}
              </span>
            ))}
          </div>
        )}

        <div className="blog-card-footer">
          <Button variant="outline" href={`/blogs/${blog.slug}`} className="blog-read-btn">
            Read Article
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default React.memo(BlogCard);
