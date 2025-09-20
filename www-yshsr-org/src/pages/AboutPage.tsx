import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "react-i18next";

export function AboutPage() {
  const { t } = useTranslation();
  return (
    <div className="container mx-auto flex flex-col items-center justify-center min-h-[calc(100vh-4rem)]">
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <CardTitle>{t('about_hsr_cloud')}</CardTitle>
          <CardDescription>
            {t('about_description')}
          </CardDescription>
        </CardHeader>
        <CardContent className="py-8">
          <p className="text-sm text-muted-foreground">
            {t('version')}: 1.0.0
          </p>
          <p className="text-sm text-muted-foreground">
            {t('author')}: Gemini & Claude
          </p>
          <p className="text-sm text-muted-foreground">
            {t('tech_stack')}: React, Vite, Tailwind CSS, Shadcn/ui, React Router
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
