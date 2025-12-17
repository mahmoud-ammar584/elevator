export const scorePost = (p: any) => {
  return (p.likes_count || 0) * 1.5 + (p.comments_count || 0) * 2 + (p.shares_count || 0) * 2.5;
};
