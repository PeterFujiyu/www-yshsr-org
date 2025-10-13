import { useTranslation } from "react-i18next";

export function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="container mx-auto text-center">
        <p>
          &copy; {new Date().getFullYear()} {t("hsr_cloud_inc")}.{" "}
          {t("all_rights_reserved")} {t("powered_by_gcp")}
        </p>
      </div>
    </footer>
  );
}
