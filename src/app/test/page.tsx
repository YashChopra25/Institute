"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Questions from "@/components/Test/Questions";
import { questions } from "@/Utils/questions";

const Test = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set<number>());

  const isStepOptional = (step: number) => {
    return step === 1;
  };

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  const GenerateReport = () => {
    const linguistic_intelligence: any[] = JSON.parse(
      localStorage.getItem("linguistic-intelligence") || "[]"
    );
    const logical_mathematical_intelligence: any[] = JSON.parse(
      localStorage.getItem("logical-mathematical-intelligence") || "[]"
    );
    const spatial_intelligence: any[] = JSON.parse(
      localStorage.getItem("spatial-intelligence") || "[]"
    );
    const bodily_kinesthetic_intelligence: any[] = JSON.parse(
      localStorage.getItem("bodily-kinesthetic-intelligence") || "[]"
    );
    const musical_intelligence: any[] = JSON.parse(
      localStorage.getItem("musical-intelligence") || "[]"
    );
    const perspective_intelligence: any[] = JSON.parse(
      localStorage.getItem("interpersonal-intelligence") || "[]"
    );
    const intrapersonal_intelligence: any[] = JSON.parse(
      localStorage.getItem("intrapersonal-intelligence") || "[]"
    );
    const naturalistic_intelligence: any[] = JSON.parse(
      localStorage.getItem("naturalistic-intelligence") || "[]"
    );
    const spiritual_intelligence: any[] = JSON.parse(
      localStorage.getItem("spiritual-intelligence") || "[]"
    );
    const existential_intelligence: any[] = JSON.parse(
      localStorage.getItem("existential-intelligence") || "[]"
    );

    const linguistic_intelligence_answer = linguistic_intelligence.reduce(
      (prev, current) => prev + parseInt(current.value),
      0
    );
    const logical_mathematical_intelligence_answer =
      logical_mathematical_intelligence.reduce(
        (prev, current) => prev + parseInt(current.value),
        0
      );
    const spatial_intelligence_answer = spatial_intelligence.reduce(
      (prev, current) => prev + parseInt(current.value),
      0
    );
    const bodily_kinesthetic_intelligence_answer =
      bodily_kinesthetic_intelligence.reduce(
        (prev, current) => prev + parseInt(current.value),
        0
      );
    const musical_intelligence_answer = musical_intelligence.reduce(
      (prev, current) => prev + parseInt(current.value),
      0
    );
    const perspective_intelligence_answer = perspective_intelligence.reduce(
      (prev, current) => prev + parseInt(current.value),
      0
    );
    const intrapersonal_intelligence_answer = intrapersonal_intelligence.reduce(
      (prev, current) => prev + parseInt(current.value),
      0
    );
    const naturalistic_intelligence_answer = naturalistic_intelligence.reduce(
      (prev, current) => prev + parseInt(current.value),
      0
    );
    const TotalScore =
      linguistic_intelligence_answer +
      logical_mathematical_intelligence_answer +
      spatial_intelligence_answer +
      bodily_kinesthetic_intelligence_answer +
      musical_intelligence_answer +
      perspective_intelligence_answer +
      intrapersonal_intelligence_answer +
      naturalistic_intelligence_answer;
    alert(`Your total score is ${TotalScore}`);
    alert(`Yourlinguistic_intelligence_answer is : ${linguistic_intelligence_answer},
      Yourlogical_mathematical_intelligence_answer is : ${logical_mathematical_intelligence_answer},
      Youspatial_intelligence_answer is : ${spatial_intelligence_answer},
      Yourbodily_kinesthetic_intelligence_answer is : ${bodily_kinesthetic_intelligence_answer},
      Yourmusical_intelligence_answer is : ${musical_intelligence_answer},
      Yourperspective_intelligence_answer is : ${perspective_intelligence_answer},
      Yourintrapersonal_intelligence_answer is : ${intrapersonal_intelligence_answer},
      Yournaturalistic_intelligence_answer is : ${naturalistic_intelligence_answer}
      YourTotalScore is : ${TotalScore}`);
    console.log(
      linguistic_intelligence,
      logical_mathematical_intelligence,
      spatial_intelligence,
      bodily_kinesthetic_intelligence,
      musical_intelligence,
      perspective_intelligence,
      intrapersonal_intelligence,
      naturalistic_intelligence,
      spiritual_intelligence,
      existential_intelligence
    );
    localStorage.clear();
  };
  return (
    <Box className="min-h-screen  min-w-[1200px] flex items-center justify-center mt-10">
      <Box className="w-full py-10 px-8 flex flex-col justify-center items-center min-h-screen mt-10 max-w-screen-xl min-w-[1200px]">
        <Stepper activeStep={activeStep} className="w-full">
          {questions?.map((label, index) => {
            const stepProps: { completed?: boolean } = {};
            const labelProps: {
              optional?: React.ReactNode;
            } = {};

            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }
            return (
              <Step key={label.name} {...stepProps}>
                <StepLabel {...labelProps}>{label.name}</StepLabel>
              </Step>
            );
          })}
        </Stepper>

        {activeStep === questions.length ? (
          <div className="min-h-[70vh]">
            <Typography sx={{ mt: 2, mb: 1 }}>
              All attempts all the questions - you&apos;re finished
            </Typography>
            <Button
              color="inherit"
              sx={{ mr: 1 }}
              variant="contained"
              onClick={GenerateReport}
            >
              Click here to generate Report
            </Button>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </div>
        ) : (
          <React.Fragment>
            <Questions
              descriptive={questions[activeStep]}
              className="mt-2 mb-1"
            />
            <Box className="w-1/2 flex pt-3">
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: "1 1 auto" }} />
              {isStepOptional(activeStep) && (
                <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                  Skip
                </Button>
              )}
              <Button onClick={handleNext}>
                {activeStep === questions.length - 1 ? "Finish" : "Next"}
              </Button>
            </Box>
          </React.Fragment>
        )}
      </Box>
    </Box>
  );
};

export default Test;
