import {
  BarChart3,
  Settings,
  Zap,
  CheckCircle,
  GraduationCap,
  Users,
  Clock,
  Shield,
} from "lucide-react";

interface ServiceIconProps {
  icon: string;
  className?: string;
}

const iconMap = {
  BarChart3,
  Settings,
  Zap,
  CheckCircle,
  GraduationCap,
  Users,
  Clock,
  Shield,
};

export function ServiceIcon({ icon, className = "w-8 h-8" }: ServiceIconProps) {
  const IconComponent = iconMap[icon as keyof typeof iconMap];

  if (!IconComponent) {
    return <Settings className={className} />; // Fallback иконка
  }

  return <IconComponent className={className} />;
}
