import { getConfig } from '@@sf/ssr-context';

export const POSTS_PER_PAGE = 13;

export const countBlogPages = async () => {
  const { getContent } = getConfig();
  const postSlugs = await getContent('blog/');
  const datePerSlug: Record<string, string | undefined> = {};
  await Promise.all(postSlugs.map(async (slug) => {
    const content = await getContent(`blog/${slug}`);
    datePerSlug[slug] = content?.date;
  }));
  postSlugs.sort((a, b) => {
    const dateA = datePerSlug[a];
    const dateB = datePerSlug[b];
    if (!dateB) return -1;
    if (!dateA) return 1;
    if (dateA > dateB) return -1;
    if (dateA < dateB) return 1;
    return 0;
  });
  const totalPages = Math.ceil(postSlugs.length / POSTS_PER_PAGE) || 1;
  return { postSlugs, totalPages };
};
