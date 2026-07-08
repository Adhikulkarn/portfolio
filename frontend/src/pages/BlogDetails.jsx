import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import PageTransition from '../components/ui/PageTransition';
import Container from '../components/ui/Container';
import Button from '../components/ui/Button';
import ErrorState from '../components/ui/ErrorState';
import SEO from '../components/common/SEO';
import { blogService } from '../services/blogService';

const BlogDetails = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchBlog = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      const data = await blogService.getBlogBySlug(slug);
      setBlog(data);
    } catch (err) {
      console.error('Failed to load blog details:', err);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    fetchBlog();
  }, [fetchBlog]);

  // Estimate reading time from words count
  const getReadingTime = (content = '') => {
    const cleanContent = content.replace(/<[^>]*>/g, ''); // strip html tags
    const wordCount = cleanContent.split(/\s+/).filter(Boolean).length;
    return Math.max(1, Math.ceil(wordCount / 200));
  };

  if (loading) {
    return (
      <PageTransition>
        <SEO title="Loading Article..." noIndex={true} />
        <Container>
          <div style={{ padding: '4rem 0', maxWidth: '800px', margin: '0 auto' }}>
            <div className="skeleton-meta pulse" style={{ width: '150px', height: '14px', marginBottom: '1.5rem' }} />
            <div className="skeleton-title pulse" style={{ width: '80%', height: '44px', marginBottom: '2.5rem' }} />
            <div className="skeleton-image pulse" style={{ width: '100%', aspectRatio: '16/10', borderRadius: '12px', marginBottom: '3rem' }} />
            <div className="skeleton-description pulse" style={{ width: '100%', height: '240px' }} />
          </div>
        </Container>
      </PageTransition>
    );
  }

  if (error || !blog) {
    return (
      <PageTransition>
        <SEO title="Article Not Found" noIndex={true} />
        <Container>
          <div style={{ padding: '6rem 0', textAlign: 'center' }}>
            <ErrorState
              title="Article Not Found"
              message={`The blog article with slug "${slug}" could not be resolved or does not exist.`}
              onRetry={fetchBlog}
            />
            <div style={{ marginTop: '2rem' }}>
              <Button href="/" variant="secondary">
                Back to Home
              </Button>
            </div>
          </div>
        </Container>
      </PageTransition>
    );
  }

  const formattedDate = blog.created_at
    ? new Date(blog.created_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : '';

  const readingTime = getReadingTime(blog.content);

  return (
    <PageTransition>
      <SEO 
        title={`${blog.title} | Blog`}
        description={blog.content ? blog.content.replace(/<[^>]*>/g, '').substring(0, 150) : undefined}
        slug={`blogs/${slug}`}
        image={blog.cover_image}
      />
      <Container>
        <article className="blog-details-page" style={{ padding: '4rem 0', maxWidth: '800px', margin: '0 auto' }}>
          {/* Back Nav Link */}
          <div style={{ marginBottom: '2rem' }}>
            <Link to="/" className="nav-link" style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              &larr; Back to home
            </Link>
          </div>

          {/* Heading */}
          <header style={{ marginBottom: '3rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1rem' }}>
              <span>{formattedDate}</span>
              <span>•</span>
              <span>{readingTime} min read</span>
            </div>
            <h1 className="editorial-heading text-gradient" style={{ fontSize: '3rem', marginBottom: '1.5rem', lineHeight: '1.1' }}>
              {blog.title}
            </h1>
          </header>

          {/* Featured Cover Image */}
          {blog.cover_image && (
            <div className="project-image-link" style={{ cursor: 'default', marginBottom: '3.5rem', borderRadius: '12px' }}>
              <div className="project-image-wrapper">
                <img
                  src={blog.cover_image}
                  alt={blog.title}
                  className="project-image"
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />
              </div>
            </div>
          )}

          {/* Rich Content rendering */}
          <div 
            className="blog-rich-content" 
            style={{ 
              fontSize: '1.1rem', 
              color: 'var(--text-muted)', 
              lineHeight: '1.8', 
              whiteSpace: 'pre-wrap' 
            }}
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </article>
      </Container>
    </PageTransition>
  );
};

export default BlogDetails;
