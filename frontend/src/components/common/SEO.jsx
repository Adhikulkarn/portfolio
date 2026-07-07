import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({
  title,
  description = "Aditya Kulkarni is a Software Engineer specializing in building full-stack products, web systems, and creative user interfaces.",
  type = 'website',
  slug = '',
  image = '',
  noIndex = false,
}) => {
  const siteUrl = window.location.origin;
  const canonicalUrl = slug ? `${siteUrl}/${slug}` : siteUrl;
  const siteTitle = title ? `${title} | Aditya Kulkarni` : "Aditya Kulkarni | Software Engineer";
  const ogImage = image || `${siteUrl}/android-chrome-512x512.png`;

  return (
    <Helmet>
      {/* Standard SEO headers */}
      <title>{siteTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
      <meta name="robots" content={noIndex ? "noindex, nofollow" : "index, follow"} />

      {/* Open Graph (Facebook / LinkedIn) */}
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="Aditya Kulkarni Portfolio" />

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  );
};

export default SEO;
