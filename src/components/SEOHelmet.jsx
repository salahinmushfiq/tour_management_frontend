import React from 'react';

import { Helmet } from 'react-helmet-async';

export default function SEOHelmet({ noIndex = false, title }) {
  return (
    <Helmet>
      {title && <title>{title}</title>}
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
    </Helmet>
  );
}