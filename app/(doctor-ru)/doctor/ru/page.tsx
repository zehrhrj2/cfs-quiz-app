import DoctorClient from "@/components/doctor/DoctorClient";
import { doctorStrings } from "@/lib/doctor/strings";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ utm_source?: string; utm_medium?: string; utm_campaign?: string }>;
}) {
  const { utm_source, utm_medium, utm_campaign } = await searchParams;
  return (
    <DoctorClient
      locale="ru"
      strings={doctorStrings.ru}
      utm={{
        source: utm_source ?? null,
        medium: utm_medium ?? null,
        campaign: utm_campaign ?? null,
      }}
    />
  );
}
