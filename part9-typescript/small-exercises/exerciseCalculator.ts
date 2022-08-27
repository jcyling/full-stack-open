interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const parseArguments = (args: string[]) => {
  console.log("here", args[5])
  if (args.length < 6) throw new Error("Not enough arguments");
  if (args.length > 6) throw new Error("Too arguments");

  let arr = args[4].map(Number)
  let target = Number(args[5])
  return {
    arr: arr,
    target: target
  }
};

const calculateExercises = (arr: number[], target: number): Result => {
  let trainingDays = arr.filter(value => value > 0).length;
  let reached = trainingDays > target ? true : false;
  let average = arr.reduce((prev, curr) => prev + curr) / arr.length;
  let rating = trainingDays / target;
  let desc;

  if (rating < 1) {
    desc = "Below grade"
  }
  else if (1 < rating && rating < 2) {
    desc = "Average grade"
  }
  else if (2 < rating && rating < 3) {
    desc = "Above grade"
  }

  let result: Result = {
    periodLength: arr.length,
    trainingDays: trainingDays,
    average: average,
    target: target,
    success: reached,
    rating: rating,
    ratingDescription: desc
  } 
  return result
};

// console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))

try {
  const { arr, target } = parseArguments(process.argv);
  // calculateExercises(arr, target);

} catch (error) {
  console.log(error)
}