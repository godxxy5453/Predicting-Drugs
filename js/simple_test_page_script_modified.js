
const questions = [
    { item: 1, text: "과묵하다고 본다." },
    { item: 2, text: "대체로 믿을 만한 사람이라고 본다." },
    { item: 3, text: "일을 철저히 하는 사람이라고 본다." },
    { item: 4, text: "느긋하며 스트레스를 잘 해소하는 사람이라고 본다." },
    { item: 5, text: "상상력이 풍부한 사람이라고 본다." },
    { item: 6, text: "외향적이고 사교적인 사람이라고 본다." },
    { item: 7, text: "다른 사람의 흠을 잘 잡는 경향이 있는 사람이라고 본다." },
    { item: 8, text: "게으른 경향이 있는 사람이라고 본다 ." },
    { item: 9, text: "신경이 예민한 사람이라고 본다 ." },
    { item: 10, text: "예술적 관심이 거의 없는 사람이라고 본다." },
    { item: 11, text: "BIS-11 : 취미가 자주 바뀐다." },
    { item: 12, text: "BIS-11 : 뭔가를 생각하고 있을 때 다른 생각이 떠오르는 경우가 많다." },
    { item: 13, text: "ImpSS : 새롭고 흥미로운 경험과 감각을 즐기는데, 조금 무섭더라도 상관없다." },
    { item: 14, text: "ImpSS : 가끔은 약간 무서운 것들을 하는 것도 좋아한다." },
];

let scores
let currentQuestionIndex = 0;
let answers = Array(54).fill(0); // Array to store the answers for each question
let myChart;

let urlParams = new URLSearchParams(location.search);
let currentQuestionFromURL = urlParams.get('currentQuestion');

if (!currentQuestionFromURL || currentQuestionFromURL === '1') {
    // If currentQuestion is 1 or not present in the URL, initialize scores to default values
    scores = { E: 20, A: 14, C: 14, N: 38, O: 8, BIS: 0, IMP: 0 };
} else {
    // If currentQuestion is other than 1, keep the existing values or initialize differently
    // This part can be adjusted based on your requirements
    scores = { E: 0, A: 0, C: 0, N: 0, O: 0, BIS: 0, IMP: 0 };
}

function displayQuestion() {
    const question = questions[currentQuestionIndex];
    document.getElementById('questionText').textContent = question.text;

    const answerButtonsContainer = document.getElementById('answerButtons');
    answerButtonsContainer.innerHTML = '';
    ['매우 그렇다', '그렇다', '보통이다', '그렇지 않다', '전혀 그렇지 않다'].forEach((answer, index) => {
        let button = document.createElement('button');
        button.textContent = answer;
        button.onclick = () => selectAnswer(5 - index); // 5 points for 'Yes', 1 point for 'Not at all'
        answerButtonsContainer.appendChild(button);
    });

    updateProgressBar();
    updateURLWithCurrentQuestion();
}

function selectAnswer(answerValue) {
    answers[currentQuestionIndex] = answerValue;
    updateScores();
    updateGraph();
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        displayQuestion();
    } else {
        // Finish the test and navigate to the Results Page
        finishTest(); // Replace with actual Results Page URL
    }
    updateURLWithScores();
}

function finishTest() {
    // Construct the query string with scores and other info

    const queryString = new URLSearchParams({
        E: scores.E,
        A: scores.A,
        C: scores.C,
        N: scores.C,
        O: scores.O,
        BIS: scores.BIS,
        IMP: scores.IMP,
        age: urlParams.get('age'),     // Assuming userAge holds the Age value
        education: urlParams.get('education'), // Assuming userEducation holds the Education value
        country: urlParams.get('country') // Assuming userCountry holds the Country value
    }).toString();

    // Redirect to the Results Page with the query string
    window.location.href = 'results_page.html?' + queryString;
}

function updateScores() {
    // if (currentQuestionIndex === 1) {
    //     // Reset the scores if the user goes back to the first question
    //     scores = { E: 20, A: 14, C: 14, N: 38, O: 8 };
    // }

    scores.E = 4 * (6 - calculateScore([1]) + calculateScore([6]));
    scores.A = 4 * (6 - calculateScore([7]) + calculateScore([2]));
    scores.C = 4 * (6 - calculateScore([3]) + calculateScore([8]));
    scores.N = 4 * (6 - calculateScore([4]) + calculateScore([9]));
    scores.O = 4 * (6 - calculateScore([5]) + calculateScore([10]));

    scores.BIS = 12 - calculateBisImpScore([11, 12]);
    scores.IMP = 12 - calculateBisImpScore([13, 14]);
}

function calculateScore(questionNumbers, add) {
    return questionNumbers.reduce((total, num) => {
        return add ? total + (6 - answers[num - 1]) : total - (6 - answers[num - 1]);
    }, 0);
}

function calculateBisImpScore(questionNumbers) {
    return questionNumbers.reduce((total, num) => {
        return total + (6 - answers[num - 1]); // Assuming a similar scoring method
    }, 0);
}

function updateGraph() {
    const ctx = document.getElementById('myChart').getContext('2d');

    // If the chart already exists, destroy it before creating a new one
    if (myChart) {
        myChart.destroy();
    }

    myChart = new Chart(ctx, {
        type: 'radar', // Change chart type to radar
        data: {
            labels: ['E', 'A', 'C', 'N', 'O'],
            datasets: [{
                label: 'Score',
                data: [scores.E, scores.A, scores.C, scores.N, scores.O],
                backgroundColor: 'rgba(255, 99, 132, 0.2)', // Change to single color with opacity
                borderColor: 'rgba(255, 99, 132, 1)', // Border color
                pointBackgroundColor: 'rgba(255, 99, 132, 1)', // Points color
                pointBorderColor: '#fff', // Points border color
                pointHoverBackgroundColor: '#fff', // Hover color
                pointHoverBorderColor: 'rgba(255, 99, 132, 1)' // Hover border color
            }]
        },
        options: {
            elements: {
                line: {
                    borderWidth: 3 // Line thickness
                }
            },
            scales: {
                r: {
angleLines: {
                display: true
            },
            grid: {
                color: 'rgba(255, 255, 255, 0.5)' // Grid line color
            },
            pointLabels: {
                font: {
                    size: 14 // Label font size
                }
            },
            suggestedMin: 0, // 최소값을 0으로 설정
            suggestedMax: 40 // 최대값을 40으로 설정
                }
            }
        }
    });
}


function updateProgressBar() {
    const progressPercentage = (currentQuestionIndex + 1) / questions.length * 100;
    document.getElementById('progress').style.width = progressPercentage + '%';
    // document.getElementById('progressIcon').style.left = progressPercentage + '%';
    updateProgressIconPosition();
}

function updateURLWithCurrentQuestion() {
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('currentQuestion', currentQuestionIndex + 1);
    window.history.replaceState({}, '', '?' + urlParams.toString());
}

function updateURLWithScores() {
    const urlParams = new URLSearchParams(window.location.search);
    for (const score in scores) {
        urlParams.set(score, scores[score]);
    }
    window.history.replaceState({}, '', '?' + urlParams.toString());
}

function loadCurrentQuestionFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const questionFromURL = urlParams.get('currentQuestion');
    if (questionFromURL && questionFromURL <= questions.length) {
        currentQuestionIndex = questionFromURL - 1;
        displayQuestion();
    } else {
        displayQuestion(); // Display the first question if no URL parameter
    }
}

// function updateProgressBar(progress) {
//     const progressBarWidth = document.querySelector('.progress-bar').offsetWidth;
//     const progressGauge = document.querySelector('.progress');
//     const progressIcon = document.querySelector('.progress_icon');

//     // 프로그레스 바의 길이에 따라 진행도를 계산하여 너비를 설정
//     const newWidth = progress * progressBarWidth;
//     progressGauge.style.width = `${newWidth}px`;

//     // 아이콘 위치 업데이트
//     progressIcon.style.left = `${newWidth}px`;
// }

function updateProgressIconPosition() {
    var progressBar = document.querySelector('.progress-bar');
    var progressIcon = document.querySelector('.progress_icon');
    var gauge = document.querySelector('.progress');

    var gaugeWidth = gauge.offsetWidth; // 프로그레스 바의 너비를 가져옵니다.
    progressIcon.style.left = gaugeWidth + 'px'; // 아이콘 위치를 업데이트합니다.
}

// 페이지 로드 시 함수 실행
window.onload = function() {
    updateProgressIconPosition();
};

loadCurrentQuestionFromURL(); // Load the question based on URL when the page is refreshed
