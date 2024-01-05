import { getConfig } from '@@sf/ssr-context';

export const POSTS_PER_PAGE = 4;

export const countBlogPages = async () => {
  const postSlugs = await getConfig().getContent('blog/');
  const totalPages = Math.ceil(postSlugs.length / POSTS_PER_PAGE) || 1;
  return { postSlugs, totalPages };
};
