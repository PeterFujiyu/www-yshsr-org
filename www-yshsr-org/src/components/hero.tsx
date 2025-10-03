import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Typewriter from "./Typewriter";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLanguage } from "@/hooks/use-language";

export function Hero() {
  const [lines, setLines] = useState<string[]>([]);
  const [motd, setMotd] = useState("");
  const [isCoolingDown, setIsCoolingDown] = useState(false);
  const { t } = useTranslation();
  const { isTransitioning } = useLanguage();

  const getNewGuid = () => {
    if (lines.length > 0 && !isCoolingDown) {
      setIsCoolingDown(true);
      const randomLine = lines[Math.floor(Math.random() * lines.length)];
      setMotd(randomLine.trim());
      setTimeout(() => setIsCoolingDown(false), 2000); // 2 second cooldown
    }
  };

  useEffect(() => {
    const fetchMotd = async () => {
      try {
        const response = await fetch("https://storage.googleapis.com/www-file-storage/www-yshsr-org/motd.md");

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const text = await response.text();
        const fetchedLines = text.split('.').filter(line => line.trim() !== '');

        if (fetchedLines.length === 0) {
          setMotd("Welcome to my website!");
          return;
        }

        setLines(fetchedLines);
        const randomLine = fetchedLines[Math.floor(Math.random() * fetchedLines.length)];
        setMotd(randomLine.trim());
      } catch (error) {
        console.error("Failed to fetch MOTD:", error);
        setMotd("Welcome to my website!"); // Fallback message
      }
    };

    fetchMotd();
  }, []);

  return (
    <div className="container mx-auto flex flex-col items-center justify-center min-h-[calc(100vh-8rem)]">
      <Card 
        className="w-full max-w-4xl"
        onClick={getNewGuid}
        style={{ cursor: isCoolingDown ? 'not-allowed' : 'pointer' }}
      >
        <CardHeader className={isTransitioning ? 'language-fade-out' : 'language-fade-in'}>
          <CardTitle className="content-transition">{t('hello_world')}</CardTitle>
          <CardDescription className="content-transition">
            {t('modernized_website')}
          </CardDescription>
        </CardHeader>
        <CardContent className="py-8">
          {motd && (
            <Typewriter
              text={motd}
              typingSpeed={100}
              deletingSpeed={50}
              delayAfterTyping={3000}
            />
          )}
        </CardContent>
        <CardFooter className={isTransitioning ? 'language-fade-out' : 'language-fade-in'}>
          <p className="content-transition">{t('powered_by')}</p>
        </CardFooter>
      </Card>
    </div>
  );
}
