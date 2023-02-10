import { Banner } from "@/components/WelcomeDashboardBanner/banner";
import { Inter } from "@next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function Home() {
  return (
    <div className={inter.className}>
      <Banner />
    </div>
  );
}
