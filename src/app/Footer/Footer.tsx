import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-background px-5 py-8 text-center md:px-16 md:py-10 lg:px-24">
      <p className="font-body text-caption text-muted-strong">{t(($) => $.footer.content)}</p>
    </footer>
  );
}
