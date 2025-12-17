import React, { useEffect } from 'react';
import { usePostsStore } from '../store/postsStore';
import { useUIStore } from '../store/uiStore';
import toast from 'react-hot-toast';

export default function NotificationsSimulator() {
  const { simulateEngagement } = usePostsStore();
  const { autoSimulateNotifications } = useUIStore();

  useEffect(() => {
    if (!autoSimulateNotifications) return;
    const t = setInterval(() => {
      // 50% chance to be a new post notification that actually adds content
      if (Math.random() > 0.5) {
        simulateEngagement(); // Adds a post
        toast('🔔 هناك نشاط جديد على الخلاصة', { duration: 3000 });
      } else {
        // Just a like or generic alert
        toast('❤️ شخص ما أعجب بمنشورك', { icon: '❤️', duration: 3000 });
      }
    }, 15000); // every 15s (slowed down slightly)
    return () => clearInterval(t);
  }, [autoSimulateNotifications, simulateEngagement]);

  return null;
}
