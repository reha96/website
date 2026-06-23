"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { PaperAbstract } from "@/lib/tex-fetch";

export default function HomePage({ abstracts }: { abstracts: Record<string, PaperAbstract> }) {
  // State to track which abstracts are visible
  const [visibleAbstracts, setVisibleAbstracts] = useState<
    Record<string, boolean>
  >({});

  // Toggle abstract visibility
  const toggleAbstract = (paperId: string) => {
    setVisibleAbstracts((prev) => ({
      ...prev,
      [paperId]: !prev[paperId],
    }));
  };

  return (
    <main className="flex min-h-screen flex-col items-center">
      {/* Main content container */}
      <div className="w-full max-w-4xl px-6 py-8 md:py-12">
        {/* Academic Header — minimal */}
        <div className="mb-12 text-sm text-gray-600 dark:text-[var(--color-text-secondary)] flex flex-wrap items-center gap-x-4 gap-y-1">
          <Link
            href="https://hci.uni.lu/reha-tuncer/"
            className="font-medium hover:underline"
            style={{ color: 'var(--color-link)' }}
          >
            University of Luxembourg
          </Link>
          <span className="text-gray-400 dark:text-gray-500">·</span>
          <span className="text-gray-500 dark:text-gray-400">reha.tuncer[at]gmail.com</span>
          <span className="text-gray-400 dark:text-gray-500">·</span>
          <Link
            href="/CV_RT.pdf"
            className="font-medium hover:underline"
            style={{ color: 'var(--color-link)' }}
          >
            Academic CV
          </Link>
        </div>

        {/* Published Papers Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-medium text-gray-800 dark:text-gray-100 mb-6">
            Published Papers
          </h2>

          {/* Paper 1 - with accent border */}
          <div id="paper1" className="mb-8 p-6 border-l-4 rounded-2xl shadow-md transition-colors duration-300 hover:bg-gray-50 dark:hover:bg-charcoal-800" style={{ borderLeftColor: 'var(--color-accent)', backgroundColor: 'var(--color-blockquote-bg)' }}>
            <Link href="https://doi.org/10.1111/ecca.12524">
              <h3 className="text-lg font-medium hover:underline mb-1" style={{ color: 'var(--color-link)' }}>
                From unobserved to observed preference heterogeneity: a revealed
                preference methodology
              </h3>
            </Link>
            <p className="text-gray-800 dark:text-gray-200 mb-2">
              Cherchye L, Saalens D, Tuncer R
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-3">
              2024. <span className="italic">Economica</span>, Vol. 91, Issue
              363, pp. 996-1022
            </p>

            <div className="flex flex-wrap gap-2 mb-3">
              <span className="px-2 py-1 text-sm rounded-md bg-glaucous-50 dark:bg-charcoal-700 text-glaucous-700 dark:text-coral-400 transition-colors">
                Revealed Preference
              </span>
              <span className="px-2 py-1 text-sm rounded-md bg-glaucous-50 dark:bg-charcoal-700 text-glaucous-700 dark:text-coral-400 transition-colors">
                Heterogeneity
              </span>
            </div>

            {/* Abstract section that shows/hides based on state */}
            {visibleAbstracts["paper1"] && (
              <div className="my-4 p-4 bg-white dark:bg-charcoal-900 rounded-xl border border-gray-200 dark:border-charcoal-600">
                <h4 className="text-sm font-semibold mb-2 dark:text-gray-200">Abstract</h4>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {abstracts["paper1"].text}
                </p>
              </div>
            )}

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => toggleAbstract("paper1")}
                className="flex items-center px-3 py-1 bg-gray-200 dark:bg-charcoal-700 text-sm text-gray-700 dark:text-gray-300 rounded-lg hover:bg-[#5F829F] hover:text-white dark:hover:bg-coral-600 dark:hover:text-white transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {visibleAbstracts["paper1"] ? "Hide Abstract" : "Abstract"}
              </button>
              <Link
                href="https://osf.io/epbdq/"
                className="flex items-center px-3 py-1 bg-gray-200 dark:bg-charcoal-700 text-sm text-gray-700 dark:text-gray-300 rounded-lg hover:bg-[#5F829F] hover:text-white dark:hover:bg-coral-600 dark:hover:text-white transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                  />
                </svg>
                Data & Code
              </Link>
              <Link
                href="/RP.pdf"
                className="flex items-center px-3 py-1 bg-gray-200 dark:bg-charcoal-700 text-sm text-gray-700 dark:text-gray-300 rounded-lg hover:bg-[#5F829F] hover:text-white dark:hover:bg-coral-600 dark:hover:text-white transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
                Preprint
              </Link>
              <Link
                href="https://github.com/reha96/python_for_cplex"
                className="flex items-center px-3 py-1 bg-gray-200 dark:bg-charcoal-700 text-sm text-gray-700 dark:text-gray-300 rounded-lg hover:bg-[#5F829F] hover:text-white dark:hover:bg-coral-600 dark:hover:text-white transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                GitHub
              </Link>
            </div>
          </div>

          {/* Paper 2 */}
          <div id="paper2" className="mb-8 p-6 border-l-4 rounded-2xl shadow-md transition-colors duration-300 hover:bg-gray-50 dark:hover:bg-charcoal-800" style={{ borderLeftColor: 'var(--color-accent)', backgroundColor: 'var(--color-blockquote-bg)' }}>
            <Link href="https://doi.org/10.1080/0144929X.2023.2242966">
              <h3 className="text-lg font-medium hover:underline mb-1" style={{ color: 'var(--color-link)' }}>
                Running out of time(rs): effects of scarcity cues on perceived
                task load, perceived benevolence and user experience on
                e-commerce sites
              </h3>
            </Link>
            <p className="text-gray-800 dark:text-gray-200 mb-2">
              Tuncer R, Sergeeva A, Bongard-Blanchy K, Distler V, Doublet S,
              Koenig V
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-3">
              2023.{" "}
              <span className="italic">
                Behaviour and Information Technology
              </span>
              , Vol. 43, Issue 11, pp. 2281–2299
            </p>

            <div className="flex flex-wrap gap-2 mb-3">
              <span className="px-2 py-1 text-sm rounded-md bg-glaucous-50 dark:bg-charcoal-700 text-glaucous-700 dark:text-coral-400 transition-colors">
                Scarcity
              </span>
              <span className="px-2 py-1 text-sm rounded-md bg-glaucous-50 dark:bg-charcoal-700 text-glaucous-700 dark:text-coral-400 transition-colors">
                User Experience
              </span>
            </div>

            {visibleAbstracts["paper2"] && (
              <div className="my-4 p-4 bg-white dark:bg-charcoal-900 rounded-xl border border-gray-200 dark:border-charcoal-600">
                <h4 className="text-sm font-semibold mb-2 dark:text-gray-200">Abstract</h4>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {abstracts["paper2"].text}
                </p>
              </div>
            )}

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => toggleAbstract("paper2")}
                className="flex items-center px-3 py-1 bg-gray-200 dark:bg-charcoal-700 text-sm text-gray-700 dark:text-gray-300 rounded-lg hover:bg-[#5F829F] hover:text-white dark:hover:bg-coral-600 dark:hover:text-white transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {visibleAbstracts["paper2"] ? "Hide Abstract" : "Abstract"}
              </button>
              <Link
                href="https://osf.io/xgdpm/"
                className="flex items-center px-3 py-1 bg-gray-200 dark:bg-charcoal-700 text-sm text-gray-700 dark:text-gray-300 rounded-lg hover:bg-[#5F829F] hover:text-white dark:hover:bg-coral-600 dark:hover:text-white transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                  />
                </svg>
                Data & Code
              </Link>
            </div>
          </div>
        </div>

        {/* Working Papers */}
        <div>
          <h2 className="text-2xl font-medium text-gray-800 dark:text-gray-100 mb-6">
            Working Papers
          </h2>

          {/* Paper 3 */}
          <div id="paper3" className="mb-8 p-6 border-l-4 rounded-2xl shadow-md transition-colors duration-300 hover:bg-gray-50 dark:hover:bg-charcoal-800" style={{ borderLeftColor: 'var(--color-accent)', backgroundColor: 'var(--color-blockquote-bg)' }}>
            <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-1">
            Does autoplay drive excessive screen time? Evidence from an online experiment
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-3">Tuncer R</p>

            <div className="flex flex-wrap gap-2 mb-3">
              <span className="px-2 py-1 text-sm rounded-md bg-glaucous-50 dark:bg-charcoal-700 text-glaucous-700 dark:text-coral-400 transition-colors">
                Intertemporal Choice
              </span>
              <span className="px-2 py-1 text-sm rounded-md bg-glaucous-50 dark:bg-charcoal-700 text-glaucous-700 dark:text-coral-400 transition-colors">
                User Experience
              </span>
            </div>

            {visibleAbstracts["paper3"] && (
              <div className="my-4 p-4 bg-white dark:bg-charcoal-900 rounded-xl border border-gray-200 dark:border-charcoal-600">
                <h4 className="text-sm font-semibold mb-2 dark:text-gray-200">Abstract</h4>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {
                    "Interface design features can `nudge' consumers to take certain actions and are often accused of promoting addictive online behavior. A prevalent design feature across popular social media and streaming platforms is the autoplay default. In this study, I present an incentivized online experiment investigating whether the autoplay feature can cause an increase in undesired video consumption, and elicit the willingness to pay for commitment against autoplay. In a two-day study, I recruited a total of 236 participants to allocate 20 minutes between two tasks: Transcribing meaningless characters and watching funny animal videos. Time allocation decisions were planned a day before and realized on the next day. I randomly assigned participants to either autoplay or click-to-play media controls while keeping the video content constant. I find that the autoplay feature, in isolation, does not override participants' planned time allocation for media consumption. In addition, participants exhibit a positive willingness-to-pay for autoplay (6.72 pence/hour), perceiving it as a convenience feature rather than a self-control problem. Experimenter demand effects and lack of content appeal result in participants allocating more time to the transcription task than planned, confounding the effect of the autoplay treatment. These results suggest that design features promoting potentially addictive behavior like autoplay are better studied in field settings where content consumption occurs naturally alongside algorithmic personalization."
                  }
                </p>
              </div>
            )}

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => toggleAbstract("paper3")}
                className="flex items-center px-3 py-1 bg-gray-200 dark:bg-charcoal-700 text-sm text-gray-700 dark:text-gray-300 rounded-lg hover:bg-[#5F829F] hover:text-white dark:hover:bg-coral-600 dark:hover:text-white transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {visibleAbstracts["paper3"] ? "Hide Abstract" : "Abstract"}
              </button>
              <Link
                href="https://github.com/reha96/autoplay-clean"
                className="flex items-center px-3 py-1 bg-gray-200 dark:bg-charcoal-700 text-sm text-gray-700 dark:text-gray-300 rounded-lg hover:bg-[#5F829F] hover:text-white dark:hover:bg-coral-600 dark:hover:text-white transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                GitHub
              </Link>
              <Link
                href="https://github.com/reha96/autoplay-clean/blob/main/writing/main.pdf"
                className="flex items-center px-3 py-1 bg-gray-200 dark:bg-charcoal-700 text-sm text-gray-700 dark:text-gray-300 rounded-lg hover:bg-[#5F829F] hover:text-white dark:hover:bg-coral-600 dark:hover:text-white transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
                Draft
              </Link>
            </div>
          </div>

          {/* Paper 4 */}
          <div id="paper4" className="mb-8 p-6 border-l-4 rounded-2xl shadow-md transition-colors duration-300 hover:bg-gray-50 dark:hover:bg-charcoal-800" style={{ borderLeftColor: 'var(--color-accent)', backgroundColor: 'var(--color-blockquote-bg)' }}>
            <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-1">
            Peer skill identification and social class: Evidence from a referral experiment
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-3">Díaz J, Munoz M, Reuben E, Tuncer R</p>

            <div className="flex flex-wrap gap-2 mb-3">
              <span className="px-2 py-1 text-sm rounded-md bg-glaucous-50 dark:bg-charcoal-700 text-glaucous-700 dark:text-coral-400 transition-colors">
                Human Capital
              </span>
              <span className="px-2 py-1 text-sm rounded-md bg-glaucous-50 dark:bg-charcoal-700 text-glaucous-700 dark:text-coral-400 transition-colors">
                Contact Theory
              </span>
            </div>

            {/* Abstract section that shows/hides based on state */}
            {visibleAbstracts["paper4"] && (
              <div className="my-4 p-4 bg-white dark:bg-charcoal-900 rounded-xl border border-gray-200 dark:border-charcoal-600">
                <h4 className="text-sm font-semibold mb-2 dark:text-gray-200">Abstract</h4>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {
                    "Cognitive and social skills are both increasingly valued in the labor market, but social skills are difficult to observe. In the absence of observable signals, peer assessments can be valuable screening tools. We study how well individuals identify productive peers across cognitive and social skills in a lab-in-the-field experiment with 849 university students. After students interact for an entire term, we collect incentivized skill measures from all classmates. We then ask for referrals of the highest scoring peers in each skill,  incentivizing referrals based on the nominee's score. To examine potential social class barriers in referrals, we randomly assign half of the participants to receive additional incentives for identifying high-skilled peers from low-socioeconomic status. We find that peers can successfully identify cognitive skills but not social skills of their classmates. There is only evidence of a bias against low-SES peers in unique cognitive skill referrals, and the treatment incentives helps mitigate it. Our findings suggest that the accuracy of peer assessments varies substantially across skill dimensions and appropriate changes in the incentivization structure can make peer assessments robust to existing biases."
                  }
                </p>
              </div>
            )}

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => toggleAbstract("paper4")}
                className="flex items-center px-3 py-1 bg-gray-200 dark:bg-charcoal-700 text-sm text-gray-700 dark:text-gray-300 rounded-lg hover:bg-[#5F829F] hover:text-white dark:hover:bg-coral-600 dark:hover:text-white transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {visibleAbstracts["paper4"] ? "Hide Abstract" : "Abstract"}
              </button>
              <Link
                href="https://github.com/reha96/skills-clean"
                className="flex items-center px-3 py-1 bg-gray-200 dark:bg-charcoal-700 text-sm text-gray-700 dark:text-gray-300 rounded-lg hover:bg-[#5F829F] hover:text-white dark:hover:bg-coral-600 dark:hover:text-white transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                GitHub
              </Link>
              <Link
                href="https://github.com/reha96/skills-clean/blob/main/writing/current/manuscript.pdf"
                className="flex items-center px-3 py-1 bg-gray-200 dark:bg-charcoal-700 text-sm text-gray-700 dark:text-gray-300 rounded-lg hover:bg-[#5F829F] hover:text-white dark:hover:bg-coral-600 dark:hover:text-white transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
                Draft
              </Link>
            </div>
          </div>

          {/* Paper 5 */}
          <div id="paper5" className="mb-8 p-6 border-l-4 rounded-2xl shadow-md transition-colors duration-300 hover:bg-gray-50 dark:hover:bg-charcoal-800" style={{ borderLeftColor: 'var(--color-accent)', backgroundColor: 'var(--color-blockquote-bg)' }}>
            <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-1">
              When proximity isn&apos;t enough: Network segregation and class bias in referrals </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-3">Munoz M, Reuben E, Tuncer R</p>

            <div className="flex flex-wrap gap-2 mb-3">
              <span className="px-2 py-1 text-sm rounded-md bg-glaucous-50 dark:bg-charcoal-700 text-glaucous-700 dark:text-coral-400 transition-colors">
                Social Capital
              </span>
              <span className="px-2 py-1 text-sm rounded-md bg-glaucous-50 dark:bg-charcoal-700 text-glaucous-700 dark:text-coral-400 transition-colors">
                Inequality
              </span>
            </div>

            {/* Abstract section that shows/hides based on state */}
            {visibleAbstracts["paper5"] && (
              <div className="my-4 p-4 bg-white dark:bg-charcoal-900 rounded-xl border border-gray-200 dark:border-charcoal-600">
                <h4 className="text-sm font-semibold mb-2 dark:text-gray-200">Abstract</h4>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {
                    "The share of high-socioeconomic status (SES) connections in one's network is a strong correlate of labor market income. While universities provide ample opportunities for cross-SES contact, it remains unclear whether this exposure translates into meaningful connections. We investigate this question by exploring SES biases in referral selection. We conduct a lab-in-the-field experiment with 734 Colombian university students who make incentivized referrals from their enrollment networks. Randomizing participants between performance-only incentives and performance plus a fixed bonus for referral recipients, we find that referrals go to high-performing peers with whom they take many courses together, regardless of condition. While low-SES referrers exhibit strong in-group preferences, middle- and high-SES referrers show no biases toward their own and other groups. Network segregation, driven by cost-based program selection, limits cross-SES referral opportunities even without an explicit SES bias. Our results imply that institutional policies promoting cross-SES contact are key for reducing SES-based inequalities."
                  }
                </p>
              </div>
            )}

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => toggleAbstract("paper5")}
                className="flex items-center px-3 py-1 bg-gray-200 dark:bg-charcoal-700 text-sm text-gray-700 dark:text-gray-300 rounded-lg hover:bg-[#5F829F] hover:text-white dark:hover:bg-coral-600 dark:hover:text-white transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {visibleAbstracts["paper5"] ? "Hide Abstract" : "Abstract"}
              </button>
              <Link
                href="https://github.com/reha96/icfes-referrals-clean"
                className="flex items-center px-3 py-1 bg-gray-200 dark:bg-charcoal-700 text-sm text-gray-700 dark:text-gray-300 rounded-lg hover:bg-[#5F829F] hover:text-white dark:hover:bg-coral-600 dark:hover:text-white transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                GitHub
              </Link>
              <Link
                href="https://github.com/reha96/icfes-referrals-clean/blob/main/writing/manuscript.pdf"
                className="flex items-center px-3 py-1 bg-gray-200 dark:bg-charcoal-700 text-sm text-gray-700 dark:text-gray-300 rounded-lg hover:bg-[#5F829F] hover:text-white dark:hover:bg-coral-600 dark:hover:text-white transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
                Draft
              </Link>
            </div>
          </div>

         
         
        </div>
      </div>
    </main>
  );
}
