import { getPage, getPages } from '@/app/source';
import type { Metadata } from 'next';
import { DocsPage, DocsBody } from 'fumadocs-ui/page';
import { notFound } from 'next/navigation';
import { replaceAppTokens } from '@/src/utils/replace-app-tokens';

export default async function Page({
  params
}: {
  params: { slug?: string[] };
}) {
  const page = getPage(params.slug);

  if (page == null) {
    notFound();
  }

  const MDX = page.data.exports.default;
  const title = replaceAppTokens(page.data.title);
  const description = page.data.description
    ? replaceAppTokens(page.data.description)
    : page.data.description;

  return (
    <DocsPage toc={page.data.exports.toc} full={page.data.full}>
      <DocsBody>
        <h1>{title}</h1>
        <MDX />
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return getPages().map((page) => ({
    slug: page.slugs
  }));
}

export function generateMetadata({ params }: { params: { slug?: string[] } }) {
  const page = getPage(params.slug);

  if (page == null) notFound();

  const title = replaceAppTokens(page.data.title);
  const description = page.data.description
    ? replaceAppTokens(page.data.description)
    : page.data.description;

  return {
    title,
    description
  } satisfies Metadata;
}
