import React from 'react';
import { X } from 'lucide-react';
import { useUIStore } from '../store/uiStore';

type ModalType = 'about' | 'help' | 'terms' | 'privacy' | 'api' | null;

type Props = {
    activeModal: ModalType;
    onClose: () => void;
};

const modalContent: Record<Exclude<ModalType, null>, { title: string; titleAr: string; content: React.ReactNode }> = {
    about: {
        title: 'About Elevator',
        titleAr: 'حول Elevator',
        content: (
            <div className="space-y-4">
                <p className="text-lg">
                    Elevator هي منصة تواصل اجتماعي حديثة مصممة لرفع مستوى تفاعلاتك الرقمية.
                </p>
                <p>
                    نؤمن بأن التواصل يجب أن يكون سهلاً وممتعاً وآمناً. منصتنا مبنية على أحدث التقنيات لضمان أفضل تجربة للمستخدم.
                </p>
                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 mt-4">
                    <h4 className="font-semibold mb-2">إحصائيات</h4>
                    <ul className="space-y-1 text-sm">
                        <li>• أكثر من 10 مليون مستخدم نشط</li>
                        <li>• متوفر في 50+ دولة</li>
                        <li>• 99.9% uptime</li>
                    </ul>
                </div>
            </div>
        ),
    },
    help: {
        title: 'Help Center',
        titleAr: 'مركز المساعدة',
        content: (
            <div className="space-y-4">
                <div className="space-y-3">
                    <details className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 cursor-pointer">
                        <summary className="font-medium">كيف أنشئ منشور جديد؟</summary>
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                            اضغط على زر "منشور جديد" في الشريط الجانبي أو أيقونة + في الأعلى. اكتب محتواك وأرفق الصور أو الفيديو إن أردت.
                        </p>
                    </details>
                    <details className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 cursor-pointer">
                        <summary className="font-medium">كيف أغير إعدادات حسابي؟</summary>
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                            اذهب إلى الإعدادات من الشريط الجانبي. يمكنك تغيير اللغة والمظهر وإعدادات الخصوصية.
                        </p>
                    </details>
                    <details className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 cursor-pointer">
                        <summary className="font-medium">كيف أتابع مستخدمين آخرين؟</summary>
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                            ابحث عن المستخدم أو اضغط على زر "متابعة" في اقتراحات المتابعة على اليمين.
                        </p>
                    </details>
                </div>
                <p className="text-sm text-gray-500">
                    للمزيد من المساعدة، تواصل معنا على support@elevator.app
                </p>
            </div>
        ),
    },
    terms: {
        title: 'Terms of Service',
        titleAr: 'شروط الخدمة',
        content: (
            <div className="space-y-4 text-sm">
                <p>آخر تحديث: ديسمبر 2024</p>
                <h4 className="font-semibold text-base">1. قبول الشروط</h4>
                <p>باستخدامك لمنصة Elevator، فإنك توافق على هذه الشروط والأحكام.</p>
                <h4 className="font-semibold text-base">2. استخدام الخدمة</h4>
                <p>يجب أن يكون عمرك 13 عاماً على الأقل لاستخدام خدماتنا. أنت مسؤول عن محتواك.</p>
                <h4 className="font-semibold text-base">3. المحتوى</h4>
                <p>أنت تحتفظ بحقوق محتواك لكنك تمنحنا ترخيصاً لعرضه على المنصة.</p>
                <h4 className="font-semibold text-base">4. السلوك المحظور</h4>
                <p>يحظر نشر محتوى مسيء أو غير قانوني أو انتحال شخصيات أخرى.</p>
            </div>
        ),
    },
    privacy: {
        title: 'Privacy Policy',
        titleAr: 'سياسة الخصوصية',
        content: (
            <div className="space-y-4 text-sm">
                <p>آخر تحديث: ديسمبر 2024</p>
                <h4 className="font-semibold text-base">البيانات التي نجمعها</h4>
                <ul className="list-disc list-inside space-y-1">
                    <li>معلومات الحساب (الاسم، البريد الإلكتروني)</li>
                    <li>المحتوى الذي تنشره</li>
                    <li>بيانات الاستخدام والتفاعل</li>
                </ul>
                <h4 className="font-semibold text-base">كيف نستخدم بياناتك</h4>
                <p>نستخدم بياناتك لتحسين تجربتك، عرض محتوى مخصص، وتأمين حسابك.</p>
                <h4 className="font-semibold text-base">حقوقك</h4>
                <p>يمكنك طلب نسخة من بياناتك أو حذف حسابك في أي وقت.</p>
            </div>
        ),
    },
    api: {
        title: 'API Documentation',
        titleAr: 'توثيق API',
        content: (
            <div className="space-y-4">
                <div className="bg-gray-900 text-green-400 rounded-lg p-4 font-mono text-sm">
                    <p className="text-gray-500"># Get user feed</p>
                    <p>GET /api/v1/feed</p>
                    <p className="mt-2 text-gray-500"># Create post</p>
                    <p>POST /api/v1/posts</p>
                    <p className="mt-2 text-gray-500"># Like/Unlike</p>
                    <p>POST /api/v1/posts/:id/like</p>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    للحصول على API key، تواصل معنا على developers@elevator.app
                </p>
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                    <p className="text-sm text-blue-800 dark:text-blue-300">
                        📘 التوثيق الكامل متاح على docs.elevator.app
                    </p>
                </div>
            </div>
        ),
    },
};

export default function FooterModal({ activeModal, onClose }: Props) {
    const { lang } = useUIStore();

    if (!activeModal) return null;

    const content = modalContent[activeModal];
    const isRTL = lang === 'ar';

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
            <div
                className="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-lg max-h-[80vh] overflow-hidden shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                        {isRTL ? content.titleAr : content.title}
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
                    >
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 overflow-y-auto max-h-[calc(80vh-80px)] text-gray-700 dark:text-gray-300">
                    {content.content}
                </div>
            </div>
        </div>
    );
}
