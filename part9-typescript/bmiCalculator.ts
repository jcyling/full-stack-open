const calculateBmi = (height: number, weight: number): string => {
  let meter: number = height / 100
  let bmi: number = +(weight / (meter * meter)).toFixed(2)
  console.log(bmi)

  switch (true) {
    case (bmi < 16.0):
      return "Underweight(Severe thinness)"
    case (16.0 <= bmi && bmi < 17):
      return "Underweight(Moderate thinness)"
    case (17.0 <= bmi && bmi < 18.4):
      return "Underweight(Mild thinness)"
    case (18.4 <= bmi && bmi < 24.9):
      return "Normal (healthy weight)"
    case (25 <= bmi && bmi < 29.9):
      return "Overweight (Pre-obese)"
    case (30 <= bmi && bmi < 34.9):
      return "Obese (Class I)"
    case (35 <= bmi && bmi < 39.9):
      return "Obese (Class II)"
    case (bmi > 40):
      return "Obese (Class III)"
    default:
      console.log("Sorry")
  }

};

console.log(calculateBmi(180, 74))