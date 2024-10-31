import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="max-w-6xl flex flex-col md:flex-row items-center md:items-start">
        <div className="flex-shrink-0 pr-10 ">
          <div className="flex flex-col items-center">
            <Image
              src="/pp.png"
              alt="RT photo"
              width={300}
              height={300}
              className="rounded-full mx-auto"
            />
            <Link href="/">
              <h2 className="px-20 font-medium text-orange-800 pt-5 ">
                {" "}
                <Link href="/CV_RT.pdf">See my CV </Link>
              </h2>
            </Link>
          </div>
        </div>
        <div className="mt-4 md:mt-0 pb-5">
          <Link href="/">
            <h1 className="text-3xl font-bold pb-5">Reha Tuncer</h1>
          </Link>
          <p className="mt-2 text-md pb-5">
            I am a PhD Candidate at the{" "}
            <Link href="https://hci.uni.lu/reha-tuncer/">
              {" "}
              <span className="font-medium text-orange-800">
                University of Luxembourg.{" "}
              </span>
            </Link>{" "}
            My research interests are in Behavioral and Experimental Economics.
            I currently study inequality with regards to social class in
            referrals.
          </p>
          <div className="mt-4">
            <h2 className="text-2xl font-semibold pt-5 pb-5">Publications</h2>
            <p className="mt-2 text-md pb-5">
              {" "}
              <Link href="https://doi.org/10.1111/ecca.12524">
                <span className="font-medium text-orange-800">
                  {" "}
                  From unobserved to observed preference heterogeneity: a
                  revealed preference methodology.{" "}
                </span>
              </Link>{" "}
              <span className="font-semibold">Economica, </span>{" "}
              <span> 2024 (with L. Cherchye and D. Saalens) </span>
              <Link
                href="https://github.com/reha96/python_for_cplex"
                className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 hover:bg-gray-300"
              >
                GitHub
              </Link>
              <Link
                href="https://osf.io/epbdq/"
                className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 hover:bg-gray-300"
              >
                Data & Code
              </Link>
              <Link
                href="/RP.pdf"
                className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 hover:bg-gray-300"
              >
                Preprint
              </Link>
            </p>
            <p className="mt-2 text-md pb-5">
              {" "}
              <Link href="https://doi.org/10.1080/0144929X.2023.2242966">
                <span className="font-medium text-orange-800">
                  {" "}
                  Running out of time(rs): effects of scarcity cues on perceived
                  task load, perceived benevolence and user experience on
                  e-commerce sites.{" "}
                </span>
              </Link>{" "}
              <span className="font-semibold">
                Behaviour and Information Technology,{" "}
              </span>{" "}
              <span>
                {" "}
                2023 (with A. Sergeeva, K. Bongard-Blanchy, V. Distler, S.
                Doublet, and V. Koenig){" "}
              </span>
            </p>
            {/* <h2 className="text-2xl font-semibold pt-5 pb-5">Working Papers</h2> */}

            {/* <p className="mt-2 text-md pb-5">Autoplay (single authored)</p> */}
            <h2 className="text-2xl font-semibold pt-5 pb-5">
              Work in Progress
            </h2>
            <p>
              {" "}
              <span className="font-medium">
                Skills, inequality, and referrals: A field experiment.{" "}
              </span>{" "}
              <span> (with J. Díaz, M. Munoz, and E. Reuben) </span>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
