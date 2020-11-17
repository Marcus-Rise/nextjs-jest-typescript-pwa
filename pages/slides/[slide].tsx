import type { GetStaticPaths, GetStaticProps } from "next";
import path from "path";
import fs from "fs";
import React from "react";
import dynamic from "next/dynamic";
import Head from "next/head";
import { siteConfig } from "../../src/site.config";

interface IProps {
  totalSlidePages: number;
  currentSlide: string;
  filename: string;
}

const SlideshowPage: React.FC<IProps> = (props) => {
  const MDXContent = dynamic(() => import(`../../slides/${props.currentSlide}.mdx`));

  return (
    <>
      <Head>
        <title>
          {siteConfig.author.name} - {siteConfig.title}
        </title>
      </Head>
      <MDXContent />
    </>
  );
};

const getStaticProps: GetStaticProps<IProps> = async ({ params }) => {
  const filename = path.join("slides", `${params?.slide}.mdx`);
  const slidesDirectory = path.join(process.cwd(), "slides");
  const mdxFiles = fs.readdirSync(slidesDirectory);
  const totalSlidePages = mdxFiles.length;

  return {
    props: {
      totalSlidePages,
      currentSlide: String(params?.slide),
      filename,
    },
  };
};

const getStaticPaths: GetStaticPaths = async () => {
  const postsDirectory = path.join(process.cwd(), "slides");
  const mdxFiles = fs.readdirSync(postsDirectory);
  // Loop through all post files and create array of slugs (to create links)
  const paths = mdxFiles.map((filename) => ({
    params: {
      slide: filename.replace(".mdx", ""),
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

export { getStaticPaths, getStaticProps };
export default SlideshowPage;
