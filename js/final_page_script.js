const drugs = [
    { name: "Amphet", text: "암페타민은 중추신경계를 자극하는 약물로, 주로 집중력을 높이고..." },
    { name: "Amyl", text: "아밀 아질산염은 화학식 C₅H₁₁ONO의 화합물입니다." },
    { name: "Nicotine", text: "니코틴은 가지과의 식물에서 발견되는 알칼로이드 물질이다. 주로 담배에..." },
    
    // ... include all drugs here ...
    { name: "Cocaine", text: "코카인은 코카나무의 잎에서 추출한 알칼로이드로, 중추신경계를 자극..." },
];

document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    displayPersonalityType(urlParams);
    displayDrugRisk(urlParams);
    displayTopDrugsInfo(urlParams);
});

function displayPersonalityType(urlParams) {
    const personalityTypeContainer = document.getElementById('personalityType');
    const scores = {
        E: urlParams.get('E'),
        A: urlParams.get('A'),
        C: urlParams.get('C'),
        N: urlParams.get('N'),
        O: urlParams.get('O')
    };
    personalityTypeContainer.innerText = `성격 유형 점수: E(${scores.E}), A(${scores.A}), C(${scores.C}), N(${scores.N}), O(${scores.O})`;

    const ctx = document.getElementById('personalityTypeChart').getContext('2d');
    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['E', 'A', 'C', 'N', 'O'],
            datasets: [{
                label: '성격 유형 점수',
                data: [scores.E, scores.A, scores.C, scores.N, scores.O],
                fill: true,
                backgroundColor: "rgba(255, 99, 132, 0.2)",
                borderColor: "rgba(255, 99, 132, 1)",
                pointBackgroundColor: "rgba(255, 99, 132, 1)",
                pointBorderColor: "#fff",
                pointHoverBackgroundColor: "#fff",
                pointHoverBorderColor: "rgba(255, 99, 132, 1)"
            }]
        },
        options: {
            scales: {
                r: {
                    angleLines: {
                        display: true
                    },
                    suggestedMin: 0, // 최소값을 0으로 설정
                    suggestedMax: 40, // 최대값을 40으로 설정
                    // 추가적인 스타일링 옵션 (필요시)
                }
            }
        }
    });
}


function displayDrugRisk(urlParams) {
    const risk = parseFloat(urlParams.get('risk')) * 100;
    document.getElementById('riskPercentage').innerText = risk.toFixed(2) + '%';
    animateCircularProgressBar(risk);

    // Risk 단계 표시 추가
    const riskLevel = getRiskLevel(risk);
    document.getElementById('riskLevel').innerText = `Risk 단계: ${riskLevel}`;
}



function displayTopDrugsInfo(urlParams) {
    const topDrugsContainer = document.getElementById('topDrugsInfo');
    const topDrugs = [urlParams.get('drug1'), urlParams.get('drug2'), urlParams.get('drug3')];
    
    topDrugs.forEach(drugName => {
        const drugInfo = drugs.find(drug => drug.name === drugName);
        if (drugInfo) {
            topDrugsContainer.innerHTML += `<div class="drug-info">
                <h3>${drugInfo.name}</h3>
                <p>${drugInfo.text}</p>
            </div>`;
        }
    });
}

function shareResults() {
    // Example: Copy current URL to clipboard
    navigator.clipboard.writeText(window.location.href)
        .then(() => alert('클립보드에 URL이 복사되었습니다.'))
        .catch(err => console.error('URL 복사에 오류가 발생했습니다: ', err));
}

function animateCircularProgressBar(risk) {
    const progressBar = document.querySelector('.ui-widgets');
    const degree = risk * 3.6; // Convert percentage to degree

    progressBar.style.borderTopColor = '#f9cfcf';
    progressBar.style.borderRightColor = degree > 180 ? '#f9a7a7' : '#fdf9f9';
    progressBar.style.borderBottomColor = '#fdf9f9';
    progressBar.style.borderLeftColor = degree > 90 ? '#FEEEEE' : '#fdf9f9';
    progressBar.style.transform = `rotate(${0}deg)`;

    document.querySelector('.ui-values').innerText = risk.toFixed(2) + '%';
}

function getRiskLevel(risk) {
    if (risk <= 33) {
        return '안심';
    } else if (risk <= 66) {
        return '주의';
    } else {
        return '위험';
    }
}
