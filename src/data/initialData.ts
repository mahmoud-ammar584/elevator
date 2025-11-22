export const INITIAL_POSTS = [
  {
    id: '1',
    author: { id: 'user1', name: 'أحمد محمد', handle: '@ahmed_dev', avatar: '👨‍💻', verified: true },
    content: 'بدأت للتو في تعلم React وأنا متحمس جداً! 🚀',
    timestamp: new Date(Date.now() - 7200000).toISOString(),
    likes: 24,
    comments: 5,
    shares: 2,
    media: null,
    likedBy: [],
    bookmarkedBy: []
  },
  {
    id: '2',
    author: { id: 'user2', name: 'سارة علي', handle: '@sara_design', avatar: '👩‍🎨', verified: true },
    content: 'أحب كيف يجمع Elevator بين البساطة والأناقة في التصميم. التجربة سلسة جداً! 💫',
    timestamp: new Date(Date.now() - 14400000).toISOString(),
    likes: 156,
    comments: 23,
    shares: 12,
    media: { type: 'image', url: 'placeholder' },
    likedBy: ['currentUser'],
    bookmarkedBy: []
  }
]
