import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "react-i18next";
import { useLanguage } from "@/hooks/use-language";
import { Button } from "@/components/ui/button"; // Import Button component

export function ContactPage() {
  const { t } = useTranslation();
  const { isTransitioning } = useLanguage();

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      // TODO: Replace alert with a proper toast notification
      alert('Copied to clipboard: ' + text);
    } catch (err) {
      console.error('Failed to copy to clipboard:', err);
      // Fallback for older browsers or when clipboard API is not available
      try {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        textArea.remove();
        alert('Copied to clipboard: ' + text);
      } catch (fallbackErr) {
        console.error('Fallback copy failed:', fallbackErr);
        alert('Unable to copy to clipboard');
      }
    }
  };

  return (
    <div className="container mx-auto flex flex-col items-center justify-center min-h-[calc(100vh-4rem)]">
      <Card className="w-full max-w-4xl">
        <CardHeader className={isTransitioning ? 'language-fade-out' : 'language-fade-in'}>
          <CardTitle className="content-transition">{t('contact')}</CardTitle>
          <CardDescription className="content-transition">
            {t('contact_description')}
          </CardDescription>
        </CardHeader>
        <CardContent className={`py-8 ${isTransitioning ? 'language-fade-out' : 'language-fade-in'}`}>
          <div className="flex items-center space-x-2 mb-2">
            <p className="text-sm text-muted-foreground content-transition">
              {t('email')}: <a href="mailto:p@yshsr.org" className="text-blue-500 hover:underline">p@yshsr.org</a>
            </p>
            <Button variant="ghost" size="icon" onClick={() => copyToClipboard('p@yshsr.org')} className="!bg-transparent">
              <span className="material-symbols-outlined text-base">content_copy</span>
              <span className="sr-only">Copy email</span>
            </Button>
          </div>
          <div className="flex items-center space-x-2">
            <p className="text-sm text-muted-foreground content-transition">
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
