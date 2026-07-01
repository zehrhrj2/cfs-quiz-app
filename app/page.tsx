import QuizClient from "@/components/quiz/QuizClient";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ src?: string }>;
}) {
  const { src } = await searchParams;
  return <QuizClient initialSrc={src ?? null} />;
}
