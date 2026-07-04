import { jsPDF } from "jspdf";
import { phrases, categories, type Category, type Locale } from "@/data/doctor-phrases";
import { doctorStrings, PLAY_STORE_URLS } from "./strings";
import { NOTO_SANS_REGULAR_BASE64, NOTO_SANS_BOLD_BASE64 } from "./pdfFont";

type FontWeight = "normal" | "bold";
type RGB = [number, number, number];

const MM_PER_PT = 25.4 / 72;
const PAGE_WIDTH = 210;
const PAGE_HEIGHT = 297;
const MARGIN_X = 20;
const MARGIN_TOP = 25;
const MARGIN_BOTTOM = 25;
const CONTENT_WIDTH = PAGE_WIDTH - MARGIN_X * 2;

// Matches app/globals.css's @theme tokens (--color-text, --color-muted, --color-brand)
const COLOR_TEXT: RGB = [10, 10, 10];
const COLOR_MUTED: RGB = [107, 107, 107];
const COLOR_BRAND: RGB = [204, 31, 31];

const SIZE_TRANSLATION = 13;
const SIZE_CS = 13;
const SIZE_PRONUNCIATION = 10;
const SIZE_CATEGORY_HEADER = 16;
const GAP_AFTER_ENTRY = 5; // mm, blank space between phrases
const HEADER_BOTTOM_GAP = 3; // mm, between a category header and its first phrase
const HEADER_TOP_GAP = 6; // mm, extra space before a header that isn't page-first

function lineHeightMm(sizePt: number, factor = 1.15): number {
  return sizePt * factor * MM_PER_PT;
}

function registerFonts(doc: jsPDF): void {
  doc.addFileToVFS("NotoSans-Regular.ttf", NOTO_SANS_REGULAR_BASE64);
  doc.addFont("NotoSans-Regular.ttf", "NotoSans", "normal");
  doc.addFileToVFS("NotoSans-Bold.ttf", NOTO_SANS_BOLD_BASE64);
  doc.addFont("NotoSans-Bold.ttf", "NotoSans", "bold");
}

type Cursor = { y: number };

function ensureSpace(doc: jsPDF, cursor: Cursor, neededMm: number): void {
  if (cursor.y + neededMm > PAGE_HEIGHT - MARGIN_BOTTOM) {
    doc.addPage();
    cursor.y = MARGIN_TOP;
  }
}

function measureWrapped(
  doc: jsPDF,
  text: string,
  sizePt: number,
  weight: FontWeight
): { lines: string[]; heightMm: number } {
  doc.setFont("NotoSans", weight);
  doc.setFontSize(sizePt);
  const lines = doc.splitTextToSize(text, CONTENT_WIDTH) as string[];
  return { lines, heightMm: lines.length * lineHeightMm(sizePt) };
}

function drawWrapped(
  doc: jsPDF,
  lines: string[],
  sizePt: number,
  weight: FontWeight,
  color: RGB,
  cursor: Cursor,
  align: "left" | "center" = "left"
): void {
  doc.setFont("NotoSans", weight);
  doc.setFontSize(sizePt);
  doc.setTextColor(...color);
  const lh = lineHeightMm(sizePt);
  const x = align === "center" ? PAGE_WIDTH / 2 : MARGIN_X;
  for (const line of lines) {
    cursor.y += lh;
    doc.text(line, x, cursor.y, { align });
  }
}

function drawCoverPage(doc: jsPDF, locale: Locale): void {
  const s = doctorStrings[locale];

  doc.setFont("NotoSans", "normal");
  doc.setFontSize(11);
  doc.setTextColor(...COLOR_BRAND);
  doc.text(s.hero.eyebrow, PAGE_WIDTH / 2, 40, { align: "center" });

  const cursor: Cursor = { y: 55 };
  const title = measureWrapped(doc, s.hero.headline, 28, "bold");
  drawWrapped(doc, title.lines, 28, "bold", COLOR_TEXT, cursor, "center");

  cursor.y += 10;
  const subtitle = measureWrapped(doc, s.pdfDoc.coverSubtitle, 14, "normal");
  drawWrapped(doc, subtitle.lines, 14, "normal", COLOR_MUTED, cursor, "center");

  doc.setFont("NotoSans", "normal");
  doc.setFontSize(10);
  doc.setTextColor(...COLOR_MUTED);
  doc.text(s.pdfDoc.footer, PAGE_WIDTH / 2, PAGE_HEIGHT - MARGIN_BOTTOM, { align: "center" });
}

function measurePhraseEntry(
  doc: jsPDF,
  phrase: (typeof phrases)[number],
  locale: Locale
): { heightMm: number; translation: string[]; cs: string[]; pronunciation: string[] } {
  const translationText = locale === "ua" ? phrase.ua : phrase.ru;
  const translation = measureWrapped(doc, translationText, SIZE_TRANSLATION, "normal");
  const cs = measureWrapped(doc, phrase.cs, SIZE_CS, "bold");
  const pronunciation = measureWrapped(doc, phrase.csCyrillic, SIZE_PRONUNCIATION, "normal");
  return {
    heightMm: translation.heightMm + cs.heightMm + pronunciation.heightMm + GAP_AFTER_ENTRY,
    translation: translation.lines,
    cs: cs.lines,
    pronunciation: pronunciation.lines,
  };
}

function drawPhraseEntry(
  doc: jsPDF,
  entry: { translation: string[]; cs: string[]; pronunciation: string[] },
  cursor: Cursor
): void {
  drawWrapped(doc, entry.translation, SIZE_TRANSLATION, "normal", COLOR_TEXT, cursor);
  drawWrapped(doc, entry.cs, SIZE_CS, "bold", COLOR_TEXT, cursor);
  drawWrapped(doc, entry.pronunciation, SIZE_PRONUNCIATION, "normal", COLOR_MUTED, cursor);
  cursor.y += GAP_AFTER_ENTRY;
}

function drawPhrasePages(doc: jsPDF, cursor: Cursor, locale: Locale): void {
  const categoryKeys = Object.keys(categories) as Category[];

  for (const cat of categoryKeys) {
    const catPhrases = phrases.filter((p) => p.category === cat);
    if (catPhrases.length === 0) continue;

    // No emoji in the PDF: Noto Sans has no emoji/dingbat glyphs at any
    // subset size (see pdfFont.ts), so the label is text-only here — the
    // web page still shows the icon.
    const label = categories[cat][locale];
    const header = measureWrapped(doc, label, SIZE_CATEGORY_HEADER, "bold");
    const firstEntry = measurePhraseEntry(doc, catPhrases[0], locale);

    // Header + its first phrase must land on the same page together, or
    // neither does — avoids an orphaned header at the bottom of a page.
    const isPageStart = cursor.y <= MARGIN_TOP + 0.01;
    const topGap = isPageStart ? 0 : HEADER_TOP_GAP;
    ensureSpace(doc, cursor, topGap + header.heightMm + HEADER_BOTTOM_GAP + firstEntry.heightMm);
    cursor.y += topGap;

    drawWrapped(doc, header.lines, SIZE_CATEGORY_HEADER, "bold", COLOR_BRAND, cursor);
    cursor.y += HEADER_BOTTOM_GAP;

    drawPhraseEntry(doc, firstEntry, cursor);

    for (let i = 1; i < catPhrases.length; i++) {
      const entry = measurePhraseEntry(doc, catPhrases[i], locale);
      ensureSpace(doc, cursor, entry.heightMm);
      drawPhraseEntry(doc, entry, cursor);
    }
  }
}

function drawCtaPage(doc: jsPDF, locale: Locale): void {
  doc.addPage();
  const s = doctorStrings[locale];
  const cursor: Cursor = { y: PAGE_HEIGHT / 2 - 30 };

  const pitch = measureWrapped(doc, s.pdfDoc.ctaPitch, 15, "bold");
  drawWrapped(doc, pitch.lines, 15, "bold", COLOR_TEXT, cursor, "center");

  cursor.y += 14;

  // The URL is pure ASCII, so jsPDF's built-in Courier (no Cyrillic support,
  // but that's irrelevant here) gives it a real monospace look without
  // needing a second embedded font. It's long enough to need to wrap over
  // 2 lines at a legible size — a single line would need an unreadably
  // tiny font, which defeats the point of printing it for someone to type.
  doc.setFont("courier", "normal");
  doc.setFontSize(8);
  doc.setTextColor(...COLOR_BRAND);
  const urlLines = doc.splitTextToSize(PLAY_STORE_URLS[locale], CONTENT_WIDTH) as string[];
  const urlLineHeight = lineHeightMm(8);
  for (const line of urlLines) {
    cursor.y += urlLineHeight;
    doc.text(line, PAGE_WIDTH / 2, cursor.y, { align: "center" });
  }
}

export async function generatePdf(locale: Locale): Promise<void> {
  const doc = new jsPDF({ unit: "mm", format: "a4", compress: true });
  registerFonts(doc);

  drawCoverPage(doc, locale);

  doc.addPage();
  const cursor: Cursor = { y: MARGIN_TOP };
  drawPhrasePages(doc, cursor, locale);

  drawCtaPage(doc, locale);

  await doc.save(doctorStrings[locale].pdfDoc.filename, { returnPromise: true });
}
