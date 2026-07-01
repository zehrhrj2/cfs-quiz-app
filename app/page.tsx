import QuizClient from "@/components/quiz/QuizClient";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ ref?: string }>;
}) {
  const { ref = "direct" } = await searchParams;
  return <QuizClient initialRef={ref} />;
}
