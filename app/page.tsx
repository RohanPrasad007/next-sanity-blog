import Image from "next/image";
import Header from "@/components/Header";
import Banner from "@/components/Banner";
import BlogSection from "@/components/BlogSection";

export default async function Home() {
  return (
    <div>
      <Header />
      <Banner />
      <BlogSection />
    </div>
  );
}
