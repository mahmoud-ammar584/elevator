import React from 'react';

const Svg = ({ children, className, ...rest }: any) => (
  <span {...rest} className={className} style={{ display: 'inline-flex', lineHeight: 0 }}>
    {children}
  </span>
);

export const ArrowUp = (props: any) => <Svg {...props}>▲</Svg>;
export const Mail = (props: any) => <Svg {...props}>✉️</Svg>;
export const Lock = (props: any) => <Svg {...props}>🔒</Svg>;
export const Eye = (props: any) => <Svg {...props}>👁️</Svg>;
export const EyeOff = (props: any) => <Svg {...props}>🙈</Svg>;
export const User = (props: any) => <Svg {...props}>👤</Svg>;
export const Home = (props: any) => <Svg {...props}>🏠</Svg>;
export const Search = (props: any) => <Svg {...props}>🔎</Svg>;
export const Bell = (props: any) => <Svg {...props}>🔔</Svg>;
export const MessageCircle = (props: any) => <Svg {...props}>💬</Svg>;
export const Settings = (props: any) => <Svg {...props}>⚙️</Svg>;
export const Bookmark = (props: any) => <Svg {...props}>🔖</Svg>;
export const LogOut = (props: any) => <Svg {...props}>⇦</Svg>;
export const Heart = (props: any) => <Svg {...props}>❤</Svg>;
export const MessageSquare = (props: any) => <Svg {...props}>💬</Svg>;
export const Share2 = (props: any) => <Svg {...props}>🔗</Svg>;
export const MoreHorizontal = (props: any) => <Svg {...props}>⋯</Svg>;
export const Trash2 = (props: any) => <Svg {...props}>🗑️</Svg>;
export const Check = (props: any) => <Svg {...props}>✔️</Svg>;
export const X = (props: any) => <Svg {...props}>✖️</Svg>;
export const Image = (props: any) => <Svg {...props}>🖼️</Svg>;
export const Video = (props: any) => <Svg {...props}>🎥</Svg>;
export const Smile = (props: any) => <Svg {...props}>😊</Svg>;
export const TrendingUp = (props: any) => <Svg {...props}>📈</Svg>;
export const Users = (props: any) => <Svg {...props}>👥</Svg>;
export const Hash = (props: any) => <Svg {...props}>#</Svg>;
export const Send = (props: any) => <Svg {...props}>➤</Svg>;
export const Menu = (props: any) => <Svg {...props}>☰</Svg>;
export const MapPin = (props: any) => <Svg {...props}>📍</Svg>;
export const Calendar = (props: any) => <Svg {...props}>📅</Svg>;
export const ExternalLink = (props: any) => <Svg {...props}>🔗</Svg>;
export const Edit = (props: any) => <Svg {...props}>✏️</Svg>;

export default {} as any;