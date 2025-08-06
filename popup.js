function calculateGPA() {
  chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => {
        const gradePoints = {
          "A+": 4.0, "A": 3.7, "B+": 3.3, "B": 3.0,
          "C+": 2.7, "C": 2.4, "D+": 2.2, "D": 2.0,
          "F": 0.0
        };

        function extractCoursesData() {
          const rows = document.querySelectorAll("table tbody tr");
          let courses = {};
          let missingGrades = false;

          rows.forEach(row => {
            const cells = row.querySelectorAll("td");
            if (cells.length > 0) {
              let code = cells[0]?.innerText.trim();
              let creditHours = parseFloat(cells[3]?.innerText.trim()) || 0; 
              let grade = cells[6]?.innerText.trim();

              if (!grade || !(grade in gradePoints)) {
                missingGrades = true;
                return;
              }
              courses[code] = { creditHours, grade }; // يتجاهل التكرار تلقائيًا
            }
          });

          return { courses: Object.values(courses), missingGrades };
        }

        let { courses, missingGrades } = extractCoursesData();
        let totalPoints = 0;
        let totalHours = 0;
        let courseCount = courses.length;

        courses.forEach(c => {
          let gp = gradePoints[c.grade];
          totalPoints += gp * c.creditHours;
          totalHours += c.creditHours;
        });

        let gpa = totalHours > 0 ? (totalPoints / totalHours).toFixed(2) : "N/A";
        return { gpa, totalHours, courseCount, missingGrades };
      }
    }, (results) => {
      let data = results[0].result;
      let warning = data.missingGrades ? `<br><span style="color: orange;">Some courses have not shown their results yet.</span>` : "";
      document.getElementById("result").innerHTML = `
        GPA: ${data.gpa} <br>
        Total Credit Hours: ${data.totalHours} <br>
        Number of Courses: ${data.courseCount} 
        ${warning}
      `;
    });
  });
}

document.getElementById("calcBtn").addEventListener("click", calculateGPA);
document.getElementById("refreshBtn").addEventListener("click", calculateGPA);
