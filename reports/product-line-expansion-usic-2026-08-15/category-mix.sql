WITH category_counts AS (
  SELECT
    category,
    COUNT(*)::integer AS active_skus
  FROM public.products
  WHERE active = TRUE
  GROUP BY category
)
SELECT
  category,
  active_skus,
  active_skus::numeric / SUM(active_skus) OVER () AS share
FROM category_counts
ORDER BY active_skus DESC, category ASC;
