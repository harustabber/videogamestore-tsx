interface StatCardProps {
  title: string;
  color: 'primary' | 'secondary';
  children: React.ReactNode;
}

export const StatCard = ({ title, color, children }: StatCardProps) => {
  const bg =
    color === 'primary'
      ? 'bg-gradient-to-br from-[#6657f1] via-[#7f6ee3] to-[#a28eff]'
      : 'bg-gradient-to-br from-[#ff7fa5] via-[#ff8f9f] to-[#ffbbc7]';

  return (
    <div className={`${bg} rounded-[2rem] p-6 text-white shadow-2xl relative overflow-hidden min-h-[220px]`}>
      <h3 className="text-lg font-medium opacity-90 mb-4">{title}</h3>
      {children}
      <div className="absolute -right-6 -top-6 w-28 h-28 bg-white/15 rounded-full blur-3xl"></div>
      <div className="absolute -left-10 top-24 h-24 w-24 rounded-full bg-white/10 blur-2xl"></div>
    </div>
  );
};