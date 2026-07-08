import React, { useState, useEffect, useCallback } from 'react';
import Section from '../ui/Section';
import Container from '../ui/Container';
import BlogCard from './BlogCard';
import BlogSkeleton from './BlogSkeleton';
import BlogEmptyState from './BlogEmptyState';
import BlogErrorState from './BlogErrorState';
import { blogService } from '../../services/blogService';

const BlogsSection = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      const data = await blogService.getBlogs();
      // Ensure we only show published blogs (the API does this for public GET, but we filter for safety)
      const published = (data || []).filter((blog) => blog.published !== false);
      setBlogs(published);
    } catch (err) {
      console.error('Failed to load blogs inside BlogsSection:', err);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  return (
    <Section id="blogs" className="blogs-section">
      <div className="section-bg-text section-bg-text-right" aria-hidden="true">
        WRITE
      </div>
      <Container>
        {/* Section Header */}
        <div className="blogs-header">
          <h2 className="editorial-heading">
            LATEST <br />
            <span className="accent-gradient">WRITING</span>
          </h2>
          <p className="blogs-intro">
            I enjoy documenting what I learn while building software.
          </p>
        </div>

        {/* Dynamic State Container */}
        <div className="blogs-content-area">
          {loading ? (
            <BlogSkeleton />
          ) : error ? (
            <BlogErrorState onRetry={fetchBlogs} />
          ) : blogs.length === 0 ? (
            <BlogEmptyState />
          ) : (
            <div className="blogs-cards-grid">
              {blogs.map((blog) => (
                <BlogCard key={blog.id || blog.slug} blog={blog} />
              ))}
            </div>
          )}
        </div>
      </Container>
    </Section>
  );
};

export default BlogsSection;
