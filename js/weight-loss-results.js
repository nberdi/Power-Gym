import { loseWorkouts, loseTips } from "./data.js";
document.addEventListener("DOMContentLoaded", function() {
  // Get query parameters from URL
  const urlParams = new URLSearchParams(window.location.search);
  const age = urlParams.get('q1');
  const weightLossGoal = urlParams.get('q2');
  const fitnessLevel = urlParams.get('q3');
  const workoutFrequency = urlParams.get('q4');
  const dietaryPreference = urlParams.get('q5');

  // Create the results container
  const resultsContainer = document.getElementById('resultsContainer');
  
  // Clear the loading message
  resultsContainer.innerHTML = '';
  
  // Create and append the header
  const header = document.createElement('h1');
  header.textContent = 'Your Personalized Weight Loss Plan';
  header.className = 'results-header';
  resultsContainer.appendChild(header);

  // Create and append the user info section
  const userInfoSection = document.createElement('div');
  userInfoSection.className = 'user-info-section';
  
  const userInfoHeader = document.createElement('h2');
  userInfoHeader.textContent = 'Your Information';
  userInfoSection.appendChild(userInfoHeader);
  
  const userInfoList = document.createElement('ul');
  userInfoList.className = 'user-info-list';
  
  // Add user information as list items
  const userInfoItems = [
    `Age Group: ${age}`,
    `Weight Loss Goal: ${weightLossGoal}`,
    `Current Fitness Level: ${fitnessLevel}`,
    `Preferred Workout Schedule: ${workoutFrequency}`,
    `Dietary Preference: ${dietaryPreference}`
  ];
  
  userInfoItems.forEach(item => {
    const listItem = document.createElement('li');
    listItem.textContent = item;
    userInfoList.appendChild(listItem);
  });
  
  userInfoSection.appendChild(userInfoList);
  resultsContainer.appendChild(userInfoSection);

  // Create workout plan based on user's answers
  const workoutPlan = generateWorkoutPlan(fitnessLevel, workoutFrequency);
  
  // Create nutrition plan based on user's answers
  const nutritionPlan = generateNutritionPlan(weightLossGoal, dietaryPreference);
  
  // Append workout plan to results container
  resultsContainer.appendChild(workoutPlan);
  
  // Append nutrition plan to results container
  resultsContainer.appendChild(nutritionPlan);
  
  // Create and append the disclaimer
  const disclaimer = document.createElement('div');
  disclaimer.className = 'disclaimer';
  disclaimer.innerHTML = '<p><strong>Disclaimer:</strong> This plan is generated based on your inputs and is meant as a general guide. Please consult with a healthcare professional before starting any new exercise or diet regimen.</p>';
  resultsContainer.appendChild(disclaimer);
});

function generateWorkoutPlan(fitnessLevel, workoutFrequency) {
  const workoutSection = document.createElement('div');
  workoutSection.className = 'workout-section';
  
  const workoutHeader = document.createElement('h2');
  workoutHeader.textContent = 'Your Workout Plan';
  workoutSection.appendChild(workoutHeader);
  
  // Determine workout intensity based on fitness level
  let intensity = '';
  if (fitnessLevel === '1-3')
    intensity = 'Low to Moderate';
  else if (fitnessLevel === '4-7')
    intensity = 'Moderate to High';
  else
    intensity = 'High';
  
  // Create workout description
  const workoutDescription = document.createElement('p');
  workoutDescription.textContent = `Based on your fitness level and goals, we recommend a ${intensity} intensity workout plan.`;
  workoutSection.appendChild(workoutDescription);
  
  // Create workout schedule
  const scheduleHeader = document.createElement('h3');
  scheduleHeader.textContent = 'Weekly Schedule';
  workoutSection.appendChild(scheduleHeader);
  
  const schedule = document.createElement('div');
  schedule.className = 'workout-schedule';
  
  // Define workouts based on frequency and goals
  let workouts = [];
  
  if (workoutFrequency === '3 times a week (30 minutes each)')
    workouts = loseWorkouts[0];
  else if (workoutFrequency === '4-5 times a week (45 minutes each)')
    workouts = loseWorkouts[1];
  else
    workouts = loseWorkouts[2];
  
  // Create schedule table
  const scheduleTable = document.createElement('table');
  scheduleTable.className = 'schedule-table';
  
  // Create table header
  const tableHeader = document.createElement('thead');
  const headerRow = document.createElement('tr');
  
  const dayHeader = document.createElement('th');
  dayHeader.textContent = 'Day';
  headerRow.appendChild(dayHeader);
  
  const routineHeader = document.createElement('th');
  routineHeader.textContent = 'Routine';
  headerRow.appendChild(routineHeader);
  
  const exercisesHeader = document.createElement('th');
  exercisesHeader.textContent = 'Exercises';
  headerRow.appendChild(exercisesHeader);
  
  tableHeader.appendChild(headerRow);
  scheduleTable.appendChild(tableHeader);
  
  // Create table body
  const tableBody = document.createElement('tbody');
  
  workouts.forEach(workout => {
    const row = document.createElement('tr');
    
    const dayCell = document.createElement('td');
    dayCell.textContent = workout.day;
    row.appendChild(dayCell);
    
    const routineCell = document.createElement('td');
    routineCell.textContent = workout.routine;
    row.appendChild(routineCell);
    
    const exercisesCell = document.createElement('td');
    exercisesCell.textContent = workout.exercises.join(', ');
    row.appendChild(exercisesCell);
    
    tableBody.appendChild(row);
  });
  
  scheduleTable.appendChild(tableBody);
  schedule.appendChild(scheduleTable);
  workoutSection.appendChild(schedule);
  
  return workoutSection;
}

function generateNutritionPlan(weightLossGoal, dietaryPreference) {
  const nutritionSection = document.createElement('div');
  nutritionSection.className = 'nutrition-section';
  
  const nutritionHeader = document.createElement('h2');
  nutritionHeader.textContent = 'Your Nutrition Plan';
  nutritionSection.appendChild(nutritionHeader);
  
  // Create calorie guidance based on weight loss goal
  const calorieGuidance = document.createElement('div');
  calorieGuidance.className = 'calorie-guidance';
  
  const calorieHeader = document.createElement('h3');
  calorieHeader.textContent = 'Calorie Guidance';
  calorieGuidance.appendChild(calorieHeader);
  
  let calorieDeficit = '';
  if (weightLossGoal === 'Lose 5-10 pounds')
    calorieDeficit = '300-500';
  else if (weightLossGoal === 'Lose 10-20 pounds')
    calorieDeficit = '500-750';
  else
    calorieDeficit = '750-1000';
  
  const calorieText = document.createElement('p');
  calorieText.innerHTML = `For your goal to ${weightLossGoal.toLowerCase()}, we recommend a daily calorie deficit of approximately <strong>${calorieDeficit} calories</strong>. This should lead to a safe and sustainable weight loss of 1-2 pounds per week.`;
  calorieGuidance.appendChild(calorieText);
  
  const calorieNote = document.createElement('p');
  calorieNote.textContent = 'Note: Your total daily calorie needs depend on factors like your exact weight, height, age, and activity level. Consider consulting with a nutritionist for a personalized calorie target.';
  calorieGuidance.appendChild(calorieNote);
  
  nutritionSection.appendChild(calorieGuidance);
  
  // Create macronutrient breakdown
  const macroSection = document.createElement('div');
  macroSection.className = 'macro-section';
  
  const macroHeader = document.createElement('h3');
  macroHeader.textContent = 'Recommended Macronutrient Breakdown';
  macroSection.appendChild(macroHeader);
  
  let proteinPercent, carbPercent, fatPercent;
  
  // Set macros based on dietary preference
  if (dietaryPreference === 'Low-carb') {
    proteinPercent = '30-35%';
    carbPercent = '15-25%';
    fatPercent = '45-50%';
  } else if (dietaryPreference === 'Vegetarian') {
    proteinPercent = '25-30%';
    carbPercent = '45-50%';
    fatPercent = '25-30%';
  } else {
    proteinPercent = '30%';
    carbPercent = '40%';
    fatPercent = '30%';
  }
  
  const macroList = document.createElement('ul');
  macroList.className = 'macro-list';
  
  const proteinItem = document.createElement('li');
  proteinItem.innerHTML = `<strong>Protein:</strong> ${proteinPercent} of daily calories`;
  macroList.appendChild(proteinItem);
  
  const carbItem = document.createElement('li');
  carbItem.innerHTML = `<strong>Carbohydrates:</strong> ${carbPercent} of daily calories`;
  macroList.appendChild(carbItem);
  
  const fatItem = document.createElement('li');
  fatItem.innerHTML = `<strong>Healthy Fats:</strong> ${fatPercent} of daily calories`;
  macroList.appendChild(fatItem);
  
  macroSection.appendChild(macroList);
  nutritionSection.appendChild(macroSection);
  
  // Create meal plan suggestions
  const mealPlanSection = document.createElement('div');
  mealPlanSection.className = 'meal-plan-section';
  
  const mealPlanHeader = document.createElement('h3');
  mealPlanHeader.textContent = 'Sample Daily Meal Plan';
  mealPlanSection.appendChild(mealPlanHeader);
  
  let breakfast, lunch, dinner, snacks;
  
  // Create meal plan based on dietary preference
  if (dietaryPreference === 'Low-carb') {
    breakfast = 'Veggie omelet with avocado';
    lunch = 'Grilled chicken salad with olive oil dressing';
    dinner = 'Baked salmon with roasted vegetables';
    snacks = 'Nuts, cheese, or Greek yogurt';
  } else if (dietaryPreference === 'Vegetarian') {
    breakfast = 'Greek yogurt with berries and nuts';
    lunch = 'Quinoa bowl with roasted vegetables and chickpeas';
    dinner = 'Lentil soup with a side salad';
    snacks = 'Apple with almond butter or hummus with veggies';
  } else {
    breakfast = 'Protein smoothie or oatmeal with fruit';
    lunch = 'Lean protein with vegetables and whole grains';
    dinner = 'Grilled fish or chicken with salad and sweet potato';
    snacks = 'Greek yogurt, fruit, or nuts';
  }
  
  const mealList = document.createElement('ul');
  mealList.className = 'meal-list';
  
  const breakfastItem = document.createElement('li');
  breakfastItem.innerHTML = `<strong>Breakfast:</strong> ${breakfast}`;
  mealList.appendChild(breakfastItem);
  
  const lunchItem = document.createElement('li');
  lunchItem.innerHTML = `<strong>Lunch:</strong> ${lunch}`;
  mealList.appendChild(lunchItem);
  
  const dinnerItem = document.createElement('li');
  dinnerItem.innerHTML = `<strong>Dinner:</strong> ${dinner}`;
  mealList.appendChild(dinnerItem);
  
  const snacksItem = document.createElement('li');
  snacksItem.innerHTML = `<strong>Snacks:</strong> ${snacks}`;
  mealList.appendChild(snacksItem);
  
  mealPlanSection.appendChild(mealList);
  nutritionSection.appendChild(mealPlanSection);
  
  // Create nutrition tips
  const tipsSection = document.createElement('div');
  tipsSection.className = 'tips-section';
  
  const tipsHeader = document.createElement('h3');
  tipsHeader.textContent = 'Weight Loss Nutrition Tips';
  tipsSection.appendChild(tipsHeader);
  
  const tipsList = document.createElement('ul');
  tipsList.className = 'tips-list';
  
  const tips = loseTips;
  
  tips.forEach(tip => {
    const listItem = document.createElement('li');
    listItem.textContent = tip;
    tipsList.appendChild(listItem);
  });
  
  tipsSection.appendChild(tipsList);
  nutritionSection.appendChild(tipsSection);
  
  return nutritionSection;
}