export const formatTime = (isoDate: string | Date) => {
  const now = new Date();
  const postDate = typeof isoDate === 'string' ? new Date(isoDate) : isoDate;
  const diffInMs = now.getTime() - postDate.getTime();
  const diffInMinutes = Math.floor(diffInMs / 60000);
  const diffInHours = Math.floor(diffInMs / 3600000);
  const diffInDays = Math.floor(diffInMs / 86400000);

  if (diffInMinutes < 1) return 'الآن';
  if (diffInMinutes < 60) return `منذ ${diffInMinutes} دقيقة`;
  if (diffInHours < 24) return `منذ ${diffInHours} ساعة`;
  if (diffInDays < 7) return `منذ ${diffInDays} يوم`;
  return postDate.toLocaleDateString('ar');
};