
const questions = [
    { item: 1, text: "파티에서 주목을 받는다." },
    { item: 2, text: "타인에 대해 크게 신경 쓰지 않는다." },
    { item: 3, text: "항상 준비가 되어 있다." },
    { item: 4, text: "쉽게 스트레스를 받는다." },
    { item: 5, text: "어휘력이 풍부하다." },
    { item: 6, text: "많이 말하지 않는다." },
    { item: 7, text: "사람들에게 관심이 많다." },
    { item: 8, text: "물건을 제자리에 두지 않는다." },
    { item: 9, text: "대부분의 시간을 편안하게 보낸다." },
    { item: 10, text: "추상적인 아이디어를 이해하는 데 어려움을 겪는다." },
    { item: 11, text: "사람들과 함께 있을 때 편안하다." },
    { item: 12, text: "사람들을 모욕하는 편이다." },
    { item: 13, text: "세부 사항에 주의를 기울인다." },
    { item: 14, text: "걱정이 많다." },
    { item: 15, text: "상상력이 풍부하다." },
    { item: 16, text: "배경에 머무르는 것을 선호한다." },
    { item: 17, text: "타인의 감정에 공감한다." },
    { item: 18, text: "일을 엉망으로 만든다." },
    { item: 19, text: "거의 우울하게 느끼지 않는다." },
    { item: 20, text: "추상적인 아이디어에 관심이 없다." },
    { item: 21, text: "대화를 시작한다." },
    { item: 22, text: "다른 사람의 문제에 관심이 없다." },
    { item: 23, text: "집안일을 바로 처리한다." },
    { item: 24, text: "쉽게 동요된다." },
    { item: 25, text: "훌륭한 아이디어를 가지고 있다." },
    { item: 26, text: "말이 없는 편이다." },
    { item: 27, text: "마음이 여리다." },
    { item: 28, text: "물건을 제자리에 두는 것을 자주 잊는다." },
    { item: 29, text: "쉽게 화를 낸다." },
    { item: 30, text: "상상력이 부족하다." },
    { item: 31, text: "파티에서 많은 사람들과 대화한다." },
    { item: 32, text: "타인에게 별로 관심이 없다." },
    { item: 33, text: "질서를 중요시한다." },
    { item: 34, text: "기분이 자주 변한다." },
    { item: 35, text: "일을 빨리 이해한다." },
    { item: 36, text: "주목받는 것을 좋아하지 않는다." },
    { item: 37, text: "타인을 위해 시간을 내는 것을 즐긴다." },
    { item: 38, text: "의무를 회피하는 편이다." },
    { item: 39, text: "기분 변화가 잦다." },
    { item: 40, text: "어려운 단어를 사용한다." },
    { item: 41, text: "주목받는 것을 신경 쓰지 않는다." },
    { item: 42, text: "타인의 감정을 느낀다." },
    { item: 43, text: "일정을 잘 따른다." },
    { item: 44, text: "쉽게 짜증난다." },
    { item: 45, text: "생각에 잠기는 시간을 갖는다." },
    { item: 46, text: "낯선 사람들 앞에서 조용한 편이다." },
    { item: 47, text: "사람들이 편안하게 느끼도록 만든다." },
    { item: 48, text: "일을 정확하게 처리한다." },
    { item: 49, text: "자주 우울하게 느낀다." },
    { item: 50, text: "아이디어가 넘친다." },
    { item: 51, text: "BIS-11 : 취미가 자주 바뀐다." },
    { item: 52, text: "BIS-11 : 뭔가를 생각하고 있을 때 다른 생각이 떠오르는 경우가 많다." },
    { item: 53, text: "ImpSS : 새롭고 흥미로운 경험과 감각을 즐기는데, 조금 무섭더라도 상관없다." },
    { item: 54, text: "ImpSS : 가끔은 약간 무서운 것들을 하는 것도 좋아한다." },
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

    scores.E = 20 + calculateScore([1, 11, 21, 31, 41]) - calculateScore([6, 16, 26, 36, 46]);
    scores.A = 14 + 12 - calculateScore([2, 12, 22, 32]) + calculateScore([7, 17, 27, 37, 42, 47]);
    scores.C = 14 + calculateScore([3, 13, 23, 33, 43]) - calculateScore([8, 18, 28, 38, 48]);
    scores.N = 38 -36 - calculateScore([4, 14, 24, 29, 34, 39, 44, 49]) + calculateScore([9, 19]);
    scores.O = 8 + 24 + calculateScore([5, 15, 25, 35, 40, 45, 50]) - calculateScore([10, 20, 30]);

    scores.BIS = 12 - calculateBisImpScore([51, 52]);
    scores.IMP = 12 - calculateBisImpScore([53, 54]);
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
