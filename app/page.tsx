import Image from "next/image";
import Link from "next/link";
import SearchAddress from "./components/SearchAddress";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <div className="pt-5em pb-10">
          <div>
            <h1 className="text-5xl">Have You Been Rekt?</h1>
          </div>

          <div>
            <Link href="SubmitContract">Submit Malicious Address</Link>
          </div>
          <div>
            <Link href="About">About</Link>
          </div>

          <div className="pt-5em">
            <SearchAddress></SearchAddress>
          </div>
        </div>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none"></div>
      </div>
    </main>
  );
}
