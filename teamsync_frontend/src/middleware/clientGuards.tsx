"use client";

import React from "react";
import Link from "next/link";
import { useAppSelector } from "../state/store";
import { selectHasOnboarded, selectHasCompletedQuiz } from "../state/selectors";

/**
 * PUBLIC_INTERFACE
 * GuardStatus represents which prerequisites are required for a page.
 * - requireOnboard: user must complete onboarding
 * - requireQuiz: user must complete the quiz
 */
export type GuardStatus = {
  requireOnboard?: boolean;
  requireQuiz?: boolean;
};

/**
 * InlineAlert props: show a contextual inline alert within the page content.
 * This is used by pages that require onboarding and/or quiz completion.
 */
type InlineAlertProps = {
  title: string;
  description?: string;
  actions?: React.ReactNode;
};

/**
 * A minimalist inline alert with accessible semantics, subtle transitions,
 * and focus-visible handling.
 */
function InlineAlert({ title, description, actions }: InlineAlertProps) {
  return (
    <section
      role="status"
      aria-live="polite"
      className="mb-6 rounded-xl border border-blue-200 bg-gradient-to-br from-blue-50/50 to-white p-4 md:p-5 shadow-sm transition-transform duration-200 ease-out hover:translate-y-[1px]"
    >
      <h2 className="text-sm font-semibold text-blue-800 leading-6">
        {title}
      </h2>
      {description ? (
        <p className="mt-1.5 text-sm text-blue-900/80">{description}</p>
      ) : null}
      {actions ? <div className="mt-3 flex gap-2 flex-wrap">{actions}</div> : null}
    </section>
  );
}

/**
 * PUBLIC_INTERFACE
 * useClientGuard returns an object with guardSatisfied (boolean) and a JSX element
 * guardNotice to render inline at the top of the page content when prerequisites
 * are missing.
 */
export function useClientGuard({ requireOnboard = false, requireQuiz = false }: GuardStatus) {
  const hasOnboarded = useAppSelector(selectHasOnboarded);
  const hasCompletedQuiz = useAppSelector(selectHasCompletedQuiz);

  const needsOnboard = requireOnboard && !hasOnboarded;
  const needsQuiz = requireQuiz && !hasCompletedQuiz;

  const guardSatisfied = !(needsOnboard || needsQuiz);

  let title = "";
  let description = "";
  const actions: React.ReactNode[] = [];

  if (needsOnboard && needsQuiz) {
    title = "Complete onboarding and quiz to unlock this page";
    description = "We need a few details about your team and quick preferences to personalize recommendations and insights.";
  } else if (needsOnboard) {
    title = "Complete onboarding to continue";
    description = "Tell us about your team so we can tailor your experience.";
  } else if (needsQuiz) {
    title = "Complete the quick quiz to continue";
    description = "A short 5-question quiz helps us fine-tune activity matches for your team.";
  }

  if (needsOnboard) {
    actions.push(
      <Link
        key="onboard"
        href="/onboard"
        className="inline-flex items-center rounded-lg bg-blue-600 px-3 py-1.5 text-sm font-medium text-white shadow-sm outline-none ring-2 ring-transparent transition-all duration-150 hover:bg-blue-700 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
      >
        Go to Onboarding
      </Link>
    );
  }
  if (needsQuiz) {
    actions.push(
      <Link
        key="quiz"
        href="/quiz"
        className="inline-flex items-center rounded-lg bg-amber-500 px-3 py-1.5 text-sm font-medium text-white shadow-sm outline-none ring-2 ring-transparent transition-all duration-150 hover:bg-amber-600 focus-visible:ring-amber-300 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
      >
        Take the Quiz
      </Link>
    );
  }

  const guardNotice =
    !guardSatisfied ? (
      <InlineAlert title={title} description={description} actions={actions} />
    ) : null;

  return { guardSatisfied, guardNotice };
}
