import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="w-full min-h-screen px-5 mt-20 md:px-10">
      <div className="relative w-full max-w-screen-lg py-10 mx-auto">
        <p className="text-3xl font-bold">
          Assessment by{" "}
          <strong className="text-blue">Paravidya Institute</strong>
        </p>
        <div className="flex flex-col w-full gap-4 mt-6">
          <p>
            This form can help you determine which intelligences are strongest
            for you. If you are a teacher or tutor, you can also use it to find
            out which intelligences your learner uses most often. Many thanks to
            Dr. Terry Armstrong for graciously allowing us to use his
            questionnaire.
          </p>
          <p>
            <strong>Instructions:</strong> Read each statement carefully. Choose
            one of the five buttons for each statement indicating how well that
            statement describes you.
          </p>
          <div className="flex flex-col w-full">
            <p>1 = Statement does not describe you at all</p>
            <p>2 = Statement describes you very little</p>
            <p>3 = Statement describes you somewhat or moderately well</p>
            <p>4 = Statement describes you somewhat or moderately well</p>
            <p>5 = Statement describes you very well</p>
          </div>
        </div>
        <Link href={"/test"}>
          <button className="flex items-center justify-center px-5 py-2 mt-10 text-base font-medium text-white bg-white border-2 rounded-full border-blue w-fit ">
            <span className="text-blue">Start Assessment</span>
          </button>
        </Link>
        <div className="absolute top-10 right-20 -z-10">
          <Image
            src="/bg.svg"
            alt="Illustration"
            width={500}
            height={500}
            className="object-cover opacity-30"
          />
        </div>
      </div>
    </main>
  );
}
