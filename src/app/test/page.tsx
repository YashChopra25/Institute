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
    const linguistic_intelligence = JSON.parse(
      localStorage.getItem("linguistic-intelligence") || "{}"
    );
    const logical_mathematical_intelligence = JSON.parse(
      localStorage.getItem("logical-mathematical-intelligence") || "{}"
    );
    const spatial_intelligence = JSON.parse(
      localStorage.getItem("spatial-intelligence") || "{}"
    );
    const bodily_kinesthetic_intelligence = JSON.parse(
      localStorage.getItem("bodily-kinesthetic-intelligence") || "{}"
    );
    const musical_intelligence = JSON.parse(
      localStorage.getItem("musical-intelligence") || "{}"
    );
    const perspective_intelligence = JSON.parse(
      localStorage.getItem("interpersonal-intelligence") || "{}"
    );
    const intrapersonal_intelligence = JSON.parse(
      localStorage.getItem("intrapersonal-intelligence") || "{}"
    );
    const naturalistic_intelligence = JSON.parse(
      localStorage.getItem("naturalistic-intelligence") || "{}"
    );
    const spiritual_intelligence = JSON.parse(
      localStorage.getItem("spiritual-intelligence") || "{}"
    );
    const existential_intelligence = JSON.parse(
      localStorage.getItem("existential-intelligence") || "{}"
    );

    const TotalScore =
      (linguistic_intelligence?.count || 0) +
      (logical_mathematical_intelligence?.count || 0) +
      (spatial_intelligence?.count || 0) +
      (bodily_kinesthetic_intelligence?.count || 0) +
      (musical_intelligence?.count || 0) +
      (perspective_intelligence?.count || 0) +
      (intrapersonal_intelligence?.count || 0) +
      (naturalistic_intelligence?.count || 0) +
      (spiritual_intelligence?.count || 0) +
      (existential_intelligence?.count || 0);

    alert(`Your total score is ${TotalScore}`);
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
    <Box className="w-full py-10 px-8 flex flex-col items-center min-h-screen">
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
        <div className="min-h-full mt-10">
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
  );
};

export default Test;
