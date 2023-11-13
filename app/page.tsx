import Image from 'next/image'
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="max-w-6xl flex flex-col md:flex-row items-center md:items-start">
        <div className="flex-shrink-0 pr-10 ">
          <Image
            src="/pp.png"
            alt="RT photo"
            width={300}
            height={300}
            className="rounded-full mx-auto"
          />
          <Link href="/">
            <h2 className="px-20 font-medium text-yellow-900 pt-5 ">Download my CV</h2>
          </Link>
        </div>
        <div className="mt-4 md:mt-0 pb-5">
          <Link href="/">
            <h1 className="text-3xl font-bold pb-5">Reha Tuncer</h1>
          </Link>
          <p className="mt-2 text-md pb-5">I am a PhD Candidate at the <Link href="https://hci.uni.lu/reha-tuncer/"> <span className="font-medium text-yellow-900">University of Luxembourg. </span></Link> My research interests are in Behavioral and Experimental Economics. I currently study the role of social skills in job referrals.</p>
          <div className="mt-4">
            <h2 className="text-2xl font-semibold pt-5 pb-5">Publications</h2>
            <p className="mt-2 text-md pb-5">   <Link href="https://doi-org.proxy.bnl.lu/10.1080/0144929X.2023.2242966">
              <span className="font-medium text-yellow-900"> Running out of time(rs): effects of scarcity cues on perceived task load, perceived benevolence and user experience on e-commerce sites. </span>
            </Link> <span className="font-semibold">Behaviour and Information Technology, </span> <span> 2023 (with A. Sergeeva and colleagues) </span>
            </p>
            <h2 className="text-2xl font-semibold pt-5 pb-5">Working Papers</h2>
            <p className="mt-2 text-md pb-5"> <Link href="/RP.pdf"> <span className="font-medium text-yellow-900">From unobserved to observed preference heterogeneity: a revealed preference methodology. </span></Link> <span className="font-semibold">R&R Economica, </span> <span> (with L. Cherchye and D. Saalens)</span>
            </p>
            {/* <p className="mt-2 text-md pb-5">Autoplay (single authored)</p> */}
            <h2 className="text-2xl font-semibold pt-5 pb-5">Work in Progress</h2>
            <p> <span className="font-medium">Social skills and job referrals: A field experiment. </span> <span> (with E. Reuben and M. Munoz Herrera) </span></p>
          </div>
        </div>
      </div>

    </main>
  )
}
