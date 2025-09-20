import { useTranslation } from "react-i18next";

export function Logo() {
  const { t } = useTranslation();
  return (
    <div className="flex items-center">
      <span className="text-2xl font-bold">
        <span style={{ color: '#4285F4' }}>H</span>
        <span style={{ color: '#EA4335' }}>s</span>
        <span style={{ color: '#FBBC05' }}>r</span>
      </span>
      <span className="text-2xl font-normal text-muted-foreground"> {t('hsr_cloud').split(' ')[1]}</span>
    </div>
  );
}
