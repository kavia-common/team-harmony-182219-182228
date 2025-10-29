"use client";

import React, { useMemo, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Container from "@/components/Container";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import QuizCard from "@/components/quiz/QuizCard";
import QuizProgress from "@/components/quiz/QuizProgress";
import { getMockQuestions } from "@/lib/mock/questions";
import { useAppDispatch, useAppState } from "@/state/store";
import { selectQuizAnswers } from "@/state/selectors";
import { scorePersona } from "@/lib/utils/score";

/**
 * PUBLIC_INTERFACE
 * QuizPage renders a 5-question step-by-step quiz. It persists answers in the global store,
 * supports back/next navigation, shows progress, and on completion computes persona via score utility
 * and navigates to /recommendations.
 */
export default function QuizPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const state = useAppState();
  // const team = selectOnboarding(state);
  const storedAnswers = selectQuizAnswers(state); // Record<questionId, choiceId>

  // Ensure we have questions; fallback to empty array
  const quizQuestions = useMemo(() => getMockQuestions(), []);
  const total = quizQuestions.length;

  // Step index for multi-step flow
  const [step, setStep] = useState<number>(0);

  // Guard: if no questions exist, redirect to home
  useEffect(() => {
    if (!quizQuestions || quizQuestions.length === 0) {
      router.push("/");
    }
  }, [quizQuestions, router]);

  // Restore step to first unanswered question if answers exist
  useEffect(() => {
    if (quizQuestions.length) {
      const firstUnanswered = quizQuestions.findIndex((q) => !storedAnswers[q.id]);
      if (firstUnanswered >= 0) {
        setStep(firstUnanswered);
      } else if (Object.keys(storedAnswers).length >= quizQuestions.length) {
        // All answered, position at last question
        setStep(quizQuestions.length - 1);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quizQuestions.length, Object.keys(storedAnswers).length]);

  const currentQuestion = quizQuestions[step];

  const handleSelect = (choiceId: string) => {
    // Persist current answer to global state
    dispatch({
      type: "quiz/setAnswer",
      payload: { questionId: currentQuestion.id, choiceId },
    });
  };

  const handleNext = () => {
    const isLast = step >= total - 1;
    if (isLast) {
      // Compute persona and navigate to recommendations
      try {
        const personaRes = scorePersona(storedAnswers, quizQuestions);
        dispatch({
          type: "result/setPersona",
          payload: { persona: personaRes.persona, confidence: personaRes.confidence },
        });
      } catch {
        // Ignore scoring errors and continue
      }
      router.push("/recommendations");
      return;
    }
    setStep((s) => Math.min(s + 1, total - 1));
  };

  const handleBack = () => {
    setStep((s) => Math.max(s - 1, 0));
  };

  const selectedChoiceId = storedAnswers[currentQuestion?.id ?? ""] ?? null;
  const canProceed = Boolean(selectedChoiceId);

  return (
    <Container>
      <div className="max-w-2xl mx-auto">
        <Card className="rounded-2xl shadow-lg">
          <div className="space-y-4 p-6 border-b">
            <h1 className="text-2xl font-semibold text-gray-900">Team Personality Quiz</h1>
            <p className="text-sm text-gray-600">
              Answer a few quick questions to personalize your team-building recommendations.
            </p>
            <QuizProgress current={step + 1} total={total} />
          </div>
          <div className="p-6">
            {currentQuestion ? (
              <QuizCard
                index={step}
                question={currentQuestion.prompt}
                options={currentQuestion.choices.map((c) => ({ label: c.label, value: c.id }))}
                value={selectedChoiceId}
                onChange={(v) => handleSelect(String(v))}
              />
            ) : (
              <div className="text-center text-gray-600">Loading quiz…</div>
            )}
          </div>
          <div className="flex items-center justify-between p-6 pt-0">
            <Button variant="ghost" onClick={handleBack} disabled={step === 0}>
              Back
            </Button>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">
                {step + 1} of {total}
              </span>
              <Button onClick={handleNext} disabled={!canProceed}>
                {step === total - 1 ? "Finish" : "Next"}
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </Container>
  );
}
