import {
  FaBirthdayCake,
  FaCalculator,
  FaCalendarAlt,
  FaChartBar,
  FaCoins,
  FaExchangeAlt,
  FaFlask,
  FaHeartbeat,
  FaInfinity,
  FaLandmark,
  FaPercentage,
  FaRulerCombined,
  FaUtensils,
} from 'react-icons/fa'

import BasicCalculator from '../calculators/basic/BasicCalculator'
import ScientificCalculator from '../calculators/scientific/ScientificCalculator'
import BmiCalculator from '../calculators/health/BmiCalculator'
import AgeCalculator from '../calculators/datetime/AgeCalculator'
import UnitConverter from '../calculators/converters/UnitConverter'
import PercentageCalculator from '../calculators/financial/PercentageCalculator'
import TipCalculator from '../calculators/financial/TipCalculator'
import EmiCalculator from '../calculators/financial/EmiCalculator'
import AverageCalculator from '../calculators/math/AverageCalculator'

/** Accent color and icon per category (aqua / pink / green palette). */
export const CATEGORY_META = {
  Basic: { accent: 'accent-aqua', icon: FaCalculator },
  Health: { accent: 'accent-pink', icon: FaHeartbeat },
  'Date & Time': { accent: 'accent-green', icon: FaCalendarAlt },
  Converters: { accent: 'accent-aqua', icon: FaExchangeAlt },
  Financial: { accent: 'accent-pink', icon: FaCoins },
  Math: { accent: 'accent-green', icon: FaInfinity },
}

/**
 * Central registry of every calculator in the app.
 *
 * To add a new calculator:
 *   1. Create a component in `src/calculators/<category>/`
 *   2. Import it above and add an entry here
 *   3. It automatically appears on the home page and gets a
 *      route at `/calculator/<id>`
 */
export const CALCULATORS = [
  {
    id: 'basic',
    name: 'Basic Calculator',
    category: 'Basic',
    icon: FaCalculator,
    description: 'Addition, subtraction, multiplication, division and more.',
    component: BasicCalculator,
  },
  {
    id: 'scientific',
    name: 'Scientific Calculator',
    category: 'Basic',
    icon: FaFlask,
    description: 'Trigonometry, logarithms, powers, factorials and constants.',
    component: ScientificCalculator,
  },
  {
    id: 'bmi',
    name: 'BMI Calculator',
    category: 'Health',
    icon: FaHeartbeat,
    description: 'Body Mass Index from weight and height, with category.',
    component: BmiCalculator,
  },
  {
    id: 'age',
    name: 'Age Calculator',
    category: 'Date & Time',
    icon: FaBirthdayCake,
    description: 'Your exact age in years, months and days.',
    component: AgeCalculator,
  },
  {
    id: 'unit-converter',
    name: 'Unit Converter',
    category: 'Converters',
    icon: FaRulerCombined,
    description: 'Convert length, weight and temperature units.',
    component: UnitConverter,
  },
  {
    id: 'percentage',
    name: 'Percentage Calculator',
    category: 'Financial',
    icon: FaPercentage,
    description: 'Percentages, ratios and percentage change.',
    component: PercentageCalculator,
  },
  {
    id: 'tip',
    name: 'Tip Calculator',
    category: 'Financial',
    icon: FaUtensils,
    description: 'Split a bill with a tip, per person.',
    component: TipCalculator,
  },
  {
    id: 'emi',
    name: 'EMI Calculator',
    category: 'Financial',
    icon: FaLandmark,
    description: 'Monthly loan payments, total payment and interest.',
    component: EmiCalculator,
  },
  {
    id: 'average',
    name: 'Average & Stats',
    category: 'Math',
    icon: FaChartBar,
    description: 'Sum, average, median, min and max of a number list.',
    component: AverageCalculator,
  },
]

/** Unique categories in first-appearance order. */
export const CATEGORIES = [
  ...new Set(CALCULATORS.map((calculator) => calculator.category)),
]
