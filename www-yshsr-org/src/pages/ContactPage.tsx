import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button"; // Import Button component

export function ContactPage() {
  const { t } = useTranslation();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        alert('Copied to clipboard: ' + text); // Simple feedback
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
      });
  };

  return (
    <div className="container mx-auto flex flex-col items-center justify-center min-h-[calc(100vh-4rem)]">
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <CardTitle>{t('contact')}</CardTitle>
          <CardDescription>
            {t('contact_description')}
          </CardDescription>
        </CardHeader>
        <CardContent className="py-8">
          <div className="flex items-center space-x-2 mb-2">
            <p className="text-sm text-muted-foreground">
              {t('email')}: <a href="mailto:p@yshsr.org" className="text-blue-500 hover:underline">p@yshsr.org</a>
            </p>
            <Button variant="ghost" size="icon" onClick={() => copyToClipboard('p@yshsr.org')} className="!bg-transparent">
              <span className="material-symbols-outlined text-base">content_copy</span>
              <span className="sr-only">Copy email</span>
            </Button>
          </div>
          <div className="flex items-center space-x-2">
            <p className="text-sm text-muted-foreground">
              {t('alternate_email')}: <a href="mailto:peter.fu.369@gmail.com" className="text-blue-500 hover:underline">peter.fu.369@gmail.com</a>
            </p>
            <Button variant="ghost" size="icon" onClick={() => copyToClipboard('peter.fu.369@gmail.com')} className="!bg-transparent">
              <span className="material-symbols-outlined text-base">content_copy</span>
              <span className="sr-only">Copy alternate email</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
