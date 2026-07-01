import QuizClient from "@/components/quiz/QuizClient";
import { strings } from "@/lib/i18n/ru";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ src?: string }>;
}) {
  const { src } = await searchParams;
  return <QuizClient initialSrc={src ?? null} strings={strings} locale="ru" />;
}
