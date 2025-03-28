x// Elements for tracking goals
const checkBoxList = document.querySelectorAll(".custom-checkbox");
const inputFields = document.querySelectorAll(".goal-input");
const errorLabel = document.querySelector(".error-label");
const progressValue = document.querySelector(".progress-value");
const progressLabel = document.querySelector(".progress-label");

// Default state of goals (will be replaced by data from the API)
let allGoals = {
  first: { name: "", completed: false },
  second: { name: "", completed: false },
  third: { name: "", completed: false },
  forth: { name: "", completed: false },
};

// Fetch goals from the backend API and update the local state
async function fetchGoals() {
  try {
    const response = await fetch("http://localhost:8080/api/v1/report/getall");
    const data = await response.json();

    if (data && Array.isArray(data.data)) {
      updateGoals(data.data); // We access the data property here
    } else {
      console.error("Unexpected response format", data);
      alert("Failed to load goals. Please try again later.");
    }
  } catch (error) {
    console.error("Error fetching goals:", error);
    alert("Failed to load goals. Please try again later.");
  }
}

// Function to update goals based on fetched data
function updateGoals(data) {
  // Assuming the response is an array of reports with `name` and `completed` status
  data.forEach((report, index) => {
    const goalKey = Object.keys(allGoals)[index];
    if (goalKey) {
      allGoals[goalKey] = { name: report.name, completed: report.completed };
    }
  });

  updateUI();
}

// Update the UI with the current goals data
function updateUI() {
  let completedGoalsCount = Object.values(allGoals).filter((goal) => goal.completed).length;

  // Update progress bar and text
  progressValue.style.width = `${(completedGoalsCount * 100) / Object.values(allGoals).length}%`;
  progressValue.firstElementChild.innerText = `${completedGoalsCount}/${Object.values(allGoals).length} completed`;

  const comments = [
    "Raise the bar by completing your goals!",
    "Well begun is half done",
    "Just half completed, keep going!",
    "Just a step away, keep going!",
    "Whao! You just completed all the goals, time for chill.",
  ];

  progressLabel.innerText = comments[completedGoalsCount];

  // Update the input fields and checkboxes based on the `allGoals` state
  inputFields.forEach((input, index) => {
    const goalKey = Object.keys(allGoals)[index];
    if (goalKey) {
      input.value = allGoals[goalKey].name;
      input.parentElement.classList.toggle("completed", allGoals[goalKey].completed);
    }
  });
}

// Handle checkbox click to mark goal completion
checkBoxList.forEach((checkBox, index) => {
  checkBox.addEventListener("click", () => {
    let allInputFieldsFilled = [...inputFields].every((input) => input.value);

    if (allInputFieldsFilled) {
      errorLabel.style.visibility = "hidden";
      checkBox.parentElement.classList.toggle("completed");

      const goalKey = Object.keys(allGoals)[index];
      if (goalKey) {
        allGoals[goalKey].completed = !allGoals[goalKey].completed;
        updateUI();
        localStorage.setItem("allGoals", JSON.stringify(allGoals));
      }
    } else {
      errorLabel.style.visibility = "visible";
    }
  });
});

// Handle input changes and update localStorage
inputFields.forEach((input, index) => {
  input.addEventListener("focus", () => {
    errorLabel.style.visibility = "hidden";
  });

  input.addEventListener("input", () => {
    const goalKey = Object.keys(allGoals)[index];
    if (goalKey) {
      allGoals[goalKey].name = input.value;
      localStorage.setItem("allGoals", JSON.stringify(allGoals));
    }
  });
});

// Fetch initial goals from the server when the page loads
document.addEventListener("DOMContentLoaded", () => {
  fetchGoals();
});
