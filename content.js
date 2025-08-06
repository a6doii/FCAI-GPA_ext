
function extractCoursesData() {
  const rows = document.querySelectorAll("table tbody tr");
  let courses = [];

  rows.forEach(row => {
    const cells = row.querySelectorAll("td");
    if (cells.length > 0) {
      let courseName = cells[1]?.innerText.trim();  
      let creditHours = parseFloat(cells[3]?.innerText.trim()) || 0; 
      let grade = cells[6]?.innerText.trim(); 

      console.log(`Course: ${courseName}, Hours: ${creditHours}, Grade: ${grade}`);

      courses.push({ courseName, creditHours, grade });
    }
  });

  return courses;
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getCoursesData") {
    sendResponse({ courses: extractCoursesData() });
  }
});
