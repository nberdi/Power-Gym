import { gainWorkouts, gainTips } from "./data.js";
document.addEventListener("DOMContentLoaded", function() {
  // Get query parameters from URL
  const urlParams = new URLSearchParams(window.location.search);
  const age = urlParams.get('q1');
  const weightGainGoal = urlParams.get('q2');
  const fitnessLevel = urlParams.get('q3');
  const workoutFrequency = urlParams.get('q4');
  const dietaryPreference = urlParams.get('q5');

  // Create the results container
  const resultsContainer = document.getElementById('resultsContainer');
  
  // Clear the loading message
  resultsContainer.innerHTML = '';
  
  // Create and append the header
  const header = document.createElement('h1');
  header.textContent = 'Your Personalized Weight Gain Plan';
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
    `Weight Gain Goal: ${weightGainGoal}`,
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
  const workoutPlan = generateWorkoutPlan(fitnessLevel, workoutFrequency, weightGainGoal);
  
  // Create nutrition plan based on user's answers
  const nutritionPlan = generateNutritionPlan(weightGainGoal, dietaryPreference);
  
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
    intensity = 'Moderate';
  else if (fitnessLevel === '4-7')
    intensity = 'Moderate to High';
  else
    intensity = 'High';
  
  // Create workout description
  const workoutDescription = document.createElement('p');
  workoutDescription.textContent = `Based on your fitness level and goals, we recommend a ${intensity} intensity workout plan focusing on progressive overload and compound movements.`;
  workoutSection.appendChild(workoutDescription);
  
  // Create workout schedule
  const scheduleHeader = document.createElement('h3');
  scheduleHeader.textContent = 'Weekly Schedule';
  workoutSection.appendChild(scheduleHeader);
  
  const schedule = document.createElement('div');
  schedule.className = 'workout-schedule';
  
  // Define workouts based on frequency and goals
  let workouts = [];
  
  if (workoutFrequency === '3 times a week (45 minutes each)') {
    workouts = gainWorkouts[0];
  } else if (workoutFrequency === '4 times a week (60 minutes each)') {
    workouts = gainWorkouts[1];
  } else {
    workouts = gainWorkouts[2];
  }
  
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

function generateNutritionPlan(weightGainGoal, dietaryPreference) {
  const nutritionSection = document.createElement('div');
  nutritionSection.className = 'nutrition-section';
  
  const nutritionHeader = document.createElement('h2');
  nutritionHeader.textContent = 'Your Nutrition Plan';
  nutritionSection.appendChild(nutritionHeader);
  
  // Create calorie guidance based on weight gain goal
  const calorieGuidance = document.createElement('div');
  calorieGuidance.className = 'calorie-guidance';
  
  const calorieHeader = document.createElement('h3');
  calorieHeader.textContent = 'Calorie Guidance';
  calorieGuidance.appendChild(calorieHeader);
  
  let calorieSurplus = '';
  if (weightGainGoal === 'Gain 5-10 pounds')
    calorieSurplus = '300-400';
  else if (weightGainGoal === 'Gain 10-20 pounds')
    calorieSurplus = '400-500';
  else
    calorieSurplus = '500-700';
  
  const calorieText = document.createElement('p');
  calorieText.innerHTML = `For your goal to ${weightGainGoal.toLowerCase()}, we recommend a daily calorie surplus of approximately <strong>${calorieSurplus} calories</strong>. This should lead to a steady weight gain of 0.5-1 pound per week.`;
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
  if (dietaryPreference === 'High protein') {
    proteinPercent = '35-40%';
    carbPercent = '40-45%';
    fatPercent = '20-25%';
  } else if (dietaryPreference === 'Vegetarian') {
    proteinPercent = '25-30%';
    carbPercent = '50-55%';
    fatPercent = '20-25%';
  } else {
    proteinPercent = '30%';
    carbPercent = '45%';
    fatPercent = '25%';
  }
  
  const macroList = document.createElement('ul');
  macroList.className = 'macro-list';
  
  const proteinItem = document.createElement('li');
  proteinItem.innerHTML = `<strong>Protein:</strong> ${proteinPercent} of daily calories (aim for 1.6-2.2g of protein per kg of body weight)`;
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
  if (dietaryPreference === 'High protein') {
    breakfast = 'Protein pancakes with Greek yogurt and berries';
    lunch = 'Chicken breast with rice and vegetables';
    dinner = 'Steak with sweet potato and broccoli';
    snacks = 'Protein shake, boiled eggs, and nuts';
  } else if (dietaryPreference === 'Vegetarian') {
    breakfast = 'Protein smoothie with plant protein, banana, peanut butter, and oats';
    lunch = 'Lentil and bean bowl with quinoa and avocado';
    dinner = 'Tofu stir-fry with rice and mixed vegetables';
    snacks = 'Greek yogurt, protein bars, and trail mix';
  } else {
    breakfast = 'Eggs with oatmeal and fruit';
    lunch = 'Lean meat sandwich with whole grain bread';
    dinner = 'Salmon with rice and vegetables';
    snacks = 'Protein shake, nuts, and Greek yogurt';
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
  tipsHeader.textContent = 'Weight Gain Nutrition Tips';
  tipsSection.appendChild(tipsHeader);
  
  const tipsList = document.createElement('ul');
  tipsList.className = 'tips-list';
  
  const tips = gainTips;
  
  tips.forEach(tip => {
    const listItem = document.createElement('li');
    listItem.textContent = tip;
    tipsList.appendChild(listItem);
  });
  
  tipsSection.appendChild(tipsList);
  nutritionSection.appendChild(tipsSection);
  
  return nutritionSection;
}