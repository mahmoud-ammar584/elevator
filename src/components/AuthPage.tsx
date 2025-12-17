import React, { useState } from 'react';
import { ArrowUp, Mail, Lock, Eye, EyeOff, User as UserIcon } from 'lucide-react';
import { validateEmail, validatePassword } from '../utils/validators';

type Props = { onLogin: (email: string, password: string) => Promise<void> | void };

export default function AuthPage({ onLogin }: Props) {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '', displayName: '', confirmPassword: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    const newErrors: Record<string, string> = {};
    if (!validateEmail(formData.email)) newErrors.email = 'البريد الإلكتروني غير صحيح';
    if (!validatePassword(formData.password)) newErrors.password = 'كلمة المرور يجب أن تكون 8 أحرف على الأقل';
    if (!isLogin && formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'كلمات المرور غير متطابقة';
    if (!isLogin && !formData.displayName.trim()) newErrors.displayName = 'الاسم مطلوب';
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        await new Promise((res) => setTimeout(res, 700)); // Simulate API call delay
        await onLogin(formData.email, formData.password);
      } catch (error: any) {
        newErrors.general = error.message || 'فشل تسجيل الدخول. يرجى المحاولة مرة أخرى.';
        setErrors(newErrors);
      }
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-white flex">
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-14 h-14 bg-black rounded-2xl flex items-center justify-center relative overflow-hidden">
                <ArrowUp className="w-8 h-8 text-white" strokeWidth={2.5} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Elevator</h1>
                <p className="text-xs text-gray-500">ارتقِ بتواصلك</p>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-2">{isLogin ? 'مرحباً بعودتك' : 'انضم إلى Elevator'}</h2>
            <p className="text-gray-500">{isLogin ? 'سجل دخولك للوصول إلى حسابك' : 'أنشئ حساباً جديداً وابدأ التواصل'}</p>
          </div>

          <div className="space-y-3 mb-8">
            <button className="w-full h-12 border border-gray-200 rounded-xl flex items-center justify-center gap-3 hover:bg-gray-50 transition-colors">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span className="text-sm font-medium text-gray-700">متابعة باستخدام Google</span>
            </button>
          </div>

          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">أو</span>
            </div>
          </div>

          <div className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">الاسم الكامل</label>
                <div className="relative">
                  <UserIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={formData.displayName}
                    onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                    className={`w-full h-12 pr-11 pl-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all ${errors.displayName ? 'border-red-500' : 'border-gray-200'}`}
                    placeholder="أدخل اسمك الكامل"
                  />
                </div>
                {errors.displayName && <p className="text-red-500 text-xs mt-1">{errors.displayName}</p>}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">البريد الإلكتروني</label>
              <div className="relative">
                <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={`w-full h-12 pr-11 pl-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all ${errors.email ? 'border-red-500' : 'border-gray-200'}`}
                  placeholder="example@email.com"
                />
              </div>
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">كلمة المرور</label>
              <div className="relative">
                <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className={`w-full h-12 pr-11 pl-11 border rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all ${errors.password ? 'border-red-500' : 'border-gray-200'}`}
                  placeholder="••••••••"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </div>

            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">تأكيد كلمة المرور</label>
                <div className="relative">
                  <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className={`w-full h-12 pr-11 pl-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all ${errors.confirmPassword ? 'border-red-500' : 'border-gray-200'}`}
                    placeholder="••••••••"
                  />
                </div>
                {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
              </div>
            )}

            <button onClick={handleSubmit} disabled={isLoading} className="w-full h-12 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
              {isLoading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : <span>{isLogin ? 'تسجيل الدخول' : 'إنشاء حساب'}</span>}
            </button>
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              {isLogin ? 'ليس لديك حساب؟' : 'لديك حساب بالفعل؟'}{' '}
              <button onClick={() => setIsLogin(!isLogin)} className="text-gray-900 font-medium hover:underline">{isLogin ? 'سجل الآن' : 'سجل دخولك'}</button>
            </p>
          </div>
        </div>
      </div>

      <div className="hidden lg:flex lg:w-1/2 bg-gray-50 items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-50"></div>
        <div className="absolute top-20 right-20 w-64 h-64 bg-gray-200 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-gray-300 rounded-full opacity-20 blur-3xl"></div>
        <div className="relative z-10 max-w-md">
          <div className="inline-block px-4 py-2 bg-white rounded-full text-sm font-medium text-gray-900 mb-6 shadow-sm">🚀 أكثر من 10 مليون مستخدم نشط</div>
          <h2 className="text-4xl font-bold text-gray-900 mb-6">ارتقِ بتجربة التواصل الاجتماعي</h2>
          <p className="text-lg text-gray-600 mb-8">Elevator ليست مجرد منصة تواصل، إنها المكان حيث تصل الأفكار لأعلى مستوياتها.</p>
        </div>
      </div>
    </div>
  );
}