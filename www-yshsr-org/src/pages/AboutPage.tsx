import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useTranslation } from "react-i18next";
import { useLanguage } from "@/hooks/use-language";

export function AboutPage() {
  const { t } = useTranslation();
  const { isTransitioning } = useLanguage();
  return (
    <div className="container mx-auto flex flex-col items-center justify-center min-h-[calc(100vh-4rem)]">
      <Card className="w-full max-w-4xl">
        <CardHeader className={isTransitioning ? 'language-fade-out' : 'language-fade-in'}>
          <CardTitle className="content-transition">{t("about_hsr_cloud")}</CardTitle>
          <CardDescription className="content-transition">{t("about_description")}</CardDescription>
        </CardHeader>
        <CardHeader className={isTransitioning ? 'language-fade-out' : 'language-fade-in'}>
          <CardTitle className="content-transition">{t("about_me")}</CardTitle>
          <CardDescription className="content-transition">{t("about_me_description")}</CardDescription>
        </CardHeader>
        <CardContent className={`py-8 ${isTransitioning ? 'language-fade-out' : 'language-fade-in'}`}>
          <p className="text-sm text-muted-foreground content-transition">{t("version")}: 1.0.0</p>
          <p className="text-sm text-muted-foreground content-transition">
            {t("author")}: Gemini & Claude
          </p>
          <p className="text-sm text-muted-foreground content-transition">
            {t("tech_stack")}: React, Vite, Tailwind CSS, Shadcn/ui, React
            Router
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
